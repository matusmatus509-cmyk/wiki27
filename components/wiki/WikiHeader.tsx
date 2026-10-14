"use client";

import { useEffect, useRef, useState } from 'react';
import { WikiLoginModal } from './WikiLoginModal';
import { WikiSearch } from './WikiSearch';
import Link from 'next/link';

function MinervaIcon({ name }: { name: string }) {
  return <img className="wiki-minerva-icon" src={`/minerva/${name}.svg`} width="20" height="20" alt="" aria-hidden="true" />;
}

export function WikiHeader() {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const drawer = drawerRef.current;
    const items = drawer?.querySelectorAll<HTMLElement>('a, button');
    items?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
      if (event.key === 'Tab' && items?.length) {
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="wiki-header z-40 bg-[#eaecf0]" style={{ boxShadow: 'none' }}>
        <div className="wiki-header-inner flex items-center justify-between h-[56px] px-4">
          <button ref={menuButtonRef} aria-controls="wiki-main-menu" onClick={() => setMobileMenuOpen(true)} className="wiki-menu-button flex items-center justify-center w-[44px] h-[44px] -ml-2" aria-label="Otvoriť hlavné menu" aria-expanded={mobileMenuOpen}>
            <MinervaIcon name="menu" />
          </button>

          <Link href="/" className="wiki-brand flex items-center ml-1" aria-label="Wikipédia – hlavná stránka">
            <img className="wiki-globe" src="/wikipedia-logo.svg" width="48" height="48" alt="" />
            <img className="wiki-wordmark" src="/minerva/wikipedia-wordmark.svg" width="119" height="18" alt="Wikipédia" />
          </Link>

          <div className="wiki-desktop-search"><WikiSearch /></div>
          <div className="flex-1" />
          <button className="wiki-desktop-login" onClick={() => setShowLogin(true)}>Prihlásiť sa</button>
          <button onClick={() => setShowSearch(true)} className="wiki-mobile-search flex items-center justify-center w-[44px] h-[44px]" aria-label="Hľadať">
            <MinervaIcon name="search" />
          </button>
          <button onClick={() => setShowLogin(true)} className="wiki-mobile-account flex items-center justify-center w-[44px] h-[44px] -mr-2" aria-label="Prihlásiť sa">
            <MinervaIcon name="userAvatarOutline" />
          </button>
        </div>
      </header>

      {showSearch && (
        <div className="wiki-search-overlay fixed inset-0 z-50 bg-white flex flex-col" role="dialog" aria-modal="true" aria-label="Vyhľadávanie">
          <div className="flex items-center h-[56px] px-3 bg-[#eaecf0] flex-shrink-0">
            <button onClick={() => setShowSearch(false)} className="flex items-center justify-center w-[44px] h-[44px] -ml-2" aria-label="Zavrieť"><span className="text-2xl text-[#54595d]">×</span></button>
            <div className="flex-1 ml-2 mr-2"><WikiSearch fullPage onClose={() => setShowSearch(false)} /></div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="wiki-mobile-drawer-layer fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Hlavné menu">
          <button className="wiki-mobile-drawer-backdrop absolute inset-0 bg-black/40" onClick={closeMenu} aria-label="Zavrieť menu" />
          <nav ref={drawerRef} id="wiki-main-menu" className="wiki-mobile-drawer relative h-full overflow-y-auto" aria-label="Hlavné menu">
            <div className="wiki-drawer-links">
              <Link href="/" onClick={closeMenu}><MinervaIcon name="home" /><span>Domov</span></Link>
              <a href="https://sk.wikipedia.org/wiki/Special:Random" onClick={closeMenu}><MinervaIcon name="die" /><span>Náhodná</span></a>
              <a href="https://sk.wikipedia.org/wiki/Špeciálne:V_okolí" onClick={closeMenu}><MinervaIcon name="mapPin" /><span>V okolí</span></a>
            </div>

            <div className="wiki-drawer-separator" />
            <div className="wiki-drawer-links">
              <a href="https://sk.wikipedia.org/w/index.php?title=Špeciálne:Vytvoriť_účet" onClick={closeMenu}><MinervaIcon name="userAvatar" /><span>Vytvoriť účet</span></a>
              <button onClick={() => { setShowLogin(true); closeMenu(); }}><MinervaIcon name="logIn" /><span>Prihlásiť sa</span></button>
            </div>

            <div className="wiki-drawer-separator" />
            <div className="wiki-drawer-links">
              <a href="https://sk.wikipedia.org/wiki/Špeciálne:Nastavenia" onClick={closeMenu}><MinervaIcon name="settings" /><span>Nastavenia</span></a>
            </div>

            <div className="wiki-drawer-separator" />
            <a className="wiki-drawer-donation" href="https://donate.wikimedia.org/?wmf_source=donate&wmf_medium=sidebar&wmf_campaign=sk.wikipedia.org&uselang=sk&wmf_key=minerva" onClick={closeMenu}>
              <span className="wiki-drawer-donation-copy">
                <span className="wiki-drawer-donation-title">Podporiť teraz</span>
                <span className="wiki-drawer-donation-subtitle">Ak je vám Wikipédia užitočná, prosím, darujte dnes.</span>
              </span>
              <picture>
                <source srcSet="/minerva/donate.png" media="(prefers-reduced-motion: reduce)" />
                <img className="wiki-donation-image" src="/minerva/donate.gif" width="75" height="75" alt="" />
              </picture>
            </a>

            <footer className="wiki-drawer-footer">
              <a href="https://sk.wikipedia.org/wiki/Wikipédia:O" onClick={closeMenu}>O Wikipédii</a>
              <a href="https://sk.wikipedia.org/wiki/Wikipédia:Zrieknutie_sa_zodpovednosti" onClick={closeMenu}>Zrieknutie sa zodpovednosti</a>
            </footer>
          </nav>
        </div>
      )}

      <WikiLoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
