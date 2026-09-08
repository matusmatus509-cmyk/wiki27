import { NextRequest } from 'next/server';
import { wikiApi, wikiJson, wikiPages } from '@/lib/server/wikipedia-api';

/**
 * Náhľadový obrázok článku — server-side proxy nad MediaWiki `pageimages`.
 *
 * Klient pošle jednu požiadavku a dostane hotovú URL. Server skúsi slovenskú
 * Wikipédiu, potom anglickú (vrátane prekladu bežných slovenských pojmov) a
 * výsledok dlhodobo cacheuje (obrázky článkov sa prakticky nemenia).
 */

/** Preklady bežných slovenských pojmov — pre náhradný obrázok z en.wiki. */
const SK_TO_EN: Record<string, string> = {
  // Hudba
  gitara: 'guitar', klavír: 'piano', husle: 'violin', bubon: 'drum', flauta: 'flute',
  trubka: 'trumpet', saxofón: 'saxophone', kontrabas: 'double bass', harfa: 'harp',
  akordeón: 'accordion', harmonika: 'harmonica', violončelo: 'cello', klarinet: 'clarinet',
  hoboj: 'oboe', fagot: 'bassoon', bicie: 'drums', xylofón: 'xylophone',
  tamburína: 'tambourine', opera: 'opera', symfónia: 'symphony', koncert: 'concert',
  jazz: 'jazz', rock: 'rock music', blues: 'blues',
  // Šport
  futbal: 'football', hokej: 'hockey', tenis: 'tennis', basketbal: 'basketball',
  plávanie: 'swimming', box: 'boxing', atletika: 'athletics', lyžovanie: 'skiing',
  cyklistika: 'cycling', volejbal: 'volleyball', hádzaná: 'handball', golf: 'golf',
  šach: 'chess', biatlon: 'biathlon', gymnastika: 'gymnastics', karate: 'karate',
  džudo: 'judo', snowboard: 'snowboarding', maratón: 'marathon', rugby: 'rugby',
  // Veda
  fyzika: 'physics', chémia: 'chemistry', biológia: 'biology', matematika: 'mathematics',
  astronómia: 'astronomy', geológia: 'geology', ekológia: 'ecology', genetika: 'genetics',
  medicína: 'medicine', psychológia: 'psychology', filozofia: 'philosophy',
  sociológia: 'sociology', atóm: 'atom', molekula: 'molecule', bunka: 'cell',
  evolúcia: 'evolution', gravitácia: 'gravitation', energia: 'energy',
  // Geografia
  slovensko: 'Slovakia', bratislava: 'Bratislava', európa: 'Europe', ázia: 'Asia',
  afrika: 'Africa', amerika: 'America', austrália: 'Australia', antarktída: 'Antarctica',
  oceán: 'ocean', hora: 'mountain', rieka: 'river', jazero: 'lake', more: 'sea',
  ostrov: 'island', púšť: 'desert', les: 'forest', sopka: 'volcano', vodopád: 'waterfall',
  alpy: 'Alps', himaláje: 'Himalayas', sahara: 'Sahara', dunaj: 'Danube', nil: 'Nile',
  amazonka: 'Amazon River',
  // Dejiny
  história: 'history', vojna: 'war', revolúcia: 'revolution', ríša: 'empire',
  kráľovstvo: 'kingdom', republika: 'republic', stredovek: 'Middle Ages',
  renesancia: 'Renaissance', antika: 'antiquity', cisár: 'emperor', kráľ: 'king',
  kráľovná: 'queen',
  // Príroda
  lev: 'lion', slon: 'elephant', tiger: 'tiger', medveď: 'bear', vlk: 'wolf', orol: 'eagle',
  delfín: 'dolphin', veľryba: 'whale', žirafa: 'giraffe', pes: 'dog', mačka: 'cat',
  kôň: 'horse', motýľ: 'butterfly', včela: 'bee', mravec: 'ant', ruža: 'rose',
  tulipán: 'tulip', orchidea: 'orchid', dub: 'oak', smrek: 'spruce', borovica: 'pine',
  // Technika
  počítač: 'computer', internet: 'Internet', telefón: 'telephone', robot: 'robot',
  raketa: 'rocket', satelit: 'satellite', automobil: 'automobile', lietadlo: 'airplane',
  loď: 'ship', televízor: 'television', rádio: 'radio', kamera: 'camera',
  // Kultúra
  umenie: 'art', literatúra: 'literature', film: 'film', divadlo: 'theatre',
  múzeum: 'museum', galéria: 'gallery', tanec: 'dance', balet: 'ballet',
  architektúra: 'architecture', maliarstvo: 'painting', sochárstvo: 'sculpture',
  fotografia: 'photography',
};

type PageWithImage = { thumbnail?: { source?: string }; original?: { source?: string } };

async function pageImage(title: string, size: number, lang: 'sk' | 'en'): Promise<string | null> {
  try {
    const data = await wikiApi(
      {
        action: 'query',
        titles: title,
        prop: 'pageimages',
        piprop: 'thumbnail',
        pithumbsize: size,
        redirects: 1,
      },
      { lang, revalidate: 86400, timeoutMs: 5000 },
    );
    const page = wikiPages<PageWithImage>(data)[0];
    return page?.thumbnail?.source || page?.original?.source || null;
  } catch {
    return null;
  }
}

/** Kandidáti na obrázok v poradí podľa pravdepodobnosti úspechu. */
function candidatesFor(title: string): Array<{ title: string; lang: 'sk' | 'en' }> {
  const trimmed = title.trim();
  const list: Array<{ title: string; lang: 'sk' | 'en' }> = [{ title: trimmed, lang: 'sk' }];
  if (!trimmed) return [];

  const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  if (capitalized !== trimmed) list.push({ title: capitalized, lang: 'sk' });

  // Anglická Wikipédia má výrazne lepšie pokrytie obrázkami.
  list.push({ title: capitalized, lang: 'en' });

  const translation = SK_TO_EN[trimmed.toLocaleLowerCase('sk-SK')];
  if (translation) list.push({ title: translation, lang: 'en' });

  // Zložené pojmy ("Dejiny Slovenska") → skús aj prvé slovo.
  const firstWord = trimmed.split(/\s+/)[0];
  if (firstWord && firstWord !== trimmed && firstWord.length > 2) {
    list.push({ title: firstWord, lang: 'sk' });
    const firstWordTranslation = SK_TO_EN[firstWord.toLocaleLowerCase('sk-SK')];
    if (firstWordTranslation) list.push({ title: firstWordTranslation, lang: 'en' });
  }

  // Odstránime duplicity (case-insensitive podľa názvu + jazyka).
  const seen = new Set<string>();
  return list.filter((item) => {
    const key = `${item.lang}:${item.title.toLocaleLowerCase('sk-SK')}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = (searchParams.get('title') || '').trim();
  const size = Math.min(640, Math.max(60, parseInt(searchParams.get('size') || '320', 10) || 320));

  if (!title) return wikiJson({ error: 'Title is required' }, { status: 400 });

  for (const candidate of candidatesFor(title)) {
    const image = await pageImage(candidate.title, size, candidate.lang);
    if (image) {
      return wikiJson({ image, title, source: `${candidate.lang}:${candidate.title}` }, { maxAge: 86400 });
    }
  }

  // Bez obrázka — negatívny výsledok tiež cacheujeme, aby sme netrápili API.
  return wikiJson({ image: null, title }, { maxAge: 600 });
}
