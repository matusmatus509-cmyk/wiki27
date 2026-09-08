import { NextRequest, NextResponse } from 'next/server';

const WIKI_HEADERS = { 'User-Agent': 'WikiForce/1.0 (educational Wikipedia API client)' };

type WikiPage = { pageid?: number; ns?: number; title?: string; missing?: string; invalid?: string; index?: number };

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get('title')?.trim();
  if (!requested) return NextResponse.json({ exists: false });

  try {
    const exactResponse = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${encodeURIComponent(requested)}`,
      { headers: WIKI_HEADERS, cache: 'no-store' },
    );
    if (!exactResponse.ok) throw new Error('Wikipedia resolve API error');
    const exactData = await exactResponse.json();
    const exactPage = (Object.values(exactData.query?.pages || {}) as WikiPage[])
      .find((page) => page.pageid && page.ns === 0 && !('missing' in page) && !('invalid' in page));
    if (exactPage?.title) {
      return NextResponse.json({ exists: true, title: exactPage.title, slug: exactPage.title.replace(/ /g, '_') });
    }

    // Prefix search resolves casing such as "albert einstein" → "Albert Einstein".
    const prefixResponse = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&gpssearch=${encodeURIComponent(requested)}&gpsnamespace=0&gpslimit=10`,
      { headers: WIKI_HEADERS, cache: 'no-store' },
    );
    if (!prefixResponse.ok) throw new Error('Wikipedia prefix resolve API error');
    const prefixData = await prefixResponse.json();
    const requestedFolded = requested.toLocaleLowerCase('sk-SK');
    const match = (Object.values(prefixData.query?.pages || {}) as WikiPage[]).find(
      (page) => page.pageid && page.ns === 0 && page.title?.toLocaleLowerCase('sk-SK') === requestedFolded,
    );
    if (match?.title) {
      return NextResponse.json({ exists: true, title: match.title, slug: match.title.replace(/ /g, '_') });
    }
    return NextResponse.json({ exists: false });
  } catch (error) {
    console.error('Wikipedia title resolve error:', error);
    return NextResponse.json({ exists: false, error: 'Failed to resolve Wikipedia title' }, { status: 502 });
  }
}
