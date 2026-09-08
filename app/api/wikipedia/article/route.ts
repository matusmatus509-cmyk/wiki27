import { NextRequest } from 'next/server';
import {
  sortPagesByIndex,
  titleToSlug,
  wikiApi,
  wikiJson,
  wikiPages,
  WikiApiError,
} from '@/lib/server/wikipedia-api';

/**
 * Načíta skutočný článok zo slovenskej Wikipédie (MediaWiki `action=parse`).
 *
 * Rýchlosť:
 *  - HTML článku a náhľadový obrázok sa sťahujú paralelne (nie za sebou),
 *  - odpoveď cacheuje Next.js data cache (1 h) aj CDN (`stale-while-revalidate`),
 *  - každé volanie má tvrdý timeout, takže pomalá Wikipédia nezablokuje stránku.
 *
 * Spoľahlivosť: ak článok s presným názvom neexistuje, dohľadáme najbližší
 * reálny článok (prefix search → `intitle:` → fulltext) a vrátime ten, takže
 * používateľ takmer nikdy neskončí na stránke „článok neexistuje“.
 */

// `prop=links` zámerne nepoužívame: pri veľkých článkoch (Bratislava ~1500
// odkazov) výrazne zväčšuje odpoveď a spomaľuje načítanie. Odkazy získame
// priamo z HTML článku, kde ich aj tak potrebujeme.
const PARSE_PROPS = 'text|categories';

type RawPage = { pageid?: number; ns?: number; title?: string; index?: number };

// Odstránime z parse HTML všetko, čo nepatrí do tela článku — šablóny,
// navigačné boxy, správy o údržbe a ďalšie meta prvky. CSS ich síce aj tak
// skrýva, ale server-side čistenie výrazne zníži prenášaný objem dát.
function cleanArticleHtml(html: string): string {
  return (
    html
      // <style> bloky z predlohy (tlačové/tmavé štýly Hlavnej stránky a pod.)
      .replace(/<style[\s\S]*?<\/style>/g, '')
      // Editovacie sekcie a odkazy na editáciu
      .replace(/<span class="mw-editsection[\s\S]*?<\/span>/g, '')
      // Referencie inline (superscript) — číslovaný zoznam zostáva
      .replace(/<sup class="reference[^"]*"[^>]*>[\s\S]*?<\/sup>/g, '')
      .replace(/<sup id="cite_ref[^"]*"[^>]*>[\s\S]*?<\/sup>/g, '')
      // Navigačné a meta boxy (navbox, ambox, sistersitebox, side-box…)
      .replace(/<div class="(?:navbox|sistersitebox|side-box|metadata|ambox|dmbox|mw-jump-link|noprint|printonly)[^"]*"[^>]*>[\s\S]*?<\/div>/g, '')
      .replace(/<table class="(?:navbox|metadata|ambox|vertical-navbox)[^"]*"[^>]*>[\s\S]*?<\/table>/g, '')
      // Skryté šablónové prvky
      .replace(/<div style="display:\s*none[^>]*>[\s\S]*?<\/div>/g, '')
      // Kategórie v spodku článku (zobrazujeme vlastný blok)
      .replace(/<div id="catlinks[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/g, '')
      .replace(/<div id="catlinks[^"]*"[^>]*>[\s\S]*?<\/div>/g, '')
      // Prázdne odseky z čistenia
      .replace(/<p><\/p>/g, '')
  );
}

function parseArticle(title: string) {
  return wikiApi(
    {
      action: 'parse',
      page: title,
      prop: PARSE_PROPS,
      redirects: 1,
      disableeditsection: true,
      disablelimitreport: 1,
    },
    { revalidate: 3600, timeoutMs: 12000 },
  );
}

function fetchThumbnail(title: string, size = 320): Promise<string | null> {
  return wikiApi(
    {
      action: 'query',
      titles: title,
      prop: 'pageimages',
      piprop: 'thumbnail',
      pithumbsize: size,
      redirects: 1,
    },
    { revalidate: 3600, timeoutMs: 6000 },
  )
    .then((data) => {
      const page = wikiPages<{ thumbnail?: { source?: string } }>(data)[0];
      return page?.thumbnail?.source || null;
    })
    .catch(() => null);
}

/** Nájde najbližší reálny článok k zadanému (chýbajúcemu) názvu. */
async function findClosestArticle(title: string): Promise<string | null> {
  const folded = title.toLocaleLowerCase('sk-SK').replace(/\s+/g, ' ').trim();
  const safe = title.replace(/["'`\\^~{}[\]|<>:*?!()/]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!safe) return null;

  // 1) Prefix search (fuzzy) — presná zhoda bez diakritiky, inak prvý návrh.
  try {
    const data = await wikiApi(
      {
        action: 'query',
        redirects: 1,
        generator: 'prefixsearch',
        gpssearch: safe,
        gpsnamespace: 0,
        gpslimit: 10,
        gpsprofile: 'fuzzy',
      },
      { revalidate: 300, timeoutMs: 5000 },
    );
    const pages = sortPagesByIndex(wikiPages<RawPage>(data)).filter((page) => page.pageid && page.ns === 0);
    const exact = pages.find(
      (page) => (page.title || '').toLocaleLowerCase('sk-SK').replace(/\s+/g, ' ') === folded,
    );
    if (exact?.title) return exact.title;
    const startsWith = pages.find((page) =>
      (page.title || '').toLocaleLowerCase('sk-SK').startsWith(folded),
    );
    if (startsWith?.title) return startsWith.title;
    if (pages[0]?.title) return pages[0].title;
  } catch {
    /* pokračujeme ďalším spôsobom */
  }

  // 2) Fulltext — článok, ktorý výraz reálne obsahuje.
  try {
    const data = await wikiApi(
      { action: 'query', list: 'search', srsearch: safe, srnamespace: 0, srlimit: 1, srprop: 'wordcount' },
      { revalidate: 300, timeoutMs: 5000 },
    );
    const hit = (data?.query?.search || [])[0];
    if (hit?.title) return hit.title as string;
  } catch {
    /* ignorujeme */
  }

  return null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = (searchParams.get('title') || '').trim();

  if (!title) {
    return wikiJson({ error: 'Title is required' }, { status: 400 });
  }

  // HTML článku aj obrázok ťaháme naraz — latencia = max, nie súčet.
  const parsePromise = parseArticle(title).catch((error: unknown) => error);
  const thumbPromise = fetchThumbnail(title);

  let parseData = await parsePromise;
  let imageUrl = await thumbPromise;
  let redirectedFrom: string | null = null;

  // MediaWiki hlási neexistujúcu stránku ako HTTP 404 s code=missingtitle.
  const isMissingError =
    parseData instanceof WikiApiError &&
    (parseData.code === 'missingtitle' || parseData.status === 404);
  const missing =
    isMissingError ||
    (!(parseData instanceof Error) && Boolean((parseData as any)?.error));

  if (missing) {
    // Článok s presným názvom neexistuje → dohľadáme najbližší reálny článok
    // (rovnaké správanie ako „možno hľadáte“ na Wikipédii).
    const closest = await findClosestArticle(title);
    if (closest && closest !== title) {
      try {
        const [retryData, retryImage] = await Promise.all([
          parseArticle(closest),
          fetchThumbnail(closest),
        ]);
        if (!(retryData instanceof Error) && !(retryData as any)?.error) {
          parseData = retryData;
          imageUrl = retryImage;
          redirectedFrom = title;
        }
      } catch {
        /* ponecháme pôvodnú chybu */
      }
    }
  }

  if (parseData instanceof Error) {
    if (parseData instanceof WikiApiError && (parseData.code === 'missingtitle' || parseData.status === 404)) {
      // Ani po dohľadaní sa nič nenašlo — článok s týmto názvom naozaj neexistuje.
      return wikiJson({ error: 'Article not found', title }, { status: 404 });
    }
    const status = parseData instanceof WikiApiError ? parseData.status : 503;
    console.error('Wikipedia article error:', parseData);
    return wikiJson(
      { error: 'Wikipedia API is temporarily unavailable' },
      { status: status >= 500 ? 503 : status },
    );
  }

  const data = parseData as any;
  if (data.error) {
    return wikiJson({ error: 'Article not found', title }, { status: 404 });
  }

  const parsed = data.parse;
  if (!parsed?.title) {
    return wikiJson({ error: 'Article not found', title }, { status: 404 });
  }

  // Process HTML content - fix relative links to point to our wiki
  let htmlContent: string = parsed.text?.['*'] || '';

  // Fix Wikipedia internal links to work with our routing.
  // DÔLEŽITÉ: zachováme presný názov článku (veľké/malé písmená aj
  // podčiarkovníky), inak by napr. odkaz na „Albert_Einstein“ viedol na
  // neexistujúci článok „albert-einstein“.
  htmlContent = htmlContent.replace(
    /href="\/wiki\/([^"#]+)"/g,
    (_match: string, article: string) => `href="/wiki/${article}" data-internal="true"`,
  );

  htmlContent = cleanArticleHtml(htmlContent);

  // Odkazy na iné články — priamo z HTML (rýchlejšie ako prop=links).
  const links = extractInternalLinks(htmlContent);

  // Kategórie — len viditeľné (nie údržbové/skryté) a bez menných priestorov.
  const categories = (parsed.categories || [])
    .filter((cat: { hidden?: string }) => !cat.hidden)
    .map((cat: { '*': string }) => cat['*'])
    .filter((category: string) => !category.includes(':'))
    .slice(0, 5);

  return wikiJson(
    {
      title: parsed.title,
      slug: titleToSlug(parsed.title),
      content: htmlContent,
      image: imageUrl,
      links,
      categories,
      redirectedFrom: redirectedFrom || data.redirectedFrom || null,
      wikipediaUrl: `${wikiArticleUrl(parsed.title)}`,
    },
    // Články sa menia zriedka — CDN ich môže servírovať z cache veľmi dlho.
    { maxAge: 3600, swr: 86400 },
  );
}

/** Interné odkazy z HTML článku (deduplikované, max. 20). */
function extractInternalLinks(html: string): string[] {
  const found: string[] = [];
  const seen = new Set<string>();
  const pattern = /href="\/wiki\/([^"#]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null && found.length < 20) {
    try {
      const title = decodeURIComponent(match[1]).replace(/_/g, ' ');
      if (!title || title.includes(':')) continue;
      const key = title.toLocaleLowerCase('sk-SK');
      if (seen.has(key)) continue;
      seen.add(key);
      found.push(title);
    } catch {
      /* neplatné percent-encoding preskočíme */
    }
  }
  return found;
}

function wikiArticleUrl(title: string): string {
  const base = process.env.WIKIPEDIA_SITE_BASE || 'https://sk.wikipedia.org';
  return `${base.replace(/\/+$/, '')}/wiki/${encodeURIComponent(titleToSlug(title))}`;
}
