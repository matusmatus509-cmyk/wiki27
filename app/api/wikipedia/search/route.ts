import { NextRequest, NextResponse } from 'next/server';

const WIKI_HEADERS = { 'User-Agent': 'WikiForce/1.0 (educational Wikipedia API client)' };

function cleanSnippet(snippet: string): string {
  return snippet.replace(/<(?!\/?span class="searchmatch")[^>]+>/g, '').trim();
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = params.get('q')?.trim();
  const offset = Math.max(0, parseInt(params.get('offset') || '0', 10) || 0);
  const suggest = params.get('suggest') === '1';

  if (!query) return NextResponse.json({ results: [], totalHits: 0, offset });

  try {
    // The search box on Wikipedia uses prefix search, not full-text CirrusSearch.
    if (suggest) {
      const response = await fetch(
        `https://sk.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&gpssearch=${encodeURIComponent(query)}&gpsnamespace=0&gpslimit=10&prop=pageimages%7Cextracts%7Crevisions&piprop=thumbnail&pithumbsize=120&exintro=1&explaintext=1&exsentences=2&exlimit=10&rvprop=timestamp&redirects=1`,
        { headers: WIKI_HEADERS, next: { revalidate: 60 } },
      );
      if (!response.ok) throw new Error('Wikipedia autocomplete API error');
      const data = await response.json();
      const pages = Object.values(data.query?.pages || {}) as Array<{
        pageid: number; ns: number; title: string; index?: number; extract?: string;
        thumbnail?: { source: string }; revisions?: Array<{ timestamp?: string }>;
      }>;
      const results = pages
        .filter((page) => page.pageid && page.ns === 0)
        .sort((a, b) => (a.index ?? 999) - (b.index ?? 999))
        .map((page) => ({
          title: page.title,
          slug: page.title.replace(/ /g, '_'),
          snippet: escapeHtml(page.extract || ''),
          wordcount: page.extract ? page.extract.trim().split(/\s+/).length : 0,
          timestamp: page.revisions?.[0]?.timestamp || '',
          thumbnail: page.thumbnail?.source || null,
        }));
      return NextResponse.json({ results, totalHits: results.length, offset: 0 });
    }

    // Special:Search remains a genuine full-text Wikipedia search.
    const response = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=10&sroffset=${offset}&srprop=snippet%7Cwordcount%7Ctimestamp&srnamespace=0`,
      { headers: WIKI_HEADERS, cache: 'no-store' },
    );
    if (!response.ok) throw new Error('Wikipedia search API error');
    const data = await response.json();
    const searchResults = data.query?.search || [];
    const totalHits = data.query?.searchinfo?.totalhits ?? searchResults.length;
    if (!searchResults.length) return NextResponse.json({ results: [], totalHits: 0, offset });

    const titles = searchResults.map((result: { title: string }) => result.title).join('|');
    const thumbnails: Record<string, string> = {};
    try {
      const thumbResponse = await fetch(
        `https://sk.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=pageimages&format=json&pithumbsize=120&piprop=thumbnail`,
        { headers: WIKI_HEADERS, cache: 'no-store' },
      );
      if (thumbResponse.ok) {
        const thumbData = await thumbResponse.json();
        Object.values(thumbData.query?.pages || {}).forEach((value: unknown) => {
          const page = value as { title: string; thumbnail?: { source: string } };
          if (page.thumbnail?.source) thumbnails[page.title] = page.thumbnail.source;
        });
      }
    } catch { /* Thumbnails are optional. */ }

    const results = searchResults.map((result: { title: string; snippet: string; wordcount: number; timestamp: string }) => ({
      title: result.title,
      slug: result.title.replace(/ /g, '_'),
      snippet: cleanSnippet(result.snippet || ''),
      wordcount: result.wordcount || 0,
      timestamp: result.timestamp || '',
      thumbnail: thumbnails[result.title] || null,
    }));
    return NextResponse.json({ results, totalHits, offset });
  } catch (error) {
    console.error('Wikipedia search error:', error);
    return NextResponse.json({ results: [], totalHits: 0, offset, error: 'Failed to search Wikipedia' }, { status: 502 });
  }
}
