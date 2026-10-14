import { NextRequest, NextResponse } from 'next/server';
import { fetchWikipediaResource } from '@/lib/wikipedia-fetch';

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title');
  if (!title) return NextResponse.json({ languages: [] });
  try {
    const response = await fetchWikipediaResource(`https://sk.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=langlinks&llprop=url%7Clangname%7Cautonym&lllimit=500&titles=${encodeURIComponent(title)}`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error('Wikipedia language links unavailable');
    const data = await response.json();
    if (data.error) throw new Error('Wikipedia language links unavailable');
    const pages = Object.values(data.query?.pages || {}) as { langlinks?: { lang: string; autonym: string; langname: string; url: string }[] }[];
    const languages = pages.flatMap(page => page.langlinks || []).filter(language => /^https:\/\/[^/]+\.wikipedia\.org\//.test(language.url));
    return NextResponse.json({ languages });
  } catch {
    return NextResponse.json({ error: 'Languages unavailable' }, { status: 502 });
  }
}
