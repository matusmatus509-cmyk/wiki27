"use client";

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface SidebarSection {
  title: string;
  links: { label: string; href: string }[];
  defaultOpen?: boolean;
}

const sections: SidebarSection[] = [
  {
    title: 'Hlavné menu',
    links: [
      { label: 'Hlavná stránka', href: '/' },
      { label: 'Náhodný článok', href: '#' },
      { label: 'Informácie o Wikipédii', href: '#' },
      { label: 'Kontakt', href: '#' },
      { label: 'Darovať', href: '#' },
    ],
    defaultOpen: true,
  },
  {
    title: 'Prispievanie',
    links: [
      { label: 'Pomoc', href: '#' },
      { label: 'Komunitný portál', href: '#' },
      { label: 'Posledné zmeny', href: '#' },
      { label: 'Nahrať súbor', href: '#' },
    ],
    defaultOpen: false,
  },
];

function SidebarSectionComponent({ section }: { section: SidebarSection }) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? false);

  return (
    <div className="border-b border-[#c8ccd1]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-[13px] text-[#202122] hover:bg-[#eaecf0] text-left transition-colors"
        style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"}}
      >
        <span className="font-medium">{section.title}</span>
        <ChevronDown className={`w-4 h-4 text-[#54595d] transition-transform ${isOpen ? '' : '-rotate-90'}`} strokeWidth={2} />
      </button>
      {isOpen && (
        <div className="pb-2">
          {section.links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline"
              style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", textDecoration: 'none'}}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function WikiSidebar() {
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <aside className="hidden lg:block w-[180px] shrink-0 bg-[#f8f9fa]" style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"}}>
      <div className="sticky top-0 max-h-screen overflow-y-auto">
        {/* Logo area spacer */}
        <div className="h-3"></div>
        
        {/* Sections */}
        {sections.map((section, index) => (
          <SidebarSectionComponent key={index} section={section} />
        ))}

        {/* Nástroje */}
        <div className="border-b border-[#c8ccd1]">
          <div className="px-3 py-2 text-[13px] font-medium text-[#202122]">Nástroje</div>
          <div className="pb-2">
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Čo odkazuje sem</Link>
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Súvisiace zmeny</Link>
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Špeciálne stránky</Link>
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Trvalý odkaz</Link>
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Informácie o stránke</Link>
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Citovať stránku</Link>
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Získať skrátenú URL</Link>
          </div>
        </div>

        {/* Tlač/export */}
        <div className="border-b border-[#c8ccd1]">
          <div className="px-3 py-2 text-[13px] font-medium text-[#202122]">Tlač/export</div>
          <div className="pb-2">
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Vytvoriť knihu</Link>
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Stiahnuť ako PDF</Link>
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Verzia na tlač</Link>
          </div>
        </div>

        {/* V iných projektoch */}
        <div className="border-b border-[#c8ccd1]">
          <div className="px-3 py-2 text-[13px] font-medium text-[#202122]">V iných projektoch</div>
          <div className="pb-2">
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Wikimedia Commons</Link>
            <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:bg-[#eaecf0] hover:underline" style={{textDecoration: 'none'}}>Položka Wikidata</Link>
          </div>
        </div>

        {/* Languages section */}
        <div className="border-b border-[#c8ccd1]">
          <button
            onClick={() => setShowLanguages(!showLanguages)}
            className="flex items-center justify-between w-full px-3 py-2 text-[13px] text-[#202122] hover:bg-[#eaecf0] text-left"
          >
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="#54595d">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm6.918 6H13.97c-.255-1.254-.632-2.376-1.124-3.318A8.044 8.044 0 0114.918 6zM10 2c.69 1.015 1.272 2.412 1.618 4H8.382c.346-1.588.928-2.985 1.618-4zm-3.846.682C5.662 3.624 5.285 4.746 5.03 6H2.082a8.044 8.044 0 013.072-3.318zM2 10c0-.69.093-1.36.258-2h3.024c-.071.654-.115 1.323-.115 2s.044 1.346.115 2H2.258A8.01 8.01 0 012 10zm.082 4h2.948c.255 1.254.632 2.376 1.124 3.318A8.044 8.044 0 013.082 14zM10 18c-.69-1.015-1.272-2.412-1.618-4h3.236c-.346 1.588-.928 2.985-1.618 4zm1.97-6H8.03c-.08-.65-.13-1.32-.13-2s.05-1.35.13-2h3.94c.08.65.13 1.32.13 2s-.05 1.35-.13 2zm.876 5.318c.492-.942.869-2.064 1.124-3.318h2.948a8.044 8.044 0 01-4.072 3.318zM14.833 12c.071-.654.115-1.323.115-2s-.044-1.346-.115-2h3.024c.165.64.258 1.31.258 2s-.093 1.36-.258 2h-3.024z"/>
              </svg>
              <span className="font-medium">Jazyky</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-[#54595d] transition-transform ${showLanguages ? '' : '-rotate-90'}`} strokeWidth={2} />
          </button>
          
          {showLanguages && (
            <div className="pb-2">
              <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:underline" style={{textDecoration: 'none'}}>English</Link>
              <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:underline" style={{textDecoration: 'none'}}>Čeština</Link>
              <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:underline" style={{textDecoration: 'none'}}>Deutsch</Link>
              <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:underline" style={{textDecoration: 'none'}}>Polski</Link>
              <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:underline" style={{textDecoration: 'none'}}>Magyar</Link>
              <Link href="#" className="block py-1 px-4 text-[13px] text-[#0645ad] hover:underline" style={{textDecoration: 'none'}}>Українська</Link>
              <Link href="#" className="block py-1 px-4 text-[12px] text-[#54595d] hover:underline" style={{textDecoration: 'none'}}>+ 298 ďalších</Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
