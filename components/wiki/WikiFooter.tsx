"use client";

import Image from 'next/image';

interface WikiFooterProps {
  articleTitle?: string;
}

export function WikiFooter({ articleTitle }: WikiFooterProps) {
  return (
    <footer className="wiki-footer mt-6">
      {/* Gray "View edit history" bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#eaecf0] border-t border-b border-[#c8ccd1]">
        <div className="flex items-center gap-3">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="#72777d"
            className="flex-shrink-0"
          >
            <path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm0 18a8 8 0 118-8 8 8 0 01-8 8zm1-13H9v6l5 3 1-1.5-4-2.5z"/>
          </svg>
          <span 
            className="text-[#202122] text-[14px]"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            Zobraziť históriu úprav tejto stránky.
          </span>
        </div>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="#72777d"
        >
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
        </svg>
      </div>

      {/* Main footer content */}
      <div className="bg-[#eaecf0] px-4 py-6">
        {/* Wikipedia title and logos row */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#c8ccd1]">
          <h2 
            className="text-[22px] text-[#202122]"
            style={{ 
              fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif",
              fontWeight: 'normal',
              letterSpacing: '0.5px'
            }}
          >
            <span className="font-normal">W</span>
            <span style={{ fontSize: '18px' }}>IKIPÉDI</span>
            <span className="font-normal">A</span>
          </h2>
          
          <div className="flex items-center gap-3">
            {/* Wikimedia Foundation logo */}
            <a 
              href="https://wikimediafoundation.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-[50px] h-[50px] border border-[#c8ccd1] rounded bg-white p-1"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qt8qOMw3SCOa6HGsRoWGj9ZxBFcS0z.png"
                alt="Wikimedia Foundation"
                width={40}
                height={40}
                className="object-contain"
                unoptimized
              />
            </a>
            
            {/* MediaWiki logo */}
            <a 
              href="https://www.mediawiki.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-[50px] h-[50px] border border-[#c8ccd1] rounded bg-white p-1"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-opqLbZNgNuR92jAozY596fDgK15T0B.png"
                alt="MediaWiki"
                width={40}
                height={40}
                className="object-contain"
                unoptimized
              />
            </a>
          </div>
        </div>

        {/* License text */}
        <div 
          className="text-[14px] text-[#202122] mb-4 leading-relaxed"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          <span>Stránka bola vykreslená pomocou </span>
          <a 
            href="https://www.mediawiki.org/wiki/Parsoid" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#0645ad] hover:underline"
            style={{ textDecoration: 'none' }}
          >
            Parsoid
          </a>
          <span className="text-[#72777d] px-2">•</span>
        </div>
        
        <div 
          className="text-[14px] text-[#202122] mb-5 leading-relaxed"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          <span>Obsah je dostupný pod licenciou </span>
          <a 
            href="https://creativecommons.org/licenses/by-sa/4.0/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#0645ad] hover:underline"
            style={{ textDecoration: 'none' }}
          >
            CC BY-SA 4.0
            <svg 
              className="inline-block ml-0.5 mb-0.5" 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="#0645ad"
            >
              <path d="M6 1h5v5L9.5 4.5 6.5 7.5 5 6l3-3L6.5 1.5zM4 3H1v8h8V8l-1 1v2H2V4h2z"/>
            </svg>
          </a>
          <span>, pokiaľ nie je uvedené inak.</span>
        </div>

        {/* Footer links */}
        <div 
          className="text-[14px] leading-[2]"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>
            Ochrana osobných údajov
          </a>
          <span className="text-[#72777d] px-2">•</span>
          <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>
            Pravidlá správania
          </a>
          <span className="text-[#72777d] px-2">•</span>
          <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>
            Vývojári
          </a>
          <span className="text-[#72777d] px-2">•</span>
          <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>
            Štatistiky
          </a>
          <span className="text-[#72777d] px-2">•</span>
          <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>
            Vyhlásenie o cookies
          </a>
          <span className="text-[#72777d] px-2">•</span>
          <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>
            Podmienky použitia
          </a>
          <span className="text-[#72777d] px-2">•</span>
          <a href="#" className="text-[#0645ad] hover:underline" style={{ textDecoration: 'none' }}>
            Zobrazenie na počítači
          </a>
        </div>
      </div>
    </footer>
  );
}
