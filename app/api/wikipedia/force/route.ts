import { NextRequest, NextResponse } from 'next/server';
import titlesSnapshot from '@/data/wikipedia-titles.json';
import { detectCategory, getForceWordsForLetter, type ArticleCategory } from '@/lib/encyclopedia-db';
import { fetchWikipediaResource } from '@/lib/wikipedia-fetch';

const known = new Set(titlesSnapshot.titles);
const index = new Map<string, string[]>();
for (const title of known) {
  const letters = Array.from(title.toLocaleLowerCase('sk-SK'));
  for (let position = 1; position <= 6; position++) {
    const letter = letters[position - 1];
    if (!letter || !/\p{L}/u.test(letter)) continue;
    const key = `${position}:${letter}`;
    const words = index.get(key) || [];
    words.push(title); index.set(key, words);
  }
}
export async function POST(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const title = params.get('title') || '';
  const letter = (params.get('letter') || '').toLocaleLowerCase('sk-SK');
  const position = Number(params.get('position'));
  if (!letter || position < 1 || position > 6) return NextResponse.json({titles:[]});
  const category = detectCategory(title);
  const matches = (word: string) => !word.endsWith('(rozlišovacia stránka)') && word.length <= 100 && Array.from(word.toLocaleLowerCase('sk-SK'))[position - 1] === letter && word.toLocaleLowerCase('sk-SK') !== title.toLocaleLowerCase('sk-SK');
  const body = await request.json().catch(() => ({}));
  const context = (Array.isArray(body.links) ? body.links : []).filter((word: unknown): word is string => typeof word === 'string' && matches(word));
  const pool = (index.get(`${position}:${letter}`) || []).filter(matches);
  const thematic = pool.filter(word => detectCategory(word) === category && category !== 'general');
  // Actual outbound links from the current article come first. Wider topics
  // remain available in "Pozri aj" without claiming a relationship in prose.
  const base = getForceWordsForLetter(letter,position,category as ArticleCategory,100).filter(matches);
  const shuffled = (words: string[]) => {
    const copy = [...words];
    for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
    return copy;
  };
  const ordered = [...new Set([...context,...base,...shuffled(thematic),...shuffled(pool)])];
  const unverified = ordered.filter(word => !known.has(word)).slice(0,50);
  const verified = new Set<string>(ordered.filter(word => known.has(word)));
  if (unverified.length) {
    try {
      const result = await fetchWikipediaResource(`https://sk.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${encodeURIComponent(unverified.join('|'))}`);
      const data = await result.json();
      for (const page of Object.values(data.query?.pages || {}) as {pageid?:number;ns?:number;title?:string;missing?:string;invalid?:string}[]) {
        if (page.pageid && page.ns === 0 && page.title && !('missing' in page) && !('invalid' in page) && matches(page.title)) verified.add(page.title);
      }
    } catch { /* Verified snapshot titles are still usable during an outage. */ }
  }
  const selected = [...new Set([...ordered.filter(word => verified.has(word)), ...verified])].slice(0,50);
  return NextResponse.json({titles:selected,contextualTitles:selected.filter(word => context.includes(word))});
}
