/**
 * Zdieľaný server-side klient pre MediaWiki API (sk.wikipedia.org).
 *
 * Všetky `/api/wikipedia/*` route-y ho používajú, aby mali rovnaké:
 *  - User-Agent (Wikimedia ho vyžaduje, inak vracia 403),
 *  - tvrdý timeout (pomalá Wikipédia nesmie zavesiť našu stránku),
 *  - retry pri výpadku / 429,
 *  - Next.js data cache + CDN cache hlavičky (rýchle opakované požiadavky).
 *
 * Pre testy / vlastnú inštanciu možno základnú URL prepísať premennou
 * prostredia `WIKIPEDIA_API_BASE` (napr. http://127.0.0.1:4999).
 */

export type WikiLang = 'sk' | 'en';

export type WikiApiParams = Record<string, string | number | boolean | undefined>;

export interface WikiApiOptions {
  /** Ktorú jazykovú mutáciu Wikipédie osloviť (predvolene slovenskú). */
  lang?: WikiLang;
  /** Sekundy pre Next.js data cache; `undefined`/0 = no-store. */
  revalidate?: number;
  /** Tvrdý timeout jedného pokusu v ms (predvolene 6000). */
  timeoutMs?: number;
  /** Počet opakovaní pri chybe siete / 429 / 5xx (predvolene 1). */
  retries?: number;
  /** Vonkajší signal (napr. zrušenie requestu klientom). */
  signal?: AbortSignal;
}

export class WikiApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status = 502, code?: string) {
    super(message);
    this.name = 'WikiApiError';
    this.status = status;
    this.code = code;
  }
}

const DEFAULT_BASES: Record<WikiLang, string> = {
  sk: 'https://sk.wikipedia.org',
  en: 'https://en.wikipedia.org',
};

export function wikiBaseUrl(lang: WikiLang = 'sk'): string {
  const override =
    lang === 'sk'
      ? process.env.WIKIPEDIA_API_BASE || process.env.WIKIPEDIA_SK_API_BASE
      : process.env.WIKIPEDIA_EN_API_BASE;
  return (override || DEFAULT_BASES[lang]).replace(/\/+$/, '');
}

/** Wikimedia vyžaduje identifikovateľný User-Agent, inak requesty odmieta. */
export const WIKI_HEADERS: Record<string, string> = {
  'User-Agent':
    process.env.WIKIPEDIA_USER_AGENT ||
    'WikiForce/1.0 (educational Wikipedia reader; sk-SK) Next.js/16',
  Accept: 'application/json; charset=utf-8',
  'Accept-Language': 'sk,en;q=0.6',
};

export function wikiApiUrl(params: WikiApiParams, lang: WikiLang = 'sk'): string {
  const url = new URL(`${wikiBaseUrl(lang)}/w/api.php`);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });
  // JSON bez "warnings" a s predvídateľným tvarom — menej dát, rýchlejší parse.
  if (!url.searchParams.has('format')) url.searchParams.set('format', 'json');
  return url.toString();
}

function combineSignals(timeoutMs: number, external?: AbortSignal): AbortSignal {
  const timeout = AbortSignal.timeout(timeoutMs);
  if (!external) return timeout;
  try {
    return AbortSignal.any([timeout, external]);
  } catch {
    return timeout;
  }
}

function isRetryableStatus(status: number): boolean {
  return status === 429 || status >= 500;
}

/**
 * Zavolá MediaWiki `api.php` a vráti parsovaný JSON.
 * Pri chybe siete / 429 / 5xx skúsi znovu (krátky backoff), inak vyhodí
 * `WikiApiError` so statusom, ktorý vie route poslať ďalej.
 */
export async function wikiApi<T = any>(
  params: WikiApiParams,
  options: WikiApiOptions = {},
): Promise<T> {
  const { lang = 'sk', revalidate, timeoutMs = 6000, retries = 1, signal } = options;
  const url = wikiApiUrl(params, lang);
  const init: RequestInit & { next?: { revalidate?: number } } = {
    headers: WIKI_HEADERS,
    cache: revalidate && revalidate > 0 ? undefined : 'no-store',
    ...(revalidate && revalidate > 0 ? { next: { revalidate } } : {}),
  };

  let lastError: unknown = null;
  let lastStatus = 502;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    if (signal?.aborted) throw new WikiApiError('Aborted', 499);
    try {
      const response = await fetch(url, { ...init, signal: combineSignals(timeoutMs, signal) });
      lastStatus = response.status;
      if (!response.ok) {
        if (isRetryableStatus(response.status) && attempt < retries) {
          await sleep(120 * (attempt + 1));
          continue;
        }
        // MediaWiki vracia k chybe aj telo (napr. code=missingtitle pri 404) —
        // to potrebujeme na rozlíšenie „neexistuje“ vs. „Wikipédia vypadla“.
        let code: string | undefined;
        let info: string | undefined;
        try {
          const body = (await response.clone().json()) as { error?: { code?: string; info?: string } };
          code = body?.error?.code;
          info = body?.error?.info;
        } catch {
          /* telo nebolo JSON */
        }
        throw new WikiApiError(
          info || `Wikipedia API responded ${response.status}`,
          response.status,
          code,
        );
      }
      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof WikiApiError) throw error;
      lastError = error;
      // Timeout / výpadok siete — krátky retry, potom preč.
      if (attempt < retries) {
        await sleep(120 * (attempt + 1));
        continue;
      }
    }
  }

  const reason = lastError instanceof Error ? lastError.message : 'unavailable';
  throw new WikiApiError(`Wikipedia API ${reason}`, lastStatus);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Cache-Control pre CDN / proxy: čerstvé dáta z cache, pri expirácii najprv
 * servíruj staré a na pozadí obnov (stale-while-revalidate), pri chybe
 * upstreamu pokojne aj staršie (stale-if-error).
 */
export function wikiCacheControl(maxAge: number, swr?: number): string {
  const stale = swr ?? Math.max(maxAge * 4, 60);
  return `public, max-age=5, s-maxage=${maxAge}, stale-while-revalidate=${stale}, stale-if-error=${stale * 4}`;
}

/** JSON odpoveď s CDN cache hlavičkami. */
export function wikiJson(
  body: unknown,
  init: { status?: number; maxAge?: number; swr?: number } = {},
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    Vary: 'Accept-Encoding',
  };
  if (init.maxAge && init.maxAge > 0) headers['Cache-Control'] = wikiCacheControl(init.maxAge, init.swr);
  return new Response(JSON.stringify(body), { status: init.status ?? 200, headers });
}

/** `query.pages` je v MediaWiki objekt indexovaný ID — prevedieme na pole. */
export function wikiPages<T = any>(data: any): T[] {
  const pages = data?.query?.pages;
  if (!pages) return [];
  return Object.values(pages) as T[];
}

/** Stránky zoradené podľa poradia, v akom ich vrátil generátor (`index`). */
export function sortPagesByIndex<T extends { index?: number }>(pages: T[]): T[] {
  return [...pages].sort((a, b) => (a.index ?? 9999) - (b.index ?? 9999));
}

/** Názov článku → slug používaný v našom `/wiki/[slug]` routingu. */
export function titleToSlug(title: string): string {
  return title.trim().replace(/\s+/g, '_');
}
