"use client";

import { useState } from 'react';
import { useWiki } from '@/lib/wiki-context';
import { WikiLoginModal } from './WikiLoginModal';
import { WikiSearch } from './WikiSearch';
import Link from 'next/link';

export function WikiHeader() {
  const [showLogin, setShowLogin] = useState(false);
  const { isAdminMode } = useWiki();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {/* Mobile header - Minerva Neue exact clone */}
      <header className="z-40 bg-[#eaecf0]" style={{ boxShadow: 'none' }}>
        <div className="flex items-center justify-between h-[48px] px-4">
          {/* Left - Hamburger menu */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-[44px] h-[44px] -ml-2"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#54595d" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>

          {/* Center - Wikipedia wordmark */}
          <Link href="/" className="flex items-center ml-1">
            <span 
              style={{
                fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif",
                fontSize: '22px',
                fontWeight: 400,
                color: '#54595d',
                letterSpacing: '0.5px'
              }}
            >
              <span style={{ fontVariant: 'normal', textTransform: 'uppercase' }}>W</span>
              <span style={{ fontVariant: 'small-caps', textTransform: 'lowercase' }}>ikipédi</span>
              <span style={{ fontVariant: 'normal', textTransform: 'uppercase' }}>A</span>
            </span>
          </Link>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Right - Search icon */}
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center justify-center w-[44px] h-[44px] -mr-2"
            aria-label="Hľadať"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#54595d" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Full-screen search overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          {/* Search header */}
          <div className="flex items-center h-[56px] px-3 bg-[#eaecf0] flex-shrink-0">
            <button
              onClick={() => setShowSearch(false)}
              className="flex items-center justify-center w-[44px] h-[44px] -ml-2"
              aria-label="Zavrieť"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#54595d" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <div className="flex-1 ml-2 mr-2">
              <WikiSearch fullPage onClose={() => setShowSearch(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile slide-out menu - Minerva Neue style */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu panel */}
          <div 
            className="fixed top-0 left-0 w-[280px] h-full bg-white z-50 overflow-y-auto"
            style={{ boxShadow: '2px 0 4px rgba(0,0,0,0.15)' }}
          >
            {/* Menu header with close button */}
            <div className="flex items-center justify-between px-4 h-[48px] border-b border-[#eaecf0]">
              <span 
                className="text-[16px] text-[#202122]"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
              >
                Menu
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center justify-center w-[40px] h-[40px] -mr-2"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#54595d">
                  <path d="M4.34 2.93l12.73 12.73-1.41 1.41L2.93 4.34z"/>
                  <path d="M17.07 4.34L4.34 17.07l-1.41-1.41L15.66 2.93z"/>
                </svg>
              </button>
            </div>

            {/* Menu content */}
            <nav style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
              {/* Hlavné menu */}
              <div className="border-b border-[#eaecf0]">
                <Link 
                  href="/" 
                  className="flex items-center px-4 py-3 text-[14px] text-[#0645ad]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hlavná stránka
                </Link>
                <a href="#" className="flex items-center px-4 py-3 text-[14px] text-[#0645ad]">
                  Náhodný článok
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-[14px] text-[#0645ad]">
                  Blízko mňa
                </a>
              </div>

              {/* Prihlásiť sa */}
              <div className="border-b border-[#eaecf0]">
                <button 
                  onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}
                  className="flex items-center w-full px-4 py-3 text-[14px] text-[#0645ad] text-left relative"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="#54595d" className="mr-3">
                    <path d="M10 11c-5.92 0-8 3-8 5v3h16v-3c0-2-2.08-5-8-5z"/>
                    <circle cx="10" cy="5.5" r="4.5"/>
                  </svg>
                  Prihlásiť sa
                  {isAdminMode && (
                    <span className="absolute right-4 w-2 h-2 bg-[#d33] rounded-full"></span>
                  )}
                </button>
              </div>

              {/* Nastavenia */}
              <div className="border-b border-[#eaecf0]">
                <a href="#" className="flex items-center px-4 py-3 text-[14px] text-[#0645ad]">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="#54595d" className="mr-3">
                    <path d="M10 1l-1 3H6l2.5 2-1 3L10 7l2.5 2-1-3L14 4h-3L10 1zm0 6a3 3 0 100 6 3 3 0 000-6zm-7 3a7 7 0 1014 0 7 7 0 00-14 0z"/>
                  </svg>
                  Nastavenia
                </a>
              </div>

              {/* O Wikipédii */}
              <div className="py-2">
                <div className="px-4 py-2 text-[12px] text-[#72777d] uppercase tracking-wide">
                  O Wikipédii
                </div>
                <a href="#" className="flex items-center px-4 py-3 text-[14px] text-[#0645ad]">
                  Informácie o Wikipédii
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-[14px] text-[#0645ad]">
                  Vylúčenie zodpovednosti
                </a>
              </div>
            </nav>
          </div>
        </>
      )}

      <WikiLoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
