import { NextRequest, NextResponse } from 'next/server';

// Wikipedia API search endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  if (!query || query.length < 1) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Use Wikipedia OpenSearch API for search suggestions
    const response = await fetch(
      `https://sk.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=10&namespace=0&format=json`,
      {
        headers: {
          'User-Agent': 'WikiForce/1.0 (educational project)',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Wikipedia API error');
    }

    const data = await response.json();
    // OpenSearch returns: [query, [titles], [descriptions], [urls]]
    const titles = data[1] || [];
    const descriptions = data[2] || [];
    const urls = data[3] || [];

    const results = titles.map((title: string, index: number) => ({
      title,
      excerpt: descriptions[index] || '',
      url: urls[index] || '',
      // Use the title directly without encoding - let the routing handle it
      slug: title.replace(/ /g, '_'),
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Wikipedia search error:', error);
    return NextResponse.json({ results: [], error: 'Failed to search Wikipedia' });
  }
}
