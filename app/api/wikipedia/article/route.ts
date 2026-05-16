import { NextRequest, NextResponse } from 'next/server';

// Wikipedia API article content endpoint - fetches REAL HTML content with links
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title');
  
  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  try {
    // Use the parse API to get actual HTML content with links
    const parseResponse = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&format=json&prop=text|categories|links|images&disableeditsection=true&disabletoc=false`,
      {
        headers: {
          'User-Agent': 'WikiForce/1.0 (educational project)',
        },
      }
    );

    if (!parseResponse.ok) {
      throw new Error('Wikipedia API error');
    }

    const parseData = await parseResponse.json();
    
    if (parseData.error) {
      // Article not found, try to get basic info
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const parsed = parseData.parse;
    
    // Get image from a separate API call
    const imageResponse = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300`,
      {
        headers: {
          'User-Agent': 'WikiForce/1.0 (educational project)',
        },
      }
    );
    
    let imageUrl = null;
    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      const pages = imageData.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        imageUrl = pages[pageId]?.thumbnail?.source || null;
      }
    }

    // Process HTML content - fix relative links to point to our wiki
    let htmlContent = parsed.text?.['*'] || '';
    
    // Fix Wikipedia internal links to work with our routing
    // Change /wiki/Article to /wiki/article (lowercase slug)
    htmlContent = htmlContent.replace(
      /href="\/wiki\/([^"#]+)"/g,
      (match: string, article: string) => {
        const slug = decodeURIComponent(article).toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
        return `href="/wiki/${slug}" data-internal="true"`;
      }
    );
    
    // Remove edit links, reference links, and other non-essential elements
    htmlContent = htmlContent.replace(/<span class="mw-editsection">[\s\S]*?<\/span>/g, '');
    htmlContent = htmlContent.replace(/<sup class="reference">[\s\S]*?<\/sup>/g, '');
    
    // Extract links for fallback
    const links = (parsed.links || [])
      .filter((link: { ns: number; exists?: string; '*': string }) => link.ns === 0 && link.exists !== undefined)
      .map((link: { '*': string }) => link['*'])
      .slice(0, 20);

    // Extract categories
    const categories = (parsed.categories || [])
      .map((cat: { '*': string }) => cat['*'])
      .filter((c: string) => !c.includes(':'))
      .slice(0, 5);

    return NextResponse.json({
      title: parsed.title,
      content: htmlContent,
      image: imageUrl,
      links,
      categories,
      wikipediaUrl: `https://sk.wikipedia.org/wiki/${encodeURIComponent(title)}`,
    });
  } catch (error) {
    console.error('Wikipedia article error:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
