"use client";

import { useWiki } from '@/lib/wiki-context';
import { 
  getForceWordsForLetter, 
  detectCategory, 
  generateForceArticleContent,
  type ArticleCategory
} from '@/lib/encyclopedia-db';
import Image from 'next/image';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { WikiFooter } from './WikiFooter';

interface WikiArticleProps {
  slug: string;
}

interface WikipediaArticle {
  title: string;
  content: string;
  image: string | null;
  links: string[];
  categories: string[];
  wikipediaUrl: string;
}

// Fetch image from Wikipedia for force articles - tries multiple sources
async function fetchWikipediaImage(title: string): Promise<string | null> {
  // Try Slovak Wikipedia first
  try {
    const skResponse = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300&origin=*`
    );
    if (skResponse.ok) {
      const data = await skResponse.json();
      const pages = data.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        const img = pages[pageId]?.thumbnail?.source;
        if (img) return img;
      }
    }
  } catch {
    // Continue to English
  }
  
  // Fallback to English Wikipedia for better image coverage
  try {
    const enResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300&origin=*`
    );
    if (enResponse.ok) {
      const data = await enResponse.json();
      const pages = data.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        const img = pages[pageId]?.thumbnail?.source;
        if (img) return img;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function WikiArticle({ slug }: WikiArticleProps) {
  const router = useRouter();
  const { config, getCurrentLetterIndex, incrementArticleIndex, activateForce, deactivateForce } = useWiki();
  const [wikiArticle, setWikiArticle] = useState<WikipediaArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forceLinks, setForceLinks] = useState<string[]>([]);
  const [forceImage, setForceImage] = useState<string | null>(null);
  
  // Handle wiki: prefix for Wikipedia articles from search
  const cleanSlug = slug.startsWith('wiki:') ? slug.slice(5) : slug;
  // First decode the URL encoding, then replace underscores with spaces
  let decodedSlug = cleanSlug;
  try {
    decodedSlug = decodeURIComponent(cleanSlug);
  } catch {
    // Failed to decode, use original
  }
  const actualSlug = decodedSlug.replace(/_/g, ' ');
  
  // Calculate current letter for force
  const currentLetterIndex = getCurrentLetterIndex();
  const currentLetter = config.forceName && currentLetterIndex < config.forceName.length 
    ? config.forceName[currentLetterIndex] 
    : null;
  
  // Check if this is the last letter
  const isLastLetter = config.forceName && currentLetterIndex === config.forceName.length - 1;
  
  // Check if force is complete
  const isComplete = config.forceName && currentLetterIndex >= config.forceName.length;



  // Detect category based on article title for smarter link selection
  const detectedCategory = useMemo(() => detectCategory(actualSlug), [actualSlug]);

  // Generate force links when needed - use encyclopedia database
  useEffect(() => {
    if (config.isForceActive && currentLetter) {
      // Get encyklopedické pojmy that match the required letter at position
      // Prioritize terms from the same category as the current article
      const words = getForceWordsForLetter(
        currentLetter, 
        config.forcePosition, 
        detectedCategory,
        50
      );
      setForceLinks(words);
    }
  }, [config.isForceActive, currentLetter, config.forcePosition, detectedCategory]);

  // ALWAYS fetch image from Wikipedia API for any article (force mode or normal)
  useEffect(() => {
    const fetchImage = async () => {
      // First try the exact title
      let img = await fetchWikipediaImage(actualSlug);
      if (!img) {
        // Try with capitalized first letter
        const capitalized = actualSlug.charAt(0).toUpperCase() + actualSlug.slice(1);
        img = await fetchWikipediaImage(capitalized);
      }
      if (!img && actualSlug.includes(' ')) {
        // Try just the first word for compound terms
        const firstWord = actualSlug.split(' ')[0];
        img = await fetchWikipediaImage(firstWord);
      }
      if (!img) {
        // Try English translation for common Slovak terms
        const translations: Record<string, string> = {
          // Music
          'gitara': 'guitar', 'klavír': 'piano', 'husle': 'violin',
          'bubon': 'drum', 'flauta': 'flute', 'trubka': 'trumpet',
          'saxofón': 'saxophone', 'kontrabas': 'double bass', 'harfa': 'harp',
          'akordeón': 'accordion', 'harmonika': 'harmonica', 'violončelo': 'cello',
          'klarinet': 'clarinet', 'hoboj': 'oboe', 'fagot': 'bassoon',
          'bicie': 'drums', 'xylofón': 'xylophone', 'tamburína': 'tambourine',
          'opera': 'opera', 'symfónia': 'symphony', 'koncert': 'concert',
          'jazz': 'jazz', 'rock': 'rock music', 'blues': 'blues',
          // Sports
          'futbal': 'football', 'hokej': 'hockey', 'tenis': 'tennis',
          'basketbal': 'basketball', 'plávanie': 'swimming', 'box': 'boxing',
          'atletika': 'athletics', 'lyžovanie': 'skiing', 'cyklistika': 'cycling',
          'volejbal': 'volleyball', 'hádzaná': 'handball', 'golf': 'golf',
          'šach': 'chess', 'biatlon': 'biathlon', 'gymnastika': 'gymnastics',
          'karate': 'karate', 'džudo': 'judo', 'surfovanie': 'surfing',
          'snowboard': 'snowboarding', 'maratón': 'marathon', 'rugby': 'rugby',
          // Science
          'fyzika': 'physics', 'chémia': 'chemistry', 'biológia': 'biology',
          'matematika': 'mathematics', 'astronómia': 'astronomy', 'geológia': 'geology',
          'ekológia': 'ecology', 'genetika': 'genetics', 'medicína': 'medicine',
          'psychológia': 'psychology', 'filozofia': 'philosophy', 'sociológia': 'sociology',
          'atóm': 'atom', 'molekula': 'molecule', 'bunka': 'cell',
          'evolúcia': 'evolution', 'gravitácia': 'gravitation', 'energia': 'energy',
          // Geography
          'slovensko': 'slovakia', 'bratislava': 'bratislava', 'európa': 'europe',
          'ázia': 'asia', 'afrika': 'africa', 'amerika': 'america',
          'austrália': 'australia', 'antarktída': 'antarctica', 'oceán': 'ocean',
          'hora': 'mountain', 'rieka': 'river', 'jazero': 'lake',
          'more': 'sea', 'ostrov': 'island', 'púšť': 'desert',
          'les': 'forest', 'sopka': 'volcano', 'vodopád': 'waterfall',
          'alpy': 'alps', 'himaláje': 'himalayas', 'sahara': 'sahara',
          'dunaj': 'danube', 'nil': 'nile', 'amazonka': 'amazon river',
          // History
          'história': 'history', 'vojna': 'war', 'revolúcia': 'revolution',
          'ríša': 'empire', 'kráľovstvo': 'kingdom', 'republika': 'republic',
          'stredovek': 'middle ages', 'renesancia': 'renaissance', 'antika': 'antiquity',
          'cisár': 'emperor', 'kráľ': 'king', 'kráľovná': 'queen',
          // Nature
          'lev': 'lion', 'slon': 'elephant', 'tiger': 'tiger',
          'medveď': 'bear', 'vlk': 'wolf', 'orol': 'eagle',
          'delfín': 'dolphin', 'veľryba': 'whale', 'žirafa': 'giraffe',
          'pes': 'dog', 'mačka': 'cat', 'kôň': 'horse',
          'motýľ': 'butterfly', 'včela': 'bee', 'mravec': 'ant',
          'ruža': 'rose', 'tulipán': 'tulip', 'orchidea': 'orchid',
          'dub': 'oak', 'smrek': 'spruce', 'borovica': 'pine',
          // Technology
          'počítač': 'computer', 'internet': 'internet', 'telefón': 'telephone',
          'robot': 'robot', 'raketa': 'rocket', 'satelit': 'satellite',
          'automobil': 'automobile', 'lietadlo': 'airplane', 'loď': 'ship',
          'televízor': 'television', 'rádio': 'radio', 'kamera': 'camera',
          // Culture
          'umenie': 'art', 'literatúra': 'literature', 'film': 'film',
          'divadlo': 'theatre', 'múzeum': 'museum', 'galéria': 'gallery',
          'tanec': 'dance', 'balet': 'ballet', 'architektúra': 'architecture',
          'maliarstvo': 'painting', 'sochárstvo': 'sculpture', 'fotografia': 'photography',
        };
        const lowerSlug = actualSlug.toLowerCase();
        if (translations[lowerSlug]) {
          img = await fetchWikipediaImage(translations[lowerSlug]);
        }
      }
      setForceImage(img);
    };
    fetchImage();
  }, [actualSlug]);

  // ALWAYS fetch real Wikipedia article
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // actualSlug already has underscores converted to spaces from above
    // Just use it directly for Wikipedia API
    const title = actualSlug;
    
    fetch(`/api/wikipedia/article?title=${encodeURIComponent(title)}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setWikiArticle(null);
        } else {
          setWikiArticle(data);
          setError(null);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to load article');
        setIsLoading(false);
      });
  }, [actualSlug]);



  // Generate article title - moved before any early returns to ensure consistent hook order.
  // Podporujeme oba formáty slugu: starší s pomlčkami (force-article-x)
  // aj nový Wiki formát s podčiarkovníkmi (Albert_Einstein).
  const displayTitle = wikiArticle?.title || (() => {
    // Ak slug obsahuje podčiarkovníky alebo začína veľkým písmenom,
    // ide o Wikipedia-štýl — len nahradíme _ medzerou a necháme veľké
    // písmená tak ako sú.
    if (actualSlug.includes('_') || /^[A-ZÁ-Ž]/.test(actualSlug)) {
      return actualSlug.replace(/_/g, ' ');
    }
    // Inak ide o starší formát s pomlčkami — kapitalizujeme každé slovo.
    return actualSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  })();

  // Synchronizácia s reálnou Wikipédiou: nastavíme rovnaký formát title
  // tagu („Slovensko – Wikipédia") a normalizujeme URL na tvar
  // /wiki/Article_Name (s podčiarkovníkmi a veľkým prvým písmenom),
  // čo presne zodpovedá vzoru sk.wikipedia.org.
  useEffect(() => {
    if (!displayTitle) return;
    if (typeof document !== 'undefined') {
      document.title = `${displayTitle} – Wikipédia`;
    }
    if (typeof window !== 'undefined') {
      try {
        // Normalizovaný Wikipedia slug: prvé písmeno veľké, ostatné medzery → _
        const normalized = displayTitle.trim().replace(/\s+/g, '_');
        const target = `/wiki/${encodeURIComponent(normalized)}`;
        if (window.location.pathname !== target) {
          window.history.replaceState({}, '', target);
        }
      } catch {
        // Ignorujeme prípadné chyby v starších prehliadačoch.
      }
    }
  }, [displayTitle]);



  // Handle redirect when force is complete
  useEffect(() => {
    if (isComplete && config.isForceActive) {
      // Deactivate force and redirect to real Wikipedia article for current page
      deactivateForce();

      const wikipediaSlug = actualSlug.replace(/\s+/g, '_');
      const realUrl = `https://sk.wikipedia.org/wiki/${encodeURIComponent(
        wikipediaSlug,
      )}`;
      
      // Vyčistíme sessionStorage
      try {
        sessionStorage.removeItem('wiki-akronym-session');
        sessionStorage.clear();
      } catch {
        // Ignorujeme chyby
      }
      
      // Agresívne vymazanie histórie pred presmerovaním
      const historyLength = window.history.length;
      if (historyLength > 1) {
        window.history.replaceState({ redirecting: true }, '', '/');
        window.history.go(1 - historyLength);
        setTimeout(() => {
          window.location.replace(realUrl);
        }, 50);
      } else {
        window.location.replace(realUrl);
      }
    }
  }, [isComplete, config.isForceActive, deactivateForce, actualSlug]);

  // Handle click on a link in normal article (activates force if not already active)
  const handleNormalLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, linkText: string) => {
    e.preventDefault();

    // Activate force if name is set and not already active
    if (config.forceName && !config.isForceActive) {
      activateForce();
    }

    // Navigate to the "article" — používame Wikipedia formát s podčiarkovníkom
    // a zachovávame veľké/malé písmená tak, ako sú v texte odkazu.
    const newSlug = linkText.trim().replace(/\s+/g, '_');
    router.push(`/wiki/${encodeURIComponent(newSlug)}`);
  }, [config.forceName, config.isForceActive, activateForce, router]);

  // Handle click on a force link
  const handleForceLinkClick = useCallback((word: string) => {
    if (isLastLetter) {
      // Last letter - redirect to real Wikipedia article for THIS word.
      // Vymažeme všetky záznamy našej aplikácie z histórie prehliadača
      // a presmerujeme na reálnu Wikipédiu.
      deactivateForce();

      const wikipediaSlug = word.replace(/\s+/g, '_');
      const realUrl = `https://sk.wikipedia.org/wiki/${encodeURIComponent(
        wikipediaSlug,
      )}`;
      
      // Vyčistíme sessionStorage
      try {
        sessionStorage.removeItem('wiki-akronym-session');
        sessionStorage.clear();
      } catch {
        // Ignorujeme chyby
      }
      
      // Agresívne vymazanie histórie:
      // 1. Prejdeme na úplný začiatok histórie prehliadača
      // 2. Potom presmerujeme na reálnu Wikipédiu
      // Toto zabezpečí, že tlačidlo "späť" nevráti používateľa na našu stránku
      const historyLength = window.history.length;
      if (historyLength > 1) {
        // Najprv nahradíme aktuálnu stránku v histórii
        window.history.replaceState({ redirecting: true }, '', '/');
        // Prejdeme na začiatok histórie
        window.history.go(1 - historyLength);
        // Po krátkom oneskorení presmerujeme
        setTimeout(() => {
          window.location.replace(realUrl);
        }, 50);
      } else {
        // Ak je len 1 záznam, priamo presmerujeme
        window.location.replace(realUrl);
      }
      return;
    }

    // Move to next letter
    incrementArticleIndex();

    // Navigate to new "article" — používame podčiarkovník namiesto
    // pomlčky, aby URL formát zodpovedal skutočnej Wikipédii
    // (napr. /wiki/Albert_Einstein).
    const newSlug = word.replace(/\s+/g, '_');
    router.push(`/wiki/${encodeURIComponent(newSlug)}`);
  }, [isLastLetter, deactivateForce, incrementArticleIndex, router]);

  // Handle clicks on force links in the HTML content - MUST be before any returns!
  const handleContentClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    
    if (!link) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Check if this is a force link
    const forceWord = link.getAttribute('data-force-word');
    if (forceWord) {
      handleForceLinkClick(forceWord);
      return;
    }
    
    // Normal link - activate force
    const linkText = link.textContent || '';
    handleNormalLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, linkText);
  }, [handleForceLinkClick, handleNormalLinkClick]);

  // Show loading state
  if (isLoading) {
    return (
      <article className="px-4 py-4" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Lato', 'Helvetica', 'Arial', sans-serif" }}>
        <div className="animate-pulse">
          <div className="h-7 bg-[#eaecf0] rounded w-3/4 mb-2"></div>
          <div className="h-[1px] bg-[#a2a9b1] mb-2"></div>
          <div className="h-3 bg-[#eaecf0] rounded w-1/2 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-[#eaecf0] rounded"></div>
            <div className="h-4 bg-[#eaecf0] rounded"></div>
            <div className="h-4 bg-[#eaecf0] rounded w-5/6"></div>
          </div>
        </div>
      </article>
    );
  }

  // Infobox component - Minerva Neue mobile style
  const Infobox = ({ image, title }: { image: string | null; title: string }) => {
    if (!image) return null;
    return (
      <div className="float-right ml-3 mb-3 w-[140px] border border-[#c8ccd1] bg-[#f8f9fa]">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div 
          className="text-[11px] text-center text-[#202122] p-1 border-t border-[#c8ccd1]"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          {title}
        </div>
      </div>
    );
  };



  // FORCE MODE - Show article with force links integrated into the text
  if (config.isForceActive && forceLinks.length > 0) {
    // Generate force article content with force words integrated into natural sentences
    const forceContent = generateForceArticleContent(displayTitle, detectedCategory, forceLinks);
    
    return (
      <article className="bg-white min-h-screen" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Lato', 'Helvetica', 'Arial', sans-serif", color: '#202122' }}>
        <div className="px-4 py-4">
          {/* Article title - Minerva Neue style */}
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
            {displayTitle}
          </h1>
          <p
            className="text-[#54595d] mt-1"
            style={{
              fontSize: '12px',
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Z Wikipédie, slobodnej encyklopédie
          </p>

          {/* Article action icons - Minerva Neue style */}
          <div className="flex items-center justify-between py-2 border-b border-[#eaecf0] mb-4">
            <button className="flex items-center justify-center w-10 h-10" aria-label="Jazyky">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#54595d">
                <path d="M20 18h-1.44a.61.61 0 01-.4-.12.81.81 0 01-.23-.31L17 15h-5l-1 2.54a.77.77 0 01-.22.3.59.59 0 01-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a11.62 11.62 0 01-.39-1.24q-.09.37-.19.69l-.19.56-1.58 4.19zm-6.3-1.58a13.43 13.43 0 01-2.91-1.41 11.46 11.46 0 002.81-5.37H12V4H7.31a4 4 0 00-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 005 10.7a17.19 17.19 0 01-5 2.1q.56.82.87 1.38a23.28 23.28 0 005.22-2.51 15.64 15.64 0 003.56 1.77zM3.63 5.33h4.91a8.11 8.11 0 01-2.45 4.45 9.11 9.11 0 01-2.46-4.45z"/>
              </svg>
            </button>
            <div className="flex items-center gap-1">
              <button className="flex items-center justify-center w-10 h-10" aria-label="Stiahnuť">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#54595d">
                  <path d="M17 12v5H3v-5H1v5a2 2 0 002 2h14a2 2 0 002-2v-5z"/>
                  <path d="M10 15l5-5h-3V1H8v9H5z"/>
                </svg>
              </button>
              <button className="flex items-center justify-center w-10 h-10" aria-label="Uložiť">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#54595d" strokeWidth="1.5">
                  <path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 14.27l-4.77 2.51.91-5.32-3.87-3.77 5.34-.78z"/>
                </svg>
              </button>
              <button className="flex items-center justify-center w-10 h-10" aria-label="Upraviť">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#54595d">
                  <path d="M16.77 8l1.94-2a1 1 0 000-1.41l-3.34-3.3a1 1 0 00-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96-4.75-4.75z"/>
                </svg>
              </button>
            </div>
          </div>

          <Infobox image={wikiArticle?.image || forceImage} title={displayTitle} />

          {/* Generated content with force links in natural sentences */}
          <div 
            className="wiki-article-content text-[14px] leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: forceContent }}
            onClick={handleContentClick}
            style={{ color: '#202122', lineHeight: 1.6 }}
          />

          {/* Categories */}
          <div
            className="mt-8 pt-3 border-t border-[#a2a9b1] text-[13px] clear-both"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            <span className="text-[#54595d]">Kategórie: </span>
            {(wikiArticle?.categories || ['Všeobecné pojmy']).map(
              (category, index, arr) => (
                <span key={index}>
                  <a href="#" className="text-[#0645ad]" style={{ textDecoration: 'none' }}>
                    {category}
                  </a>
                  {index < arr.length - 1 && <span className="text-[#54595d]"> | </span>}
                </span>
              ),
            )}
          </div>
        </div>
        
        <WikiFooter articleTitle={displayTitle} />
      </article>
    );
  }

  // NORMAL MODE - Show real Wikipedia content with clickable links that activate force
  const normalLinks = wikiArticle?.links || ['História', 'Geografia', 'Kultúra', 'Slovensko', 'Európa', 'Veda', 'Umenie', 'Literatúra'];

  return (
    <article className="bg-white min-h-screen" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Lato', 'Helvetica', 'Arial', sans-serif", color: '#202122' }}>
      <div className="px-4 py-4">
        {/* Article title - Minerva Neue style */}
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
          {displayTitle}
        </h1>
        <p
          className="text-[#54595d] mt-1"
          style={{
            fontSize: '12px',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          Z Wikipédie, slobodnej encyklopédie
        </p>

        {/* Article action icons - Minerva Neue style */}
        <div className="flex items-center justify-between py-2 border-b border-[#eaecf0] mb-4">
          <button className="flex items-center justify-center w-10 h-10" aria-label="Jazyky">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#54595d">
              <path d="M20 18h-1.44a.61.61 0 01-.4-.12.81.81 0 01-.23-.31L17 15h-5l-1 2.54a.77.77 0 01-.22.3.59.59 0 01-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a11.62 11.62 0 01-.39-1.24q-.09.37-.19.69l-.19.56-1.58 4.19zm-6.3-1.58a13.43 13.43 0 01-2.91-1.41 11.46 11.46 0 002.81-5.37H12V4H7.31a4 4 0 00-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 005 10.7a17.19 17.19 0 01-5 2.1q.56.82.87 1.38a23.28 23.28 0 005.22-2.51 15.64 15.64 0 003.56 1.77zM3.63 5.33h4.91a8.11 8.11 0 01-2.45 4.45 9.11 9.11 0 01-2.46-4.45z"/>
            </svg>
          </button>
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center w-10 h-10" aria-label="Stiahnuť">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#54595d">
                <path d="M17 12v5H3v-5H1v5a2 2 0 002 2h14a2 2 0 002-2v-5z"/>
                <path d="M10 15l5-5h-3V1H8v9H5z"/>
              </svg>
            </button>
            <button className="flex items-center justify-center w-10 h-10" aria-label="Uložiť">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#54595d" strokeWidth="1.5">
                <path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 14.27l-4.77 2.51.91-5.32-3.87-3.77 5.34-.78z"/>
              </svg>
            </button>
            <button className="flex items-center justify-center w-10 h-10" aria-label="Upraviť">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#54595d">
                <path d="M16.77 8l1.94-2a1 1 0 000-1.41l-3.34-3.3a1 1 0 00-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96-4.75-4.75z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="text-[14px] leading-relaxed" style={{ color: '#202122', lineHeight: 1.6 }}>
          {wikiArticle?.image && (
            <Infobox image={wikiArticle.image} title={displayTitle} />
          )}

          {/* Render Wikipedia content with our link handlers */}
          {wikiArticle?.content ? (
            <div 
              className="wiki-article-content text-justify"
              dangerouslySetInnerHTML={{ __html: wikiArticle.content }}
              onClick={(e) => {
                // Intercept clicks on internal links
                const target = e.target as HTMLElement;
                const link = target.closest('a');
                if (link) {
                  const href = link.getAttribute('href');
                  const linkText = link.textContent || '';
                  
                  // Only intercept internal wiki links (our modified ones have data-internal)
                  if (href && (href.startsWith('/wiki/') || link.hasAttribute('data-internal'))) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleNormalLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, linkText);
                  }
                  // Block external Wikipedia links
                  else if (href && href.includes('wikipedia.org')) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleNormalLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, linkText);
                  }
                }
              }}
              style={{ color: '#202122' }}
            />
          ) : (
            <>
              <p className="text-[#202122] mb-4 text-justify" style={{ lineHeight: 1.6 }}>
                <strong>{displayTitle}</strong> je dôležitý pojem v rôznych oblastiach ľudského poznania a kultúry. 
                Tento článok poskytuje základný prehľad o danej téme.
              </p>

              {/* Section: Prehľad */}
              <h2 
                className="mt-6 pb-1 mb-3 border-b border-[#a2a9b1]"
                style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", fontSize: '20px', fontWeight: 'normal', color: '#000000' }}
              >
                Prehľad
              </h2>
              <p className="mb-4 text-justify" style={{ lineHeight: 1.6 }}>
                {displayTitle} je dôležitou súčasťou modernej spoločnosti. Má významný vplyv na rôzne oblasti života
                a je predmetom záujmu odborníkov z mnohých oblastí.
              </p>

              {/* Section: História */}
              <h2 
                className="mt-6 pb-1 mb-3 border-b border-[#a2a9b1]"
                style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", fontSize: '20px', fontWeight: 'normal', color: '#000000' }}
              >
                História
              </h2>
              <p className="mb-4 text-justify" style={{ lineHeight: 1.6 }}>
                História tohto pojmu siaha do hlbokej minulosti. Prvé zmienky môžeme nájsť už v starovekých
                civilizáciách. Postupom času sa význam a chápanie tohto konceptu menili.
              </p>

              {/* Section: Súvisiace články */}
              <h2 
                className="mt-6 pb-1 mb-3 border-b border-[#a2a9b1]"
                style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", fontSize: '20px', fontWeight: 'normal', color: '#000000' }}
              >
                Súvisiace články
              </h2>
              <ul className="list-disc list-inside ml-2 space-y-1">
                {normalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={`/wiki/${link.toLowerCase().replace(/\s+/g, '_')}`}
                      onClick={(e) => handleNormalLinkClick(e, link)}
                      className="text-[#0645ad]"
                      style={{ textDecoration: 'none' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Categories */}
        <div
          className="mt-8 pt-3 border-t border-[#a2a9b1] text-[13px] clear-both"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          <span className="text-[#54595d]">Kategórie: </span>
          {(wikiArticle?.categories || ['Všeobecné pojmy']).map(
            (category, index, arr) => (
              <span key={index}>
                <a href="#" className="text-[#0645ad]" style={{ textDecoration: 'none' }}>
                  {category}
                </a>
                {index < arr.length - 1 && <span className="text-[#54595d]"> | </span>}
              </span>
            ),
          )}
        </div>
      </div>
      
      <WikiFooter articleTitle={displayTitle} />
    </article>
  );
}
