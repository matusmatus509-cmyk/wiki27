import { writeFile, readFile } from 'node:fs/promises';
const file = new URL('../data/wikipedia-titles.json', import.meta.url);
let titles = [];
let cursor = 'A';
try { const saved = JSON.parse(await readFile(file, 'utf8')); titles = saved.titles; cursor = saved.continue && /^\p{L}/u.test(saved.continue) ? saved.continue : 'A'; if (saved.complete) process.exit(0); } catch {}
const seen = new Set(titles);
let pages = 0;
const prefixes = Array.from('CDEFGHIJKLMNOPQRSTUVWXYZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ');
let prefixIndex = 0;
let prefixBatches = 0;
const exhaustive = process.argv.includes('--complete');
if (!exhaustive) cursor = undefined;
while (true) {
 const params = new URLSearchParams({action:'query',format:'json',list:'allpages',apnamespace:'0',apfilterredir:'nonredirects',aplimit:'500', ...(cursor ? {apcontinue:cursor} : {}), ...(!exhaustive ? {apprefix:prefixes[prefixIndex]} : {})});
 let data;
 for(let retry=0;retry<6;retry++) {
  try {
   const r=await fetch('https://sk.wikipedia.org/w/api.php?'+params,{headers:{'User-Agent':'WikiForce/1.0 (Slovak article title index)'},signal:AbortSignal.timeout(25000)});
   if(!r.ok)throw new Error('Wikipedia HTTP '+r.status);
   data=await r.json();if(!data.query?.allpages)throw new Error(JSON.stringify(data.error||data));break;
  }catch(e){if(retry===5)throw e;await new Promise(r=>setTimeout(r,Math.min(30000,3000*(retry+1))));}
 }
 for(const page of data.query.allpages)if(page.ns===0 && /^\p{L}/u.test(page.title) && !seen.has(page.title)){seen.add(page.title);titles.push(page.title);}
 cursor=data.continue?.apcontinue;pages++;prefixBatches++;
 if(pages%10===0 || !cursor){await writeFile(file,JSON.stringify({source:'https://sk.wikipedia.org/w/api.php?action=query&list=allpages&apnamespace=0&apfilterredir=nonredirects',updatedAt:new Date().toISOString(),complete:exhaustive && !cursor,continue:exhaustive ? cursor : undefined,scope:exhaustive ? 'all namespace-0 nonredirect titles' : 'alphabetic sample plus previously collected titles',titles}));console.log(titles.length+' verified titles; '+(cursor||'complete'));}
 if (!exhaustive && (!cursor || prefixBatches >= 2)) {
  prefixIndex++;prefixBatches=0;cursor=undefined;
  if(prefixIndex>=prefixes.length) {
   await writeFile(file,JSON.stringify({source:'https://sk.wikipedia.org/w/api.php?action=query&list=allpages&apnamespace=0&apfilterredir=nonredirects',updatedAt:new Date().toISOString(),complete:false,scope:'alphabetic sample plus previously collected titles',titles}));break;
  }
 } else if(exhaustive && !cursor)break;
 await new Promise(resolve => setTimeout(resolve,1200));
}
