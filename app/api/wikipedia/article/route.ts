import { NextRequest, NextResponse } from 'next/server';

const WIKI_HEADERS = {
  'User-Agent': 'WikiForce/1.0 (educational project)',
};

// Odstránime z parse HTML všetko, čo nepatrí do telo článku — šablóny,
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

// Wikipedia API article content endpoint - fetches REAL HTML content with links
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title');

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  try {
    // Parse API vracia skutočné HTML článku; redirects=1 vyrieši presmerovania
    // (napr. „Fyzika" → „Fyzika (veda)") rovnako ako to robí skutočná Wikipédia.
    const parseResponse = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&format=json&prop=text|categories|links&redirects=1&disableeditsection=true&disabletoc=false`,
      {
        headers: WIKI_HEADERS,
      }
    );

    if (!parseResponse.ok) {
      throw new Error('Wikipedia API error');
    }

    const parseData = await parseResponse.json();

    if (parseData.error) {
      // Článok neexistuje — skúsime nájsť najbližší cez vyhľadávanie
      // (rovnaké správanie ako „Článok neexistuje, hľadám…" na Wikipédii)
      try {
        const searchResponse = await fetch(
          `https://sk.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(title)}&limit=1&namespace=0&format=json`,
          { headers: WIKI_HEADERS }
        );
        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          const suggestion = searchData[1]?.[0];
          if (suggestion && suggestion.toLowerCase() !== title.toLowerCase()) {
            const retryResponse = await fetch(
              `https://sk.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(suggestion)}&format=json&prop=text|categories|links&redirects=1&disableeditsection=true&disabletoc=false`,
              { headers: WIKI_HEADERS }
            );
            if (retryResponse.ok) {
              const retryData = await retryResponse.json();
              if (!retryData.error) {
                parseData.parse = retryData.parse;
                parseData.redirectedFrom = title;
              }
            }
          }
        }
      } catch {
        // Vyhľadávanie zlyhalo — vrátime pôvodnú chybu nižšie
      }

      if (!parseData.parse) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
    }

    const parsed = parseData.parse;

    // Obrázok článku (pageimages) — opäť s redirectmi
    const imageResponse = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(parsed.title)}&prop=pageimages&format=json&pithumbsize=320&redirects=1`,
      {
        headers: WIKI_HEADERS,
      }
    );

    let imageUrl = null;
    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      const pages = imageData.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        imageUrl = pages[pageId]?.thumbnail?.source || null;
      }
    }

    // Process HTML content - fix relative links to point to our wiki
    let htmlContent = parsed.text?.['*'] || '';

    // Fix Wikipedia internal links to work with our routing.
    // DÔLEŽITÉ: zachováme presný názov článku (veľké/malé písmená aj
    // podčiarkovníky), inak by napr. odkaz na „Albert_Einstein" viedol na
    // neexistujúci článok „albert-einstein".
    htmlContent = htmlContent.replace(
      /href="\/wiki\/([^"#]+)"/g,
      (match: string, article: string) =>
        `href="/wiki/${article}" data-internal="true"`
    );

    htmlContent = cleanArticleHtml(htmlContent);

    // Extract links for fallback
    const links = (parsed.links || [])
      .filter((link: { ns: number; exists?: string; '*': string }) => link.ns === 0 && link.exists !== undefined)
      .map((link: { '*': string }) => link['*'])
      .slice(0, 20);

    // Extract categories
    const categories = (parsed.categories || [])
      .map((cat: { '*': string }) => cat['*'])
      .filter((c: string) => !c.includes(':'))
      .slice(0, 5);

    return NextResponse.json({
      title: parsed.title,
      content: htmlContent,
      image: imageUrl,
      links,
      categories,
      redirectedFrom: parseData.redirectedFrom || null,
      wikipediaUrl: `https://sk.wikipedia.org/wiki/${encodeURIComponent(parsed.title)}`,
    });
  } catch (error) {
    console.error('Wikipedia article error:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
