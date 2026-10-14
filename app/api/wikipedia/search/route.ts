import titlesSnapshot from '@/data/wikipedia-titles.json';
import { fetchWikipediaResource } from '@/lib/wikipedia-fetch';
import { NextRequest, NextResponse } from 'next/server';

const WIKI_HEADERS = { 'User-Agent': 'WikiForce/1.0 (educational Wikipedia API client)' };

function cleanSnippet(snippet: string): string {
  return snippet.replace(/<[^>]+>/g, tag => /^<span class="searchmatch">$|^<\/span>$/.test(tag) ? tag : '').trim();
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = params.get('q')?.trim();
  const offset = Math.max(0, parseInt(params.get('offset') || '0', 10) || 0);
  const suggest = params.get('suggest') === '1';
  const profile = params.get('profile') || 'default';
  const allowedNamespaces = new Set(['0', '1', '4', '6', '10', '12', '14']);
  const advancedNamespaces = (params.get('namespaces') || '0').split('|').filter(value => allowedNamespaces.has(value)).join('|') || '0';
  const namespace = profile === 'images' ? '6' : profile === 'all' ? '*' : profile === 'advanced' ? advancedNamespaces : '0';

  if (!query) return NextResponse.json({ results: [], totalHits: 0, offset });

  try {
    // The search box on Wikipedia uses prefix search, not full-text CirrusSearch.
    if (suggest) {
      const response = await fetchWikipediaResource(
        `https://sk.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&gpssearch=${encodeURIComponent(query)}&gpsnamespace=0&gpslimit=10&prop=pageimages%7Cpageterms%7Crevisions&wbptterms=description&piprop=thumbnail&pithumbsize=120&exintro=1&explaintext=1&exsentences=2&exlimit=10&rvprop=timestamp&redirects=1`,
        { headers: WIKI_HEADERS, next: { revalidate: 60 } },
      );
      if (!response.ok) throw new Error('Wikipedia autocomplete API error');
      const data = await response.json();
      const pages = Object.values(data.query?.pages || {}) as Array<{
        pageid: number; ns: number; title: string; index?: number; extract?: string; terms?: { description?: string[] };
        thumbnail?: { source: string }; revisions?: Array<{ timestamp?: string }>;
      }>;
      const results = pages
        .filter((page) => page.pageid && page.ns === 0)
        .sort((a, b) => (a.index ?? 999) - (b.index ?? 999))
        .map((page) => ({
          title: page.title,
          slug: page.title.replace(/ /g, '_'),
          snippet: escapeHtml(page.terms?.description?.[0] || page.extract || ''),
          wordcount: page.extract ? page.extract.trim().split(/\s+/).length : 0,
          timestamp: page.revisions?.[0]?.timestamp || '',
          thumbnail: page.thumbnail?.source || null,
        }));

      // Prefix search vráti nič pre text, ktorý nie je prefix názvu článku
      // (napr. ^kosice$", "košice  — ..." atď.). Aby dropdown nebol prázdny,
      // uberieme na fulltext hľadanie ako na skutočnej Wikipédii.
      if (results.length === 0) {
        const fallbackResponse = await fetchWikipediaResource(
          `https://sk.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=10&namespace=0&format=json`,
          { headers: WIKI_HEADERS, next: { revalidate: 60 } },
        );
        if (fallbackResponse.ok) {
          const [_, titles, descriptions, urls] = await fallbackResponse.json() as [string, string[], string[], string[]];
          const fbResults = (titles || []).map((title: string, i: number) => ({
            title,
            slug: title.replace(/ /g, '_'),
            snippet: escapeHtml(descriptions?.[i] || ''),
            wordcount: 0,
            timestamp: '',
            thumbnail: null,
          }));
          return NextResponse.json({ results: fbResults, totalHits: fbResults.length, offset: 0 });
        }
      }

      return NextResponse.json({ results, totalHits: results.length, offset: 0 });
    }

    // Special:Search remains a genuine full-text Wikipedia search.
    const response = await fetchWikipediaResource(
      `https://sk.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=20&sroffset=${offset}&srprop=snippet%7Cwordcount%7Ctimestamp%7Csize&srinfo=totalhits%7Csuggestion&srnamespace=${encodeURIComponent(namespace)}`,
      { headers: WIKI_HEADERS, cache: 'no-store' },
    );
    if (!response.ok) throw new Error('Wikipedia search API error');
    const data = await response.json();
    const searchResults = data.query?.search || [];
    const totalHits = data.query?.searchinfo?.totalhits ?? searchResults.length;
    if (!searchResults.length) return NextResponse.json({ results: [], totalHits, offset, suggestion: data.query?.searchinfo?.suggestion || null });

    const titles = searchResults.map((result: { title: string }) => result.title).join('|');
    const thumbnails: Record<string, string> = {};
    try {
      const thumbResponse = await fetchWikipediaResource(
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

    const results = searchResults.map((result: { title: string; snippet: string; wordcount: number; size?: number; timestamp: string }) => ({
      title: result.title,
      slug: result.title.replace(/ /g, '_'),
      snippet: cleanSnippet(result.snippet || ''),
      wordcount: result.wordcount || 0,
      size: result.size || 0,
      timestamp: result.timestamp || '',
      thumbnail: thumbnails[result.title] || null,
    }));
    return NextResponse.json({ results, totalHits, offset, suggestion: data.query?.searchinfo?.suggestion || null });
  } catch (error) {
    console.error('Wikipedia search error:', error);
    if (suggest) {
      const folded = query.toLocaleLowerCase('sk-SK');
      const titles = titlesSnapshot.titles.filter(title => title.toLocaleLowerCase('sk-SK').startsWith(folded)).slice(0,10);
      if (titles.length) return NextResponse.json({results:titles.map(title => ({title,slug:title.replace(/ /g,'_'),snippet:'',wordcount:0,timestamp:'',thumbnail:null})),totalHits:titles.length,offset:0});
    }
    return NextResponse.json({ results: [], totalHits: 0, offset, error: 'Failed to search Wikipedia' }, { status: 502 });
  }
}
