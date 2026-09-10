// Encyklopedická databáza - slovná zásoba kategorizovaná podľa tém
// Cieľ: aby slová v článkoch dávali zmysel v kontexte (napr. v článku o gitare
// sa objavia pojmy z hudby, nie "Oceán")

import {
  VOCABULARY_EXPANSION,
  VOCABULARY_EXPANSION_2,
} from './vocabulary-expansion';

export type ArticleCategory =
  | 'sport'
  | 'science'
  | 'history'
  | 'geography'
  | 'person'
  | 'culture'
  | 'technology'
  | 'nature'
  | 'general';

// ────────────────────────────────────────────────────────────────────────────
// DETEKCIA KATEGÓRIE PODĽA NÁZVU ČLÁNKU
// ────────────────────────────────────────────────────────────────────────────

export function detectCategory(title: string): ArticleCategory {
  const t = title.toLowerCase();

  // Hudba a kultúra (vrátane nástrojov ako gitara)
  if (
    /gitar|husl|klavír|piano|harmonik|bubon|flaut|trumpet|saxofón|violončel|kontrabas|akordeón|bendžo|mandolín|cimbal|orchester|kapela|spevák|spevák|skladateľ|hudobník|skladba|symfón|opera|operet|balet|koncert|festival|album|pieseň|melódi|akord|noty|stupnic|hudba|hudobn|jazz|rock|blues|folklór|tanec|tanečn|divadl|herec|herečk|réžia|režisér|film|kino|román|báseň|básnik|spisovateľ|literatúr|umen|maliarst|sochár|maliar|sochár|galéri|múzeum|výstav|architektúr|baroko|renesanc|gotik|romantizm|impresion/i.test(
      t,
    )
  )
    return 'culture';

  // Šport
  if (
    /futbal|hokej|tenis|basket|volejbal|atletik|plávan|lyžov|cykl|gymnast|šach|olymp|maratón|box|hádzaná|rugby|golf|formul|biatlon|curling|snowboard|surf|džudo|karate|zápas|vzpier|bedminton|squash|triatlon|liga|pohár|turnaj|gól|hráč|tím|klub|šport|jazdec|brankár|útočník|obranca|tréner|štadión|aréna|ihrisko/i.test(
      t,
    )
  )
    return 'sport';

  // Veda
  if (
    /fyzik|chémi|biológ|matemat|astronóm|medicín|genet|evolúc|atom|molekul|bunk|dna|enzým|proteín|elektr|magnet|gravit|kvant|teóri|výskum|vedec|objav|vzorec|reakc|prvok|laboratóri|experiment|hypotéz/i.test(
      t,
    )
  )
    return 'science';

  // História
  if (
    /vojn|revolúc|ríš|kráľ|cisár|dynast|stredovek|renesan|osviet|antik|gréc|rím|egypt|histor|storoč|bitk|zmluv|konflikt|kolón|impéri|monarch|povstan|partizán|reformác|križiack|napoleon|hitler|stalin/i.test(
      t,
    )
  )
    return 'history';

  // Geografia
  if (
    /mest|krajin|štát|kontinent|oceán|mor|riek|jazer|hor|pohor|údol|ostrov|púšť|prales|klím|počas|hlavné mest|populác|rozloh|hranic|región|sopka|vodopád|polostrov|nížin|kotlin/i.test(
      t,
    )
  )
    return 'geography';

  // Osoby
  if (
    /narodil|zomrel|prezident|premiér|minister|umelec|spisovatel|básnik|skladatel|režisér|herec|vedec|vynálezca|filozof|politik|panovník|kráľovn|svätý|svätá/i.test(
      t,
    )
  )
    return 'person';

  // Technológia
  if (
    /počítač|internet|softvér|hardvér|programov|algoritm|databáz|sieť|server|aplikác|robot|stroj|motor|energ|technológ|inováci|patent|vynález|elektronik|smartfón|tablet|webov/i.test(
      t,
    )
  )
    return 'technology';

  // Príroda
  if (
    /zviera|rastlin|strom|kvet|hmyz|vták|ryb|cicav|plaz|ekosystém|biotop|les|lúk|biodiverzit|druh|rod|rastlina|živočích|fauna|flór/i.test(
      t,
    )
  )
    return 'nature';

  return 'general';
}

// ────────────────────────────────────────────────────────────────────────────
// SLOVNÁ ZÁSOBA PODĽA KATEGÓRIE
// Každá kategória obsahuje len pojmy, ktoré tematicky patria do danej oblasti.
// Takto sa v článku o gitare neobjaví slovo "Oceán" — namiesto toho sa
// uprednostnia hudobné pojmy ako "Akord", "Bubon", "Cembalo" atď.
// ────────────────────────────────────────────────────────────────────────────

const VOCABULARY_BY_CATEGORY: Record<ArticleCategory, string[]> = {
  // ─────────── KULTÚRA, UMENIE, HUDBA ───────────
  culture: [
    "Abstrakcionizmus", "Absurdné divadlo", "Akademik", "Akčný film", "Akord", "Akordeón",
    "Akvarel", "Alterácia", "Ambient", "Anglický roh", "Animácia", "Animovaný film",
    "Architekt", "Architektúra", "Ária", "Art deco", "Art nouveau", "Art rock", "Azulejo",
    "Bábkové divadlo", "Balada", "Balalajka", "Balet", "Baroko", "Bas", "Basgitara", "Básnik",
    "Basová gitara", "Beat", "Bebop", "Bel canto", "Beletria", "Bendžo", "Bibliofília",
    "Bicie", "Biedermeier", "Big beat", "Biograf", "Blues", "Bollywood", "Bronz", "Bubon",
    "Busta", "Buzuki", "Cantus firmus", "Cimbal", "Coda", "Country", "Crescendo", "Cyklus",
    "Čelesta", "Čelo", "Činohra", "Čitateľ", "Dabér", "Dadaizmus", "Dance", "Darbuka",
    "Death metal", "Deep house", "Dekadencia", "Difuzionizmus", "Digitálne umenie", "Disco",
    "Diskografia", "Diskotéka", "Disonancia", "Divadelná sezóna", "Djembe", "Dodekafónia",
    "Dokument", "Dokumentárny film", "Dominanta", "Doo-wop", "Dráma", "Dramaturg", "Dream pop",
    "Dripping", "Drotárstvo", "Drum and bass", "Drumbľa", "Dub", "Dychovka", "Dychový nástroj",
    "Dynamika", "Electro", "Elektrická gitara", "Elektronika", "Email", "Emo", "Epos", "Esej",
    "Estetika", "Etuda", "Exlibris", "Expresionizmus", "Fagot", "Fantasy", "Fauvizmus",
    "Fejtón", "Fermata", "Film", "Filmová hudba", "Filmový festival", "Flamenco", "Flauta",
    "Folk rock", "Folklór", "Folkloristika", "Fotomontáž", "Freska", "Fúga", "Fujara", "Funk",
    "Futurizmus", "Galéria", "Garage rock", "Gesto", "Gitara", "Glam rock", "Glazúra", "Gong",
    "Gospel", "Gothic", "Gotika", "Graffiti", "Grafika", "Grisaille", "Groteska", "Grunge",
    "Happening", "Hard rock", "Hardcore", "Harfa", "Harmónia", "Harmonika", "Heavy metal",
    "Heligónka", "Herec", "Herečka", "Hip hop", "Hlas", "Hoboj", "Hollywood", "Horor", "House",
    "Hudobná veda", "Hudobné vydavateľstvo", "Husle", "Husľový koncert", "Hymna",
    "Chromatická stupnica", "Ikona", "Iluminácia", "Ilustrácia", "Impresionizmus", "Indie",
    "Industrial", "Inscenácia", "Interiérový dizajn", "Interpret", "Interpretácia",
    "Intonácia", "Javisko", "Jazz", "Jazz fusion", "Jugendstil", "K-pop", "Kabaret",
    "Kadencia", "Kaligrafia", "Kamej", "Kameň", "Kameňolom", "Kánon", "Kantáta", "Kanun",
    "Kapela", "Karikatúra", "Karneval", "Kastanety", "Keramika", "Kinematografia",
    "Kinetické umenie", "Kino", "Klarinet", "Klaster", "Klavír", "Klavirista",
    "Klavírny koncert", "Kľúč", "Knižnica", "Komédia", "Komorná hudba", "Komponista",
    "Kompozícia", "Konceptuálne umenie", "Koncert", "Koncertina", "Kontrabas", "Kontrapunkt",
    "Kováčstvo", "Krátkometrážny film", "Krautrock", "Kresba", "Krídlovka", "Latino",
    "Lesný roh", "Libreto", "Literárna história", "Literárna kritika", "Litografia",
    "Ľudová pieseň", "Lutna", "Lýra", "Madrigal", "Maľba", "Mandolína", "Manierizmus",
    "Meditácia", "Melódia", "Melodika", "Melodráma", "Metal", "Metalcore", "Metrum", "Mimika",
    "Minimal", "Minimalizmus", "Mobil", "Modelovanie", "Modrotlač", "Modulácia", "Monodráma",
    "Monológ", "Motív", "Mozaika", "Mušle", "Muzikál", "Muzikológia", "Nahrávacie štúdio",
    "Nástenná maľba", "Naturalizmus", "Návrh", "Neobarok", "Neoklasicizmus", "New wave",
    "Nokturno", "Nota", "Notácia", "Notopis", "Nu jazz", "Nu metal", "Óda", "Okarína",
    "Oldies", "Op art", "Opera", "Opereta", "Organ", "Orchester", "Ornament", "Osvetlenie",
    "Paleta", "Partitúra", "Pentatonika", "Perkusie", "Pieseň", "Pikola", "Píšťala",
    "Pizzicato", "Polka", "Pop", "Pop art", "Porcelán", "Post-punk", "Post-rock", "Postava",
    "Postimpresionizmus", "Postmodernizmus", "Povesť", "Power metal", "Pozauna", "Predohra",
    "Produkcia", "Progressive rock", "Projekcia", "Punk", "R&B", "Ragtime", "Rap", "Rave",
    "Recitatív", "Refrén", "Reggae", "Rekviem", "Reliéf", "Rezbárstvo", "Road movie", "Rock",
    "Rockabilly", "Rokoko", "Romantická škola", "Romantizmus", "Rytina", "Rytmus", "Salsa",
    "Satira", "Saxofón", "Scénografia", "Sci-fi", "Secesia", "Seriál", "Sfumato", "Sitkom",
    "Ska", "Skica", "Skladateľ", "Skladba", "Sláčik", "Soft rock", "Sochárske dielo",
    "Sochárstvo", "Sólo", "Sonáta", "Sopranistka", "Soul", "Southern rock", "Space rock",
    "Speed metal", "Spev", "Spinet", "Stĺp", "Stoner rock", "Strihač", "Struna", "Stupnica",
    "Subdominanta", "Svetová literatúra", "Swing", "Symfónia", "Symphonic metal", "Synkopa",
    "Synth-pop", "Šalmaj", "Štúdia", "Štuka", "Tabla", "Takt", "Tamburína", "Tango",
    "Tašizmus", "Techno", "Telenovela", "Tempera", "Tempo", "Textár", "Thrash metal",
    "Thriller", "Titulky", "Toccata", "Tón", "Tónina", "Tragédia", "Trailer", "Trance",
    "Transpozícia", "Triangel", "Trilógia", "Trio", "Trip hop", "Trombón", "Trúchlohra",
    "Tuba", "Typografia", "UK garage", "Ukulele", "Umelec", "Valčík", "Variácia", "Varieté",
    "Veduta", "Verš", "Veselohra", "Vibrato", "Viola", "Violončelo", "Virtuóz", "Vitráž",
    "Vizuálne efekty", "Vokál", "Vôľa", "Výstava", "Vyšívanie", "Výšivka", "Western",
    "World music", "Xylofón", "Záber", "Zbierka", "Zborník", "Zurna", "Zvonkohra", "Zvukár",
    "Žáner",
  ],

  // ─────────── ŠPORT ───────────
  sport: [
    "Aerobik", "Aikido", "Akadémia", "Alpské lyžovanie", "Amatér", "Americký futbal", "Atlét",
    "Atletika", "Backhand", "Badminton", "Baseball", "Basketbal", "Bazén", "Bedminton", "Beh",
    "Beh na lyžiach", "Bekhend", "Bežec", "Bežecké lyžovanie", "Biatlon", "Biatlonista",
    "Bicykel", "BMX", "Boby", "Bod", "Bojovník", "Bowling", "Box", "Boxer", "Brankár",
    "Breakdance", "Brejk", "Capoeira", "Cieľ", "Curling", "Cyklista", "Cyklistická dráha",
    "Cyklistika", "Čas", "Debut", "Defenzíva", "Derby", "Desaťboj", "Deuce", "Disciplína",
    "Dĺžka", "Doping", "Dostihy", "Dráha", "Drajv", "Džudo", "Efekt", "Fair play", "Faul",
    "Fáza", "Fitness", "Florbal", "Forehand", "Forhend", "Forma", "Formácia", "Futbal",
    "Futbalista", "Futbalový klub", "Futsal", "Geocaching", "Gól", "Golf", "Grand Slam",
    "Gymnastika", "Hádzaná", "Hala", "Halový futbal", "Handicap", "Hetrik", "Hľadisko",
    "Hod diskom", "Hod kladivom", "Hod oštepom", "Hokej", "Hokejbal", "Hokejista",
    "Horolezectvo", "Horská dráha", "Hráč", "Ihrisko", "Inline hokej", "Jachtár", "Jachting",
    "Jazdec", "Jazdecké sedlo", "Jazdectvo", "Jiu-jitsu", "Joga", "K.O.", "Kajak", "Kanoe",
    "Kanoistika", "Kapitán", "Karabína", "Karate", "Karta", "Kickbox", "Kickboxer", "Kontrakt",
    "Kop", "Korčuľovanie", "Krasokorčuľovanie", "Kriket", "Kruh", "Kulturistika", "Kúpalisko",
    "Lakros", "Lano", "Liga", "Liga majstrov", "Lopta", "Lukostreľba", "Lyže", "Lyžovanie",
    "Maratón", "Maratónsky beh", "Medaila", "Motokros", "Motýlik", "Ofsajd", "Okruh",
    "Olympiáda", "Olympijský štadión", "Oštep", "Padák", "Palica", "Pás", "Penalta", "Pilát",
    "Plávanie", "Plavec", "Play-off", "Plutvy", "Podanie", "Pohár", "Pohyb", "Pointa",
    "Postup", "Potápačská maska", "Potápanie", "Pozemný hokej", "Predĺženie", "Prekážka",
    "Pretekársky okruh", "Profesionál", "Puk", "Raketa", "Remíza", "Reprezentácia", "Rozhodca",
    "Rugby", "Sála", "Sedemboj", "Séria", "Skok do diaľky", "Skok do výšky", "Skok o žrdi",
    "Skokan", "Skoky", "Slalom", "Smeč", "Snowboard", "Snowboarding", "Softball", "Squash",
    "Stolný tenis", "Stratégia", "Streľba", "Strelec", "Súper", "Surfovanie", "Súťaž", "Šach",
    "Šachista", "Šachovnica", "Šerm", "Šípky", "Štadión", "Taekwondo", "Taktika", "Tanečnica",
    "Tanečný šport", "Technika", "Tenis", "Tenisová raketa", "Tenista", "Thaibox",
    "Tchoukball", "Tím", "Tréner", "Tréning", "Triatlon", "Trofej", "Trojskok", "Turistika",
    "Turnaj", "Tyč", "UEFA", "Veľká cena", "Veslovanie", "Vesta", "Vodná nádrž", "Vodné pólo",
    "Vodný pólista", "Vodný slalom", "Volej", "Volejbal", "Vrh guľou", "Výber", "Vylúčenie",
    "Vyrovnanie", "Výsledok", "Vzpieranie", "Windsurfing", "Winner", "Wrestling", "Záloha",
    "Zápas", "Zápasenie", "Závod", "Zjazdové lyžovanie", "Zorbovanie", "Žltá karta",
  ],

  // ─────────── VEDA ───────────
  science: [
    "Absorpcia", "Abstrakt", "Adhézia", "Aerodynamika", "Aeronómia", "Aerosól", "Afinita",
    "Agregát", "Agrochémia", "Akarológia", "Akustika", "Aldehyd", "Alergiológia", "Algebra",
    "Algológia", "Algoritmus", "Alchýmia", "Alkaloid", "Alotropia", "Alternatíva",
    "Aminokyselina", "Ampér", "Amplitúda", "Anabolizmus", "Analógia", "Analytická chémia",
    "Analýza", "Anatómia", "Andrológia", "Angiológia", "Antibiotiká", "Antigén", "Antihmota",
    "Antimón", "Antioxidant", "Antropológia", "Apatit", "Aplikovaná matematika", "Aproximácia",
    "Arachnológia", "Archeológia", "Aritmetika", "Arzén", "Astrobiológia", "Astrofyzika",
    "Astrochémia", "Astronómia", "Atóm", "ATP", "Auróra", "Automatizácia", "Axióma",
    "Axiomatický systém", "Axón", "Baktéria", "Bakteriofág", "Bakteriológia", "Balneológia",
    "Baryt", "Báza", "Benzén", "Bielkovina", "Binárny systém", "Bioetika", "Biofyzika",
    "Biochémia", "Bioinformatika", "Biológia", "Bioluminiscencia", "Biomarker", "Biomasa",
    "Biosféra", "Biotechnológia", "Biotit", "Bizmut", "Bootstrap", "Bór", "Botanika", "Bromid",
    "Bunka", "Bunkové jadro", "Cementácia", "Citácia", "Cytológia", "Čierna diera",
    "Definícia", "Dendrochronológia", "Dermatológia", "Determinizmus", "Dietológia",
    "Difrakcia", "Dôkaz", "Dynamika", "Efekt", "Egyptológia", "Ekológia", "Elektrón",
    "Elektronika", "Elektrotechnika", "Embryológia", "Endokrinológia", "Endoskopia", "Energia",
    "Entomológia", "Entropia", "Enzým", "Enzymológia", "Epicentrum", "Epidemiológia",
    "Ergonómia", "Ester", "Etanol", "Etén", "Éter", "Etológia", "Excitácia", "Experiment",
    "Extrémofil", "Falzifikácia", "Faradayov zákon", "Farmakológia", "Femto", "Fenológia",
    "Fenotyp", "Fermentácia", "Fermión", "Fermium", "Filtrácia", "Fixácia", "Fluór",
    "Fluorescencia", "Formulácia", "Fosfor", "Fosforescencia", "Fosforylácia", "Fotochémia",
    "Fotón", "Fotosyntéza", "Frakcia", "Frekvencia", "Frenológia", "Fytopatológia", "Fyzika",
    "Fyziológia", "Galaktóza", "Galaxia", "Gama žiarenie", "Gastroenterológia", "Gejzír",
    "Gén", "Genetická informácia", "Genetický kód", "Genetika", "Genotyp", "Geodézia",
    "Geofyzika", "Geografia", "Geológia", "Geomorfológia", "Geotermálna energia", "Geriatria",
    "Glaciológia", "Glukóza", "Glutamát", "Glutén", "Glycerín", "Golgiho aparát", "Grafén",
    "Grafit", "Grafológia", "Gravitácia", "Gravitón", "Guanín", "Halogén", "Heliosféra",
    "Hélium", "Hematológia", "Hemoglobín", "Herpetológia", "Heuristika", "Hexagón", "Histamín",
    "Histológia", "Histón", "Hmota", "Homeopatia", "Horčík", "Hormón", "Humus", "Hviezda",
    "Hybrid", "Hydraulika", "Hydrid", "Hydrológia", "Hydroxid", "Hygiena", "Hypertrofia",
    "Hypnóza", "Hypotéza", "Chémia", "Chemická väzba", "Chloroplast", "Identifikácia",
    "Ichtyológia", "Impact factor", "Imunitný systém", "Imunológia", "In vitro", "In vivo",
    "Inferencia", "Informatika", "Infračervené žiarenie", "Interpretácia", "Inverzia",
    "Inžinierstvo", "Ionosféra", "Iónová väzba", "Izolácia", "Izotop", "Jadro",
    "Jadrová fyzika", "Jadrová reakcia", "Jazykoveda", "Kalibrácia", "Kardiológia",
    "Katalyzátor", "Kauzalita", "Klasifikácia", "Klimatológia", "Koeficient", "Koincidencia",
    "Kométa", "Konštanta", "Konvergencia", "Korelácia", "Kovalentná väzba",
    "Kozmické žiarenie", "Kozmológia", "Kozmos", "Kriminalistika", "Kryptografia", "Kryštál",
    "Kryštalografia", "Kurva", "Kvalitatívny výskum", "Kvant", "Kvantová fyzika",
    "Kvantová chémia", "Kvantová mechanika", "Kvark", "Kybernetika", "Laboratórium", "Ľadovec",
    "Limita", "Limnológia", "Lineárna závislosť", "Lingvistika", "Logika",
    "Magnetická rezonancia", "Magnetizmus", "Malakológia", "Matematická analýza", "Medicína",
    "Mechanika", "Meióza", "Meranie", "Metabolizmus", "Metalurgia", "Metanol", "Meteorit",
    "Meteorológia", "Metóda", "Metodológia", "Metrológia", "Mikrobiológia", "Mikroelektronika",
    "Mikroskop", "Minerál", "Mineralógia", "Mitochondria", "Mitóza", "Mliečna dráha", "Model",
    "Modus", "Molekula", "Molekulárna biológia", "Morfológia", "Mutácia", "Mykológia",
    "Nanotechnológia", "Nefrológia", "Neurofyziológia", "Neurochirurgia", "Neurológia",
    "Neutrino", "Neutrón", "Neutrónová hviezda", "Normalizácia", "Nukleárna medicína",
    "Nukleotid", "Objav", "Observácia", "Oceánografia", "Oftalmológia", "Onkológia",
    "Ontológia", "Operačný výskum", "Optika", "Optimalizácia", "Orbita", "Orbitál", "Organela",
    "Organická chémia", "Ornitológia", "Osmóza", "Otorinolaryngológia", "Oxid uhličitý",
    "Oxidácia", "Ozón", "Paleontológia", "Paradigma", "Parameter", "Parazitológia", "Patent",
    "Patológia", "Pediatria", "Pedológia", "Peer review", "Permutácia", "Petrológia",
    "Planétka", "Plazma", "Pneumológia", "Počítačová tomografia", "Pokus", "Polčas rozpadu",
    "Politológia", "Polymér", "Potvrdenie", "Pozitrón", "Pozorovanie", "Pravdepodobnosť",
    "Pravidlo", "Predikcia", "Premenná", "Presnosť", "Primatológia", "Princíp", "Prístroj",
    "Prognóza", "Protilátka", "Protokol", "Protón", "Psychiatria", "Psychoanalýza",
    "Psychológia", "Psychoterapia", "Radiácia", "Rádioaktivita", "Rádiológia", "Reakcia",
    "Receptor", "Redoxná reakcia", "Referencia", "Reťazová reakcia", "Reumatológia",
    "Robotika", "Rozpustnosť", "Roztok", "Rýchlosť svetla", "Sedimentológia", "Seizmológia",
    "Selenológia", "Sémantika", "Senzitivita", "Simulácia", "Slnečná sústava", "Slnko",
    "Sociológia", "Spektrometer", "Spektroskopia", "Spektrum", "Speleológia", "Stereochémia",
    "Strojárstvo", "Sublimácia", "Súbor dát", "Substancia", "Supernova", "Sústava",
    "Systematika", "Štandardná odchýlka", "Štatistika", "Štruktúra", "Tautológia", "Taxonómia",
    "Taxonomická jednotka", "Tektonika", "Teleskop", "Temná hmota", "Teoretická fyzika",
    "Teória", "Teplota topenia", "Termodynamika", "Tkanivo", "Topológia", "Toxikológia",
    "Toxín", "Transkripcia", "Traumatológia", "Trend", "Tribológia", "Trigonometria",
    "Typológia", "Údaje", "Ultrafialové žiarenie", "Ultrasonografia", "Urán", "Urbanizmus",
    "Validita", "Variabilita", "Variancia", "Vedec", "Vedný odbor", "Veličina", "Venerológia",
    "Verifikácia", "Veterinárstvo", "Virológia", "Vírusová infekcia", "Vlastnosť", "Vlnenie",
    "Vodík", "Vulkanológia", "Výpočet", "Výsledok", "Vzorec", "Xenobiológia", "Zákon",
    "Závislosť", "Zliatina", "Zložka", "Zlúčenina", "Zoológia",
  ],

  // ─────────── HISTÓRIA ───────────
  history: [
    "Abolícia", "Absolutizmus", "Admirál", "Akreditácia", "Americká občianska vojna",
    "Americká revolúcia", "Amnestia", "Anarchia", "Anexia", "Anglická občianska vojna",
    "Antika", "Antisemitizmus", "Arcibiskup", "Arcivojvoda", "Archaické obdobie", "Archivácia",
    "Aristokracia", "Armáda", "Asýria", "Austerlitz", "Autonómia", "Avarský kaganát",
    "Babylonia", "Babylonské zajatie", "Banát", "Banská Štiavnica", "Barok", "Barón",
    "Belle Époque", "Benediktín", "Bernolákovci", "Biedermeier", "Biskup", "Bitka",
    "Bitka o Britániu", "Bitka o Stalingrad", "Bitka pri Kursku", "Bitka pri Termopylách",
    "Bitka pri Waterloo", "Boj", "Bronzová doba", "Burgundi", "Buržoázia", "Byzancia",
    "Byzantská ríša", "Cár", "Cech", "Celibát", "Cisár", "Cisárovná", "Cisterciáni",
    "Civilizácia", "Cyrilo-metodská misia", "Čínska občianska vojna", "Daň", "Dekrét",
    "Demokracia", "Despotizmus", "Diktátor", "Diskriminácia", "Dlh", "Doba kamenná",
    "Doba železná", "Doktrína", "Dominikán", "Dóža", "Dŕžava", "Edikt", "Emancipácia", "Emir",
    "Encyklika", "Esterházyovci", "Etnická skupina", "Exarcha", "Exil", "Exkomunikácia",
    "Expanzia", "Faraón", "Federácia", "Feudál", "Feudalizmus", "Filozofia",
    "Francúzska revolúcia", "Františkán", "Fraška", "Genealógia", "Generál", "Genocída",
    "Ghetto", "Gilda", "Gotika", "Graf", "Grécko-perzské vojny", "Gróf", "Grófstvo",
    "Gubernia", "Guvernér", "Habsburská monarchia", "Hanza", "Heraldika", "Hierarchia",
    "Historické obdobie", "Historiografia", "Hladomor", "Holandská republika", "Holokaust",
    "Horné Uhorsko", "Hospodárstvo", "Hradisko", "Humanizmus", "Husitské vojny", "Chán",
    "Ideológia", "Imperátor", "Imperializmus", "Industrializácia", "Inkovia", "Inkvizícia",
    "Interdikt", "Izolacionizmus", "Janičiar", "Jezuita", "Juhoslovanské kráľovstvo",
    "Jurisdikcia", "Kalif", "Kapitalizmus", "Kardinál", "Kartágo", "Kastília", "Kaštieľ",
    "Kazateľ", "Klasicizmus", "Klerikalizmus", "Kňaz", "Kňažná", "Knieža", "Kódex",
    "Kolonializmus", "Kolonizácia", "Koncentračný tábor", "Konfederácia", "Konkordát",
    "Konzul", "Kórejská vojna", "Kozmopolitizmus", "Kráľ", "Kráľovná", "Kremnica",
    "Križiacka výprava", "Kronika", "Krymská vojna", "Kubánska revolúcia",
    "Kultúrna revolúcia", "Kultúrne dedičstvo", "Kúria", "Kuruc", "Latinské cisárstvo",
    "Legát", "Legenda", "Liberalizmus", "Longobardi", "Lužická kultúra", "Macedónia", "Magnát",
    "Maharadža", "Major", "Majster", "Markíz", "Maršal", "Martinská deklarácia", "Marxizmus",
    "Matica slovenská", "Medzivojnové obdobie", "Mezolit", "Migrácia", "Militarizmus",
    "Mincovňa", "Minister", "Misia", "Moderna", "Monarcha", "Morálka", "Moravské kniežatstvo",
    "Mykénska civilizácia", "Mýtus", "Nacionalizmus", "Nacizmus", "Nádvorník",
    "Napoleonské vojny", "Nárečie", "Národné obrodenie", "Navarra", "Neolit", "Neutralita",
    "Nežná revolúcia", "Nomenklatúra", "Novoasýrska ríša", "Novovek", "Nuncius",
    "Občianska spoločnosť", "Občianstvo", "Obliehanie", "Obrat", "Odboj",
    "Októbrová revolúcia", "Okupácia", "Olmékovia", "Opozícia", "Ordo", "Ostrogóti",
    "Osvietenstvo", "Otroctvo", "Pakt", "Palatín", "Paleolit", "Pálfiovci", "Panovník",
    "Panstvo", "Pápež", "Pápežstvo", "Parlament", "Partská ríša", "Pascha", "Patriotizmus",
    "Patrón", "Peer", "Peloponézska vojna", "Piaristi", "Plebiscit", "Plukovník", "Počet",
    "Poddanstvo", "Poddaný", "Pohan", "Politická strana", "Politika", "Poľské kráľovstvo",
    "Portugalské kráľovstvo", "Poručík", "Posvätnosť", "Povstanie", "Pravek", "Právo", "Prax",
    "Premiér", "Premonštráti", "Prevrat", "Prezident", "Princ", "Princezná", "Proletariát",
    "Propaganda", "Protektorát", "Protireformácia", "Pruské kráľovstvo", "Prvá republika",
    "Prvá svetová vojna", "Purkrabí", "Rabbi", "Rakúsko-Uhorsko", "Reconquista", "Reformácia",
    "Regent", "Republika", "Revolúcia", "Rex", "Rímska republika", "Rímsko-nemecká ríša",
    "Romantizmus", "Ruská revolúcia", "Ruské cárstvo", "Rusko-japonská vojna",
    "Sardínske kráľovstvo", "Secesia", "Seleukovská ríša", "Senát", "Schizma", "Scholastika",
    "Sicílske kráľovstvo", "Sila", "Sionizmus", "Spartakovo povstanie", "Staroslovienčina",
    "Starovek", "Storočie", "Storočná vojna", "Stredovek", "Studená vojna", "Sultán",
    "Svätá ríša rímska", "Svetová vojna", "Šerif", "Šľachtic", "Špión", "Štôlňa", "Študent",
    "Štúrovci", "Štvrtá krížová výprava", "Temné obdobie", "Totalizmus", "Tradícia",
    "Tretia ríša", "Trianonská zmluva", "Tridsaťročná vojna", "Trnavská univerzita",
    "Tŕňová koruna", "Trójska vojna", "Trubadúr", "Uhorská koruna", "Uhorské kráľovstvo",
    "Únia", "Útok", "Vandali", "Veľká francúzska revolúcia", "Veľká Morava",
    "Veľkomoravská ríša", "Veľmož", "Veľvyslanec", "Vestfálsky mier", "Viedenský kongres",
    "Vikár", "Víťaz", "Vladár", "Vojna", "Vojna v Indočíne", "Vojna vo Vietname", "Vojvoda",
    "Vojvodca", "Vojvodkyňa", "Vojvodstvo", "Východorímska ríša", "Waterloo", "Zákonník",
    "Západorímska ríša", "Zjednotenie Nemecka", "Zlatá bula", "Zmluva", "Želiar", "Župa",
    "Župan",
  ],

  // ─────────── GEOGRAFIA ───────────
  geography: [
    "Aconcagua", "Afganistan", "Afrika", "Albánsko", "Alpy", "Alžírsko", "Amazónia",
    "Amazonka", "Amerika", "Amsterdam", "Andorra", "Andy", "Anglicko", "Angola", "Antarktída",
    "Antigua a Barbuda", "Apeniny", "Appalachian Mountains", "Arabský polostrov", "Argentína",
    "Arktída", "Arménsko", "Atény", "Atika", "Atlantik", "Atol", "Austrália", "Azerbajdžan",
    "Ázia", "Azorské ostrovy", "Bagdad", "Bahamy", "Bahrajn", "Balaton", "Balkán",
    "Baltské more", "Bangladéš", "Barbados", "Barcelona", "Barentsovo more", "Bavorsko",
    "Bazalt", "Belehrad", "Belgicko", "Belianske Tatry", "Belize", "Benelux", "Benin",
    "Berlín", "Bhután", "Bielorusko", "Bodamské jazero", "Bolívia", "Bombaj", "Borneo",
    "Bosna", "Botswana", "Bralo", "Bratislava", "Brazília", "Breh", "Bretónsko",
    "Britské ostrovy", "Brunei", "Brusel", "Budapešť", "Bukurešť", "Bulharsko", "Burgenland",
    "Búrka", "Burkina Faso", "Burundi", "Byzantium", "Cieľ", "Colorado", "Cyprus", "Čad",
    "Česko", "Čierna diera", "Čierna Hora", "Čierne more", "Čierny les", "Čile", "Čína",
    "Dalmácia", "Damask", "Dánsko", "Dardanely", "Dažďový prales", "Delta", "Detroit",
    "Dolina", "Dolné Rakúsko", "Dolné Sliezsko", "Dominika", "Dominikánska republika",
    "Dordogne", "Dubaj", "Dublin", "Duna", "Dunaj", "Durínsko", "Düsseldorf", "Džibutsko",
    "Edinburgh", "Edmonton", "Ekosystém", "Ekvádor", "Eritrea", "Erózia", "Estónsko",
    "Etiópia", "Etna", "Eufrat", "Európa", "Everest", "Faerské ostrovy", "Fidži", "Filipíny",
    "Fínsko", "Fjord", "Flámsko", "Florencia", "Francúzsko", "Frankfurt", "Frízsko", "Fukuoka",
    "Gabun", "Galapágy", "Galícia", "Gambia", "Ganga", "Gdaňsk", "Gejzír", "Gemer",
    "Geomorfologický celok", "Ghana", "Gibraltár", "Gobi", "Göteborg", "Graben",
    "Grand Canyon", "Grécko", "Grenada", "Grónske more", "Grónsko", "Gruzínsko", "Guangzhou",
    "Guatemala", "Guatemala City", "Guinea", "Guinea-Bissau", "Guyana", "Haifa", "Haiti",
    "Halifax", "Hamburg", "Havaj", "Havajské ostrovy", "Havana", "Helgoland", "Helsinki",
    "Hesensko", "Himaláje", "Hirošima", "Ho Či Minovo Mesto", "Holandsko", "Honduras",
    "Hongkong", "Hont", "Hora", "Horehronie", "Horná hranica lesa", "Horné Rakúsko", "Houston",
    "Hrebeň", "Hudson", "Charkov", "Chorvátsko", "Chrbát", "Christchurch", "Ibéria", "Iguaçu",
    "India", "Indický oceán", "Indočína", "Indonézia", "Innsbruck", "Irak", "Irán", "Írsko",
    "Irtyš", "Islamabad", "Island", "Istanbul", "Izmir", "Izrael", "Jadran", "Jakarta",
    "Jamajka", "Japonsko", "Jaskyňa", "Java", "Jazero", "Jemen", "Jerevan", "Johannesburg",
    "Jordánsko", "Juhozápadná Ázia", "Jungfrau", "Jutsko", "Južná Afrika", "K2", "Káhira",
    "Kalábria", "Kalkata", "Kambodža", "Kamerun", "Kanada", "Kanál", "Kanárske ostrovy",
    "Kaňon", "Kapské Mesto", "Kapverdy", "Karáči", "Karibik", "Karpaty", "Kaspické more",
    "Katalánsko", "Katar", "Kathmandu", "Kaukaz", "Kazachstan", "Keňa", "Kilauea",
    "Kilimandžáro", "Kinshasa", "Kirgizsko", "Kiribati", "Klimatický pás", "Kodaň", "Kolumbia",
    "Komory", "Kongo", "Kórea", "Korutánsko", "Korytina", "Kosovo", "Kostarika", "Košice",
    "Kotlina", "Kraj", "Krajina", "Krajinka", "Krakatoa", "Krakov", "Kraňsko", "Kráter",
    "Krym", "Kuala Lumpur", "Kuba", "Kurily", "Kuvajt", "Kyoto", "Kysuce", "Ľadovec",
    "Ladožské jazero", "Lago di Garda", "Lagos", "Lagúna", "Lake Michigan", "Lake Superior",
    "Lake Victoria", "Laos", "Laponsko", "Las Vegas", "Leeds", "Leipzig", "Lesotho", "Libanon",
    "Libéria", "Líbya", "Lichtenštajnsko", "Lima", "Liptov", "Lisabon", "Litva", "Liverpool",
    "Loire", "Lombardia", "Londýn", "Los Angeles", "Lotyšsko", "Lübeck", "Luxembursko", "Lyon",
    "Macedónia", "Mackenzie", "Madagaskar", "Maďarsko", "Madeira", "Madrid", "Malá Ázia",
    "Malá Fatra", "Malajzia", "Malawi", "Maldivy", "Malé Karpaty", "Mali", "Malmö", "Malorka",
    "Malta", "Maňa", "Manchester", "Manila", "Maroko", "Marseille", "Marshallove ostrovy",
    "Matterhorn", "Mauna Kea", "Maurícius", "Mauritánia", "McKinley", "Meander", "Mekka",
    "Mekong", "Melbourne", "Memphis", "Mexico City", "Mexiko", "Miami", "Mikronézia", "Miláno",
    "Milwaukee", "Minneapolis", "Minsk", "Mississippi", "Mjanmarsko", "Mníchov", "Močiar",
    "Moldavsko", "Molise", "Monako", "Mongolsko", "Mont Blanc", "Montevideo", "Montpellier",
    "Montreal", "Morava", "More", "Moréna", "Morský prúd", "Moskovská oblasť", "Moskva",
    "Mozambik", "Mumbai", "Murray", "Mys", "Nadmorská výška", "Nagoja", "Nairobi", "Namib",
    "Namíbia", "Nantes", "Národný park", "Nauru", "Neapol", "Nemecko", "Nepál", "New Delhi",
    "New Orleans", "New York", "Niagarské vodopády", "Nice", "Niger", "Nigéria", "Nikaragua",
    "Nízke Tatry", "Nížina", "Nórsko", "Novohrad", "Novosibirsk", "Nový Zéland", "Núbia", "Ob",
    "Obec", "Oblasť", "Oceánia", "Oceánska priekopa", "Odliv", "Okinawa", "Okres", "Omán",
    "Orava", "Ósaka", "Oslo", "Ostrov", "Ottawa", "Pakistan", "Palau", "Palestína", "Panama",
    "Panamský prieplav", "Panónia", "Panva", "Papua-Nová Guinea", "Paraguay", "Paríž",
    "Pasienok", "Patagónia", "Peking", "Permafrost", "Perth", "Peru", "Perzský záliv",
    "Philadelphia", "Phoenix", "Piesočná duna", "Pittsburgh", "Planina", "Plato", "Pláž",
    "Plošina", "Pobrežie", "Počasie", "Podnebie", "Pohorie", "Pohronie", "Polárna noc",
    "Polárny deň", "Polostrov", "Poľsko", "Polynézia", "Ponitrie", "Popocatépetl", "Porast",
    "Portland", "Porto", "Portugalsko", "Považie", "Povodie", "Poznaň", "Práčka", "Praha",
    "Prales", "Prameň", "Priehrada", "Priekopa", "Prieliv", "Priesmyk", "Príliv",
    "Prírodná rezervácia", "Prístav", "Provence", "Prúd", "Pruh", "Prusko", "Puebla", "Púšť",
    "Pyreneje", "Quebec", "Quito", "Rabat", "Rakúsko", "Recife", "Reliéf", "Reykjavík",
    "Rhône", "Rieka", "Riga", "Rio de Janeiro", "Rio Grande", "Rocky Mountains", "Rotterdam",
    "Rovina", "Rumunsko", "Rusko", "Rwanda", "Rysy", "Sahara", "Salvador", "Samoa",
    "San Diego", "San Francisco", "San Juan", "San Maríno", "Santiago", "Santo Domingo",
    "São Paulo", "Sarajevo", "Sasko", "Saudská Arábia", "Savana", "Seattle", "Sediment",
    "Seina", "Senegal", "Severná pologuľa", "Severný pól", "Sevilla", "Seychely", "Sibír",
    "Sicília", "Sídlo", "Sierra Leone", "Sierra Nevada", "Sinai", "Singapur", "Skala", "Sklon",
    "Sliezsko", "Slovensko", "Slovinsko", "Snehová čiara", "Sofia", "Somálsko",
    "Sopečný kráter", "Sopka", "Soul", "Spiš", "Srbsko", "Srí Lanka", "Step", "Stratovulkán",
    "Stredná Amerika", "Stredná Ázia", "Stredná Európa", "Stredoafrická republika",
    "Stredomorie", "Stredozemné more", "Strom", "Stuttgart", "Sudán", "Suezský prieplav",
    "Sumatra", "Súostrovie", "Supercela", "Surinam", "Sútok", "Svah", "Svazijsko",
    "Svätá Lucia", "Svätý Krištof a Nevis", "Svätý Tomáš a Princov ostrov", "Svätý Vavrinec",
    "Svätý Vincent a Grenadíny", "Sydney", "Sýria", "Šanghaj", "Šelf", "Škandinávia",
    "Španielsko", "Štokholm", "Štrasburg", "Štrbské Pleso", "Švábsko", "Švajčiarsko",
    "Švédsko", "Tadžikistan", "Taiwan", "Tajga", "Taliansko", "Tallinn", "Tanganika",
    "Tanzánia", "Tatra", "Tatranská Lomnica", "Tatry", "Teherán", "Tekov", "Tel Aviv", "Temža",
    "Terasa", "Thajsko", "Thessaloniki", "Tchaj-pej", "Tiber", "Tibetská náhorná plošina",
    "Tigris", "Tichý oceán", "Tijuana", "Tirolsko", "Tlak", "Togo", "Tonga", "Toskánsko",
    "Toulouse", "Transylvánia", "Trinidad a Tobago", "Tripolis", "Tropický cyklón", "Tundra",
    "Tunguzka", "Tunis", "Tunisko", "Turecko", "Turiec", "Turín", "Turkestan", "Turkménsko",
    "Tuvalu", "Úboč", "Údolie", "Uganda", "Ukrajina", "Umbria", "Ural", "Uruguay", "Útes",
    "Uzbekistan", "Úžina", "Valencia", "Vancouver", "Vanuatu", "Vatikán", "Veľká Fatra",
    "Veľké jazerá", "Venezuela", "Vesuvius", "Viedenský les", "Vietnam", "Vihorlat",
    "Vladivostok", "Vodopád", "Vojvodina", "Volga", "Volgograd", "Vulkán", "Východná Európa",
    "Východný Timor", "Vysoké Tatry", "Wales", "Washington", "Wellington", "Wroclaw", "Yukon",
    "Zagreb", "Záhorie", "Záliv", "Zambezi", "Zambia", "Západná Európa", "Západné Tatry",
    "Záporožie", "Zátoka", "Zelený mys", "Zemina", "Zemplín", "Zimbabwe", "Zrážky", "Zürich",
    "Ženeva",
  ],

  // ─────────── OSOBY A POVOLANIA ───────────
  person: [
    "Absolvent", "Advokát", "Affiliate", "Akademik", "Alexander Dubček", "Amatér",
    "Andrej Kiska", "Andrej Kmeť", "Andrej Sládkovič", "Anton Šťastný", "Archeológ",
    "Architekt", "Asistent", "Astrofyzik", "Astronaut", "Aurel Stodola", "Autor", "Bakalár",
    "Baník", "Bankár", "Barista", "Barman", "Básnik", "Biológ", "Botanik", "Božena Němcová",
    "Brat", "Bratranec", "Cenzor", "Cestovateľ", "Čašník", "Člen", "Dabing", "Dcéra", "Dedo",
    "Dentista", "Detektív", "Diplomat", "Dirigent", "Disident", "Dispečer", "DJ", "Docent",
    "Doktor", "Doktorand", "Dopravár", "Dramaturg", "Editor", "Egyptológ", "Ekonóm",
    "Emeritný", "Emigrant", "Endokrinológ", "Epidemiológ", "Etnograf", "Exorcista", "Expert",
    "Exulant", "Farmaceut", "Filantrop", "Filológ", "Filozof", "Fotograf", "Fyzik", "Generál",
    "Geodet", "Geograf", "Geológ", "Grafický dizajnér", "Gustáv Husák", "Gynekológ", "Hasič",
    "Hematológ", "Herec", "Herečka", "Historik", "Holič", "Hudobník", "Chemik", "Chirurg",
    "Ikona", "Ilustrátor", "Informatik", "Inžinier", "Ivan Gašparovič", "Ján Bahýľ",
    "Ján Hollý", "Ján Kollár", "Janko Kráľ", "Jazykovedec", "Jozef Murgaš", "Július Satinský",
    "Juraj Tranovský", "Kameraman", "Kandidát", "Kapitán", "Kartograf", "Kastelán",
    "Klement Gottwald", "Klient", "Kňaz", "Knihovník", "Kolektív", "Komentátor", "Komisár",
    "Komunikátor", "Korešpondent", "Korund", "Krajčír", "Kritik", "Kuchár", "Legenda", "Lekár",
    "Lekárnik", "Letec", "Libretista", "Ľubomír", "Ľubomír Feldek", "Ľudmila", "Ľudovít",
    "Ľudovít Štúr", "Majster", "Manažér", "Manželka", "Marek Hamšík", "Marián Gáborík",
    "Marián Hossa", "Martin Benka", "Matej Bel", "Matematik", "Matka", "Mediátor", "Mechanik",
    "Mentor", "Metodik", "Mikrobiológ", "Mikuláš Dzurinda", "Milan Lasica",
    "Milan Rastislav Štefánik", "Miništrant", "Misionár", "Moderátor", "Murár", "Muzikológ",
    "Námorník", "Notár", "Novinár", "Občan", "Obchodník", "Obyvateľ", "Odborník", "Operátor",
    "Oponent", "Organista", "Osobnosť", "Ošetrovateľ", "Otec", "Otorinolaryngológ", "Pacient",
    "Pamätník", "Patriarcha", "Pavol Országh Hviezdoslav", "Pedagóg", "Pekár", "Peter Šťastný",
    "Pilot", "Pionier", "Pirát", "Poddaný", "Podnikateľ", "Politik", "Politológ", "Porota",
    "Poslanec", "Potápač", "Potomok", "Požiarnik", "Pracovník", "Predseda", "Predseda vlády",
    "Priateľ", "Príbuzný", "Prijímateľ", "Prírodovedec", "Prisťahovalec", "Prodekan",
    "Producent", "Profesionál", "Profesor", "Programátor", "Prokurátor", "Prostredník",
    "Protagonista", "Psychiater", "Psychológ", "Publicista", "Quentin Tarantino", "Rabín",
    "Radikál", "Recipient", "Redaktor", "Regulátor", "Rektor", "Reportér", "Reštaurátor",
    "Revolucionár", "Rezident", "Robotník", "Rozhodca", "Rybár", "Rytier", "Samo Chalupka",
    "Scenárista", "Sekretár", "Senior", "Sestra", "Skladateľ", "Sklár", "Sociálny pracovník",
    "Sociológ", "Somelier", "Speváčka", "Spevák", "Spisovateľ", "Sponzor", "Starosta",
    "Staviteľ", "Stomatológ", "Strihač", "Svätec", "Svedok", "Šéf", "Šéfkuchár", "Šéfredaktor",
    "Šerif", "Štefan Banič", "Tajomník", "Talent", "Taxikár", "Technik", "Technológ", "Teológ",
    "Tlmočník", "Tréner", "Účastník", "Učenec", "Učiteľ", "Učiteľka", "Urbanista", "Utečenec",
    "Vedec", "Veliteľ", "Veterinár", "Vinár", "Virtuóz", "Víťaz", "Vizionár", "Vlastník",
    "Vodič", "Vojak", "Vynálezca", "Výrobca", "Výskumník", "Vysoká škola", "Vysokoškolák",
    "Watt", "Weber", "Xénia", "Zabávač", "Záchranár", "Zamestnanec", "Zdeno Cíger", "Zoológ",
    "Zubár", "Zuzana Čaputová", "Zvukár", "Žiak", "Župan", "Žurnalista",
  ],

  // ─────────── TECHNOLÓGIA ───────────
  technology: [
    "Adresár", "Akumulátor", "Algoritmus", "Amoniak", "Animácia", "Antimón", "Antivírus",
    "Aplikácia", "Archív", "Asfalt", "Asistent", "Atómová energia", "Autentifikácia", "Auto",
    "Automobil", "Backup", "Bárium", "Batéria", "Benzín", "Beta žiarenie", "Bezdrôtová sieť",
    "Binárny kód", "Biomasa", "Bionafta", "Bit", "Bitúmen", "Brána", "Buffer", "Cache",
    "Celulóza", "Cement", "Cín", "Databáza", "Databázový systém", "Dátové centrum",
    "Dátový typ", "Deratizácia", "Destilát", "Diesel", "Digitalizácia", "Disk", "Dokumentácia",
    "Doména", "Doménové meno", "Dotaz", "Dotyková obrazovka", "Dráha", "Driver", "Drôt",
    "Dusík", "Dynamo", "Editor", "Elektrický prúd", "Elektrina", "Elektronická pošta", "Email",
    "Emulátor", "Epoxidová živica", "Etanol", "Ethernet", "Fialová", "Filtrácia", "Firewall",
    "Firmvér", "Fluorid", "Formát súboru", "Fosforečnan", "Fotovoltaický panel",
    "Fotovoltaika", "Funkcia", "Gáfor", "Gas", "Generátor", "Glycerín", "Grafén",
    "Grafická karta", "Grafit", "Halogenid", "Hardvér", "Heslo", "Hlavička", "Hlavná stránka",
    "Hliník", "Hodinky", "Hosting", "Hydratácia", "Hydraulika", "Hydroelektráreň", "Chladivo",
    "Chladnička", "Chróm", "Ikona", "Index", "Informačný systém", "Integrovaný obvod",
    "Interface", "Internet", "Internetová stránka", "Internetový prehliadač", "Invertor",
    "Izolant", "Izotop", "Jazyk", "Jód", "Joystick", "Kalibrácia", "Kalkulačka", "Kalkulátor",
    "Kalorimeter", "Kamera", "Karbid", "Karbón", "Karta", "Katalyzátor", "Keramika", "Kevlar",
    "Klávesnica", "Klient", "Klima", "Kľuka", "Kobalt", "Kód", "Kódovanie", "Koleso", "Kompas",
    "Kompilátor", "Kompozit", "Kompresia", "Kompresor", "Komunikačný protokol", "Kondenzátor",
    "Konektor", "Konfigurácia", "Konzola", "Kópia", "Kotol", "Kremík", "Kryptografia",
    "Kybernetická bezpečnosť", "Kyslík", "Lak", "Lampa", "Laser", "Latex", "LCD", "LED dióda",
    "Lietadlo", "Logika", "Lokálna sieť", "Lokomotíva", "Ložisko", "Magnézium", "Manometer",
    "Manuál", "Mapa stránky", "Meď", "Mechanizmus", "Merací prístroj", "Mikrofón",
    "Mikroprocesor", "Mikroskop", "Minerálna vlna", "Mobilný telefón", "Modem", "Modul",
    "Monitor", "Mosadz", "Motor", "Myš", "Nafta", "Nanotechnológia", "Napájanie", "Náradie",
    "Nárazník", "Navigácia", "Nehrdzavejúca oceľ", "Neon", "Notebook", "Obrábací stroj",
    "Obrazovka", "Obsah", "Oceľ", "Odkaz", "OLED", "Olej", "Operačný systém", "Operátor",
    "Optické vlákno", "Optika", "Optimalizácia", "Oscilátor", "Osciloskop", "Osobný počítač",
    "Otvorený zdroj", "Oxidácia", "Ozon", "Ozubené koleso", "Palivový článok", "Palladium",
    "Pamäť", "Pamäťová karta", "Pamäťové médium", "Parafín", "Parný stroj", "Periféria",
    "Pevný disk", "Piest", "Plagiát", "Plast", "Plášť", "Platforma", "Platina", "Plugin",
    "Plyn", "Počítač", "Počítačová grafika", "Počítačová sieť", "Počítačový vírus", "Podvozok",
    "Pole", "Polovodič", "Polyetylén", "Polykarbonát", "Polypropylén", "Polystyrén", "Ponorka",
    "Postupnosť", "Pošta", "Používateľské rozhranie", "Pravopis", "Prehliadač", "Prehrávač",
    "Premenná", "Prevodovka", "Priemyselný robot", "Príkaz", "Príkazový riadok", "Príloha",
    "Prístroj", "Procesor", "Profil", "Program", "Programátor", "Programovací jazyk",
    "Programovanie", "Propán", "Protokol", "Prototyp", "Prúdový motor", "Pružina", "Pumpa",
    "Radar", "Radiátor", "Raketa", "Rašelina", "Reálny čas", "Recyklácia", "Reflektor",
    "Regenerácia", "Regulátor", "Reklama", "Reproduktor", "Rezistor", "Robot", "Robotika",
    "Ropa", "Rotačný motor", "Rozhranie", "Rúra", "Sadra", "Satelit", "Selén", "Senzor",
    "Sériový port", "Server", "Sieť", "Sieťová karta", "Signál", "Skener", "Sklo", "Skratka",
    "Skript", "Skrutka", "Slovník", "Smartfón", "Smerovač", "Smola", "Sociálna sieť", "Sóda",
    "Softvér", "Solárna energia", "Solárny článok", "Spaľovací motor", "Spam", "Spojenie",
    "Spojka", "Stiahnutie", "Stránka", "Stratégia", "Striebro", "Stroj", "Stupeň", "Súbor",
    "Súborový systém", "Subwoofer", "Sulfát", "Sulfid", "Supravodič", "Sústruh", "Switch",
    "Systém", "Špecifikácia", "Špionáž", "Štandard", "Štartér", "Štatistika", "Tablet",
    "Tabuľka", "Ťahač", "Tachometer", "Tanker", "Ťažba", "Technická normalizácia", "Telefón",
    "Televízor", "Tepelná energia", "Tepelné čerpadlo", "Terbium", "Termín", "Termočlánok",
    "Termoplast", "Termostat", "Textový editor", "Titán", "Tlačiareň", "Tlačidlo", "Tlak",
    "Tlakomer", "Transformátor", "Tranzistor", "Tungsten", "Turbína", "Turbokompresor", "Účet",
    "Údaje", "Uhlie", "Uhlík", "Uhlíkové vlákno", "Ukazovateľ", "Úložisko",
    "Umelá inteligencia", "Úprava", "Urán", "Uzemnenie", "Užívateľ", "Váha", "Vákuová pumpa",
    "Vápenec", "Vektorová grafika", "Ventil", "Ventilátor", "Video", "Vietor", "Vinyl",
    "Virtualizácia", "Virtuálna realita", "Vírus", "Vlna", "Voda", "Vodič", "Vodík",
    "Vodná para", "Vŕtačka", "Vŕtanie", "Vstavaný systém", "Vstup", "Vstupné dáta",
    "Vstupné zariadenie", "Výfuk", "Vyhľadávač", "Výkon", "Výmenník", "Výpočet", "Výrok",
    "Vysávač", "Výstup", "Web", "Webový prehliadač", "Xenón", "Ytrium", "Záloha",
    "Zálohovanie", "Zariadenie", "Záznam", "Zhlukovanie", "Zinok", "Zlato", "Zobrazenie",
    "Zoznam", "Zvuková karta", "Žehlička", "Železo", "Žeriav",
  ],

  // ─────────── PRÍRODA ───────────
  nature: [
    "Abiotický faktor", "Adaptácia", "Agát", "Albatros", "Aligátor", "Amarant", "Amur",
    "Andulka", "Antilopa", "Ara", "Arachnológia", "Astra", "Atmosféra", "Axolotl", "Azalka",
    "Bažina", "Bedľa", "Belorítka", "Biocenóza", "Biodiverzita", "Biogeografia",
    "Bioindikátor", "Biológia", "Biomasa", "Biosféra", "Biotechnológia", "Biotop", "Bizón",
    "Blcha", "Bobor", "Bocian", "Bonsai", "Borovica", "Botanická záhrada", "Bôr", "Breza",
    "Broskyňa", "Bršlen", "Buk", "Cibuľa", "Cicavec", "Cyklus", "Cyprus", "Čajka", "Čerešňa",
    "Čížik", "Čmeliak", "Damask", "Daniel", "Ďateľ", "Datľa", "Delfín", "Diviak", "Dormancia",
    "Dravec", "Dub", "Dubák", "Dudka", "Dudok", "Echinacea", "Ekologická nika", "Ekosozológia",
    "Ekosystém", "Endemit", "Entomológia", "Epifyt", "Etológia", "Eukalyptus", "Evolúcia",
    "Ezel", "Fauna", "Fenek", "Fenológia", "Figovník", "Fikus", "Flóra", "Fotosyntéza",
    "Frézia", "Fytocenóza", "Gaštan", "Gepard", "Ginkgo", "Gorila", "Granátové jablko",
    "Habitát", "Harmanček", "Havran", "Herpetológia", "Hlavonožec", "Hlodavec", "Hmyz",
    "Hmyzožravec", "Holub", "Horec", "Hortenzia", "Hrach", "Hríb dubový", "Hríb hnedý",
    "Hríb smrekový", "Hroch", "Hruška", "Huba", "Hus", "Húsenica", "Hyacint", "Hyena",
    "Chameleón", "Chobotnica", "Choroba", "Chrobák", "Chrúst", "Ihličnatý les",
    "Invazívny druh", "Iris", "Jablko", "Jačmeň", "Jaguár", "Jaseň", "Jaskyňa", "Jastrab",
    "Jašterica", "Jedľa", "Jednorožec", "Jeleň", "Jelša", "Jeseter", "Jež", "Juka", "Kačica",
    "Kačka", "Kajman", "Kakadu", "Kaktus", "Kaňon", "Kapor", "Karas", "Kobylka", "Kohút",
    "Komár", "Kondor", "Koník", "Konvalinka", "Kopytník", "Korenie", "Kormorán", "Korytnačka",
    "Kos", "Kôra", "Kôrovec", "Krajinka", "Kraslice", "Kreveta", "Krík", "Krokodíl", "Krtko",
    "Kukučka", "Kukurica", "Kvet", "Ľadovec", "Ľalia", "Larva", "Lasica", "Lastovička",
    "Leguán zelený", "Les", "Lesný porast", "Lesostep", "Lev", "Ležiak", "Lienka", "Lipa",
    "Lipeň", "Lišajník", "Lišiak", "Líška", "Lopúch", "Losos", "Lucerna", "Lúčna", "Lúka",
    "Mačka", "Magnólia", "Mach", "Mak", "Malina", "Mandľovník", "Marhuľa", "Mäta", "Mečiar",
    "Medúza", "Medveď", "Migrácia", "Mlok", "Modlivka", "Modrín", "Mokraď", "Moréna", "Moriak",
    "Motýľ", "Mravec", "Muškát", "Myš", "Mýval", "Narcis", "Národný park", "Nechtík",
    "Netopier", "Nosorožec", "Obilnina", "Okapi", "Olivovník", "Opica", "Orangutan", "Orech",
    "Orgován", "Orol", "Osa", "Osol", "Ovce", "Ovos", "Palma", "Panda", "Panter", "Papagáj",
    "Papája", "Papraď", "Parma", "Páv", "Pavúk", "Pelikán", "Permafrost", "Pes", "Pestovanie",
    "Pinka", "Plameniak", "Plch", "Plod", "Ploštica", "Podbeľ", "Podpňovka", "Pohánka",
    "Polárna líška", "Polárny medveď", "Populácia", "Potkan", "Potravinový reťazec", "Pôda",
    "Prachovec", "Prales", "Pŕhľava", "Prírodná rezervácia", "Proso", "Prostredie", "Pstruh",
    "Pšenica", "Pštros", "Puma", "Rak", "Rakytník", "Rangifer", "Rastlina", "Rašelinisko",
    "Raž", "Reďkovka", "Repka", "Ríša", "Rododendron", "Roháč", "Rosnička", "Rosomák",
    "Rozmarín", "Rozmnožovanie", "Ruža", "Ryba", "Rybárik", "Rys", "Rys ostrovid", "Sad",
    "Salamandra", "Sardinka", "Savana", "Sediment", "Sedmokráska", "Sekvoja", "Serval",
    "Shiitake", "Skleník", "Skokan", "Skunk", "Slamienka", "Slanisko", "Slaný", "Slávik",
    "Sleď", "Slimák", "Slivka", "Slnečnica", "Slon", "Smrek", "Smrekovec", "Sob", "Sojka",
    "Sokol", "Sova", "Srnec", "Stalagmit", "Stalaktit", "Step", "Stonka", "Sukcesia",
    "Sukulent", "Surikata", "Svetluška", "Sýkora", "Symbióza", "Šafrán", "Šakal", "Šalvia",
    "Šampiňón", "Šelmy", "Šimpanz", "Špenát", "Šťuka", "Tajga", "Tarantula", "Ťava", "Tchor",
    "Tiger", "Tis", "Trávnik", "Treska", "Tŕnie", "Tučniak", "Tulipán", "Úhor", "Užovka",
    "Václavka", "Vážka", "Včela", "Včelár", "Veľryba", "Veverička", "Vinica", "Vinič", "Vlk",
    "Voda", "Vodná nádrž", "Vombat", "Vrabec", "Vŕba", "Vretenica", "Vŕtačka", "Vydra",
    "Vyhynutie", "Yucca", "Záhrada", "Zajac", "Zázvor", "Zebra", "Zmija", "Zoocenóza", "Zubor",
    "Želva", "Žeriav", "Žihľava", "Žiletka", "Živočích", "Živočíšna ríša", "Žralok",
    "Žralok biely",
  ],

  // ─────────── VŠEOBECNÉ POJMY ───────────
  general: [
    "Absolútno", "Absurdita", "Adresa", "Afekt", "Akcia", "Aktivita", "Aktualita",
    "Alexandrín", "Algoritmizácia", "Alternatíva", "Ambícia", "Analýza", "Anticipácia",
    "Antológia", "Aplikácia", "Aproximácia", "Argument", "Archív", "Archivár", "Artikulácia",
    "Asimilácia", "Asociácia", "Aspekt", "Atmosféra", "Atribút", "Audit", "Autentickosť",
    "Automatizácia", "Averzia", "Axióma", "Axón", "Bageta", "Banán", "Banka", "Báseň", "Báza",
    "Beh", "Bezpečnosť", "Bicykel", "Bilancia", "Bilingvizmus", "Biografia", "Blok", "Bojkot",
    "Bonita", "Boršč", "Box", "Bôr", "Brána", "Budova", "Budúcnosť", "Buchta", "Bunka",
    "Bylinný čaj", "Byrokracia", "Cappuccino", "Centrálna banka", "Ceruzka", "Cesta", "Cieľ",
    "Cirkus", "Citácia", "Citlivosť", "Civilizácia", "Croissant", "Cynizmus", "Čaj", "Čas",
    "Časopis", "Časť", "Čerešňa", "Číslica", "Číslo", "Čokoláda", "Ďalekohľad", "Daň", "Ďasno",
    "Dedičstvo", "Dedukcia", "Defekt", "Deformácia", "Dekadencia", "Dekorácia", "Demokracia",
    "Denominácia", "Derivácia", "Destiláty", "Detail", "Determinizmus", "Deviácia",
    "Dezinfekcia", "Diagnóza", "Diaľnica", "Dialóg", "Dieťa", "Diferenciácia", "Digitalizácia",
    "Dichotómia", "Dilema", "Diplomacia", "Disciplína", "Diskontinuita", "Diskriminácia",
    "Dispozícia", "Distribúcia", "Divergencia", "Dohoda", "Dokument", "Dom", "Dominancia",
    "Doprava", "Doska", "Dôkaz", "Dôsledok", "Dôstojník", "Dôvera", "Dôverník", "Dôvod",
    "Druh", "Družstvo", "Ďumbier", "Dvere", "Dynamika", "Džem", "Džús", "Efekt", "Efektivita",
    "Ekológia", "Ekonomika", "Elektrospotrebič", "Emanácia", "Emancipácia", "Empatia",
    "Empirizmus", "Entita", "Entropia", "Epidémia", "Epidemiológia", "Epizóda", "Erb",
    "Erózia", "Esencia", "Espresso", "Etapa", "Etika", "Etnológia", "Eufória", "Evidencia",
    "Evolúcia", "Exaktnosť", "Exil", "Existencia", "Exotika", "Expanzia", "Expedícia",
    "Explikácia", "Expozícia", "Extinkcia", "Extrakcia", "Faktor", "Faktúra", "Familia",
    "Farba", "Fasáda", "Fazuľa", "Federácia", "Fenomén", "Fenomenológia", "Fikcia",
    "Filozofia", "Fixácia", "Flexibilita", "Fonológia", "Forma", "Formalizácia", "Formulácia",
    "Fortifikácia", "Fragment", "Frekvencia", "Frustrácia", "Fundament", "Funkcia", "Fúzia",
    "Galaxia", "Generácia", "Generalizácia", "Genéza", "Geometria", "Globalizácia", "Gouda",
    "Gravitácia", "Guláš", "Guma", "Gymnastika", "Habilitácia", "Halušky", "Hamburger",
    "Harmonizácia", "Heuristika", "Hierarchia", "História", "Hľadanie", "Hodina", "Hodnota",
    "Horčica", "Horizont", "Horizontálnosť", "Hostia", "Hra", "Hračka", "Hrozno",
    "Hrubý domáci produkt", "Hummus", "Hydratácia", "Hymna", "Hypotéza", "Charakter", "Chyba",
    "Idea", "Idealizácia", "Identifikácia", "Ideológia", "Ignorácia", "Ilustrácia",
    "Imaginácia", "Imitácia", "Implikácia", "Inaugurácia", "Incidencia", "Individualizácia",
    "Indukcia", "Industrializácia", "Inflácia", "Informácia", "Inovácia", "Inscenácia",
    "Inšpirácia", "Inštitúcia", "Inštrukcia", "Integrácia", "Inteligencia", "Inteligibilita",
    "Intencia", "Interakcia", "Interferencia", "Interview", "Inverzia", "Investícia", "Jadro",
    "Jaseň", "Jednotka", "Jogurt", "Jurisdikcia", "Kakao", "Kalendár", "Kalibrácia",
    "Kalkulácia", "Kameň", "Kameňolom", "Kanál", "Kaňon", "Kapusta", "Karamel", "Karikatúra",
    "Katalóg", "Kategória", "Kauzalita", "Kebab", "Kľak", "Klasifikácia", "Klauzula", "Kĺb",
    "Kliešte", "Klima", "Kľúč", "Kniha", "Koláč", "Kolonizácia", "Komentár", "Kompót",
    "Komunikácia", "Komunita", "Konferencia", "Konfigurácia", "Konšpirácia", "Konštelácia",
    "Konštitúcia", "Konštrukcia", "Kontakt", "Kontemplácia", "Kontext", "Kontinuita",
    "Kontrola", "Konvergencia", "Konverzia", "Konzultácia", "Koprodukcia", "Korelácia",
    "Korenie", "Korešpondencia", "Korupcia", "Košík", "Kozmetika", "Kôra", "Kôrovec",
    "Krajina", "Krása", "Kŕč", "Kreácia", "Kriminalita", "Kritika", "Kríza", "Kukurica",
    "Kultúrnosť", "Kvalita", "Kvantum", "Labyrint", "Lampa", "Lano", "Larynx", "Lasagne",
    "Legislatíva", "Legitimácia", "Lepidlo", "Liatina", "Liberalizácia", "Lingvistika",
    "Línia", "List", "Liturgia", "Loď", "Logika", "Lokalita", "Lokalizácia", "Lokša", "Losos",
    "Ložisko", "Magazín", "Magnetizácia", "Manažment", "Mapa", "Marhuľa", "Maslo", "Materiál",
    "Matrac", "Maximum", "Mäkkýš", "Mäso", "Mäsožravec", "Mäta", "Med", "Médium",
    "Medzinárodné vzťahy", "Melón", "Membrána", "Memorandum", "Menová jednotka", "Menový kurz",
    "Metóda", "Mier", "Mikroskop", "Minimum", "Minulosť", "Misia", "Mlieko", "Móda", "Modus",
    "Morálka", "Most", "Motív", "Možnosť", "Múčnik", "Muffin", "Multimédiá", "Mydlo", "Mýval",
    "Náboj", "Nábytok", "Náčinie", "Nálada", "Námestie", "Nápad", "Nápoj", "Nariadenie",
    "Národ", "Nasledovanie", "Nástroj", "Návrh", "Norma", "Nôž", "Obálka", "Občan", "Obelisk",
    "Oblak", "Oblasť", "Oblečenie", "Obraz", "Óda", "Odbor", "Odpoveď", "Odraz", "Okamih",
    "Okruh", "Okuliare", "Olej", "Omáčka", "Operácia", "Ópium", "Organizácia", "Orientácia",
    "Ostrov", "Otázka", "Ovocie", "Oxid", "Ozvena", "Pamäť", "Pamiatka", "Papier", "Paradajka",
    "Park", "Parlament", "Patent", "Päsť", "Pečať", "Peňaženka", "Periodikum", "Perník",
    "Pero", "Personál", "Pizza", "Plán", "Plastelína", "Plášť", "Plech", "Podivín", "Poduška",
    "Pohár", "Pohľad", "Pochopenie", "Polievka", "Politika", "Pomoc", "Pomôcka", "Ponožka",
    "Porcelán", "Posteľ", "Postup", "Potreba", "Pozícia", "Pravidlo", "Pravítko", "Právo",
    "Pŕhľava", "Príčina", "Priemysel", "Príklad", "Princíp", "Priorita", "Prípad",
    "Prítomnosť", "Proces", "Profesia", "Profil", "Program", "Projekt", "Prostredie",
    "Prostriedok", "Protokol", "Puzdro", "Pýcha", "Qatar", "Quark", "Quo vadis", "Rám",
    "Rámec", "Raňajky", "Realita", "Recyklácia", "Reforma", "Región", "Riad", "Rokovanie",
    "Rola", "Röntgen", "Rozhodnutie", "Ryža", "Sandwich", "Sčítanie ľudu", "Sextant",
    "Schopnosť", "Sieť", "Sila", "Situácia", "Sklenička", "Skupina", "Slivovica", "Sloboda",
    "Smer", "Smernica", "Smerník", "Smotana", "Soľ", "Spoločenstvo", "Spoločnosť", "Stanica",
    "Stav", "Steak", "Stĺp", "Stolička", "Stôl", "Strukoviny", "Súd", "Súdna moc", "Summit",
    "Sushi", "Svedomie", "Svet", "Sýkora", "Syr", "Systém", "Šalát", "Škriatok", "Špenát",
    "Štandard", "Šťastie", "Štátny sviatok", "Štruktúra", "Šťuka", "Štýl", "Šunka", "Tabuľa",
    "Tarhoňa", "Taška", "Ťažisko", "Ťažký", "Telefón", "Téma", "Termín", "Termoska", "Tlač",
    "Tofu", "Topánky", "Torta", "Toxín", "Tradícia", "Tričko", "Tŕň", "Tŕnie", "Tuba",
    "Tyčinka", "Účel", "Účinok", "Údaj", "Umývadlo", "Úroveň", "Úspech", "Ústava", "Uvoľnenie",
    "Vajce", "Vanilka", "Varecha", "Vata", "Väz", "Väzba", "Vec", "Veda", "Vedomosť",
    "Vidlička", "Víno", "Vitamín", "Vlajka", "Vlastnosť", "Vodka", "Volebné právo", "Vôľa",
    "Vôňa", "Vplyv", "Vŕba", "Vrchol", "Vrcholné stretnutie", "Vŕtačka", "Vstup", "Výber",
    "Východisko", "Výkonná moc", "Výpočet", "Vzťah", "Wales", "Watt", "Wellington", "Western",
    "Whisky", "Windsor", "Začiatok", "Záhrada", "Zákon", "Zásobník", "Zásuvka", "Záujem",
    "Záver", "Zdroj", "Zelenina", "Zemiak", "Zmena", "Zmluva", "Znak", "Zodpovednosť", "Zóna",
    "Zoznam", "Zrkadlo", "Zvuk", "Žalúzie", "Živica",
  ],

};

// Rozšírenie slovnej zásoby — nové pojmy + doplnenie zriedkavých písmen (q, x,
// w, ä, ó, ô, ť, ď, ľ, ŕ, ň, ý) na pozíciách 1–6, aby force trik fungoval
// aj pri neobvyklých menách. Duplicity ošetri index (buildIndex).
for (const [cat, words] of Object.entries(VOCABULARY_EXPANSION) as [
  ArticleCategory,
  string[],
][]) {
  VOCABULARY_BY_CATEGORY[cat].push(...words);
}

// Druhá vlna — ďalšie tematické pojmy podľa kategórií
for (const [cat, words] of Object.entries(VOCABULARY_EXPANSION_2) as [
  ArticleCategory,
  string[],
][]) {
  VOCABULARY_BY_CATEGORY[cat].push(...words);
}

// ────────────────────────────────────────────────────────────────────────────
// PRÍBUZNÉ KATEGÓRIE — ak v hlavnej kategórii nie je dosť slov,
// uprednostnia sa slová z týchto príbuzných kategórií pred fallbackom
// na všeobecnú slovnú zásobu.
// ────────────────────────────────────────────────────────────────────────────

const RELATED_CATEGORIES: Record<ArticleCategory, ArticleCategory[]> = {
  sport: ['person', 'culture'],
  science: ['technology', 'nature'],
  history: ['person', 'geography', 'culture'],
  geography: ['nature', 'history'],
  person: ['culture', 'history', 'science'],
  culture: ['person', 'history'],
  technology: ['science'],
  nature: ['science', 'geography'],
  general: ['culture', 'science', 'history'],
};

// ────────────────────────────────────────────────────────────────────────────
// INDEX: kategória → písmeno → pozícia → zoznam slov
// Vytvorí sa raz pri načítaní modulu.
// ────────────────────────────────────────────────────────────────────────────

type LetterPositionIndex = Record<string, Record<number, string[]>>;

function buildIndex(): Record<ArticleCategory, LetterPositionIndex> {
  const result = {} as Record<ArticleCategory, LetterPositionIndex>;

  for (const [cat, words] of Object.entries(VOCABULARY_BY_CATEGORY) as [
    ArticleCategory,
    string[],
  ][]) {
    const idx: LetterPositionIndex = {};
    const seen = new Set<string>();

    for (const word of words) {
      const lower = word.toLowerCase();
      if (seen.has(lower)) continue;
      seen.add(lower);

      // Zaindexujeme slovo na pozíciách 1–6
      for (let pos = 1; pos <= 6; pos++) {
        if (lower.length < pos) break;
        const ch = lower[pos - 1];
        // preskočiť medzery a interpunkciu — chceme len písmená
        if (!/[a-zá-ž]/i.test(ch)) continue;
        if (!idx[ch]) idx[ch] = {};
        if (!idx[ch][pos]) idx[ch][pos] = [];
        idx[ch][pos].push(word);
      }
    }

    result[cat] = idx;
  }

  return result;
}

const CATEGORY_INDEX = buildIndex();

// ────────────────────────────────────────────────────────────────────────────
// VEREJNÉ API
// ────────────────────────────────────────────────────────────────────────────

// Získa force slová pre dané písmeno na danej pozícii.
// Najprv hľadá v aktuálnej kategórii článku, potom v príbuzných kategóriách,
// nakoniec vo všeobecnej slovnej zásobe.
export function getForceWordsForLetter(
  letter: string,
  position: number,
  category: ArticleCategory,
  count: number = 50,
): string[] {
  const target = letter.toLowerCase();
  const result: string[] = [];
  const seen = new Set<string>();

  const pickFrom = (cat: ArticleCategory) => {
    const words = CATEGORY_INDEX[cat]?.[target]?.[position] || [];
    for (const w of words) {
      const key = w.toLowerCase();
      if (!seen.has(key)) {
        result.push(w);
        seen.add(key);
      }
    }
  };

  // 1) Hlavná kategória
  pickFrom(category);

  // 2) Príbuzné kategórie
  if (result.length < count) {
    for (const rel of RELATED_CATEGORIES[category] || []) {
      pickFrom(rel);
      if (result.length >= count) break;
    }
  }

  // 3) Fallback na všeobecnú slovnú zásobu
  if (result.length < count && category !== 'general') {
    pickFrom('general');
  }

  // 4) Posledný fallback — ostatné kategórie (aby trik vždy fungoval)
  if (result.length < count) {
    for (const cat of Object.keys(CATEGORY_INDEX) as ArticleCategory[]) {
      if (result.length >= count) break;
      pickFrom(cat);
    }
  }

  // 5) Núdzový fallback — niektoré kombinácie písmeno × pozícia (napr. "á" na
  // 1. pozícii alebo "q" v strede slova) sa v slovenčine nevyskytujú. Aby force
  // trik nikdy neskončil bez odkazov, vrátime slová obsahujúce písmeno hocikde.
  if (result.length === 0) {
    for (const cat of Object.keys(CATEGORY_INDEX) as ArticleCategory[]) {
      const byLetter = CATEGORY_INDEX[cat]?.[target] || {};
      const positions = Object.keys(byLetter)
        .map(Number)
        .sort((a, b) => a - b);
      for (const pos of positions) {
        for (const w of byLetter[pos] || []) {
          const key = w.toLowerCase();
          if (!seen.has(key)) {
            result.push(w);
            seen.add(key);
          }
          if (result.length >= count) break;
        }
        if (result.length >= count) break;
      }
      if (result.length >= count) break;
    }
  }

  // Fisher–Yates shuffle, ale prvú tretinu výsledkov ponecháme z hlavnej kategórie
  // (aby sa relevantné slová zobrazovali skôr ako fallback slová)
  const primaryCount = Math.min(
    result.length,
    Math.max(10, Math.floor(count / 3)),
  );
  const primary = result.slice(0, primaryCount);
  const rest = result.slice(primaryCount);

  for (let i = primary.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [primary[i], primary[j]] = [primary[j], primary[i]];
  }
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }

  return [...primary, ...rest].slice(0, count);
}

// ────────────────────────────────────────────────────────────────────────────
// ŠTRUKTÚRY ČLÁNKOV
  // ────────────────────────────────────────────────────────────────────────────

const ARTICLE_STRUCTURES: Record<
  ArticleCategory,
  {
    intro: (title: string) => string;
    sections: (title: string) => { title: string; paragraphs: string[] }[];
  }
> = {
  culture: {
    intro: (title) =>
      `<p><b>${title}</b> je významný kultúrny a umelecký pojem, ktorý zohráva dôležitú úlohu v spoločenskom živote. Téma má bohatú históriu siahajúcu do dávnej minulosti a širokú škálu interpretácií, ktoré sa formovali v rôznych obdobiach a kultúrach. V súčasnosti predstavuje pevnú súčasť kultúrneho dedičstva a jej štúdium prináša cenné poznatky o vývoji umenia.</p>`,
    sections: (title) => [
      {
        title: 'Charakteristika',
        paragraphs: [
          `${title} sa vyznačuje jedinečnými výrazovými prostriedkami a osobitým štýlom, ktoré ho odlišujú od iných umeleckých foriem. Jeho podstata spočíva v kombinácii estetickej hodnoty, technického majstrovstva a kultúrneho posolstva, ktoré tvorca odovzdáva publiku.`,
          `Vnímanie tohto fenoménu sa v priebehu dejín menilo a prispôsobovalo sa spoločenským potrebám. Každá doba si do tradičných foriem vkladala vlastné významy, čím vytvárala pestrú mozaiku interpretácií. Jednotliví autori a interpreti k nemu pristupujú rôzne, čo prispieva k bohatosti celkového výrazu.`,
          `Z teoretického hľadiska sa téma zaoberá vzťahom medzi formou a obsahom, medzi tradíciou a inováciou. Estetické kategórie ako harmónia, kontrast či rytmus sú nástrojmi, ktorými tvorcovia dosahujú zamýšľaný účinok na publikum.`,
        ],
      },
      {
        title: 'Historický vývoj',
        paragraphs: [
          `Korene siahajú do dávnych období, keď sa formovali základné výrazové princípy. Postupne sa vyvíjali techniky a štýly, ktoré obohacovali tradíciu o nové prvky a otvárali cesty ďalším generáciám.`,
          `Významní tvorcovia v rôznych obdobiach prispeli k rozvoju a formovaniu tejto oblasti. Ich diela sa stali míľnikmi a inšpiráciou pre nasledovníkov. Renesancia a barok priniesli rozkvet, klasicizmus systematizoval pravidlá a romantizmus sa vrátil k slobode výrazu.`,
          `20. storočie znamenalo prelom — moderna a avantgarda spochybnili tradičné formy a otvorili priestor experimentu. Nové technológie umožnili širšie šírenie diel a sprístupnili ich masovému publiku.`,
        ],
      },
      {
        title: 'Štýly a smery',
        paragraphs: [
          `V rámci tejto oblasti sa vyvinulo množstvo štýlových smerov, z ktorých každý priniesol vlastný pohľad na umeleckú tvorbu. Klasické formy ostávajú základom, na ktorom stavajú aj súčasní autori.`,
          `Moderné prúdy obohacujú tradíciu o experimentálne postupy a nečakané kombinácie. Vďaka tomu vzniká bohatá ponuka, ktorá oslovuje rôzne generácie a vkusy.`,
        ],
      },
      {
        title: 'Významní tvorcovia',
        paragraphs: [
          `Históriu tejto oblasti formovali výrazné osobnosti, ktoré svojimi dielami posúvali hranice doteraz známeho. Ich tvorba spája technickú dokonalosť s hlbokou myšlienkovou vrstvou.`,
          `Každá generácia priniesla autorov, ktorí reagovali na svoju dobu a otvárali nové témy. Ich vplyv presahuje rámec úzkej odbornej obce a zasahuje aj široké publikum.`,
          `Domáca i medzinárodná scéna ponúka pestrú paletu štýlov a prístupov. Spolupráca medzi tvorcami z rôznych krajín obohacuje výsledné dielo o nové perspektívy.`,
        ],
      },
      {
        title: 'Vzdelávanie a šírenie',
        paragraphs: [
          `Odborné vzdelávanie zabezpečujú konzervatóriá, akadémie a univerzity, kde sa študenti zoznamujú s teóriou aj praxou. Mnohí získali medzinárodné uznanie a šíria slovenské meno vo svete.`,
          `Festivaly, výstavy a koncertné podujatia umožňujú širokej verejnosti zažiť dielo naživo. Médiá, vydavateľstvá a digitálne platformy prinášajú obsah aj tým, ktorí sa nemôžu zúčastniť priamo.`,
        ],
      },
      {
        title: 'Súčasnosť a vplyv',
        paragraphs: [
          `Dnes ${title.toLowerCase()} naďalej fascinuje publikum a inšpiruje umelcov po celom svete. Moderné technológie otvorili nové možnosti tvorby aj distribúcie a priblížili dielo aj tým, ktorí by k nemu predtým nemali prístup.`,
          `Vplyv na kultúru je nepopierateľný — formuje vkus, podporuje vzdelanie a buduje mosty medzi rôznymi spoločenstvami. Diskusie o úlohe umenia v spoločnosti prebiehajú v odborných kruhoch i medzi laikmi.`,
          `Budúcnosť oblasti smeruje k prepájaniu tradičných foriem s digitálnymi nástrojmi. Mladí tvorcovia hľadajú vlastný hlas a zároveň nadväzujú na bohaté dedičstvo svojich predchodcov.`,
        ],
      },
    ],
  },

  sport: {
    intro: (title) =>
      `<p><b>${title}</b> je športová disciplína s dlhou tradíciou a širokou základňou priaznivcov po celom svete. Kombinuje fyzickú zdatnosť, taktické myslenie a často aj tímovú spoluprácu. Vrcholové výkony si vyžadujú roky systematického tréningu a tisíce hodín cvičenia. Pre mnohých priaznivcov ide o viac ako len šport — predstavuje životný štýl a vášeň, ktorá ich sprevádza celý život.</p>`,
    sections: (title) => [
      {
        title: 'História a vývoj',
        paragraphs: [
          `Počiatky ${title.toLowerCase()} siahajú hlboko do minulosti. Z pôvodne jednoduchej zábavy alebo praktickej činnosti sa postupom času vyvinula štandardizovaná disciplína s jasnými pravidlami. Antické civilizácie a stredoveká Európa zanechali stopy, ktoré ovplyvnili neskorší rozvoj.`,
          `V 19. a 20. storočí prišlo k formalizácii pravidiel a vzniku medzinárodných organizácií. To umožnilo organizovanie svetových súťaží a zaradenie do programu olympijských hier. Vznik národných zväzov urýchlil profesionalizáciu a budovanie športovej infraštruktúry.`,
          `Moderná éra priniesla mediálne pokrytie, lukratívne kontrakty a globálnu popularitu, ktorá z tohto športu urobila súčasť kultúry mnohých národov. Technologické inovácie zmenili spôsob tréningu, prípravy aj sledovania súťaží.`,
        ],
      },
      {
        title: 'Pravidlá a priebeh',
        paragraphs: [
          `Základné pravidlá určujú spôsob bodovania, rozhodcovský systém a štruktúru súťaží. Spravuje ich medzinárodná federácia, ktorá dbá na jednotnosť výkladu po celom svete a pravidelne aktualizuje predpisy.`,
          `Herný systém zahŕňa ligové súťaže, pohárové turnaje a reprezentačné podujatia. Každá úroveň má svoje špecifiká, kvalifikačné kritériá a požiadavky na hráčov. Vo vrcholovej kategórii je dôležitá aj fyzická a mentálna pripravenosť.`,
          `Súčasťou hry je aj fair play — etický rozmer, ktorý sa prejavuje v rešpekte voči súperom, rozhodcom i divákom. Antidopingové programy zabezpečujú čistotu súťaží a chránia zdravie športovcov.`,
        ],
      },
      {
        title: 'Tréning a príprava',
        paragraphs: [
          `Vrcholoví športovci absolvujú niekoľko tréningových fáz — od všeobecnej kondičnej prípravy cez špeciálnu až po predzávodné ladenie formy. Súčasťou je aj regenerácia a strava prispôsobená nárokom disciplíny.`,
          `Mentálna príprava nadobúda v posledných desaťročiach rovnakú váhu ako fyzická. Psychológovia a kondiční tréneri spolupracujú, aby športovec dosiahol optimálny výkon v rozhodujúcom okamihu.`,
        ],
      },
      {
        title: 'Významné súťaže',
        paragraphs: [
          `Medzi najvýznamnejšie podujatia patria majstrovstvá sveta, kontinentálne šampionáty a prestížne ligy. Tieto súťaže priťahujú milióny divákov pri obrazovkách aj priamo v hľadiskách.`,
          `Olympijské hry predstavujú vrchol kariéry mnohých športovcov. Účasť je považovaná za najvyššiu poctu a medailové umiestnenie zaisťuje miesto v dejinách tohto športu.`,
          `Národné súťaže poskytujú priestor pre talenty z menších klubov a slúžia ako prirodzená cesta k vrcholovej kariére. Mládežnícke ligy a juniorské majstrovstvá sú sitom, ktorým prichádzajú nové hviezdy.`,
        ],
      },
      {
        title: 'Známe osobnosti',
        paragraphs: [
          `História pozná množstvo legendárnych mien, ktoré navždy zostanú spojené s týmto športom. Ich výkony sa stali súčasťou rekordných tabuliek a inšpirujú mladé generácie.`,
          `Slovenská reprezentácia má vo svojich radoch osobnosti, ktoré dosiahli medzinárodné úspechy a stali sa národnými hrdinami. Ich príbehy ukazujú, že tvrdá práca a talent vedú k výsledkom.`,
        ],
      },
      {
        title: 'Vplyv na spoločnosť',
        paragraphs: [
          `Šport má významný vplyv na zdravie obyvateľstva, sociálnu súdržnosť a ekonomiku. Podujatia generujú pracovné miesta a turistický ruch, prinášajú aj investície do infraštruktúry hostiteľského mesta.`,
          `Mládežnícky šport zohráva kľúčovú úlohu vo výchove a formovaní charakteru mladých ľudí. Učí disciplíne, vytrvalosti, rešpektu voči súperovi a schopnosti pracovať v tíme.`,
          `Sledovanie športových udalostí spája rodiny a komunity. Zápasy reprezentačných tímov vyvolávajú vlnu národnej hrdosti a stávajú sa výnimočnými chvíľami spoločnej radosti.`,
        ],
      },
    ],
  },

  science: {
    intro: (title) =>
      `<p><b>${title}</b> je vedná disciplína, ktorá systematicky skúma prírodné alebo spoločenské javy. Využíva vedeckú metódu na získavanie overiteľných poznatkov, ktoré sa overujú nezávislými výskumnými tímami po celom svete. Prepojenie teórie a experimentu umožňuje formulovať zákony a modely opisujúce realitu. Vďaka medzinárodnej spolupráci sa poznatky kumulujú a vytvárajú stále presnejší obraz sveta.</p>`,
    sections: (title) => [
      {
        title: 'Predmet štúdia',
        paragraphs: [
          `${title} sa zaoberá špecifickými aspektmi reality pomocou empirických metód a teoretických modelov. Predmet zahŕňa široké spektrum javov od mikroskopických po makroskopické úrovne. Vďaka tomu disciplína prepája poznatky o najmenších časticiach s pozorovaniami v kozmickom meradle.`,
          `Interdisciplinárny charakter umožňuje spoluprácu s príbuznými vedami a prináša synergické efekty vo výskume. Hraničné oblasti často prinášajú najprelomovejšie objavy a otvárajú dvere úplne novým odborom.`,
          `Súčasná veda kladie dôraz na systémový prístup — neskúma izolované javy, ale ich vzájomné vzťahy a dynamiku. Modelovanie a simulácie pomáhajú overiť hypotézy, ktoré by sa v reálnom experimente nedali jednoducho realizovať.`,
        ],
      },
      {
        title: 'Historický vývoj',
        paragraphs: [
          `Korene siahajú do staroveku, kde prví učenci začali systematicky pozorovať a dokumentovať prírodné javy. Antické Grécko, Egypt a arabský svet položili základy, na ktorých neskôr stavala európska veda.`,
          `Vedecká revolúcia 16. a 17. storočia priniesla zásadné metodologické inovácie. Galileo, Kepler a Newton ukázali silu matematického opisu prírody. Osvietenstvo upevnilo dôveru v ľudský rozum a empirické poznanie.`,
          `20. storočie bolo obdobím dramatických objavov, ktoré zmenili naše chápanie sveta a umožnili technologický pokrok. Kvantová mechanika, teória relativity, štruktúra DNA a genetický kód otvorili nové horizonty výskumu.`,
        ],
      },
      {
        title: 'Metódy výskumu',
        paragraphs: [
          `Vedecká metóda zahŕňa pozorovanie, formuláciu hypotéz, experimentovanie a overovanie výsledkov. Tento proces zabezpečuje spoľahlivosť poznatkov a oddeľuje vedu od pseudovedy. Recenzné konanie v odborných časopisoch dohliada na kvalitu publikovaných prác.`,
          `Moderné technológie umožňujú presnejšie merania a analýzy, čo otvára nové možnosti pre výskum. Počítačové simulácie a strojové učenie sa stávajú neoddeliteľnou súčasťou metodológie. Veľké dátové súbory dovoľujú objavovať vzorce, ktoré boli predtým neviditeľné.`,
          `Etika výskumu hrá v posledných desaťročiach významnú úlohu. Pravidlá pre prácu so živými organizmami, ľudskými subjektmi a citlivými dátami sú jasne definované a podliehajú kontrole.`,
        ],
      },
      {
        title: 'Kľúčové teórie a objavy',
        paragraphs: [
          `Disciplína sa opiera o sústavu fundamentálnych teórií, ktoré sa overovali desaťročia až stáročia. Tieto teórie tvoria pevný rámec pre interpretáciu nových pozorovaní a dávajú zmysel jednotlivým experimentom.`,
          `Niektoré objavy zmenili paradigmu celého odboru. Veda sa však aj v takých chvíľach drží empirických dôkazov a opatrného posudzovania nových tvrdení.`,
        ],
      },
      {
        title: 'Praktické aplikácie',
        paragraphs: [
          `Poznatky z tohto odboru nachádzajú uplatnenie v priemysle, medicíne, poľnohospodárstve a mnohých ďalších oblastiach. Aplikovaný výskum premieňa teoretické objavy na konkrétne riešenia každodenných problémov.`,
          `Technologické inovácie založené na vedeckom výskume zlepšujú kvalitu života a riešia globálne výzvy. Nové diagnostické metódy, šetrnejšie zdroje energie či výkonnejšie materiály sú priamym dôsledkom systematickej vedeckej práce.`,
          `Spolupráca medzi univerzitami, výskumnými ústavmi a súkromným sektorom urýchľuje prenos poznatkov do praxe. Patenty a startupy sú formami, ktorými sa objavy dostávajú k širokej verejnosti.`,
        ],
      },
      {
        title: 'Význam a perspektíva',
        paragraphs: [
          `Vedecké poznanie tvorí základ modernej civilizácie a vzdelávania. Bez neho by nebola možná súčasná medicína, doprava, komunikácia ani porozumenie životnému prostrediu.`,
          `Budúce výzvy zahŕňajú klimatickú zmenu, energetickú udržateľnosť a starnutie populácie. Veda ponúka nástroje na ich riešenie, no potrebuje aj spoločenskú podporu a dlhodobé financovanie.`,
        ],
      },
    ],
  },

  history: {
    intro: (title) =>
      `<p><b>${title}</b> predstavuje významné obdobie alebo udalosť, ktoré formovali ďalší vývoj ľudskej civilizácie. Dôsledky ovplyvňujú súčasnosť dodnes a ich štúdium pomáha pochopiť, prečo svet vyzerá tak, ako vyzerá. Historici skúmajú dochované pramene, archeologické nálezy aj vedecké analýzy, aby čo najpresnejšie zrekonštruovali sled udalostí. Pohľady na minulosť sa s novými objavmi neustále prehodnocujú.</p>`,
    sections: (title) => [
      {
        title: 'Historické pozadie',
        paragraphs: [
          `Pred touto udalosťou existovali špecifické politické, ekonomické a sociálne podmienky, ktoré vytvorili predpoklady pre jej vznik. Spoločnosť prechádzala obdobím premien, počas ktorých sa hromadili neriešené napätia.`,
          `Medzinárodná situácia a vnútorné napätia v spoločnosti zohrali kľúčovú úlohu v procese, ktorý viedol k týmto udalostiam. Diplomatické vzťahy medzi mocnosťami boli krehké a každý incident mohol spustiť reťazec dramatických rozhodnutí.`,
          `Ekonomické faktory ako neúroda, inflácia alebo obchodné krízy oslabovali stabilitu vlád a podporovali vznik opozičných hnutí. Vzdelaná vrstva začala požadovať reformy a širšie politické práva.`,
        ],
      },
      {
        title: 'Priebeh udalostí',
        paragraphs: [
          `Hlavné udalosti sa odohrali v presne dokumentovanom časovom rámci a zahŕňali množstvo významných momentov. Súčasníci ich vnímali ako prelomové, hoci ich dosah si plne uvedomili až ďalšie generácie.`,
          `Rozhodnutia kľúčových osobností mali zásadný vplyv na vývoj situácie a jej konečný výsledok. Bitky, zmluvy a manifesty zostávajú medzníkmi, podľa ktorých sa orientujeme v zložitej spleti dejín.`,
          `Bežní ľudia — roľníci, remeselníci, vojaci či mestskí obyvatelia — niesli tiarchu udalostí na vlastných pleciach. Ich osudy zachytávajú denníky, listy a folklór, ktoré dnes tvoria cenný prameň pre výskum každodennosti.`,
        ],
      },
      {
        title: 'Významné osobnosti',
        paragraphs: [
          `Historické osobnosti tejto epochy zanechali trvalú stopu v dejinách. Ich činy sú predmetom historického výskumu, ktorý sa pokúša rozlíšiť medzi mýtom a realitou. Životopisy týchto postáv sú zároveň oknom do mentality ich doby.`,
          `Lídri, vojenskí velitelia a diplomati formovali priebeh udalostí svojimi rozhodnutiami a stratégiami. V ich tieni však pôsobili aj učenci, duchovní a umelci, ktorých vplyv na verejnú mienku bol často podceňovaný.`,
          `Ženy a menej viditeľné postavy sa do popredia historického výskumu dostali až v posledných desaťročiach. Ich príbehy menia ustálené naratívy a ukazujú, že dejiny tvorili všetci, nielen mocenské elity.`,
        ],
      },
      {
        title: 'Kultúrne a sociálne pomery',
        paragraphs: [
          `Mestské centrá zažívali rozmach obchodu a remesiel, vidiek si zachovával tradičné štruktúry. Cirkev a panovnícky dvor zohrávali úlohu kultúrnych mecénov a šíriteľov vzdelanosti.`,
          `Knihy, hudba, architektúra a výtvarné umenie odrážajú hodnoty doby. Štúdium týchto prameňov pomáha pochopiť, ako ľudia rozmýšľali a čo považovali za dôležité.`,
        ],
      },
      {
        title: 'Dôsledky a odkaz',
        paragraphs: [
          `Bezprostredné dôsledky zahŕňali politické, ekonomické a sociálne zmeny, ktoré pretvorili spoločnosť. Mocenské mapy sa prekreslili, vznikli nové štáty a hranice, niektoré inštitúcie zanikli a iné získali väčšiu váhu.`,
          `Dlhodobý vplyv sa prejavil v medzinárodných vzťahoch, inštitucionálnych reformách a kultúrnych zmenách. Mnohé dnešné zákony, hraničné línie či politické tradície majú korene práve v týchto udalostiach.`,
          `Pamäť na túto epochu sa udržiava prostredníctvom pamätníkov, sviatkov a školského kurikula. Diskusia o tom, ako interpretovať minulosť, je pritom živá aj v súčasnosti.`,
        ],
      },
      {
        title: 'Historiografia',
        paragraphs: [
          `Pohľad historikov na túto tému sa v priebehu generácií menil. Staršie práce kládli dôraz na politické dejiny a vojenské udalosti, novšie integrujú sociálnu, hospodársku a kultúrnu rovinu.`,
          `Pramene zahŕňajú archívne dokumenty, kroniky, korešpondenciu, hmotné pamiatky aj ústne tradície. Kritická analýza prameňov je základom serióznej historickej práce.`,
        ],
      },
    ],
  },

  geography: {
    intro: (title) =>
      `<p><b>${title}</b> je geografická oblasť charakteristická jedinečnými prírodnými podmienkami, kultúrnym dedičstvom a ekonomickým významom. Územie má svoju vlastnú identitu, ktorá sa formovala stáročia pôsobením prírodných aj ľudských faktorov. Krajinou prechádzajú dôležité dopravné a obchodné trasy, ktoré ju spájajú s okolitými regiónmi. Práve geografická poloha často určuje, akým smerom sa bude oblasť vyvíjať a aké výzvy bude musieť riešiť.</p>`,
    sections: (title) => [
      {
        title: 'Poloha a rozloha',
        paragraphs: [
          `Táto oblasť sa nachádza v strategickej polohe, ktorá ovplyvnila jej historický vývoj a súčasný význam. Hraničí s viacerými susednými územiami a leží na prirodzených komunikačných koridoroch.`,
          `Susedné regióny a medzinárodné prepojenia zohrávajú dôležitú úlohu v ekonomických a kultúrnych vzťahoch. Otvorené hranice a členstvo v nadnárodných zoskupeniach uľahčujú pohyb osôb, tovaru a kapitálu.`,
          `Geografické súradnice, nadmorská výška a vzdialenosť od oceánu výrazne ovplyvňujú podnebie aj spôsob života obyvateľov. Tieto faktory tvoria neoddeliteľnú súčasť identity oblasti.`,
        ],
      },
      {
        title: 'Prírodné podmienky',
        paragraphs: [
          `Klíma, reliéf a vodstvo vytvárajú špecifické prírodné prostredie s charakteristickou flórou a faunou. Striedanie ročných období prináša pestré scenérie a podporuje biodiverzitu.`,
          `Prírodné zdroje regiónu poskytujú základ pre ekonomické aktivity a udržateľný rozvoj. Lesy, vodné toky, nerastné suroviny aj úrodná pôda boli vždy lákadlom pre osídľovanie.`,
          `Chránené územia a národné parky zabezpečujú ochranu vzácnych biotopov pre budúce generácie. Ekoturistika a vedecký výskum sú dôležitými funkciami týchto území.`,
        ],
      },
      {
        title: 'Obyvateľstvo a kultúra',
        paragraphs: [
          `Demografická štruktúra odráža historický vývoj a migračné vlny, ktoré formovali súčasnú populáciu. Hustota osídlenia sa líši medzi mestskými centrami a vidieckymi oblasťami.`,
          `Kultúrne tradície, jazyk a náboženstvo vytvárajú jedinečnú identitu miestneho obyvateľstva. Ľudové zvyky, gastronómia a folklór sa odovzdávajú z generácie na generáciu.`,
          `Multikultúrny charakter mnohých miest je výsledkom dlhodobého spolužitia rôznych spoločenstiev. Vzájomné ovplyvňovanie viedlo k vzniku špecifických regionálnych prejavov.`,
        ],
      },
      {
        title: 'Mestá a sídla',
        paragraphs: [
          `Hlavné mestské centrá tvoria ekonomické, administratívne a kultúrne ohniská oblasti. Ich historické jadrá patria často medzi najvyhľadávanejšie turistické destinácie.`,
          `Menšie obce a dediny si zachovávajú tradičný spôsob života a sú dôležitými strážcami nehmotného kultúrneho dedičstva. Spojenie tradície a modernity vytvára jedinečnú atmosféru.`,
        ],
      },
      {
        title: 'Hospodárstvo',
        paragraphs: [
          `Ekonomická štruktúra zahŕňa priemysel, poľnohospodárstvo, služby a turistický ruch. Mix odvetví zaisťuje istú odolnosť voči kolísaniu globálnej ekonomiky.`,
          `Dopravná infraštruktúra spája región s okolím a umožňuje medzinárodnú výmenu tovaru. Cestná, železničná, letecká aj vodná doprava zohrávajú každá svoju úlohu.`,
          `Inovatívne sektory ako informačné technológie, biotechnológie či kreatívny priemysel získavajú v posledných rokoch na význame a prinášajú kvalifikované pracovné príležitosti.`,
        ],
      },
      {
        title: 'Pamiatky a turizmus',
        paragraphs: [
          `Historické pamiatky, prírodné krásy a kultúrne podujatia priťahujú návštevníkov z celého sveta. Niektoré objekty sú zapísané v zozname svetového dedičstva UNESCO.`,
          `Cestovný ruch tvorí významný príjem pre miestnu ekonomiku a podporuje zachovanie tradícií. Lokálne festivaly a remeselné trhy umožňujú návštevníkom spoznať pravú tvár regiónu.`,
        ],
      },
    ],
  },

  person: {
    intro: (title) =>
      `<p><b>${title}</b> je významná osobnosť, ktorá svojou prácou a prínosom zanechala trvalú stopu v histórii. Životná dráha tejto postavy je príkladom toho, ako talent, vytrvalosť a šťastné okolnosti môžu viesť k mimoriadnym výsledkom. Súčasníci aj nasledujúce generácie si jeho odkaz pripomínajú v rôznych kontextoch — odbornom, kultúrnom aj spoločenskom. Štúdium životopisu pomáha pochopiť, ako jednotlivec dokáže ovplyvniť dobu, v ktorej žije.</p>`,
    sections: () => [
      {
        title: 'Životopis',
        paragraphs: [
          `Narodil sa v období, ktoré formovalo jeho svetonázor a životné postoje. Rodinné prostredie a výchova mali zásadný vplyv na jeho budúci vývoj. Skoré skúsenosti z detstva zostali v jeho diele a postojoch viditeľné po celý život.`,
          `Vzdelanie a raná kariéra položili základy pre neskoršie úspechy a umožnili plný rozvoj talentu. Stretnutia s mentormi a vzormi zohrali úlohu pri formovaní jeho originálneho prístupu.`,
          `Osobný život a profesionálne pôsobenie sa u neho prelínali. Priatelia, kolegovia a rodina ho podporovali v náročných obdobiach a inšpirovali pri tvorivých rozhodnutiach.`,
        ],
      },
      {
        title: 'Kariéra a dielo',
        paragraphs: [
          `Profesionálna kariéra zahŕňala významné projekty, objavy alebo diela, ktoré získali medzinárodné uznanie. Každá etapa kariéry priniesla nové výzvy a otvorila ďalšie možnosti tvorby.`,
          `Metodický prístup a originálne myšlienky prispeli k rozvoju príslušného odboru. Schopnosť prepájať zdanlivo nesúvisiace oblasti viedla k objavom, ktoré inšpirovali aj ďalších tvorcov.`,
          `Práca tejto osobnosti zostala dôležitou referenčnou hodnotou aj po desaťročiach. Akademická obec sa k jej výsledkom pravidelne vracia a hľadá v nich nové významy.`,
        ],
      },
      {
        title: 'Hlavné diela a prínos',
        paragraphs: [
          `Najznámejšie diela patria k zlatému fondu odboru a sú predmetom analýzy v učebniciach aj odbornej literatúre. Ich štúdium je súčasťou prípravy budúcich profesionálov.`,
          `Menej známe, no nemenej zaujímavé sú aj raná tvorba a dielo posledného obdobia. Ukazujú vývoj osobnosti a zmeny prístupov, ktoré sa odohrali v priebehu života.`,
        ],
      },
      {
        title: 'Vplyv a nasledovníci',
        paragraphs: [
          `Vplyv na súčasníkov bol značný — viacerí z nich preberali jeho metódy, štýl či myšlienky a rozvíjali ich vlastným spôsobom. Vznikli tak prúdy a školy, ktoré sa hlásili k jeho odkazu.`,
          `Nasledujúce generácie si z jeho diela vyberali to, čo bolo aktuálne pre ich dobu. Diskusie o interpretácii odkazu pokračujú dodnes a ukazujú trvácnosť jeho prínosu.`,
        ],
      },
      {
        title: 'Ocenenia a uznanie',
        paragraphs: [
          `Za svoju prácu získal početné ocenenia a vyznamenania od prestížnych inštitúcií. Niektoré z nich boli udelené ešte počas života, iné posmrtne — ako prejav uznania zo strany odbornej obce.`,
          `Odkaz tejto osobnosti inšpiruje nasledujúce generácie k pokračovaniu v jej práci. Múzeá, pamätné izby a vedecké konferencie pripomínajú jeho prínos a otvárajú priestor pre nové štúdie.`,
          `Sviatky, výročia a pamätné dni venované jeho pamiatke sú príležitosťou, aby si verejnosť pripomenula význam jeho diela. Mediálne pokrytie a knihy pomáhajú odovzdávať poznanie ďalej.`,
        ],
      },
    ],
  },

  technology: {
    intro: (title) =>
      `<p><b>${title}</b> je technologický koncept alebo systém, ktorý významne ovplyvňuje moderný svet a prispieva k technologickému pokroku. Spája poznatky z viacerých vedných odborov a transformuje ich do praktických riešení použiteľných v každodennom živote. Vývoj v tejto oblasti prebieha rýchlym tempom, čo prináša pravidelné zlepšenia výkonu, efektívnosti aj užívateľského komfortu. Súčasne otvára otázky o etike, bezpečnosti a dlhodobých dopadoch na spoločnosť.</p>`,
    sections: () => [
      {
        title: 'Princípy fungovania',
        paragraphs: [
          `Technické základy tohto systému vychádzajú z vedeckých princípov a inžinierskych riešení. Hardvérová a softvérová zložka spolupracujú tak, aby výsledok bol spoľahlivý, rýchly a bezpečný.`,
          `Architektúra a komponenty sú navrhnuté pre optimálny výkon a spoľahlivosť. Modulárny prístup umožňuje výmenu jednotlivých častí bez zásahu do celého systému, čo zjednodušuje údržbu aj inovácie.`,
          `Štandardizácia rozhraní je kľúčom k tomu, aby sa rôzne riešenia od rozličných výrobcov mohli vzájomne dopĺňať. Otvorené špecifikácie urýchľujú rozvoj a znižujú riziko závislosti od jediného dodávateľa.`,
        ],
      },
      {
        title: 'Historický vývoj',
        paragraphs: [
          `Vývoj prebiehal postupne od prvých prototypov po súčasné riešenia. Kľúčové míľniky zahŕňajú významné inovácie a technologické prelomy, ktoré posunuli celý odbor o krok ďalej.`,
          `Príspevky výskumníkov a inžinierov v rôznych krajinách umožnili dosiahnuť súčasnú úroveň. Spolupráca medzi univerzitami, štátnymi laboratóriami a priemyslom urýchlila prenos poznatkov do praxe.`,
          `Niektoré objavy boli výsledkom dlhodobej cieľavedomej práce, iné prišli neočakávane pri riešení iných úloh. História technológií je plná takýchto príkladov synergie a šťastných náhod.`,
        ],
      },
      {
        title: 'Komponenty a architektúra',
        paragraphs: [
          `Systém sa skladá z niekoľkých kľúčových modulov, ktoré sa starajú o spracovanie údajov, komunikáciu a interakciu s používateľom. Každý modul má jasne definované úlohy a rozhrania.`,
          `Bezpečnostné vrstvy chránia údaje pred neautorizovaným prístupom a zaisťujú integritu prenosu. Pravidelné aktualizácie odstraňujú zraniteľnosti a udržiavajú systém v aktuálnom stave.`,
        ],
      },
      {
        title: 'Aplikácie',
        paragraphs: [
          `Praktické aplikácie zasahujú do mnohých oblastí priemyslu, služieb a každodenného života. Od medicíny cez dopravu až po vzdelávanie sa stretávame s prejavmi tejto technológie.`,
          `Ekonomické prínosy zahŕňajú zvýšenie produktivity a vytváranie nových príležitostí. Firmy, ktoré ju včas prijmú, získavajú konkurenčnú výhodu a otvárajú nové trhy.`,
          `Spotrebitelia oceňujú zlepšenú dostupnosť služieb, rýchlejšiu obsluhu a širší výber. Domácnosti a malé podniky tak získavajú nástroje, ktoré boli kedysi rezervované veľkým inštitúciám.`,
        ],
      },
      {
        title: 'Bezpečnosť a etika',
        paragraphs: [
          `Pri zavádzaní novej technológie sa kladie dôraz na bezpečnosť používateľov a ochranu súkromia. Regulácie na národnej i medzinárodnej úrovni stanovujú jasné pravidlá pre prácu s citlivými údajmi.`,
          `Etické otázky sa týkajú napríklad miery automatizácie, dopadu na zamestnanosť a možného zneužitia technológie. Otvorená spoločenská diskusia pomáha hľadať vyvážené riešenia.`,
        ],
      },
      {
        title: 'Budúcnosť',
        paragraphs: [
          `Očakávaný vývoj zahŕňa ďalšie inovácie a rozširovanie oblastí využitia. Prepojenie s umelou inteligenciou, internetom vecí či rozšírenou realitou otvára nové možnosti.`,
          `Výzvy súvisia s bezpečnosťou, udržateľnosťou a etickými aspektmi. Riešenia musia brať do úvahy energetickú náročnosť, dostupnosť pre všetky vrstvy spoločnosti aj vplyv na životné prostredie.`,
          `Kvalifikovaní odborníci budú aj naďalej hľadaným tovarom na trhu práce. Vzdelávanie a celoživotné učenie sa stávajú nevyhnutnosťou pre udržanie kroku s rýchlym technologickým rozvojom.`,
        ],
      },
    ],
  },

  nature: {
    intro: (title) =>
      `<p><b>${title}</b> je prírodný fenomén, druh alebo ekosystém, ktorý je súčasťou komplexnej siete života na Zemi. Jeho štúdium prináša poznatky nielen o samotnom subjekte, ale aj o vzájomných vzťahoch v prírode. Vedci sa zaoberajú jeho biológiou, ekológiou aj evolučnou históriou. Ochrana prírodnej rozmanitosti je jednou z najdôležitejších výziev súčasnosti, pretože každý druh má svoje miesto v krehkej rovnováhe ekosystému.</p>`,
    sections: () => [
      {
        title: 'Charakteristika',
        paragraphs: [
          `Biologické a ekologické vlastnosti definujú tento prírodný fenomén a jeho úlohu v ekosystéme. Anatomické znaky, fyziologické procesy aj správanie sú výsledkom dlhodobej evolúcie.`,
          `Morfologické znaky a životné prejavy sú predmetom vedeckého výskumu. Výskumníci využívajú terénne pozorovanie, laboratórne metódy aj genetické analýzy, aby získali ucelený obraz.`,
          `Životný cyklus zahŕňa rôzne fázy, počas ktorých sa menia potreby aj zraniteľnosť. Pochopenie týchto fáz je dôležité pre ochranárske opatrenia a manažment populácií.`,
        ],
      },
      {
        title: 'Výskyt a rozšírenie',
        paragraphs: [
          `Geografické rozšírenie zahŕňa špecifické biotopy a ekologické niky, ktoré poskytujú vhodné podmienky pre prežitie. Hranice areálu sa môžu meniť v závislosti od klimatických zmien a ľudskej činnosti.`,
          `Faktory ovplyvňujúce výskyt zahŕňajú klimatické podmienky, dostupnosť zdrojov a interakcie s inými druhmi. Niektoré populácie majú stabilné rozšírenie, iné sú ohrozené alebo migrujú podľa sezóny.`,
          `Mapovanie výskytu je dôležitým nástrojom ochrany prírody. Spolupráca dobrovoľníkov a vedcov vytvára databázy, ktoré pomáhajú pri rozhodovaní o ochranárskych opatreniach.`,
        ],
      },
      {
        title: 'Životný cyklus a správanie',
        paragraphs: [
          `Reprodukcia, rast a starnutie sú kľúčové fázy, počas ktorých sa formuje budúca populácia. Stratégie rozmnožovania sa líšia podľa druhu a sú prispôsobené konkrétnym ekologickým podmienkam.`,
          `Sociálne správanie, komunikácia a vzťahy medzi jedincami patria k najfascinujúcejším oblastiam výskumu. Výskumníci odhaľujú stále nové formy spolupráce, hierarchie aj komunikácie v živej prírode.`,
        ],
      },
      {
        title: 'Ekologický význam',
        paragraphs: [
          `Úloha v ekosystéme zahŕňa potravné vzťahy a ekologické služby, ktoré sú nepostrádateľné pre fungovanie celej prírodnej siete. Zánik jediného článku môže spôsobiť reťazové efekty.`,
          `Biodiverzita a jej ochrana sú kľúčové pre zachovanie prírodnej rovnováhy. Pestrá paleta druhov zvyšuje odolnosť ekosystémov voči chorobám, klimatickým zmenám aj iným narušeniam.`,
          `Niektoré druhy sú indikátormi kvality životného prostredia. Ich stav umožňuje vedcom rýchlo zhodnotiť zdravie ekosystému a navrhnúť opatrenia na nápravu.`,
        ],
      },
      {
        title: 'Vzťah s človekom',
        paragraphs: [
          `Ľudská kultúra od pradávna reflektuje prírodu v mýtoch, umení aj jazyku. Tradičné poznanie miestnych komunít je cenným zdrojom informácií, ktorý dopĺňa modernú vedu.`,
          `Hospodárske využitie prírodných zdrojov si vyžaduje rovnováhu medzi potrebami človeka a ochranou ekosystému. Princíp udržateľnosti sa stáva normou pri plánovaní zásahov do krajiny.`,
        ],
      },
      {
        title: 'Ochrana a hrozby',
        paragraphs: [
          `Ohrozujúce faktory zahŕňajú klimatické zmeny, stratu biotopov a ľudskú činnosť. Znečistenie, fragmentácia krajiny a nelegálny obchod patria medzi najvážnejšie problémy súčasnosti.`,
          `Ochranárske programy a legislatíva smerujú k zachovaniu prírodného dedičstva. Národné parky, chránené krajinné oblasti a medzinárodné dohovory tvoria sieť, ktorá sa snaží spomaliť úbytok biodiverzity.`,
          `Vzdelávanie verejnosti a osvetové kampane zohrávajú dôležitú úlohu pri formovaní postojov. Aktivisti, vedci aj učitelia spoločne pracujú na tom, aby sa ochrana prírody stala súčasťou každodenného uvažovania.`,
        ],
      },
    ],
  },

  general: {
    intro: (title) =>
      `<p><b>${title}</b> je dôležitý pojem, ktorý ovplyvňuje rôzne oblasti ľudského života a spoločnosti. Jeho štúdium prepája viaceré disciplíny a prináša poznatky využiteľné v každodennej praxi. Vývoj chápania tohto pojmu odráža premeny doby, v ktorej sa používal. Aktuálne výskumy a diskusie ukazujú, že téma zostáva relevantná aj v súčasnosti a ponúka stále nové uhly pohľadu.</p>`,
    sections: () => [
      {
        title: 'Prehľad a definícia',
        paragraphs: [
          `Tento pojem zahŕňa široké spektrum aspektov a má korene v historickom vývoji ľudskej civilizácie. V odbornej literatúre sa s ním stretávame v rôznych významových odtieňoch, ktoré odrážajú špecifické potreby jednotlivých disciplín.`,
          `Definícia a vymedzenie sa líšia podľa kontextu a odboru, v ktorom sa používa. Niektoré definície sú úzke a presné, iné ponechávajú priestor pre širšiu interpretáciu.`,
          `Pochopenie základných pojmov je predpokladom hlbšieho štúdia témy. Učebnice a slovníky ponúkajú spravidla konsenzuálnu verziu, ale skutočná diskusia o presnom obsahu prebieha v odborných kruhoch.`,
        ],
      },
      {
        title: 'Historický vývoj',
        paragraphs: [
          `Vývoj tohto pojmu prebiehal v súvislosti so spoločenskými a technologickými zmenami. Každá epocha priniesla nové akcenty a interpretácie, ktoré sa pridávali k pôvodnému jadru.`,
          `Kľúčové míľniky formovali súčasné chápanie a aplikácie. Diela jednotlivých autorov a školské tradície zanechali stopu, ktorá je dodnes čitateľná v terminológii a metódach.`,
          `Komparatívne štúdie ukazujú, ako sa pojem chápal v rôznych kultúrach. Rozdiely odrážajú špecifické historické skúsenosti a hodnotové rámce jednotlivých spoločenstiev.`,
        ],
      },
      {
        title: 'Hlavné prvky',
        paragraphs: [
          `Téma sa skladá z viacerých zložiek, ktoré spolupracujú a vzájomne sa ovplyvňujú. Každá zložka má svoju vlastnú logiku, no zmysel získava až v kontexte celku.`,
          `Vzťahy medzi prvkami sú často dynamické — menia sa v čase, v závislosti od vonkajších podmienok aj vnútorných procesov. Štúdium týchto zmien patrí k najzaujímavejším oblastiam výskumu.`,
        ],
      },
      {
        title: 'Význam a aplikácie',
        paragraphs: [
          `Praktický význam sa prejavuje v mnohých oblastiach života a profesionálnej činnosti. Inštitúcie, podniky aj jednotlivci sa s ňou stretávajú pri rozhodovaní a plánovaní.`,
          `Spoločenské implikácie ovplyvňujú organizáciu a fungovanie spoločnosti. Verejné politiky a legislatíva nezriedka reagujú na to, ako sa pojem chápe v aktuálnom diskurze.`,
          `Vzdelávacie inštitúcie venujú téme priestor v učebných osnovách na rôznych stupňoch. Pochopenie základov je predpokladom pre fundovanú diskusiu aj pre prácu odborníkov.`,
        ],
      },
      {
        title: 'Súčasné trendy',
        paragraphs: [
          `Aktuálne diskusie sa sústreďujú na otázky, ktoré priniesli nové technológie, globalizácia a kultúrne zmeny. Odpovede zatiaľ nie sú jednotné a vytvárajú priestor pre ďalší výskum.`,
          `Interdisciplinárny prístup sa javí ako najsľubnejšia cesta k pochopeniu zložitej reality. Spolupráca odborov, ktoré sa kedysi vyvíjali oddelene, prináša cenné výsledky.`,
        ],
      },
    ],
  },
};

// ────────────────────────────────────────────────────────────────────────────
// PRIRODZENÉ VSUVKY PRE FORCE SLOVÁ
//
// Cieľom je integrovať odkazy do textu tak, aby pôsobili ako prirodzená
// súčasť odborného opisu, nie ako zoznam "Pozri tiež". Šablóny zámerne
// nepoužívajú formuláciu "Pozri tiež" — tá sa objaví iba raz na konci článku.
//
// Existujú dva typy šablón:
//   - SINGLE: vsunie 1 odkaz (krátka prirodzená vsuvka).
//   - LIST:   vsunie 3 odkazy v jednej vete ako výpočet príkladov.
// Výpočet 3 odkazov v jednej vete pôsobí prirodzenejšie ako tri samostatné
// vety za sebou.
// ────────────────────────────────────────────────────────────────────────────

const SINGLE_TEMPLATES: Record<ArticleCategory, string[]> = {
  culture: [
    'Spomenúť možno aj {WORD}.',
    'V umeleckom kontexte sa občas objavuje i {WORD}.',
    'Príbuzným pojmom je {WORD}.',
    'Pozornosť si zaslúži tiež {WORD}.',
    'Z tejto oblasti pochádza aj {WORD}.',
    'Inšpiratívnym príkladom je {WORD}.',
    'Bežne sa spomína i {WORD}.',
    'V odbornej literatúre figuruje aj {WORD}.',
    'Nemenej dôležité je {WORD}.',
    'Súvis má aj {WORD}.',
    'Tematicky blízke je {WORD}.',
    'V podobnom duchu funguje aj {WORD}.',
    'Tvorcovia často reflektujú aj {WORD}.',
    'Príbuznou výrazovou formou je {WORD}.',
    'V kontexte epochy nájdeme aj {WORD}.',
    'Kultúrna tradícia zahŕňa aj {WORD}.',
    'V dejinách umenia sa objavuje aj {WORD}.',
    'Štýlovo príbuzné je {WORD}.',
    'Teoretici v tejto súvislosti analyzujú aj {WORD}.',
    'Estetický rozmer má aj {WORD}.',
  ],
  sport: [
    'Bežne sa spomína i {WORD}.',
    'Príbuznou oblasťou je {WORD}.',
    'Známym pojmom je {WORD}.',
    'Spomenúť možno tiež {WORD}.',
    'Pozornosť si zaslúži aj {WORD}.',
    'V tomto kontexte figuruje i {WORD}.',
    'Súvis má aj {WORD}.',
    'Z tohto okruhu pochádza aj {WORD}.',
    'Bežnou súčasťou je tiež {WORD}.',
    'Spomína sa i {WORD}.',
    'Tréningové metódy zahŕňajú aj {WORD}.',
    'Športová príprava často využíva {WORD}.',
    'V rámci kondičnej prípravy sa aplikuje aj {WORD}.',
    'Disciplína má súvis s {WORD}.',
    'Pravidlá zohľadňujú aj {WORD}.',
    'V histórii športu nájdeme aj {WORD}.',
    'Súťažný systém zahŕňa aj {WORD}.',
    'Medzi príbuzné aktivity patrí {WORD}.',
    'V tomto športe sa uplatňuje aj {WORD}.',
    'Športovci často kombinujú s {WORD}.',
  ],
  science: [
    'V odbornej literatúre sa stretáme aj s pojmom {WORD}.',
    'Príbuznou témou je {WORD}.',
    'Skúma sa tiež {WORD}.',
    'Medzi študované javy patrí i {WORD}.',
    'Pozornosť výskumu si získalo aj {WORD}.',
    'Spomenúť možno tiež {WORD}.',
    'Súvis má aj {WORD}.',
    'V tejto súvislosti sa objavuje i {WORD}.',
    'Známym príkladom je {WORD}.',
    'Skúmaným javom je tiež {WORD}.',
    'Vedecká metóda sa aplikuje aj na {WORD}.',
    'Experimentálne sa overuje aj {WORD}.',
    'Teoretické modely zahŕňajú aj {WORD}.',
    'V laboratórnych podmienkach sa analyzuje aj {WORD}.',
    'Interdisciplinárny prístup spája aj {WORD}.',
    'Výskumné tímy sa zaoberajú aj {WORD}.',
    'Hypotézy sa formulujú aj pre {WORD}.',
    'Publikácie uvádzajú aj {WORD}.',
    'Metodológia výskumu zahŕňa aj {WORD}.',
    'Vedecké konferencie prezentujú aj {WORD}.',
  ],
  history: [
    'V tom čase pôsobilo aj {WORD}.',
    'Spomenúť treba i {WORD}.',
    'Príbuznou témou je {WORD}.',
    'V dobových prameňoch nájdeme aj {WORD}.',
    'V dejinách rezonuje aj pojem {WORD}.',
    'Pozornosť si zaslúži tiež {WORD}.',
    'Súvis má aj {WORD}.',
    'V odbornej literatúre figuruje i {WORD}.',
    'Bežne sa spomína i {WORD}.',
    'Známym fenoménom je tiež {WORD}.',
    'Historické pramene dokumentujú aj {WORD}.',
    'V kontexte epochy sa objavuje aj {WORD}.',
    'Archeológia odkrýva aj {WORD}.',
    'Kroniky zaznamenávajú aj {WORD}.',
    'Dobový význam mal aj {WORD}.',
    'Historiografia analyzuje aj {WORD}.',
    'V súvislosti s obdobím sa spomína aj {WORD}.',
    'Archívne dokumenty obsahujú aj {WORD}.',
    'Výskum dejín zahŕňa aj {WORD}.',
    'V kultúrno-historickom kontexte sa objavuje aj {WORD}.',
  ],
  geography: [
    'V tejto oblasti sa nachádza aj {WORD}.',
    'Spomenúť možno i {WORD}.',
    'Príbuznou lokalitou je {WORD}.',
    'V regióne sa stretáme i s pojmom {WORD}.',
    'Známym miestom je tiež {WORD}.',
    'Súvis má aj {WORD}.',
    'Pozornosť cestovateľov si získalo aj {WORD}.',
    'V geografickej literatúre sa uvádza i {WORD}.',
    'Bežnou súčasťou regiónu je {WORD}.',
    'Charakteristickým javom je aj {WORD}.',
    'V blízkosti sa nachádza aj {WORD}.',
    'Topografia zahŕňa aj {WORD}.',
    'Kartografia zaznamenáva aj {WORD}.',
    'Klimatické podmienky ovplyvňujú aj {WORD}.',
    'V krajinnej mozaike sa objavuje aj {WORD}.',
    'Geomorfológia popisuje aj {WORD}.',
    'Územie zahŕňa aj {WORD}.',
    'V prírodnom prostredí nájdeme aj {WORD}.',
    'Regionálna geografia študuje aj {WORD}.',
    'Z hľadiska reliéfu je významné aj {WORD}.',
  ],
  person: [
    'Súčasníkom bol aj {WORD}.',
    'V podobnej oblasti pôsobil tiež {WORD}.',
    'Spomenúť možno i {WORD}.',
    'Inšpiroval sa ním aj {WORD}.',
    'Pozornosť si zaslúži tiež {WORD}.',
    'Súvis má aj {WORD}.',
    'V odbornej literatúre figuruje i {WORD}.',
    'Známou postavou je tiež {WORD}.',
    'Príbuznou témou je {WORD}.',
    'Spomína sa i {WORD}.',
    'V profesionálnom živote sa stretol aj s {WORD}.',
    'Spolupracoval aj s {WORD}.',
    'Jeho dielo ovplyvnilo aj {WORD}.',
    'V biografii sa objavuje aj {WORD}.',
    'Korešpondencia obsahuje zmienky o {WORD}.',
    'Kariéra zahŕňala aj {WORD}.',
    'V období pôsobenia existovalo aj {WORD}.',
    'Životný príbeh prepája aj {WORD}.',
    'Medzi významných súčasníkov patrí aj {WORD}.',
    'V kontexte jeho doby sa spomína aj {WORD}.',
  ],
  technology: [
    'V odbornej praxi sa využíva aj {WORD}.',
    'Príbuzným riešením je {WORD}.',
    'Spomenúť možno i {WORD}.',
    'V tejto oblasti figuruje tiež {WORD}.',
    'Známym pojmom je {WORD}.',
    'Bežne sa používa i {WORD}.',
    'Súvis má aj {WORD}.',
    'Pozornosť si získalo tiež {WORD}.',
    'Z tohto okruhu pochádza aj {WORD}.',
    'Často sa popri tom uplatní i {WORD}.',
    'Technická dokumentácia zahŕňa aj {WORD}.',
    'V systémovej architektúre sa využíva aj {WORD}.',
    'Inžinierska prax pozná aj {WORD}.',
    'Výrobný proces zahŕňa aj {WORD}.',
    'Technologický vývoj priniesol aj {WORD}.',
    'V digitálnom prostredí sa aplikuje aj {WORD}.',
    'Hardware aj software využívajú aj {WORD}.',
    'Automatizácia sa opiera aj o {WORD}.',
    'V inovatívnych riešeniach nájdeme aj {WORD}.',
    'Technické štandardy definujú aj {WORD}.',
  ],
  nature: [
    'V podobnom prostredí žije aj {WORD}.',
    'Príbuzným druhom je {WORD}.',
    'Spomenúť možno i {WORD}.',
    'V tom istom ekosystéme sa vyskytuje tiež {WORD}.',
    'Pozornosť výskumu si získalo aj {WORD}.',
    'Súvis má aj {WORD}.',
    'V odbornej literatúre sa uvádza i {WORD}.',
    'Známym predstaviteľom je tiež {WORD}.',
    'Charakteristickým prvkom je aj {WORD}.',
    'Bežne sa stretáme i s pojmom {WORD}.',
    'V prírodnom prostredí nájdeme aj {WORD}.',
    'Ekológia sa zaoberá aj {WORD}.',
    'V potravinovom reťazci figuruje aj {WORD}.',
    'Biodiverzita zahŕňa aj {WORD}.',
    'V rovnakom biotope žije aj {WORD}.',
    'Evolučne príbuzné je aj {WORD}.',
    'V prírodnej rezervácii sa vyskytuje aj {WORD}.',
    'Botanické záhrady prezentujú aj {WORD}.',
    'V zoologických záhradách nájdeme aj {WORD}.',
    'Prírodná krajina zahŕňa aj {WORD}.',
  ],
  general: [
    'Spomenúť možno i {WORD}.',
    'Príbuznou oblasťou je {WORD}.',
    'V odbornej literatúre figuruje aj {WORD}.',
    'Pozornosť si zaslúži tiež {WORD}.',
    'Súvis má aj {WORD}.',
    'Bežne sa spomína i {WORD}.',
    'Známym pojmom je {WORD}.',
    'Z tejto oblasti pochádza aj {WORD}.',
    'Charakteristickým prvkom je tiež {WORD}.',
    'V tomto kontexte sa objavuje i {WORD}.',
    'V bežnom živote sa stretávame aj s {WORD}.',
    'Prax ukazuje význam aj {WORD}.',
    'Definícia zahŕňa aj {WORD}.',
    'V širšom ponímaní patrí sem aj {WORD}.',
    'Koncepčne súvisí aj {WORD}.',
    'Typickým príkladom je aj {WORD}.',
    'V odbornom diskurze sa analyzuje aj {WORD}.',
    'Štúdie sa venujú aj {WORD}.',
    'V praxi sa aplikuje aj {WORD}.',
    'Komplementárnym pojmom je {WORD}.',
  ],
};

const LIST_TEMPLATES: Record<ArticleCategory, string[]> = {
  culture: [
    'Medzi známe pojmy patria napríklad {W1}, {W2} či {W3}.',
    'V tejto oblasti sú významné aj {W1}, {W2} alebo {W3}.',
    'Spomenúť možno tiež {W1}, {W2} a {W3}.',
    'K typickým predstaviteľom patria {W1}, {W2} či {W3}.',
    'Príkladmi sú napríklad {W1}, {W2} a {W3}.',
    'Z tejto oblasti pochádzajú aj {W1}, {W2} a {W3}.',
    'Umelecká tradícia spája {W1}, {W2} a {W3}.',
    'V kultúrnom dedičstve figurujú {W1}, {W2} či {W3}.',
    'Štýlovo príbuzné sú {W1}, {W2} a {W3}.',
    'Tvorcovia sa inšpirovali aj {W1}, {W2} alebo {W3}.',
  ],
  sport: [
    'Medzi príbuzné disciplíny patria napríklad {W1}, {W2} či {W3}.',
    'Známymi pojmami sú aj {W1}, {W2} a {W3}.',
    'Spomenúť možno tiež {W1}, {W2} alebo {W3}.',
    'V tejto súvislosti sa stretáme s pojmami {W1}, {W2} a {W3}.',
    'Bežnou súčasťou sú {W1}, {W2} či {W3}.',
    'K typickým prvkom patria {W1}, {W2} a {W3}.',
    'Tréningová príprava zahŕňa {W1}, {W2} a {W3}.',
    'V športovej terminológii sa používajú {W1}, {W2} či {W3}.',
    'Súťažné kategórie zahŕňajú {W1}, {W2} a {W3}.',
    'Športovci kombinujú {W1}, {W2} alebo {W3}.',
  ],
  science: [
    'V tejto disciplíne sa študujú aj javy ako {W1}, {W2} či {W3}.',
    'Medzi súvisiace pojmy patria {W1}, {W2} a {W3}.',
    'Skúma sa tiež {W1}, {W2} alebo {W3}.',
    'Známymi príkladmi sú {W1}, {W2} a {W3}.',
    'V odbornej literatúre nájdeme aj {W1}, {W2} a {W3}.',
    'K študovaným javom patria napríklad {W1}, {W2} či {W3}.',
    'Vedecká metóda analyzuje {W1}, {W2} a {W3}.',
    'Experimentálne sa overujú {W1}, {W2} či {W3}.',
    'Teoretické modely zahŕňajú {W1}, {W2} a {W3}.',
    'Výskumníci publikujú o {W1}, {W2} alebo {W3}.',
  ],
  history: [
    'V tom istom období sa spomínajú aj {W1}, {W2} a {W3}.',
    'V dobových prameňoch figurujú aj {W1}, {W2} či {W3}.',
    'Známymi pojmami sú tiež {W1}, {W2} a {W3}.',
    'Spomenúť možno aj {W1}, {W2} alebo {W3}.',
    'V dejinách rezonujú aj {W1}, {W2} a {W3}.',
    'K dôležitým fenoménom patria {W1}, {W2} a {W3}.',
    'Historické pramene dokumentujú {W1}, {W2} a {W3}.',
    'V archívoch nájdeme zmienky o {W1}, {W2} či {W3}.',
    'Doba pozná aj {W1}, {W2} a {W3}.',
    'Kroniky zaznamenávajú {W1}, {W2} alebo {W3}.',
  ],
  geography: [
    'Medzi blízke lokality patria {W1}, {W2} a {W3}.',
    'V regióne nájdeme aj {W1}, {W2} či {W3}.',
    'Známymi miestami sú tiež {W1}, {W2} a {W3}.',
    'Spomenúť možno aj {W1}, {W2} alebo {W3}.',
    'Charakteristickými prvkami sú {W1}, {W2} a {W3}.',
    'K typickým útvarom patria napríklad {W1}, {W2} či {W3}.',
    'V krajinnej mozaike sa objavujú {W1}, {W2} a {W3}.',
    'Topografia zahŕňa {W1}, {W2} či {W3}.',
    'Prírodné podmienky formujú {W1}, {W2} a {W3}.',
    'Kartografia zaznamenáva {W1}, {W2} alebo {W3}.',
  ],
  person: [
    'V podobnej oblasti pôsobili aj {W1}, {W2} a {W3}.',
    'Súčasníkmi boli tiež {W1}, {W2} či {W3}.',
    'Známymi postavami sú aj {W1}, {W2} a {W3}.',
    'Spomenúť možno tiež {W1}, {W2} alebo {W3}.',
    'Inšpiráciou boli aj {W1}, {W2} a {W3}.',
    'K dôležitým menám patria {W1}, {W2} a {W3}.',
    'V biografiách figurujú {W1}, {W2} a {W3}.',
    'Spolupracovníkmi boli {W1}, {W2} či {W3}.',
    'V profesionálnom živote sa stretol s {W1}, {W2} a {W3}.',
    'Medzi významných súčasníkov patria {W1}, {W2} alebo {W3}.',
  ],
  technology: [
    'V odbornej praxi sa využívajú aj {W1}, {W2} či {W3}.',
    'Príbuznými riešeniami sú {W1}, {W2} a {W3}.',
    'Známymi pojmami sú tiež {W1}, {W2} a {W3}.',
    'Spomenúť možno aj {W1}, {W2} alebo {W3}.',
    'Bežne sa používajú aj {W1}, {W2} a {W3}.',
    'K typickým komponentom patria {W1}, {W2} a {W3}.',
    'Technická dokumentácia uvádza {W1}, {W2} a {W3}.',
    'V systémovej architektúre nájdeme {W1}, {W2} či {W3}.',
    'Inžinierske riešenia zahŕňajú {W1}, {W2} a {W3}.',
    'Digitálna transformácia využíva {W1}, {W2} alebo {W3}.',
  ],
  nature: [
    'V podobnom prostredí žijú aj {W1}, {W2} a {W3}.',
    'Príbuznými druhmi sú {W1}, {W2} či {W3}.',
    'Známymi predstaviteľmi sú tiež {W1}, {W2} a {W3}.',
    'V tom istom ekosystéme sa vyskytujú aj {W1}, {W2} a {W3}.',
    'Spomenúť možno aj {W1}, {W2} alebo {W3}.',
    'Charakteristickými prvkami sú {W1}, {W2} a {W3}.',
    'V prírodnej rezervácii nájdeme {W1}, {W2} a {W3}.',
    'Ekologická nika zahŕňa {W1}, {W2} či {W3}.',
    'Biodiverzitu tvoria {W1}, {W2} a {W3}.',
    'V potravinovom reťazci figurujú {W1}, {W2} alebo {W3}.',
  ],
  general: [
    'Medzi súvisiace pojmy patria napríklad {W1}, {W2} a {W3}.',
    'V odbornej literatúre figurujú aj {W1}, {W2} či {W3}.',
    'Spomenúť možno tiež {W1}, {W2} a {W3}.',
    'Známymi pojmami sú aj {W1}, {W2} a {W3}.',
    'K typickým prvkom patria {W1}, {W2} alebo {W3}.',
    'Bežne sa spomínajú aj {W1}, {W2} a {W3}.',
    'Definícia zahŕňa aj {W1}, {W2} a {W3}.',
    'V praxi sa stretávame s {W1}, {W2} či {W3}.',
    'Teoreticky súvisia {W1}, {W2} a {W3}.',
    'Komplementárnymi pojmami sú {W1}, {W2} alebo {W3}.',
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// VLASTNÉ MENÁ — zachovávajú veľké začiatočné písmeno
// ────────────────────────────────────────────────────────────────────────────

const PROPER_NOUNS = new Set([
  // Kontinenty
  'afrika', 'amerika', 'antarktída', 'arktída', 'ázia', 'austrália', 'európa', 'oceánia',
  // Krajiny (skrátený zoznam — pre ostatné sa veľkosť písmena zachová automaticky cez kontrolu v geography)
  'slovensko', 'česko', 'poľsko', 'nemecko', 'rakúsko', 'maďarsko', 'francúzsko',
  'španielsko', 'taliansko', 'grécko', 'anglicko', 'írsko', 'rusko', 'ukrajina',
  'fínsko', 'švédsko', 'nórsko', 'dánsko', 'holandsko', 'belgicko', 'portugalsko',
  'rumunsko', 'bulharsko', 'srbsko', 'chorvátsko', 'slovinsko', 'bosna', 'albánsko',
  'turecko', 'cyprus', 'malta', 'island', 'japonsko', 'čína', 'india', 'kórea',
  'thajsko', 'vietnam', 'filipíny', 'indonézia', 'malajzia', 'singapur', 'taiwan',
  'irán', 'irak', 'sýria', 'libanon', 'izrael', 'jordánsko', 'egypt', 'maroko',
  'kanada', 'mexiko', 'brazília', 'argentína', 'čile', 'peru', 'kolumbia',
  'kuba', 'estónsko', 'litva', 'lotyšsko', 'luxembursko', 'švajčiarsko',
  // Mestá
  'bratislava', 'košice', 'praha', 'viedeň', 'budapešť', 'varšava', 'berlín', 'mníchov',
  'paríž', 'londýn', 'madrid', 'barcelona', 'rím', 'miláno', 'atény', 'amsterdam',
  'brusel', 'moskva', 'kyjev', 'istanbul', 'ankara', 'peking', 'šanghaj', 'tokio',
  'dublin', 'oslo', 'helsinki', 'štokholm', 'kodaň', 'lisabon', 'káhira', 'belehrad',
  // Hory, rieky, oceány
  'sahara', 'amazónia', 'nil', 'dunaj', 'volga', 'mississippi', 'ganga', 'temža',
  'himaláje', 'alpy', 'karpaty', 'tatry', 'tatra', 'ural', 'andy', 'pyreneje',
  'tichý oceán', 'atlantik', 'kaspické more', 'baltské more', 'jadran', 'everest',
  'kilimandžáro', 'balaton', 'rajn',

  // Geografické názvy — automatické doplnenie (krajiny, regióny, mestá,
  // rieky a pohoria si ponechávajú veľké písmeno aj v strede vety)
  'balkán', 'karibik', 'patagónia', 'polynézia', 'sibír', 'škandinávia', 'apeniny', 'arabský polostrov', 'atika', 'bavorsko', 'bengálsko', 'benelux', 'borneo', 'bretónsko', 'britské ostrovy', 'burgenland', 'byzantium', 'čiernohorský region', 'dalmácia', 'dordogne', 'durínsko', 'elzas', 'flámsko', 'frízsko', 'galícia', 'grónsko', 'havaj', 'hesensko', 'ibéria', 'indočína', 'jadrán', 'jutsko', 'kalábria', 'katalánsko', 'kaukaz', 'kodaňský región', 'korutánsko', 'kosovo', 'kraňsko', 'krym', 'kurily', 'laponsko', 'lotrínsko', 'lombardia', 'macedónia', 'magnesia', 'mezopotámia', 'molise', 'morava', 'moskovská oblasť', 'normandie', 'núbia', 'okinawa', 'palestína', 'piemonte', 'pomerania', 'provence', 'prusko', 'rýnsko', 'sasko', 'sicília', 'sliezsko', 'stredomorie', 'švábsko', 'tirolsko', 'toskánsko', 'transylvánia', 'turkestan', 'umbria', 'valónia', 'veneto', 'viedenský les', 'vojvodina', 'wales', 'záporožie', 'bielorusko', 'bolívia', 'etiópia', 'gruzínsko', 'kambodža', 'katar', 'kazachstan', 'keňa', 'monako', 'mongolsko', 'nepál', 'nigéria', 'pakistan', 'sudán', 'tunisko', 'uruguay', 'vatikán', 'venezuela', 'afganistan', 'alžírsko', 'andorra', 'angola', 'arménsko', 'azerbajdžan', 'bahamy', 'bahrajn', 'bangladéš', 'barbados', 'belize', 'benin', 'bhután', 'botswana', 'brunei', 'burundi', 'čad', 'dominika', 'dominikánska republika', 'džibutsko', 'ekvádor', 'eritrea', 'fidži', 'gabun', 'gambia', 'ghana', 'grenada', 'guatemala', 'guinea', 'guyana', 'haiti', 'honduras', 'jamajka', 'jemen', 'kapverdy', 'kamerun', 'kirgizsko', 'kiribati', 'komory', 'kongo', 'kostarika', 'kuvajt', 'laos', 'lesotho', 'libéria', 'líbya', 'lichtenštajnsko', 'madagaskar', 'malawi', 'maldivy', 'mali', 'marshallove ostrovy', 'maurícius', 'mauritánia', 'mikronézia', 'moldavsko', 'mozambik', 'mjanmarsko', 'namíbia', 'nauru', 'nikaragua', 'niger', 'omán', 'palau', 'panama', 'paraguay', 'rwanda', 'salvador', 'samoa', 'senegal', 'seychely', 'somálsko', 'stredoafrická republika', 'surinam', 'svazijsko', 'tadžikistan', 'tanzánia', 'togo', 'tonga', 'turkménsko', 'tuvalu', 'uganda', 'uzbekistan', 'vanuatu', 'zambia', 'zimbabwe', 'bagdad', 'bombaj', 'bukurešť', 'damask', 'frankfurt', 'hamburg', 'krakov', 'manila', 'neapol', 'ottawa', 'riga', 'sofia', 'sydney', 'tallinn', 'tirana', 'toronto', 'vilnius', 'záhreb', 'adelaide', 'akra', 'alžír', 'ammán', 'antverpy', 'astana', 'auckland', 'austin', 'baku', 'baltimore', 'bangalúr', 'bangkok', 'bejrút', 'belém', 'bern', 'birmingham', 'bogotá', 'bologna', 'boston', 'brasília', 'brisbane', 'bukurešť', 'calgary', 'caracas', 'cardiff', 'casablanca', 'čennai', 'chicago', 'colombo', 'dakar', 'dallas', 'denver', 'detroit', 'dubaj', 'düsseldorf', 'edinburgh', 'edmonton', 'florencia', 'fukuoka', 'gdaňsk', 'ženeva', 'göteborg', 'guangzhou', 'haifa', 'halifax', 'hanoi', 'havana', 'hirošima', 'hongkong', 'houston', 'charkov', 'christchurch', 'innsbruck', 'islamabad', 'izmir', 'jakarta', 'jerevan', 'johannesburg', 'kalkata', 'karáči', 'kathmandu', 'kijov', 'kinshasa', 'kyoto', 'lagos', 'lahore', 'leeds', 'leipzig', 'lima', 'liverpool', 'lübeck', 'lyon', 'malmö', 'manchester', 'marseille', 'mekka', 'melbourne', 'memphis', 'miami', 'milwaukee', 'minneapolis', 'minsk', 'montevideo', 'montpellier', 'montreal', 'mumbai', 'nagoja', 'nairobi', 'nantes', 'nice', 'novosibirsk', 'ósaka', 'perth', 'philadelphia', 'phoenix', 'pittsburgh', 'portland', 'porto', 'poznaň', 'puebla', 'quebec', 'quito', 'rabat', 'recife', 'reykjavík', 'rotterdam', 'salvador', 'santiago', 'sarajevo', 'seattle', 'sevilla', 'soul', 'štrasburg', 'stuttgart', 'surabaja', 'tchaj-pej', 'teherán', 'thessaloniki', 'tijuana', 'toulouse', 'tripolis', 'tunis', 'turín', 'valencia', 'vancouver', 'veracruz', 'vladivostok', 'volgograd', 'washington', 'wellington', 'wroclaw', 'zagreb', 'zürich', 'duna', 'gejzír', 'aconcagua', 'amazonka', 'anapurna', 'azorské ostrovy', 'baikal', 'bajkálske jazero', 'barentsovo more', 'bosporský prieliv', 'čierny les', 'čierne more', 'colorado', 'dardanely', 'etna', 'eufrat', 'faerské ostrovy', 'fujisan', 'galapágy', 'gibraltár', 'gobi', 'grónske more', 'havajské ostrovy', 'helgoland', 'hudson', 'indický oceán', 'iguaçu', 'irtyš', 'java', 'jungfrau', 'k2', 'kanárske ostrovy', 'kavkaz', 'kenya', 'kilauea', 'kolorado', 'kongo', 'krakatoa', 'krím', 'ladožské jazero', 'loire', 'mackenzie', 'madeira', 'malorka', 'maldive', 'maňa', 'matterhorn', 'mekong', 'murray', 'namib', 'niagarské vodopády', 'níger', 'nílska delta', 'ob', 'orinoco', 'panamský prieplav', 'patagonský ľadovec', 'perzský záliv', 'popocatépetl', 'rhône', 'rysy', 'seina', 'severnomorský prieliv', 'severný pól', 'sinai', 'stredozemné more', 'suezský prieplav', 'sumatra', 'sundské ostrovy', 'tanganika', 'tiber', 'tibetská náhorná plošina', 'tigris', 'transandinská cesta', 'tunguzka', 'veľké jazerá', 'veľké soľné jazero', 'vesuvius', 'vihorlat', 'yukon', 'zambezi', 'zelený mys', 'zemplín',
  
  // Slovenské regióny z rozširujúcich zoznamov
  'ponitrie', 'pohronie', 'záhorie', 'považie', 'liptov', 'spiš', 'gemer', 'turiec', 'kysuce', 'orava', 'zemplín', 'tekov', 'hont', 'novohrad', 'horehronie', 'zambezi', 'ubangi', 'okavango', 'ťan-šan',
  ]);

function makeForceLink(word: string): string {
  const lowerWord = word.toLowerCase();
  // Vlastné mená si ponechávajú veľké písmeno — rozpoznáme ich buď zo zoznamu,
  // alebo podľa vnútorného veľkého písmena (viacslovné názvy ako „Veľká Fatra"
  // či „Dolné Rakúsko" by inak degradovali na „veľká fatra").
  const hasInnerCapital = word.slice(1) !== word.slice(1).toLowerCase();
  const isProper = PROPER_NOUNS.has(lowerWord) || hasInnerCapital;
  const displayWord = isProper ? word : lowerWord;
  return `<a href="/wiki/${encodeURIComponent(
    lowerWord.replace(/\s+/g, '_'),
  )}" data-force-word="${displayWord}" class="force-link">${displayWord}</a>`;
}

// ────────────────────────────────────────────────────────────────────────────
// GENEROVANIE OBSAHU ČLÁNKU S FORCE SLOVAMI
// ────────────────────────────────────────────────────────────────────────────

// Pomocná funkcia: zamiešať pole (Fisher-Yates)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Dodatočné kontextové vety pre rozšírenie článkov
const CONTEXT_SENTENCES: Record<ArticleCategory, string[]> = {
  culture: [
    'Kultúrny rozmer tejto témy je neoddeliteľnou súčasťou jej pochopenia.',
    'Umelecké spracovanie reflektuje spoločenské hodnoty a estetické ideály doby.',
    'Interpretácia sa líši podľa kultúrneho kontextu a historického obdobia.',
    'Výrazové prostriedky kombinujú tradičné prvky s modernými inováciami.',
    'Kritická reflexia otvára nové perspektívy na pochopenie diela.',
    'Estetická hodnota spočíva v harmonickom prepojení formy a obsahu.',
    'Medzinárodný ohlas potvrdzuje univerzálnosť umeleckého posolstva.',
    'Vzdelávací potenciál sa prejavuje v schopnosti inšpirovať nové generácie.',
  ],
  sport: [
    'Fyzická náročnosť vyžaduje systematickú prípravu a disciplínu.',
    'Taktické aspekty zohrávajú kľúčovú úlohu vo vrcholovom výkone.',
    'Športová etika a fair play sú základnými hodnotami tejto disciplíny.',
    'Regenerácia a odpočinok sú neoddeliteľnou súčasťou tréningového procesu.',
    'Mentálna odolnosť rozhoduje o úspechu v kritických momentoch súťaže.',
    'Technická dokonalosť sa dosahuje rokmi cieľavedomého trénovania.',
    'Tímová spolupráca zvyšuje celkový výkon a posilňuje morálku.',
    'Športová kariéra prináša výzvy aj v oblasti životnej rovnováhy.',
  ],
  science: [
    'Vedecká metodológia zabezpečuje objektivitu a reprodukovateľnosť výsledkov.',
    'Interdisciplinárna spolupráca rozširuje hranice poznania.',
    'Empirické overovanie hypotéz je základom vedeckého pokroku.',
    'Teoretické modely slúžia ako nástroj pre predpovedanie javov.',
    'Etické aspekty výskumu nadobúdajú v súčasnosti rastúci význam.',
    'Medzinárodná vedecká komunita zdieľa poznatky prostredníctvom publikácií.',
    'Aplikovaný výskum prenáša teoretické poznatky do praxe.',
    'Kritické myslenie a skepticizmus sú predpokladom kvalitného výskumu.',
  ],
  history: [
    'Historické pramene poskytujú svedectvo o minulých udalostiach.',
    'Kontextuálna analýza pomáha pochopiť motivácie historických aktérov.',
    'Komparatívny prístup odhaľuje paralely medzi rôznymi obdobiami.',
    'Historiografické interpretácie sa vyvíjajú s novými objavmi.',
    'Pamäťové inštitúcie uchovávajú dedičstvo pre budúce generácie.',
    'Kritická analýza prameňov je základom historického výskumu.',
    'Orálna história dopĺňa písomné svedectvá o živé spomienky.',
    'Dejinné udalosti formovali súčasnú spoločenskú štruktúru.',
  ],
  geography: [
    'Prírodné podmienky determinujú možnosti hospodárskeho využitia územia.',
    'Klimatické faktory ovplyvňujú charakter krajiny a životné podmienky.',
    'Geografická poloha má strategický význam pre rozvoj regiónu.',
    'Reliéf formuje sídelnú štruktúru a dopravnú infraštruktúru.',
    'Vodné zdroje sú kľúčovým faktorom pre osídlenie oblasti.',
    'Ochrana prírody a krajiny získava na význame v kontexte klimatických zmien.',
    'Urbanizácia mení tradičný ráz krajiny a spôsob jej využívania.',
    'Regionálne rozdiely odrážajú historický vývoj a prírodné danosti.',
  ],
  person: [
    'Životné dielo zanechalo trvalú stopu v oblasti pôsobenia.',
    'Osobnostný rast bol formovaný skúsenosťami a vzdelávacou dráhou.',
    'Profesionálne úspechy boli výsledkom kombinácie talentu a vytrvalosti.',
    'Súkromný život poskytuje kontext pre pochopenie verejnej činnosti.',
    'Odkaz pre budúce generácie spočíva v inšpiratívnom príklade.',
    'Spolupráca s inými osobnosťami umocnila dosah pôsobenia.',
    'Prekážky na ceste k úspechu boli zdrojom cenných skúseností.',
    'Medzinárodné uznanie potvrdzuje kvalitu a význam práce.',
  ],
  technology: [
    'Technologický vývoj prináša nové možnosti aj výzvy pre spoločnosť.',
    'Inovácie transformujú tradičné postupy a vytvárajú nové odvetvia.',
    'Bezpečnostné aspekty si vyžadujú systematickú pozornosť a reguláciu.',
    'Integrácia s existujúcimi systémami je kľúčová pre praktické nasadenie.',
    'Udržateľnosť a energetická efektívnosť sú prioritami moderného vývoja.',
    'Používateľské rozhranie ovplyvňuje prijatie technológie verejnosťou.',
    'Štandardizácia uľahčuje kompatibilitu a širšie využitie riešení.',
    'Automatizácia procesov zvyšuje efektivitu a znižuje náklady.',
  ],
  nature: [
    'Ekologické vzťahy tvoria komplexnú sieť vzájomných závislostí.',
    'Biodiverzita je predpokladom zdravého a odolného ekosystému.',
    'Evolučné prispôsobenia odrážajú tlaky životného prostredia.',
    'Ochranárske úsilia smerujú k zachovaniu prírodného dedičstva.',
    'Sezónne zmeny ovplyvňujú životné cykly a správanie organizmov.',
    'Potravová pyramída ilustruje tok energie v ekosystéme.',
    'Symbiotické vzťahy prinášajú výhody zúčastneným druhom.',
    'Klimatické zmeny predstavujú výzvu pre prežitie mnohých druhov.',
  ],
  general: [
    'Komplexnosť témy si vyžaduje interdisciplinárny prístup.',
    'Praktické aplikácie rozširujú teoretické poznanie do každodenného života.',
    'Historický vývoj pojmu odráža premeny spoločenského kontextu.',
    'Súčasné trendy naznačujú smer budúceho vývoja oblasti.',
    'Kritická analýza pomáha rozlíšiť podstatné od vedľajšieho.',
    'Vzdelávací rozmer témy podporuje rozvoj kritického myslenia.',
    'Medzinárodné porovnania rozširujú perspektívu a obohacujú poznanie.',
    'Etické aspekty si zasluhujú pozornosť pri praktickom uplatňovaní.',
  ],
};

// Uzatváracie vety – pridávajú sa na KONIEC odseku po vsuvke s force slovami,
// aby odsek nekončil monotónnym vzorcom „...aj/i/tiež [SLOVO]." ale prirodzenou
// vetou bez force slova. Nesmú obsahovať {WORD} placeholder.
const CLOSING_SENTENCES: string[] = [
  'Tieto súvislosti dokresľujú celkový obraz problematiky.',
  'Uvedené skutočnosti svedčia o širšom dosahu témy.',
  'Predstavené aspekty patria k najčastejšie diskutovaným.',
  'Zmienené pojmy dotvárajú celkové porozumenie problematiky.',
  'Spomínané prvky prispievajú k bohatosti tejto oblasti.',
  'Tieto skutočnosti sú významné pre úplné porozumenie kontextu.',
  'Komplexnosť témy sa prejavuje práve v takýchto detailoch.',
  'Spoločenský dosah uvedených pojmov nemožno opomenúť.',
  'Práve tieto súvislosti robia z problematiky predmet vedeckého záujmu.',
  'Vzájomné prepojenie spomenutých prvkov tvorí dôležitý poznatok.',
  'Odborná verejnosť venuje týmto otázkam pravidelnú pozornosť.',
  'Analýza týchto súvislostí poskytuje hlbší pohľad na tému.',
  'V širšom kontexte nadobúdajú spomenuté skutočnosti väčší význam.',
  'Pre úplné porozumenie je potrebné brať do úvahy aj tieto aspekty.',
  'Detailnejší pohľad odhaľuje ďalšie zaujímavé súvislosti.',
  'Práve preto tvoria nedeliteľnú súčasť odbornej diskusie.',
  'Z hľadiska ďalšieho výskumu ide o podnetné otázky.',
  'Bez týchto súvislostí by zostal výklad neúplný.',
  'V každom prípade ide o pojmy, ktoré si zaslúžia bližšie skúmanie.',
  'Spojitosti medzi nimi predstavujú zaujímavý predmet ďalších úvah.',
];

// ────────────────────────────────────────────────────────────────────────────
// DOPLNKOVÉ ŠABLÓNY — viažu force slová priamo na tému článku ({TITLE}),
// vďaka čomu sa odkazy zmienia v prirodzenom kontexte a článok pôsobí
// ako reálna encyklopedická práca, nie ako strojovo vsunuté zoznamy.
// ────────────────────────────────────────────────────────────────────────────

const EXTRA_SINGLE_TEMPLATES: Record<ArticleCategory, string[]> = {
  culture: [
    'V rámci témy {TITLE} zohráva {WORD} nezastupiteľnú úlohu.',
    'Pri štúdiu témy {TITLE} nemožno obísť ani {WORD}.',
    'Dejiny témy {TITLE} sú úzko späté s {WORD}.',
    'K pochopeniu témy {TITLE} patrí aj poznanie {WORD}.',
    'Aj {WORD} má v tejto oblasti svoje osobitné miesto.',
    'Odborná literatúra o {TITLE} spomína rovnako {WORD}.',
    'Ako ukazuje prax, aj {WORD} formovala verejný vkus.',
    'Nezaobídeme sa bez pojmu {WORD}, ktorý stojí blízko témy {TITLE}.',
  ],
  sport: [
    'Pri {TITLE} zohráva {WORD} dôležitú úlohu.',
    'K úspechu v {TITLE} patrí aj zvládnutie {WORD}.',
    'Tréningový plán pri {TITLE} počíta aj s {WORD}.',
    'Aj {WORD} patrí k pilierom tejto disciplíny.',
    'V súvislosti s {TITLE} sa často hovorí o {WORD}.',
    'Pre vrcholový výkon v {TITLE} je podstatná aj {WORD}.',
    'Kariéra v {TITLE} sa nezaobíde bez {WORD}.',
    'Medzi základy témy {TITLE} patrí aj {WORD}.',
  ],
  science: [
    'Výskum témy {TITLE} sa opiera aj o poznatky o {WORD}.',
    'Pri skúmaní témy {TITLE} sa vychádza aj z {WORD}.',
    'Teória témy {TITLE} úzko súvisí s {WORD}.',
    'Aj {WORD} nachádza uplatnenie v tejto vedeckej oblasti.',
    'Moderné poňatie témy {TITLE} zahŕňa aj {WORD}.',
    'V súvislosti s {TITLE} odborníci analyzujú aj {WORD}.',
    'Metodológia témy {TITLE} sa aplikuje aj na {WORD}.',
    'Bez poznatkov o {WORD} by zostalo štúdium témy {TITLE} neúplné.',
  ],
  history: [
    'V dejinách sa s témou {TITLE} spája aj {WORD}.',
    'Kontext témy {TITLE} sa nedá oddeliť od {WORD}.',
    'Aj {WORD} zanechala stopy v období {TITLE}.',
    'Pramene k téme {TITLE} pripomínajú úlohu {WORD}.',
    'Historici spájajú tému {TITLE} s významom {WORD}.',
    'V dobe {TITLE} nadobúdal pojem {WORD} osobitý význam.',
    'Osudy {WORD} sa pretínajú s {TITLE}.',
    'Pochopenie témy {TITLE} si vyžaduje poznať aj {WORD}.',
  ],
  geography: [
    'V oblasti {TITLE} majú významné miesto aj {WORD}.',
    'Geografia témy {TITLE} zahŕňa aj {WORD}.',
    'Charakter témy {TITLE} ovplyvňuje najmä {WORD}.',
    'Aj {WORD} patrí k typickým črtám tohto územia.',
    'Pri opise {TITLE} nemožno vynechať {WORD}.',
    'Krajinný obraz témy {TITLE} dotvára najmä {WORD}.',
    'Vývoj témy {TITLE} bol podmienený aj {WORD}.',
    'Návštevníkov tejto oblasti upútajú aj {WORD}.',
  ],
  person: [
    'V živote tejto osobnosti má miesto aj {WORD}.',
    'Jej cesta viedla okrem iného aj cez {WORD}.',
    'Odborníci ju spájajú aj s {WORD}.',
    'Aj {WORD} patrí k míľnikom jej kariéry.',
    'Vzdelanie získala v oblasti {WORD}.',
    'Za významné sa považuje aj obdobie {WORD}.',
    'Verejnosti je známa aj vďaka {WORD}.',
    'K jej odkazu patria aj {WORD}.',
  ],
  technology: [
    'Pri {TITLE} sa uplatňuje aj {WORD}.',
    'Vývoj témy {TITLE} by nebol možný bez {WORD}.',
    'Aj {WORD} patrí k technickým základom tejto oblasti.',
    'Prax témy {TITLE} úzko nadväzuje na {WORD}.',
    'Inovácie v {TITLE} prinášajú aj {WORD}.',
    'V štruktúre témy {TITLE} má {WORD} kľúčovú funkciu.',
    'Moderný prístup k téme {TITLE} počíta aj s {WORD}.',
    'Bez {WORD} by dnešná podoba témy {TITLE} nebola mysliteľná.',
  ],
  nature: [
    'V ekosystéme témy {TITLE} zohráva {WORD} dôležitú rolu.',
    'Výskyt {WORD} je typický pre prostredie témy {TITLE}.',
    'Aj {WORD} patrí k charakteristickým zástupcom tejto oblasti.',
    'Podmienky {TITLE} umožňujú život {WORD}.',
    'Význam témy {TITLE} sa prejavuje aj v ochrane {WORD}.',
    'K biologickému bohatstvu {TITLE} patria aj {WORD}.',
    'V prírodných podmienkach {TITLE} sa darí aj {WORD}.',
    'Pozorovatelia tu môžu spozorovať aj {WORD}.',
  ],
  general: [
    'V súvislosti s témou {TITLE} sa hovorí aj o {WORD}.',
    'Kontext témy {TITLE} dopĺňa aj {WORD}.',
    'Aj {WORD} má v tejto téme svoje miesto.',
    'Pri {TITLE} nemožno opomenúť {WORD}.',
    'Odborné texty o téme {TITLE} spomínajú rovnako {WORD}.',
    'K celkovému obrazu témy {TITLE} patrí aj {WORD}.',
    'Význam témy {TITLE} dokresľuje aj {WORD}.',
    'Bez znalosti {WORD} by výklad témy {TITLE} nebol úplný.',
  ],
};

const EXTRA_LIST_TEMPLATES: Record<ArticleCategory, string[]> = {
  culture: [
    'Svet témy {TITLE} obohatili najmä {W1}, {W2} a {W3}.',
    'K klasike témy {TITLE} patria {W1}, {W2} či {W3}.',
    'Pamäť tejto oblasti si uchovala mená ako {W1}, {W2} a {W3}.',
    'Pojmový rámec témy {TITLE} tvoria aj aj {W1}, {W2} alebo {W3}.',
  ],
  sport: [
    'História témy {TITLE} pozná aj {W1}, {W2} či {W3}.',
    'K chrbtovej kosti témy {TITLE} patria {W1}, {W2} a {W3}.',
    'Súčasťou prostredia témy {TITLE} sú {W1}, {W2} aj {W3}.',
    'Na vrcholovej úrovni {TITLE} rozhodujú najmä {W1}, {W2} a {W3}.',
  ],
  science: [
    'Teóriu témy {TITLE} dopĺňajú pojmy ako {W1}, {W2} a {W3}.',
    'Medzi základné stavebné kamene témy {TITLE} patria {W1}, {W2} či {W3}.',
    'Výskum témy {TITLE} sa opiera o {W1}, {W2} aj {W3}.',
    'Praktické uplatnenie nachádzajú najmä {W1}, {W2} a {W3}.',
  ],
  history: [
    'Dejiny témy {TITLE} formovali udalosti ako {W1}, {W2} a {W3}.',
    'Pramene k {TITLE} spomínajú {W1}, {W2} či {W3}.',
    'K dejinám témy {TITLE} neoddeliteľne patria {W1}, {W2} aj {W3}.',
    'V čase {TITLE} nadobudli význam {W1}, {W2} a {W3}.',
  ],
  geography: [
    'Krajinný rámec témy {TITLE} tvoria okrem iného {W1}, {W2} a {W3}.',
    'K prírodným hodnotám témy {TITLE} patria {W1}, {W2} či {W3}.',
    'Územie spojené s témou {TITLE} vyniká najmä {W1}, {W2} aj {W3}.',
    'Medzi pozoruhodnosti témy {TITLE} patria {W1}, {W2} a {W3}.',
  ],
  person: [
    'Osobnostný profil dopĺňajú súvislosti ako {W1}, {W2} a {W3}.',
    'Kľúčovými etapami boli {W1}, {W2} či {W3}.',
    'Dielo či činy sprevádzali aj {W1}, {W2} a {W3}.',
    'Životnú cestu ovplyvnili najmä {W1}, {W2} aj {W3}.',
  ],
  technology: [
    'Architektúru témy {TITLE} tvoria okrem iného {W1}, {W2} a {W3}.',
    'Medzi technické predpoklady témy {TITLE} patria {W1}, {W2} či {W3}.',
    'V praxi sa využívajú najmä {W1}, {W2} aj {W3}.',
    'Rozvoj témy {TITLE} umožnili predovšetkým {W1}, {W2} a {W3}.',
  ],
  nature: [
    'V prírode témy {TITLE} sa stretávame s {W1}, {W2} aj {W3}.',
    'K typickým zástupcom patria {W1}, {W2} či {W3}.',
    'Biodiverzitu témy {TITLE} dotvárajú {W1}, {W2} a {W3}.',
    'V hodnotách územia vynikajú najmä {W1}, {W2} aj {W3}.',
  ],
  general: [
    'K téme {TITLE} sa viažu aj pojmy {W1}, {W2} a {W3}.',
    'Okrem toho zohrávajú úlohu {W1}, {W2} či {W3}.',
    'Medzi súvisiace okruhy patria {W1}, {W2} aj {W3}.',
    'V širších súvislostiach vystupujú aj {W1}, {W2} a {W3}.',
  ],
};

const EXTRA_CONTEXT_SENTENCES: Record<ArticleCategory, string[]> = {
  culture: [
    'Pojmy uvedené nižšie tvoria prirodzený rámec tejto oblasti.',
    'Kultúrna pamäť si tieto súvislosti uchovala dodnes.',
    'Výklad bez nich by ostal povrchový a neúplný.',
    'Odborná kritika venuje týmto aspektom trvalú pozornosť.',
  ],
  sport: [
    'Bez uvedených súvislostí sa nedá pochopiť celkový obraz disciplíny.',
    'Tréningová prax ich pokladá za základný rozsah.',
    'Športová verejnosť ich vníma ako samozrejmosť.',
    'Ich význam rastie s narastajúcou konkurenciou.',
  ],
  science: [
    'Uvedené pojmy tvoria pojmový rámec tejto disciplíny.',
    'Vedecká komunita ich pokladá za východisko ďalšieho skúmania.',
    'Ich vzájomné vzťahy opisujú základné modely.',
    'Bez ich definícií by teoretický aparát nebol úplný.',
  ],
  history: [
    'Historická pamäť spája tieto súvislosti do jedného celku.',
    'Pramene ich spomínajú opakovane, čo svedčí o ich význame.',
    'Historiografia im venuje samostatné kapitoly.',
    'Ich výklad sa opiera o porovnateľné prípady z iných období.',
  ],
  geography: [
    'Geografické súvislosti ich radia medzi určujúce faktory.',
    'Ich rozloženie zodpovedá prírodným podmienkam územia.',
    'Priestorové vzťahy medzi nimi sú predmetom výskumu.',
    'Krajiný obraz bez nich nemôže byť úplný.',
  ],
  person: [
    'Životná dráha je v nich zobrazená v širších súvislostiach.',
    'Biografické pramene ich spomínajú v kľúčových okamihoch.',
    'Verejný obraz osobnosti ich neustále potvrdzuje.',
    'Bez nich by portrét zostal jednostranný.',
  ],
  technology: [
    'Technická prax ich pokladá za štandard.',
    'Ich prepojenie určuje celkovú architektúru riešenia.',
    'Vývojové trendy ich neustále presúvajú do popredia.',
    'Normy a štandardy s nimi počítajú ako so základom.',
  ],
  nature: [
    'Prírodovedný výskum ich pokladá za indikátor stavu prostredia.',
    'Ich prítomnosť alebo úbytok hovorí o zdraví ekosystému.',
    'Ochrana prírody sa viaže na ich prežitie.',
    'Terénne pozorovania ich dokumentujú pravidelne.',
  ],
  general: [
    'Uvedené súvislosti tvoria základný pojmový rámec.',
    'Ich vzájomné vzťahy si zaslúžia bližšie vysvetlenie.',
    'Čitateľ v nich nájde východiská pre ďalšie štúdium.',
    'Odborná i laická diskusia sa k nim vracia pravidelne.',
  ],
};

// Dosadí názov článku do šablón obsahujúcich {TITLE}
const withTitle = (templates: string[], articleTitle: string): string[] =>
  templates.map((t) => t.split('{TITLE}').join(articleTitle));

export function generateForceArticleContent(
  title: string,
  category: ArticleCategory,
  forceWords: string[],
): string {
  const structure = ARTICLE_STRUCTURES[category] || ARTICLE_STRUCTURES.general;
  const singleTpls = withTitle(
    shuffle([
      ...(SINGLE_TEMPLATES[category] || SINGLE_TEMPLATES.general),
      ...EXTRA_SINGLE_TEMPLATES[category],
    ]),
    title,
  );
  const listTpls = withTitle(
    shuffle([
      ...(LIST_TEMPLATES[category] || LIST_TEMPLATES.general),
      ...EXTRA_LIST_TEMPLATES[category],
    ]),
    title,
  );
  const contextSentences = withTitle(
    shuffle([
      ...(CONTEXT_SENTENCES[category] || CONTEXT_SENTENCES.general),
      ...EXTRA_CONTEXT_SENTENCES[category],
    ]),
    title,
  );
  const closingSentences = shuffle(CLOSING_SENTENCES);

  let content = structure.intro(title);
  const allSections = structure.sections(title);
  // Variabilná štruktúra: zachováme logické poradie (úvodné aj záverečné
  // sekcie), ale stredové sekcie náhodne vynechávame — články sa tak
  // navzájom líšia a nepôsobia šablónovito.
  const sections = allSections.filter(
    (_section, i) =>
      i < 2 ||
      i === allSections.length - 1 ||
      allSections.length <= 4 ||
      Math.random() < 0.8,
  );

  // Spočítame počet odsekov, aby sme vedeli rozdeliť force slová rovnomerne.
  let totalParagraphs = 0;
  for (const s of sections) totalParagraphs += s.paragraphs.length;

  // Rezervujeme 4-8 slov pre koncovú sekciu "Pozri aj".
  const reservedTail = Math.min(
    Math.max(4, Math.floor(forceWords.length * 0.1)),
    8,
  );
  const bodyWords = forceWords.slice(
    0,
    Math.max(0, forceWords.length - reservedTail),
  );
  const tailWords = forceWords.slice(forceWords.length - reservedTail);

  // Naplánujeme distribúciu: každý odsek dostane 0-5 vsuvky.
  // Striedame typ vsuvky (LIST vsunie 3 slová naraz, SINGLE jedno).
  // Cieľom je, aby sa všetky bodyWords zmestili do textu prirodzene.
  let wordIdx = 0;
  let singleIdx = 0;
  let listIdx = 0;
  let paragraphCounter = 0;
  let contextIdx = 0;
  let closingIdx = 0;

  // Pomôcka: ako veľa slov ešte zostáva spotrebovať na zostávajúce odseky.
  const wordsPerParagraphTarget = (remainingParas: number) => {
    const remaining = bodyWords.length - wordIdx;
    if (remaining <= 0 || remainingParas <= 0) return 0;
    return Math.ceil(remaining / remainingParas);
  };

  for (const section of sections) {
    content += `<h2>${section.title}</h2>`;

    for (const paragraph of section.paragraphs) {
      content += `<p>${paragraph}`;

      const remainingParas = totalParagraphs - paragraphCounter;
      let target = wordsPerParagraphTarget(remainingParas);
      // Cieľ obmedzíme na 0-10, aby sa do každého odseku zmestilo viac slov,
      // ale aby žiaden odsek nebol nečitateľne preplnený.
      target = Math.min(10, target);

      // Niektoré odseky preskočíme úplne (cca 4% pravdepodobnosť),
      // aby článok pôsobil prirodzene, ale väčšina odsekov obsahuje vsuvku.
      const skipParagraph =
        target > 0 && wordIdx > 0 && Math.random() < 0.04;

      let forceInserted = false;

      if (!skipParagraph && target > 0 && wordIdx < bodyWords.length) {
        // Pridáme kontextovú vetu pre prirodzenejší prechod (35% šanca)
        if (Math.random() < 0.35 && contextIdx < contextSentences.length) {
          content += ` ${contextSentences[contextIdx]}`;
          contextIdx++;
        }

        // Ak máme 3+ slov na vsunutie, použijeme LIST template (3 slová v jednej vete).
        if (
          target >= 3 &&
          wordIdx + 3 <= bodyWords.length &&
          Math.random() < 0.78
        ) {
          const tpl = listTpls[listIdx % listTpls.length];
          listIdx++;
          const w1 = makeForceLink(bodyWords[wordIdx]);
          const w2 = makeForceLink(bodyWords[wordIdx + 1]);
          const w3 = makeForceLink(bodyWords[wordIdx + 2]);
          const sentence = tpl
            .replace('{W1}', w1)
            .replace('{W2}', w2)
            .replace('{W3}', w3);
          content += ` ${sentence}`;
          wordIdx += 3;
          forceInserted = true;

          // Pridáme 1-3 single vsuvky, ak target bol vysoký
          const extraCount = Math.min(target - 3, 3, bodyWords.length - wordIdx);
          for (let i = 0; i < extraCount; i++) {
            const stpl = singleTpls[singleIdx % singleTpls.length];
            singleIdx++;
            content += ` ${stpl.replace(
              '{WORD}',
              makeForceLink(bodyWords[wordIdx]),
            )}`;
            wordIdx++;
          }

          // Ak je target ešte stále vysoký (>=6) a zostáva 3+ slov,
          // pridáme aj druhú LIST vsuvku do toho istého odseku.
          if (
            target >= 6 &&
            wordIdx + 3 <= bodyWords.length &&
            Math.random() < 0.6
          ) {
            const tpl2 = listTpls[listIdx % listTpls.length];
            listIdx++;
            const ww1 = makeForceLink(bodyWords[wordIdx]);
            const ww2 = makeForceLink(bodyWords[wordIdx + 1]);
            const ww3 = makeForceLink(bodyWords[wordIdx + 2]);
            content += ` ${tpl2
              .replace('{W1}', ww1)
              .replace('{W2}', ww2)
              .replace('{W3}', ww3)}`;
            wordIdx += 3;
          }
        } else {
          // Použijeme SINGLE templates pre 1-5 slová.
          const count = Math.min(target, 5, bodyWords.length - wordIdx);
          for (let i = 0; i < count; i++) {
            const tpl = singleTpls[singleIdx % singleTpls.length];
            singleIdx++;
            content += ` ${tpl.replace(
              '{WORD}',
              makeForceLink(bodyWords[wordIdx]),
            )}`;
            wordIdx++;
            forceInserted = true;
          }
        }
      }

      // Ak sme do odseku vsunuli force slovo, s vysokou pravdepodobnosťou
      // pridáme uzatváraciu vetu bez force slova, aby odsek nekončil
      // monotónnym vzorcom „...aj/i/tiež [SLOVO]."
      if (forceInserted && Math.random() < 0.78) {
        const closing =
          closingSentences[closingIdx % closingSentences.length];
        closingIdx++;
        content += ` ${closing}`;
      }

      content += `</p>`;
      paragraphCounter++;
    }

    // Pridáme extra odsek do sekcie pre dlhší článok (65% šanca)
    if (Math.random() < 0.65 && wordIdx < bodyWords.length && contextIdx < contextSentences.length) {
      content += `<p>${contextSentences[contextIdx]}`;
      contextIdx++;

      let extraForceInserted = false;

      // Pridáme 3-7 force slov do extra odseku (predtým 2-4)
      const extraWords = Math.min(7, bodyWords.length - wordIdx);
      if (extraWords >= 3 && Math.random() < 0.75) {
        const tpl = listTpls[listIdx % listTpls.length];
        listIdx++;
        const w1 = makeForceLink(bodyWords[wordIdx]);
        const w2 = makeForceLink(bodyWords[wordIdx + 1]);
        const w3 = makeForceLink(bodyWords[wordIdx + 2]);
        content += ` ${tpl.replace('{W1}', w1).replace('{W2}', w2).replace('{W3}', w3)}`;
        wordIdx += 3;
        extraForceInserted = true;

        // Pridáme ešte 1-3 single vsuvky pre väčšiu hustotu
        const more = Math.min(extraWords - 3, 3, bodyWords.length - wordIdx);
        for (let i = 0; i < more; i++) {
          const stpl = singleTpls[singleIdx % singleTpls.length];
          singleIdx++;
          content += ` ${stpl.replace('{WORD}', makeForceLink(bodyWords[wordIdx]))}`;
          wordIdx++;
        }
      } else if (extraWords > 0) {
        const single = Math.min(3, extraWords);
        for (let i = 0; i < single; i++) {
          const tpl = singleTpls[singleIdx % singleTpls.length];
          singleIdx++;
          content += ` ${tpl.replace('{WORD}', makeForceLink(bodyWords[wordIdx]))}`;
          wordIdx++;
          extraForceInserted = true;
        }
      }

      // Aj v extra odseku pridáme uzatváraciu vetu, aby nekončil
      // vzorcom „...aj/i/tiež [SLOVO]."
      if (extraForceInserted && Math.random() < 0.78) {
        const closing =
          closingSentences[closingIdx % closingSentences.length];
        closingIdx++;
        content += ` ${closing}`;
      }

      content += `</p>`;
    }
  }

  // Ak po spracovaní textu zostali ešte body slová (môže nastať pri preskočených
  // odsekoch alebo dlhšom zozname), priradíme ich dodatočne na koniec posledných
  // odsekov pred Pozri aj — pridáme ich do tailWords.
  const leftover = bodyWords.slice(wordIdx);
  const finalTail = [...leftover, ...tailWords];

  // Sekcia "Pozri aj" — zoznam až 16 odkazov pre vyššiu hustotu force slov
  if (finalTail.length > 0) {
    const tailDisplay = finalTail.slice(0, 16);
    content += `<h2>Pozri aj</h2><ul>`;
    for (const word of tailDisplay) {
      content += `<li>${makeForceLink(word)}</li>`;
    }
    content += `</ul>`;

    // Ak by ešte zostali nezobrazené slová, schováme ich do neviditeľného bloku
    if (finalTail.length > 16) {
      const hidden = finalTail.slice(16);
      content += `<div style="display:none" aria-hidden="true">`;
      for (const word of hidden) {
        content += makeForceLink(word);
      }
      content += `</div>`;
    }
  }

  // Referencie
  content += `<h2>Referencie</h2>`;
  content += `<ol class="references">`;
  content += `<li>Encyklopedický slovník, Vydavateľstvo SAV, 2023</li>`;
  content += `<li>Všeobecná encyklopédia, Encyclopaedia Beliana</li>`;
  content += `<li>Odborná literatúra a vedecké publikácie</li>`;
  content += `</ol>`;

  // Externé odkazy
  content += `<h2>Externé odkazy</h2><ul>`;
  content += `<li><a href="https://sk.wikipedia.org/wiki/${encodeURIComponent(
    title,
  )}" target="_blank" rel="noopener">Článok na Wikipédii</a></li>`;
  content += `</ul>`;

  return content;
}

// ────────────────────────────────────────────────────────────────────────────
// VYHĽADÁVANIE V DATABÁZE
// ────────────────────────────────────────────────────────────────────────────

export function searchEncyclopedia(
  query: string,
): { title: string; slug: string; excerpt: string }[] {
  const normalizedQuery = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const results: {
    title: string;
    slug: string;
    excerpt: string;
    score: number;
  }[] = [];
  const seen = new Set<string>();

  for (const words of Object.values(VOCABULARY_BY_CATEGORY)) {
    for (const word of words) {
      const key = word.toLowerCase();
      if (seen.has(key)) continue;

      const normalizedWord = key
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      if (normalizedWord.includes(normalizedQuery)) {
        seen.add(key);
        results.push({
          title: word,
          slug: key.replace(/\s+/g, '_'),
          excerpt: `Encyklopedický článok o téme ${word}`,
          score: normalizedWord.startsWith(normalizedQuery) ? 100 : 50,
        });
      }
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ title, slug, excerpt }) => ({ title, slug, excerpt }));
}
