import { NextResponse } from 'next/server';

const WIKI_HEADERS = {
  'User-Agent': 'WikiForce/1.0 (educational project)',
};

// REVALIDÁCIA: hlavná stránka sa mení každý deň — cache na 10 minút
export const revalidate = 600;

/**
 * Živá hlavná stránka slovenskej Wikipédie.
 *
 * Vráti skutočné HTML predlohy „Hlavná stránka" (Aktuálne udalosti,
 * Odporúčaný článok, Vedeli ste, že…, Obrázok týždňa…) spolu s aktuálnym
 * počtom článkov z siteinfo štatistík. Klient to vykreslí 1:1 ako
 * sk.wikipedia.org a interne odkazy presmeruje na náš /wiki/ router.
 */
export async function GET() {
  try {
    const [mainPageResponse, statsResponse] = await Promise.all([
      fetch(
        `https://sk.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent('Hlavná stránka')}&format=json&prop=text&disableeditsection=true&disablelimitreport=1`,
        { headers: WIKI_HEADERS, next: { revalidate: 600 } }
      ),
      fetch(
        'https://sk.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=statistics&format=json',
        { headers: WIKI_HEADERS, next: { revalidate: 600 } }
      ),
    ]);

    if (!mainPageResponse.ok) {
      throw new Error('Wikipedia main page API error');
    }

    const mainPageData = await mainPageResponse.json();
    if (mainPageData.error) {
      throw new Error(mainPageData.error.info || 'Main page not found');
    }

    let html: string = mainPageData.parse?.text?.['*'] || '';

    // Interne odkazy presmerujeme na náš router — zachováme presný názov
    html = html.replace(
      /href="\/wiki\/([^"#]+)"/g,
      (_match: string, article: string) =>
        `href="/wiki/${article}" data-internal="true"`
    );

    // Editačné odkazy nepotrebujeme; <style> bloky ponecháme — obsahujú
    // responzívne štýly predlohy Hlavnej stránky (skladanie stĺpcov na mobile).
    html = html.replace(/<span class="mw-editsection[\s\S]*?<\/span>/g, '');

    // Aktuálne štatistiky encyklopédie
    let stats = {
      articles: 0,
      edits: 0,
      users: 0,
      activeUsers: 0,
    };
    if (statsResponse.ok) {
      const statsData = await statsResponse.json();
      const s = statsData.query?.statistics;
      if (s) {
        stats = {
          articles: s.articles ?? 0,
          edits: s.edits ?? 0,
          users: s.users ?? 0,
          activeUsers: s.activeusers ?? 0,
        };
      }
    }

    return NextResponse.json({
      title: mainPageData.parse?.title || 'Hlavná stránka',
      html,
      stats,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Wikipedia main page error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch main page' },
      { status: 500 }
    );
  }
}
