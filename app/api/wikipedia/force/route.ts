import { NextRequest, NextResponse } from 'next/server';
import titlesSnapshot from '@/data/wikipedia-titles.json';
import { getForceWordsForLetter } from '@/lib/encyclopedia-db';
import { detectArticleCategory, rankForceTitles } from '@/lib/force-title-ranking';
import { fetchWikipediaResource } from '@/lib/wikipedia-fetch';
import { wikipediaLinkLabel } from '@/lib/wikipedia-title';

const known = new Set(titlesSnapshot.titles);
const index = new Map<string, string[]>();
for (const title of known) {
  const letters = Array.from(wikipediaLinkLabel(title).toLocaleLowerCase('sk-SK'));
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
  if (Array.from(letter).length !== 1 || !Number.isInteger(position) || position < 1 || position > 6) return NextResponse.json({titles:[]});
  const matches = (word: string) => !word.endsWith('(rozlišovacia stránka)') && word.length <= 100 && Array.from(wikipediaLinkLabel(word).toLocaleLowerCase('sk-SK'))[position - 1] === letter && wikipediaLinkLabel(word).toLocaleLowerCase('sk-SK') !== wikipediaLinkLabel(title).toLocaleLowerCase('sk-SK');
  const body = await request.json().catch(() => ({}));
  const categories: string[] = (Array.isArray(body.categories) ? body.categories : []).filter((value: unknown): value is string => typeof value === 'string');
  const category = detectArticleCategory(title, categories);
  const context: string[] = (Array.isArray(body.links) ? body.links : []).filter((word: unknown): word is string => typeof word === 'string' && matches(word));
  const pool = (index.get(`${position}:${letter}`) || []).filter(matches);
  const base = getForceWordsForLetter(letter,position,category,100).filter(matches);
  const articleLinks: string[] = (Array.isArray(body.links) ? body.links : []).filter((value: unknown): value is string => typeof value === 'string');
  const ordered = rankForceTitles([...context,...base,...pool], title, articleLinks, categories, base);
  const unverified = (titlesSnapshot.complete ? context : ordered).filter(word => !known.has(word)).slice(0,50);
  const contextual = new Set(context);
  const verified = new Set<string>(ordered.filter(word => known.has(word)));
  if (unverified.length) {
    try {
      const result = await fetchWikipediaResource(`https://sk.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${encodeURIComponent(unverified.join('|'))}`);
      const data = await result.json();
      for (const redirect of [...(data.query?.normalized ?? []), ...(data.query?.redirects ?? [])]) {
        if (contextual.has(redirect.from)) contextual.add(redirect.to);
      }
      for (const page of Object.values(data.query?.pages || {}) as {pageid?:number;ns?:number;title?:string;missing?:string;invalid?:string}[]) {
        if (page.pageid && page.ns === 0 && page.title && !('missing' in page) && !('invalid' in page) && matches(page.title)) verified.add(page.title);
      }
    } catch { /* Verified snapshot titles are still usable during an outage. */ }
  }
  const visibleLabels = new Set<string>();
  const selected = rankForceTitles([...verified], title, [...articleLinks, ...contextual], categories, base).filter(word => {
    const label = wikipediaLinkLabel(word).toLocaleLowerCase('sk-SK');
    if (visibleLabels.has(label)) return false;
    visibleLabels.add(label);
    return true;
  }).slice(0,50);
  return NextResponse.json({titles:selected,contextualTitles:selected.filter(word => contextual.has(word))});
}
