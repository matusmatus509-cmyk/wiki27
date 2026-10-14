"use client";

import { useState } from 'react';
import { Dices, House, LogIn, MapPin, Search, Settings, UserRound } from 'lucide-react';
import { useWiki } from '@/lib/wiki-context';
import { WikiLoginModal } from './WikiLoginModal';
import { WikiSearch } from './WikiSearch';
import Link from 'next/link';

export function WikiHeader() {
  const [showLogin, setShowLogin] = useState(false);
  const { isAdminMode } = useWiki();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="wiki-header z-40 bg-[#eaecf0]" style={{ boxShadow: 'none' }}>
        <div className="wiki-header-inner flex items-center justify-between h-[56px] px-4">
          <button onClick={() => setMobileMenuOpen(true)} className="wiki-menu-button flex items-center justify-center w-[44px] h-[44px] -ml-2" aria-label="Otvoriť hlavné menu" aria-expanded={mobileMenuOpen}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#54595d" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>

          <Link href="/" className="wiki-brand flex items-center ml-1" aria-label="Wikipédia – hlavná stránka">
            <img className="wiki-globe" src="/wikipedia-logo.svg" width="48" height="48" alt="" />
            <span style={{fontFamily:"'Linux Libertine', 'Georgia', 'Times', serif",fontSize:'22px',fontWeight:400,color:'#54595d',letterSpacing:'0.5px'}}>
              <span style={{fontVariant:'normal',textTransform:'uppercase'}}>W</span><span style={{fontVariant:'small-caps',textTransform:'lowercase'}}>ikipédi</span><span style={{fontVariant:'normal',textTransform:'uppercase'}}>A</span>
            </span>
          </Link>

          <div className="wiki-desktop-search"><WikiSearch /></div>
          <div className="flex-1" />
          <button className="wiki-desktop-login" onClick={() => setShowLogin(true)}>Prihlásiť sa</button>
          <button onClick={() => setShowSearch(true)} className="wiki-mobile-search flex items-center justify-center w-[44px] h-[44px]" aria-label="Hľadať">
            <Search size={26} strokeWidth={2} />
          </button>
          <button onClick={() => setShowLogin(true)} className="wiki-mobile-account flex items-center justify-center w-[44px] h-[44px] -mr-2" aria-label="Prihlásiť sa">
            <UserRound size={26} strokeWidth={2} />
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
        <div className="wiki-mobile-drawer-layer fixed inset-0 z-50" role="presentation">
          <button className="wiki-mobile-drawer-backdrop absolute inset-0 bg-black/40" onClick={closeMenu} aria-label="Zavrieť menu" />
          <nav className="wiki-mobile-drawer relative h-full overflow-y-auto" aria-label="Hlavné menu">
            <div className="wiki-drawer-links">
              <Link href="/" onClick={closeMenu}><House /><span>Domov</span></Link>
              <a href="https://sk.wikipedia.org/wiki/Special:Random" onClick={closeMenu}><Dices /><span>Náhodná</span></a>
              <a href="https://sk.wikipedia.org/wiki/Špeciálne:Blízko_mňa" onClick={closeMenu}><MapPin /><span>V okolí</span></a>
            </div>

            <div className="wiki-drawer-separator" />
            <div className="wiki-drawer-links">
              <a href="https://sk.wikipedia.org/w/index.php?title=Špeciálne:Vytvoriť_účet" onClick={closeMenu}><UserRound /><span>Vytvoriť účet</span></a>
              <button onClick={() => { setShowLogin(true); closeMenu(); }}><LogIn /><span>Prihlásiť sa</span>{isAdminMode && <i />}</button>
            </div>

            <div className="wiki-drawer-separator" />
            <div className="wiki-drawer-links">
              <button onClick={() => { setShowLogin(true); closeMenu(); }}><Settings /><span>Nastavenia</span></button>
            </div>

            <section className="wiki-drawer-donation">
              <a className="wiki-drawer-donation-title" href="https://donate.wikimedia.org/?uselang=sk" onClick={closeMenu}>Podporiť teraz</a>
              <p>Ak je vám Wikipédia užitočná,<br/>prosím, darujte dnes.</p>
              <span className="wiki-donation-icon" aria-hidden="true">📦</span>
            </section>

            <footer className="wiki-drawer-footer">
              <a href="https://sk.wikipedia.org/wiki/Wikipédia:O_nás" onClick={closeMenu}>O Wikipédii</a>
              <a href="https://sk.wikipedia.org/wiki/Wikipédia:Vylúčenie_zodpovednosti" onClick={closeMenu}>Zrieknutie sa zodpovednosti</a>
            </footer>
          </nav>
        </div>
      )}

      <WikiLoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
