import { NextRequest } from 'next/server';
import {
  WikiApiError,
  sortPagesByIndex,
  titleToSlug,
  wikiApi,
  wikiJson,
  wikiPages,
} from '@/lib/server/wikipedia-api';

/**
 * Vyhľadávanie nad reálnou slovenskou Wikipédiou (MediaWiki API).
 *
 * Dva režimy:
 *  1. `?suggest=1&q=…`  — našeptávač do vyhľadávacieho poľa. Používa rovnaký
 *     prefix search ako sk.wikipedia.org (profil `fuzzy`, čiže ignoruje
 *     diakritiku aj preklepy) a k nemu dohľadáva obrázok + krátky úryvok.
 *     Ak prefix search nič nenájde, doplníme reálne články, ktorých názov
 *     výraz obsahuje (`intitle:`), prípadne fulltextové zhody — takže
 *     priebežné písanie nikdy neskončí s prázdnym výsledkom.
 *  2. `?q=…&offset=…`  — plnohodnotné fulltextové vyhľadávanie (Special:Search)
 *     so zvýraznenými úryvkami, počtom slov, dátumom úpravy a náhľadmi.
 *
 * Rýchlosť: jeden upstream request na našepťovanie, Next.js data cache
 * (5 min) + CDN cache (`stale-while-revalidate`), žiadne zbytočné volania.
 */

const SUGGEST_LIMIT = 10;
/**
 * Koľko návrhov stačí na to, aby sme nedohľadávali ďalšie zdroje.
 * Nízke číslo = našeptávač väčšinou vystačí s jediným upstream requestom
 * (rýchlosť), pri 1–2 zhodách ešte doplníme reálne články podľa názvu.
 */
const ENOUGH_SUGGESTIONS = 3;

type RawPage = {
  pageid?: number;
  ns?: number;
  title?: string;
  index?: number;
  extract?: string;
  thumbnail?: { source?: string };
  missing?: string;
  invalid?: string;
};

type ApiResult = {
  title: string;
  slug: string;
  snippet: string;
  wordcount: number;
  timestamp: string;
  thumbnail: string | null;
  /** Ako sme článok našli — kvôli zoradeniu a debugovaniu. */
  source: 'prefix' | 'title' | 'fulltext';
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Z MediaWiki snippetu necháme len zvýraznenie nájdeného výrazu. */
function cleanSnippet(snippet: string): string {
  return snippet.replace(/<(?!\/?span class="searchmatch")[^>]+>/g, '').trim();
}

/** CirrusSearch má vlastnú syntax — úvodzovky/operátory z používateľského vstupu odstránime. */
function sanitizeForCirrus(query: string): string {
  return query.replace(/["'`\\^~{}[\]|<>:*?!()/]/g, ' ').replace(/\s+/g, ' ').trim();
}

function toSuggestion(page: RawPage, source: ApiResult['source']): ApiResult | null {
  if (!page?.pageid || page.ns !== 0 || !page.title) return null;
  const extract = (page.extract || '').trim();
  return {
    title: page.title,
    slug: titleToSlug(page.title),
    snippet: escapeHtml(extract) + (extract.length >= 190 ? '…' : ''),
    wordcount: extract ? extract.split(/\s+/).length : 0,
    timestamp: '',
    thumbnail: page.thumbnail?.source || null,
    source,
  };
}

/** Našeptávač: prefix search + náhľad + úryvok v jedinom requeste. */
async function fetchPrefixSuggestions(query: string, limit: number): Promise<ApiResult[]> {
  const data = await wikiApi(
    {
      action: 'query',
      redirects: 1,
      generator: 'prefixsearch',
      gpssearch: query,
      gpsnamespace: 0,
      gpslimit: limit,
      // fuzzy = ignoruje diakritiku a opraví preklepy ("ludovit stur" → "Ľudovít Štúr")
      gpsprofile: 'fuzzy',
      prop: 'pageimages|extracts',
      piprop: 'thumbnail',
      pithumbsize: 120,
      pilimit: 'max',
      exintro: 1,
      explaintext: 1,
      exchars: 200,
      exlimit: 'max',
    },
    { revalidate: 300, timeoutMs: 5000 },
  );
  return sortPagesByIndex(wikiPages<RawPage>(data))
    .map((page) => toSuggestion(page, 'prefix'))
    .filter((item): item is ApiResult => Boolean(item));
}

/** Doplnkové vyhľadávanie cez generátor (intitle: / fulltext) — opäť 1 request. */
async function fetchGeneratorSuggestions(
  search: string,
  limit: number,
  source: ApiResult['source'],
): Promise<ApiResult[]> {
  const data = await wikiApi(
    {
      action: 'query',
      generator: 'search',
      gsrsearch: search,
      gsrnamespace: 0,
      gsrlimit: limit,
      prop: 'pageimages|extracts',
      piprop: 'thumbnail',
      pithumbsize: 120,
      pilimit: 'max',
      exintro: 1,
      explaintext: 1,
      exchars: 200,
      exlimit: 'max',
    },
    { revalidate: 300, timeoutMs: 5000 },
  );
  return sortPagesByIndex(wikiPages<RawPage>(data))
    .map((page) => toSuggestion(page, source))
    .filter((item): item is ApiResult => Boolean(item));
}

function mergeUnique(primary: ApiResult[], extra: ApiResult[], limit: number): ApiResult[] {
  const seen = new Set(primary.map((item) => item.title.toLocaleLowerCase('sk-SK')));
  const merged = [...primary];
  for (const item of extra) {
    if (merged.length >= limit) break;
    const key = item.title.toLocaleLowerCase('sk-SK');
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }
  return merged;
}

/** Presná zhoda názvu (bez diakritiky/veľkosti písmen) patrí vždy na prvé miesto. */
function promoteExactMatch(results: ApiResult[], query: string): ApiResult[] {
  if (results.length < 2) return results;
  const folded = query.toLocaleLowerCase('sk-SK').replace(/\s+/g, ' ').trim();
  const index = results.findIndex(
    (item) => item.title.toLocaleLowerCase('sk-SK').replace(/\s+/g, ' ') === folded,
  );
  if (index <= 0) return results;
  const [exact] = results.splice(index, 1);
  return [exact, ...results];
}

async function suggest(query: string, limit: number) {
  let results: ApiResult[] = [];
  let attempts = 0;
  let failures = 0;

  // 1) To, čo robí vyhľadávacie pole na Wikipédii — prefix search.
  attempts += 1;
  try {
    results = await fetchPrefixSuggestions(query, limit);
  } catch {
    failures += 1;
  }
  if (results.length >= ENOUGH_SUGGESTIONS) {
    return promoteExactMatch(results, query).slice(0, limit);
  }

  const safeQuery = sanitizeForCirrus(query);

  // 2) Názvy článkov obsahujúce výraz kdekoľvek (nie len na začiatku).
  if (safeQuery.length >= 2) {
    attempts += 1;
    try {
      const byTitle = await fetchGeneratorSuggestions(`intitle:${safeQuery}`, limit, 'title');
      results = mergeUnique(results, byTitle, limit);
    } catch {
      failures += 1; // intitle je len doplnok — nesmie zhodiť celý našeptávač
    }
  }
  if (results.length >= 1) return promoteExactMatch(results, query).slice(0, limit);

  // 3) Posledná záchrana: skutočný fulltext (výraz sa vyskytuje v texte článkov).
  if (safeQuery.length >= 3) {
    attempts += 1;
    try {
      const byText = await fetchGeneratorSuggestions(safeQuery, 5, 'fulltext');
      results = mergeUnique(results, byText, limit);
    } catch {
      failures += 1;
    }
  }

  // Ak vypadli všetky zdroje, neklameme „nič sa nenašlo“ — klient podrží
  // predchádzajúce návrhy a zopakuje dotaz neskôr.
  if (results.length === 0 && attempts > 0 && failures === attempts) {
    throw new WikiApiError('Wikipedia suggestions unavailable', 502);
  }

  return results.slice(0, limit);
}

/** Plné vyhľadávanie — Special:Search so snippetmi a stránkovaním. */
async function fulltext(query: string, limit: number, offset: number) {
  const data = await wikiApi(
    {
      action: 'query',
      list: 'search',
      srsearch: query,
      srnamespace: 0,
      srlimit: limit,
      sroffset: offset,
      srprop: 'snippet|wordcount|timestamp|redirecttitle',
      srinfo: 'totalhits|suggestion|rewrittenquery',
    },
    { revalidate: 60, timeoutMs: 8000 },
  );

  const hits: Array<{
    title: string;
    snippet?: string;
    wordcount?: number;
    timestamp?: string;
  }> = data?.query?.search || [];
  const searchinfo = data?.query?.searchinfo || {};
  const totalHits: number = searchinfo.totalhits ?? hits.length;
  const suggestion: string = searchinfo.suggestion || '';

  const results: ApiResult[] = hits.map((hit) => ({
    title: hit.title,
    slug: titleToSlug(hit.title),
    snippet: cleanSnippet(hit.snippet || ''),
    wordcount: hit.wordcount || 0,
    timestamp: hit.timestamp || '',
    thumbnail: null,
    source: 'fulltext' as const,
  }));

  if (!results.length) {
    // Ani fulltext nič nenašiel? Skúsme reálne články podľa názvu, aby stránka
    // výsledkov nezostala prázdna pri preklepe či chýbajúcej diakritike.
    const safeQuery = sanitizeForCirrus(query);
    if (safeQuery.length >= 2 && offset === 0) {
      try {
        const byTitle = await fetchGeneratorSuggestions(`intitle:${safeQuery}`, limit, 'title');
        return { results: byTitle, totalHits: byTitle.length, offset, suggestion };
      } catch {
        /* ignorujeme */
      }
    }
    return { results: [], totalHits, offset, suggestion };
  }

  // Náhľady pre nájdené články v jednom requeste (paralelne s ničím — potrebujeme názvy).
  try {
    const thumbs = await wikiApi(
      {
        action: 'query',
        titles: results.map((result) => result.title).join('|'),
        prop: 'pageimages',
        piprop: 'thumbnail',
        pithumbsize: 120,
        pilimit: 'max',
        redirects: 1,
      },
      { revalidate: 300, timeoutMs: 5000 },
    );
    const byTitle = new Map<string, string>();
    wikiPages<{ title?: string; thumbnail?: { source?: string } }>(thumbs).forEach((page) => {
      if (page.title && page.thumbnail?.source) byTitle.set(page.title, page.thumbnail.source);
    });
    results.forEach((result) => {
      result.thumbnail = byTitle.get(result.title) || null;
    });
  } catch {
    /* Náhľady sú voliteľné. */
  }

  return { results, totalHits, offset, suggestion };
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = (params.get('q') || '').trim();
  const isSuggest = params.get('suggest') === '1';
  const limit = Math.min(20, Math.max(1, parseInt(params.get('limit') || '10', 10) || SUGGEST_LIMIT));
  const offset = Math.max(0, parseInt(params.get('offset') || '0', 10) || 0);

  if (!query) {
    return wikiJson({ results: [], totalHits: 0, offset, query: '' }, { maxAge: 0 });
  }

  try {
    if (isSuggest) {
      const results = await suggest(query, limit);
      return wikiJson(
        { results, totalHits: results.length, offset: 0, query },
        { maxAge: 300 },
      );
    }

    const data = await fulltext(query, limit, offset);
    return wikiJson({ ...data, query }, { maxAge: 60 });
  } catch (error) {
    // Dočasný výpadok Wikipédie nie je „neexistujúci výsledok“ — vrátime 502
    // a klient podrží predchádzajúce výsledky.
    console.error('Wikipedia search error:', error);
    return wikiJson(
      { results: [], totalHits: 0, offset, query, error: 'Failed to search Wikipedia' },
      { status: 502 },
    );
  }
}
