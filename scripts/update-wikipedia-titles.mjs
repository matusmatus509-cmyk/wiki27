import { writeFile, readFile, rename } from 'node:fs/promises';

// Walk the official namespace-0 index instead of sampling alphabetic prefixes.
// Checkpoints let an interrupted update resume without repeating the crawl.
const file = new URL('../data/wikipedia-titles.json', import.meta.url);
const temporary = new URL('../data/wikipedia-titles.json.tmp', import.meta.url);
const source = 'https://sk.wikipedia.org/w/api.php?action=query&list=allpages&apnamespace=0&apfilterredir=nonredirects';
let saved;
try { saved = JSON.parse(await readFile(file, 'utf8')); } catch {}
if (saved?.complete && !process.argv.includes('--refresh')) {
  console.log(`${saved.titles.length} titles; index already complete (use --refresh to rebuild)`);
  process.exit(0);
}
const resuming = saved?.scope?.startsWith('all namespace-0 nonredirect titles') && saved?.continue && !process.argv.includes('--refresh');
const seen = new Set(resuming ? saved.titles : []);
let cursor = resuming ? saved.continue : undefined;
let batches = 0;
async function checkpoint(complete) {
  await writeFile(temporary, JSON.stringify({
    source, updatedAt: new Date().toISOString(), complete,
    ...(cursor ? { continue: cursor } : {}),
    scope: 'all namespace-0 nonredirect titles starting with a letter',
    verifiedVia: ['allpages namespace 0 nonredirects', ...(saved?.verifiedVia?.includes('query titles namespace 0 canonical redirects') ? ['query titles namespace 0 canonical redirects'] : [])],
    titles: [...seen],
  }));
  await rename(temporary, file);
  console.log(`${seen.size} verified titles; ${cursor || 'complete'}`);
}
while (true) {
  const params = new URLSearchParams({ action: 'query', format: 'json', list: 'allpages',
    apnamespace: '0', apfilterredir: 'nonredirects', aplimit: '500',
    ...(cursor ? { apcontinue: cursor } : {}),
  });
  let data;
  for (let retry = 0; retry < 6; retry++) {
    try {
      const response = await fetch('https://sk.wikipedia.org/w/api.php?' + params, {
        headers: { 'User-Agent': 'WikiForce/1.0 (https://github.com/matusmatus509-cmyk/wiki27; Slovak article title index)' },
        signal: AbortSignal.timeout(25000),
      });
      if (!response.ok) {
        const error = new Error(`Wikipedia HTTP ${response.status}`);
        if (response.status === 429) error.retryDelay = Math.min(60000, Math.max(1000, (Number(response.headers.get('retry-after')) || 30) * 1000));
        throw error;
      }
      data = await response.json();
      if (!Array.isArray(data.query?.allpages)) throw new Error(JSON.stringify(data.error || data));
      break;
    } catch (error) {
      if (retry === 5) {
        // Preserve the last successful cursor, never mark a partial crawl complete.
        if (batches) await checkpoint(false);
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, error.retryDelay ?? Math.min(30000, 3000 * (retry + 1))));
    }
  }
  for (const page of data.query.allpages) {
    if (page.ns === 0 && /^\p{L}/u.test(page.title)) seen.add(page.title);
  }
  cursor = data.continue?.apcontinue;
  batches++;
  if (batches % 20 === 0 || !cursor) await checkpoint(!cursor);
  if (!cursor) break;
  await new Promise(resolve => setTimeout(resolve, 1200));
}
