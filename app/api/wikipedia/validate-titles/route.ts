import { NextRequest } from 'next/server';
import { wikiApi, wikiJson, wikiPages } from '@/lib/server/wikipedia-api';

const MAX_TITLES = 50;

/**
 * Hromadné overenie názvov článkov (používa „force“ režim). Jeden request
 * pre všetky kandidáty, s timeoutom — nikdy nevracia články, ktoré na
 * Wikipédii reálne neexistujú.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const candidates = Array.isArray(body?.titles)
      ? (body.titles as unknown[])
          .filter((title): title is string => typeof title === 'string')
          .map((title) => title.trim())
          .filter(Boolean)
          .slice(0, MAX_TITLES)
      : [];
    if (!candidates.length) return wikiJson({ titles: [] });

    const data = await wikiApi(
      { action: 'query', redirects: 1, titles: candidates.join('|') },
      { revalidate: 600, timeoutMs: 6000 },
    );

    const titles = wikiPages<{ pageid?: number; ns?: number; title?: string; missing?: string; invalid?: string }>(
      data,
    )
      .filter((page) => page.pageid && page.ns === 0 && !('missing' in page) && !('invalid' in page))
      .map((page) => page.title)
      .filter((title): title is string => Boolean(title));

    return wikiJson({ titles }, { maxAge: 600 });
  } catch (error) {
    console.error('Wikipedia title validation error:', error);
    return wikiJson({ titles: [], error: 'Failed to validate titles' }, { status: 502 });
  }
}
