// Encyklopedická databáza - slovná zásoba kategorizovaná podľa tém
// Cieľ: aby slová v článkoch dávali zmysel v kontexte (napr. v článku o gitare
// sa objavia pojmy z hudby, nie "Oceán")

import { VOCABULARY_EXPANSION } from './vocabulary-expansion';

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
    // Hudobné nástroje
    'Akordeón', 'Bandžo', 'Basgitara', 'Bicie', 'Bubon', 'Cembalo', 'Cimbal',
    'Činely', 'Citara', 'Dychový nástroj', 'Drumbľa', 'Fagot', 'Flauta', 'Fujara',
    'Gitara', 'Gong', 'Harfa', 'Harmonika', 'Hoboj', 'Husle', 'Kastanety',
    'Klarinet', 'Klavír', 'Klavichord', 'Kontrabas', 'Lesný roh', 'Lutna',
    'Mandolína', 'Marimba', 'Okarína', 'Organ', 'Pikola', 'Saxofón', 'Sláčik',
    'Spinet', 'Struna', 'Synthesizer', 'Tamburína', 'Triangel', 'Trombón',
    'Trubka', 'Tuba', 'Ukulele', 'Viola', 'Violončelo', 'Xylofón', 'Zvonkohra',
    'Bendžo', 'Balalajka', 'Buzuki', 'Čelo', 'Didžeridu', 'Dudy', 'Elektrická gitara',
    'Flažolet', 'Gongy', 'Harmonikár', 'Heligónka', 'Korneta', 'Krídlovka',
    'Lýra', 'Melodika', 'Metalofón', 'Perkusie', 'Pozauna', 'Rebec', 'Sitár',
    'Tabla', 'Tamtamy', 'Timpány', 'Vibrafón', 'Vibraslap', 'Virginal',
    // Rozšírené hudobné nástroje
    'Anglický roh', 'Basová gitara', 'Bassethorn', 'Čelesta', 'Činela',
    'Darbuka', 'Djembe', 'Elektrofonický organ', 'Erhu', 'Euphonium',
    'Fidula', 'Flažoletový register', 'Flexatón', 'Fortepiano', 'Glockenspiel',
    'Guiro', 'Hackbrett', 'Hammerklavier', 'Handdrum', 'Hardingfela',
    'Helikon', 'Chrotta', 'Kachón', 'Kalimba', 'Kanun', 'Kaval',
    'Kokle', 'Koncertina', 'Kornet', 'Kudüm', 'Laute', 'Lyra da braccio',
    'Maraca', 'Mbira', 'Musette', 'Nyckelharpa', 'Oboe d amore', 'Ondes Martenot',
    'Ophikleida', 'Pandeiro', 'Pedálová harfa', 'Píšťala', 'Portativ',
    'Psalterium', 'Ramshorn', 'Rankett', 'Rauschpfeife', 'Requinto',
    'Santur', 'Sarrusofón', 'Serpent', 'Shawm', 'Sousafón', 'Steeldrum',
    'Surdo', 'Šalmaj', 'Talerzyk', 'Tanpura', 'Teremin', 'Timbales',
    'Traverso', 'Turecký bubon', 'Veena', 'Vihuela', 'Zither', 'Zurna',
    // Hudobné pojmy
    'Akord', 'Aria', 'Balada', 'Beat', 'Concerto', 'Diskotéka', 'Dueto',
    'Etuda', 'Fanfára', 'Fúga', 'Harmónia', 'Hymna', 'Improvizácia',
    'Intermezzo', 'Interpret', 'Jazz', 'Kadencia', 'Kantáta', 'Kapela',
    'Klavirista', 'Koncert', 'Kompozícia', 'Libreto', 'Madrigal', 'Melódia',
    'Motív', 'Nokturno', 'Nota', 'Notácia', 'Opera', 'Opereta', 'Orchester',
    'Partitúra', 'Pieseň', 'Polka', 'Predohra', 'Recitatív', 'Refrén',
    'Rekviem', 'Rytmus', 'Serenáda', 'Skladateľ', 'Skladba', 'Sláčiky',
    'Sólo', 'Sonáta', 'Sopranistka', 'Stupnica', 'Symfónia', 'Takt',
    'Tempo', 'Tenorista', 'Tón', 'Tónina', 'Tremolo', 'Trio', 'Valčík',
    'Variácia', 'Vibrato', 'Virtuóz', 'Žáner',
    // Rozšírené hudobné pojmy
    'Akapela', 'Alterácia', 'Atonalita', 'Baritón', 'Bas', 'Bel canto',
    'Cantus firmus', 'Chromatika', 'Coda', 'Crescendo', 'Deklamácia',
    'Disonancia', 'Dodekafónia', 'Dominanta', 'Dynamika', 'Enharmonický',
    'Fermata', 'Fortissimo', 'Glissando', 'Hlavný motív', 'Chromatická stupnica',
    'Intonácia', 'Intrada', 'Izomelódia', 'Kánon', 'Kavatína', 'Klaster',
    'Kľúč', 'Konsonancia', 'Kontrapunkt', 'Legato', 'Leitmotív', 'Lied',
    'Meditácia', 'Metrum', 'Mezzoforte', 'Mezzo soprán', 'Moderato',
    'Modulácia', 'Morendo', 'Musica sacra', 'Notopis', 'Obbligato',
    'Ostinato', 'Passacaglia', 'Pastorale', 'Pedálny bod', 'Pentatonika',
    'Pianissimo', 'Pizzicato', 'Polyfonický', 'Polyrytmia', 'Portamento',
    'Prestissimo', 'Rallentando', 'Recitál', 'Retardácia', 'Ripieno',
    'Ritardando', 'Rubato', 'Scherzo', 'Sforzando', 'Spev', 'Staccato',
    'Subdominanta', 'Synkopa', 'Temperácia', 'Tessitúra', 'Toccata',
    'Tonika', 'Transpozícia', 'Trilógia', 'Tutti', 'Unisono', 'Vokál',
    // Hudobné štýly
    'Blues', 'Bossa nova', 'Country', 'Disco', 'Elektronika', 'Flamenco',
    'Folklór', 'Funk', 'Gospel', 'Hip hop', 'Klasika', 'Latino', 'Metal',
    'Pop', 'Punk', 'Rap', 'Reggae', 'Rock', 'Romantizmus', 'Soul', 'Techno',
    // Rozšírené hudobné štýly
    'Acid jazz', 'Ambient', 'Art rock', 'Bebop', 'Big beat', 'Bluegrass',
    'Brit pop', 'Chanson', 'Cool jazz', 'Dance', 'Death metal', 'Deep house',
    'Doo-wop', 'Dream pop', 'Drum and bass', 'Dub', 'Electro', 'Emo',
    'Ethno', 'Fado', 'Folk rock', 'Free jazz', 'Garage rock', 'Glam rock',
    'Gothic', 'Grunge', 'Hard rock', 'Hardcore', 'Heavy metal', 'House',
    'Indie', 'Industrial', 'Jazz fusion', 'K-pop', 'Krautrock', 'Latin jazz',
    'Lounge', 'Math rock', 'Melodic metal', 'Metalcore', 'Minimal',
    'Motown', 'Neo-soul', 'New wave', 'Noise', 'Nu jazz', 'Nu metal',
    'Oldies', 'Post-punk', 'Post-rock', 'Power metal', 'Progressive rock',
    'Psychedelic', 'R&B', 'Ragtime', 'Rave', 'Rockabilly', 'Salsa',
    'Shoegaze', 'Ska', 'Smooth jazz', 'Soft rock', 'Southern rock', 'Space rock',
    'Speed metal', 'Stoner rock', 'Swing', 'Symphonic metal', 'Synth-pop',
    'Tango', 'Thrash metal', 'Trance', 'Trip hop', 'UK garage', 'World music',
    // Iné umenie
    'Akademik', 'Akvarel', 'Architekt', 'Architektúra', 'Balet', 'Baroko',
    'Básnik', 'Beletria', 'Biograf', 'Cyklus', 'Dráma', 'Esej', 'Estetika',
    'Filharmónia', 'Film', 'Galéria', 'Gotika', 'Grafika', 'Herec',
    'Herečka', 'Impresionizmus', 'Inscenácia', 'Kabaret', 'Karikatúra',
    'Karneval', 'Kino', 'Knihovňa', 'Knižnica', 'Komédia', 'Koreografia',
    'Kostým', 'Kubizmus', 'Kultúra', 'Literatúra', 'Maliar', 'Maska',
    'Múzeum', 'Múza', 'Novela', 'Olejomaľba', 'Palác', 'Pantomíma',
    'Pavilón', 'Plagát', 'Plátno', 'Plastika', 'Poézia', 'Portrét',
    'Premiéra', 'Próza', 'Realizmus', 'Recenzia', 'Renesancia', 'Reportáž',
    'Restaurátor', 'Réžia', 'Režisér', 'Riekanka', 'Román', 'Romantika',
    'Romanca', 'Sága', 'Scéna', 'Scenár', 'Sochár', 'Surrealizmus',
    'Symbolizmus', 'Tanec', 'Tanečník', 'Tragédia', 'Umelec', 'Verš',
    'Vystúpenie', 'Výstava', 'Zbierka', 'Zborník',
    // Rozšírené výtvarné umenie
    'Abstrakcionizmus', 'Action painting', 'Art brut', 'Art deco', 'Art nouveau',
    'Azulejo', 'Batik', 'Biedermeier', 'Body art', 'Bronz', 'Busta',
    'Caravaggizmus', 'Collage', 'Concept art', 'Dadaizmus', 'Dekadencia',
    'Difuzionizmus', 'Dripping', 'Dyptich', 'Email', 'Encaustika', 'Expresionizmus',
    'Fauvizmus', 'Figurálna maľba', 'Fotorealizmus', 'Freska', 'Futurizmus',
    'Gesto', 'Glazúra', 'Graffiti', 'Grisaille', 'Guaš', 'Happening',
    'Hyperrealizmus', 'Ikona', 'Iluminácia', 'Impasto', 'Informel',
    'Inštalácia', 'Intarzia', 'Interiérový dizajn', 'Jugendstil', 'Kaligrafia',
    'Kamej', 'Keramika', 'Kinetické umenie', 'Koláž', 'Konceptuálne umenie',
    'Land art', 'Litografia', 'Luminizmus', 'Maniera', 'Manierizmus',
    'Majolik', 'Miniatura', 'Minimalizmus', 'Mobil', 'Modelovanie', 'Monochróm',
    'Monumentálne umenie', 'Mozaika', 'Muralista', 'Naivné umenie', 'Naturalizmus',
    'Návrh', 'Nekonformizmus', 'Neobarok', 'Neoklasicizmus', 'Neonaturalizmus',
    'Neoromantizmus', 'Objektové umenie', 'Op art', 'Ornament', 'Paneláž',
    'Pastel', 'Performance', 'Perspektíva', 'Pointilizmus', 'Pop art',
    'Porcelán', 'Postimpresionizmus', 'Postmodernizmus', 'Predela', 'Prerafaelité',
    'Primitívizmus', 'Rámovanie', 'Ready-made', 'Reliéf', 'Retušovanie',
    'Rokoko', 'Romantická škola', 'Rustikálny štýl', 'Secesia', 'Serigrafia',
    'Silueta', 'Site-specific', 'Skalnatý relief', 'Skica', 'Sochárstvo',
    'Soška', 'Sfumato', 'Street art', 'Štuka', 'Štúdia', 'Tašizmus',
    'Tempera', 'Tenebrismus', 'Terracotta', 'Textilné umenie', 'Torzo',
    'Triptych', 'Trompe-l oeil', 'Veduta', 'Vitráž', 'Vodová farba',
    // Rozšírené divadlo a film
    'Absurdné divadlo', 'Akčný film', 'Animácia', 'Animovaný film', 'Autorský film',
    'Bábkové divadlo', 'Blockbuster', 'Bollywood', 'Činohra', 'Dabér',
    'Dokumentárny film', 'Dramaturg', 'Epos', 'Fantasy', 'Feéria', 'Filmová hudba',
    'Filmový festival', 'Flashback', 'Frašková komédia', 'Groteska',
    'Herecká škola', 'Hlas', 'Hollywood', 'Horor', 'Improvizačné divadlo',
    'Inscenátor', 'Interaktívne divadlo', 'Javisko', 'Kinematografia',
    'Klauniáda', 'Klip', 'Komediálny žáner', 'Komédia dell arte', 'Krátkometrážny film',
    'Kulisy', 'Marianske divadlo', 'Melodráma', 'Mimika', 'Monodráma',
    'Monológ', 'Moralizujúca hra', 'Mušle', 'Muzikál', 'Mystéria',
    'Narátor', 'Návrh kostýmu', 'Noir', 'Opona', 'Osvetlenie',
    'Pásmo', 'Postava', 'Predfilm', 'Premiéra filmu', 'Produkcia',
    'Projekcia', 'Prorocká hra', 'Psychologická dráma', 'Recenzia filmu',
    'Repertoár', 'Repríza', 'Road movie', 'Romantická komédia', 'Satira',
    'Sci-fi', 'Seriál', 'Sitkom', 'Skica', 'Slapstick', 'Strihač',
    'Šou', 'Telenovela', 'Thriller', 'Titulky', 'Trailer', 'Trúchlohra',
    'Varieté', 'Veselohra', 'Video art', 'Vizuálne efekty', 'Western',
    'Záber', 'Zákulisie', 'Zvukár', 'Zvuková stopa',
  ],

  // ─────────── ŠPORT ───────────
  sport: [
    // Disciplíny
    'Aerobik', 'Atletika', 'Badminton', 'Baseball', 'Basketbal', 'Bedminton',
    'Behanie', 'Beh', 'Biatlon', 'Bicyklovanie', 'Bobsled', 'Boby', 'Bowling',
    'Box', 'Curling', 'Cyklistika', 'Diskobol', 'Diving', 'Džudo', 'Fitness',
    'Florbal', 'Futbal', 'Futsal', 'Golf', 'Gymnastika', 'Hádzaná', 'Hokej',
    'Horolezectvo', 'Jachting', 'Jazdectvo', 'Joga', 'Kanoistika', 'Karate',
    'Kayak', 'Kickbox', 'Korčuľovanie', 'Kriket', 'Krasokorčuľovanie',
    'Krasoplavanie', 'Kulturistika', 'Lakros', 'Lukostreľba', 'Lyžovanie',
    'Maratón', 'Motokros', 'Plávanie', 'Polo', 'Potápanie', 'Rugby',
    'Sánkovanie', 'Šach', 'Šerm', 'Skoky', 'Skok do diaľky', 'Skok do výšky',
    'Slalom', 'Snowboard', 'Squash', 'Streľba', 'Stolný tenis', 'Surfovanie',
    'Šerm', 'Tenis', 'Triatlon', 'Veslovanie', 'Volejbal', 'Vzpieranie',
    'Vodné pólo', 'Wrestling', 'Záchranárstvo', 'Zápasenie',
    // Rozšírené disciplíny
    'Aikido', 'Akrobacia', 'Alpské lyžovanie', 'Americký futbal', 'Aquabike',
    'Autopreteky', 'Baseball softbal', 'Beachvolejbal', 'Bežecké lyžovanie',
    'BMX', 'Bojový šport', 'Bouldering', 'Breakdance', 'Capoeira', 'Cestná cyklistika',
    'Crossfit', 'Dráhová cyklistika', 'Duatlon', 'E-sport', 'Extrémny šport',
    'Freeride', 'Freestylové lyžovanie', 'Futnet', 'Geocaching', 'Golfový turnaj',
    'Halový futbal', 'Hazena', 'Horská cyklistika', 'Horský beh', 'Hokejbal',
    'Hra petanque', 'Inline hokej', 'Ironman', 'Jazda na koni', 'Jiu-jitsu',
    'Kanoe slalom', 'Kitesurfing', 'Kendo', 'Kobudo', 'Kolesá', 'Kung fu',
    'Lezenie', 'Ľadový hokej', 'Maďarský zápas', 'Moderná gymnastika',
    'Motocyklové preteky', 'MMA', 'Nohejbal', 'Obstacle race', 'Orientačný beh',
    'Paddleboarding', 'Paragliding', 'Parašutizmus', 'Parkour', 'Pästiarstvo',
    'Pétanque', 'Pilates', 'Plachtenie', 'Plážový futbal', 'Požiarny šport',
    'Pranič', 'Preteky koní', 'Pretláčanie rukou', 'Rafting', 'Ringo',
    'Rýchlostné korčuľovanie', 'Šinty', 'Shorttrack', 'Skeleton', 'Skokova žrd',
    'Skok na lyžiach', 'Skoky do vody', 'Snooker', 'Softbal', 'Speed skiing',
    'Spining', 'Squash', 'Street workout', 'Sumo', 'Synchronizované plávanie',
    'Taekwondo', 'Tanečný šport', 'Teqball', 'Tchoukball', 'Thaibox',
    'Tobogán', 'Ultra maratón', 'Ultra trail', 'Vodné lyžovanie', 'Vodný slalom',
    'Volejbal', 'Vrh guľou', 'Wakeboarding', 'Windsurfing', 'Wushu',
    'Zjazdové lyžovanie', 'Zorbovanie',
    // Hráči a roly
    'Atlét', 'Brankár', 'Boxer', 'Cyklista', 'Diskár', 'Futbalista',
    'Gymnasta', 'Hádzanár', 'Hokejista', 'Hráč', 'Jazdec', 'Kapitán',
    'Korčuliar', 'Lyžiar', 'Obranca', 'Pretekár', 'Rozhodca', 'Šachista',
    'Šermiar', 'Skokan', 'Streľec', 'Šprintér', 'Tenista', 'Tréner',
    'Útočník', 'Vesoblanec', 'Veslár', 'Volejbalista', 'Zápasník',
    // Rozšírené roly
    'Agent hráča', 'Akrobat', 'Amatér', 'Asistent trénera', 'Biatlonista',
    'Bobista', 'Bežec', 'Bodybuilder', 'Bojovník', 'Centér', 'Defenzíva',
    'Džudista', 'Fitness tréner', 'Florbalista', 'Golfista', 'Házenkárka',
    'Jachtár', 'Judoka', 'Kajakár', 'Karateka', 'Kickboxer', 'Kondičný tréner',
    'Kraulista', 'Krosár', 'Lukostrelec', 'Maratónec', 'Masér',
    'Metodológ', 'Moderný päťbojár', 'Motocyklista', 'Náhradník', 'Nahrávač',
    'Olympionik', 'Oštepár', 'Paraatlét', 'Pilát', 'Plavec', 'Podávač',
    'Pozícia stredná', 'Pretekár rally', 'Rýchlobežec', 'Sánkar', 'Skialpinista',
    'Slalomár', 'Smečiar', 'Snowboardista', 'Spolujazdec', 'Squashista',
    'Strelkyňa', 'Surfista', 'Taekwondista', 'Tanečnica', 'Triatlonista',
    'Trénerka', 'Vodný pólista', 'Výškár', 'Vzpierač', 'Zábradlový gymnasta',
    // Vybavenie
    'Bicykel', 'Brusle', 'Činka', 'Dres', 'Helma', 'Kolieskové korčule',
    'Kopačky', 'Korčule', 'Lopta', 'Lyže', 'Mantinely', 'Palica',
    'Puk', 'Rakieta', 'Raketa', 'Sane', 'Sieťka', 'Štopky', 'Tenisky',
    'Tyč', 'Vesla', 'Vesta',
    // Rozšírené vybavenie
    'Bandáž', 'Baseballová rukavica', 'Billiardový stôl', 'Boxerské rukavice',
    'Brankárska výstroj', 'Činky', 'Crossový bicykel', 'Cvičebná podložka',
    'Dartová šípka', 'Disky', 'Dresy', 'Ekvípacia', 'Expander', 'Florbalka',
    'Futbalová lopta', 'Golfová palica', 'Golfové ihriště', 'Gymnastický koník',
    'Hod oštepom', 'Horolezecký úväz', 'Chrániče', 'Chránič zubov',
    'Jazdecké sedlo', 'Kajak', 'Kanoe', 'Karabína', 'Ketuša', 'Kladina',
    'Kriketová pálka', 'Kruh', 'Lacrossová hokejka', 'Lano', 'Lukostrelecký luk',
    'Medicinbal', 'Neoprén', 'Odrazový mostík', 'Oje', 'Oštep', 'Padák',
    'Páska', 'Pingpongová pálka', 'Ploché lyžiarky', 'Plutvy', 'Popruh',
    'Potápačská maska', 'Pás', 'Ragbyová lopta', 'Rolka', 'Skákacia lopta',
    'Skok tyč', 'Snowboardová doska', 'Surfová doska', 'Suspenzor', 'Šatňa',
    'Šípky', 'Švihadlo', 'Tatami', 'Tenisová raketa', 'Trampolína',
    'Tréningové vrece', 'Vodná lyža', 'Volejbalová sieť', 'Záťaž', 'Žinenka',
    // Miesta a podujatia
    'Aréna', 'Bazén', 'Branka', 'Hala', 'Ihrisko', 'Klzisko', 'Kurt',
    'Liga', 'Majstrovstvá', 'Olympiáda', 'Pohár', 'Reprezentácia',
    'Sála', 'Súťaž', 'Šampionát', 'Štadión', 'Telocvičňa', 'Tribúna',
    'Trať', 'Tribúna', 'Turnaj', 'Zápas', 'Závod',
    // Rozšírené miesta a podujatia
    'Akadémia', 'Antukový kurt', 'Atletická dráha', 'Bežecká dráha',
    'Bowling dráha', 'Cieľ', 'Cyklistická dráha', 'Dráha', 'Fitnescentrum',
    'Golfový areál', 'Hala ľadového hokeja', 'Hippodrom', 'Hokejová hala',
    'Hokejové majstrovstvá', 'Horská dráha', 'Jazdecký areál', 'Karate dojo',
    'Kongresové centrum', 'Kúpalisko', 'Lezecká stena', 'Ľadová plocha',
    'Maratónska trať', 'Motokrosová trať', 'Multifunkčná hala', 'Okruh',
    'Olympijský park', 'Olympijský štadión', 'Outdoor areál', 'Plavecká dráha',
    'Posilňovňa', 'Pretekársky okruh', 'Rallyová trať', 'Rogalový klub',
    'Rolovanie', 'Šatňa', 'Skokanský mostík', 'Športová hala', 'Športovisko',
    'Štadión basketbalu', 'Štart', 'Strelnica', 'Svetový pohár', 'Tenisový areál',
    'Tenisový turnaj', 'Tréningové centrum', 'UEFA Euro', 'Velodróm',
    'Veľká cena', 'Vodná nádrž', 'Výstavisko', 'Zimný štadión', 'Zjazdovka',
    // Pojmy
    'Bod', 'Diskvalifikácia', 'Disciplína', 'Faul', 'Finále', 'Forma',
    'Fáza', 'Gól', 'Karta', 'Kondícia', 'Medaila', 'Mužstvo', 'Penalta',
    'Pohyb', 'Prestávka', 'Prihrávka', 'Pravidlá', 'Rekord', 'Remíza',
    'Rezerva', 'Set', 'Skóre', 'Štafeta', 'Štart', 'Stratégia',
    'Súper', 'Taktika', 'Technika', 'Tím', 'Tréning', 'Víťazstvo',
    // Doplnkové pojmy
    'Asistencia', 'Aut', 'Debut', 'Derby', 'Draftovaný', 'Dres číslo',
    'Extraliga', 'Fair play', 'Favorit', 'Halfpipe', 'Handicap', 'Hat-trick',
    'Hetrik', 'Champions League', 'Kapitánska páska', 'Kontrakt', 'Kop',
    'Kvalifikácia', 'Ligová tabuľka', 'Majstrovský titul', 'MVP', 'Nadčas',
    'Obhajoba titulu', 'Olympijský výbor', 'Play-off', 'Podanie', 'Postup',
    'Prehra', 'Profesionál', 'Rozstrieľanie', 'Semifinále', 'Sezóna',
    'Slalom', 'Smeč', 'Sólový útok', 'Strelec', 'Superliga', 'Séria',
    'Tie-break', 'Top scorer', 'Tréningový tábor', 'Trofej', 'Turnajový',
    'UEFA', 'Volej', 'Vyrovnanie', 'Výkop', 'Žltá karta', 'Červená karta',
    // Rozšírené pojmy
    'Aeróbny výkon', 'Anaerobic', 'Antidoping', 'Auslosung', 'Backhand',
    'Bekhend', 'Blokáda', 'Bodová výhra', 'Break', 'Brejk', 'Čas', 'Čistý štít',
    'Deuce', 'Disqualifikácia', 'Doping', 'Double', 'Drajv', 'Dribbling',
    'Dvojhra', 'Efekt', 'Eliminačné kolo', 'Eliminovanie', 'Exhibícia',
    'Forehand', 'Forhend', 'Formácia', 'Freeroll', 'Futbalový systém',
    'Grand Slam', 'Halftime', 'Headstart', 'Heat', 'Hole in one', 'Homologizácia',
    'Chyba servisu', 'Injury time', 'Juniorské kategórie', 'K.O.', 'Knockout',
    'Kopačka', 'Krídelná pozícia', 'Ladenie formy', 'Lay-up', 'Lob',
    'Loose ball', 'Match point', 'Mečbol', 'Minutáž', 'Nájazd', 'Nasadenie',
    'Net', 'Nerozhodný výsledok', 'Obranná línia', 'Ofsajd', 'Overtime',
    'Pass', 'Pick and roll', 'Pivot', 'Podkovy', 'Pointa', 'Polčas',
    'Power play', 'Pressing', 'Profi liga', 'Punt', 'Quarterfinal',
    'Randel', 'Rebound', 'Red zone', 'Registrácia', 'Rošáda', 'Rotácia',
    'Rozohrevanie', 'Scrum', 'Seed', 'Setbol', 'Singles', 'Slam dunk',
    'Slick', 'Smash', 'Spin', 'Squadra', 'Štvorhra', 'Stopáž',
    'Strela trestného', 'Substitúcia', 'Súboj', 'Sudden death', 'Superseries',
    'Šprint', 'Tackle', 'Tap in', 'Technika lopty', 'Testovanie',
    'Tie', 'Time out', 'Titul', 'Top spin', 'Total football', 'Touchline',
    'Transfer', 'Tréningový plán', 'Try', 'Turnover', 'Úvod zápasu',
    'VAR', 'Vhadzovanie', 'Víťazná séria', 'Volný kop', 'Výber', 'Výhra',
    'Wildcard', 'Winner', 'Yellow card', 'Záloha', 'Zápasový plán',
  ],

  // ─────────── VEDA ───────────
  science: [
    // Vedné odbory
    'Akustika', 'Algebra', 'Anatómia', 'Antropológia', 'Aritmetika',
    'Archeológia', 'Astrofyzika', 'Astronómia', 'Bakteriológia', 'Biochémia',
    'Biofyzika', 'Biológia', 'Botanika', 'Cytológia', 'Ekológia',
    'Embryológia', 'Endokrinológia', 'Etológia', 'Fyzika', 'Fyziológia',
    'Genetika', 'Geofyzika', 'Geológia', 'Hematológia', 'Histológia',
    'Histológia', 'Hydrológia', 'Chémia', 'Imunológia', 'Kardiológia',
    'Kinetika', 'Kozmológia', 'Kryštalografia', 'Kybernetika', 'Lingvistika',
    'Logika', 'Mechanika', 'Medicína', 'Metalurgia', 'Meteorológia',
    'Mikrobiológia', 'Mineralógia', 'Morfológia', 'Neurológia', 'Onkológia',
    'Optika', 'Ornitológia', 'Paleontológia', 'Patológia', 'Pediatria',
    'Psychológia', 'Robotika', 'Seizmológia', 'Sociológia', 'Štatistika',
    'Teleskop', 'Termodynamika', 'Toxikológia', 'Trigonometria',
    'Urológia', 'Veterinárstvo', 'Virológia', 'Zoológia',
    // Rozšírené vedné odbory
    'Aerodynamika', 'Aeronómia', 'Agroekológia', 'Agrochémia', 'Akarológia',
    'Algológia', 'Alchýmia', 'Alergiológia', 'Analytická chémia', 'Andrológia',
    'Angiológia', 'Aplikovaná fyzika', 'Aplikovaná matematika', 'Arachnológia',
    'Astrobiológia', 'Astrochémia', 'Audiológia', 'Automatizácia', 'Balneológia',
    'Behaviorálna veda', 'Bioetika', 'Bioinformatika', 'Biomechanika', 'Bionika',
    'Biosystematika', 'Biotechnológia', 'Bryológia', 'Cetológia', 'Chronobiológia',
    'Demográfia', 'Dendrochronológia', 'Dermatológia', 'Diabetológia', 'Dietológia',
    'Difrakcia', 'Dynamika', 'Egyptológia', 'Elektrotechnika', 'Embryonika',
    'Endoskopia', 'Entomológia', 'Enzymológia', 'Epidemiológia', 'Epigenetika',
    'Ergonómia', 'Etnobotanika', 'Farmakológia', 'Fenológia', 'Fitochémia',
    'Fitoterapia', 'Fluidika', 'Foniatria', 'Forensika', 'Fotochémia',
    'Frenológia', 'Fytopatológia', 'Gastroenterológia', 'Genomika', 'Geodézia',
    'Geografia', 'Geomorfológia', 'Geotechnika', 'Geriatria', 'Glaciológia',
    'Glykobiológia', 'Gnoseológia', 'Grafológia', 'Heliofyzika', 'Helmintológia',
    'Herpetológia', 'Hidrogeológia', 'Histopatológia', 'Homeopatia', 'Hormonológia',
    'Hydraulika', 'Hydrochémia', 'Hydrofyzika', 'Hygiena', 'Hypnóza',
    'Ichtyológia', 'Informatika', 'Imunoterapia', 'Inžinierstvo', 'Izotopová chémia',
    'Jadrová fyzika', 'Jazykoveda', 'Karcinológia', 'Klimatológia', 'Klinická psychológia',
    'Kriminalistika', 'Kryptografia', 'Kvantová chémia', 'Kvantová fyzika', 'Lakológia',
    'Limnológia', 'Magnetizmus', 'Malakológia', 'Mammaológia', 'Matematická analýza',
    'Metrológia', 'Mikroelektronika', 'Mikromorfológia', 'Molekulárna biológia',
    'Mykológia', 'Nanotechnológia', 'Neonatológia', 'Nefrológia', 'Neurochémia',
    'Neurochirurgia', 'Neurofyziológia', 'Nukleárna medicína', 'Nutrigenomika',
    'Oceánografia', 'Oftalmológia', 'Oneirológia', 'Ontológia', 'Operačný výskum',
    'Organická chémia', 'Otorinolaryngológia', 'Parazitológia', 'Pedológia',
    'Petrofyzika', 'Petrológia', 'Pneumológia', 'Politológia', 'Populačná genetika',
    'Primatológia', 'Proteomika', 'Psychiatria', 'Psychoanalýza', 'Psychoterapia',
    'Pulmonológia', 'Rádiológia', 'Reumatológia', 'Sedimentológia', 'Selenológia',
    'Sémantika', 'Sémiotika', 'Spektroskopia', 'Speleológia', 'Statistická fyzika',
    'Stereochémia', 'Stratigráfia', 'Strojárstvo', 'Syntaxe', 'Systematika',
    'Taxonómia', 'Tektonika', 'Telemedicína', 'Teoretická fyzika', 'Topológia',
    'Transplantológia', 'Traumatológia', 'Tribológia', 'Ultrasonografia',
    'Urbanizmus', 'Vakcinológia', 'Vakuová fyzika', 'Venerológia', 'Vulkanológia',
    'Xenobiológia', 'Xylológia', 'Zymológia',
    // Pojmy a častice
    'Anióny', 'Atóm', 'Báza', 'Bunka', 'Elektrón', 'Elektronika', 'Energia',
    'Enzým', 'Foton', 'Galaxia', 'Gén', 'Génom', 'Gravitácia', 'Hmota',
    'Hormón', 'Hviezda', 'Ióny', 'Izotop', 'Jadro', 'Katalyzátor',
    'Kinéza', 'Kozmos', 'Kryštál', 'Kvarky', 'Mikroskop', 'Minerál',
    'Mitochondria', 'Mitóza', 'Molekula', 'Mutácia', 'Neutrón', 'Orbita',
    'Organela', 'Plazma', 'Protón', 'Reakcia', 'Receptor', 'Roztok',
    'Slnko', 'Spektrum', 'Štruktúra', 'Substancia', 'Sústava', 'Teleskop',
    'Tkanivo', 'Vlnenie', 'Vzorec', 'Zlúčenina', 'Zložka',
    // Rozšírené pojmy a častice
    'Absorpcia', 'Adhézia', 'Aerosól', 'Afinita', 'Agregát', 'Akcelerátor',
    'Aktivácia', 'Albumín', 'Aldehyd', 'Alfa častice', 'Alkaloid', 'Alotropia',
    'Aminokyselina', 'Ampér', 'Amplitúda', 'Anabolizmus', 'Analógia', 'Anód',
    'Antibiotiká', 'Antigén', 'Antimón', 'Antioxidant', 'Apatit', 'Aromatický kruh',
    'Arzén', 'Atom vodíka', 'ATP', 'Auróra', 'Bakteriofág', 'Baktéria',
    'Barión', 'Baryt', 'Bázická reakcia', 'Benzén', 'Beta častice', 'Bielkovina',
    'Biliardová gula', 'Binárny systém', 'Biochémia', 'Biofilm', 'Biomasa',
    'Biomarker', 'Bioreaktor', 'Biosenzor', 'Biosféra', 'Biotit', 'Bizmut',
    'Bór', 'Bosón', 'Bromid', 'Butanol', 'Cementácia', 'Centrifúga',
    'Cesium', 'Chlór', 'Chlorid', 'Chlorofyl', 'Cholesterol', 'Chromozóm',
    'Cudzorodzý prvok', 'Cytoplazma', 'Datovacie metódy', 'Defekt kryštálu',
    'Degradácia', 'Dendrit', 'Derivát', 'Destilácia', 'Detektor', 'Deutérium',
    'Diafragma', 'Diamant', 'Difúzia', 'Dimer', 'Dipól', 'Dispergácia',
    'Disociácia', 'DNA', 'Dopamin', 'Dvojná špirála', 'Džúl', 'Efekt',
    'Einstein', 'Elektrochemický článok', 'Elektrolýza', 'Elektrolyt', 'Elektromagnetizmus',
    'Elektrónová vrstva', 'Elektrostatika', 'Element', 'Eléncia', 'Emisia',
    'Emulzia', 'Endoplazmatické retikulum', 'Endotermický', 'Entrópia', 'Epicentrum',
    'Ester', 'Etanol', 'Etén', 'Éter', 'Eukariot', 'Excitácia',
    'Exotermický', 'Exponenciálny rast', 'Extrémofil', 'Faradayov zákon', 'Femto',
    'Fermión', 'Fermentácia', 'Fermium', 'Ferroelektrikum', 'Fibroblas',
    'Filtrácia', 'Fissile', 'Fixácia', 'Fluór', 'Fluorescencia', 'Flux',
    'Fólium', 'Fosfor', 'Fosforescencia', 'Fosforylácia', 'Fotoelement',
    'Fotón', 'Frakcia', 'Frekvencia', 'Fruktan', 'Fusidová kyselina', 'Galaktóza',
    'Galium', 'Gama žiarenie', 'Gaz', 'Gel', 'Genetický kód', 'Geotermálny',
    'Glukóza', 'Glutamát', 'Glutén', 'Glycerín', 'Glycíd', 'Golgiho aparát',
    'Grafén', 'Grafit', 'Gravitón', 'Guanín', 'Hadróny', 'Halogén',
    'Heliox', 'Hélium', 'Hemoglobín', 'Heterotroph', 'Hexagón', 'Higgs bosón',
    'Histamín', 'Histón', 'Homozygot', 'Horčík', 'Humus', 'Hybrid',
    'Hydrid', 'Hydrofóbny', 'Hydroxid', 'Hypertrofia', 'Hypotéza nulová',
    // Pojmy z výskumu
    'Analýza', 'Axióma', 'Definícia', 'Dôkaz', 'Experiment', 'Hypotéza',
    'Klasifikácia', 'Konštanta', 'Laboratórium', 'Meranie', 'Metóda',
    'Model', 'Objav', 'Pokus', 'Pozorovanie', 'Prístroj', 'Princíp',
    'Pravidlo', 'Princíp', 'Premenná', 'Teória', 'Vedec', 'Veličina',
    'Vlastnosť', 'Výpočet', 'Výsledok', 'Vzorec', 'Zákon', 'Závislosť',
    // Rozšírené výskumné pojmy
    'Abstrakt', 'Adiabatický proces', 'Algoritmus', 'Alternatíva', 'Aproximácia',
    'Argumentácia', 'Asymptotický', 'Axiomatický systém', 'Biometrický',
    'Blind test', 'Bootstrap', 'Celulózový filter', 'Certifikácia', 'Citácia',
    'Cross-validation', 'Dataset', 'Dekompozícia', 'Determinizmus', 'Dvojitá slepá štúdia',
    'Ekstrapolácia', 'Empirický zákon', 'Error bar', 'Experimentálny protokol',
    'Falzifikácia', 'Fenotyp', 'Fokusová skupina', 'Formulácia', 'Granulita',
    'Heuristika', 'Hlavná hypotéza', 'Identifikácia', 'Impact factor', 'In silico',
    'In vitro', 'In vivo', 'Inferencia', 'Integrácia poznatkov', 'Interdisciplinárny',
    'Interná validita', 'Interpolácia', 'Interpretácia', 'Inverzia', 'Izolácia',
    'Kalibrácia', 'Kauzalita', 'Koeficient', 'Kohortová štúdia', 'Koincidencia',
    'Komplementárny', 'Konfidenčný interval', 'Kontrolná skupina', 'Konvergencia',
    'Korekcia', 'Korelácia', 'Kritická hodnota', 'Kurva', 'Kvalitatívny výskum',
    'Kvantitatívny výskum', 'Laboratórna teplota', 'Limita', 'Lineárna závislosť',
    'Longitudinálna štúdia', 'Margin of error', 'Matrica', 'Median', 'Meta-analýza',
    'Metodológia', 'Modus', 'Multicentrická štúdia', 'Multivariantný', 'Normalizácia',
    'Null hypothesis', 'Numerický model', 'Observácia', 'Odchýlka', 'Operacionalizácia',
    'Optimalizácia', 'Outlier', 'P-hodnota', 'Paradigma', 'Parameter', 'Parsimónia',
    'Patent', 'Peer review', 'Permutácia', 'Pilotná štúdia', 'Plagiarizmus',
    'Potvrdenie', 'Pravdepodobnosť', 'Predikcia', 'Presnosť', 'Primárny zdroj',
    'Priori', 'Prognóza', 'Protokol', 'Pubmed', 'Kvalita dát', 'Randomizácia',
    'Redundancia', 'Referencia', 'Regression', 'Reliabilita', 'Replikácia',
    'Reprezentatívnosť', 'Retrospektívna štúdia', 'Robustnosť', 'Sampling',
    'Scientific method', 'Sekundárny zdroj', 'Senzitivita', 'Signifikantnosť',
    'Simulácia', 'Skewness', 'Specificita', 'Spektrometer', 'Spleť', 'SPSS',
    'Štandardná odchýlka', 'Statická analýza', 'Stochastický', 'Súbor dát',
    'Systematic review', 'Štatistická významnosť', 'Tautológia', 'Taxonomická jednotka',
    'Technický report', 'Thesis', 'Titračná krivka', 'Transkripcia', 'Trend',
    'Typológia', 'Údaje', 'Validácia', 'Validita', 'Variabilita', 'Variancia',
    'Verifikácia', 'Vzorka', 'Working hypothesis', 'Závislosť premenných',
  ],

  // ─────────── HISTÓRIA ───────────
  history: [
    // Obdobia a éry
    'Antika', 'Barok', 'Bronzová doba', 'Doba kamenná', 'Doba železná',
    'Gotika', 'Klasicizmus', 'Mezolit', 'Moderna', 'Neolit', 'Novovek',
    'Osvietenstvo', 'Paleolit', 'Praveká doba', 'Pravek', 'Renesancia',
    'Romantizmus', 'Stredovek', 'Starovek',
    // Rozšírené obdobia
    'Absolutizmus', 'Archaické obdobie', 'Atenská demokracia', 'Babylonské zajatie',
    'Belle Époque', 'Biedermeier', 'Byzantská éra', 'Časť dejín', 'Čas vojen',
    'Doba rímskeho cisárstva', 'Doba rozkvetu', 'Doba sťahovania národov',
    'Dynastické obdobie', 'Éra kolónií', 'Éra objavov', 'Feudalizmus',
    'Helenistická doba', 'Historické obdobie', 'Industriálna revolúcia',
    'Junácka éra', 'Karolinská renesancia', 'Kolonializmus', 'Konštantinovská éra',
    'Korintská doba', 'Kultúrna revolúcia', 'Medzivojnové obdobie', 'Merovejská éra',
    'Mykénska civilizácia', 'Náboženská reformácia', 'Neskorá antika', 'Normanské obdobie',
    'Obdobie Veľkej Moravy', 'Orientálne obdobie', 'Obdobie republiky', 'Ottonovská renesancia',
    'Periklova éra', 'Pionierska doba', 'Plavecká doba', 'Poaugustovská éra',
    'Poklasické obdobie', 'Postreformačné obdobie', 'Predhistorická doba', 'Prístorická éra',
    'Protorenesancia', 'Republika', 'Rímska republika', 'Roaring Twenties',
    'Roky vojny', 'Románska doba', 'Sakrálna doba', 'Scholastika', 'Secesia',
    'Štvrtá krížová výprava', 'Temné obdobie', 'Totalizmus', 'Tridsaťročná vojna',
    'Tudorovská doba', 'Veľká francúzska revolúcia', 'Vestfálsky mier',
    'Viktorianská éra', 'Vojenské obdobie', 'Výmarská republika', 'Začiatky civilizácie',
    // Ríše a štáty
    'Asýria', 'Babylonia', 'Byzancia', 'Cárstvo', 'Dynastia', 'Egypt',
    'Etruskovia', 'Frankovia', 'Galovia', 'Germáni', 'Habsburg', 'Helada',
    'Cárstvo', 'Cisárstvo', 'Impérium', 'Karolovci', 'Kelti', 'Kráľovstvo',
    'Mezopotámia', 'Mongoli', 'Normandi', 'Osmanská ríša', 'Perzia',
    'Rím', 'Rímska ríša', 'Slovania', 'Sumeri', 'Vikingovia', 'Vizigóti',
    // Rozšírené ríše a štáty
    'Achájsky spolok', 'Akkádska ríša', 'Antverpia', 'Aragon', 'Asturia',
    'Aztécka ríša', 'Benátska republika', 'Burgundsko', 'Čínska ríša',
    'Dácka ríša', 'Deliansky spolok', 'Dutchistan', 'Egejské civilizácie',
    'Fenícka civilizácia', 'Florentská republika', 'Francúzske kráľovstvo',
    'Genua', 'Gótovia', 'Grécke mestské štáty', 'Habsburská monarchia',
    'Hanza', 'Hetitská ríša', 'Holandská republika', 'Inkovia', 'Izraelské kráľovstvo',
    'Juhoslovanské kráľovstvo', 'Kartágo', 'Kastília', 'Kidariti', 'Kogurjeo',
    'Konfederácia', 'Kušanská ríša', 'Latinské cisárstvo', 'Longobardi',
    'Lužická kultúra', 'Macedónia', 'Majovia', 'Maurská ríša', 'Moghulovia',
    'Moravské kniežatstvo', 'Navarra', 'Novoasýrska ríša', 'Novobabylonská ríša',
    'Numidia', 'Obodritov', 'Olmékovia', 'Ostrogóti', 'Partská ríša',
    'Piemonté', 'Pizánska republika', 'Poľské kráľovstvo', 'Portugalské kráľovstvo',
    'Predrímske civilizácie', 'Pruské kráľovstvo', 'Ptolemaiovský Egypt',
    'Rakúsko-Uhorsko', 'Rímsko-nemecká ríša', 'Ruské cárstvo', 'Sámova ríša',
    'Sardínske kráľovstvo', 'Seleukovská ríša', 'Sicílske kráľovstvo', 'Songhai',
    'Spartský štát', 'Svätá ríša rímska', 'Škandinávski', 'Teutónsky rád',
    'Thébska hegemónia', 'Tretia ríša', 'Uhorské kráľovstvo', 'Vandali',
    'Veľká Morava', 'Visiovia', 'Východorímska ríša', 'Západorímska ríša',
    // Vojny a udalosti
    'Bitka', 'Boj', 'Križiacka výprava', 'Obliehanie', 'Obrat', 'Odboj',
    'Okupácia', 'Pakt', 'Partizánsky boj', 'Pochod', 'Povstanie',
    'Prevrat', 'Reformácia', 'Revolúcia', 'Sila', 'Svetová vojna',
    'Útok', 'Vojna', 'Vojská', 'Vpád', 'Zmluva', 'Zrážka',
    // Rozšírené vojny a udalosti
    'Americká revolúcia', 'Americká občianska vojna', 'Anglická občianska vojna',
    'Arabské výboje', 'Bitka pri Issus', 'Bitka pri Marathóne', 'Bitka pri Termopylách',
    'Bitka pri Waterloo', 'Bitka pri Kursku', 'Bitka o Britániu', 'Bitka o Stalingrad',
    'Bolševická revolúcia', 'Búrska vojna', 'Byzancia vojna', 'Čínska občianska vojna',
    'Dekolonizácia', 'D-Day', 'Druhá punská vojna', 'Francúzska revolúcia',
    'Galské vojny', 'Grécko-perzské vojny', 'Guelfovia a ghibelíni', 'Holokaust',
    'Hrdinská smrť', 'Husitské vojny', 'Japonská expanzia', 'Jutská bitka',
    'Kórejská vojna', 'Krymská vojna', 'Kubánska revolúcia', 'Makedónske vojny',
    'Mexická revolúcia', 'Mladoturecká revolúcia', 'Napoleonské vojny',
    'Nemecká kolonizácia', 'Normandská invázia', 'Normanské výboje', 'Norimberské procesy',
    'Októbrová revolúcia', 'Opiumové vojny', 'Pád Berlínskeho múru', 'Pád Konštantínopolu',
    'Pád Rímskeho cisárstva', 'Peloponézska vojna', 'Perzský ťaženie', 'Pirátske vpády',
    'Pochod na Rím', 'Podpísanie kapituly', 'Poľské delenia', 'Premiérová bitka',
    'Princezná vojna', 'Protestantská reformácia', 'Punické vojny', 'Reconquista',
    'Rekonštrukcia', 'Revolúcia roku 1848', 'Revolučná vlna', 'Ríšske vojny',
    'Rímske občianske vojny', 'Ruská revolúcia', 'Rusko-japonská vojna',
    'Sedmička ročná vojna', 'Sionizmus', 'Spartakovo povstanie', 'Storočná vojna',
    'Studená vojna', 'Tatársky vpád', 'Trójska vojna', 'Tridsaťročná vojna',
    'Vestfálsky kongres', 'Viedenský kongres', 'Vojna v Indočíne', 'Vojna vo Vietname',
    'Vojnový konflikt', 'Zjednotenie Nemecka', 'Zjednotenie Talianska',
    // Vládcovia a hodnosti
    'Cisár', 'Cisárovná', 'Cár', 'Diktátor', 'Faraón', 'Generál',
    'Guvernér', 'Hetman', 'Knieža', 'Kráľ', 'Kráľovná', 'Maharadža',
    'Maršal', 'Minister', 'Monarcha', 'Námestník', 'Panovník', 'Pápež',
    'Plukovník', 'Poručík', 'Posol', 'Prefekt', 'Premiér', 'Prezident',
    'Princ', 'Princezná', 'Senátor', 'Sultán', 'Šľachtic', 'Veľmož',
    'Veľvyslanec', 'Vladár', 'Vojvoda', 'Vojvodca',
    // Rozšírené hodnosti
    'Admirál', 'Arcibiskup', 'Arcivojvoda', 'Barón', 'Basileus', 'Biskup',
    'Bojarin', 'Burgundi', 'Centurion', 'Comes', 'Consul', 'Dóža',
    'Dragoman', 'Dux', 'Emir', 'Exarcha', 'Fiľar', 'Graf', 'Grandee',
    'Hospodar', 'Chálifát', 'Chanc', 'Chán', 'Imperátor', 'Intendant',
    'Kalif', 'Kapitulár', 'Kazateľ', 'Kľúčnik', 'Konetábl', 'Konzul',
    'Korún', 'Krajčir', 'Kráľovský radca', 'Kurfiřt', 'Legát', 'Lord',
    'Magnát', 'Markíz', 'Major', 'Majster', 'Mestský radca', 'Mufti',
    'Miestokráľ', 'Nádvorník', 'Nuncius', 'Oligarcha', 'Palatín', 'Pascha',
    'Patrón', 'Peer', 'Pilgrim', 'Podžupan', 'Primaster', 'Prokonsul',
    'Protonotár', 'Purkrabí', 'Rabbi', 'Radca', 'Regent', 'Rex',
    'Rytiersky majster', 'Šajtán', 'Šambelan', 'Šarža', 'Šerif',
    'Špión', 'Stolpán', 'Stratég', 'Študent', 'Tribún', 'Trubadúr',
    'Veľkomajster', 'Veľkoválocho', 'Vikár', 'Víťaz', 'Vojvodkyňa',
    'Župan',
    // Pojmy
    'Aristokracia', 'Demokracia', 'Despotizmus', 'Encyklika', 'Edikt',
    'Emancipácia', 'Federácia', 'Inkvizícia', 'Kolonizácia', 'Konkordát',
    'Konzervatívizmus', 'Liberalizmus', 'Legenda', 'Lén', 'Manifest',
    'Migrácia', 'Mýtus', 'Nacionalizmus', 'Občianstvo', 'Otroctvo',
    'Parlament', 'Politika', 'Republika', 'Schizma', 'Senát', 'Storočie',
    'Tradícia', 'Tribunál', 'Únia',
    // Rozšírené pojmy
    'Abolícia', 'Absolutistická vláda', 'Agrárna reforma', 'Akreditácia',
    'Aliancia', 'Amnestia', 'Anarchia', 'Anexia', 'Antiklerikalismus',
    'Antisemitizmus', 'Apanáž', 'Archivácia', 'Armáda', 'Autonómia',
    'Banát', 'Barbarstvo', 'Buržoázia', 'Celibát', 'Centr', 'Charter',
    'Cirkevná moc', 'Cisársky dvor', 'Civilizácia', 'Colonialism', 'Concordat',
    'Daňový systém', 'Dekrét', 'Demarkácia', 'Despotia', 'Diplomatický protokol',
    'Diskriminácia', 'Dlh', 'Doktrína', 'Dominion', 'Drába', 'Dŕžava',
    'Duchovná moc', 'Dynastická línia', 'Etnická skupina', 'Exkomunikácia',
    'Exil', 'Expanzia', 'Feudálna sústava', 'Filozofia', 'Fraška',
    'Genealógia', 'Genocída', 'Gentry', 'Gildy', 'Gubernia', 'Heraldika',
    'Hierarchia', 'Historiografia', 'Hladomor', 'Hospodárstvo', 'Humanizmus',
    'Ideológia', 'Imperializmus', 'Industrializácia', 'Interdikt', 'Izolacionizmus',
    'Jánošíkovstvo', 'Jurisdikcia', 'Kapitalizmus', 'Kastový systém', 'Klerikalizmus',
    'Korunovacia', 'Kozmopolitizmus', 'Kroniky', 'Kultúrne dedičstvo', 'Legitimizmus',
    'Majestát', 'Marxizmus', 'Merkantilistika', 'Militarizmus', 'Misia',
    'Modernizácia', 'Monarchismus', 'Morálka', 'Mučeníctvo', 'Nacizmus',
    'Nárečie', 'Národné obrodenie', 'Násilná zmena', 'Neutralita', 'Nobilitácia',
    'Nomenklatúra', 'Občianska spoločnosť', 'Opozícia', 'Ordo', 'Panstvo',
    'Patriotizmus', 'Počet', 'Poddanstvo', 'Pohan', 'Politická strana',
    'Posvätnosť', 'Prax', 'Právo', 'Privilege', 'Procesy', 'Proletariát',
    'Propaganda', 'Protektorát', 'Provincializmus', 'Puritanizmus', 'Rasa',
    'Rasizmus', 'Reakcionárstvo', 'Regálie', 'Rekonverzia', 'Resistencia',
    'Restitúcia', 'Roajalizmus', 'Robota', 'Rukopis', 'Rytierstvo',
    'Samozvany', 'Sekularizácia', 'Seniorizmus', 'Služba', 'Socialismus',
    'Solidarita', 'Správa', 'Štandardizácia', 'Stratifikácia', 'Suverenita',
    'Šľachta', 'Šovinizmus', 'Teokracia', 'Totalitarizmus', 'Trieda',
    'Urbár', 'Ústavnosť', 'Utópia', 'Vazalstvo', 'Vlastenectvo', 'Vojenská služba',
    'Voľby', 'Vzdelanie', 'Zásada', 'Závet', 'Zelotizmus', 'Zemepánstvo',
  ],

  // ─────────── GEOGRAFIA ───────────
  geography: [
    // Kontinenty a regióny
    'Afrika', 'Amerika', 'Antarktída', 'Arktída', 'Ázia', 'Austrália',
    'Balkán', 'Európa', 'Karibik', 'Oceánia', 'Patagónia', 'Polynézia',
    'Sibír', 'Škandinávia',
    // Rozšírené regióny
    'Apeniny', 'Arabský polostrov', 'Atika', 'Bavorsko', 'Bengálsko',
    'Benelux', 'Borneo', 'Bretónsko', 'Britské ostrovy', 'Burgenland',
    'Byzantium', 'Čiernohorský region', 'Dalmatia', 'Dalmácia', 'Dolné Rakúsko',
    'Dolný Sliezsko', 'Dordogne', 'Durínsko', 'Elzas', 'Flámsko',
    'Frízsko', 'Galícia', 'Grónsko', 'Havaj', 'Hesensko', 'Horné Rakúsko',
    'Ibéria', 'Indočína', 'Jadrán', 'Juhozápadná Ázia', 'Jutsko',
    'Kalábria', 'Katalánsko', 'Kaukaz', 'Kodaňský región', 'Korutánsko',
    'Kosovo', 'Kraňsko', 'Krym', 'Kurily', 'Laponsko', 'Latínska Amerika',
    'Lotrínsko', 'Lombardia', 'Macedónia', 'Magnesia', 'Malá Ázia',
    'Mezopotámia', 'Molise', 'Morava', 'Moskovská oblasť', 'Normandia',
    'Nový Zéland', 'Núbia', 'Okinawa', 'Palestína', 'Piemonte', 'Pomerania',
    'Provence', 'Prusko', 'Rýnsko', 'Sasko', 'Sicília', 'Sliezsko',
    'Stredomorie', 'Stredná Amerika', 'Stredná Ázia', 'Stredná Európa',
    'Švábsko', 'Tirolsko', 'Toskánsko', 'Transylvánia', 'Turkestan',
    'Umbria', 'Valónia', 'Veneto', 'Viedenský les', 'Vojvodina',
    'Východná Európa', 'Wales', 'Západná Európa', 'Záporožie',
    // Krajiny
    'Albánsko', 'Anglicko', 'Argentína', 'Bulharsko', 'Bielorusko',
    'Belgicko', 'Bolívia', 'Bosna', 'Brazília', 'Cyprus', 'Česko',
    'Čierna Hora', 'Čile', 'Čína', 'Dánsko', 'Egypt', 'Estónsko',
    'Etiópia', 'Filipíny', 'Fínsko', 'Francúzsko', 'Grécko', 'Gruzínsko',
    'Holandsko', 'Chorvátsko', 'India', 'Indonézia', 'Irak', 'Irán',
    'Island', 'Izrael', 'Japonsko', 'Jordánsko', 'Kambodža', 'Kanada',
    'Katar', 'Kazachstan', 'Keňa', 'Kolumbia', 'Kórea', 'Kuba',
    'Libanon', 'Litva', 'Lotyšsko', 'Luxembursko', 'Maďarsko', 'Malajzia',
    'Malta', 'Maroko', 'Mexiko', 'Monako', 'Mongolsko', 'Nemecko',
    'Nepál', 'Nigéria', 'Nórsko', 'Pakistan', 'Peru', 'Poľsko',
    'Portugalsko', 'Rakúsko', 'Rumunsko', 'Rusko', 'Singapur',
    'Slovensko', 'Slovinsko', 'Srbsko', 'Sudán', 'Sýria', 'Španielsko',
    'Švajčiarsko', 'Švédsko', 'Taliansko', 'Taiwan', 'Thajsko', 'Tunisko',
    'Turecko', 'Ukrajina', 'Uruguay', 'Vatikán', 'Venezuela', 'Vietnam',
    // Rozšírené krajiny
    'Afganistan', 'Alžírsko', 'Andorra', 'Angola', 'Antigua a Barbuda',
    'Arménsko', 'Azerbajdžan', 'Bahamy', 'Bahrajn', 'Bangladéš', 'Barbados',
    'Belize', 'Benin', 'Bhután', 'Botswana', 'Brunei', 'Burkina Faso',
    'Burundi', 'Čad', 'Dominika', 'Dominikánska republika', 'Džibutsko',
    'Ekvádor', 'Eritrea', 'Fidži', 'Gabun', 'Gambia', 'Ghana', 'Grenada',
    'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
    'Írsko', 'Jamajka', 'Jemen', 'Južná Afrika', 'Kapverdy', 'Kamerun',
    'Kirgizsko', 'Kiribati', 'Komory', 'Kongo', 'Kostarika', 'Kuvajt',
    'Laos', 'Lesotho', 'Libéria', 'Líbya', 'Lichtenštajnsko', 'Madagaskar',
    'Malawi', 'Maldivy', 'Mali', 'Marshallove ostrovy', 'Maurícius',
    'Mauritánia', 'Mikronézia', 'Moldavsko', 'Mozambik', 'Mjanmarsko',
    'Namíbia', 'Nauru', 'Nikaragua', 'Niger', 'Omán', 'Palau', 'Panama',
    'Papua-Nová Guinea', 'Paraguay', 'Rwanda', 'Salvador', 'Samoa',
    'San Maríno', 'Saudská Arábia', 'Senegal', 'Seychely', 'Sierra Leone',
    'Somálsko', 'Srí Lanka', 'Stredoafrická republika', 'Surinam',
    'Svazijsko', 'Svätá Lucia', 'Svätý Krištof a Nevis', 'Svätý Tomáš a Princov ostrov',
    'Svätý Vincent a Grenadíny', 'Tadžikistan', 'Tanzánia', 'Togo', 'Tonga',
    'Trinidad a Tobago', 'Turkménsko', 'Tuvalu', 'Uganda', 'Uzbekistan',
    'Vanuatu', 'Východný Timor', 'Zambia', 'Zimbabwe',
    // Mestá
    'Amsterdam', 'Atény', 'Bagdad', 'Barcelona', 'Belehrad', 'Berlín',
    'Bombaj', 'Bratislava', 'Brusel', 'Budapešť', 'Bukurešť', 'Damask',
    'Dublin', 'Frankfurt', 'Hamburg', 'Helsinki', 'Istanbul', 'Káhira',
    'Kodaň', 'Košice', 'Krakov', 'Lisabon', 'Londýn', 'Madrid', 'Manila',
    'Miláno', 'Moskva', 'Mníchov', 'Neapol', 'Oslo', 'Ottawa', 'Paríž',
    'Peking', 'Praha', 'Riga', 'Rím', 'Singapur', 'Sofia', 'Štokholm',
    'Sydney', 'Šanghaj', 'Tallinn', 'Tirana', 'Tokio', 'Toronto', 'Varšava',
    'Viedeň', 'Vilnius', 'Záhreb',
    // Rozšírené mestá
    'Adelaide', 'Akra', 'Alžír', 'Ammán', 'Ankara', 'Antverpy',
    'Astana', 'Auckland', 'Austin', 'Baku', 'Baltimore', 'Bangalúr',
    'Bangkok', 'Bejrút', 'Belém', 'Bern', 'Birmingham', 'Bogotá',
    'Bologna', 'Boston', 'Brasília', 'Brisbane', 'Buenos Aires', 'Bukurešť',
    'Calgary', 'Caracas', 'Cardiff', 'Casablanca', 'Čennai', 'Chicago',
    'Colombo', 'Dakar', 'Dallas', 'Denver', 'Detroid', 'Dubaj',
    'Düsseldorf', 'Edinburgh', 'Edmonton', 'Florencia', 'Fukuoka', 'Gdaňsk',
    'Ženeva', 'Göteborg', 'Guangzhou', 'Guatemala City', 'Haifa', 'Halifax',
    'Hanoi', 'Havana', 'Hirošima', 'Ho Či Minovo Mesto', 'Hongkong', 'Houston',
    'Charkov', 'Christchurch', 'Innsbruck', 'Islamabad', 'Izmir', 'Jakarta',
    'Jerevan', 'Johannesburg', 'Kalkata', 'Kapské Mesto', 'Karáči', 'Kathmandu',
    'Kijov', 'Kinshasa', 'Kuala Lumpur', 'Kyoto', 'Lagos', 'Lahore',
    'Las Vegas', 'Leeds', 'Leipzig', 'Lima', 'Liverpool', 'Los Angeles',
    'Lübeck', 'Lyon', 'Malmö', 'Manchester', 'Marseille', 'Mekka',
    'Melbourne', 'Memphis', 'Mexico City', 'Miami', 'Milwaukee', 'Minneapolis',
    'Minsk', 'Montevideo', 'Montpellier', 'Montreal', 'Mumbai', 'Nagoja',
    'Nairobi', 'Nantes', 'New Delhi', 'New Orleans', 'New York', 'Nice',
    'Novosibirsk', 'Ósaka', 'Perth', 'Philadelphia', 'Phoenix', 'Pittsburgh',
    'Portland', 'Porto', 'Poznaň', 'Puebla', 'Quebec', 'Quito',
    'Rabat', 'Recife', 'Reykjavík', 'Rio de Janeiro', 'Rotterdam', 'Salvador',
    'San Diego', 'San Francisco', 'San Juan', 'Santiago', 'Santo Domingo',
    'São Paulo', 'Sarajevo', 'Seattle', 'Seville', 'Soul', 'Štrasburg',
    'Stuttgart', 'Surabaja', 'Tchaj-pej', 'Teherán', 'Tel Aviv', 'Thessaloniki',
    'Tijuana', 'Toulouse', 'Tripolis', 'Tunis', 'Turín', 'Valencia',
    'Vancouver', 'Veracruz', 'Vladivostok', 'Volgograd', 'Washington',
    'Wellington', 'Wroclaw', 'Zagreb', 'Zürich',
    // Geografické útvary
    'Bralo', 'Delta', 'Dolina', 'Hora', 'Hrebeň', 'Jaskyňa', 'Jazero',
    'Kaňon', 'Kotlina', 'Krajina', 'Krajinka', 'Močiar', 'More', 'Nížina',
    'Ostrov', 'Plošina', 'Pohorie', 'Polostrov', 'Prales', 'Príliv',
    'Priesmyk', 'Prístav', 'Prúd', 'Púšť', 'Rieka', 'Roklina', 'Rovina',
    'Sopka', 'Step', 'Súostrovie', 'Tajga', 'Tundra', 'Údolie', 'Útes',
    'Vodopád', 'Záliv',
    // Rozšírené geografické útvary
    'Atol', 'Bariérový útes', 'Bazalt', 'Biom', 'Brehová línia', 'Búrka',
    'Cieľ', 'Čierna diera', 'Dažďový prales', 'Duna', 'Ekosystém', 'Erózia',
    'Fjord', 'Gejzír', 'Glaciálny', 'Graben', 'Horná hranica lesa', 'Horský masív',
    'Húština', 'Chrbát', 'Ílovitá pôda', 'Jazierko', 'Kanál', 'Korálový útes',
    'Korytina', 'Kráter', 'Lagúna', 'Ľadovec', 'Ľadovcový jazyk', 'Ľadopád',
    'Mangrovový les', 'Meander', 'Minerálny prameň', 'Moréna', 'Národný park',
    'Nánosina', 'Náplaviská', 'Nasuté pole', 'Obilninový pás', 'Oceánska priekopa',
    'Ostroh', 'Panva', 'Pasáže', 'Pasienok', 'Permafrost', 'Pieninový útvar',
    'Piesočná duna', 'Planina', 'Plato', 'Pláž', 'Podmorský hrebeň', 'Pohraničie',
    'Polárna noc', 'Polárny deň', 'Porast', 'Práčka', 'Prameň', 'Predholie',
    'Príbrežné vody', 'Prírodná rezervácia', 'Prieliv', 'Pruh', 'Púštna oáza',
    'Regióny', 'Ríf', 'Riečište', 'Riečna kotlina', 'Savana', 'Sediment',
    'Severná pologuľa', 'Shoal', 'Skála', 'Skala', 'Skalné mesto', 'Skalný previs',
    'Snehová čiara', 'Sopečný kráter', 'Sopečný ostrov', 'Stratovulkán', 'Strom',
    'Supercela', 'Sútok', 'Šelf', 'Terasa', 'Tiesňava', 'Tlak', 'Tropický cyklón',
    'Úboč', 'Úžina', 'Velehorská', 'Veterná erózia', 'Vrcholec', 'Vulkán',
    'Vulkanická pôda', 'Výmoľ', 'Vysokohorský', 'Záplava', 'Zemina', 'Zráz',
    // Konkrétne
    'Alpy', 'Amazónia', 'Andy', 'Atlantik', 'Balaton', 'Baltské more',
    'Dunaj', 'Everest', 'Ganga', 'Himaláje', 'Jadran', 'Kaspické more',
    'Karpaty', 'Kilimandžáro', 'Mississippi', 'Nil', 'Pyreneje', 'Rajn',
    'Sahara', 'Tatra', 'Tatry', 'Temža', 'Tichý oceán', 'Ural', 'Volga',
    // Rozšírené konkrétne miesta
    'Aconcagua', 'Amazonka', 'Anapurna', 'Appalachian Mountains', 'Azorské ostrovy',
    'Baikal', 'Bajkálske jazero', 'Barentsovo more', 'Bosporský prieliv', 'Čierny les',
    'Čierne more', 'Colorado', 'Danube Delta', 'Dardanely', 'Dead Sea', 'Etna',
    'Eufrat', 'Faerské ostrovy', 'Fujisan', 'Galapágy', 'Gibraltár', 'Gobi',
    'Grand Canyon', 'Great Barrier Reef', 'Grónske more', 'Havajské ostrovy',
    'Helgoland', 'Hindu Kush', 'Horný Sliezsko', 'Hudson', 'Indický oceán',
    'Iguaçu', 'Irtyš', 'Java', 'Jungfrau', 'K2', 'Kanárske ostrovy',
    'Kaspické more', 'Kavkaz', 'Kenya', 'Kilauea', 'Kolorado', 'Kongo rieka',
    'Krakatoa', 'Krím', 'Ladožské jazero', 'Lago di Garda', 'Lake Michigan',
    'Lake Superior', 'Lake Victoria', 'Loire', 'Mackenzie', 'Madeira',
    'Malorka', 'Maldive', 'Maňa', 'Mariana Trench', 'Matterhorn', 'Mauna Kea',
    'McKinley', 'Mekong', 'Mont Blanc', 'Murray', 'Namib', 'Niagarské vodopády',
    'Níger', 'Nílska delta', 'Ob', 'Orinoco', 'Panama Canal', 'Panamský prieplav',
    'Patagonský ľadovec', 'Perzský záliv', 'Popocatépetl', 'Pôsobisko', 'Rhône',
    'Rio Grande', 'Rocky Mountains', 'Ross Sea', 'Rysy', 'Seina', 'Severnomorský prieliv',
    'Severný pól', 'Sierra Nevada', 'Sinai', 'Stredozemné more', 'Suezský prieplav',
    'Sumatra', 'Sundské ostrovy', 'Svätý Vavrinec', 'Tanganika', 'Tiber',
    'Tibetská náhorná plošina', 'Tigris', 'Transandinská cesta', 'Tunguzka',
    'Veľké jazerá', 'Veľké soľné jazero', 'Vesuvius', 'Victoria Falls', 'Vihorlat',
    'Yukon', 'Zambezi', 'Zelený mys', 'Zemplín',
  ],

  // ─────────── OSOBY A ROLY ───────────
  person: [
    // Profesie
    'Advokát', 'Architekt', 'Astronaut', 'Bankár', 'Básnik', 'Biológ',
    'Botanik', 'Bývalý', 'Cestovateľ', 'Detektív', 'Diplomat', 'Doktor',
    'Dramaturg', 'Ekonóm', 'Elektrikár', 'Etnograf', 'Farmár', 'Filozof',
    'Fotograf', 'Fyzik', 'Generál', 'Genetik', 'Geograf', 'Geológ',
    'Herec', 'Herečka', 'Historik', 'Hudobník', 'Chemik', 'Chirurg',
    'Inštruktor', 'Inžinier', 'Kapitán', 'Kardiológ', 'Knihovník',
    'Kolega', 'Konštruktér', 'Kuchár', 'Lekár', 'Lekárnik', 'Maliar',
    'Manažér', 'Matematik', 'Mechanik', 'Mediátor', 'Mentor', 'Mentor',
    'Misionár', 'Mladík', 'Murár', 'Nadšenec', 'Notár', 'Novinár',
    'Občan', 'Obchodník', 'Odborník', 'Operátor', 'Pacient', 'Pekár',
    'Pilot', 'Pirát', 'Pisateľ', 'Politik', 'Pošťák', 'Pracovník',
    'Profesor', 'Programátor', 'Prokurátor', 'Psychológ', 'Reportér',
    'Režisér', 'Riaditeľ', 'Rybár', 'Rytier', 'Sestra', 'Skladateľ',
    'Sluha', 'Sochár', 'Sociológ', 'Sokolník', 'Spevák', 'Speváčka',
    'Spisovateľ', 'Sprievodca', 'Stolár', 'Stratég', 'Strážca', 'Svedok',
    'Svätec', 'Šerif', 'Štatistik', 'Tajomník', 'Technik', 'Tlmočník',
    'Tréner', 'Učenec', 'Učiteľ', 'Vedec', 'Veterinár', 'Virtuóz',
    'Vodič', 'Vojak', 'Výskumník', 'Vynálezca', 'Záchranár', 'Žiak',
    // Rozšírené profesie
    'Agronom', 'Akrobat', 'Analytik', 'Animátor', 'Archeológ', 'Archivist',
    'Astrofyzik', 'Automechanik', 'Baník', 'Barista', 'Barman', 'Biofyzik',
    'Bižutér', 'Botanik', 'Buchač', 'Cárske', 'Cenzor', 'Chovateľ',
    'Choreograf', 'Colník', 'Čašník', 'Čistiaci', 'Dabing', 'Dealer',
    'Dekoratér', 'Dentista', 'Designer', 'Dirigent', 'Dispečer', 'DJ',
    'Dobrovoľník', 'Dopravár', 'Dráždič', 'Drogista', 'Editor', 'Egyptológ',
    'Endokrinológ', 'Epidemiológ', 'Exorcista', 'Expert', 'Farmaceut',
    'Filológ', 'Finančník', 'Florista', 'Forenzik', 'Frézar', 'Gastronóm',
    'Gazdovský', 'Geodet', 'Grafický dizajnér', 'Gynekológ', 'Hasič',
    'Hematológ', 'Holič', 'Hostinský', 'Hotelový', 'Hygienik', 'Ilustrátor',
    'Imunológ', 'Informatik', 'Inšpektor', 'Interiérový dizajnér', 'Invalidný',
    'Jadrový fyzik', 'Jazykovedec', 'Jazzman', 'Jednáteľ', 'Juvelír', 'Kaligraf',
    'Kameraman', 'Kantor', 'Kartográf', 'Kastelán', 'Kaviarnik', 'Klampiar',
    'Klimatológ', 'Komentátor', 'Komisár', 'Komunikátor', 'Konzervátorka',
    'Koordinátor', 'Korešpondent', 'Korrektúra', 'Korund', 'Kosmetička',
    'Krajčír', 'Kriminalista', 'Kritik', 'Krotiteľ', 'Kryptológ', 'Kurátor',
    'Laborant', 'Lakýrnik', 'Letec', 'Lexikograf', 'Libretista', 'Lobista',
    'Logistik', 'Lukostrelec', 'Magnetizér', 'Majster', 'Manekýnka', 'Manikérka',
    'Maséur', 'Mechanizátor', 'Metalurg', 'Metodik', 'Mikrobiológ', 'Miništrant',
    'Moderátor', 'Módny návrhár', 'Montér', 'Mufti', 'Museológ', 'Muzikológ',
    'Námorník', 'Návrhár', 'Neurochirurg', 'Obhájca', 'Oceniteľ', 'Oceanograf',
    'Oftalmológ', 'Operátor', 'Optik', 'Ortopéd', 'Ošetrovateľ', 'Otorinolaryngológ',
    'Palubný', 'Parapsychológ', 'Parlamentník', 'Pedikérka', 'Pedagóg',
    'Planetológ', 'Plastický chirurg', 'Pletiarka', 'Plynár', 'Pneumológ',
    'Podnikateľ', 'Pohraničník', 'Politológ', 'Portier', 'Potápač', 'Požiarnik',
    'Pravník', 'Prezentér', 'Priemyselník', 'Prírodovedec', 'Producent',
    'Projektant', 'Propagandista', 'Prostredník', 'Psychiater', 'Publicista',
    'Rabín', 'Radca', 'Radikál', 'Realizátor', 'Recenzent', 'Rečník',
    'Redaktor', 'Referent', 'Registrátor', 'Regulátor', 'Reklámny agent',
    'Reprezentant', 'Restaurátor', 'Reštaurátor', 'Robotník', 'Rontgenológ',
    'Scenárista', 'Sekretár', 'Seizmológ', 'Sémantik', 'Senológ', 'Sklár',
    'Sládok', 'Snímaná', 'Sociálny pracovník', 'Sociológ', 'Somelier',
    'Správca', 'Stážista', 'Stavbár', 'Staviteľ', 'Stenograf', 'Stevard',
    'Stomatológ', 'Strihač', 'Súdny znalec', 'Súkromný detektív', 'Svářač',
    'Syslov', 'Šéfkuchár', 'Šéfredaktor', 'Špeciálista', 'Športový komentátor',
    'Štylista', 'Taxikár', 'Technológ', 'Teológ', 'Terapeut', 'Tesár',
    'Tlačiar', 'Tokár', 'Toxikológ', 'Traktórista', 'Translatológ', 'Treafster',
    'Účtovník', 'Umelecký remeselník', 'Urbanista', 'Urológ', 'Usporiadateľ',
    'Učeň', 'Vinár', 'Virológ', 'Vizážista', 'Vodár', 'Výrobca', 'Vysokoškolák',
    'Zabávač', 'Zamestnanec', 'Zásobovač', 'Zástupca', 'Zdravotník', 'Zoológ',
    'Zubár', 'Zvárač', 'Zvukár', 'Žurnalista',
    // Tituly a roly
    'Absolvent', 'Akademik', 'Asistent', 'Autor', 'Bratranec', 'Brat',
    'Dcéra', 'Dedo', 'Doktor', 'Doktorka', 'Dôchodca', 'Hosť', 'Junior',
    'Kandidát', 'Klient', 'Kolega', 'Kolegyňa', 'Kolektív', 'Kolega',
    'Konzultant', 'Lektor', 'Líder', 'Magistr', 'Manželka', 'Matka',
    'Mentor', 'Obyvateľ', 'Otec', 'Patron', 'Pisateľka', 'Predseda',
    'Priateľ', 'Príbuzný', 'Riaditeľka', 'Senior', 'Starosta', 'Starý',
    'Suseď', 'Svedok', 'Šéf', 'Talent', 'Trénerka', 'Účastník', 'Učeník',
    'Učiteľka', 'Veliteľ', 'Vlastník', 'Vlastenec',
    // Rozšírené tituly a roly
    'Adoptovaný', 'Affiliate', 'Amatér', 'Ambasádor', 'Arbitér', 'Bakalár',
    'Beneficient', 'Bojovník za práva', 'Čestný člen', 'Člen', 'Darca',
    'Dedič', 'Delegát', 'Deviant', 'Disident', 'Docent', 'Doktorand',
    'Doživotný člen', 'Emigrant', 'Emeritný', 'Exulant', 'Filantrop',
    'Finálista', 'Finalist', 'Finišér', 'Garant', 'Génius', 'Hosťujúci',
    'Ikona', 'Imigrant', 'Inaugurátor', 'Iniciátor', 'Inovátor', 'Internista',
    'Jubilant', 'Kadet', 'Kapelník', 'Kariérista', 'Kolónista', 'Komentátor',
    'Konzervativec', 'Kritik', 'Krstný otec', 'Krstná matka', 'Kurátor',
    'Laureát', 'Legenda', 'Liberál', 'Lobbysta', 'Majiteľ', 'Martýr',
    'Mecenáš', 'Medailista', 'Meditujúci', 'Milovník', 'Mistr', 'Mladá krv',
    'Moderátor', 'Monarchista', 'Mučeník', 'Múza', 'Náhradník', 'Následník',
    'Neúnavný', 'Nositeľ', 'Novodoboa', 'Novic', 'Obdivovateľ', 'Obhájca',
    'Ocenený', 'Oddaný', 'Odchovanec', 'Odídent', 'Odporúčateľ', 'Operatvny',
    'Oponent', 'Osobnosť', 'Ovplyvňovateľ', 'Pamätník', 'Partner', 'Patriarcha',
    'Patronátka', 'Penzista', 'Pionier', 'Poddaný', 'Podpisovateľ', 'Poradca',
    'Porota', 'Poslanec', 'Potomok', 'Pravoverný', 'Prebranec', 'Precurusor',
    'Predchodca', 'Predstaviteľ', 'Predsedníčka', 'Premiant', 'Príjemca',
    'Prispievateľ', 'Prisťahovalec', 'Prijímateľ', 'Profesionál', 'Promóter',
    'Propagátor', 'Protégé', 'Protagonista', 'Príslušník', 'Radikál', 'Rebel',
    'Recenzent', 'Recipient', 'Reformátor', 'Revolucionár', 'Rezident',
    'Romantik', 'Rozhodca', 'Sponzor', 'Spolupracovník', 'Spoluzakladateľ',
    'Správca', 'Starec', 'Stúpenec', 'Sympatizant', 'Šampión', 'Šéfredaktorka',
    'Štipendista', 'Utečenec', 'Veterán', 'Víťaz', 'Vizionár', 'Vokavitný',
    'Vzdorviteľ', 'Výherca', 'Vysoká škola', 'Zakladateľ', 'Zástanca', 'Zástupkyňa',
    'Zberateľ', 'Životopisec', 'Živiteľ', 'Známy', 'Župan',
  ],

  // ─────────── TECHNOLÓGIA ───────────
  technology: [
    // Výpočtová technika
    'Algoritmus', 'Aplikácia', 'Asistent', 'Backup', 'Batéria', 'Brána',
    'Buffer', 'Cache', 'Chip', 'Cloud', 'Databáza', 'Disk', 'Doména',
    'Driver', 'Email', 'Emulátor', 'Firewall', 'Firmvér', 'Funkcia',
    'Hardvér', 'Hashing', 'Heslo', 'Hosting', 'Inštalácia', 'Interface',
    'Internet', 'Jazyk', 'Klávesnica', 'Klient', 'Kód', 'Kompilátor',
    'Konzola', 'Kód', 'Linka', 'Logika', 'Mailing', 'Manuál', 'Meta',
    'Mikroprocesor', 'Modul', 'Monitor', 'Myš', 'Notebook', 'Operátor',
    'Pamäť', 'Periféria', 'Platforma', 'Plugin', 'Počítač', 'Procesor',
    'Program', 'Programátor', 'Protokol', 'Prehliadač', 'Premenná',
    'Reklama', 'Rozšírenie', 'Server', 'Sieť', 'Skript', 'Slučka',
    'Smartfón', 'Softvér', 'Spam', 'Stránka', 'Súbor', 'Switch',
    'Systém', 'Tablet', 'Termín', 'Tlačiareň', 'Tokén', 'Update',
    'Užívateľ', 'Verzia', 'Video', 'Vírus', 'Virtualizácia', 'Web',
    // Rozšírená výpočtová technika
    // Slovenské pojmy z výpočtovej techniky
    'Adresár', 'Animácia', 'Antivírus', 'Archív', 'Autentifikácia',
    'Bezdrôtová sieť', 'Bezpečnostná kópia', 'Binárny kód', 'Bit',
    'Blokový reťazec', 'Bunka tabuľky', 'Cieľová stanica', 'Číslicová sústava',
    'Databázový systém', 'Dátový bod', 'Dátový tok', 'Dátový typ',
    'Datové centrum', 'Decimálna sústava', 'Dekódovanie', 'Digitalizácia',
    'Diskový priestor', 'Dokumentácia', 'Doména', 'Doménové meno',
    'Dotaz', 'Editor', 'Elektronická pošta', 'Externý disk',
    'Filtrácia', 'Formát súboru', 'Grafická karta', 'Grafické rozhranie',
    'Heslo', 'Hierarchia priečinkov', 'Hláška', 'Hlavička', 'Hlavná stránka',
    'Hostiteľský server', 'Ikona', 'Index', 'Informačný systém',
    'Inštalácia programu', 'Internet', 'Internetová stránka',
    'Internetový prehliadač', 'Jadro systému', 'Jazyk programovania',
    'Káblová sieť', 'Kalkulačka', 'Kapacita pamäte', 'Karta',
    'Kľúčové slovo', 'Kompresia', 'Komunikačný protokol', 'Konfigurácia',
    'Konzola', 'Kódovanie', 'Kompilátor', 'Kópia', 'Kybernetická bezpečnosť',
    'Kybernetický útok', 'Lokálna sieť', 'Mapa stránky', 'Mazanie',
    'Mobilná aplikácia', 'Mobilný telefón', 'Modem', 'Modul',
    'Multimediálny súbor', 'Nahrávanie', 'Nastavenie', 'Navigácia',
    'Notebook', 'Obnova systému', 'Obrazovka', 'Obsah', 'Odkaz',
    'Odoslanie', 'Operačný systém', 'Optické vlákno', 'Optimalizácia',
    'Osobný počítač', 'Otvorený zdroj', 'Pamäť', 'Pamäťová karta',
    'Pamäťové médium', 'Periféria', 'Pevný disk', 'Plagiát',
    'Plánovanie úloh', 'Plynulé pripojenie', 'Počítačová grafika',
    'Počítačová sieť', 'Počítačový vírus', 'Pole', 'Pomocný súbor',
    'Posielanie správ', 'Postupnosť', 'Pošta', 'Pravopis', 'Prehrávač',
    'Premenná', 'Prenos dát', 'Prepínač', 'Priečinok', 'Prehliadač',
    'Pripojenie', 'Procesor', 'Profil', 'Program', 'Programovanie',
    'Protokol', 'Pruh nástrojov', 'Príkaz', 'Príkazový riadok',
    'Príloha', 'Príslušenstvo', 'Rámček', 'Reálny čas', 'Reštart',
    'Registrácia', 'Repozitár', 'Riadok', 'Riadiaci panel',
    'Robot', 'Rozhranie', 'Rozšírenie', 'Sieť', 'Sieťový adaptér',
    'Sieťová karta', 'Skener', 'Skontrolovanie', 'Skratka',
    'Slovník', 'Slúchadlo', 'Smerovač', 'Snímok obrazovky',
    'Sociálna sieť', 'Spam', 'Špecifikácia', 'Špionáž', 'Spojenie',
    'Správa', 'Stiahnutie', 'Stránka', 'Stratégia', 'Stupeň',
    'Súbor', 'Súborový systém', 'Súčasť', 'Systémová požiadavka',
    'Šifrovanie', 'Štandard', 'Štatistika', 'Štruktúra súboru',
    'Štruktúrovaný dotaz', 'Tabuľka', 'Tablet', 'Telekomunikácia',
    'Textový editor', 'Tlačiareň', 'Tlačidlo', 'Tok dát',
    'Trojrozmerná grafika', 'Trvalá pamäť', 'Účet', 'Údaje',
    'Údržba systému', 'Ukazovateľ', 'Umelá inteligencia',
    'Univerzálny port', 'Upozornenie', 'Úložisko', 'Úložný priestor',
    'Úprava', 'Užívateľské meno', 'Užívateľské rozhranie',
    'Užívateľský účet', 'Vektorová grafika', 'Verejný kľúč', 'Verzia',
    'Video', 'Video hovor', 'Vírusový útok', 'Virtuálna realita',
    'Virtuálny stroj', 'Vlastný server', 'Vlnový rozsah', 'Vnorenie',
    'Vstavaný systém', 'Vstup', 'Vstupné dáta', 'Vstupné zariadenie',
    'Vyhľadávač', 'Vyhľadávanie', 'Výmenný formát', 'Výpočet',
    'Výpočtová sila', 'Výrok', 'Výstup', 'Vyšší programovací jazyk',
    'Zabezpečenie', 'Zaheslovanie', 'Záloha', 'Zálohovanie', 'Záplata',
    'Zariadenie', 'Záznam', 'Zhlukovanie', 'Zobrazenie', 'Zoznam',
    'Zvuková karta',
    // Stroje a zariadenia
    'Akumulátor', 'Auto', 'Automobil', 'Behnička', 'Boiler', 'Detektor',
    'Diaľkové', 'Dynamo', 'Generátor', 'Hodinky', 'Chladnička', 'Kalkulátor',
    'Kamera', 'Klima', 'Kompas', 'Kompresor', 'Kondenzátor', 'Konektor',
    'Kotol', 'Lampa', 'Lokomotíva', 'Magnetka', 'Mikrofón', 'Motor',
    'Nabíjačka', 'Náradie', 'Optika', 'Pílka', 'Pumpa', 'Radar',
    'Rakieta', 'Reaktor', 'Reflektor', 'Robot', 'Senzor', 'Skener',
    'Stroj', 'Telefón', 'Televízor', 'Termostat', 'Transformátor',
    'Turbína', 'Ventilátor', 'Vesmírna loď', 'Vozidlo', 'Zariadenie',
    'Žiarovka',
    // Rozšírené stroje a zariadenia
    'Amplifier', 'Antireflexná vrstva', 'Barometer', 'Biosenzor', 'Brzda',
    'Centrifúga', 'Circuit breaker', 'Čip', 'Časovač', 'Diaľkový ovládač',
    'Digitálna obrazovka', 'Dióda', 'Dráha', 'Drť', 'Elektromotor',
    'Eliminačná jednotka', 'Enkodér', 'Eskalátor', 'Exkavátor', 'Fén',
    'Filter', 'Fotocitlivosť', 'Fotoelektrický panel', 'Fréza', 'Galvanometer',
    'GPS', 'Gramofón', 'Graviméter', 'Gril', 'Gyro', 'Gyroskop',
    'Helikoptéra', 'High-tech', 'Hybridné auto', 'Hydrostatický', 'Hygrometer',
    'Chladič', 'Ihla', 'Injektor', 'Inkubátor', 'Invertor', 'Ionizátor',
    'Izolačná hmota', 'Jalový chod', 'Jet', 'Joystick', 'Kalorimeter',
    'Kľuková hriadeľ', 'Koleso', 'Kondicionér', 'Konzola', 'Korektor',
    'Krimpovací stroj', 'Lámpový systém', 'Laser', 'LCD', 'LED dióda',
    'Letadlo', 'Lietadlo', 'Lidar', 'Linka', 'Lišta', 'Ložisko',
    'Manometer', 'Mechanizmus', 'Merač', 'Microscoop', 'Mikroskop', 'Mixer',
    'Monokulár', 'Montážna linka', 'Mop', 'Nahrávač', 'Nárazník',
    'Navigátor', 'Nivo', 'Obrábacie stroje', 'Oceľ', 'Odporová záťaž',
    'OLED', 'Oscilátor', 'Osciloskop', 'Oxymetr', 'Palivový článok',
    'Parná loď', 'Pasívny komponent', 'Pedál', 'Piest', 'Piezo',
    'Plášť', 'Podvozok', 'Pohon', 'Polarizačný filter', 'Ponorka',
    'Prevodovka', 'Priemyselný robot', 'Prístroj', 'Prúdový motor',
    'Pulzometer', 'Radiátor', 'Raketa', 'Rázová vlna', 'Regulátor',
    'Reléový systém', 'Reproduktor', 'Rezistor', 'Rotačný motor', 'Rúra',
    'Rýchlostná páka', 'Satelit', 'Servomotor', 'Signalizácia', 'Sónar',
    'Spojka', 'Sprchový kút', 'Stávka', 'Stereosystém', 'Stierač',
    'Stratosphérický balón', 'Subwoofer', 'Sústruh', 'Synchronizátor',
    'Šmirgľový papier', 'Štartér', 'Tachometer', 'Tanker', 'Tepelné čerpadlo',
    'Termický', 'Termočlánok', 'Tlakomer', 'Tlmič', 'Toner', 'Transponder',
    'Trojkolka', 'Tubus', 'Turbokompresor', 'Ultrazvukový', 'Umývačka',
    'Uzemnenie', 'Váha', 'Vakuum', 'Vákuová pumpa', 'Valcová fréza',
    'Variátor', 'Ventil', 'Vibrátor', 'Vŕtačka', 'Výfuk', 'Výmenník',
    'Vysávač', 'Vzduchová brzda', 'Vzletový motor', 'Žehlička', 'Žeriav',
    // Energie a materiály
    'Atómová energia', 'Benzín', 'Bionafta', 'Cement', 'Cín', 'Diesel',
    'Elektrina', 'Fosíly', 'Gas', 'Geotermálna', 'Hliník', 'Hydraulika',
    'Hydroelektráreň', 'Kompozit', 'Magnézium', 'Olej', 'Plast',
    'Plyn', 'Propán', 'Solár', 'Solárna energia', 'Titán', 'Uhlie',
    'Urán', 'Vietor', 'Voda', 'Vodík', 'Železo',
    // Rozšírené energie a materiály
    'Acryl', 'Amoniak', 'Antimón', 'Asfalt', 'Azbestová', 'Bárium',
    'Bauxite', 'Berylium', 'Beta žiarenie', 'Biofuel', 'Biomasa',
    'Bitúmen', 'Bón', 'Bronze', 'Butadién', 'Carbon fiber', 'Celulóza',
    'Cementová malta', 'Chladivo', 'Chróm', 'Cirkonium', 'Cobalt',
    'Dekarbonizácia', 'Deratizácia', 'Destilát', 'Diamant', 'Dusík',
    'Elektrický prúd', 'Elektrolyt', 'Emulzia', 'Epoxidová živica',
    'Etanol', 'Expandovaný polystyrén', 'Férum', 'Feroliatky', 'Fialová',
    'Fibreglas', 'Fluorid', 'Fosforečnan', 'Fotovoltaika', 'Galena',
    'Galvanika', 'Gáfor', 'Geotermálny', 'Gips', 'Glycerín', 'Grafén',
    'Grafit', 'Halogenid', 'Hydratácia', 'Hydroponický', 'Chlór',
    'Iridium', 'Izolant', 'Izotop', 'Jód', 'Kade', 'Karbid',
    'Karbón', 'Katalyzátor', 'Keramický', 'Keramika', 'Kevlar', 'Kobalt',
    'Kremík', 'Kryogenický', 'Kvapaliná', 'Kyslík', 'Lacktov', 'Lak',
    'Latex', 'Lignit', 'Litiová batéria', 'Litium', 'Luxové', 'Mazivo',
    'Meď', 'Methan', 'Minerálna vlna', 'Mosadz', 'Nafta', 'Napájanie',
    'Nephlin', 'Nehrdzavejúca oceľ', 'Neodym', 'Neon', 'Nikl', 'Nitrát',
    'Nitrocelulóza', 'Oksidom', 'Optics', 'Oxidácia', 'Ozon', 'Palladium',
    'Parafín', 'Parný motor', 'Perlitový', 'Petrochemický', 'Piezoelektrický',
    'Platina', 'Plutonium', 'Polykarbonát', 'Polyetylén', 'Polymer',
    'Polypropylén', 'Polystyrén', 'Propylen', 'Radium', 'Rafinácia',
    'Rašelina', 'Recyklácia', 'Ředidlo', 'Regenerácia', 'Ropa', 'Rtanica',
    'Sadra', 'Selén', 'Silikágel', 'Silikón', 'Siloxán', 'Sklo',
    'Sláma', 'Smola', 'Sódik', 'Sóda', 'Solárny článok', 'Striebro',
    'Sulfát', 'Sulfid', 'Supravodič', 'Syntetické vlákno', 'Syntetika',
    'Škvara', 'Tepelná energia', 'Terbium', 'Termoplast', 'Tlak', 'Tungsten',
    'Uhlíkové vlákno', 'Uhlík', 'Vápenec', 'Vaporizácia', 'Vinyl', 'Viskóza',
    'Vlna', 'Vodná para', 'Wolfram', 'Xenón', 'Ytrium', 'Zinok', 'Zlato',
  ],

  // ─────────── PRÍRODA ───────────
  nature: [
    // Zvieratá - cicavce
    'Albatros', 'Antilopa', 'Bažant', 'Bocian', 'Bobor', 'Bobor',
    'Buvol', 'Cicavec', 'Čajka', 'Čierny medveď', 'Daniel', 'Delfín',
    'Diviak', 'Dudok', 'Ďateľ', 'Ezel', 'Fenek', 'Fok', 'Gepard',
    'Gorila', 'Hroch', 'Hyena', 'Hus', 'Chameleón', 'Chobotnica',
    'Chrobák', 'Jašterica', 'Jaguár', 'Jeleň', 'Jež', 'Jednorožec',
    'Kačka', 'Kačer', 'Kanárik', 'Kobylka', 'Kohút', 'Komár', 'Kráva',
    'Krokodíl', 'Krtko', 'Lasica', 'Lev', 'Líška', 'Lúčna', 'Mačka',
    'Medveď', 'Motýľ', 'Myš', 'Net (mýtopis)', 'Netopier', 'Nosorožec',
    'Opica', 'Orol', 'Osa', 'Pavúk', 'Pelikán', 'Pes', 'Plameniak',
    'Polárna líška', 'Polárny medveď', 'Potkan', 'Pštros', 'Rak',
    'Rosnička', 'Rys', 'Ryba', 'Slimák', 'Slon', 'Sob', 'Sokol',
    'Sova', 'Srnec', 'Surikata', 'Šimpanz', 'Tiger', 'Tuleň', 'Tučniak',
    'Tučniak', 'Veľryba', 'Veverička', 'Vlk', 'Vrabec', 'Vydra',
    'Vyhynutý druh', 'Zajac', 'Zebra', 'Žaba', 'Žirafa',
    // Rozšírené cicavce
    'Alpaka', 'Anoa', 'Ardvark', 'Babirusa', 'Bizon', 'Činčila',
    'Damán', 'Dikobraz', 'Dingo', 'Dromedár', 'Dugong', 'Fretka',
    'Gaur', 'Gibbon', 'Gnu', 'Hranostaj', 'Hrdziak', 'Chamois',
    'Hrdlička', 'Impala', 'Jazvec', 'Jezevec', 'Kamzík', 'Kapybara',
    'Karibu', 'Koala', 'Kojot', 'Kuna', 'Kôň', 'Lemur', 'Leopard',
    'Levhart', 'Leguán', 'Lori', 'Los', 'Mangusta', 'Manatee',
    'Makak', 'Moriak', 'Mroš', 'Muntjak', 'Mýval', 'Narval',
    'Okapi', 'Olomouk', 'Orangutan', 'Osol', 'Ovce', 'Pakoň',
    'Panda', 'Panter', 'Pavián', 'Pekari', 'Plch', 'Puma',
    'Rangifer', 'Rosomák', 'Rys ostrovid', 'Šakal', 'Šelmovec',
    'Serval', 'Skunk', 'Takin', 'Tapír', 'Tarban', 'Tchor',
    'Vikunja', 'Vrkoč', 'Vták dodo', 'Vombat', 'Yak', 'Zubor',
    // Vtáky
    'Andulka', 'Ara', 'Belorítka', 'Bernikla', 'Čaplia', 'Čížik',
    'Drozd', 'Dudka', 'Figyľ', 'Fúzatka', 'Havran', 'Holub',
    'Hrdlička', 'Ibis', 'Jastrab', 'Kačica', 'Kakadu', 'Kolibri',
    'Kondor', 'Kormorán', 'Kos', 'Kukučka', 'Labúť', 'Lastovička',
    'Ľadový medvědík', 'Papagáj', 'Páv', 'Pinka', 'Prepelica',
    'Pukač', 'Raroha', 'Rybárik', 'Sekorka', 'Sito', 'Slávik',
    'Sojka', 'Stehlík', 'Strnádka', 'Sup', 'Škovránok', 'Ťahavec',
    'Tetrov', 'Tyto', 'Volavka', 'Vrána', 'Výr', 'Žeriav', 'Žltochvost',
    // Ryby a morské živočíchy
    'Amur', 'Ančovička', 'Barramundi', 'Bodlok', 'Candát', 'Čarovnica',
    'Halibut', 'Haringa', 'Hlavatka', 'Hrbatka', 'Jeseter', 'Kapor',
    'Karas', 'Korálový', 'Lipeň', 'Losos', 'Makrela', 'Manta',
    'Mečiar', 'Medúza', 'Moréna', 'Mrena', 'Murena', 'Okúň',
    'Pangasius', 'Parma', 'Pichľavka', 'Plotica', 'Pstruh', 'Rejnok',
    'Sardinka', 'Sleď', 'Sumec', 'Šťuka', 'Tilapia', 'Treska',
    'Tuňák', 'Úhor', 'Úhorkovec', 'Žralok', 'Žralok biely',
    // Hmyz a bezstavovce
    'Blcha', 'Cvrček', 'Čmeliak', 'Hlavonožec', 'Hlistica', 'Húsenica',
    'Chrúst', 'Koník', 'Kraslice', 'Kreveta', 'Langusta', 'Larva',
    'Ležiak', 'Lienka', 'Lúčiar', 'Modlivka', 'Molusk', 'Motýľ denný',
    'Mravec', 'Múcha', 'Muška', 'Nočný motýľ', 'Olejnička', 'Osica',
    'Pačok', 'Pijavica', 'Ploštica', 'Potápnik', 'Púpava', 'Roháč',
    'Svrček', 'Šidielko', 'Škvorkva', 'Štír', 'Stáročka', 'Svetluška',
    'Šupinovka', 'Tarantula', 'Vážka', 'Vícielko', 'Voš', 'Včela',
    'Vzbúrenec', 'Zlatoočko', 'Žihadlovka',
    // Plazy a obojživelníky
    'Anakonda', 'Aligátor', 'Axolotl', 'Boa', 'Dažďovník', 'Gecek',
    'Hadia', 'Kajman', 'Komodský varán', 'Krajta', 'Korytnačka',
    'Leguán zelený', 'Mlok', 'Morská korytnačka', 'Počatková',
    'Ropucha', 'Salamandra', 'Skokan', 'Sleper', 'Užovka', 'Varanus',
    'Vretenica', 'Želva', 'Zmija',
    // Rastliny
    'Agát', 'Astra', 'Borovica', 'Breza', 'Buk', 'Cibuľa', 'Cyprus',
    'Dub', 'Fialka', 'Figovník', 'Gladiola', 'Hrach', 'Hríb', 'Hloh',
    'Hodvábnik', 'Iris', 'Jablk', 'Jablko', 'Jablkovník', 'Jaseň',
    'Jedľa', 'Jelša', 'Kaktus', 'Kalokvet', 'Konvalinka', 'Krík',
    'Krokus', 'Kvet', 'Lipa', 'Lopúch', 'Machovka', 'Mäta', 'Modrín',
    'Narcis', 'Orchideá', 'Olivovník', 'Orech', 'Orgován', 'Páperie',
    'Pivónia', 'Plod', 'Pšenica', 'Reďkovka', 'Repka', 'Repík',
    'Rododendron', 'Ruža', 'Šalvia', 'Slnečnica', 'Slamienka', 'Smrek',
    'Smrekovec', 'Šafrán', 'Sedmokráska', 'Tekvica', 'Tulipán', 'Vŕba',
    'Yzop', 'Žihľava',
    // Rozšírené rastliny
    'Acácia', 'Aloe', 'Amarant', 'Anemóna', 'Azalka', 'Baobab',
    'Begónia', 'Bonsai', 'Broskyňa', 'Bršlen', 'Cezmína', 'Čerešňa',
    'Damask', 'Datľa', 'Ďatelina', 'Echinacea', 'Eukalyptus', 'Fikus',
    'Figovník', 'Frézia', 'Gardénia', 'Gaštan', 'Gerbera', 'Ginkgo',
    'Granátové jablko', 'Harmanček', 'Hedera', 'Hibiskus', 'Horec',
    'Hortenzia', 'Hruška', 'Hyacint', 'Ibištek', 'Imelo', 'Jazmín',
    'Juka', 'Kamélia', 'Kapradin', 'Kardamón', 'Citrónik', 'Korenie',
    'Kosatec', 'Kukurica', 'Levandula', 'Ľalia', 'Magnólia', 'Mak',
    'Malina', 'Mandľovník', 'Marhuľa', 'Medovka', 'Mesačnica', 'Mimóza',
    'Muškát', 'Nechtík', 'Obilnina', 'Oleander', 'Olivovník', 'Palma',
    'Papraď', 'Papája', 'Petúnia', 'Pohánka', 'Prvosenka', 'Púpava',
    'Rakytník', 'Rebarbora', 'Rozmarín', 'Sekvoja', 'Slivka', 'Špirlica',
    'Špenát', 'Tamariška', 'Tis', 'Topol', 'Tymiján', 'Vinič',
    'Vstavač', 'Yucca', 'Zázvor', 'Zelená repa', 'Zvončok',
    // Huby
    'Bedľa', 'Červeniak', 'Dubák', 'Hríb dubový', 'Hríb smrekový',
    'Hríb hnedý', 'Kuriatko', 'Lišiak', 'Maslianka', 'Muchomôrka',
    'Pečeňovec', 'Podpňovka', 'Prachovec', 'Rýdzik', 'Sietkovka',
    'Šampiňón', 'Shiitake', 'Smrž', 'Suchohríb', 'Trúfelka', 'Václavka',
    // Ekosystémy a pojmy
    'Atmosféra', 'Bažina', 'Biocenóza', 'Biodiverzita', 'Biológia',
    'Biosféra', 'Biotop', 'Cyklus', 'Ekosystém', 'Evolúcia', 'Fauna',
    'Flóra', 'Fotosyntéza', 'Habitát', 'Hmyz', 'Krajinka', 'Les',
    'Lúka', 'Mokraď', 'Mraky', 'Pôda', 'Populácia', 'Potravinový reťazec',
    'Prales', 'Prostredie', 'Rastlina', 'Ríša', 'Sezóna', 'Symbióza',
    'Tunder', 'Trávnik', 'Tropický prales', 'Vlhkosť', 'Voda',
    'Vyhynutie', 'Žiletka',
    // Rozšírené ekologické pojmy
    'Abiotický faktor', 'Adaptácia', 'Amonifikácia', 'Areál výskytu',
    'Autotróf', 'Benthos', 'Bioakumulácia', 'Biogeografia', 'Bioindikátor',
    'Biomasa', 'Biom', 'Biosféra rezervácia', 'Biotechnológia', 'Cyklus uhlíka',
    'Dekompozícia', 'Dentritická sieť', 'Diverzita', 'Dormancia', 'Dravec',
    'Druhotné sukcesie', 'Ekologická nika', 'Ekoturista', 'Endemit', 'Epifyt',
    'Eutrof', 'Fenológia', 'Fotosyntetizujúce', 'Genofond', 'Herbivór',
    'Heterotróf', 'Húština', 'Choroba', 'Ílové sedimenty', 'Introdukovaný',
    'Invazívny druh', 'Izolovaná populácia', 'Karbonový cyklus', 'Karibský',
    'Kmeňovanie', 'Koevolúcia', 'Konkurencia', 'Konzument', 'Korene',
    'Krajinná ekológia', 'Ľadovcové obdobie', 'Liahnutie', 'Listnatý les',
    'Litorálna zóna', 'Mangrove', 'Metamorfóza', 'Migrácia', 'Mimikry',
    'Mutualismus', 'Naturalizovaný', 'Nekrofág', 'Nekton', 'Nitrifikácia',
    'Ohrozený druh', 'Oligotrof', 'Opeľovanie', 'Organická hmota', 'Orogén',
    'Parazit', 'Plankton', 'Pelagický', 'Permafrost', 'Piesková',
    'Pioniersky druh', 'Plesňový', 'Podkoreňový systém', 'Potravná pyramída',
    'Predátor', 'Primárna produkcia', 'Pylová analýza', 'Reprodukcia',
    'Rezistencia', 'Riasový zákal', 'Rozkladač', 'Rozmnožovanie',
    'Savana', 'Sediment', 'Sekundárny konzument', 'Sladkovodný', 'Slaný',
    'Step', 'Stonka', 'Stratifikácia', 'Sukcesia', 'Šelmy', 'Tajga',
    'Terénny výskum', 'Terestrick', 'Trofická úroveň', 'Tropický',
    'Vlhkomilný', 'Výberový tlak', 'Xerofilný', 'Živočíšna ríša', 'Živočích',
  ],

  // ─────────── VŠEOBECNÉ (fallback) ───────────
  general: [
    'Adresa', 'Aktivita', 'Aliancia', 'Analýza', 'Apetít', 'Argument',
    'Atmosféra', 'Audit', 'Banka', 'Báseň', 'Báječka', 'Bezpečnosť',
    'Beh', 'Bilancia', 'Brána', 'Budova', 'Bunka', 'Capacity',
    'Cesta', 'Chod', 'Cieľ', 'Cirkus', 'Citácia', 'Časopis', 'Čas',
    'Časť', 'Číslica', 'Číslo', 'Defekt', 'Detail', 'Diaľnica',
    'Dialóg', 'Diéta', 'Dokument', 'Dom', 'Doprava', 'Dozor',
    'Druh', 'Družstvo', 'Dvere', 'Efekt', 'Epizóda', 'Etapa',
    'Faktor', 'Faktúra', 'Familia', 'Fenomén', 'Filmovanie', 'Forma',
    'Funkcia', 'Galaxia', 'Garancia', 'Generácia', 'Hierarchia',
    'História', 'Hladina', 'Hodina', 'Hodnota', 'Horizont', 'Hostia',
    'Hra', 'Charakter', 'Chyba', 'Idea', 'Inflácia', 'Informácia',
    'Iniciatíva', 'Inštitúcia', 'Inštrukcia', 'Integrácia', 'Inteligencia',
    'Interview', 'Investícia', 'Jadro', 'Jednotka', 'Kabína',
    'Kalkulácia', 'Kanál', 'Kategória', 'Klasifikácia', 'Klauzula',
    'Klima', 'Kniha', 'Koalícia', 'Komentár', 'Komisia', 'Komunikácia',
    'Komunita', 'Kondícia', 'Konferencia', 'Kontakt', 'Kontext',
    'Kontrola', 'Korešpondencia', 'Krajina', 'Krása', 'Kritika',
    'Kvalita', 'Kvantum', 'Lekcia', 'List', 'Loď', 'Lokalita',
    'Magazín', 'Manažment', 'Mapa', 'Materiál', 'Médium', 'Membrána',
    'Memorandum', 'Metóda', 'Mier', 'Misia', 'Modus', 'Morálka',
    'Most', 'Motív', 'Možnosť', 'Multimédiá', 'Náboj', 'Nálada',
    'Námestie', 'Nápad', 'Národ', 'Nárok', 'Nasledovanie', 'Návrh',
    'Norma', 'Občan', 'Oblasť', 'Obraz', 'Odbor', 'Odpoveď',
    'Odporúčanie', 'Odznak', 'Okamih', 'Okruh', 'Operácia', 'Opora',
    'Organizácia', 'Otázka', 'Ozvena', 'Pamäť', 'Park', 'Patent',
    'Pavilón', 'Periodikum', 'Personál', 'Plán', 'Pohľad', 'Pochopenie',
    'Politika', 'Položka', 'Pomoc', 'Porada', 'Postup', 'Potreba',
    'Pozícia', 'Pozvánka', 'Pravidlo', 'Premiéra', 'Prestávka',
    'Princíp', 'Priorita', 'Príčina', 'Príklad', 'Prípad', 'Príprava',
    'Profil', 'Program', 'Projekt', 'Proces', 'Profesia', 'Prostriedok',
    'Prostredie', 'Protokol', 'Pýcha', 'Rada', 'Rámec', 'Realita',
    'Recyklácia', 'Reforma', 'Región', 'Rezultát', 'Rola', 'Rozhodnutie',
    'Schopnosť', 'Sila', 'Situácia', 'Skupina', 'Smer', 'Smerník',
    'Sloboda', 'Služba', 'Spoločnosť', 'Spolok', 'Sprievod', 'Stanica',
    'Stav', 'Štandard', 'Štruktúra', 'Štýl', 'Súčasť', 'Súlad',
    'Súvis', 'Svet', 'Systém', 'Tabuľa', 'Téma', 'Termín', 'Tlač',
    'Tradícia', 'Účel', 'Údaj', 'Účinok', 'Úroveň', 'Úspech',
    'Vec', 'Veda', 'Vedomosť', 'Verzia', 'Vízia', 'Vlastnosť',
    'Vplyv', 'Vrchol', 'Vstup', 'Výber', 'Východisko', 'Vzdelanie',
    'Vzťah', 'Začiatok', 'Záhrada', 'Záujem', 'Záver', 'Zdroj',
    'Znak', 'Zoznam', 'Zmena', 'Zmluva', 'Zóna', 'Zvuk',
    // Rozšírené pojmy - abstraktné
    'Absolútno', 'Absurdita', 'Afekt', 'Agonizácia', 'Akcia', 'Aktualita',
    'Algoritmizácia', 'Alternatíva', 'Ambícia', 'Antológia', 'Anticipácia',
    'Aplikácia', 'Aproximácia', 'Archív', 'Artikulácia', 'Aspekt',
    'Asimilácia', 'Asociácia', 'Atribút', 'Autentickosť', 'Automatizácia',
    'Autoritatívnosť', 'Averzia', 'Axióma', 'Báza', 'Biografia',
    'Bojkot', 'Bonita', 'Břemeno', 'Byrokracia', 'Centralízácia',
    'Certifikácia', 'Citlivosť', 'Civilizácia', 'Cynizmus', 'Dedukcia',
    'Definácia', 'Deformácia', 'Degradácia', 'Dekadencia', 'Delegácia',
    'Demokracia', 'Demonštrácia', 'Denominácia', 'Derivácia', 'Designácia',
    'Determinizmus', 'Deviácia', 'Diagnóza', 'Dichotómia', 'Diferenciácia',
    'Digitalizácia', 'Dilema', 'Diplomacia', 'Direktíva', 'Disciplína',
    'Diskontinuita', 'Diskriminácia', 'Dispozícia', 'Distinkcia', 'Distribúcia',
    'Divergencia', 'Diverzita', 'Doktrina', 'Dominancia', 'Donácia',
    'Duplicita', 'Dynamika', 'Efektivita', 'Ekológia', 'Ekonomika',
    'Elaborácia', 'Elegancia', 'Eliminacia', 'Emanácia', 'Emancipácia',
    'Empatia', 'Empirizmus', 'Entita', 'Entropia', 'Epidémia',
    'Epizóda', 'Erózia', 'Esencia', 'Eskalácia', 'Etika',
    'Etnológia', 'Eufória', 'Evalvácia', 'Eventuálita', 'Evidencia',
    'Evolúcia', 'Exaktnosť', 'Exekúcia', 'Existencia', 'Expanzia',
    'Expectácia', 'Expediencia', 'Experiencia', 'Expertíza', 'Explikácia',
    'Explorácia', 'Expozícia', 'Expresia', 'Extrakcia', 'Extrapolácia',
    // Rozšírené pojmy - konkrétne
    'Fasáda', 'Federácia', 'Fenomenológia', 'Festivál', 'Fikcia',
    'Filozofia', 'Finalizácia', 'Fixácia', 'Flexibilita', 'Fluctuácia',
    'Fonológia', 'Formalizácia', 'Formulácia', 'Fortifikácia', 'Fragment',
    'Frekvencia', 'Frustrácia', 'Fundament', 'Fúzia', 'Garantia',
    'Generalizácia', 'Genéza', 'Geometria', 'Globalizácia', 'Graduácia',
    'Gramatura', 'Gratifikácia', 'Gravitácia', 'Gymnastika', 'Habilitácia',
    'Hallucinácia', 'Harmonizácia', 'Heuristika', 'Homogenizácia', 'Honorácia',
    'Horizontálnosť', 'Humanitácia', 'Hydratácia', 'Hypotéza', 'Idealizácia',
    'Identifikácia', 'Ideológia', 'Ignorácia', 'Ilustrácia', 'Imaginácia',
    'Imitácia', 'Implementácia', 'Implikácia', 'Importácia', 'Improvizácia',
    'Inaugurácia', 'Incidencia', 'Indikácia', 'Individualizácia', 'Indukcia',
    'Industrializácia', 'Infiltrácia', 'Inflexibilita', 'Infraštruktúra', 'Inherencia',
    'Iniciácia', 'Inkorporácia', 'Inovácia', 'Inscenácia', 'Inšpirácia',
    'Inštalácia', 'Inštitucionalizácia', 'Instrukcia', 'Instrumentácia', 'Integrálnosť',
    'Inteligibilita', 'Intencia', 'Intenzifikácia', 'Interakcia', 'Interferencia',
    'Interpetácia', 'Interpolácia', 'Intervencia', 'Intimita', 'Intoncia',
    'Intuícia', 'Invalidácia', 'Invencia', 'Inventarizácia', 'Inverzia',
    'Investigácia', 'Involúcia', 'Iracionalita', 'Iracionálnosť', 'Irelevancia',
    'Irónia', 'Irritácia', 'Izolacia', 'Jubilejum', 'Jurisdikcia',
    'Justifikácia', 'Kalamita', 'Kalibrácia', 'Kapitalizácia', 'Karikatúra',
    'Kategorizácia', 'Kauzalita', 'Koalícia', 'Kodifikácia', 'Koexistencia',
    'Kognitívnosť', 'Koherentnosť', 'Kolaborácia', 'Kolízia', 'Kolonizácia',
    'Kombinácia', 'Komentácia', 'Komercializácia', 'Kompenzácia', 'Kompetencia',
    'Komplexita', 'Komplikácia', 'Kompromis', 'Koncentrácia', 'Koncepcia',
    'Konciliácia', 'Kondenzácia', 'Konfigurácia', 'Konfrontácia', 'Kongregácia',
    'Konjuktúra', 'Konklúzia', 'Konkurencia', 'Konservácia', 'Konšpirácia',
    'Konštatácia', 'Konštelácia', 'Konštitúcia', 'Konštrukcia', 'Konzultácia',
    'Kontaminácia', 'Kontemplácia', 'Kontinuita', 'Kontrakcia', 'Kontraverzia',
    'Kontribúcia', 'Konvenácia', 'Konvergencia', 'Konverzia', 'Koordinácia',
    'Koprodukcia', 'Korelácia', 'Korešpondencia', 'Korupcia', 'Kreácia',
    'Kreditácia', 'Kriminalita', 'Kríza', 'Kultúrnosť', 'Kumulácia',
    'Kuratela', 'Legitimácia', 'Legislatíva', 'Liberalizácia', 'Limitácia',
    'Lingvistika', 'Línia', 'Liquidácia', 'Liturgia', 'Lokalizácia',
    'Logika', 'Lubrikácia', 'Machinácia', 'Magnetizácia', 'Magnifikácia',
    // Jedlo a nápoje
    'Bageta', 'Baklava', 'Banán', 'Boršč', 'Brynza', 'Buchta',
    'Bylinný čaj', 'Cappuccino', 'Čaj', 'Čerešňa', 'Čokoláda', 'Croissant',
    'Destiláty', 'Domáce', 'Džem', 'Džús', 'Espresso', 'Fazuľa',
    'Gazpacho', 'Gnocchi', 'Gouda', 'Grilované', 'Guláš', 'Halušky',
    'Hamburger', 'Horčica', 'Hrozno', 'Hummus', 'Jogurt', 'Kakao',
    'Kapusta', 'Karamel', 'Kávičk', 'Kebab', 'Ketchup', 'Knedle',
    'Koláč', 'Kompót', 'Korenie', 'Koreniny', 'Korunkovanie', 'Krém',
    'Kukurica', 'Kysnuté', 'Lasagne', 'Lekvárik', 'Limonáda', 'Lokša',
    'Losos', 'Marhuľa', 'Maslo', 'Mäso', 'Med', 'Melón',
    'Mlieko', 'Múčnik', 'Muffin', 'Müsli', 'Nátierka', 'Nudle',
    'Obložený', 'Olej', 'Olivy', 'Omáčka', 'Omeleta', 'Ovocie',
    'Palacinky', 'Paradajka', 'Paštéta', 'Pasta', 'Pečivo', 'Perník',
    'Pizza', 'Polievka', 'Pralinky', 'Prešportský', 'Proteínový', 'Pudding',
    'Raňajky', 'Risotto', 'Rohľík', 'Ryža', 'Salám', 'Šalát',
    'Sandwich', 'Sekaná', 'Sirup', 'Sladidlo', 'Slivovica', 'Smotana',
    'Soľ', 'Sójový', 'Špenát', 'Steak', 'Šťava', 'Strukoviny',
    'Sushi', 'Syr', 'Šunka', 'Taco', 'Tarhoňa', 'Tofu',
    'Torta', 'Trdelník', 'Tuniak', 'Údeniny', 'Vajce', 'Vanilka',
    'Večera', 'Vegánsky', 'Vitamín', 'Víno', 'Vodka', 'Whisky',
    'Zelenina', 'Zemiak', 'Zemiakový', 'Žemľa', 'Žriedlová',
    // Denné potreby a predmety
    'Batoh', 'Bicykel', 'Blok', 'Brošňa', 'Bunkovka', 'Ceruzka',
    'Čiapka', 'Čistidlo', 'Cviky', 'Dekorácia', 'Dezinfekcia', 'Dierovač',
    'Doska', 'Drogéria', 'Držiak', 'Elektrospotrebič', 'Farba', 'Fľaša',
    'Fotka', 'Guma', 'Háčik', 'Handričk', 'Hračka', 'Hrčík',
    'Ihla', 'Kalendár', 'Kancel', 'Kartón', 'Kávovar', 'Kefka',
    'Kliešte', 'Kľúč', 'Koberec', 'Kolíky', 'Komodka', 'Kôpka',
    'Košík', 'Kozmetika', 'Krém', 'Kreslo', 'Lampa', 'Lano',
    'Lepenka', 'Lepidlo', 'Ležadlo', 'Liatina', 'Ložisko', 'Lustro',
    'Lyžica', 'Matrac', 'Miska', 'Mixer', 'Mydlo', 'Nabíjačka',
    'Nábytok', 'Náčinie', 'Nápoj', 'Náramok', 'Nástroj', 'Nôž',
    'Obálka', 'Oblečenie', 'Obrúsok', 'Okuliare', 'Oprátka', 'Papier',
    'Paráda', 'Párka', 'Pečiatka', 'Peňaženka', 'Pero', 'Plachtička',
    'Plastelína', 'Plášť', 'Plech', 'Podložka', 'Poduška', 'Pohár',
    'Pokladnička', 'Pomôcka', 'Ponožka', 'Porcelán', 'Posteľ', 'Pravítko',
    'Prikrývka', 'Prístrešok', 'Prostriedky', 'Puzdro', 'Rám', 'Riad',
    'Ručník', 'Ruksak', 'Sáčok', 'Šál', 'Sánek', 'Sedačka',
    'Servítka', 'Sklenička', 'Skrinka', 'Šľapky', 'Slnečník', 'Šnúra',
    'Sošky', 'Sponka', 'Šperky', 'Štítok', 'Stôl', 'Stojan',
    'Stolička', 'Stužka', 'Sušiak', 'Svetrík', 'Svietidlo', 'Svietnik',
    'Taburetka', 'Taška', 'Telefón', 'Termoska', 'Textília', 'Tkáne',
    'Tlačivo', 'Topánky', 'Tričko', 'Tuba', 'Tyčinka', 'Umelina',
    'Umývadlo', 'Utierka', 'Uvoľnenie', 'Vak', 'Varecha', 'Vata',
    'Vázička', 'Vešiak', 'Vidlička', 'Vílka', 'Vňu', 'Vozík',
    'Záclona', 'Zápisník', 'Zásobník', 'Zástera', 'Zásuvka', 'Závesy',
    'Zrkadlo', 'Žalúzie', 'Žiarovka', 'Živica',
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
]);

function makeForceLink(word: string): string {
  const lowerWord = word.toLowerCase();
  // Vlastné mená si ponechávajú veľké písmeno
  const isProper = PROPER_NOUNS.has(lowerWord);
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

export function generateForceArticleContent(
  title: string,
  category: ArticleCategory,
  forceWords: string[],
): string {
  const structure = ARTICLE_STRUCTURES[category] || ARTICLE_STRUCTURES.general;
  const singleTpls = shuffle(
    SINGLE_TEMPLATES[category] || SINGLE_TEMPLATES.general,
  );
  const listTpls = shuffle(
    LIST_TEMPLATES[category] || LIST_TEMPLATES.general,
  );
  const contextSentences = shuffle(
    CONTEXT_SENTENCES[category] || CONTEXT_SENTENCES.general,
  );
  const closingSentences = shuffle(CLOSING_SENTENCES);

  let content = structure.intro(title);
  const sections = structure.sections(title);

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
