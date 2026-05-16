// Wiki trick configuration store
export interface WikiConfig {
  // Force meno - meno ktoré sa má poskladať z akronymu
  forceName: string;
  // Force pozícia - ktoré písmeno v slovách tvorí akronym (1-6)
  forcePosition: number;
  // Aktuálny stav - na koľkom článku sme (0 = ešte nie je aktivovaný force)
  currentArticleIndex: number;
  // Je force aktívny?
  isForceActive: boolean;
  // Feedback - zobrazenie potvrdenia v nastaveniach
  showFeedback: boolean;
  // Maskovací text počas zadávania kódu
  maskText: string;
}

export const DEFAULT_CONFIG: WikiConfig = {
  forceName: '',
  forcePosition: 3,
  currentArticleIndex: 0,
  isForceActive: false,
  showFeedback: false,
  maskText: 'História Slovenska',
};

// Secret password to access admin panel
export const ADMIN_PASSWORD = 'akronym';

// Aktivačný kód (5 znakov)
export const ACTIVATION_CODE = 'xxxxx';

// Database of Slovak words categorized by letter at positions 1-6
// Structure: WORDS_BY_POSITION[position][letter] = ['word1', 'word2', ...]
export const WORDS_BY_POSITION: Record<number, Record<string, string[]>> = {
  1: {
    'a': ['Afrika', 'Amerika', 'Architektúra', 'Astronómia', 'Automobil', 'Austrália', 'Adresa', 'Akademik', 'Album', 'Algoritmus'],
    'b': ['Bratislava', 'Biológia', 'Botanika', 'Bankovníctvo', 'Bazilika', 'Bakteriológia', 'Balada', 'Baroko', 'Básnictvo', 'Beletria'],
    'c': ['Cestovanie', 'Chémia', 'Centrum', 'Civilizácia', 'Cirkus', 'Cukor', 'Cyklistika', 'Cylinder', 'Citát', 'Charakteristika'],
    'd': ['Demokracia', 'Diplomacia', 'Dokumentácia', 'Dunaj', 'Dizajn', 'Divadlo', 'Dialóg', 'Diagnóza', 'Destinácia', 'Definícia'],
    'e': ['Ekonomika', 'Európa', 'Elektrina', 'Encyklopédia', 'Energia', 'Etnológia', 'Etymológia', 'Ekológia', 'Epidémia', 'Epizóda'],
    'f': ['Filozofia', 'Francúzsko', 'Futbal', 'Folklór', 'Fotografia', 'Fyzika', 'Festival', 'Fakulta', 'Fantázia', 'Filológia'],
    'g': ['Geografia', 'Galéria', 'Genetika', 'Geometria', 'Geológia', 'Gastronómia', 'Gitara', 'Grafika', 'Gramatika', 'Gymnázium'],
    'h': ['História', 'Hokej', 'Harmónia', 'Hepatológia', 'Hierarchia', 'Hematológia', 'Hydraulika', 'Hygiena', 'Hypotéza', 'Hudba'],
    'i': ['Informatika', 'Internet', 'Inžinierstvo', 'Imunológia', 'Infraštruktúra', 'Integrácia', 'Inteligencia', 'Ideológia', 'Ikonografia', 'Imaginácia'],
    'j': ['Japonsko', 'Jazykoveda', 'ジャーナリズム', 'Jurisdikcia', 'Justícia', 'Jachtárstvo', 'Jaskyňa', 'Jadrová energia', 'Jarná rovnodennosť', 'Jednotka'],
    'k': ['Kultúra', 'Komunikácia', 'Kontinentálny', 'Kartografia', 'Klimatológia', 'Kozmonautika', 'Kybernetika', 'Kriminalistika', 'Katalóg', 'Kauzalita'],
    'l': ['Literatúra', 'Lingvistika', 'Logistika', 'Legislatíva', 'Laboratórium', 'Lexikografia', 'Limnológia', 'Litografia', 'Lokalita', 'Luxus'],
    'm': ['Matematika', 'Medicína', 'Meteorológia', 'Mikrobiológia', 'Mineralógia', 'Mitológia', 'Morfológia', 'Múzeum', 'Metodológia', 'Motivácia'],
    'n': ['Neurológia', 'Navigácia', 'Nacionalizmus', 'Nanotechnológia', 'Numizmatika', 'Nomenklatúra', 'Nostalgia', 'Novela', 'Numerológia', 'Nutricionistika'],
    'o': ['Oceánografia', 'Oftalmológia', 'Oligarchia', 'Ontológia', 'Operetka', 'Optika', 'Ornitológia', 'Ortodoxia', 'Organizácia', 'Orientácia'],
    'p': ['Politika', 'Psychológia', 'Pedagogika', 'Paleontológia', 'Paralela', 'Patológia', 'Penológia', 'Perspektíva', 'Petrológia', 'Planéta'],
    'r': ['Republika', 'Renesancia', 'Revolúcia', 'Romantizmus', 'Rétorika', 'Robotika', 'Regionalizmus', 'Relativita', 'Reforma', 'Recyklácia'],
    's': ['Slovensko', 'Sociológia', 'Systém', 'Štatistika', 'Stratégia', 'Symbolika', 'Syntéza', 'Sympózium', 'Synchronizácia', 'Sylabika'],
    't': ['Technológia', 'Teológia', 'Topografia', 'Toxikológia', 'Tradícia', 'Traumatológia', 'Trigonometria', 'Typológia', 'Terminológia', 'Telekomunikácia'],
    'u': ['Univerzita', 'Urbanizmus', 'Utilitarizmus', 'Ultrazvuk', 'Unifikácia', 'Unikát', 'Účtovníctvo', 'Údržba', 'Ujgurčina', 'Ukrainistika'],
    'v': ['Veda', 'Viktoriánsky', 'Virtuálny', 'Vulkanológia', 'Veterinárstvo', 'Virológia', 'Vizualizácia', 'Vlastenectvo', 'Vodohospodárstvo', 'Volebný systém'],
    'z': ['Zoológia', 'Zemepis', 'Zdravotníctvo', 'Žurnalistika', 'Záhradníctvo', 'Základná škola', 'Životopis', 'Zvukový systém', 'Značka', 'Zámok'],
  },
  2: {
    'a': ['Bahrajn', 'Databáza', 'Farmakológia', 'Galantéria', 'Japonsko', 'Kakavovník', 'Laboratórium', 'Magnetizmus', 'Náčelník', 'Paralela'],
    'b': ['Absolutizmus', 'Obrazotvornosť', 'Poblahožiť', 'Symbolika', 'Tabla', 'Obdobie', 'Objav', 'Pobočka', 'Abeceda', 'Fabrika'],
    'c': ['Accident', 'Oceán', 'Archeológia', 'Decibel', 'Encyklopédia', 'Recenzia', 'Secesia', 'Oceňovanie', 'Sociálna práca', 'Technológia'],
    'd': ['Adaptation', 'Eduard', 'Ideológia', 'Modernizácia', 'Obdobie', 'Predmet', 'Tradícia', 'Vzdialený', 'Údržba', 'Administrácia'],
    'e': ['Agenda', 'Dieta', 'Generácia', 'Heredita', 'Identita', 'Jeden', 'Legenda', 'Menežment', 'Sedemdesiat', 'Telefón'],
    'f': ['Africký', 'Deficit', 'Efekt', 'Inflácia', 'Káva', 'Ofenzíva', 'Profesia', 'Reforma', 'Safari', 'Šéfkuchár'],
    'g': ['Agregát', 'Dogma', 'Emigrácia', 'Figura', 'Migrácia', 'Negligencia', 'Organizácia', 'Plagát', 'Regál', 'Signál'],
    'h': ['Akháj', 'Bohémia', 'Dahlia', 'Exhibícia', 'Kohézia', 'Rehabilitácia', 'Schéma', 'Technológia', 'Úhrada', 'Vehiculum'],
    'i': ['Aviatika', 'Civilizácia', 'Diéta', 'Finančný', 'Ginkgo', 'Hierarchia', 'Minimalizmus', 'Princíp', 'Riziko', 'Vianočný'],
    'j': ['Ajka', 'Ejakulácia', 'Inštalácia', 'Majorita', 'Objav', 'Projekt', 'Prejav', 'Rejakácia', 'Trojka', 'Ujgur'],
    'k': ['Akademik', 'Dokumentácia', 'Ekonomika', 'Eklektizmus', 'Okuliar', 'Pokora', 'Škola', 'Ukončenie', 'Ukážka', 'Výklad'],
    'l': ['Almanach', 'Dialóg', 'Filmografia', 'Galaktický', 'Hologram', 'Islamizmus', 'Kalendár', 'Maliarstvo', 'Polarita', 'Šalát'],
    'm': ['Anomália', 'Demokrat', 'Gymnázium', 'Homogenita', 'Kamera', 'Klimatizácia', 'Nominál', 'Primát', 'Remeselník', 'Žemľa'],
    'n': ['Anekdota', 'Beneficia', 'Čínsky', 'Dinosaurus', 'Financovanie', 'Genetický', 'Kino', 'Minerál', 'Tunel', 'Zvonček'],
    'o': ['Absolútny', 'Biológia', 'Chronológia', 'Doovačka', 'Ekológia', 'Fototransistor', 'Geológia', 'Koordináta', 'Meteorológia', 'Zoológia'],
    'p': ['Apartmán', 'Deputát', 'Expert', 'Import', 'Kapacita', 'Operátor', 'Repatriácia', 'Separácia', 'Špeciálny', 'Tipovať'],
    'r': ['Aritmetika', 'Baroko', 'Ceremónia', 'Derivát', 'Erupcia', 'Garantovanie', 'Karát', 'Maratón', 'Parazit', 'Žargón'],
    's': ['Absolutizmus', 'Baseball', 'Časopis', 'Dostihový', 'Festival', 'Historia', 'Klasika', 'Neskorý', 'Veselo', 'Základný'],
    't': ['Antika', 'Článok', 'Detail', 'Etika', 'Gotika', 'Kritérium', 'Latina', 'Matematika', 'Poetika', 'Štatistika'],
    'u': ['Akumulátor', 'Čučoriedka', 'Dokumentár', 'Fakulta', 'Inaugurácia', 'Kultúra', 'Maturita', 'Prúd', 'Republika', 'Štúdium'],
    'v': ['Advantáž', 'Civilný', 'Divertimento', 'Environ', 'Festival', 'Invázia', 'Konvencia', 'Návšteva', 'Revízia', 'Služba'],
    'z': ['Anzýzovník', 'Bazén', 'Dizajnér', 'Gazda', 'Horizont', 'Jazero', 'Kúzlo', 'Lúzr', 'Múzeum', 'Princezná'],
  },
  3: {
    'a': ['Abakus', 'Brána', 'Cválať', 'Dramatik', 'Eskalácia', 'Financovať', 'Gramatik', 'Hádzaná', 'Ikona', 'Jablko'],
    'b': ['Alabaster', 'Baobab', 'Debet', 'Elbow', 'Fóbia', 'Hobbit', 'Kobalt', 'Labyrint', 'Robot', 'Symbol'],
    'c': ['Arcibiskup', 'Bacteriológia', 'Cacao', 'Decentralizácia', 'Encyklopédický', 'Fascinujúci', 'Glaciológia', 'Hocijaký', 'Incidenčný', 'Recitál'],
    'd': ['Akademik', 'Bordel', 'Ciedeček', 'Ďatelina', 'Evidencia', 'Feudalizmus', 'Geodézia', 'Hinduizmus', 'Kandidát', 'Ľudia'],
    'e': ['Agent', 'Bazén', 'Cieľ', 'Diéta', 'Experiment', 'Frekvencia', 'Generál', 'Heterogénny', 'Jeden', 'Kameň'],
    'f': ['Definitívny', 'Deficit', 'Efektívny', 'Grafik', 'Kafetéria', 'Profil', 'Safari', 'Shift', 'Traffic', 'Výroční'],
    'g': ['Angličtina', 'Bagateľ', 'Degustácia', 'Emigrant', 'Figuľka', 'Hagiografia', 'Magnetický', 'Nigerský', 'Program', 'Signatura'],
    'h': ['Architektúra', 'Bahrajn', 'Čokoláda', 'Dohad', 'Exhibícia', 'Fuhrer', 'Mahagón', 'Nehoda', 'Pohoda', 'Rehabilitácia'],
    'i': ['Amerika', 'Biológia', 'Činiteľ', 'Dedina', 'Epidémia', 'Finálny', 'Grillovaný', 'Hierarchia', 'Kritický', 'Logika'],
    'j': ['Akrojumping', 'Bujara', 'Dejiny', 'Ekjum', 'Fajčiar', 'Gejša', 'Hájik', 'Injekcia', 'Kojot', 'Majáles'],
    'k': ['Anketa', 'Banka', 'Cyklus', 'Diskrétnosť', 'Etiketa', 'Fiktívny', 'Hokej', 'Inkvizícia', 'Janko', 'Konkrétny'],
    'l': ['Analogický', 'Balón', 'Cello', 'Dilema', 'Element', 'Film', 'Galón', 'Heliport', 'Ilegálny', 'Jalový'],
    'm': ['Anomália', 'Birmit', 'Diamant', 'Etimológia', 'Formát', 'Gramatika', 'Harmónia', 'Iluminácia', 'Komik', 'Lamelový'],
    'n': ['Anekdota', 'Banán', 'Činnosť', 'Denník', 'Fenomén', 'Generácia', 'Honiak', 'Internet', 'Kinematika', 'Lennon'],
    'o': ['Aróma', 'Biológ', 'Chronológ', 'Dekorátor', 'Ekonom', 'Filosof', 'Geológ', 'Horoskop', 'Ideológ', 'Kanonický'],
    'p': ['Adaptér', 'Baptista', 'Clipboard', 'Deputát', 'Ekspresia', 'Flipchart', 'Grapefruit', 'Heliport', 'Import', 'Jednotka'],
    'r': ['Aerobic', 'Barok', 'Ceruza', 'Derivát', 'Energia', 'Furor', 'Garantovanie', 'Hierarchia', 'Iracionálny', 'Karate'],
    's': ['Absolútne', 'Básnik', 'Časoslov', 'Disciplína', 'Estetika', 'Festival', 'Gestikulácia', 'Historik', 'Inštitút', 'Jaslo'],
    't': ['Astrálny', 'Baterka', 'Citlivý', 'Detail', 'Emitovať', 'Faktúra', 'Gotický', 'Hutník', 'Inštitút', 'Katalóg'],
    'u': ['Akustika', 'Bublina', 'Čučoriedka', 'Dokument', 'Exkurzia', 'Fakulta', 'Gaučový', 'Inaugurácia', 'Kabul', 'Kumulovať'],
    'v': ['Advokát', 'Bývanie', 'Cívka', 'Divadlo', 'Evakuácia', 'Festival', 'Gravírovať', 'Individuálny', 'Kováč', 'Lávka'],
    'z': ['Amazonka', 'Bazilika', 'Cvičenie', 'Dezert', 'Enzým', 'Frizúra', 'Gázový', 'Horizont', 'Izomér', 'Jazzový'],
  },
  4: {
    'a': ['Abecedný', 'Bažant', 'Čítanka', 'Diplomant', 'Elegancia', 'Farmaceut', 'Gymnastika', 'Himaláje', 'Ignorant', 'Kasáreň'],
    'b': ['Analfabet', 'Baseball', 'Celebrita', 'Distribuovať', 'Exhibícia', 'Freebie', 'Globálny', 'Halbert', 'Inhibícia', 'Kolíbka'],
    'c': ['Africký', 'Blízkosť', 'Caracteristický', 'Deficient', 'Electoral', 'Farmaceut', 'Geocentrický', 'Hepatocyt', 'Innocencia', 'Manicure'],
    'd': ['Abecedárka', 'Bomárdovať', 'Kandidát', 'Ľudový', 'Modernizmus', 'Ortodoxia', 'Pandémia', 'Slnečný', 'Tradícia', 'Vodcovstvo'],
    'e': ['Akademický', 'Benefíciár', 'Celeste', 'Dodávateľ', 'Eminencia', 'Fantéria', 'Galériový', 'Hemeralopia', 'Ilegálne', 'Kameleonský'],
    'f': ['Abecedár', 'Beneficiary', 'Coffeine', 'Defenestrácia', 'Effectivita', 'Grafitový', 'Infiltrácia', 'Manufaktúra', 'Offensive', 'Profilovať'],
    'g': ['Aboriginský', 'Blogér', 'Congregácia', 'Designový', 'Emigrovať', 'Foligénny', 'Geriatrický', 'Hexagonálny', 'Imaginárny', 'Integrácia'],
    'h': ['Abecedárium', 'Bolehlavec', 'Catechéza', 'Dekohérencia', 'Ethnický', 'Graphický', 'Ichthyológia', 'Katechumen', 'Lithológia', 'Marathónsky'],
    'i': ['Administrácia', 'Bolívijský', 'Činidlo', 'Definícia', 'Elixír', 'Feministický', 'Gravidita', 'Habilitácia', 'Inštalačný', 'Koordinovať'],
    'j': ['Abecedajka', 'Banjo', 'Conjugácia', 'Disjunkcia', 'Ejakulovať', 'Fidjianský', 'Injektor', 'Konjunkcia', 'Marijuana', 'Projektor'],
    'k': ['Elektrický', 'Folklórny', 'Gréckokatolický', 'Praktický', 'Rektorát', 'Slnečník', 'Technický', 'Taktický', 'Vulkanický', 'Klasický'],
    'l': ['Absolutizmus', 'Bibliografický', 'Cellulit', 'Diplomant', 'Explanácia', 'Filozofický', 'Genealógia', 'Helénsky', 'Implementácia', 'Kalkulačka'],
    'm': ['Alarmovať', 'Birmský', 'Dramaticky', 'Ekumenický', 'Formatovať', 'Geomantia', 'Harmonický', 'Informovať', 'Kozmický', 'Limitovať'],
    'n': ['Alternativa', 'Barnákulý', 'Činorodý', 'Definovaný', 'Ekonomický', 'Frontálny', 'Gymnasta', 'Harmonický', 'Identifikácia', 'Koronovaný'],
    'o': ['Absolutórium', 'Balkoný', 'Chronológia', 'Demokratický', 'Ekonomicky', 'Filosofovať', 'Gastronómia', 'Harmonogram', 'Ikonografický', 'Metodológia'],
    'p': ['Akceptovať', 'Bicepsový', 'Chrapúnik', 'Dampingový', 'Exspirácia', 'Filipínsky', 'Grappling', 'Hospodársky', 'Inšpekcia', 'Kleptomán'],
    'r': ['Administrativny', 'Ballerina', 'Centrifúga', 'Deklarovať', 'Expirovaný', 'Futúristický', 'Geografický', 'Historický', 'Ilustrácia', 'Kalifornia'],
    's': ['Atmosféra', 'Bursátil', 'Consistentný', 'Diversifikácia', 'Ekosystém', 'Floskulózny', 'Geosystém', 'Hemisféra', 'Infosystém', 'Konsistentný'],
    't': ['Aktivita', 'Bestiálny', 'Christianský', 'Detektívka', 'Elektorát', 'Footbal', 'Gastrítida', 'Hegemónia', 'Inštitúcia', 'Kontroverzný'],
    'u': ['Akumulátor', 'Batérium', 'Cirkumstancia', 'Dokumentácia', 'Epikurský', 'Fugitívny', 'Gratulovaný', 'Hubnutie', 'Imitúť', 'Kalkulátor'],
    'v': ['Aktivovaný', 'Bulvár', 'Civilizovaný', 'Derivovaný', 'Exkavovať', 'Frivolný', 'Gravírovanie', 'Innovácia', 'Kalvárium', 'Nervózny'],
    'z': ['Absolutizovať', 'Balzamovaný', 'Centralizovať', 'Dezinfikovaný', 'Elizabetský', 'Feudalizovaný', 'Galvanizovaný', 'Hospitalizácia', 'Immunizácia', 'Kanalizácia'],
  },
  5: {
    'a': ['Akrobatický', 'Bambusový', 'Charakteristika', 'Dinosaurový', 'Elektráreň', 'Fotografický', 'Germanský', 'Harmonikár', 'Imaginácia', 'Kapitalistický'],
    'b': ['Algebraický', 'Distribuovať', 'Exhibicionista', 'Neobvyklý', 'Preambula', 'Rehabilitácia', 'Schopný', 'Zobraziť', 'Súboj', 'Príbeh'],
    'c': ['Aristocratický', 'Demokratický', 'Encyklopédia', 'Geotechnický', 'Ironický', 'Kalciový', 'Monocyklista', 'Periodický', 'Technický', 'Ženíchov'],
    'd': ['Akordeonový', 'Bombardovanie', 'Celluloidy', 'Demokratizovať', 'Emendácia', 'Grandiózny', 'Kalendár', 'Metodický', 'Periodický', 'Skandinavsky'],
    'e': ['Akademické', 'Bombardér', 'Charakterový', 'Demontérovať', 'Epizodický', 'Generálny', 'Hromadenie', 'Konverzovať', 'Momentálne', 'Perfekcionalista'],
    'f': ['Akrofóbia', 'Biografický', 'Certifikát', 'Disgrafický', 'Etnografický', 'Fotografovať', 'Geografický', 'Historifikácia', 'Kartografický', 'Stenografický'],
    'g': ['Amalgamácia', 'Biografovať', 'Choreografia', 'Demografický', 'Emigrantský', 'Fotografický', 'Kaligrafický', 'Legislatíva', 'Monografia', 'Propaganda'],
    'h': ['Aerodynamický', 'Biochemický', 'Chronológicky', 'Desaťhodinový', 'Ezofág', 'Geochemický', 'Hexahedron', 'Kirchhofov', 'Metamorfóza', 'Patriarchálny'],
    'i': ['Automatický', 'Baktericídny', 'Certifikovaný', 'Dedičný', 'Elektronický', 'Fantastický', 'Geografický', 'Hierarchicky', 'Kalciový', 'Logisticky'],
    'j': ['Azerbajdžan', 'Bibliografický', 'Chlorofylovať', 'Demotivujúco', 'Extranjection', 'Fotografujúci', 'Germanojazičný', 'Interakujúci', 'Konjunktúra', 'Manipulácia'],
    'k': ['Abstraktný', 'Demokraticky', 'Elektronicky', 'Fantasticky', 'Geograficky', 'Hierarchicky', 'Identicky', 'Klastrový', 'Logistiky', 'Matematicky'],
    'l': ['Aerobiálny', 'Bakteriálny', 'Celulárny', 'Diferenciálny', 'Emocionálny', 'Fenomenálny', 'Gravitacionálny', 'Horizontálny', 'Industriálny', 'Kolaterálny'],
    'm': ['Aerodynamický', 'Astronomický', 'Bibliomán', 'Centimetrový', 'Dizajnmóda', 'Ekonomický', 'Geometrický', 'Harmonický', 'Informovaný', 'Matematický'],
    'n': ['Administratívny', 'Bernardínsky', 'Charakterizovať', 'Determinovať', 'Elektromagnetický', 'Feministický', 'Germanistika', 'Humanitný', 'Inštrumentálny', 'Kontinentálny'],
    'o': ['Administratívny', 'Bakteriológia', 'Demokratický', 'Epistemológia', 'Fenomenológia', 'Gastroenterológia', 'Hematológia', 'Imunológia', 'Kriminológia', 'Metodológia'],
    'p': ['Aristokratický', 'Demokratický', 'Elektromagnetický', 'Fantastický', 'Gastroenterický', 'Homeopatický', 'Idiomatický', 'Klimatický', 'Matematický', 'Problematický'],
    'r': ['Akrobatický', 'Baktériový', 'Centimetrový', 'Demokratický', 'Elektrárenský', 'Fotografický', 'Geometrický', 'Historický', 'Informatický', 'Kilometrový'],
    's': ['Administratívny', 'Beznásilný', 'Charakteristický', 'Demografický', 'Esteticistický', 'Fotografický', 'Gymnastický', 'Historistický', 'Idealistický', 'Kolonistický'],
    't': ['Akrobatka', 'Administratívny', 'Demokratický', 'Elektrónová', 'Fantastický', 'Geopolitický', 'Hematitový', 'Informatický', 'Katalytický', 'Matematický'],
    'u': ['Abecedáriumový', 'Biografický', 'Centrifugálny', 'Dokumentárny', 'Emulsifikovaný', 'Fotografovateľný', 'Inauguračný', 'Komunikovaný', 'Manipulovať', 'Redundantný'],
    'v': ['Administratívny', 'Barokovitý', 'Charakterovať', 'Dekovárovať', 'Evakuovaný', 'Favoritizovaný', 'Galvanizovať', 'Handlovať', 'Inventúrovať', 'Konverzovať'],
    'z': ['Akrylizovaný', 'Banzajizovať', 'Charakterizovať', 'Demokratizovať', 'Ekumenizovať', 'Favorizovať', 'Galvanizovať', 'Harmonizovať', 'Idealizovať', 'Katalyzovať'],
  },
  6: {
    'a': ['Akrobatika', 'Demokratická', 'Encyklopédia', 'Formálna', 'Geografická', 'Hierarchia', 'Informatika', 'Klasifikácia', 'Matematika', 'Nesmrteľná'],
    'b': ['Administratíve', 'Baktériológ', 'Centrifugálneb', 'Dokumentárneb', 'Emulsifikovanýb', 'Fotografovateľnéb', 'Inauguračnéb', 'Komunikovanýb', 'Manipulovaťb', 'Redundantnýb'],
    'c': ['Aerodynamický', 'Biochemický', 'Chronológicky', 'Demokratický', 'Elektronický', 'Fantastický', 'Geografický', 'Hierarchický', 'Informatický', 'Klasický'],
    'd': ['Akrobatickyd', 'Demokratickyd', 'Encyklopédiad', 'Formálnad', 'Geografickád', 'Hierarchiad', 'Informatikad', 'Klasifikáciad', 'Matematikad', 'Nesmrteľnád'],
    'e': ['Akrobatické', 'Demokratické', 'Encyklopédie', 'Formálne', 'Geografické', 'Hierarchie', 'Informatike', 'Klasifikácie', 'Matematike', 'Nesmrteľné'],
    'f': ['Detektívf', 'Kolektívf', 'Motívf', 'Negatívf', 'Objektívf', 'Pozitívf', 'Primitívf', 'Perspektívf', 'Relatívf', 'Alternatívf'],
    'g': ['Katalóg', 'Monológ', 'Dialóg', 'Prológ', 'Epilóg', 'Analóg', 'Dekalóg', 'Travelóg', 'Ideológ', 'Ekológ'],
    'h': ['Monarchah', 'Patriarchah', 'Oligarchah', 'Matriarchah', 'Hierarchah', 'Autarchah', 'Tetrarchah', 'Pentarchah', 'Exarchah', 'Ethnarchah'],
    'i': ['Safari', 'Tsunami', 'Sushi', 'Origami', 'Salami', 'Bikini', 'Martini', 'Zucchini', 'Linguini', 'Confetti'],
    'j': ['Maharádžaj', 'Kilimandžároj', 'Sarajevoj', 'Tokioj', 'Pekingj', 'Šanghajj', 'Mumbajj', 'Dubajj', 'Bombajj', 'Azerbajdžánj'],
    'k': ['Almanach', 'Monarch', 'Stomach', 'Patriarch', 'Oligarch', 'Matriarch', 'Autarch', 'Tetrarch', 'Pentarch', 'Exarch'],
    'l': ['Festival', 'Generál', 'Hospital', 'Kriminál', 'Minerál', 'Originál', 'Principal', 'Terminal', 'Arsenal', 'Admiral'],
    'm': ['Album', 'Forum', 'Stadium', 'Maximum', 'Minimum', 'Premium', 'Medium', 'Platinum', 'Titanium', 'Aquarium'],
    'n': ['Balón', 'Karton', 'Salón', 'Sezón', 'Šampión', 'Pavilón', 'Milión', 'Bilión', 'Trilión', 'Región'],
    'o': ['Studio', 'Radio', 'Video', 'Portfolio', 'Piano', 'Casino', 'Scenario', 'Cappuccino', 'Espresso', 'Risotto'],
    'p': ['Biskup', 'Recept', 'Koncept', 'Excerpt', 'Percept', 'Princíp', 'Handicap', 'Workshop', 'Desktop', 'Laptop'],
    'r': ['Amatér', 'Charakter', 'Minister', 'Premier', 'Inžinier', 'Pionier', 'Kariér', 'Interiér', 'Exteriér', 'Kavaliér'],
    's': ['Campus', 'Cirkus', 'Vírus', 'Status', 'Fokus', 'Bonus', 'Kaktus', 'Autobus', 'Globus', 'Radius'],
    't': ['Budget', 'Kabinet', 'Banket', 'Market', 'Basket', 'Gadget', 'Magnet', 'Paket', 'Raket', 'Sonnet'],
    'u': ['Bureau', 'Menu', 'Fondue', 'Venue', 'Revenue', 'Avenue', 'Rescue', 'Continue', 'Issue', 'Tissue'],
    'v': ['Detektív', 'Kolektív', 'Motív', 'Negatív', 'Objektív', 'Pozitív', 'Primitív', 'Perspektív', 'Relatív', 'Alternatív'],
    'z': ['Jazz', 'Pizzazz', 'Showbiz', 'Quiz', 'Fizz', 'Buzz', 'Fuzz', 'Razz', 'Ritz', 'Waltz'],
  }
};

// Get random words for a specific letter at a specific position
export function getWordsForLetter(letter: string, position: number, count: number = 6): string[] {
  const lowerLetter = letter.toLowerCase();
  const words = WORDS_BY_POSITION[position]?.[lowerLetter] || [];
  
  if (words.length === 0) {
    // Fallback - generate placeholder words
    return Array(count).fill(`Slovo_${letter}_${position}`);
  }
  
  // Shuffle and return requested count
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get a single random word for a letter at position
export function getWordForLetter(letter: string, position: number): string {
  const words = getWordsForLetter(letter, position, 1);
  return words[0] || `Slovo_${letter}`;
}

// Sample Slovak Wikipedia articles - used for normal browsing (real Wikipedia content)
export const SLOVAK_ARTICLES: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  links: string[];
  categories: string[];
  image?: string;
}> = {
  'albert-einstein': {
    title: 'Albert Einstein',
    excerpt: 'bol nemecký teoretický fyzik švajčiarskeho pôvodu, ktorý je považovaný za jedného z najvýznamnejších vedcov všetkých čias.',
    content: `Albert Einstein (14. marca 1879, Ulm, Nemecko – 18. apríla 1955, Princeton, New Jersey, USA) bol nemecký teoretický fyzik švajčiarskeho pôvodu, ktorý je považovaný za jedného z najvýznamnejších vedcov všetkých čias. Je známy predovšetkým ako tvorca teórie relativity, ktorá revolučne zmenila chápanie priestoru, času, gravitácie a vesmíru.

== Raný život a vzdelanie ==
Einstein sa narodil v Ulme v Nemecku židovským rodičom Hermannovi Einsteinovi a Pauline Einsteinovej, rodenej Kochovej. Keď mal jeden rok, rodina sa presťahovala do Mníchova, kde jeho otec a strýko založili spoločnosť na výrobu elektrických zariadení. Einstein navštevoval katolícku základnú školu a neskôr Luitpold Gymnasium (dnes Albert Einstein Gymnasium). V škole vynikal v matematike a prírodných vedách, no mal problémy s autoritami a rigidným vzdelávacím systémom.

V roku 1895 sa Einstein pokúsil o prijatie na Švajčiarsky federálny polytechnický inštitút (ETH) v Zürichu, no neuspel v prijímacích skúškach. Po ročnom štúdiu na strednej škole v Aarau bol nakoniec prijatý a v roku 1900 získal diplom učiteľa fyziky a matematiky.

== Zázračný rok 1905 ==
Rok 1905 je často označovaný ako Einsteinov „annus mirabilis" (zázračný rok). Počas tohto roku publikoval štyri prelomové vedecké práce v prestížnom časopise Annalen der Physik:

* Práca o fotoelektrickom jave, ktorá zaviedla koncept svetelných kvant (fotónov) a za ktorú neskôr dostal Nobelovu cenu
* Práca o Brownovom pohybe, ktorá poskytla empirický dôkaz existencie atómov
* Špeciálna teória relativity, ktorá zaviedla revolučné koncepty o priestore a čase
* Vzťah medzi hmotnosťou a energiou vyjadrený slávnou rovnicou E=mc²

== Všeobecná teória relativity ==
Medzi rokmi 1907 a 1915 Einstein pracoval na rozšírení špeciálnej teórie relativity tak, aby zahŕňala gravitáciu. Výsledkom bola všeobecná teória relativity, publikovaná v roku 1915, ktorá opisuje gravitáciu nie ako silu, ale ako zakrivenie časopriestoru spôsobené hmotou a energiou.

Táto teória predpovedala niekoľko pozoruhodných javov, vrátane ohýbania svetla gravitačnými poľami, gravitačného červeného posunu a existencie čiernych dier. Mnohé z týchto predpovedí boli neskôr experimentálne potvrdené.

== Nobelova cena ==
V roku 1921 bol Einstein ocenený Nobelovou cenou za fyziku „za služby teoretickej fyzike, a najmä za objav zákona fotoelektrického javu". Je zaujímavé, že cenu nezískal za teóriu relativity, ktorá bola v tom čase stále považovaná za kontroverznú.

== Emigrácia do USA ==
Po nástupe nacistov k moci v Nemecku v roku 1933 Einstein emigroval do Spojených štátov amerických. Stal sa profesorom na Inštitúte pre pokročilé štúdium v Princetone, kde pôsobil až do svojej smrti. V roku 1940 získal americké občianstvo.

== Posledné roky a odkaz ==
Einstein strávil posledné desaťročia svojho života hľadaním jednotnej teórie poľa, ktorá by spojila gravitáciu s elektromagnetizmom. Hoci tento cieľ nedosiahol, jeho práca položila základy pre moderné pokusy o vytvorenie teórie všetkého.

Albert Einstein zomrel 18. apríla 1955 v Princetone na prasknutie aneuryzmy brušnej aorty. Jeho mozog bol uchovaný pre vedecké štúdium. Einstein je dodnes symbolom génia a jeho práce naďalej ovplyvňujú modernú fyziku a kozmológiu.`,
    links: ['Fyzika', 'Teória relativity', 'Nobelova cena', 'Nemecko', 'Švajčiarsko', 'Princeton', 'Fotoelektrický jav', 'Kvantová mechanika'],
    categories: ['Fyzici', 'Nobelisti', 'Nemeckí vedci', 'Židovskí vedci', 'Osobnosti 20. storočia'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg'
  },
  'slovensko': {
    title: 'Slovensko',
    excerpt: 'oficiálne Slovenská republika, je vnútrozemský štát v strednej Európe s bohatou históriou a kultúrou.',
    content: `Slovensko, oficiálne Slovenská republika, je vnútrozemský štát v strednej Európe. Krajina má rozlohu 49 035 km² a približne 5,4 milióna obyvateľov. Hlavným a najväčším mestom je Bratislava. Slovensko je členom Európskej únie, NATO, OSN, OECD a ďalších medzinárodných organizácií.

== Geografia ==
Slovensko sa nachádza v srdci Európy a susedí s piatimi krajinami: Českou republikou na severozápade, Poľskom na severe, Ukrajinou na východe, Maďarskom na juhu a Rakúskom na juhozápade. Krajina je prevažne hornatá, s Karpatským oblúkom pokrývajúcim väčšinu jej územia.

=== Pohoria ===
Najvýznamnejšími pohoriami sú Tatry, ktoré sa delia na Vysoké Tatry a Nízke Tatry. Vysoké Tatry sú najvyšším pohorím Karpát a obsahujú najvyšší bod Slovenska – Gerlachovský štít (2 655 m n. m.). Ďalšie významné pohoria zahŕňajú Malú Fatru, Veľkú Fatru, Slovenské rudohorie a Malé Karpaty.

=== Rieky a vodné toky ===
Hlavnou riekou Slovenska je Dunaj, ktorý tvorí časť hranice s Maďarskom a Rakúskom. Ďalšie významné rieky sú Váh (najdlhšia rieka na Slovensku), Hron, Hornád, Bodrog a Morava. Krajina má tiež početné jazerá, z ktorých sú najznámejšie plesá vo Vysokých Tatrách.

== História ==
História Slovenska siaha až do obdobia paleolitu. Územie bolo osídlené Keltmi, neskôr Germánmi a od 5. storočia Slovanmi.

=== Veľká Morava ===
V 9. storočí vznikla Veľká Morava, prvý významný slovanský štátny útvar v strednej Európe. Za vlády kniežaťa Rastislava a jeho synovca Svätopluka dosiahla ríša najväčší rozmach. V roku 863 prišli na Veľkú Moravu byzantskí misionári Konštantín (Cyril) a Metod, ktorí vytvorili hlaholiku a položili základy slovanskej písomnosti.

=== Uhorské obdobie ===
Po rozpade Veľkej Moravy začiatkom 10. storočia sa územie dnešného Slovenska postupne stalo súčasťou Uhorského kráľovstva. Toto obdobie trvalo takmer tisíc rokov. Slovenské mestá ako Banská Štiavnica, Kremnica a Levoča sa stali významnými baníckymi a obchodnými centrami.

=== 20. storočie ===
Po rozpade Rakúsko-Uhorska v roku 1918 vzniklo Československo. Počas druhej svetovej vojny existoval Slovenský štát (1939-1945) ako satelit nacistického Nemecka. Po vojne bolo Československo obnovené a od roku 1948 bolo súčasťou komunistického bloku.

=== Vznik samostatnej republiky ===
1. januára 1993 sa Slovensko stalo nezávislým štátom po pokojnom rozdelení Československa, známom ako Zamatový rozvod. V roku 2004 vstúpilo Slovensko do Európskej únie a NATO, v roku 2009 prijalo euro.

== Kultúra ==
Slovenská kultúra je bohatá a rozmanitá, ovplyvnená slovanskými, maďarskými, nemeckými a ďalšími tradíciami. Folklór hrá dôležitú úlohu v národnej identite, s pestrofarenými krojmi, ľudovými tancami a hudbou.

=== Literatúra ===
Medzi najvýznamnejších slovenských spisovateľov patria Ľudovít Štúr (kodifikátor spisovnej slovenčiny), Pavol Országh Hviezdoslav, Martin Kukučín a Dominik Tatarka.

=== Hudba ===
Slovenská hudba zahŕňa bohatú ľudovú tradíciu, ako aj klasickú hudbu. Známymi hudobníkmi sú skladateľ Eugen Suchoň a operní speváci Peter Dvorský a Edita Gruberová.

== Ekonomika ==
Slovensko má vyspelú trhovú ekonomiku. Hlavnými priemyselnými odvetviami sú automobilový priemysel, elektrotechnika, strojárstvo a informatika. Krajina je jedným z najväčších výrobcov automobilov na svete v prepočte na obyvateľa.`,
    links: ['Bratislava', 'Tatry', 'Európska únia', 'Veľká Morava', 'Dunaj', 'Slovenský jazyk', 'Karpaty', 'Vysoké Tatry'],
    categories: ['Štáty Európy', 'Slovensko', 'Stredná Európa', 'Členské štáty EÚ'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Europe-Slovakia.svg/250px-Europe-Slovakia.svg.png'
  },
  'bratislava': {
    title: 'Bratislava',
    excerpt: 'je hlavné a najväčšie mesto Slovenska, politické, kultúrne a ekonomické centrum krajiny.',
    content: `Bratislava je hlavné a najväčšie mesto Slovenska. Nachádza sa na juhozápade krajiny, na oboch brehoch rieky Dunaj a pri úpätí Malých Karpát. S približne 450 000 obyvateľmi (a takmer 700 000 v metropolitnej oblasti) je politickým, kultúrnym, ekonomickým a vedeckým centrom Slovenska.

== Geografia ==
Bratislava leží v juhozápadnom cípe Slovenska, na rozhraní Podunajskej nížiny a Malých Karpát. Je jediným hlavným mestom na svete, ktoré hraničí s dvoma nezávislými štátmi – Rakúskom a Maďarskom. Vzdialenosť od Viedne je len 60 km, čo z nich robí najbližšie si ležiace hlavné mestá v Európe.

=== Dunaj ===
Dunaj, druhá najdlhšia rieka v Európe, preteká stredom mesta. Rieka tradične rozdeľuje mesto na dve časti – staršie centrum na ľavom brehu a novšiu zástavbu na pravom brehu (Petržalka). Cez Dunaj vedú štyri mosty, z ktorých najznámejší je Most SNP s vyhliadkovou vežou UFO.

=== Klíma ===
Bratislava má kontinentálnu klímu s teplými letami a chladnými zimami. Priemerná ročná teplota je okolo 10°C. Mesto patrí k najteplejším oblastiam Slovenska.

== História ==
Územie Bratislavy bolo osídlené už od neolitu. Keltské osídlenie siaha do 1. storočia pred n. l.

=== Stredovek ===
Prvá písomná zmienka o Bratislave (vtedy Prešporok/Pressburg/Pozsony) pochádza z roku 907. V roku 1291 získala mestské privilégiá. V roku 1465 tu kráľ Matej Korvín založil Academiu Istropolitanu, prvú univerzitu na území dnešného Slovenska.

=== Korunovačné mesto ===
Od roku 1536 do roku 1783 bola Bratislava hlavným mestom Uhorska a korunovačným mestom uhorských kráľov. V Dóme sv. Martina bolo korunovaných 11 kráľov a 8 kráľovných, vrátane Márie Terézie.

=== Moderná história ===
Po vzniku Československa v roku 1918 sa Bratislava stala hlavným mestom Slovenskej krajiny. Počas druhej svetovej vojny bola hlavným mestom Slovenského štátu. Po roku 1945 prešla rozsiahlou industrializáciou a výstavbou nových sídlisk.

=== Po roku 1989 ===
Po Nežnej revolúcii v roku 1989 a rozdelení Československa v roku 1993 sa Bratislava stala hlavným mestom nezávislého Slovenska. Mesto prešlo výraznou transformáciou a modernizáciou.

== Kultúra a pamiatky ==
Bratislava má bohaté kultúrne dedičstvo s množstvom historických pamiatok, múzeí a galérií.

=== Bratislavský hrad ===
Dominantou mesta je Bratislavský hrad, ktorý sa týči na kopci nad Dunajom. Hrad má charakteristickú štvorbokú siluetu s rohovou vežou. Dnes slúži ako múzeum a reprezentačné priestory.

=== Staré Mesto ===
Historické centrum mesta, Staré Mesto, si zachovalo stredoveký charakter s úzkymi uličkami a barokovými palácmi. K najvýznamnejším pamiatkam patria Michalská brána, Primaciálny palác, Stará radnica a Dóm sv. Martina.

=== Moderná architektúra ===
Moderná Bratislava sa vyznačuje výškovou zástavbou a novými obchodnými centrami. Výraznou dominantou je Most SNP s UFO reštauráciou, Eurovea a nová zástavba na nábreží Dunaja.

== Ekonomika ==
Bratislava je ekonomickým centrom Slovenska s najvyšším HDP na obyvateľa v krajine. Mesto je sídlom mnohých medzinárodných spoločností, bánk a IT firiem. Významné sú aj automobilový priemysel (Volkswagen) a chemický priemysel.

== Doprava ==
Bratislava má rozvinutú dopravnú infraštruktúru vrátane medzinárodného letiska, riečneho prístavu, železničnej a cestnej siete. Mestská hromadná doprava zahŕňa autobusy, trolejbusy a električky.`,
    links: ['Slovensko', 'Dunaj', 'Malé Karpaty', 'Bratislavský hrad', 'Mária Terézia', 'Most SNP', 'Staré Mesto', 'Dóm svätého Martina'],
    categories: ['Mestá na Slovensku', 'Hlavné mestá v Európe', 'Bratislava'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/SNP_Bridge.jpg/280px-SNP_Bridge.jpg'
  },
  'historia': {
    title: 'História',
    excerpt: 'je veda, ktorá sa zaoberá skúmaním a interpretáciou minulosti ľudskej spoločnosti na základe písomných prameňov.',
    content: `História (z gréckeho ἱστορία – historeín, „zisťovať, skúmať") je veda, ktorá sa zaoberá skúmaním a interpretáciou minulosti ľudskej spoločnosti. Historici využívajú písomné pramene, archeologické nálezy a iné dôkazy na rekonštrukciu udalostí a procesov, ktoré formovali ľudskú civilizáciu.

== Definícia a predmet ==
História sa tradične chápe ako štúdium minulosti od vzniku písma (približne 3000 pred n. l.). Obdobie pred vznikom písma sa označuje ako pravek alebo prehistória a skúma ho predovšetkým archeológia.

Predmetom histórie sú:
* Politické dejiny – vývoj štátov, vlád a politických systémov
* Sociálne dejiny – vývoj spoločnosti, sociálnych skupín a každodenného života
* Ekonomické dejiny – vývoj hospodárstva, obchodu a výroby
* Kultúrne dejiny – vývoj umenia, náboženstva, vedy a vzdelávania
* Vojenské dejiny – vojny, konflikty a vojenská stratégia

== Metodológia ==
Historická metóda zahŕňa niekoľko kľúčových krokov:

=== Heuristika ===
Heuristika je proces zhromažďovania prameňov. Historici vyhľadávajú primárne pramene (dokumenty, listy, kroniky, artefakty z obdobia) a sekundárne pramene (neskoršie interpretácie a analýzy).

=== Kritika prameňov ===
Vonkajšia kritika overuje autenticitu pramena – či je skutočne z daného obdobia a od uvádzaného autora. Vnútorná kritika hodnotí vierohodnosť a spoľahlivosť obsahu.

=== Interpretácia ===
Historik analyzuje pramene, zasadzuje ich do kontextu a vytvára koherentný výklad udalostí. Interpretácia je vždy ovplyvnená perspektívou historika a dobovým kontextom.

== Historické obdobia ==
Dejiny sa tradične delia na niekoľko hlavných období:

=== Starovek ===
Starovek zahŕňa obdobie od vzniku prvých civilizácií (približne 3000 pred n. l.) do pádu Západorímskej ríše (476 n. l.). Kľúčové civilizácie zahŕňajú Mezopotámiu, staroveký Egypt, Grécko a Rím.

=== Stredovek ===
Stredovek trvá od pádu Ríma do konca 15. storočia. V Európe sa vyznačuje feudalizmom, dominanciou cirkvi a postupným formovaním národných štátov.

=== Novovek ===
Novovek začína objavením Ameriky (1492) alebo reformáciou (1517). Zahŕňa obdobie renesancie, osvietenstva, priemyselnej revolúcie a kolonializmu.

=== Moderné dejiny ===
Moderné dejiny začínajú Francúzskou revolúciou (1789) a zahŕňajú 19. a 20. storočie s ich dramatickými zmenami – svetové vojny, vznik a pád totalitných režimov, dekolonizácia a globalizácia.

== Historické školy ==
V priebehu storočí vznikli rôzne prístupy k štúdiu histórie:

* Pozitivizmus – dôraz na objektívne fakty a vedeckú metódu (Leopold von Ranke)
* Marxistická historiografia – dôraz na ekonomické faktory a triedny boj
* Škola Annales – dôraz na dlhodobé štruktúry a mentalitu (Fernand Braudel)
* Mikrohistória – detailné štúdium malých komunít a jednotlivcov

== Pomocné vedy historické ==
História využíva mnoho pomocných disciplín:
* Archeológia – štúdium materiálnych pozostatkov
* Paleografia – čítanie starých písem
* Diplomatika – štúdium úradných dokumentov
* Genealógia – výskum rodokmeňov
* Numizmatika – štúdium mincí
* Heraldika – štúdium erbov`,
    links: ['Archeológia', 'Historiografia', 'Starovek', 'Stredovek', 'Novovek', 'Francúzska revolúcia', 'Rím', 'Grécko'],
    categories: ['Vedy', 'Spoločenské vedy', 'História'],
  },
  'fyzika': {
    title: 'Fyzika',
    excerpt: 'je prírodná veda, ktorá skúma základné zákonitosti prírody, hmotu, energiu, priestor a čas.',
    content: `Fyzika (z gréckeho φύσις – physis, „príroda") je prírodná veda, ktorá skúma základné zákonitosti prírody. Zaoberá sa štúdiom hmoty, energie, priestoru, času a ich vzájomných interakcií. Fyzika je jednou z najstarších akademických disciplín a jej objavy tvoria základ pre ostatné prírodné vedy.

== Hlavné oblasti fyziky ==

=== Klasická mechanika ===
Klasická mechanika, založená na Newtonových zákonoch pohybu, opisuje pohyb telies pri bežných rýchlostiach a veľkostiach. Zahŕňa kinematiku (opis pohybu), dynamiku (príčiny pohybu) a statiku (rovnováhu síl).

Newtonove zákony:
* Prvý zákon (zákon zotrvačnosti) – teleso zotrváva v pokoji alebo v rovnomernom priamočiarom pohybe, kým naň nepôsobí vonkajšia sila
* Druhý zákon – sila sa rovná súčinu hmotnosti a zrýchlenia (F = ma)
* Tretí zákon – ku každej akcii existuje rovnaká a opačná reakcia

=== Termodynamika ===
Termodynamika sa zaoberá tepelnou energiou a jej premenou na iné formy energie. Základné zákony termodynamiky opisujú správanie tepla, práce a energie v systémoch.

* Nultý zákon – definícia tepelnej rovnováhy
* Prvý zákon – zákon zachovania energie
* Druhý zákon – entropia izolovaného systému nemôže klesať
* Tretí zákon – pri absolútnej nule má kryštál nulovú entropiu

=== Elektromagnetizmus ===
Elektromagnetizmus opisuje vzájomné pôsobenie elektricky nabitých častíc a elektromagnetické žiarenie. Maxwellove rovnice zjednocujú elektrické a magnetické javy a predpovedajú existenciu elektromagnetických vĺn vrátane svetla.

=== Optika ===
Optika skúma vlastnosti svetla a jeho interakciu s hmotou. Zahŕňa geometrickú optiku (lúče svetla), vlnovú optiku (interferencia, difrakcia) a kvantovú optiku.

=== Kvantová mechanika ===
Kvantová mechanika opisuje správanie častíc na atomárnej a subatomárnej úrovni. Kľúčové koncepty zahŕňajú:
* Vlnovo-časticový dualizmus
* Heisenbergov princíp neurčitosti
* Schrödnigerova rovnica
* Kvantová superpozícia a zapletenie

=== Teória relativity ===
Einsteinova teória relativity pozostáva z dvoch častí:
* Špeciálna teória relativity (1905) – zaoberá sa pohybom pri vysokých rýchlostiach blízkych rýchlosti svetla
* Všeobecná teória relativity (1915) – opisuje gravitáciu ako zakrivenie časopriestoru

=== Jadrová a časticová fyzika ===
Jadrová fyzika skúma štruktúru atómových jadier a jadrové reakcie. Časticová fyzika (fyzika vysokých energií) skúma elementárne častice a ich interakcie pomocou urýchľovačov.

== Fyzikálne veličiny a jednotky ==
Fyzika používa systém SI (Medzinárodná sústava jednotiek) so základnými jednotkami:
* meter (m) – dĺžka
* kilogram (kg) – hmotnosť
* sekunda (s) – čas
* ampér (A) – elektrický prúd
* kelvin (K) – teplota
* mol (mol) – látkové množstvo
* kandela (cd) – svietivosť

== Fyzika a technológia ==
Fyzikálne objavy viedli k revolučným technológiám:
* Elektrina a magnetizmus → elektrické siete, motory, generátory
* Kvantová mechanika → tranzistory, lasery, počítače
* Jadrová fyzika → jadrová energia, medicínska diagnostika
* Teória relativity → GPS, urýchľovače častíc`,
    links: ['Matematika', 'Chémia', 'Mechanika', 'Termodynamika', 'Elektromagnetizmus', 'Kvantová mechanika', 'Teória relativity', 'Albert Einstein'],
    categories: ['Prírodné vedy', 'Fyzika'],
  },
  'matematika': {
    title: 'Matematika',
    excerpt: 'je formálna veda, ktorá sa zaoberá štúdiom čísel, štruktúr, priestoru, zmeny a vzťahov medzi abstraktnými objektmi.',
    content: `Matematika je formálna veda, ktorá sa zaoberá štúdiom čísel, štruktúr, priestoru, zmeny a vzťahov medzi abstraktnými objektmi. Je základom pre mnohé ďalšie vedy a má široké praktické aplikácie v každodennom živote.

== Hlavné oblasti matematiky ==

=== Aritmetika ===
Aritmetika je najstaršia a najzákladnejšia oblasť matematiky. Zaoberá sa prirodzenými číslami a základnými operáciami – sčítaním, odčítaním, násobením a delením. Z aritmetiky sa vyvinula teória čísel, ktorá skúma vlastnosti celých čísel.

=== Algebra ===
Algebra sa zaoberá matematickými symbolmi a pravidlami pre manipuláciu s týmito symbolmi. Zahŕňa riešenie rovníc, štúdium polynómov a algebraických štruktúr ako sú grupy, okruhy a telesá.

Základné algebraické identity:
* (a + b)² = a² + 2ab + b²
* (a - b)² = a² - 2ab + b²
* a² - b² = (a + b)(a - b)

=== Geometria ===
Geometria skúma vlastnosti priestoru a tvarov. Euklidovská geometria, založená na Euklidových Základoch, bola tisícročia paradigmou matematického myslenia.

Typy geometrie:
* Euklidovská geometria – rovinná a priestorová geometria
* Analytická geometria – použitie algebraických metód na geometrické problémy
* Diferenciálna geometria – geometria kriviek a plôch
* Neeuklidovské geometrie – sférická, hyperbolická geometria

=== Matematická analýza ===
Matematická analýza sa zaoberá limitami, spojitosťou, deriváciami a integrálmi. Diferenciálny počet, vyvinutý Newtonom a Leibnizom, revolučne zmenil vedu a techniku.

Kľúčové koncepty:
* Limita – základný koncept pre definíciu spojitosti a derivácie
* Derivácia – miera zmeny funkcie v danom bode
* Integrál – opak derivácie, plocha pod krivkou

=== Pravdepodobnosť a štatistika ===
Pravdepodobnosť kvantifikuje neistotu a náhodné javy. Štatistika sa zaoberá zberom, analýzou a interpretáciou dát.

=== Diskrétna matematika ===
Diskrétna matematika sa zaoberá štruktúrami, ktoré sú fundamentálne diskrétne (nie spojité). Zahŕňa kombinatoriku, teóriu grafov, kryptografiu a teoretickú informatiku.

== História matematiky ==

=== Staroveká matematika ===
Matematika vznikla z praktických potrieb – meranie pozemkov, obchod, astronómia. Mezopotámska a egyptská matematika riešili praktické úlohy. Grécka matematika (Pytagoras, Euklides, Archimedes) položila základy axiomatického prístupu.

=== Stredoveká matematika ===
Indickí matematici vyvinuli desiatkovú sústavu a koncept nuly. Arabskí učenci zachovali a rozvinuli grécke matematické dedičstvo a zaviedli algebru (al-Chvárizmí).

=== Moderná matematika ===
Od 17. storočia nasledoval prudký rozvoj – analytická geometria (Descartes), diferenciálny počet (Newton, Leibniz), teória pravdepodobnosti (Pascal, Fermat). 19. a 20. storočie priniesli formalizáciu matematiky, teóriu množín (Cantor) a matematickú logiku (Gödel).

== Aplikácie matematiky ==
Matematika má široké uplatnenie:
* Fyzika – modelovanie prírodných javov
* Informatika – algoritmy, kryptografia
* Ekonomika – finančné modely, teória hier
* Biológia – populačná dynamika, genetika
* Inžinierstvo – návrh konštrukcií, optimalizácia`,
    links: ['Algebra', 'Geometria', 'Matematická analýza', 'Fyzika', 'Teória čísel', 'Pravdepodobnosť', 'Štatistika', 'Euklides'],
    categories: ['Formálne vedy', 'Matematika'],
  },
  'europa': {
    title: 'Európa',
    excerpt: 'je svetadiel nachádzajúci sa na severnej pologuli, považovaný za kolísku západnej civilizácie.',
    content: `Európa je svetadiel nachádzajúci sa prevažne na severnej pologuli. S rozlohou približne 10,18 miliónov km² je druhým najmenším svetadielom. Európa má približne 750 miliónov obyvateľov a je považovaná za kolísku západnej civilizácie.

== Geografia ==

=== Poloha a hranice ===
Európa je západnou časťou eurázsijského kontinentu. Na severe ju ohraničuje Severný ľadový oceán, na západe Atlantický oceán, na juhu Stredozemné more a na východe Ural, Kaspické more a Kaukaz.

=== Reliéf ===
Európsky reliéf je rôznorodý:
* Nížiny – Východoeurópska nížina, Severonemecká nížina, Pádska nížina
* Stredne vysoké pohoria – Stredohorská oblasť, Škandinávia
* Vysoké pohoria – Alpy (Mont Blanc 4808 m), Pyreneje, Karpaty, Kaukaz

=== Vodstvo ===
Hlavné rieky zahŕňajú Volgu (najdlhšia európska rieka), Dunaj, Dneper, Don, Rýn a Odru. Významné jazerá sú Ladožské jazero, Onežské jazero a Ženevské jazero.

=== Podnebie ===
Európa má prevažne mierne podnebie s výraznými regionálnymi rozdielmi:
* Stredomorské podnebie – suché horúce letá, mierne vlhké zimy
* Oceánske podnebie – mierne teploty, vysoké zrážky
* Kontinentálne podnebie – horúce letá, studené zimy
* Subpolárne podnebie – na severe Škandinávie a Ruska

== História ==

=== Starovek ===
Európska civilizácia má korene v starovekom Grécku a Ríme. Grécka kultúra položila základy filozofie, demokracie a vedy. Rímska ríša rozšírila tieto hodnoty po celom kontinente.

=== Stredovek ===
Po páde Rímskej ríše nasledovalo obdobie raného stredoveku. Kresťanstvo sa stalo dominantným náboženstvom. Postupne vznikali stredoveké kráľovstvá, ktoré položili základy moderných európskych štátov.

=== Novovek ===
Renesancia (15.-16. storočie) priniesla obrodu umenia a vedy. Reformácia rozdelila kresťanstvo. Vek objavov viedol k európskej kolonizácii sveta. Osvietenstvo zdôraznilo rozum a individuálne práva.

=== Moderné dejiny ===
19. storočie prinieslo priemyselnú revolúciu a nacionalizmus. 20. storočie poznačili dve svetové vojny, vzostup a pád komunizmu. Po roku 1945 vznikla Európska únia, ktorá podporuje mier a spoluprácu.

== Politické rozdelenie ==
Európa má približne 50 štátov:
* Západná Európa – Francúzsko, Nemecko, Veľká Británia, Belgicko, Holandsko
* Severná Európa – Švédsko, Nórsko, Fínsko, Dánsko, Island
* Južná Európa – Taliansko, Španielsko, Portugalsko, Grécko
* Východná Európa – Poľsko, Česko, Slovensko, Maďarsko, Ukrajina, Rusko
* Juhovýchodná Európa – Srbsko, Chorvátsko, Bulharsko, Rumunsko

== Európska únia ==
Európska únia je politicko-ekonomické zoskupenie 27 členských štátov. Vznikla v roku 1993 a je najväčším jednotným trhom na svete. Eurozóna, ktorá používa spoločnú menu euro, má 20 členov.

== Kultúra ==
Európa má mimoriadne bohaté kultúrne dedičstvo:
* Umenie – od renesančných majstrov po modernizmus
* Hudba – klasická hudba, opera, jazz, pop
* Literatúra – od Homéra po modernú prózu
* Architekt��ra – románsky, gotický, barokový, modernistický štýl`,
    links: ['Európska únia', 'Slovensko', 'Nemecko', 'Francúzsko', 'Taliansko', 'Grécko', 'Rímska ríša', 'Alpy'],
    categories: ['Svetadiely', 'Európa', 'Geografia'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Europe_orthographic_Caucasus_Urals_boundary_%28with_calculation%29.svg/250px-Europe_orthographic_Caucasus_Urals_boundary_%28with_calculation%29.svg.png'
  },
  'dunaj': {
    title: 'Dunaj',
    excerpt: 'je druhá najdlhšia rieka v Európe, ktorá preteká cez 10 krajín od Nemecka po Čierne more.',
    content: `Dunaj (nemecky Donau, maďarsky Duna, srbsky Дунав/Dunav) je druhá najdlhšia rieka v Európe po Volge. S dĺžkou 2 850 km preteká alebo tvorí hranicu s desiatimi krajinami – Nemeckom, Rakúskom, Slovenskom, Maďarskom, Chorvátskom, Srbskom, Bulharskom, Rumunskom, Moldavskom a Ukrajinou.

== Geografické údaje ==

=== Prameň a ústie ===
Dunaj vzniká sútokom dvoch malých riek – Brigy a Bregy – pri meste Donaueschingen v pohorí Čierny les v juhozápadnom Nemecku. Vlieva sa do Čierneho mora rozsiahbou deltou na území Rumunska a Ukrajiny.

=== Povodie ===
Povodie Dunaja pokrýva približne 817 000 km², čo je druhé najväčšie povodie v Európe. Zahŕňa časti 19 krajín. Hlavné prítoky sú Inn, Morava, Dráva, Tisa a Sáva.

== Úseky rieky ==

=== Horný Dunaj ===
Od prameňa po Devín (sútok s Moravou). Rieka preteká cez Nemecko a Rakúsko, obteká mestá Ulm, Regensburg, Passau, Linz a Viedeň.

=== Stredný Dunaj ===
Od Devína po Železné vráta. Dunaj preteká cez Bratislavu, Budapešť a Belehrad. V tomto úseku rieka tvorí časť hraníc medzi Slovenskom a Maďarskom.

=== Dolný Dunaj ===
Od Železných vrát po Čierne more. Rieka preteká cez Bulharsko a Rumunsko a na konci sa rozvetvuje do delty.

== História ==
Dunaj bol od staroveku dôležitou obchodnou cestou a hranicou. Rimania ho nazývali Danubius a Ister. Tvoril severnú hranicu Rímskej ríše (limes Romanus). V stredoveku bol kľúčovou dopravnou tepnou pre obchod medzi východom a západom.

== Významné mestá na Dunaji ==
* Ulm, Regensburg, Passau (Nemecko)
* Linz, Viedeň (Rakúsko)
* Bratislava (Slovensko)
* Budapešť (Maďarsko)
* Belehrad (Srbsko)
* Bukurešť (blízko Dunaja, Rumunsko)

== Dunaj na Slovensku ==
Dunaj tvorí 172 km slovenských hraníc. V Bratislave preteká priamo mestom. Medzi Bratislavou a Komárnom vytvára rozsiahlu inundačnú oblasť s ramenami a ostrovmi (Žitný ostrov – najväčší riečny ostrov v Európe). Gabčíkovo-nagymarosská vodná elektráreň je veľké vodné dielo na Dunaji.`,
    links: ['Slovensko', 'Bratislava', 'Rakúsko', 'Maďarsko', 'Budapešť', 'Viedeň', 'Čierne more', 'Žitný ostrov'],
    categories: ['Rieky v Európe', 'Dunaj', 'Geografia'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Donau_map.png/300px-Donau_map.png'
  },
  'tatry': {
    title: 'Tatry',
    excerpt: 'sú najvyššie pohorie Karpát a celej strednej Európy, ležiace na hranici Slovenska a Poľska.',
    content: `Tatry sú najvyššie pohorie Karpát a zároveň celej strednej Európy. Nachádzajú sa na hranici Slovenska a Poľska a tvoria prirodzenú hranicu medzi oboma krajinami. Tatry sú súčasťou vnútorných Západných Karpát.

== Rozdelenie ==
Tatry sa delia na niekoľko častí:

=== Vysoké Tatry ===
Vysoké Tatry sú najvyššou časťou Tatier. Najvyšším vrcholom je Gerlachovský štít (2 655 m n. m.), čo je zároveň najvyšší bod Slovenska a celých Karpát. Ďalšie významné štíty sú Lomnický štít (2 634 m), Ľadový štít (2 627 m) a Rysy (2 499 m – najvyšší bod Poľska).

=== Západné Tatry ===
Západné Tatry sú rozsiahlejšie, ale nižšie ako Vysoké Tatry. Najvyšším vrcholom je Bystrá (2 248 m). Charakteristické sú alpínske lúky, doliny a prírodné krásy.

=== Belianske Tatry ===
Belianske Tatry sú menšia skupina na východe, známa najmä Beliansou jaskyňou. Najvyšším vrcholom je Havran (2 152 m).

== Geografia ==

=== Ľadovcové formy ===
Tatry boli v pleistocéne pokryté ľadovcami, ktoré vytvorili charakteristický alpínsky reliéf:
* Kary (kotly) – amfiteátrovité depresie na svahoch
* Plesá – ľadovcové jazerá v karoch
* Morény – ľadovcové sutiny
* Štíty a hrebene

=== Plesá ===
V Tatrách sa nachádza približne 100 plies. Najväčším je Veľké Hincovo pleso (20,08 ha). Ďalšie známe plesá sú Štrbské pleso, Popradské pleso a Zelené pleso.

=== Doliny ===
Významné doliny zahŕňajú Mengusovskú dolinu, Malú Studenú dolinu, Veľkú Studenú dolinu a Bielovodskú dolinu.

== Fauna a flóra ==

=== Rastlinstvo ===
Vegetácia v Tatrách má výškový stupňovitý charakter:
* Montánny stupeň (do 1 250 m) – lesy, najmä smrek
* Subalpínsky stupeň (1 250-1 550 m) – kosodrevina
* Alpínsky stupeň (1 550-2 300 m) – alpínske lúky, skalné pustiny
* Subniválny stupeň (nad 2 300 m) – lišajníky, machy

=== Živočíšstvo ===
V Tatrách žijú kamzíky, svište, medvede, vlky, rysy a orly skalné. Tatranský kamzík je endemický poddruh.

== Ochrana prírody ==
Tatranský národný park (TANAP) bol založený v roku 1949 ako prvý národný park v Československu. Na poľskej strane je Tatrzański Park Narodowy (1954). Obe chránené územia sú súčasťou Biosférickej rezervácie UNESCO.

== Turizmus ==
Tatry sú najnavštevovanejším slovenským pohorím s vynikajúcou turistickou infraštruktúrou:
* Lyžiarske strediská – Štrbské Pleso, Tatranská Lomnica, Jasná
* Lanové dráhy – na Lomnický štít, Skalnaté pleso
* Turistické chodníky – sieť značených trás
* Horské chaty – Chata pri Zelenom plese, Téryho chata`,
    links: ['Slovensko', 'Poľsko', 'Karpaty', 'Gerlachovský štít', 'Štrbské Pleso', 'Vysoké Tatry', 'Tatranský národný park', 'Lomnický štít'],
    categories: ['Pohoria na Slovensku', 'Karpaty', 'Tatry'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Krivan_from_Strbske_Pleso.jpg/280px-Krivan_from_Strbske_Pleso.jpg'
  },
  'velka-morava': {
    title: 'Veľká Morava',
    excerpt: 'bola prvá významná slovanská ríša v strednej Európe, existujúca v 9. storočí na území dnešného Slovenska, Česka a Maďarska.',
    content: `Veľká Morava (latinsky Magna Moravia) bola prvá významná slovanská ríša v strednej Európe. Existovala približne od roku 833 do začiatku 10. storočia na území dnešného Slovenska, Česka, Maďarska a časti Poľska. Bola kľúčová pre formovanie slovanskej kultúry a vzdelanosti.

== Vznik a územie ==
Veľká Morava vznikla v roku 833 spojením Moravského a Nitrianskeho kniežatstva. Moravské knieža Mojmír I. zjednotil tieto územia a vytvoril základ budúcej ríše. Hlavnými centrami boli Mikulčice, Staré Město u Uherského Hradiště, Nitra a Devín.

== Vládcovia ==

=== Mojmír I. (833-846) ===
Zakladateľ dynastie Mojmírovcov, zjednotil Moravské a Nitrianske kniežatstvo.

=== Rastislav (846-870) ===
Za jeho vlády dosiahla Veľká Morava kultúrny rozkvet. V roku 863 pozval byzantských vierozvestcov Konštantína (Cyrila) a Metoda, ktorí priniesli písomníctvo a kresťanstvo v slovanskom jazyku.

=== Svätopluk (870-894) ===
Najvýznamnejší veľkomoravský panovník. Za jeho vlády dosiahla ríša najväčší územný rozsah, zahŕňajúc okrem jadra aj Čechy, Lužicu, Sliezsko, Panóniu a časti Poľska. Svätopluk bol korunovaný za kráľa pápežom.

=== Mojmír II. (894-906?) ===
Posledný významný panovník. Po jeho smrti ríša čelila vnútorným konfliktom a útokom Maďarov.

== Cyrilometodská misia ==

=== Príchod Cyrila a Metoda ===
V roku 863 prišli na pozvanie kniežaťa Rastislava solúnski bratia Konštantín (neskôr Cyril) a Metod. Ich cieľom bolo šíriť kresťanstvo v slovanskom jazyku, čím sa ríša mala oslobodiť od franského vplyvu.

=== Hlaholika a staroslovienčina ===
Konštantín vytvoril pre potreby misie nové písmo – hlaholiku – a preložil do staroslovienčiny liturgické texty. Staroslovienčina sa stala prvým literárnym jazykom Slovanov.

=== Cirkevná organizácia ===
V roku 869 bol Metod vysvätený za arcibiskupa s jurisdikciou nad Veľkou Moravou a Panóniou. Vznikla tak nezávislá slovanská cirkevná provincia.

== Zánik ==
Po smrti Svätopluka v roku 894 sa ríša rozpadla na niekoľko častí. Vpády maďarských kmeňov na začiatku 10. storočia definitívne ukončili existenciu Veľkej Moravy. Bitka pri Bratislave v roku 907 je považovaná za symbolický koniec ríše.

== Dedičstvo ==
Veľká Morava zanechala trvalé dedičstvo:
* Slovanská písomnosť a literatúra
* Tradícia kresťanstva v slovanskom jazyku
* Archeologické pamiatky (Mikulčice, Devín, Nitra)
* Symbol slovanskej jednoty a štátnosti

Cyril a Metod sú uctievaní ako svätí a sú spolupatróni Európy. 5. júl, deň ich príchodu na Veľkú Moravu, je štátnym sviatkom na Slovensku i v Česku.`,
    links: ['Slovensko', 'Cyril a Metod', 'Svätopluk', 'Nitra', 'Hlaholika', 'Staroslovienčina', 'Stredovek', 'Mojmír I.'],
    categories: ['História Slovenska', 'Stredoveké štáty', 'Slovanské dejiny'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Great_Moravia_under_Svatopluk_I.svg/280px-Great_Moravia_under_Svatopluk_I.svg.png'
  },
  'druhа-svetova-vojna': {
    title: 'Druhá svetová vojna',
    excerpt: 'bol globálny vojenský konflikt v rokoch 1939–1945, najničivejšia vojna v dejinách ľudstva s viac ako 70 miliónmi obetí.',
    content: `Druhá svetová vojna (1939–1945) bola globálny vojenský konflikt, do ktorého sa zapojila väčšina svetových veľmocí vrátane všetkých veľkých mocností, pričom vytvorili dve protichodné vojenské aliancie: Spojencov a sily Osi. Bola to najničivejšia vojna v dejinách ľudstva.

== Príčiny ==
Vojna mala dlhodobé a bezprostredné príčiny. Mierová zmluva z Versailles (1919) uložila Nemecku ťažké podmienky, čo viedlo k hospodárskej kríze a politickej nestabilite. Vzostup fašizmu v Taliansku (Mussolini) a nacizmu v Nemecku (Hitler) vytvoril agresívne totalitné režimy. Politika uzmierenia zo strany Francúzska a Británie umožnila nacistickému Nemecku postupnú expanziu.

== Priebeh vojny ==

=== Začiatok (1939) ===
Vojna sa začala 1. septembra 1939 nemeckým útokom na Poľsko. Nemecko aplikovalo novú vojenskú taktiku – Blitzkrieg (blesková vojna) – kombináciu tankov, motorizovanej pechoty a leteckej podpory. Poľsko kapitulovala po 5 týždňoch. Británia a Francúzsko vypovedali vojnu Nemecku.

=== Expanzia Nemecka (1940–1941) ===
V roku 1940 Nemecko obsadilo Dánsko, Nórsko, Benelux a Francúzsko. Bitka o Britániu (leto 1940) bola prvou veľkou leteckou bitkou v dejinách. Nemecku sa nepodarilo zlomiť britský odpor. V roku 1941 Nemecko zaútočilo na Sovietsky zväz (operácia Barbarossa).

=== Zlom vo vojne (1942–1943) ===
Bitka pri Stalingrade (1942–1943) bola zlomovým bodom na východnom fronte. Sovietska armáda obkľúčila a zničila nemeckú 6. armádu. Na severnoafrickom fronte Spojenci porazili Rommelove sily.

=== Víťazstvo Spojencov (1944–1945) ===
Vylodenie v Normandii (D-Day, 6. júna 1944) otvorilo druhý front v západnej Európe. Sovietska armáda postupovala zo východu. 8. mája 1945 Nemecko kapitulovalo. 2. septembra 1945 kapitulovalo Japonsko po zvrhnutí atómových bômb na Hirošimu a Nagasaki.

== Holocaust ==
Nacistický režim systematicky vyvražďoval Židov a iné skupiny. V koncentračných a vyhladzovacích táboroch (Auschwitz, Treblinka, Sobibor) zahynulo asi 6 miliónov Židov a milióny ďalších obetí.

== Následky ==
Vojna si vyžiadala 70–85 miliónov obetí. Vznikla Organizácia Spojených národov. Začala sa studená vojna medzi USA a ZSSR. Európa bola rozdelená na západný a východný blok.`,
    links: ['Adolf Hitler', 'Sovietsky zväz', 'Spojené štáty americké', 'Holocaust', 'Blitzkrieg', 'Normandia', 'Stalingrad', 'Poľsko'],
    categories: ['Svetové vojny', 'História 20. storočia', 'Vojenská história'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bundesarchiv_Bild_146-1971-070-61%2C_Russland%2C_Panzer_VI_%28Tiger_I%29.jpg/280px-Bundesarchiv_Bild_146-1971-070-61%2C_Russland%2C_Panzer_VI_%28Tiger_I%29.jpg'
  },
  'rim': {
    title: 'Rím',
    excerpt: 'je hlavné mesto Talianska a jedno z najstarších miest sveta, nazývané Večné mesto, s históriou siahajúcou viac ako 2700 rokov.',
    content: `Rím (taliansky Roma) je hlavné a najväčšie mesto Talianska a hlavné mesto Lazia. S počtom obyvateľov presahujúcim 2,8 milióna (v metropolitnej oblasti viac ako 4 milióny) je tretím najľudnatejším mestom v EÚ. Rím je nazývaný Večné mesto a patrí medzi najvýznamnejšie historické a kultúrne centrá sveta.

== História ==

=== Staroveký Rím ===
Podľa tradície bol Rím založený v roku 753 pred n. l. Romulom a Remom. Rímska republika (509–27 pred n. l.) expandovala po celom Stredomorí. Rímska ríša (27 pred n. l. – 476 n. l.) bola jednou z najväčších ríší staroveký, ovládajúca väčšinu Európy, severnej Afriky a Blízkeho východu.

=== Stredovek a renesancia ===
Po páde Západorímskej ríše sa Rím stal centrom kresťanstva a sídlom pápeža. Pápežský štát existoval od 8. storočia do roku 1870. Renesancia priniesla mimoriadny umelecký rozvoj – Michelangelo, Rafael a mnohí ďalší umelci zanechali v Ríme nesmrteľné diela.

== Pamiatky ==

=== Koloseum ===
Koloseum (Amphitheatrum Flavium) je eliptická amfiteátrum postavená v rokoch 70–80 n. l. Poňalo až 80 000 divákov a slúžilo na gladiátorské zápasy a verejné podujatia. Je symbolom Ríma a jedným z najznámejších stavieb sveta.

=== Fórum Romanum ===
Fórum Romanum bolo centrom politického, náboženského a obchodného života starovekého Ríma. Dnes sú viditeľné ruiny chrámov, bazilík a triumfálnych oblúkov.

=== Vatikán ===
Vatikánsky mestský štát je nezávislý štát obklopený Rímom, sídlo pápeža a Katolíckej cirkvi. Bazilika svätého Petra a Sixtínska kaplnka s Michelangelovým stropom patria k najnavštevovanejším miestam sveta.

=== Panteón ===
Panteón je starorímsky chrám, neskôr kresťanský kostol, postavený cisárom Hadriánom okolo roku 125 n. l. Je pozoruhodný svojou kopulou s otvorom (oculus) v strede.

== Kultúra a umenie ==
Rím je bohatý na múzeá, galérie a umelecké poklady. Galéria Borghese, Kapitolské múzeá a vatikánske múzeá uchovávajú neoceniteľné zbierky.`,
    links: ['Taliansko', 'Rímska ríša', 'Vatikán', 'Koloseum', 'Michelangelo', 'Stredozemné more', 'Renesancia', 'Pápež'],
    categories: ['Hlavné mestá v Európe', 'Mestá v Taliansku', 'Historické mestá'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/280px-Colosseo_2020.jpg'
  },
  'klimaticka-zmena': {
    title: 'Klimatická zmena',
    excerpt: 'je dlhodobá zmena priemerných poveternostných podmienok na Zemi, ktorú v súčasnosti urýchľuje ľudská činnosť a spaľovanie fosílnych palív.',
    content: `Klimatická zmena označuje dlhodobé zmeny priemerných teplôt a typických poveternostných podmienok na Zemi. Hoci klimatické zmeny sú prirodzeným javom, od 19. storočia sú primárnou príčinou zmeny ľudské aktivity, najmä spaľovanie fosílnych palív.

== Príčiny ==

=== Skleníkový efekt ===
Skleníkové plyny (CO₂, metán, oxid dusný) zadržiavajú teplo v atmosfére. Od priemyselnej revolúcie sa koncentrácia CO₂ zvýšila z 280 ppm na viac ako 420 ppm (2023). Hlavnými zdrojmi emisií sú energetika, doprava, priemysel a poľnohospodárstvo.

=== Odlesňovanie ===
Lesy pohlcujú CO₂ z atmosféry. Ničenie tropických pralesov (Amazónia, Kongo) znižuje kapacitu Zeme absorbovať uhlík.

== Dôsledky ==

=== Otepľovanie ===
Priemerná globálna teplota sa od priemyselnej revolúcie zvýšila o asi 1,1°C. Vedci predpokladajú ďalší nárast o 1,5–4°C do konca storočia v závislosti od emisií.

=== Extrémne počasie ===
Klimatická zmena zvyšuje frekvenciu a intenzitu extrémnych poveternostných javov: povodní, sucha, hurikánov, vĺn horúčav a lesných požiarov.

=== Topenie ľadovcov a stúpanie morí ===
Arktický ľad sa topí rekordnou rýchlosťou. Hladina morí sa od roku 1900 zdvihla o 20 cm a stúpa čoraz rýchlejšie, čo ohrozuje pobrežné oblasti.

=== Biodiverzita ===
Zmena klímy ohrozuje mnohé druhy rastlín a živočíchov, mení ich biotopy a fenológiu. Korálové útesy bielejú a hynú v dôsledku otepľovania morí.

== Medzinárodné dohody ==
Parížska dohoda (2015) zaviazala krajiny udržať nárast teploty pod 2°C a usilovať sa o limit 1,5°C. Kjótsky protokol (1997) bol prvou záväznou dohodou o znižovaní emisií.

== Riešenia ==
* Prechod na obnoviteľné zdroje energie (solar, vietor)
* Elektromobilita a udržateľná doprava
* Energetická efektívnosť budov
* Zachytávanie uhlíka
* Zmena stravovacích návykov (menej mäsa)`,
    links: ['Skleníkový efekt', 'Parížska dohoda', 'Obnoviteľné zdroje energie', 'Odlesňovanie', 'Arktída', 'Biodiverzita', 'Emisie CO2', 'OSN'],
    categories: ['Ekológia', 'Životné prostredie', 'Klimatológia'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mauna_Loa_CO2_monthly_mean_concentration.svg/280px-Mauna_Loa_CO2_monthly_mean_concentration.svg.png'
  },
  'internet': {
    title: 'Internet',
    excerpt: 'je globálna sieť prepojených počítačových sietí, ktorá využíva štandardizované komunikačné protokoly a prepája miliardy zariadení po celom svete.',
    content: `Internet je celosvetový systém prepojených počítačových sietí, ktoré používajú štandardizovaný súbor internetových protokolov (TCP/IP) na prepojenie zariadení po celom svete. Je to sieť sietí, ktorá zahŕňa privátne, verejné, akademické, obchodné a vládne siete.

== História ==

=== ARPANET ===
Predchodcom internetu bol ARPANET, vyvinutý Ministerstvom obrany USA v 60. rokoch. Prvá správa bola odoslaná 29. októbra 1969 medzi Kalifornskou univerzitou v Los Angeles a Stanfordským výskumným ústavom.

=== World Wide Web ===
Tim Berners-Lee vynašiel World Wide Web v roku 1989 v CERN-e. Web (nie internet samotný) je systém prepojených hypertextových dokumentov prístupných cez internet. Prvý webový prehliadač Mosaic (1993) sprístupnil web širokej verejnosti.

=== Rozvoj v 90. rokoch ===
90. roky priniesli explozívny rast internetu. Vzniku veľkých spoločností ako Amazon (1994), Yahoo (1995), Google (1998) a mnohých ďalších.

== Technológia ==

=== Protokoly ===
Internet funguje na základe protokolov:
* TCP/IP – základný protokol pre prenos dát
* HTTP/HTTPS – protokol pre prenos webových stránok
* SMTP/POP3/IMAP – protokoly pre e-mail
* DNS – systém doménových mien

=== Infraštruktúra ===
Fyzickú infraštruktúru internetu tvoria podmorské a pozemné optické káble, satelitné spojenia, bezdrôtové siete (Wi-Fi, mobilné siete) a dátové centrá.

== Spoločenský dopad ==
Internet revolučne zmenil komunikáciu, obchod, vzdelávanie, zábavu a prístup k informáciám. Sociálne siete (Facebook, Twitter, Instagram) zmenili spôsob, akým ľudia interagujú. E-commerce (elektronický obchod) transformoval maloobchod.

== Bezpečnosť a súkromie ==
Kybernetická bezpečnosť je kritickou výzvou. Malware, phishing, ransomware a DDoS útoky ohrozujú jednotlivcov aj organizácie. Otázky súkromia súvisiace so zberom dát veľkými technologickými spoločnosťami vyvolávajú celosvetovú diskusiu.`,
    links: ['World Wide Web', 'Tim Berners-Lee', 'Google', 'Kybernetická bezpečnosť', 'Sociálne siete', 'E-commerce', 'TCP/IP', 'ARPANET'],
    categories: ['Informačné technológie', 'Internet', 'Telekomunikácie'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Internet_map_1024.jpg/280px-Internet_map_1024.jpg'
  },
  'evolucia': {
    title: 'Evolúcia',
    excerpt: 'je proces zmeny dedičných vlastností biologických populácií počas po sebe nasledujúcich generácií, ktorý opísal Charles Darwin teóriou prírodného výberu.',
    content: `Evolúcia (z latinského evolutio – „rozvinutie") je zmena dedičných vlastností biologickej populácie počas po sebe nasledujúcich generácií. Evolučné procesy dali vzniknúť biodiverzite na každej úrovni biologickej organizácie.

== Darwinova teória ==

=== Charles Darwin ===
Charles Darwin (1809–1882) bol britský prírodovedecký bádateľ, ktorý na základe pozorovania na plavbe na lodi Beagle (1831–1836) formuloval teóriu prírodného výberu. Svoje zistenia publikoval v prelomovom diele O pôvode druhov (1859).

=== Prírodný výber ===
Prírodný výber je mechanizmus evolúcie, pri ktorom jedince s priaznivejšími vlastnosťami (adaptáciami) majú väčšiu pravdepodobnosť prežiť a rozmnožiť sa. Tieto vlastnosti sa v populácii šíria.

Kľúčové princípy:
* Variabilita – jedince v populácii sa líšia svojimi vlastnosťami
* Dedičnosť – vlastnosti sa prenášajú z rodičov na potomkov
* Diferenciálna reprodukcia – nie všetci jedinci sa rovnako úspešne rozmnožujú
* Selekcia – prostredie uprednostňuje niektoré vlastnosti pred inými

== Genetika a evolúcia ==

=== Mutácie ===
Mutácie sú náhodné zmeny v DNA. Väčšina mutácií je neutrálna alebo škodlivá, ale niektoré poskytujú selekčnú výhodu.

=== Genetický drift ===
Genetický drift je náhodná zmena frekvencie alel v populácii, nezávislá od prirodzeného výberu. Je obzvlášť výrazná v malých populáciách.

=== Speciácia ===
Speciácia je vznik nových druhov. Môže nastať geografickou izoláciou (alopatrická speciácia) alebo v rámci tej istej oblasti (sympatrická speciácia).

== Dôkazy evolúcie ==
* Fosílny záznam – ukazuje postupné zmeny organizmov
* Porovnávacia anatómia – homológne štruktúry u rôznych druhov
* Molekulárna biológia – podobnosti v DNA
* Biogeografia – distribúcia druhov na Zemi
* Priame pozorovanie – evolúcia baktérií (antibiotická rezistencia)

== Vznik života ==
Život na Zemi vznikol pred asi 3,8 miliardami rokov. Prvé jednobunkové organizmy sa objavili v prvohorách. Mnohobunkové organizmy vznikli asi pred 600 miliónmi rokov.`,
    links: ['Charles Darwin', 'Prírodný výber', 'Genetika', 'DNA', 'Biológia', 'Paleontológia', 'Biodiverzita', 'Speciácia'],
    categories: ['Biológia', 'Evolučná biológia', 'Prírodné vedy'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Darwin_Tree_1837.png/220px-Darwin_Tree_1837.png'
  },
  'mozart': {
    title: 'Wolfgang Amadeus Mozart',
    excerpt: 'bol rakúsky skladateľ neskorého klasicizmu, považovaný za jedno z najväčších hudobných géniov všetkých čias, ktorý zložil viac ako 600 skladieb.',
    content: `Wolfgang Amadeus Mozart (27. januára 1756, Salzburg – 5. decembra 1791, Viedeň) bol rakúsky skladateľ a klavirista neskorého klasicizmu. Je všeobecne považovaný za jedného z najväčších skladateľov v histórii hudby. Napriek tomu, že zomrel vo veku len 35 rokov, zanechal obrovský hudobný odkaz.

== Detstvo a mladosť ==
Mozart sa narodil v Salzburgu ako siedme dieťa Leopolda Mozarta, dvorného hudobníka salzburského arcibiskupa. Prejavil mimoriadny hudobný talent od útleho veku – ako 4-ročný hral na klavíri, ako 5-ročný komponoval.

Jeho otec Leopold rozpoznal synov talent a od roku 1762 podnikol s Wolfgangom a dcérou Nannerl sériu hudobných ciest po európskych dvoroch. Mladý Mozart hral pred cisárovnou Máriou Teréziou vo Viedni, pred kráľom Ľudovítom XV. v Paríži a pred kráľom Jurajom III. v Londýne.

== Tvorba ==

=== Opery ===
Mozartove opery patria k vrcholom opernej literatúry:
* Le nozze di Figaro (Figarova svadba, 1786)
* Don Giovanni (1787)
* Così fan tutte (1790)
* Die Zauberflöte (Čarovná flauta, 1791)

=== Symfónie ===
Mozart skomponoval 41 symfónií. Medzi najznámejšie patria:
* Symfónia č. 40 g mol (1788)
* Symfónia č. 41 C dur Jupiterova (1788)

=== Klavírne koncerty ===
Mozart skomponoval 27 klavírnych koncertov, ktoré predstavujú vrchol tohto žánru.

=== Komorná hudba ===
Smyčcové kvartety a kvintety Mozartov patria k najpočúvanejším dielam komornej hudby.

=== Requiem ===
Mozartove Requiem d mol zostalo nedokončené. Skladateľ zomrel počas jeho komponovania a dielo dokončil jeho žiak Franz Xaver Süssmayr.

== Smrť a odkaz ==
Mozart zomrel 5. decembra 1791 vo Viedni za záhadných okolností. Doteraz nie je definitívne vysvetlená príčina jeho smrti. Bol pochovaný v spoločnom hrobe.

Mozartov vplyv na hudbu je neprekonateľný. Jeho diela sa uvádzajú na všetkých svetových scénach a patria k najhranejším v klasickom repertoári.`,
    links: ['Klasická hudba', 'Opera', 'Symfónia', 'Salzburg', 'Viedeň', 'Requiem', 'Klavírny koncert', 'Rakúsko'],
    categories: ['Rakúski skladatelia', 'Klasicizmus', 'Hudobníci 18. storočia'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Croce-Mozart-Detail.jpg/220px-Croce-Mozart-Detail.jpg'
  },
  'cina': {
    title: 'Čína',
    excerpt: 'je najľudnatejšia krajina sveta s viac ako 1,4 miliardou obyvateľov a jednou z najstarších civilizácií, s históriou sahajúcou viac ako 5000 rokov.',
    content: `Čínska ľudová republika (čínsky: 中华人民共和国) je štát vo východnej Ázii s rozlohou 9,6 milióna km² a počtom obyvateľov presahujúcim 1,4 miliardy. Je to druhá najväčšia ekonomika sveta a stála členka Bezpečnostnej rady OSN.

== Geografická poloha ==
Čína hraničí s 14 krajinami, čo je svetový rekord. Na severe susedí s Ruskom a Mongolskom, na západe s Kazachstanom, Kirgiziou, Tadžikistanom, Afganistanom a Pakistanom, na juhu s Indiou, Nepálom, Butánom, Mjanmarom, Laozom a Vietnamom, na východe s Kóreou.

== Geografické charakteristiky ==
Čína má mimoriadne rozmanité prírodné podmienky:
* Himaláje a Tibetská náhorná plošina na juhozápade (strechu sveta)
* Rovina Loesson a rieky Žltá rieka (Chuang-che) a Modra rieka (Jang-c'-ťiang) v strede
* Rôznorodé podnebie od subtropického po arktické

== Historia ==

=== Staroveká Čína ===
Čínska civilizácia patrí k najstarším na svete. Prvé čínske štáty vznikli v Žltorečnej kotline asi pred 3500 rokmi. Dynastia Čchin (221–206 pred n. l.) zjednotila Čínu a cisár Šihuangdi začal budovať Veľký čínsky múr.

=== Cisárska Čína ===
Čínske cisárstvo trvalo od roku 221 pred n. l. do roku 1912. Medzi najvýznamnejšie dynastie patrili Che, Tchang, Sung, Jüan (Mongoli), Ming a Čching (Mandžuovia).

=== Moderná Čína ===
Po páde cisárstva vznikla Čínska republika (1912). Občianska vojna medzi komunistami a nacionalistami skončila v roku 1949 víťazstvom komunistov. Mao Ce-tung vyhlásil Čínsku ľudovú republiku 1. októbra 1949.

== Kultúra ==
Čínska kultúra je jednou z najstarších a najbohatších na svete:
* Veľký čínsky múr – symbol čínskej civilizácie
* Čínska kuchyňa – jedna z najvplyvnejších kuchýň sveta
* Kung-fu, tai-či – tradičné bojové umenia
* Čínska filozofia – konfucianizmus, taoizmus, budhizmus

== Ekonomika ==
Čína má druhú najväčšiu ekonomiku sveta. Je svetovým výrobným centrom (Manufaktúra sveta). Technologické spoločnosti ako Huawei, Alibaba a Tencent sú globálnymi lídrami.`,
    links: ['Peking', 'Šanghaj', 'Veľký čínsky múr', 'Mao Ce-tung', 'Konfucianizmus', 'Himaláje', 'Jang-c-ťiang', 'Ázijská ekonomika'],
    categories: ['Štáty Ázie', 'Čína', 'Ázijské krajiny'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Great_Wall_of_China_July_2006.jpg/280px-Great_Wall_of_China_July_2006.jpg'
  },
  'voda': {
    title: 'Voda',
    excerpt: 'je chemická zlúčenina vodíka a kyslíka (H₂O), nevyhnutná pre všetky formy života, pokrývajúca asi 71 % povrchu Zeme.',
    content: `Voda (chemický vzorec H₂O) je chemická zlúčenina vodíka a kyslíka. Je nevyhnutnou podmienkou existencie života, ako ho poznáme. Pokrýva asi 71 % povrchu Zeme, prevažná väčšina (97,5 %) je slaná morská voda.

== Chemické vlastnosti ==
Voda je polárna molekula s uhlom väzby 104,5°. Táto polarita umožňuje vznik vodíkových mostíkov medzi molekulami, čo vysvetľuje mnohé nezvyčajné vlastnosti vody:
* Vysoká tepelná kapacita
* Vysoký bod varu (100°C pri 1 atm)
* Maximálna hustota pri 4°C
* Povrchové napätie
* Schopnosť rozpúšťať mnohé látky (univerzálne rozpúšťadlo)

== Skupenstvá ==
Voda existuje v troch skupenstvách:
* Tuhé – ľad (pod 0°C pri normálnom tlaku)
* Kvapalné – voda (0–100°C pri normálnom tlaku)
* Plynné – vodná para (nad 100°C pri normálnom tlaku)

Trojný bod vody (kde koexistujú všetky tri skupenstvá) je pri 0,01°C a tlaku 611,7 Pa.

== Hydrologický cyklus ==
Voda cirkuluje v biosféri prostredníctvom hydrologického cyklu:
1. Vyparovanie z povrchov oceánov, jazier a riek
2. Kondenzácia vo forme mrakov
3. Zrážky (dážď, sneh, krúpy)
4. Odtok do riek a oceánov alebo vsakovanie do pôdy

== Voda a život ==
Voda je nevyhnutná pre všetky formy života:
* Tvorí 60–70 % hmotnosti ľudského tela
* Je základným médiom pre biochemické reakcie
* Reguluje telesnú teplotu
* Transportuje živiny a odpadové produkty

== Zásoby sladkej vody ==
Iba 2,5 % vody na Zemi je sladká, pričom väčšina je uložená v ľadovcoch a podzemných zdrojoch. Prístup k čistej pitnej vode je jednou z kľúčových globálnych výziev.`,
    links: ['Hydrologický cyklus', 'Oceány', 'Pitná voda', 'Ľadovce', 'Chémia', 'Biológia', 'Ekológia', 'Klimatická zmena'],
    categories: ['Chémia', 'Hydrológia', 'Prírodné vedy'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Water_drop_impact_on_a_water-surface_-_%281%29.jpg/280px-Water_drop_impact_on_a_water-surface_-_%281%29.jpg'
  },
  'nitra': {
    title: 'Nitra',
    excerpt: 'je jedno z najstarších miest na Slovensku a v strednej Európe, historické centrum slovenského kniežatstva a sídlo prvého biskupstva na území Slovenska.',
    content: `Nitra je mesto na juhozápade Slovenska, ležiace na rieke Nitra pri pohlaví Tribeča a Zobora. S počtom obyvateľov okolo 78 000 je piatym najväčším mestom Slovenska. Nitra je považovaná za jedno z najstarších miest v strednej Európe a nesie titul Matka miest slovenských.

== História ==

=== Kniežacie obdobie ===
Nitra je miestom, kde v roku 828 bol vysvätený prvý kresťanský kostol na území dnešného Slovenska, keď bavorský kňaz Adalrám vysvätil kostol pre nitrianskeho kniežaťa Pribinu. Neskôr sa stala súčasťou Veľkej Moravy pod Svätoplukom.

=== Stredovek ===
V stredoveku bola Nitra sídlom Nitrianskeho biskupstva (jedno z najstarších v Uhorsku) a mestom s rozvinutým remeslom a obchodom. Dominantou bola Nitriansky hrad s katedrálou.

=== Moderné dejiny ===
Po vzniku Česko-Slovenska v roku 1918 sa Nitra rozvíjala ako regionálne centrum. V roku 1942 bola zaradená medzi historické mestá Slovenska.

== Geografická poloha ==
Nitra leží v Nitrianskej kotline pri sútoku Nitry a Dobrotky. Na severe sa dvíha Zobor (587 m n. m.) s benediktínskym kláštorom.

== Pamiatky ==
* Nitriansky hrad s katedrálou sv. Emeráma – dominanta mesta, jeden z najstarších stavebných komplexov na Slovensku
* Diecézne múzeum – zbierky sakrálneho umenia
* Stará radnica – renesančná stavba v centre mesta
* Piaristický kostol
* Synagóga (dnes kultúrne centrum)

== Kultúra a vzdelanosť ==
Nitra je sídlom Univerzity Konštantína Filozofa a Slovenskej poľnohospodárskej univerzity. Každoročne sa tu koná medzinárodný veľtrh Agrokomplex.

== Ekonomika ==
Ekonomiku Nitry tvorí priemysel (automobilový závod Samsung, potravinársky priemysel), poľnohospodárstvo a obchod. Región Nitra je dôležitou poľnohospodárskou oblasťou.`,
    links: ['Slovensko', 'Veľká Morava', 'Nitriansky hrad', 'Pribina', 'Svätopluk', 'Slovenská poľnohospodárska univerzita', 'Zobor', 'Stredovek'],
    categories: ['Mestá na Slovensku', 'Historické mestá', 'Nitriansky kraj'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Nitra_castle.jpg/280px-Nitra_castle.jpg'
  },
  'slnecna-sustava': {
    title: 'Slnečná sústava',
    excerpt: 'je planetárna sústava v Mliečnej ceste, v ktorej sa nachádza Zem a sedem ďalších planét obiehajúcich okolo Slnka.',
    content: `Slnečná sústava je gravitačne viazaná sústava Slnka a všetkých objektov, ktoré ho obkružujú. Zahŕňa osem planét, trpasličie planéty, prirodzené satelity, asteroidy, kométy, meteoroidy a medzihviezdny prach.

== Slnko ==
Slnko je hviezdou spektrálnej triedy G2V nachádzajúcou sa vo vzdialenstosti asi 26 000 svetelných rokov od centra Galaxie. Tvorí 99,86 % celkovej hmotnosti Slnečnej sústavy. Na povrchu má teplotu asi 5 500°C, v jadre až 15 miliónov°C. Energia sa uvoľňuje jadrovými reakciami – fúziou vodíka na hélium.

== Planéty ==

=== Kamenné planéty (vnútorné) ===
* Merkúr – najbližšia planéta k Slnku, najmenšia, extrémne teploty
* Venuša – najjasnejšia planéta nočnej oblohy, hustá atmosféra CO₂, 460°C
* Zem – jediná planéta so životom, veľký prirodzený satelit Mesiac
* Mars – Červená planéta, najvyšší sopka slnečnej sústavy (Olympus Mons)

=== Plynní obri (vonkajšie) ===
* Jupiter – najväčšia planéta, Veľká červená škvrna (búrka väčšia ako Zem)
* Saturn – planéta s početnými prstencami, nízka hustota (menšia ako voda)

=== Ľadové obri ===
* Urán – rotuje na boku, modrá farba od metánu
* Neptún – najrýchlejšie vetry v slnečnej sústave (2100 km/h)

== Trpasličie planéty ==
Pluto (objavený 1930, reklasifikovaný 2006), Ceres, Eris a ďalšie telesa.

== Asteroidy a kométy ==
Hlavný pás asteroidov sa nachádza medzi Marsom a Jupiterom. Kométy pochádzajú z Kuiperovho pásu a Oortovho oblaku.

== Vznik Slnečnej sústavy ==
Slnečná sústava vznikla asi pred 4,6 miliardami rokov z plynno-prachového oblaku. Gravitačná kontrakcia vytvorila protoslnko a protoplanetárny disk, z ktorého sa formovali planéty.`,
    links: ['Slnko', 'Zem', 'Jupiter', 'Mars', 'Saturn', 'Astronómia', 'Mliečna cesta', 'Kozmológia'],
    categories: ['Astronómia', 'Slnečná sústava', 'Prírodné vedy'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Planets2013.svg/280px-Planets2013.svg.png'
  },
  'gitara': {
    title: 'Gitara',
    excerpt: 'je strunový hudobný nástroj z čeľade lútniforiem, jeden z najpopulárnejších hudobných nástrojov na svete s históriou siahajúcou do staroveku.',
    content: `Gitara je strunový hudobný nástroj z čeľade lútniforiem. Patrí medzi najpopulárnejšie hudobné nástroje na svete a je základným nástrojom mnohých hudobných žánrov vrátane rocku, popu, flamenka, jazzu, blues, country a klasickej hudby.

== Typy gitár ==

=== Klasická gitara ===
Klasická gitara (španielska gitara) má nylónové struny a širší hmatník. Používa sa prevažne v klasickej hudbe a flamenko. Tón je mäkký a teplý.

=== Akustická gitara ===
Akustická gitara má kovové struny a menší, ale hlasnejší tón ako klasická gitara. Využíva sa v popu, rocku, country a folku.

=== Elektrická gitara ===
Elektrická gitara využíva elektromagnetické snímače (pickupy) na premenu vibrácií strún na elektrický signál, ktorý sa zosilňuje zosilňovačom. Kľúčový nástroj rocku, metalu a jazzu. Priekopníci ako Jimi Hendrix, Eric Clapton a B.B. King z nej urobili symbol populárnej kultúry.

=== Basgitara ===
Basgitara má štyri (niekedy 5 alebo 6) struny a hrá basové tóny. Je základom rytmickej sekcie väčšiny kapiel.

== Stavba gitary ==
* Telo – rezonančná skrinka z dreva
* Krk – hmatník s pražcami
* Hlava – s ladiacimi mechanikami
* Struny – nylónové alebo kovové

== Technika hry ==
* Plektrum (trsátko) – hranie skrz kovový alebo plastový plíšok
* Fingerpicking – hranie prstami
* Slide – posúvanie sklenené alebo kovové rúrky po strunách
* Bending – ohýbanie strún

== História ==
Predchodcovia gitary (lúta, oud, vihuela) existovali od staroveku. Moderná gitara sa vyvinula v Španielsku v 15.–19. storočí. Antonio Torres Jurado (1817–1892) vytvoril základ modernej klasickej gitary.`,
    links: ['Elektrická gitara', 'Klasická hudba', 'Flamenco', 'Rock', 'Blues', 'Jimi Hendrix', 'Jazz', 'Lúta'],
    categories: ['Hudobné nástroje', 'Strunové nástroje', 'Kultúra'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/GuitareClassique5.png/220px-GuitareClassique5.png'
  },
  'stredovek': {
    title: 'Stredovek',
    excerpt: 'je historické obdobie európskych dejín trvajúce od pádu Západorímskej ríše v roku 476 do konca 15. storočia, charakterizované feudalizmom a dominanciou cirkvi.',
    content: `Stredovek je historické obdobie v dejinách Európy, ktoré nasledovalo po staroveku a predchádzalo novoveku. Tradične sa vymedzuje od pádu Západorímskej ríše v roku 476 n. l. do objavenia Ameriky v roku 1492 alebo začiatku reformácie v roku 1517.

== Členenie ==

=== Raný stredovek (5.–10. storočie) ===
Obdobie sťahovania národov, vzniku barbarských kráľovstiev a šírenia kresťanstva. Karol Veľký (768–814) zjednotil väčšinu západnej Európy a r. 800 bol korunovaný za rímskeho cisára.

=== Vrcholný stredovek (11.–13. storočie) ===
Obdobie feudálneho rozkvetu, románskeho a gotického umenia, križiackych výprav a rozvoja miest. Vznik univerzít (Bologna 1088, Oxford, Sorbonne).

=== Neskorý stredovek (14.–15. storočie) ===
Mory (čierna smrť 1347–1351) zdecimovala 1/3 európskej populácie. Storočná vojna (1337–1453) medzi Anglickom a Francúzskom. Úpadok feudalizmu a počiatky renesancie.

== Spoločnosť ==

=== Feudalizmus ===
Feudalizmus bol sociálno-ekonomický systém, kde kráľ bol najvyšší pán, pod ním šľachta, rytieri a na dne potravinového reťazca nevoľníci. Pôda bola základom bohatstva a moci.

=== Cirkev ===
Katolícka cirkev dominovala európskej politike, kultúre a vzdelanosti. Pápež mal väčšiu moc ako mnohí kráľovia. Cirkev budovala katedrály, zakladala školy a klášory.

=== Rytierstvo ===
Rytier bol bojovník na koni so špeciálnym zbrojným výcvikom. Rytierska etika zahŕňala vernosť, odvahu, ochranu slabých a zbožnosť.

== Kultúra a umenie ==

=== Gotická architektúra ===
Gotický štýl (12.–15. stor.) sa vyznačoval vysokými klenutými stropmi, veľkými farebnými oknami (vitráže) a štíhlymi vežami. Katedrála Notre-Dame v Paríži je exemplárnym príkladom.

=== Illuminované rukopisy ===
Kláštorní mnísi vytvárali ozdobené rukopisy s krásnymi miniaturami a iniciálami.`,
    links: ['Feudalizmus', 'Rytierstvo', 'Karol Veľký', 'Gotika', 'Katedrála', 'Křižiacke výpravy', 'Čierna smrť', 'Renesancia'],
    categories: ['Historické epochy', 'Stredovek', 'História Európy'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bayeux_Tapestry_scene55_William_Odo_Robert.jpg/280px-Bayeux_Tapestry_scene55_William_Odo_Robert.jpg'
  },
  'vseobecna-teoria-relativity': {
    title: 'Všeobecná teória relativity',
    excerpt: 'je teória gravitácie formulovaná Albertom Einsteinom v roku 1915, ktorá opisuje gravitáciu ako zakrivenie štvorrozmerného časopriestoru.',
    content: `Všeobecná teória relativity je geometrická teória gravitácie, ktorú formuloval Albert Einstein v roku 1915. Opisuje gravitáciu nie ako silu, ale ako zakrivenie štvorrozmerného časopriestoru spôsobené hmotou a energiou.

== Základné princípy ==

=== Princíp ekvivalencie ===
Einsteinov princíp ekvivalencie hovorí, že gravitačné a inerciálne sily sú lokálne nerozoznateľné. Pozorovateľ v akcelerovanej sústave nemôže rozlíšiť zrýchlenie od gravitačného pola.

=== Zakrivenie časopriestoru ===
Einsteinove rovnice pola opisujú, ako hmota a energia zakrivujú štvorrozmerný časopriestor. Telesá sa pohybujú po geodetikách (najkratšie cesty) v zakrivenom časopriestore, čo vnímame ako gravitáciu.

== Predpovede a overenia ==

=== Precesia Merkúra ===
Newtonova mechanika nevysvetľovala anomálnu precesiu perihélia Merkúra. Einsteinova teória predpovedala presne pozorovanú hodnotu 43 oblúkových sekúnd za storočie.

=== Ohýbanie svetla ===
Gravitácia ohýba svetlo prechádzajúce blízko hmotných telies. Potvrdil to Arthur Eddington pri zatmení Slnka v roku 1919, čím Einstein získal celosvetovú slávu.

=== Gravitačné vlny ===
Einsteinova teória predpovedala existenciu gravitačných vĺn – zvlnení časopriestoru spôsobených akcelerovanými hmotami. Prvá priama detekcia bola v roku 2015 detektorom LIGO (zlúčenie dvoch čiernych dier).

=== Čierne diery ===
Schwarzschildovo riešenie Einsteinových rovníc popisuje sféricky symetrickú čiernu dieru. Prvý obraz čiernej diery bol zachytený v roku 2019 (galaxia M87).

=== Gravitačný červený posun ===
Svetlo unikajúce z gravitačného poľa stráca energiu (červená sa). Potvrdil to Pound-Rebkáov experiment v roku 1959.

== Aplikácie ==
* GPS – satelity musia korigovať relativistické efekty pre presné polohovanie
* Kozmológia – ΛCDM model vesmíru je postavený na všeobecnej teórii relativity
* Gravitačné šošovkovanie – použitie v astronómii na pozorovanie vzdialených objektov`,
    links: ['Albert Einstein', 'Špeciálna teória relativity', 'Čierne diery', 'Gravitačné vlny', 'LIGO', 'Fyzika', 'Kozmológia', 'Časopriestor'],
    categories: ['Fyzika', 'Teória relativity', 'Moderná fyzika'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Spacetime_lattice_analogy.svg/280px-Spacetime_lattice_analogy.svg.png'
  }
};

// Search articles
export function searchArticles(query: string): typeof SLOVAK_ARTICLES[string][] {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return Object.values(SLOVAK_ARTICLES).slice(0, 6);
  
  return Object.values(SLOVAK_ARTICLES).filter(article =>
    article.title.toLowerCase().includes(searchTerm) ||
    article.excerpt.toLowerCase().includes(searchTerm)
  );
}

// Get article by slug
export function getArticleBySlug(slug: string): typeof SLOVAK_ARTICLES[string] | null {
  return SLOVAK_ARTICLES[slug] || null;
}

// Get all article titles
export function getAllArticleTitles(): string[] {
  return Object.values(SLOVAK_ARTICLES).map(a => a.title);
}
