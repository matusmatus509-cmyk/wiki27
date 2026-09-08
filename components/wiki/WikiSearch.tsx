"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useWiki } from '@/lib/wiki-context';
import { ACTIVATION_CODE } from '@/lib/wiki-store';
import Image from 'next/image';

interface SearchResult {
  title: string;
  slug: string;
  excerpt: string;
  snippetHtml?: string;
  wordcount?: number;
  thumbnail?: string;
}

interface WikiSearchProps {
  fullPage?: boolean;
  onClose?: () => void;
}

function WikiSearchInner({ fullPage = false, onClose }: WikiSearchProps) {
  const [displayValue, setDisplayValue] = useState('');
  const [realInput, setRealInput] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

    const controller = new AbortController();
    const term = displayValue.trim();
    const maskText = (config.maskText || 'História Slovenska').trim();

    const searchWikipedia = async () => {
      try {
        const response = await fetch(`/api/wikipedia/search?q=${encodeURIComponent(term)}`, { signal: controller.signal });
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
          realResults.sort((a, b) => {
            const aExact = a.title.localeCompare(maskText, 'sk', { sensitivity: 'base' }) === 0;
            const bExact = b.title.localeCompare(maskText, 'sk', { sensitivity: 'base' }) === 0;
            return Number(bExact) - Number(aExact);
          });
          if (config.showFeedback && config.forceName && realResults.length >= 2) {
            const positionLetter = String.fromCharCode(96 + config.forcePosition);
            realResults[1] = { ...realResults[1], excerpt: `${positionLetter}-${config.forceName.toLowerCase()}`, snippetHtml: undefined };
          }
        }

        setSuggestions(realResults);
        setShowSuggestions(realResults.length > 0);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }
    };

    const timeoutId = setTimeout(searchWikipedia, 150);
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [displayValue, config.showFeedback, config.forceName, config.forcePosition, mode, config.maskText]);

  const handleSearch = () => {
    const term = displayValue.trim();
    if (!term) return;

    // Tajný režim — Enter otvára prvý návrh (maskovací text), aby trik fungoval
    const isCovertMode =
      mode === 'wait_position' || mode === 'typing_name' || mode === 'typing_filler';

    if (isCovertMode && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
      return;
    }

    // Normálny režim — Enter vedie na stránku výsledkov vyhľadávania,
    // presne ako „Špeciálne:Hľadanie" na skutočnej Wikipédii
    resetSearchState();
    router.push(
      `/wiki/${encodeURIComponent('Špeciálne:Hľadanie')}?q=${encodeURIComponent(term)}`
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
    
    router.push(`/wiki/${suggestion.slug}`);
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
            if (displayValue.length > 0 && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
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
          
          {/* Clear button */}
          {displayValue && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center w-10 h-full text-[#54595d]"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="#72777d">
                <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm5 13.59L13.59 15 10 11.41 6.41 15 5 13.59 8.59 10 5 6.41 6.41 5 10 8.59 13.59 5 15 6.41 11.41 10 15 13.59z"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Dropdown suggestions - Minerva Neue mobile style with thumbnails */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          className={`${fullPage ? 'fixed left-0 right-0 top-[56px]' : 'absolute top-full left-0 right-0'} bg-white z-50 overflow-auto`}
          style={{ maxHeight: fullPage ? 'calc(100vh - 56px)' : '400px' }}
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.slug}-${index}`}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                handleSuggestionClick(suggestion);
              }}
              className="w-full text-left hover:bg-[#eaf3ff] flex items-center px-4 py-3"
              style={{ 
                borderBottom: index < suggestions.length - 1 ? '1px solid #eaecf0' : 'none',
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

          {/* Spodný riadok — „Hľadať stránky obsahujúce…" ako na Wikipédii */}
          {mode === 'normal' && displayValue.trim() && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                resetSearchState();
                router.push(
                  `/wiki/${encodeURIComponent('Špeciálne:Hľadanie')}?q=${encodeURIComponent(displayValue.trim())}`
                );
                onClose?.();
              }}
              className="w-full text-left hover:bg-[#eaf3ff] flex items-center px-4 py-3 bg-[#f8f9fa]"
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
