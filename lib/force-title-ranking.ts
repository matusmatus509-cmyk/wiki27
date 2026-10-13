import { detectCategory, type ArticleCategory } from './encyclopedia-db';

const stopWords = new Set(['a', 'aj', 'ako', 'alebo', 'do', 'je', 'na', 'nad', 'od', 'pod', 'pre', 'pri', 'sa', 'so', 'vo', 'za', 'zo', 'v', 'z', 'rokoch', 'roku', 'zoznam', 'clanky', 'kategoria']);
const tokens = (text: string) => text.toLocaleLowerCase('sk-SK').normalize('NFD')
  .replace(/\p{M}/gu, '').match(/\p{L}{3,}/gu)?.filter(word => !stopWords.has(word)).map(word => word.length >= 5 ? word.replace(/[aeiouy]$/, '') : word) ?? [];

export function detectArticleCategory(title: string, categories: string[] = []): ArticleCategory {
  const direct = detectCategory(title);
  if (direct !== 'general') return direct;
  if (categories.some(label => /naroden|úmrti|osobnost|žijúci ľudia/i.test(label))) return 'person';
  for (const label of categories) {
    if (/obce|obcí|departement|okres|kraje|krajov/i.test(label)) return 'geography';
    const inferred = detectCategory(label);
    if (inferred !== 'general') return inferred;
  }
  return 'general';
}

// Prefer actual links, then shared subject words, then broad topic matches.
// Random tie breaks keep repeated articles varied without overriding relevance.
export function rankForceTitles(
  candidates: string[], title: string, links: string[], categories: string[],
  curated: string[] = [],
): string[] {
  const linked = new Set(links);
  const base = new Set(curated);
  const subject = new Set(tokens(`${title} ${categories.join(' ')}`));
  const context = new Map<string, number>();
  for (const link of links) {
    for (const token of new Set(tokens(link))) context.set(token, (context.get(token) ?? 0) + 1);
  }
  const category = detectArticleCategory(title, categories);
  return [...new Set(candidates)].map(candidate => {
    let score = linked.has(candidate) ? 10000 : 0;
    for (const token of new Set(tokens(candidate))) {
      if (subject.has(token)) score += 100;
      score += Math.min(20, context.get(token) ?? 0);
    }
    if (category !== 'general' && detectCategory(candidate) === category) score += 30;
    if (base.has(candidate)) score += 10;
    if (/^Zoznam /i.test(candidate)) score -= 5;
    return { candidate, score, tie: Math.random() };
  }).sort((a, b) => b.score - a.score || a.tie - b.tie).map(item => item.candidate);
}
