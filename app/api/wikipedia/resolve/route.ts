import { NextRequest } from 'next/server';
import { titleToSlug, wikiApi, wikiJson, wikiPages } from '@/lib/server/wikipedia-api';

type WikiPage = {
  pageid?: number;
  ns?: number;
  title?: string;
  missing?: string;
  invalid?: string;
};

/**
 * Overí, či zadaný názov existuje ako článok, a vráti jeho kanonický titul
 * (vyrieši presmerovania aj veľké/malé písmená a diakritiku).
 *
 * Používa sa pri odoslaní vyhľadávania, takže musí byť rýchly: obe volania
 * (presný názov + prefix search) bežia paralelne a odpoveď cacheuje CDN.
 */
export async function GET(request: NextRequest) {
  const requested = (request.nextUrl.searchParams.get('title') || '').trim();
  if (!requested) return wikiJson({ exists: false }, { maxAge: 0 });

  const exactPromise = wikiApi(
    { action: 'query', redirects: 1, titles: requested },
    { revalidate: 3600, timeoutMs: 4000 },
  ).catch(() => null);

  const prefixPromise = wikiApi(
    {
      action: 'query',
      redirects: 1,
      generator: 'prefixsearch',
      gpssearch: requested,
      gpsnamespace: 0,
      gpslimit: 10,
      gpsprofile: 'fuzzy',
    },
    { revalidate: 3600, timeoutMs: 4000 },
  ).catch(() => null);

  const [exactData, prefixData] = await Promise.all([exactPromise, prefixPromise]);

  if (!exactData && !prefixData) {
    // Wikipédia neodpovedala — neklameme, že článok neexistuje.
    return wikiJson({ exists: false, error: 'Failed to resolve Wikipedia title' }, { status: 502 });
  }

  const exactPage = wikiPages<WikiPage>(exactData).find(
    (page) => page.pageid && page.ns === 0 && !('missing' in page) && !('invalid' in page),
  );
  if (exactPage?.title) {
    return wikiJson(
      { exists: true, title: exactPage.title, slug: titleToSlug(exactPage.title) },
      { maxAge: 3600 },
    );
  }

  // Prefix search vyrieši diakritiku/veľkosť písmen ("albert einstein" → "Albert Einstein").
  const requestedFolded = requested.toLocaleLowerCase('sk-SK');
  const candidates = wikiPages<WikiPage>(prefixData).filter((page) => page.pageid && page.ns === 0);
  const match = candidates.find(
    (page) => page.title?.toLocaleLowerCase('sk-SK') === requestedFolded,
  );
  if (match?.title) {
    return wikiJson(
      { exists: true, title: match.title, slug: titleToSlug(match.title) },
      { maxAge: 3600 },
    );
  }

  const first = candidates[0]?.title;
  return wikiJson(
    { exists: false, closest: first ? { title: first, slug: titleToSlug(first) } : null },
    { maxAge: 300 },
  );
}
