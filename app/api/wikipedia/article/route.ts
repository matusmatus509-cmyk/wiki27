import { fetchWikipediaResource as fetchWikipedia } from '@/lib/wikipedia-fetch';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { NextRequest, NextResponse } from 'next/server';

const WIKI_HEADERS = {
  'User-Agent': 'WikiForce/1.0 (educational project)',
};


// Odstránime z parse HTML všetko, čo nepatrí do telo článku — šablóny,
// navigačné boxy, správy o údržbe a ďalšie meta prvky. CSS ich síce aj tak
// skrýva, ale server-side čistenie výrazne zníži prenášaný objem dát.
function cleanArticleHtml(html: string): string {
  return (
    html
      // <style> bloky z predlohy (tlačové/tmavé štýly Hlavnej stránky a pod.)
      .replace(/<style[\s\S]*?<\/style>/g, '')
      // Editovacie sekcie a odkazy na editáciu
      .replace(/<span class="mw-editsection[\s\S]*?<\/span>/g, '')
      // Referencie inline (superscript) — číslovaný zoznam zostáva
      .replace(/<sup class="reference[^"]*"[^>]*>[\s\S]*?<\/sup>/g, '')
      .replace(/<sup id="cite_ref[^"]*"[^>]*>[\s\S]*?<\/sup>/g, '')
      // Navigačné a meta boxy (navbox, ambox, sistersitebox, side-box…)
      .replace(/<div class="(?:navbox|sistersitebox|side-box|metadata|ambox|dmbox|mw-jump-link|noprint|printonly)[^"]*"[^>]*>[\s\S]*?<\/div>/g, '')
      .replace(/<table class="(?:navbox|metadata|ambox|vertical-navbox)[^"]*"[^>]*>[\s\S]*?<\/table>/g, '')
      // Skryté šablónové prvky
      .replace(/<div style="display:\s*none[^>]*>[\s\S]*?<\/div>/g, '')
      // Kategórie v spodku článku (zobrazujeme vlastný blok)
      .replace(/<div id="catlinks[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/g, '')
      .replace(/<div id="catlinks[^"]*"[^>]*>[\s\S]*?<\/div>/g, '')
      // Prázdne odseky z čistenia
      .replace(/<p><\/p>/g, '')
  );
}

// Wikipedia API article content endpoint - fetches REAL HTML content with links
async function loadArticle(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title');

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  try {
    // Parse API vracia skutočné HTML článku; redirects=1 vyrieši presmerovania
    // (napr. „Fyzika" → „Fyzika (veda)") rovnako ako to robí skutočná Wikipédia.
    const parseResponse = await fetchWikipedia(
      `https://sk.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&format=json&prop=text|categories|links&redirects=1&disableeditsection=true&disabletoc=false`,
      {
        headers: WIKI_HEADERS,
      }
    );

    if (!parseResponse.ok) {
      throw new Error('Wikipedia API error');
    }

    const parseData = await parseResponse.json();

    if (parseData.error) {
      if (['missingtitle', 'invalidtitle'].includes(parseData.error.code)) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      throw new Error(parseData.error.info || 'Wikipedia parse error');
    }

    const parsed = parseData.parse;

    // Obrázok článku (pageimages) — opäť s redirectmi
    const imageResponse = await fetchWikipedia(
      `https://sk.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(parsed.title)}&prop=pageimages%7Crevisions&rvprop=timestamp&format=json&pithumbsize=320&redirects=1`,
      {
        headers: WIKI_HEADERS,
      }
    ).catch(() => null);

    let imageUrl = null;
    let lastModified: string | undefined;
    if (imageResponse?.ok) {
      const imageData = await imageResponse.json();
      const pages = imageData.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        imageUrl = pages[pageId]?.thumbnail?.source || null;
        lastModified = pages[pageId]?.revisions?.[0]?.timestamp;
      }
    }

    // Process HTML content - fix relative links to point to our wiki
    let htmlContent = parsed.text?.['*'] || '';

    // Fix Wikipedia internal links to work with our routing.
    // DÔLEŽITÉ: zachováme presný názov článku (veľké/malé písmená aj
    // podčiarkovníky), inak by napr. odkaz na „Albert_Einstein" viedol na
    // neexistujúci článok „albert-einstein".
    htmlContent = htmlContent.replace(
      /href="\/wiki\/([^"#]+)"/g,
      (match: string, article: string) =>
        `href="/wiki/${article}" data-internal="true"`
    );

    htmlContent = cleanArticleHtml(htmlContent);

    // Extract links for fallback
    const links = (parsed.links || [])
      .filter((link: { ns: number; exists?: string; '*': string }) => link.ns === 0 && link.exists !== undefined)
      .map((link: { '*': string }) => link['*'])
      .slice(0, 500);

    // Extract categories
    const categories = (parsed.categories || [])
      .map((cat: { '*': string }) => cat['*'])
      .filter((c: string) => !c.includes(':'))
      .slice(0, 5);

    return NextResponse.json({
      title: parsed.title,
      content: htmlContent,
      image: imageUrl,
      lastModified,
      links,
      categories,
      redirectedFrom: parseData.redirectedFrom || null,
      wikipediaUrl: `https://sk.wikipedia.org/wiki/${encodeURIComponent(parsed.title)}`,
    });
  } catch (error) {
    console.error('Wikipedia article error:', error);
    return NextResponse.json({ error: 'Wikipedia API is temporarily unavailable' }, { status: 503 });
  }
}


export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')?.trim();
  if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  const key = createHash('sha256').update(title.toLocaleLowerCase('sk-SK')).digest('hex');
  const file = `/tmp/wiki27-wikipedia-cache/${key}.json`;
  try {
    const info = await stat(file);
    if (Date.now() - info.mtimeMs < 86400000) {
      const cached = JSON.parse(await readFile(file, 'utf8'));
      if (cached.content) return NextResponse.json(cached);
    }
  } catch { /* First visit to this article. */ }
  const response = await loadArticle(request);
  if (response.ok) {
    try {
      const text = await response.clone().text();
      await mkdir('/tmp/wiki27-wikipedia-cache', { recursive: true });
      await writeFile(file, text);
    } catch { /* Read-only serverless filesystems may still use the shared response cache. */ }
    return response;
  }
  try {
    const cached = JSON.parse(await readFile(file, 'utf8'));
    if (cached.content) return NextResponse.json(cached);
  } catch { /* No previously downloaded article. */ }
  if (response.status === 404) return response;
  // TextExtracts is a separate, much smaller API operation than action=parse.
  try {
    const params = new URLSearchParams({ action:'query',format:'json',redirects:'1',titles:title,prop:'extracts|pageimages|info',exintro:'1',exsentences:'5',exlimit:'1',piprop:'thumbnail',pithumbsize:'640',inprop:'url' });
    const result = await fetchWikipedia(`https://sk.wikipedia.org/w/api.php?${params}`);
    const data = await result.json();
    const page = Object.values(data.query?.pages || {}).find((value: any) => value.pageid && value.ns === 0 && value.extract) as any;
    if (page) return NextResponse.json({ title:page.title,content:page.extract,image:page.thumbnail?.source || null,links:[],categories:[],wikipediaUrl:page.fullurl || `https://sk.wikipedia.org/wiki/${encodeURIComponent(page.title)}` });
  } catch { /* Client retains previously loaded real articles and retries automatically. */ }
  return response;
}
