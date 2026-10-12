import titlesSnapshot from '@/data/wikipedia-titles.json';
import { fetchWikipediaResource } from '@/lib/wikipedia-fetch';
import { NextRequest, NextResponse } from 'next/server';

const WIKI_HEADERS = { 'User-Agent': 'WikiForce/1.0 (educational Wikipedia API client)' };
const MAX_TITLES = 50;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const candidates = Array.isArray(body?.titles)
      ? body.titles.filter((title: unknown): title is string => typeof title === 'string').map((title: string) => title.trim()).filter(Boolean).slice(0, MAX_TITLES)
      : [];
    if (!candidates.length) return NextResponse.json({ titles: [] });

    const response = await fetchWikipediaResource(
      `https://sk.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${encodeURIComponent(candidates.join('|'))}`,
      { headers: WIKI_HEADERS, cache: 'no-store' },
    ).catch(() => null);
    if (!response) {
      const requested = new Set(candidates.map((title: string) => title.toLocaleLowerCase('sk-SK')));
      return NextResponse.json({titles:titlesSnapshot.titles.filter(title => requested.has(title.toLocaleLowerCase('sk-SK')))});
    }
    if (!response.ok) throw new Error('Wikipedia API error');
    const data = await response.json();
    const pages = Object.values(data.query?.pages || {}) as Array<{ pageid?: number; ns?: number; title?: string; missing?: string; invalid?: string }>;
    const titles = pages
      .filter((page) => page.pageid && page.ns === 0 && !('missing' in page) && !('invalid' in page))
      .map((page) => page.title)
      .filter((title): title is string => Boolean(title));
    return NextResponse.json({ titles });
  } catch (error) {
    console.error('Wikipedia title validation error:', error);
    return NextResponse.json({ titles: [], error: 'Failed to validate titles' }, { status: 502 });
  }
}
