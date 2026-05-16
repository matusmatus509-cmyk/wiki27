import { NextRequest, NextResponse } from 'next/server';

// Wikipedia API to get image for any term
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title');
  
  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  try {
    // Try to get image from Wikipedia
    const response = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300&origin=*`,
      {
        headers: {
          'User-Agent': 'WikiForce/1.0 (educational project)',
        },
      }
    );

    if (!response.ok) {
      // Try English Wikipedia as fallback
      const enResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300&origin=*`,
        {
          headers: {
            'User-Agent': 'WikiForce/1.0 (educational project)',
          },
        }
      );
      
      if (!enResponse.ok) {
        return NextResponse.json({ image: null });
      }
      
      const enData = await enResponse.json();
      const pages = enData.query?.pages || {};
      const pageId = Object.keys(pages)[0];
      const imageUrl = pages[pageId]?.thumbnail?.source || null;
      
      return NextResponse.json({ image: imageUrl });
    }

    const data = await response.json();
    const pages = data.query?.pages || {};
    const pageId = Object.keys(pages)[0];
    let imageUrl = pages[pageId]?.thumbnail?.source || null;
    
    // If no image found in Slovak Wikipedia, try English
    if (!imageUrl) {
      const enResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300&origin=*`,
        {
          headers: {
            'User-Agent': 'WikiForce/1.0 (educational project)',
          },
        }
      );
      
      if (enResponse.ok) {
        const enData = await enResponse.json();
        const enPages = enData.query?.pages || {};
        const enPageId = Object.keys(enPages)[0];
        imageUrl = enPages[enPageId]?.thumbnail?.source || null;
      }
    }

    return NextResponse.json({ image: imageUrl });
  } catch (error) {
    console.error('Wikipedia image error:', error);
    return NextResponse.json({ image: null });
  }
}
