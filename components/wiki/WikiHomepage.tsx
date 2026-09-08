"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { WikiFooter } from './WikiFooter';

interface MainPageData {
  title: string;
  html: string;
  stats: {
    articles: number;
    edits: number;
    users: number;
    activeUsers: number;
  };
}

export function WikiHomepage() {
  const router = useRouter();
  const [mainPage, setMainPage] = useState<MainPageData | null>(null);
  const [sectionsOpen, setSectionsOpen] = useState<Record<string, boolean>>({
    'otd': true,
    'featured': true,
    'dyk': true
  });

  // Živá hlavná stránka zo sk.wikipedia.org — rovnaký obsah, rovnaké sekcie
  useEffect(() => {
    let cancelled = false;
    fetch('/api/wikipedia/mainpage')
      .then(res => (res.ok ? res.json() : Promise.reject(new Error('api'))))
      .then(data => {
        if (!cancelled && data?.html) setMainPage(data);
      })
      .catch(() => {
        // Živé dáta sa nepodarilo načítať — zostane statická verzia nižšie
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Klik na interný odkaz v živej Hlavnej stránke → náš /wiki/ router
  const handleLiveClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('/wiki/') || link.hasAttribute('data-internal')) {
      e.preventDefault();
      e.stopPropagation();
      const slug = href.replace(/^\/wiki\//, '');
      if (slug) router.push(`/wiki/${slug}`);
    } else if (href.includes('wikipedia.org')) {
      // Externé odkazy na Wikipédiu tiež presmerujeme na náš klon
      e.preventDefault();
      e.stopPropagation();
      const m = href.match(/\/wiki\/([^#?]+)/);
      if (m) router.push(`/wiki/${m[1]}`);
    } else if (href.startsWith('#')) {
      e.preventDefault();
    }
  };

  // ─── ŽIVÁ HLAVNÁ STRÁNKA (presný obsah z sk.wikipedia.org) ───
  if (mainPage) {
    return (
      <div className="mw-page bg-white">
        <div className="px-4 pt-4">
          <h1
            className="text-[24px] font-normal text-[#000000] pb-1"
            style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", lineHeight: 1.2 }}
          >
            Hlavná stránka
          </h1>
        </div>
        <div
          className="wiki-article-content wiki-mainpage-content px-2 pb-4"
          style={{ color: '#202122' }}
          dangerouslySetInnerHTML={{ __html: mainPage.html }}
          onClick={handleLiveClick}
        />
        <WikiFooter />
      </div>
    );
  }

  const toggleSection = (id: string) => {
    setSectionsOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mw-page bg-white">
      {/* Page title */}
      <div className="px-4 pt-4">
        <h1 
          className="text-[24px] font-normal text-[#000000] pb-1"
          style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", lineHeight: 1.2 }}
        >
          Hlavná stránka
        </h1>
      </div>

      {/* Welcome box with left blue border - exact Wikipedia style */}
      <div className="mx-4 my-3 border-l-[3px] border-l-[#36c] pl-4 py-2">
        <p 
          className="text-[18px] text-[#202122] mb-1"
          style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", lineHeight: 1.4 }}
        >
          Vitajte vo <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Wikipédii</a>,
        </p>
        <p 
          className="text-[15px] text-[#202122] mb-3"
          style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", lineHeight: 1.4 }}
        >
          <b>slobodnej encyklopédii</b>, ktorú môže upravovať <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>každý</a>.
        </p>
        <p 
          className="text-[14px] text-[#202122]"
          style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", lineHeight: 1.5 }}
        >
          <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Slovenská verzia</a> má momentálne <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}><b>261 225</b></a> článkov.
        </p>
      </div>

      {/* Navigation links - first row */}
      <div 
        className="px-4 py-2 text-[14px]"
        style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", lineHeight: 1.6 }}
      >
        <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>O Wikipédii</a>
        <span className="text-[#54595d] px-[6px]">•</span>
        <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Príručka</a>
        <span className="text-[#54595d] px-[6px]">•</span>
        <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Pomoc</a>
      </div>

      {/* Navigation links - second row */}
      <div 
        className="px-4 pb-3 text-[14px]"
        style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", lineHeight: 1.6 }}
      >
        <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Najlepšie články</a>
        <span className="text-[#54595d] px-[6px]">•</span>
        <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Portály</a>
        <span className="text-[#54595d] px-[6px]">•</span>
        <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Kategórie</a>
        <span className="text-[#54595d] px-[6px]">•</span>
        <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>A – Z index</a>
      </div>

      {/* Gray divider line */}
      <div className="h-[3px] bg-gradient-to-r from-[#c8ccd1] via-[#c8ccd1] to-transparent mx-4 mb-2"></div>

      {/* Section: Aktuálne udalosti */}
      <section className="mw-section border-t border-[#eaecf0]">
        <div 
          className={`mw-section-header flex items-center justify-between px-4 py-[10px] bg-[#f8f9fa] border-b border-[#eaecf0] cursor-pointer select-none ${!sectionsOpen['otd'] ? 'active:bg-[#eaecf0]' : ''}`}
          onClick={() => toggleSection('otd')}
          role="button"
          tabIndex={0}
          aria-expanded={sectionsOpen['otd']}
        >
          <h2 
            className="text-[16px] font-bold text-[#202122]"
            style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", lineHeight: 1.3 }}
          >
            Aktuálne udalosti
          </h2>
          <span className={`mw-section-arrow flex text-[#72777d] transition-transform duration-200 ${!sectionsOpen['otd'] ? '-rotate-90' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
          </span>
        </div>
        {sectionsOpen['otd'] && (
          <div className="mw-section-body px-4 py-3" style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", fontSize: '14px', lineHeight: 1.6 }}>
            <figure className="mw-thumb float-right clear-right ml-3 mb-2 max-w-[120px] border border-[#eaecf0] bg-white">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/120px-Camponotus_flavomarginatus_ant.jpg"
                alt="Camponotus flavomarginatus"
                width={120}
                height={90}
                className="block w-full h-auto"
                unoptimized
              />
              <figcaption className="text-[11px] text-[#72777d] text-center py-[3px] px-[5px] bg-[#f8f9fa] border-t border-[#eaecf0]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica', 'Arial', sans-serif" }}>
                Camponotus flavomarginatus
              </figcaption>
            </figure>
            <ul className="mw-dyk-list list-none p-0 m-0">
              <li className="flex gap-[6px] items-start py-[7px] border-b border-[#eaecf0]">
                <span className="mw-dyk-bullet flex-shrink-0 text-[#72777d] text-[18px] leading-[1.3] -mt-[1px]">•</span>
                <span className="text-[#202122]"><a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Mravce</a> sú jedny z najúspešnejších organizmov na <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Zemi</a>, ktoré žijú takmer v každom prostredí.</span>
              </li>
              <li className="flex gap-[6px] items-start py-[7px] border-b border-[#eaecf0]">
                <span className="mw-dyk-bullet flex-shrink-0 text-[#72777d] text-[18px] leading-[1.3] -mt-[1px]">•</span>
                <span className="text-[#202122]">Kolónia mravcov môže obsahovať od niekoľkých desiatok až po <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>milióny jedincov</a>.</span>
              </li>
              <li className="flex gap-[6px] items-start py-[7px]">
                <span className="mw-dyk-bullet flex-shrink-0 text-[#72777d] text-[18px] leading-[1.3] -mt-[1px]">•</span>
                <span className="text-[#202122]">Komunikujú pomocou <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>feromónov</a>, zvukov a dotykov.</span>
              </li>
            </ul>
            <div style={{ clear: 'both' }}></div>
          </div>
        )}
      </section>

      {/* Section: Odporúčaný článok */}
      <section className="mw-section border-t border-[#eaecf0]">
        <div 
          className="mw-section-header flex items-center justify-between px-4 py-[10px] bg-[#f8f9fa] border-b border-[#eaecf0] cursor-pointer select-none active:bg-[#eaecf0]"
          onClick={() => toggleSection('featured')}
          role="button"
          tabIndex={0}
          aria-expanded={sectionsOpen['featured']}
        >
          <h2 
            className="text-[16px] font-bold text-[#202122]"
            style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", lineHeight: 1.3 }}
          >
            Odporúčaný článok
          </h2>
          <span className={`mw-section-arrow flex text-[#72777d] transition-transform duration-200 ${!sectionsOpen['featured'] ? '-rotate-90' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
          </span>
        </div>
        {sectionsOpen['featured'] && (
          <div className="mw-section-body px-4 py-3" style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", fontSize: '14px', lineHeight: 1.6 }}>
            <figure className="mw-thumb float-right clear-right ml-3 mb-2 max-w-[120px] border border-[#eaecf0] bg-white">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Miami_from_the_air%2C_May_2012.jpg/120px-Miami_from_the_air%2C_May_2012.jpg"
                alt="Miami, Florida"
                width={120}
                height={90}
                className="block w-full h-auto"
                unoptimized
              />
              <figcaption className="text-[11px] text-[#72777d] text-center py-[3px] px-[5px] bg-[#f8f9fa] border-t border-[#eaecf0]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica', 'Arial', sans-serif" }}>
                Miami, Florida
              </figcaption>
            </figure>
            <p className="text-[#202122] mb-[0.65em]">
              <b><a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Miami</a></b> je najväčšie <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>mesto</a> v juhovýchodnej časti <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Floridy</a> a druhé najväčšie v celom štáte. Jeho <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>metropolitná oblasť</a> sa rozkladá od močiarov <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>národného parku Everglades</a> na západe až k <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Atlantickému oceánu</a> na východe.
            </p>
            <p className="text-[#202122] mb-[0.65em]">
              Počet obyvateľov samotného mesta je 433&nbsp;136. Metropolitná oblasť má viac ako 5,2&nbsp;milióna obyvateľov, čo ju radí medzi najväčšie v <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Spojených štátoch</a>.
            </p>
            <p className="text-[#202122] mb-[0.65em]">
              Mesto je centrom celosvetového významu z pohľadu ekonomiky, dopravy, kultúry, vzdelávania, médií, umenia, zábavy a medzinárodného obchodu.
            </p>
            <a href="#" className="mw-more-link text-[13px] text-[#0645ad] hover:underline inline-block mt-[6px]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica', 'Arial', sans-serif", textDecoration: 'none' }}>celý článok…</a>
            <div className="mw-archive-links text-[12px] text-[#72777d] mt-2" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica', 'Arial', sans-serif" }}>
              <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Archív</a>
              <span className="px-1 text-[#c8ccd1]">•</span>
              <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Dobré články</a>
              <span className="px-1 text-[#c8ccd1]">•</span>
              <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Najlepšie články</a>
            </div>
            <div style={{ clear: 'both' }}></div>
          </div>
        )}
      </section>

      {/* Section: Vedeli ste, že... */}
      <section className="mw-section border-t border-[#eaecf0]">
        <div 
          className="mw-section-header flex items-center justify-between px-4 py-[10px] bg-[#f8f9fa] border-b border-[#eaecf0] cursor-pointer select-none active:bg-[#eaecf0]"
          onClick={() => toggleSection('dyk')}
          role="button"
          tabIndex={0}
          aria-expanded={sectionsOpen['dyk']}
        >
          <h2 
            className="text-[16px] font-bold text-[#202122]"
            style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", lineHeight: 1.3 }}
          >
            Vedeli ste, že...
          </h2>
          <span className={`mw-section-arrow flex text-[#72777d] transition-transform duration-200 ${!sectionsOpen['dyk'] ? '-rotate-90' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
          </span>
        </div>
        {sectionsOpen['dyk'] && (
          <div className="mw-section-body px-4 py-3" style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", fontSize: '14px', lineHeight: 1.5 }}>
            <figure className="mw-thumb float-right clear-right ml-3 mb-2 max-w-[120px] border border-[#eaecf0] bg-white">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Gangkhar_Puensum.jpg/120px-Gangkhar_Puensum.jpg"
                alt="Gangkhar Puensum"
                width={120}
                height={90}
                className="block w-full h-auto"
                unoptimized
              />
            </figure>
            <ul className="mw-dyk-list list-none p-0 m-0">
              <li className="flex gap-[6px] items-start py-[7px] border-b border-[#eaecf0]">
                <span className="mw-dyk-bullet flex-shrink-0 text-[#72777d] text-[18px] leading-[1.3] -mt-[1px]">•</span>
                <span className="text-[#202122]">...<b><a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Gangkhar Puensum</a></b> (7 570 m n. m.) je najvyšší <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>vrch</a> <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Bhutánu</a> a zároveň najvyšší nezdolaný vrch sveta?</span>
              </li>
              <li className="flex gap-[6px] items-start py-[7px] border-b border-[#eaecf0]">
                <span className="mw-dyk-bullet flex-shrink-0 text-[#72777d] text-[18px] leading-[1.3] -mt-[1px]">•</span>
                <span className="text-[#202122]">...najdlhší cestný <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>diaľničný</a> dvojrúrový <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>tunel</a> na Slovensku je v súčasnosti <b><a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>tunel Višňové</a></b> s dĺžkou 7 445 m?</span>
              </li>
              <li className="flex gap-[6px] items-start py-[7px] border-b border-[#eaecf0]">
                <span className="mw-dyk-bullet flex-shrink-0 text-[#72777d] text-[18px] leading-[1.3] -mt-[1px]">•</span>
                <span className="text-[#202122]">...medzi <b><a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>machorasty</a></b> sa zaraďujú okrem <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>machov</a> aj <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>pečeňovky</a> a <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>rožteky</a>?</span>
              </li>
              <li className="flex gap-[6px] items-start py-[7px] border-b border-[#eaecf0]">
                <span className="mw-dyk-bullet flex-shrink-0 text-[#72777d] text-[18px] leading-[1.3] -mt-[1px]">•</span>
                <span className="text-[#202122]">...francúzsky bádateľ <b><a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Jules Dumont d&apos;Urville</a></b> zahynul spoločne s <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>manželkou</a> a synom pri železničnom nešťastí v <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>Meudone</a> v roku <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>1842</a>?</span>
              </li>
              <li className="flex gap-[6px] items-start py-[7px] pb-[2px]">
                <span className="mw-dyk-bullet flex-shrink-0 text-[#72777d] text-[18px] leading-[1.3] -mt-[1px]">•</span>
                <span className="text-[#202122]">...<b><a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>136108 Haumea</a></b> je prvým transneptúnickým objektom, okolo ktorého bol objavený prstenec?</span>
              </li>
            </ul>
            <div style={{ clear: 'both' }}></div>
          </div>
        )}
      </section>

      {/* Footer */}
      <WikiFooter />
    </div>
  );
}
