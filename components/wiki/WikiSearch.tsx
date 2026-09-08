"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useWiki } from '@/lib/wiki-context';
import { ACTIVATION_CODE } from '@/lib/wiki-store';
import {
  fetchSuggestions,
  foldTitle,
  peekSuggestions,
  pickSuggestionForTerm,
  prefetchArticle,
  type SuggestionResult,
} from '@/lib/wiki-api-client';
import Image from 'next/image';

interface SearchResult extends SuggestionResult {
  excerpt?: string;
  snippetHtml?: string;
}

interface WikiSearchProps {
  fullPage?: boolean;
  onClose?: () => void;
}

/** Odpoveď API → položka našeptávača. */
function toSearchResult(result: SuggestionResult): SearchResult {
  const snippet = result.snippet || '';
  return {
    ...result,
    excerpt: snippet.replace(/<[^>]+>/g, ''),
    snippetHtml: snippet || undefined,
  };
}

function WikiSearchInner({ fullPage = false, onClose }: WikiSearchProps) {
  const [displayValue, setDisplayValue] = useState('');
  const [realInput, setRealInput] = useState('');
  const [rawSuggestions, setRawSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Načítavanie prebieha — doterajšie návrhy zostávajú viditeľné (žiadny blesk
  // „nič sa nenašlo“ počas písania).
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestIdRef = useRef(0);
  const router = useRouter();

  const { config, setConfig, resetArticleIndex, activateForce } = useWiki();

  const [mode, setMode] = useState<'normal' | 'typing_code' | 'wait_position' | 'typing_name' | 'typing_filler'>('normal');
  const [covertName, setCovertName] = useState('');
  const [coverTextIndex, setCoverTextIndex] = useState(0);

  const updateURL = useCallback((position: number, name: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('p', position.toString());
    url.searchParams.set('n', name);
    url.searchParams.set('m', encodeURIComponent(config.maskText));
    url.searchParams.set('f', config.showFeedback ? '1' : '0');
    window.history.replaceState({}, '', url.toString());
  }, [config.maskText, config.showFeedback]);

  const [codePosition, setCodePosition] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const prevValue = realInput;

    const isAddition = newValue.length > prevValue.length;
    const isDeletion = newValue.length < prevValue.length;

    const addedChars = isAddition ? newValue.slice(prevValue.length) : '';

    setRealInput(newValue);

    if (isDeletion) {
      const deletedCount = prevValue.length - newValue.length;

      if (mode === 'normal') {
        setDisplayValue(newValue);
      } else if (mode === 'typing_code') {
        const newCodePos = Math.max(0, codePosition - deletedCount);
        setCodePosition(newCodePos);
        setDisplayValue(prev => prev.slice(0, -deletedCount));

        if (newCodePos === 0) {
          setMode('normal');
          setDisplayValue(newValue);
        }
      } else if (mode === 'wait_position' || mode === 'typing_name' || mode === 'typing_filler') {
        setDisplayValue(prev => prev.slice(0, -deletedCount));
        setCoverTextIndex(prev => Math.max(0, prev - deletedCount));

        if (mode === 'typing_name' && covertName.length > 0) {
          setCovertName(prev => prev.slice(0, -deletedCount));
        }

        if (newValue.length === 0) {
          setMode('normal');
          setCoverTextIndex(0);
          setCovertName('');
          setCodePosition(0);
        }
      }
      return;
    }

    if (isAddition && addedChars.length > 0) {
      for (const char of addedChars) {
        processCharacter(char);
      }
    }
  };

  const processCharacter = (key: string) => {
    const lowerKey = key.toLowerCase();
    const coverText = config.maskText || 'História Slovenska';

    if (mode === 'normal') {
      if (lowerKey === ACTIVATION_CODE[0]) {
        setMode('typing_code');
        setCodePosition(1);
        setDisplayValue(prev => prev + key);
        return;
      }

      setDisplayValue(prev => prev + key);
    }

    else if (mode === 'typing_code') {
      if (codePosition < ACTIVATION_CODE.length && lowerKey === ACTIVATION_CODE[codePosition]) {
        const newCodePos = codePosition + 1;
        setCodePosition(newCodePos);

        if (newCodePos === ACTIVATION_CODE.length) {
          setDisplayValue(coverText.slice(0, ACTIVATION_CODE.length));
          setCoverTextIndex(ACTIVATION_CODE.length);
          setMode('wait_position');
          resetArticleIndex();
        } else {
          setDisplayValue(prev => prev + key);
        }
      } else {
        setMode('normal');
        setCodePosition(0);
        setDisplayValue(prev => prev + key);
      }
    }

    else if (mode === 'wait_position') {
      const posMap: Record<string, number> = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };

      if (posMap[lowerKey]) {
        const pos = posMap[lowerKey];
        setConfig({ ...config, forcePosition: pos, forceName: '', currentArticleIndex: 0, isForceActive: false });
        setMode('typing_name');
        setCovertName('');
      }

      if (coverTextIndex < coverText.length) {
        setDisplayValue(prev => prev + coverText[coverTextIndex]);
        setCoverTextIndex(prev => prev + 1);
      } else {
        setDisplayValue(prev => prev + ' ');
      }
    }

    else if (mode === 'typing_name') {
      if (key === ' ') {
        if (covertName.length > 0) {
          const finalName = covertName.toUpperCase();
          setConfig({
            ...config,
            forceName: finalName,
            currentArticleIndex: 0,
            isForceActive: false
          });

          updateURL(config.forcePosition, finalName);
        }

        setDisplayValue(coverText);
        setCoverTextIndex(coverText.length);
        setMode('typing_filler');
      } else {
        setCovertName(prev => prev + key);

        if (coverTextIndex < coverText.length) {
          setDisplayValue(prev => prev + coverText[coverTextIndex]);
          setCoverTextIndex(prev => prev + 1);
        } else {
          setDisplayValue(prev => prev + ' ');
        }
      }
    }

    else if (mode === 'typing_filler') {
      // Absorb keystrokes
    }
  };

  const isCovertMode = mode === 'wait_position' || mode === 'typing_name' || mode === 'typing_filler';
  const term = displayValue.trim();

  // ---------------------------------------------------------------------------
  // Našeptávač — reálne články zo slovenskej Wikipédie.
  //
  // Rýchlosť: krátke oneskorenie, pamäťová cache (spätné mazanie je okamžité),
  // zrušenie zastaraných požiadaviek a prednačítanie prvého článku.
  // Spoľahlivosť: kým neprídu nové výsledky, zobrazujeme predchádzajúce, takže
  // uprostred písania nikdy neblikne „nič sa nenašlo“.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const id = ++requestIdRef.current;

    if (!term) {
      setRawSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      setActiveIndex(-1);
      return;
    }

    setShowSuggestions(true);

    let cancelled = false;
    const controller = new AbortController();

    const apply = (results: SearchResult[]) => {
      if (cancelled || id !== requestIdRef.current) return;
      setRawSuggestions(results);
      setIsSearching(false);
      setActiveIndex(-1);
      // Prednačítaj najpravdepodobnejší článok — otvorí sa okamžite.
      const best = results.find((result) => result.source !== 'fulltext') || results[0];
      if (best) prefetchArticle(best.title);
    };

    const cached = peekSuggestions(term);
    if (cached) {
      apply(cached.map(toSearchResult));
      return () => {
        cancelled = true;
        controller.abort();
      };
    }

    setIsSearching(true);
    const delay = term.length <= 2 ? 60 : 110;
    const timer = setTimeout(() => {
      fetchSuggestions(term, controller.signal)
        .then((results) => apply(results.map(toSearchResult)))
        .catch((error) => {
          if (cancelled || (error as Error).name === 'AbortError') return;
          // Dočasný výpadok API nie je „neexistujúci výsledok“: podržíme
          // doterajšie návrhy a len ukončíme indikátor načítavania.
          if (id === requestIdRef.current) setIsSearching(false);
        });
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
    // `mode`/`config` zámerne nie sú v závislostiach — inak by každá zmena
    // maskovacieho režimu spustila nový dotaz na Wikipédiu.
  }, [term]);

  // Návrhy zobrazené v dropdowne (v utajenom režime zoradené podľa masky).
  const suggestions = useMemo(() => {
    if (!isCovertMode || rawSuggestions.length === 0) return rawSuggestions;

    const maskFolded = foldTitle(config.maskText || 'História Slovenska');
    const sorted = [...rawSuggestions].sort(
      (a, b) => Number(foldTitle(b.title) === maskFolded) - Number(foldTitle(a.title) === maskFolded),
    );

    if (config.showFeedback && config.forceName && sorted.length >= 2) {
      const positionLetter = String.fromCharCode(96 + config.forcePosition);
      sorted[1] = {
        ...sorted[1],
        excerpt: `${positionLetter}-${config.forceName.toLocaleLowerCase('sk-SK')}`,
        snippetHtml: undefined,
      };
    }

    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawSuggestions, isCovertMode, config.maskText, config.showFeedback, config.forceName, config.forcePosition]);

  // Spoločný reset vnútorného stavu vyhľadávania
  const resetSearchState = useCallback(() => {
    setDisplayValue('');
    setRealInput('');
    setMode('normal');
    setCovertName('');
    setCoverTextIndex(0);
    setCodePosition(0);
    setRawSuggestions([]);
    setShowSuggestions(false);
    setIsSearching(false);
    setActiveIndex(-1);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: SearchResult) => {
    if (config.forceName) {
      activateForce();
    }

    resetSearchState();
    router.push(`/wiki/${encodeURIComponent(suggestion.slug)}`);
    onClose?.();
  }, [activateForce, config.forceName, onClose, resetSearchState, router]);

  // Stránka s výsledkami plného vyhľadávania (Special:Search) — zobrazí reálne
  // zhody v textoch článkov, nikdy „článok neexistuje“.
  const goToFullSearch = useCallback((query: string) => {
    resetSearchState();
    router.push(
      `/wiki/${encodeURIComponent('Špeciálne:Hľadanie')}?q=${encodeURIComponent(query)}`,
    );
    onClose?.();
  }, [onClose, resetSearchState, router]);

  const handleSearch = useCallback(async () => {
    if (!term) return;

    const requestedTitle = isCovertMode ? (config.maskText || term).trim() : term;
    const needle = foldTitle(requestedTitle);

    // 1–3) Presná zhoda / zhoda podľa názvu z našeptávača → otvoríme okamžite,
    // bez ďalšieho volania na server.
    if (isCovertMode) {
      const exact = suggestions.find((item) => foldTitle(item.title) === needle);
      const target = exact || suggestions[0];
      if (target) {
        handleSuggestionClick(target);
        return;
      }
    } else {
      const target = pickSuggestionForTerm(requestedTitle, suggestions);
      if (target) {
        handleSuggestionClick(target);
        return;
      }
    }

    // 4) Našeptávač nič nemá (napr. okamžitý Enter) → overíme presný názov.
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const response = await fetch(
        `/api/wikipedia/resolve?title=${encodeURIComponent(requestedTitle)}`,
        { signal: controller.signal },
      );
      clearTimeout(timer);
      if (response.ok) {
        const resolved = await response.json();
        if (resolved.exists && resolved.slug) {
          handleSuggestionClick({ title: resolved.title, slug: resolved.slug, snippet: '' } as SearchResult);
          return;
        }
        if (!isCovertMode && resolved.closest?.slug) {
          // Najbližší návrh otvoríme len ak naozaj začína písaným výrazom —
          // inak radšej zobrazíme reálne výsledky fulltextového vyhľadávania.
          const closestFolded = foldTitle(resolved.closest.title || '');
          if (closestFolded.startsWith(needle)) {
            handleSuggestionClick({
              title: resolved.closest.title,
              slug: resolved.closest.slug,
              snippet: '',
            } as SearchResult);
            return;
          }
        }
      }
    } catch {
      // Rozhodovanie prenecháme fulltextovému vyhľadávaniu nižšie.
    }

    // 5) Fulltextové výsledky — reálne články obsahujúce hľadaný výraz.
    goToFullSearch(requestedTitle);
  }, [goToFullSearch, handleSuggestionClick, isCovertMode, config.maskText, suggestions, term]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const rowCount = suggestions.length + (!isCovertMode && term ? 1 : 0);

    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeIndex]);
        return;
      }
      if (activeIndex === suggestions.length && !isCovertMode && term) {
        goToFullSearch(term);
        return;
      }
      void handleSearch();
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (rowCount === 0) return;
      e.preventDefault();
      setActiveIndex((current) => {
        if (e.key === 'ArrowDown') {
          return current + 1 >= rowCount ? 0 : current + 1;
        }
        return current - 1 < 0 ? rowCount - 1 : current - 1;
      });
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setActiveIndex(-1);
      setShowSuggestions(false);
      onClose?.();
    }
  };

  const handleClear = () => {
    requestIdRef.current += 1;
    resetSearchState();
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const [isFocused, setIsFocused] = useState(false);

  // Auto-focus when in fullPage mode
  useEffect(() => {
    if (fullPage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [fullPage]);

  const showFullSearchRow = !isCovertMode && Boolean(term);
  const highlightClass = (index: number) => (index === activeIndex ? 'bg-[#eaf3ff]' : '');

  return (
    <div className={`relative ${fullPage ? 'w-full' : 'w-full'}`}>
      <div className="relative">
        {/* Hidden input for capture */}
        <input
          ref={inputRef}
          type="text"
          value={realInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (displayValue.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            setActiveIndex(-1);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          className="absolute inset-0 w-full h-full z-10 caret-transparent"
          style={{
            color: 'transparent',
            background: 'transparent',
            WebkitTextFillColor: 'transparent'
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          enterKeyHint="search"
          role="combobox"
          aria-expanded={showSuggestions && Boolean(term)}
          aria-controls="wiki-search-suggestions"
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `wiki-suggestion-${activeIndex}` : undefined}
        />

        {/* Minerva Neue mobile search box - white with blue border when focused */}
        <div
          className={`w-full flex items-center bg-white rounded-sm border-2 ${isFocused ? 'border-[#36c]' : 'border-[#a2a9b1]'}`}
          style={{ height: '40px' }}
        >
          {/* Display text */}
          <div
            className="flex-1 text-[16px] pointer-events-none px-3"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            <span className={displayValue ? 'text-[#202122]' : 'text-[#72777d]'}>
              {displayValue || 'Hľadať na Wikipédii'}
            </span>
          </div>

          {/* Indikátor načítavania */}
          {isSearching && (
            <div className="flex items-center justify-center w-10 h-full" aria-hidden="true">
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#c8ccd1" strokeWidth="3" />
                <path d="M21 12a9 9 0 00-9-9" stroke="#36c" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          )}

          {/* Clear button */}
          {displayValue && !isSearching && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center w-10 h-full text-[#54595d]"
              aria-label="Vymazať hľadanie"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="#72777d">
                <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm5 13.59L13.59 15 10 11.41 6.41 15 5 13.59 8.59 10 5 6.41 6.41 5 10 8.59 13.59 5 15 6.41 11.41 10 15 13.59z"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Dropdown suggestions - Minerva Neue mobile style with thumbnails */}
      {showSuggestions && term && (
        <div
          id="wiki-search-suggestions"
          role="listbox"
          className={`${fullPage ? 'fixed left-0 right-0 top-[56px]' : 'absolute top-full left-0 right-0'} bg-white z-50 overflow-auto`}
          style={{ maxHeight: fullPage ? 'calc(100vh - 56px)' : '400px' }}
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.slug}-${index}`}
              id={`wiki-suggestion-${index}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSuggestionClick(suggestion);
              }}
              className={`w-full text-left hover:bg-[#eaf3ff] flex items-center px-4 py-3 ${highlightClass(index)}`}
              style={{
                borderBottom: '1px solid #eaecf0',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              }}
            >
              {/* Thumbnail */}
              {suggestion.thumbnail ? (
                <div className="w-[56px] h-[56px] bg-[#f8f9fa] flex-shrink-0 flex items-center justify-center overflow-hidden rounded-sm mr-3">
                  <Image
                    src={suggestion.thumbnail}
                    alt=""
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-[56px] h-[56px] bg-[#f8f9fa] flex-shrink-0 flex items-center justify-center rounded-sm mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#c8ccd1">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"/>
                  </svg>
                </div>
              )}

              {/* Text content */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="text-[16px] font-bold text-[#202122] leading-tight truncate">
                  {suggestion.title}
                </div>
                {suggestion.snippetHtml ? (
                  <div
                    className="text-[14px] text-[#54595d] mt-1 leading-tight search-suggestion-snippet"
                    dangerouslySetInnerHTML={{ __html: suggestion.snippetHtml }}
                  />
                ) : suggestion.excerpt ? (
                  <div className="text-[14px] text-[#54595d] mt-1 line-clamp-1 leading-tight">
                    {suggestion.excerpt}
                  </div>
                ) : null}
              </div>
            </button>
          ))}

          {/* Načítavame reálne výsledky z Wikipédie — nie „nič sa nenašlo“ */}
          {isSearching && suggestions.length === 0 && (
            <div
              className="flex items-center px-4 py-3 text-[14px] text-[#54595d]"
              style={{
                borderBottom: showFullSearchRow ? '1px solid #eaecf0' : 'none',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              }}
              role="status"
              aria-live="polite"
            >
              <svg className="animate-spin mr-3" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="#eaecf0" strokeWidth="3" />
                <path d="M21 12a9 9 0 00-9-9" stroke="#36c" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Hľadám na Wikipédii…
            </div>
          )}

          {/* Spodný riadok — „Hľadať stránky obsahujúce…“ ako na Wikipédii */}
          {showFullSearchRow && (
            <button
              type="button"
              id="wiki-suggestion-fulltext"
              onMouseEnter={() => setActiveIndex(suggestions.length)}
              onMouseDown={(e) => {
                e.preventDefault();
                goToFullSearch(term);
              }}
              className={`w-full text-left hover:bg-[#eaf3ff] flex items-center px-4 py-3 bg-[#f8f9fa] ${highlightClass(suggestions.length)}`}
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              }}
            >
              <div className="w-[56px] h-[56px] flex-shrink-0 flex items-center justify-center mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#54595d" strokeWidth="2">
                  <circle cx="11" cy="11" r="7"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] text-[#202122] leading-tight">
                  Hľadať stránky obsahujúce <span className="font-bold text-[#3366cc]">{term}</span>
                </div>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function WikiSearch({ fullPage = false, onClose }: WikiSearchProps) {
  return <WikiSearchInner fullPage={fullPage} onClose={onClose} />;
}
