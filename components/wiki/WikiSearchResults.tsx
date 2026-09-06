"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  slug: string;
  snippet: string;
  wordcount: number;
  timestamp: string;
  thumbnail: string | null;
}

interface WikiSearchResultsProps {
  initialQuery: string;
}

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

// Stránka výsledkov vyhľadávania — klon „Špeciálne:Hľadanie" zo sk.wikipedia.org.
// Zobrazuje reálne fulltextové výsledky s úryvkami, zvýraznením nájdeného
// výrazu, počtom slov a dátumom poslednej úpravy; podporuje stránkovanie.
export function WikiSearchResults({ initialQuery }: WikiSearchResultsProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const runSearch = useCallback(async (q: string, off: number) => {
    if (!q.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(
        `/api/wikipedia/search?q=${encodeURIComponent(q.trim())}&offset=${off}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setTotalHits(data.totalHits || 0);
      setOffset(off);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      runSearch(initialQuery, 0);
    }
  }, [initialQuery, runSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/wiki/${encodeURIComponent('Špeciálne:Hľadanie')}?q=${encodeURIComponent(query.trim())}`);
  };

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
          />
          <button
            type="submit"
            className="bg-[#3366cc] hover:bg-[#2a4b8d] text-white border border-[#2a4b8d] rounded-sm px-4 font-medium"
            style={{ height: '40px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            Hľadať
          </button>
        </form>

        {isLoading && (
          <div className="py-6 text-[#54595d] text-[14px]">Načítavajú sa výsledky…</div>
        )}

        {!isLoading && hasSearched && results.length === 0 && (
          <div className="py-6 text-[14px] text-[#202122]">
            <p className="mb-2">
              Vo Wikipédii <b>nie je žiadna stránka</b> obsahujúca výraz{' '}
              <b>{query}</b>.
            </p>
            <p className="text-[#54595d]">
              Skúste iné kľúčové slová alebo skontrolujte pravopis.
            </p>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <>
            <div className="text-[13px] text-[#54595d] mt-3 mb-2">
              Zobrazené výsledky {offset + 1}–{offset + results.length} z približne{' '}
              <b>{totalHits.toLocaleString('sk-SK')}</b> nájdených.
            </div>

            {/* Zoznam výsledkov — rovnaké rozloženie ako Special:Search */}
            <ul className="list-none p-0 m-0">
              {results.map((r) => (
                <li key={r.slug} className="py-3 border-b border-[#eaecf0]">
                  <Link
                    href={`/wiki/${r.slug}`}
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
                      />
                    </div>
                  )}
                  <div
                    className="text-[14px] text-[#202122] mt-1 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: r.snippet }}
                  />
                  <div className="text-[12px] text-[#72777d] mt-1">
                    {r.wordcount.toLocaleString('sk-SK')} slov
                    {r.timestamp ? ` · posledná úprava ${formatDate(r.timestamp)}` : ''}
                  </div>
                </li>
              ))}
            </ul>

            {/* Stránkovanie — ako „predchádzajúca 1 2 3 ďalšia stránka" */}
            <div className="flex items-center justify-center gap-4 py-4 text-[14px]">
              {offset > 0 && (
                <button
                  type="button"
                  onClick={() => runSearch(query, Math.max(0, offset - 10))}
                  className="text-[#3366cc] hover:underline"
                  style={{ cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit' }}
                >
                  ← Predchádzajúca stránka
                </button>
              )}
              <span className="text-[#72777d]">strana {Math.floor(offset / 10) + 1}</span>
              {results.length === 10 && (
                <button
                  type="button"
                  onClick={() => runSearch(query, offset + 10)}
                  className="text-[#3366cc] hover:underline"
                  style={{ cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit' }}
                >
                  Ďalšia stránka →
                </button>
              )}
            </div>
          </>
        )}

        {!hasSearched && !isLoading && (
          <div className="py-6 text-[14px] text-[#54595d]">
            Zadajte hľadaný výraz do poľa vyššie. Wikipédia prehľadáva texty všetkých
            článkov a zobrazí tie, ktoré výraz obsahujú.
          </div>
        )}
      </div>
    </article>
  );
}
