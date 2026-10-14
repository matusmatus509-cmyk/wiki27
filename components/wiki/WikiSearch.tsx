"use client";

import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { useRouter } from 'next/navigation';
import { useWiki } from '@/lib/wiki-context';
import { ACTIVATION_CODE } from '@/lib/wiki-store';
import Image from 'next/image';
import { WikiIcon } from './WikiIcon';

interface SearchResult {
  title: string;
  slug: string;
  excerpt: string;
  snippetHtml?: string;
  wordcount?: number;
  thumbnail?: string;
  // Syntetický návrh (maskovací text vložený lokálne) — nikdy sa nesmie použiť
  // ako cieľ navigácie, ak sa nepodarí overiť, že článok naozaj existuje.
  synthetic?: boolean;
}

interface WikiSearchProps {
  fullPage?: boolean;
  onClose?: () => void;
}

function WikiSearchInner({ fullPage = false, onClose }: WikiSearchProps) {
  const [displayValue, setDisplayValue] = useState('');
  const [realInput, setRealInput] = useState('');
  const [storedSuggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [resultKey, setResultKey] = useState('');
  const searchId = useId();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const { config, setConfig, resetArticleIndex, activateForce } = useWiki();

  const [mode, setMode] = useState<'normal' | 'typing_code' | 'wait_position' | 'typing_name' | 'typing_filler'>('normal');
  const [covertName, setCovertName] = useState('');
  const [coverTextIndex, setCoverTextIndex] = useState(0);

  const suggestionKey = `${displayValue}:${mode}:${config.forceName}:${config.forcePosition}:${config.showFeedback}`;
  const suggestions = resultKey === suggestionKey ? storedSuggestions : [];
  const suggestionsLoading = Boolean(displayValue.trim()) && resultKey !== suggestionKey;

  const updateURL = useCallback((position: number, name: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('p', position.toString());
    url.searchParams.set('n', name);
    // URLSearchParams kóduje sám — bez manuálneho enkódovania (inak vznikne
    // dvojité enkódovanie „Albert%2520Einstein" → pokazený maskText).
    url.searchParams.set('m', config.maskText);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setShowSuggestions(true);
      setActiveSuggestion(index => Math.max(-1, Math.min(suggestions.length - 1, index + (e.key === 'ArrowDown' ? 1 : -1))));
      return;
    }
    if (e.key === 'Escape') { setShowSuggestions(false); setActiveSuggestion(-1); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Search suggestions with Wikipedia API
  useEffect(() => {
    const isCovertMode = mode === 'wait_position' || mode === 'typing_name' || mode === 'typing_filler';
    
    if (displayValue.length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    setShowSuggestions(true);
    setActiveSuggestion(-1);

    const controller = new AbortController();
    const term = displayValue.trim();
    const maskText = (config.maskText || 'História Slovenska').trim();

    const searchWikipedia = async () => {
      try {
        const response = await fetch(`/api/wikipedia/search?suggest=1&q=${encodeURIComponent(term)}`, { signal: controller.signal });
        if (!response.ok) throw new Error('Wikipedia search failed');
        const data = await response.json();
        const realResults: SearchResult[] = (data.results || []).map((result: { title: string; slug: string; snippet: string; wordcount: number; thumbnail: string | null }) => ({
          title: result.title,
          slug: result.slug,
          excerpt: result.snippet.replace(/<[^>]+>/g, ''),
          snippetHtml: result.snippet,
          wordcount: result.wordcount,
          thumbnail: result.thumbnail || undefined,
        }));

        if (isCovertMode) {
          // Zabezpečime, že maskovací článok (zoverený v nastaveniach) je vždy
          // prvý v návrhoch — a to aj keď prefix search vráti zvláštne výsledky.
          const maskExact = realResults.find(
            (r) => r.title.localeCompare(maskText, 'sk', { sensitivity: 'base' }) === 0,
          );
          if (maskExact) {
            const rest = realResults.filter((r) => r !== maskExact);
            realResults.splice(0, realResults.length, {
              ...maskExact,
              excerpt: maskExact.excerpt,
            }, ...rest);
          } else {
            const checked = await fetch(`/api/wikipedia/resolve?title=${encodeURIComponent(maskText)}`, { signal: controller.signal });
            if (checked.ok) {
              const exact = await checked.json();
              if (exact.exists) realResults.unshift({ title: exact.title, slug: exact.slug, excerpt: '' });
            }
          }

          if (config.showFeedback && config.forceName && realResults.length >= 2) {
            const positionLetter = String.fromCharCode(96 + config.forcePosition);
            realResults[1] = { ...realResults[1], excerpt: `${positionLetter}-${config.forceName.toLowerCase()}`, snippetHtml: undefined };
          }
        }

        if (controller.signal.aborted) return;
        setResultKey(suggestionKey);
        setSuggestions(realResults);
        setActiveSuggestion(-1);
        setShowSuggestions(true);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setResultKey(suggestionKey);
          setSuggestions([]);
          setShowSuggestions(true);
        }
      }
    };

    const timeoutId = setTimeout(searchWikipedia, 150);
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [suggestionKey, displayValue, config.showFeedback, config.forceName, config.forcePosition, mode, config.maskText]);

  const handleSearch = async () => {
    const term = displayValue.trim();
    if (!term) return;
    if (showSuggestions && activeSuggestion >= 0 && suggestions[activeSuggestion]) {
      handleSuggestionClick(suggestions[activeSuggestion]);
      return;
    }

    const isCovertMode =
      mode === 'wait_position' || mode === 'typing_name' || mode === 'typing_filler';
    const requestedTitle = isCovertMode
      ? (config.maskText || term).trim()
      : term;

    try {
      const response = await fetch(
        `/api/wikipedia/resolve?title=${encodeURIComponent(requestedTitle)}`,
      );
      if (response.ok) {
        const resolved = await response.json();
        if (resolved.exists && resolved.slug) {
          handleSuggestionClick({
            title: resolved.title,
            slug: resolved.slug,
            excerpt: '',
          });
          return;
        }
      }
    } catch {
      // On a temporary resolve failure, continue with already loaded API results.
    }

    if (isCovertMode) {
      // Maskovací text sa nepodarilo overiť ako článok — skúsime prvý REÁLNY
      // návrh z Wikipédie (nie syntetický záznam vložený lokálne).
      const realSuggestion = suggestions.find((s) => !s.synthetic);
      if (realSuggestion) {
        handleSuggestionClick(realSuggestion);
        return;
      }
    }

    resetSearchState();
    router.push(
      `/wiki/${encodeURIComponent('Špeciálne:Hľadanie')}?q=${encodeURIComponent(requestedTitle)}`,
    );
    onClose?.();
  };

  // Spoločný reset vnútorného stavu vyhľadávania
  const resetSearchState = () => {
    setDisplayValue('');
    setRealInput('');
    setMode('normal');
    setCovertName('');
    setCoverTextIndex(0);
    setCodePosition(0);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setDisplayValue('');
    setRealInput('');
    setMode('normal');
    setCovertName('');
    setCoverTextIndex(0);
    setCodePosition(0);
    setSuggestions([]);
    setShowSuggestions(false);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleSuggestionClick = (suggestion: SearchResult) => {
    if (config.forceName) {
      activateForce();
    }
    
    setDisplayValue('');
    setRealInput('');
    setMode('normal');
    setCovertName('');
    setCoverTextIndex(0);
    setCodePosition(0);
    setSuggestions([]);
    setShowSuggestions(false);
    
    router.push(`/wiki/${encodeURIComponent(suggestion.slug)}`);
    onClose?.();
  };

  const [isFocused, setIsFocused] = useState(false);

  // Auto-focus when in fullPage mode
  useEffect(() => {
    if (fullPage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [fullPage]);

  return (
    <div className={`wiki-search relative w-full ${fullPage ? 'wiki-search-full' : ''}`}>
      <div className="relative">
        <WikiIcon name="search" className="wiki-search-symbol" />
        {/* Input captures both ordinary searches and the existing masked sequence. */}
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-label="Hľadať na Wikipédii"
          aria-expanded={showSuggestions && Boolean(displayValue.trim())}
          aria-autocomplete="list"
          aria-controls={`${searchId}-suggestions`}
          aria-activedescendant={activeSuggestion >= 0 && suggestions[activeSuggestion] ? `${searchId}-suggestion-${activeSuggestion}` : undefined}
          value={realInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (displayValue.length > 0 && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          className="wiki-search-input absolute inset-0 w-full h-full z-10"
          style={{ 
            color: 'transparent', caretColor: '#202122',
            background: 'transparent',
            WebkitTextFillColor: 'transparent'
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          enterKeyHint="search"
        />
        
        {/* Minerva Neue mobile search box - white with blue border when focused */}
        <div 
          className={`w-full flex items-center bg-white rounded-sm border-2 ${isFocused ? 'border-[#36c]' : 'border-[#a2a9b1]'}`}
          style={{ height: '40px' }}
        >
          {/* Display text */}
          <div 
            className="wiki-search-label flex-1 text-[16px] pointer-events-none px-3" aria-hidden="true"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            <span className={displayValue ? 'text-[#202122]' : 'text-[#72777d]'}>
              {displayValue || 'Hľadať na Wikipédii'}
            </span>
          </div>
          
          {/* Clear button */}
          {displayValue && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Vymazať vyhľadávanie"
              className="wiki-search-clear relative z-20 flex items-center justify-center w-10 h-full text-[#54595d]"
            >
              <WikiIcon name="close" />
            </button>
          )}
        </div>
      </div>

      <button type="button" className="wiki-search-submit" onClick={handleSearch}>Hľadať</button>

      {/* Dropdown suggestions - Minerva Neue mobile style with thumbnails */}
      {showSuggestions && (suggestions.length > 0 || Boolean(displayValue.trim())) && (
        <div 
          className={`${fullPage ? 'fixed left-0 right-0' : 'absolute top-full left-0 right-0'} wiki-search-dropdown bg-white z-50 overflow-auto`}
          id={`${searchId}-suggestions`}
          role="listbox"
          style={{ maxHeight: fullPage ? 'calc(100dvh - 54px)' : '400px' }}
        >
          {suggestionsLoading && <div className="wiki-search-progress" role="status" aria-label="Hľadajú sa návrhy" />}
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.slug}-${index}`}
              id={`${searchId}-suggestion-${index}`}
              onMouseDown={e => e.preventDefault()}
              role="option"
              aria-selected={activeSuggestion === index}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleSuggestionClick(suggestion);
              }}
              className={`wiki-search-option w-full text-left hover:bg-[#eaf3ff] flex items-center px-4 py-3 ${activeSuggestion === index ? 'bg-[#eaf3ff]' : ''}`}
              onMouseEnter={() => setActiveSuggestion(index)}
              style={{ 
                borderBottom: index < suggestions.length - 1 ? '1px solid #eaecf0' : 'none',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              }}
            >
              {/* Thumbnail */}
              {suggestion.thumbnail ? (
                <div className="wiki-suggestion-thumbnail w-[56px] h-[56px] bg-[#f8f9fa] flex-shrink-0 flex items-center justify-center overflow-hidden rounded-sm mr-3">
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
                <div className="wiki-suggestion-thumbnail w-[56px] h-[56px] bg-[#f8f9fa] flex-shrink-0 flex items-center justify-center rounded-sm mr-3">
                  <WikiIcon name="article" />
                </div>
              )}
              
              {/* Text content */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="wiki-suggestion-title text-[16px] text-[#202122] leading-tight truncate">
                  {suggestion.title.toLocaleLowerCase('sk-SK').startsWith(displayValue.toLocaleLowerCase('sk-SK')) ? <><strong>{suggestion.title.slice(0, displayValue.length)}</strong>{suggestion.title.slice(displayValue.length)}</> : suggestion.title}
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

          {/* Spodný riadok — „Hľadať stránky obsahujúce…" ako na Wikipédii */}
          {mode === 'normal' && displayValue.trim() && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                resetSearchState();
                router.push(
                  `/wiki/${encodeURIComponent('Špeciálne:Hľadanie')}?q=${encodeURIComponent(displayValue.trim())}`
                );
                onClose?.();
              }}
              className="wiki-search-all w-full text-left hover:bg-[#eaf3ff] flex items-center px-4 py-3 bg-[#f8f9fa]"
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
                  Hľadať stránky obsahujúce <span className="font-bold text-[#3366cc]">{displayValue.trim()}</span>
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
