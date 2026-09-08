/**
 * Klient pre naše vlastné `/api/wikipedia/*` endpointy.
 *
 * Tri veci, ktoré robia vyhľadávanie rýchle a „bez hluchých miest“:
 *  1. pamäťová cache výsledkov (písanie späť, opakované dotazy → 0 ms),
 *  2. zdieľanie prebiehajúcich požiadaviek (ten istý dotaz sa neposiele 2×),
 *  3. prefetch článku, na ktorý používateľ pravdepodobne klikne.
 *
 * Cache žije len v pamäti prehliadača (jedna návšteva), žiadne zastarané dáta
 * medzi reloadmi.
 */

export interface SuggestionResult {
  title: string;
  slug: string;
  snippet: string;
  wordcount: number;
  timestamp: string;
  thumbnail: string | null;
  source?: 'prefix' | 'title' | 'fulltext';
}

export interface SearchPagePayload {
  results: SuggestionResult[];
  totalHits: number;
  offset: number;
  suggestion?: string;
}

export interface ArticlePayload {
  title: string;
  slug?: string;
  content: string;
  image: string | null;
  links: string[];
  categories: string[];
  wikipediaUrl?: string;
  redirectedFrom?: string | null;
}

interface CacheEntry<T> {
  at: number;
  value: T;
}

function createCache<T>(maxEntries: number, ttlMs: number) {
  const store = new Map<string, CacheEntry<T>>();

  return {
    get(key: string): T | undefined {
      const entry = store.get(key);
      if (!entry) return undefined;
      if (Date.now() - entry.at > ttlMs) {
        store.delete(key);
        return undefined;
      }
      // LRU: čerstvo použitý záznam presunieme na koniec.
      store.delete(key);
      store.set(key, entry);
      return entry.value;
    },
    set(key: string, value: T) {
      if (store.has(key)) store.delete(key);
      store.set(key, { at: Date.now(), value });
      while (store.size > maxEntries) {
        const oldest = store.keys().next().value;
        if (oldest === undefined) break;
        store.delete(oldest);
      }
    },
    clear() {
      store.clear();
    },
  };
}

const suggestionCache = createCache<SuggestionResult[]>(120, 10 * 60_000);
const searchPageCache = createCache<SearchPagePayload>(60, 5 * 60_000);
const articleCache = createCache<ArticlePayload | null>(40, 10 * 60_000);
const imageCache = createCache<string | null>(60, 10 * 60_000);

const inflight = new Map<string, Promise<unknown>>();

/** Kľúč cache — ignoruje veľkosť písmen a viacnásobné medzery. */
export function normalizeKey(value: string): string {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('sk-SK');
}

/** Slovenská diakritika/case-insensitive porovnanie názvov. */
export function foldTitle(value: string): string {
  return value
    .toLocaleLowerCase('sk-SK')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function dedupe<T>(key: string, run: () => Promise<T>): Promise<T> {
  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;
  const promise = run().finally(() => {
    if (inflight.get(key) === promise) inflight.delete(key);
  });
  inflight.set(key, promise);
  return promise;
}

/** Našeptávač (prefix search nad reálnou Wikipédiou). */
export function fetchSuggestions(query: string, signal?: AbortSignal): Promise<SuggestionResult[]> {
  const key = `suggest:${normalizeKey(query)}`;
  const cached = suggestionCache.get(key);
  if (cached) return Promise.resolve(cached);

  return dedupe(key, async () => {
    const response = await fetch(
      `/api/wikipedia/search?suggest=1&limit=10&q=${encodeURIComponent(query.trim())}`,
      { signal },
    );
    if (!response.ok) throw new Error(`Suggestion request failed (${response.status})`);
    const data = await response.json();
    const results: SuggestionResult[] = Array.isArray(data.results) ? data.results : [];
    // Prázdny výsledok cacheujeme len krátko — pri ďalšom písaní to môže byť iné.
    suggestionCache.set(key, results);
    return results;
  });
}

/** Stránka s výsledkami plného vyhľadávania (Special:Search). */
export function fetchSearchPage(
  query: string,
  offset = 0,
  signal?: AbortSignal,
): Promise<SearchPagePayload> {
  const key = `search:${normalizeKey(query)}:${offset}`;
  const cached = searchPageCache.get(key);
  if (cached) return Promise.resolve(cached);

  return dedupe(key, async () => {
    const response = await fetch(
      `/api/wikipedia/search?q=${encodeURIComponent(query.trim())}&offset=${offset}`,
      { signal },
    );
    if (!response.ok) throw new Error(`Search request failed (${response.status})`);
    const data = await response.json();
    const payload: SearchPagePayload = {
      results: Array.isArray(data.results) ? data.results : [],
      totalHits: data.totalHits || 0,
      offset: data.offset ?? offset,
      suggestion: data.suggestion || '',
    };
    searchPageCache.set(key, payload);
    return payload;
  });
}

/** Obsah článku; `null` znamená „Wikipédia taký článok nemá“ (HTTP 404). */
export async function fetchArticle(title: string, signal?: AbortSignal): Promise<ArticlePayload | null> {
  const key = `article:${normalizeKey(title)}`;
  const cached = articleCache.get(key);
  if (cached !== undefined) return Promise.resolve(cached);

  return dedupe(key, async () => {
    const response = await fetch(`/api/wikipedia/article?title=${encodeURIComponent(title.trim())}`, {
      signal,
    });
    if (response.status === 404) {
      articleCache.set(key, null);
      return null;
    }
    if (!response.ok) throw new Error(`Article request failed (${response.status})`);
    const data = (await response.json()) as ArticlePayload;
    if (!data?.content) throw new Error('Article response is empty');
    articleCache.set(key, data);
    return data;
  });
}

const prefetched = new Set<string>();

/**
 * Prednačíta článok, na ktorý používateľ pravdepodobne klikne (prvý návrh).
 * Zlyhanie je neškodné — ide len o zrýchlenie.
 */
export function prefetchArticle(title: string): void {
  const key = normalizeKey(title);
  if (!key || prefetched.has(key) || prefetched.size > 40) return;
  prefetched.add(key);
  // Voľný cyklus — nech to nesúťaží s práve písaným dotazom.
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => void })
      .requestIdleCallback(() => void fetchArticle(title).catch(() => undefined), { timeout: 1500 });
    return;
  }
  setTimeout(() => void fetchArticle(title).catch(() => undefined), 250);
}

/** Náhradný obrázok pre generované (force) články — jedna cached požiadavka. */
export function fetchArticleImage(title: string, size = 320, signal?: AbortSignal): Promise<string | null> {
  const key = `image:${normalizeKey(title)}:${size}`;
  const cached = imageCache.get(key);
  if (cached !== undefined) return Promise.resolve(cached);

  return dedupe(key, async () => {
    try {
      const response = await fetch(
        `/api/wikipedia/image?title=${encodeURIComponent(title.trim())}&size=${size}`,
        { signal },
      );
      if (!response.ok) return null;
      const data = await response.json();
      const image: string | null = data?.image || null;
      imageCache.set(key, image);
      return image;
    } catch {
      return null;
    }
  });
}

/** Synchronický pohľad do cache našeptávača (okamžitý výpis pri spätnom mazaní). */
export function peekSuggestions(query: string): SuggestionResult[] | undefined {
  return suggestionCache.get(`suggest:${normalizeKey(query)}`);
}

/** Synchronický pohľad do cache článkov. */
export function peekArticle(title: string): ArticlePayload | null | undefined {
  return articleCache.get(`article:${normalizeKey(title)}`);
}

/**
 * Ktorý reálny článok má otvoriť Enter vo vyhľadávaní?
 *
 * Pravidlá (v poradí):
 *  1. presná zhoda názvu (bez ohľadu na diakritiku a veľkosť písmen),
 *  2. článok, ktorého názov začína písaným výrazom,
 *  3. článok nájdený podľa názvu (`prefix` / `title`) — nie podľa textu,
 *  4. inak `null` → overíme presný názov cez API, prípadne otvoríme stránku
 *     s výsledkami fulltextového hľadania.
 *
 * Vďaka tomu používateľ pri dopisovaní slova neskončí na „článok neexistuje“.
 */
export function pickSuggestionForTerm(
  term: string,
  suggestions: SuggestionResult[],
): SuggestionResult | null {
  const needle = foldTitle(term);
  if (!needle || suggestions.length === 0) return null;

  const exact = suggestions.find((item) => foldTitle(item.title) === needle);
  if (exact) return exact;

  const prefix = suggestions.find((item) => foldTitle(item.title).startsWith(needle));
  if (prefix) return prefix;

  const byTitle = suggestions.find((item) => item.source !== 'fulltext');
  return byTitle || null;
}
