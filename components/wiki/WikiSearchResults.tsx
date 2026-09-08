"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchSearchPage, type SuggestionResult } from '@/lib/wiki-api-client';

type SearchResult = SuggestionResult;

interface WikiSearchResultsProps {
  initialQuery: string;
}

const PAGE_SIZE = 10;

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('sk-SK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/**
 * Stránka výsledkov vyhľadávania — klon „Špeciálne:Hľadanie“ zo sk.wikipedia.org.
 *
 * Zobrazuje reálne fulltextové výsledky s úryvkami, zvýraznením nájdeného
 * výrazu, počtom slov a dátumom poslednej úpravy; podporuje stránkovanie.
 *
 * Vyhľadáva priebežne počas písania (debounce + cache), pričom staré výsledky
 * necháva na obrazovke, kým neprídu nové — nikdy teda neblikne hláška, že sa
 * nič nenašlo. Tá sa zobrazí len po skutočne dokončenom hľadaní bez zhody.
 */
export function WikiSearchResults({ initialQuery }: WikiSearchResultsProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  /** Výraz, ku ktorému patria aktuálne výsledky — rozlišuje „hľadám“ a „našiel som nič“. */
  const [searchedTerm, setSearchedTerm] = useState('');
  const [failed, setFailed] = useState(false);
  const [didYouMean, setDidYouMean] = useState('');
  const requestIdRef = useRef(0);

  const runSearch = useCallback(
    async (term: string, pageOffset: number, options: { syncUrl?: boolean; signal?: AbortSignal } = {}) => {
      const trimmed = term.trim();
      if (!trimmed) return;
      const id = ++requestIdRef.current;
      setIsLoading(true);
      setFailed(false);
      try {
        const data = await fetchSearchPage(trimmed, pageOffset, options.signal);
        if (id !== requestIdRef.current) return; // medzitým prišiel novší dotaz
        setResults(data.results || []);
        setTotalHits(data.totalHits || 0);
        setOffset(data.offset ?? pageOffset);
        setSearchedTerm(trimmed);
        setDidYouMean(data.suggestion || '');
        if (options.syncUrl && trimmed !== initialQuery) {
          router.replace(
            `/wiki/${encodeURIComponent('Špeciálne:Hľadanie')}?q=${encodeURIComponent(trimmed)}`,
            { scroll: false },
          );
        }
      } catch (error) {
        if (options.signal?.aborted) return; // naše vlastné zrušenie (novšie písanie)
        if (id !== requestIdRef.current) return;
        // Dočasný výpadok Wikipédie: podržíme predchádzajúce výsledky a
        // netvrdíme, že hľadaný výraz neexistuje.
        setFailed(true);
      } finally {
        if (id === requestIdRef.current) setIsLoading(false);
      }
    },
    [initialQuery, router],
  );

  // Zmena URL (napr. klik na „Mysleli ste…“ alebo späť) → prevezme nový výraz.
  useEffect(() => {
    setQuery((current) => (current === initialQuery ? current : initialQuery || ''));
  }, [initialQuery]);

  // Priebežné vyhľadávanie počas písania.
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      requestIdRef.current += 1;
      setResults([]);
      setTotalHits(0);
      setOffset(0);
      setSearchedTerm('');
      setDidYouMean('');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    // Výraz priamo z URL hľadáme okamžite, písanie debounceujeme.
    const delay = trimmed === (initialQuery || '').trim() ? 0 : 250;
    const timer = setTimeout(() => {
      void runSearch(trimmed, 0, { syncUrl: true, signal: controller.signal });
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
    // `runSearch`/`initialQuery` menia len správanie debounceu, nie samotný dotaz.
  }, [query, initialQuery, runSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(
      `/wiki/${encodeURIComponent('Špeciálne:Hľadanie')}?q=${encodeURIComponent(trimmed)}`,
    );
  };

  const goToPage = (newOffset: number) => {
    void runSearch(query, Math.max(0, newOffset), { syncUrl: false });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const trimmedQuery = query.trim();
  const showEmptyState =
    !isLoading && !failed && trimmedQuery.length > 0 && searchedTerm === trimmedQuery && results.length === 0;
  const showResults = results.length > 0;

  return (
    <article className="bg-white min-h-screen" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Lato', 'Helvetica', 'Arial', sans-serif", color: '#202122' }}>
      <div className="px-4 py-4">
        <h1
          className="pb-2 border-b border-[#a2a9b1]"
          style={{
            fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif",
            fontSize: '24px',
            fontWeight: 'normal',
            lineHeight: 1.2,
            color: '#000000',
          }}
        >
          Výsledky vyhľadávania
        </h1>
        <p className="text-[#54595d] mt-1" style={{ fontSize: '12px' }}>
          Z Wikipédie, slobodnej encyklopédie
        </p>

        {/* Vyhľadávacie pole — ako na Special:Search */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 mb-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hľadať vo Wikipédii"
            className="flex-1 border-2 border-[#a2a9b1] focus:border-[#36c] rounded-sm px-3 outline-none"
            style={{ height: '40px', fontSize: '16px', fontFamily: 'inherit' }}
            autoFocus={!initialQuery}
            autoComplete="off"
            spellCheck="false"
            enterKeyHint="search"
          />
          <button
            type="submit"
            className="bg-[#3366cc] hover:bg-[#2a4b8d] text-white border border-[#2a4b8d] rounded-sm px-4 font-medium"
            style={{ height: '40px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            Hľadať
          </button>
        </form>

        {/* Stavový riadok — počas načítavania nijako netvrdíme, že výsledok neexistuje */}
        {isLoading && (
          <div className="flex items-center gap-2 py-3 text-[#54595d] text-[14px]" role="status" aria-live="polite">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="#eaecf0" strokeWidth="3" />
              <path d="M21 12a9 9 0 00-9-9" stroke="#36c" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Načítavajú sa výsledky z Wikipédie…
          </div>
        )}

        {failed && !isLoading && (
          <div className="py-4 text-[14px] text-[#202122] border border-[#a2a9b1] bg-[#f8f9fa] px-3">
            <p className="mb-2">
              Wikipédia momentálne neodpovedá, výsledky sa nepodarilo načítať.
            </p>
            <button
              type="button"
              onClick={() => runSearch(query, offset)}
              className="text-[#3366cc] hover:underline"
              style={{ cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', fontSize: '14px' }}
            >
              Skúsiť znova
            </button>
          </div>
        )}

        {showEmptyState && (
          <div className="py-6 text-[14px] text-[#202122]">
            <p className="mb-2">
              Vo Wikipédii <b>nie je žiadna stránka</b> obsahujúca výraz{' '}
              <b>{searchedTerm}</b>.
            </p>
            <p className="text-[#54595d]">
              Skúste iné kľúčové slová alebo skontrolujte pravopis.
            </p>
          </div>
        )}

        {didYouMean && showEmptyState && (
          <div className="pb-4 text-[14px]">
            Mysleli ste:{' '}
            <button
              type="button"
              onClick={() => setQuery(didYouMean)}
              className="text-[#3366cc] hover:underline"
              style={{ cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', fontSize: '14px' }}
            >
              <b>{didYouMean}</b>
            </button>
          </div>
        )}

        {showResults && (
          <>
            <div className="text-[13px] text-[#54595d] mt-3 mb-2">
              Zobrazené výsledky {offset + 1}–{offset + results.length} z približne{' '}
              <b>{totalHits.toLocaleString('sk-SK')}</b> nájdených.
            </div>

            {/* Zoznam výsledkov — rovnaké rozloženie ako Special:Search */}
            <ul className={`list-none p-0 m-0 ${isLoading ? 'opacity-60' : ''}`}>
              {results.map((r) => (
                <li key={r.slug} className="py-3 border-b border-[#eaecf0]">
                  <Link
                    href={`/wiki/${encodeURIComponent(r.slug)}`}
                    className="text-[18px] text-[#3366cc] hover:underline"
                    style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif" }}
                  >
                    {r.title}
                  </Link>
                  {r.thumbnail && (
                    <div className="float-right ml-3 mb-1 border border-[#c8ccd1] bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.thumbnail}
                        alt=""
                        className="block max-w-[80px] max-h-[80px] object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div
                    className="text-[14px] text-[#202122] mt-1 leading-relaxed mw-search-results"
                    dangerouslySetInnerHTML={{ __html: r.snippet }}
                  />
                  <div className="text-[12px] text-[#72777d] mt-1">
                    {r.wordcount ? `${r.wordcount.toLocaleString('sk-SK')} slov` : ''}
                    {r.wordcount && r.timestamp ? ' · ' : ''}
                    {r.timestamp ? `posledná úprava ${formatDate(r.timestamp)}` : ''}
                  </div>
                </li>
              ))}
            </ul>

            {/* Stránkovanie — ako „predchádzajúca 1 2 3 ďalšia stránka“ */}
            <div className="flex items-center justify-center gap-4 py-4 text-[14px]">
              {offset > 0 && (
                <button
                  type="button"
                  onClick={() => goToPage(offset - PAGE_SIZE)}
                  className="text-[#3366cc] hover:underline"
                  style={{ cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit' }}
                >
                  ← Predchádzajúca stránka
                </button>
              )}
              <span className="text-[#72777d]">strana {Math.floor(offset / PAGE_SIZE) + 1}</span>
              {results.length === PAGE_SIZE && (
                <button
                  type="button"
                  onClick={() => goToPage(offset + PAGE_SIZE)}
                  className="text-[#3366cc] hover:underline"
                  style={{ cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit' }}
                >
                  Ďalšia stránka →
                </button>
              )}
            </div>
          </>
        )}

        {!trimmedQuery && !isLoading && (
          <div className="py-6 text-[14px] text-[#54595d]">
            Zadajte hľadaný výraz do poľa vyššie. Wikipédia prehľadáva texty všetkých
            článkov a zobrazí tie, ktoré výraz obsahujú.
          </div>
        )}
      </div>
    </article>
  );
}
