import { wikiApi, wikiJson } from '@/lib/server/wikipedia-api';

// REVALIDÁCIA: hlavná stránka sa mení každý deň — cache na 10 minút
export const revalidate = 600;

/**
 * Živá hlavná stránka slovenskej Wikipédie.
 *
 * Vráti skutočné HTML predlohy „Hlavná stránka“ (Aktuálne udalosti,
 * Odporúčaný článok, Vedeli ste, že…, Obrázok týždňa…) spolu s aktuálnym
 * počtom článkov zo siteinfo štatistík. Obe volania bežia paralelne a
 * výsledok cacheuje Next.js (10 min) aj CDN.
 */
export async function GET() {
  try {
    const [mainPageData, statsData] = await Promise.all([
      wikiApi(
        {
          action: 'parse',
          page: 'Hlavná stránka',
          prop: 'text',
          disableeditsection: true,
          disablelimitreport: 1,
        },
        { revalidate: 600, timeoutMs: 12000 },
      ),
      wikiApi(
        { action: 'query', meta: 'siteinfo', siprop: 'statistics' },
        { revalidate: 600, timeoutMs: 6000 },
      ).catch(() => null),
    ]);

    if (mainPageData?.error) {
      throw new Error(mainPageData.error.info || 'Main page not found');
    }

    const html: string = mainPageData?.parse?.text?.['*'] || '';
    if (!html) throw new Error('Empty main page');

    // Interne odkazy presmerujeme na náš router — zachováme presný názov
    const linked = html.replace(
      /href="\/wiki\/([^"#]+)"/g,
      (_match: string, article: string) => `href="/wiki/${article}" data-internal="true"`,
    );

    // Editačné odkazy nepotrebujeme; <style> bloky ponecháme — obsahujú
    // responzívne štýly predlohy Hlavnej stránky (skladanie stĺpcov na mobile).
    const cleaned = linked.replace(/<span class="mw-editsection[\s\S]*?<\/span>/g, '');

    // Aktuálne štatistiky encyklopédie
    const s = statsData?.query?.statistics;
    const stats = {
      articles: s?.articles ?? 0,
      edits: s?.edits ?? 0,
      users: s?.users ?? 0,
      activeUsers: s?.activeusers ?? 0,
    };

    return wikiJson(
      {
        title: mainPageData?.parse?.title || 'Hlavná stránka',
        html: cleaned,
        stats,
        fetchedAt: new Date().toISOString(),
      },
      { maxAge: 600, swr: 86400 },
    );
  } catch (error) {
    console.error('Wikipedia main page error:', error);
    return wikiJson({ error: 'Failed to fetch main page' }, { status: 503 });
  }
}
