import { NextRequest, NextResponse } from 'next/server';

const WIKI_HEADERS = {
  'User-Agent': 'WikiForce/1.0 (educational project)',
};

// Odstráni HTML z Wikipediinho snippetu, ale ponechá <span class="searchmatch">
// zvýraznenia, ktoré Wikipedia používa vo výsledkoch hľadania.
function cleanSnippet(snippet: string): string {
  return snippet
    .replace(/<(?!\/?span class="searchmatch")[^>]+>/g, '')
    .trim();
}

// Wikipedia search endpoint — reálne články zo slovenskej Wikipédie.
// Kombinuje fulltextové hľadanie (list=search) s náhľadmi obrázkov
// (prop=pageimages), rovnaké dáta ako výsledky hľadania na Wikipédii.
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const offset = Math.max(0, parseInt(searchParams.get('offset') || '0', 10) || 0);

  if (!query || query.length < 1) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Fulltextové hľadanie cez CirrusSearch — rovnaké ako „Search" na Wikipédii
    const response = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=10&sroffset=${offset}&srprop=snippet%7Cwordcount%7Ctimestamp&srnamespace=0`,
      { headers: WIKI_HEADERS }
    );

    if (!response.ok) {
      throw new Error('Wikipedia search API error');
    }

    const data = await response.json();
    const searchResults = data.query?.search || [];
    const totalHits = data.query?.searchinfo?.totalhits ?? searchResults.length;

    if (searchResults.length === 0) {
      return NextResponse.json({ results: [], totalHits: 0 });
    }

    // Náhľady obrázkov pre nájdené články (batch požiadavka)
    const titles = searchResults
      .map((r: { title: string }) => r.title)
      .join('|');

    const thumbnails: Record<string, string> = {};
    try {
      const thumbResponse = await fetch(
        `https://sk.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=pageimages&format=json&pithumbsize=120&piprop=thumbnail`,
        { headers: WIKI_HEADERS }
      );
      if (thumbResponse.ok) {
        const thumbData = await thumbResponse.json();
        const pages = thumbData.query?.pages || {};
        Object.values(pages).forEach((page: unknown) => {
          const p = page as { title: string; thumbnail?: { source: string } };
          if (p.thumbnail?.source) {
            thumbnails[p.title] = p.thumbnail.source;
          }
        });
      }
    } catch {
      // Náhľady sú voliteľné — chybu ignorujeme
    }

    const results = searchResults.map(
      (r: { title: string; snippet: string; wordcount: number; timestamp: string }) => ({
        title: r.title,
        slug: r.title.replace(/ /g, '_'),
        // Snippet ponecháme ako HTML s <span class="searchmatch"> zvýraznením
        snippet: cleanSnippet(r.snippet || ''),
        wordcount: r.wordcount || 0,
        timestamp: r.timestamp || '',
        thumbnail: thumbnails[r.title] || null,
      })
    );

    return NextResponse.json({ results, totalHits, offset });
  } catch (error) {
    console.error('Wikipedia search error:', error);
    return NextResponse.json({ results: [], error: 'Failed to search Wikipedia' });
  }
}
