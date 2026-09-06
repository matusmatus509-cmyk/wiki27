// ────────────────────────────────────────────────────────────────────────────
// ROZŠÍRENIE SLOVNEJ ZÁSOBY (2026)
// Doplnené stovky korektných slovenských encyklopedických pojmov.
// Priorita: vyplnenie medzier pri zriedkavých písmenách (q, x, w, ä, ó, ô,
// ť, ď, ľ, ĺ, ŕ, ň, ý) na pozíciách 1–6 a obohatenie každej kategórie.
// Zoznam sa spája s VOCABULARY_BY_CATEGORY v encyclopedia-db.ts.
// ────────────────────────────────────────────────────────────────────────────

import type { ArticleCategory } from './encyclopedia-db';

export const VOCABULARY_EXPANSION: Record<ArticleCategory, string[]> = {
  // ─────────── VŠEOBECNÉ ───────────
  general: [
    // Zriedkavé písmená Q, X, W
    'Quark', 'Qumrán', 'Quo vadis', 'Qubit', 'Quasar', 'Quartz', 'Qatar',
    'Xénon', 'Oxid', 'Axióma', 'Alexandrit', 'Alexandrín', 'Box', 'Sextant',
    'Existencia', 'Expedícia', 'Maximum', 'Minimum', 'Larynx', 'Exotika',
    'Toxín', 'Axón', 'Xylem', 'Röntgen', 'Expanzia', 'Extinkcia', 'Exil',
    'Watt', 'Whisky', 'Wagner', 'Wales', 'Windsor', 'Wellington', 'Western',
    'Wafle', 'Wattmeter',
    // Písmeno Ä, Ó
    'Päta', 'Mäso', 'Mäsiar', 'Väzeň', 'Päsmo', 'Mäta', 'Väzba', 'Mäkkýš',
    'Väz', 'Mäsožravec', 'Päsť', 'Mäkkosť', 'Óda', 'Óriáš', 'Ópium',
    // Písmeno Ô na rôznych pozíciách
    'Kôň', 'Kôra', 'Kôpka', 'Stôl', 'Nôž', 'Hôrny', 'Dôkaz', 'Dôvera',
    'Dôvod', 'Dôraz', 'Dôležitý', 'Vôňa', 'Vôl', 'Vôbec', 'Gôľ', 'Bôr',
    'Dôsledok', 'Dôchodca', 'Dôstojník', 'Móda', 'Dóza', 'Lóže', 'Vôľa',
    'Ôsmy', 'Kôza', 'Dôverník', 'Módny', 'Kôrovec',
    // Písmeno Ť na rôznych pozíciách
    'Ťavica', 'Ťažký', 'Šťuka', 'Šťava', 'Dieťa', 'Pamäť', 'Poťah', 'Sieť',
    'Viazať', 'Sedieť', 'Vidieť', 'Robiť', 'Točiť', 'Tlačiť', 'Cvičiť',
    'Kúpiť', 'Spať', 'Biť', 'Piť', 'Báť', 'Kričať', 'Mlčať', 'Chaťa',
    'Siať', 'Háňať', 'Žriať', 'Šťastie', 'Ťažisko', 'Pamätiť', 'Škriatok',
    'Hriatie', 'Sadnúť', 'Ťahať',
    // Písmeno Ď na rôznych pozíciách
    'Ďakovať', 'Ďatelina', 'Ďalekohľad', 'Ďasno', 'Ďiaľ', 'Ďalší', 'Ďumbier',
    'Podivín', 'Podivný', 'Obdiv', 'Vedieť', 'Radieť', 'Obdivovať', 'Ďaleko',
    // Písmeno Ľ / Ĺ na rôznych pozíciách
    'Hĺbka', 'Hĺbiť', 'Vĺča', 'Stĺp', 'Kĺb', 'Pĺť', 'Vľavo', 'Mĺknuť',
    'Kľúč', 'Kľud', 'Vplyv', 'Kľak', 'Hľadať', 'Kľúčový', 'Stĺpik',
    'Hĺbkový', 'Kĺzať', 'Hľadanie',
    // Písmeno Ŕ
    'Vŕba', 'Kŕdeľ', 'Kŕmiť', 'Vŕtačka', 'Vŕtať', 'Pŕhľava', 'Hŕba',
    'Hŕstka', 'Kŕč', 'Tŕň', 'Tŕnie', 'Vŕšok',
    // Písmeno Ň
    'Kaňon', 'Kaňka', 'Tanečný', 'Voňavý', 'Voňať', 'Jaseň', 'Peň', 'Daň',
    'Seň', 'Čerešňa', 'Pláň', 'Kameň', 'Kameňolom', 'Zanechať',
    // Písmeno Ý na rôznych pozíciách
    'Výskum', 'Výlet', 'Výpočet', 'Býk', 'Mýto', 'Pýcha', 'Sýkora', 'Dýka',
    'Dýchať', 'Hýbať', 'Týždeň', 'Mýval', 'Vývoj', 'Celý', 'Malý', 'Nový',
    'Milý', 'Starý', 'Čistý', 'Hustý', 'Rýchly', 'Veľký', 'Ľahký', 'Drahý',
    'Pestrý', 'Hlboký', 'Vysoký', 'Jasný', 'Krátky', 'Sýčok', 'Lýkožrút',
    // Ďalšie všeobecné encyklopedické pojmy
    'Atmosféra', 'Bankovka', 'Bibliografia', 'Cirkev', 'Diplomacia',
    'Epidemiológia', 'Etika', 'Geopolitika', 'Katastrofa', 'Kolonizácia',
    'Konferencia', 'Manuskript', 'Mimoriadny', 'Násilie', 'Obchod',
    'Paradox', 'Parlament', 'Podmienka', 'Pramienok', 'Prevádzka',
    'Priemysel', 'Profesia', 'Rozvoj', 'Sloboda', 'Svedomie',
    'Štruktúra', 'Vzdelanie', 'Zodpovednosť', 'Živobytie', 'Archív',
    'Archivár', 'Aktuality', 'Bilingvizmus', 'Kaleidoskop',
    'Nostalgický', 'Orientácia', 'Katalóg', 'Labyrint', 'Medailón',
    'Metamorfóza', 'Mikroskop', 'Monument', 'Obelisk', 'Oblak',
    'Odraz', 'Ostrov', 'Minulosť', 'Budúcnosť', 'Prítomnosť',
    'Dedicina', 'Dedičstvo', 'Spoločenstvo', 'Zákon', 'Právo',
    'Súd', 'Cirkevný kalendár', 'Výročie', 'Pamiatka', 'Pomník',
  ],

  // ─────────── VEDA ───────────
  science: [
    'Hadron', 'Neutrino', 'Kvark', 'Kvant', 'Antihmota', 'Antiatóm',
    'Bioluminiscencia', 'Cytoplazma', 'Chlorofyl', 'Chromozóm', 'Difúzia',
    'Elektromagnetizmus', 'Fotosyntéza', 'Genotyp', 'Gejzír', 'Hélium',
    'Izotop', 'Katalyzátor', 'Metanol', 'Mitóza', 'Meióza', 'Neutrón',
    'Nukleotid', 'Orbitál', 'Oxidácia', 'Ozón', 'Plazma', 'Polymér',
    'Protón', 'Spektroskopia', 'Sublimácia', 'Urán', 'Vltavín',
    'Zliatina', 'Xylem', 'Toxín', 'Axón', 'Hydroxid', 'Xénon',
    'Kvantová mechanika', 'Astrofyzika', 'Biochémia', 'Biotechnológia',
    'Elektrolýza', 'Entropia', 'Galaxia', 'Geotermálna energia',
    'Heliosféra', 'Infračervené žiarenie', 'Ionosféra', 'Kozmológia',
    'Krystalografia', 'Magnetizmus', 'Molekulárna biológia',
    'Nanoštruktúra', 'Nukleárna fúzia', 'Osmóza', 'Oxid uhličitý',
    'Paradigma', 'Radiácia', 'Spektrum', 'Supernova', 'Temná hmota',
    'Termodynamika', 'Ultrafialové žiarenie', 'Vodík', 'Zrážanlivosť',
    'Ľadovec', 'Ťažný plyn', 'Ťažoba', 'Výpočtová veda', 'Vedný odbor',
  ],

  // ─────────── ZEMEPIS ───────────
  geography: [
    'Veľká Fatra', 'Malá Fatra', 'Nízke Tatry', 'Vysoké Tatry',
    'Tatranská Lomnica', 'Štrbské Pleso', 'Považie', 'Záhorie', 'Gemer',
    'Turiec', 'Kysuce', 'Orava', 'Liptov', 'Spiš', 'Zemplín', 'Tekov',
    'Hont', 'Novohrad', 'Horehronie', 'Pohronie', 'Ponitrie',
    'Západné Tatry', 'Belianske Tatry', 'Malé Karpaty', 'Panónia',
    'Bodamské jazero', 'Balaton', 'Bajkal', 'Sahel', 'Savana', 'Tundra',
    'Tajga', 'Step', 'Atacama', 'Patagónia', 'Amazónia', 'Mezopotámia',
    'Skandinávia', 'Pyreneje', 'Dolomity', 'Apenníny', 'Ural',
    'Kaukaz', 'Altaj', 'Kalahari', 'Pamír', 'Zambézi', 'Okavango',
    'Ťan-šan', 'Hôrka', 'Liptovský Mikuláš', 'Ťaháč', 'Dunajec',
    'Hron', 'Váh', 'Tisa', 'Odra', 'Volga', 'Dneper', 'Pečora',
    'Severný ľadový oceán', 'Atlantický oceán', 'Karibské more',
    'Stredozemné more', 'Čierne more', 'Baltské more', 'Severné more',
    'Cyklón', 'Anticyklóna', 'Monzún', 'Pasáty', 'El Niño', 'La Niña',
    'Niva', 'Delta', 'Estuár', 'Fjord', 'Atol', 'Lagúna', 'Mangrovy',
    'Prales', 'Oáza', 'Vŕšok', 'Dolina', 'Kotlina', 'Hlboká dolina',
  ],

  // ─────────── HISTÓRIA ───────────
  history: [
    'Veľkomoravská ríša', 'Avarský kaganát', 'Hunská ríša',
    'Byzantská ríša', 'Osmanská ríša', 'Rímska ríša', 'Keltské osídlenie',
    'Starí Slovania', 'Cyrilo-metodská misia', 'Staroslovienčina',
    'Trianonská zmluva', 'Martinská deklarácia', 'Žilinská zmluva',
    'Turčiansky snem', 'Koncentračný tábor', 'Ghetto', 'Husitské vojny',
    'Janičiar', 'Feudál', 'Panstvo', 'Štôlňa', 'Kňaz', 'Kňažná',
    'Knieňa', 'Knieža', 'Kňažstvo', 'Daň', 'Gróf', 'Grófstvo',
    'Vojvoda', 'Vojvodstvo', 'Pápež', 'Pápežstvo', 'Kardinál',
    'Križiacka výprava', 'Tŕňová koruna', 'Austerlitz', 'Waterloo',
    'Reformácia', 'Protireformácia', 'Kuruc', 'Labanc', 'Františkán',
    'Dominikán', 'Jezuita', 'Piaristi', 'Premonštráti', 'Benediktín',
    'Cisterciáni', 'Hradisko', 'Kaštieľ', 'Kúria', 'Župa', 'Zemepán',
    'Poddaný', 'Kmet', 'Želiar', 'Cech', 'Gilda', 'Trhové právo',
    'Zlatá bula', 'Kódex', 'Kronika', 'Archeologický nález',
    'Ťažká jazda', 'Ťažné právo', 'Ňadto', 'Kňažstvo',
  ],

  // ─────────── OSOBNOSTI ───────────
  person: [
    'Milan Rastislav Štefánik', 'Ľudovít Štúr', 'Ján Kollár',
    'Pavol Országh Hviezdoslav', 'Martin Benka', 'Jozef Murgaš',
    'Aurel Stodola', 'Ján Bahýľ', 'Štefan Banič', 'Andrej Kmeť',
    'Juraj Tranovský', 'Matej Bel', 'Ľudmila', 'Wagner', 'Weber',
    'Wilde', 'Wells', 'Xerxes', 'Quentin Tarantino', 'Xénia',
    'Ľudovít', 'Ľubomír', 'Ján Hollý', 'Samo Chalupka',
    'Andrej Sládkovič', 'Janko Kráľ', 'Božena Němcová',
    'Klement Gottwald', 'Alexander Dubček', 'Gustáv Husák',
    'Mikuláš Dzurinda', 'Zuzana Čaputová', 'Andrej Kiska',
    'Ivan Gašparovič', 'Ľubomír Feldek', 'Milan Lasica',
    'Július Satinský', 'Marián Gáborík', 'Zdeno Cíger',
    'Peter Šťastný', 'Anton Šťastný', 'Marián Hossa',
    'Marek Hamšík', 'Xénios', 'Quintus', 'Watt',  ],

  // ─────────── ŠPORT ───────────
  sport: [
    'Kôš', 'Stolný tenis', 'Ľahkoatletika', 'Tréner', 'Tréning',
    'Výhra', 'Výsledok', 'Remíza', 'Predĺženie', 'Štafeta', 'Jazdectvo',
    'Šachovnica', 'Rozhodca', 'Vylúčenie', 'Trestný striel', 'Prekážka',
    'Výskok', 'Hod oštepom', 'Hod kladivom', 'Vrh guľou',
    'Beh na lyžiach', 'Štart', 'Ťažká váha', 'Bantamváha', 'Kôl',
    'Bránkár', 'Obranca', 'Útočník', 'Polobránca', 'Vysoký skok',
    'Dĺžka', 'Trojskok', 'Maratónsky beh', 'Šprint', 'Šprinter',
    'Cestná cyklistika', 'Horská cyklistika', 'Snowboarding',
    'Ľadový hokej', 'Pozemný hokej', 'Florbal', 'Nohejbal',
    'Softball', 'Kriket', 'Badminton', 'Squash', 'Billiard',
    'Šípky', 'Bowling', 'Golfista', 'Tenista', 'Ťažká atletika',
  ],

  // ─────────── TECHNOLÓGIA ───────────
  technology: [
    'Drôt', 'Kľuka', 'Kľukovka', 'Výkon', 'Kryptografia', 'Turbína',
    'Transformátor', 'Kondenzátor', 'Rezistor', 'Polovodič', 'Server',
    'Klient', 'Premenná', 'Vodič', 'Prevodovka', 'Spaľovací motor',
    'Parný stroj', 'Generátor', 'Vstup', 'Výstup', 'Kódovanie',
    'Signál', 'Skrutka', 'Ozubené koleso', 'Ložisko', 'Monitor',
    'Klávesnica', 'Ťažké stroje', 'Ťažba', 'Vŕtanie', 'Ťahač',
    'Kompresor', 'Pružina', 'Zubové koleso', 'Sériový port',
    'Ethernet', 'Dátové centrum', 'Antivírus', 'Firewall',
    'Šifrovanie', 'Autentifikácia', 'Robotika', 'Nanotechnológia',
    'Fotovoltaický panel', 'Veterná turbína', 'Akumulátor',
    'Palivový článok', 'Tranzistor', 'Integrovaný obvod',
    'Mikroprocesor', 'Pamäťová bunka', 'Ťažobný stroj',
  ],

  // ─────────── PRÍRODA ───────────
  nature: [
    'Ďateľ', 'Vŕba', 'Jaseň', 'Bôr', 'Kôra', 'Kŕdeľ', 'Vŕtačka',
    'Pŕhľava', 'Ťava', 'Kôza', 'Jeleň', 'Bizón', 'Sýkora', 'Sýček',
    'Mýval', 'Lýkožrút', 'Hlodavec', 'Plch', 'Hmyzožravec',
    'Kopytník', 'Kôrovec', 'Kaňka', 'Tŕnie', 'Vŕšok', 'Hôrka',
    'Mokrad', 'Rašelinisko', 'Vresovište', 'Slanisko', 'Lesostep',
    'Džungla', 'Pôda', 'Ľadovec', 'Snežienka', 'Podbeľ', 'Hľuzovec',
    'Jaskyňa', 'Krasový útvar', 'Stalagmit', 'Stalaktit',
    'Chiropterológia', 'Herpetológia', 'Entomológia', 'Arachnológia',
    'Etológia', 'Ekosozológia', 'Fytocenóza', 'Zoocenóza', 'Biotop',
    'Národný park', 'Prírodná rezervácia', 'Botanická záhrada',
    'Zoopark', 'Vĺča', 'Kaňon', 'Vodná nádrž',
  ],

  // ─────────── KULTÚRA ───────────
  culture: [
    'Kľúč', 'Povesť', 'Óda', 'Stĺp', 'Stĺporadie', 'Maľba', 'Kresba',
    'Výšivka', 'Tkáčstvo', 'Rezbárstvo', 'Rezba', 'Glazúra', 'Fujara',
    'Čitateľ', 'Ľutňa', 'Husľový koncert', 'Ťah smyčcom', 'Dychovka',
    'Ópera', 'Óperná scéna', 'Plátno', 'Paleta', 'Rytina',
    'Serigrafia', 'Koláž', 'Fotomontáž', 'Videoumenie',
    'Digitálne umenie', 'Umelecká fotografia', 'Bibliofília',
    'Ilustrácia', 'Exlibris', 'Typografia', 'Kaligrafia',
    'Paličkovanie', 'Vyšívanie', 'Tkanie', 'Hrniečiarstvo',
    'Kováčstvo', 'Drotárstvo', 'Stolárstvo', 'Modrotlač',
    'Folkloristika', 'Kameň', 'Kameňolom', 'Stĺpik', 'Vôľa',
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// DRUHÁ VLNA ROZŠÍRENIA — ďalšie encyklopedické pojmy podľa tém, aby force
// odkazy v článkoch dávali zmysel v kontexte kategórie.
// ────────────────────────────────────────────────────────────────────────────

export const VOCABULARY_EXPANSION_2: Partial<Record<ArticleCategory, string[]>> = {
  culture: [
    'Ária', 'Klavírny koncert', 'Komorná hudba', 'Komorný orchester',
    'Zborový spev', 'Ľudová pieseň', 'Spevohra', 'Choreograf',
    'Scénografia', 'Kostýmový návrhár', 'Maskér', 'Herecké obsadenie',
    'Hraný film', 'Kreslený film', 'Bábkový film', 'Dokument',
    'Fejtón', 'Eseistika', 'Literárna kritika', 'Literárna história',
    'Svetová literatúra', 'Filmový archív', 'Filmová skladba',
    'Zvuková stopa', 'Pôvodná hudba', 'Titulná pieseň', 'Diskografia',
    'Hudobné vydavateľstvo', 'Nahrávacie štúdio', 'Koncertné turné',
    'Festivalová scéna', 'Sochárske dielo', 'Kamená socha',
    'Drevená plastika', 'Nástenná maľba', 'Ceremoniál', 'Oslavy',
     'Divadelná sezóna', 'Premiéra inscenácie',
     'Repertoárové divadlo', 'Komponista',
    'Textár', 'Interpretácia', 'Muzikológia', 'Hudobná veda',
     'Nápev', 'Zvukový záznam',
  ],
  sport: [
    'Futbalový klub', 'Hokejová liga', 'Tenisový turnaj',
    'Basketbalové družstvo', 'Volejbalová liga', 'Majstrovská trofej',
    'Pohár víťazov', 'Liga majstrov', 'Reprezentačný tím', 'Národný tím',
    'Klubová rivalita', 'Trénerský štáb', 'Rozhodcovská brigáda',
    'Bojový šport', 'Prsný štýl', 'Motýlik', 'Štafetový beh',
    'Viacboj', 'Desaťboj', 'Sedemboj', 'Skok do výšky', 'Skok o žrdi',
    'Hod diskom', 'Pušková streľba', 'Lukostreľba', 'Dostihy',
    'Pretekárska trať', 'Motokárová liga', 'Cyklistický tím',
    'Cestná etapa', 'Stolnotenisová liga', 'Fitness centrum',
    'Kulturistika', 'Silový trojboj', 'Turistika', 'Horolezectvo',
    'Zimná sezóna', 'Tréningový tábor', 
    'Športová hala', 'Stadión', 'Hľadisko', 'Fanúšikovská základňa',
  ],
  science: [
    'Kozmické žiarenie', 'Slnečná sústava', 'Mliečna dráha',
    'Čierna diera', 'Planétka', 'Kométa', 'Meteorit',
    'Laserová technológia', 'Spektrometria', 'Elektrón', 'Pozitrón',
    'Neutrónová hviezda', 'Jadrová reakcia', 'Reťazová reakcia',
    'Polčas rozpadu', 'Rádioaktivita', 'Rentgenové žiarenie',
    'Ultrazvuková diagnostika', 'Magnetická rezonancia',
    'Počítačová tomografia', 'Genetická informácia', 'Bunkové jadro',
    'Chloroplast', 'Enzýmová reakcia', 'Metabolizmus',
    'Imunitný systém', 'Protilátka', 'Vírusová infekcia',
    'Bakteriálna kultúra', 'Kryštálová mriežka', 'Chemická väzba',
    'Iónová väzba', 'Kovalentná väzba', 'Redoxná reakcia',
    'Uhlíkový reťazec', 'Rozpustnosť', 'Teplota topenia',
     'Tlakový rozdiel', 'Rýchlosť svetla',
  ],
  history: [
    'Habsburská monarchia', 'Rakúsko-Uhorsko', 'Prvá republika',
    'Poválečná obnova', 'Nežná revolúcia', 'Stredoveká osada',
    'Feudálne panstvo', 'Uhorská koruna', 'Korunné mesto',
    'Banské mesto', 'Banské právo', 'Horné Uhorsko', 'Mincovňa',
    'Kremnica', 'Banská Štiavnica', 'Zákonník', 'Trnavská univerzita',
    'Esterházyovci', 'Pálfiovci', 'Rákócziho povstanie',  'Kurucké boje', 'Národné obrodenie',
    'Štúrovci', 'Bernolákovci', 'Memorandum národa', 'Matica slovenská',
    'Prvá svetová vojna', 'Povojnové hranice', 'Plebiscit',
  ],
  geography: [
    'Nížina', 'Vrchovina', 'Pahorkatina', 'Rovina', 'Plošina',
    'Svah', 'Breh', 'Zátoka', 'Súostrovie', 'Morský prúd',
    'Príliv', 'Odliv', 'Korálový útes', 'Priekopa',
    'Geomorfologický celok', 'Klimatický pás', 'Zrážky',
    'Priemerná teplota', 'Podnebie', 'Počasie', 'Priehrada',
    'Riečne ústie', 'Sútok', 'Prameň', 'Pritok', 'Povodie',
    'Záliv', 'Mys', 'Pobrežie', 'Sklon', 'Nadmorská výška',
    'Reliéf', 'Geologické obdobie', 'Nerastné bohatstvo',
    'Oblasť', 'Kraj', 'Okres', 'Obec', 'Sídlo',
  ],
  person: [
    'Prezident republiky', 'Predseda vlády', 'Poslanec',
    'Európsky komisár', 'Veliteľ', 'Generál', 'Kapitán',
    'Profesor', 'Docent', 'Rektor', 'Prodekan', 'Nobelista',
    'Laureát ceny', 'Absolvent', 'Zakladateľ', 'Prieskumník',
    'Cestovateľ', 'Kartograf', 'Učiteľ', 'Kňaz',
    'Organista', 'Kantor', 'Notár', 'Lekár', 'Lekárnik',
     'Banský inžinier', 'Hutník', 'Majster',
    'Podnikateľ', 'Zberateľ', 'Mecenáš', 'Architekt',
  ],
  technology: [
    'Operačný systém', 'Súborový systém', 'Webový prehliadač',
    'Databázový server', 'Cloudové úložisko', 'Zálohovanie',
    'Obnova dát', 'Kódovacia tabuľka', 'Programovací jazyk',
    'Kompilátor', 'Ladiaci nástroj', 'Verzovací systém',
    'Používateľské rozhranie', 'Dotyková obrazovka',
    'Bezdrôtové nabíjanie', 'Rýchlonabíjanie', 'Lítiový akumulátor',
    'Slnečný kolektor', 'Tepelné čerpadlo', 'Recyklačná linka',
    'Výrobná linka', 'Automatizovaná výroba', 'Kvalitná kontrola',
     'Obrábací stroj', 'Zváracia technika',
    'Merací prístroj', 'Kalibrácia', 'Technická normalizácia',
    'Patentová prihláška', 'Inovačný projekt', 'Prototyp',
  ],
  nature: [
    'Rašelinné jazero', 'Bukový les', 'Dubový porast',
    'Ihličnatý les', 'Listnatý les', 'Lesný porast',
    'Bylinný koberec', 'Leknín', 'Ovocný sad', 'Vinica', 'Vinič',
    'Olivový háj', 'Palma', 'Kaktus', 'Sukulent', 'Mach',
    'Papraď', 'Kapradina', 'Lišajník', 'Huba', 'Lucerna',
    'Repka', 'Kukurica', 'Raž', 'Jačmeň', 'Ovos', 'Proso',
    'Včelí úľ',   'Včelár', 'Sad',
    'Záhrada', 'Skleník', 'Pestovanie', 'Zber úrody',
  ],
  general: [
    'Ocenenie', 'Nariadenie', 'Smernica', 'Ústava',
    'Zákonodarný zbor', 'Voľby', 'Volebné právo', 'Sčítanie ľudu',
    'Demografický vývoj', 'Miera nezamestnanosti',
    'Hrubý domáci produkt', 'Menový kurz', 'Centrálna banka',
    'Občiansky zákon', 'Trestný zákon', 'Súdna moc',
    'Výkonná moc', 'Medzinárodné vzťahy', 'Diplomatické styky',
    'Zmluva', 'Dohoda', 'Aliancia', 'Mierová dohoda',
     'Rokovanie', 'Summit', 'Vrcholné stretnutie',
     'Oslava výročia', 'Pamätný deň',
    'Štátny sviatok', 'Národný symbol', 'Vlajka', 'Erb',
    'Hymna', 'Znak', 'Pečať', 'Menová jednotka', 'Rozpočet',
  ],
};
