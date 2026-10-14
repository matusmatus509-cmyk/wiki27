"use client";

import { WikiProvider } from '@/lib/wiki-context';
import { WikiHeader } from './WikiHeader';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

function Contents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<{id:string; title:string}[]>([]);
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const update = () => setHeadings(Array.from(main.querySelectorAll('.wiki-article-content h2')).map((heading, index) => {
      if (!heading.id) heading.id = `section-${index}`;
      return {id: heading.id, title: heading.textContent?.replace(/\[.*?\]/g, '').trim() || ''};
    }));
    update();
    const observer = new MutationObserver(update);
    observer.observe(main, {childList: true, subtree: true});
    return () => observer.disconnect();
  }, [pathname]);
  return <aside className="wiki-contents"><div className="wiki-contents-heading">Obsah</div>
    <a href="#top" className="wiki-contents-start">Začiatok</a>
    {headings.map(heading => <a key={heading.id} href={`#${heading.id}`}>{heading.title}</a>)}
  </aside>;
}

export function WikiShell({ children }: {children: ReactNode}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isHome = pathname === '/';
  const [textSize, setTextSize] = useState('standard');
  const [pageWidth, setPageWidth] = useState('standard');
  const [appearanceOpen, setAppearanceOpen] = useState(true);
  return <WikiProvider><div className={`wiki-shell wiki-text-${textSize} wiki-width-${pageWidth} ${isAdmin ? 'wiki-admin-shell' : ''} ${isHome ? 'wiki-home-shell' : ''}`} id="top">
    {!isAdmin && <WikiHeader />}
    <div className="wiki-layout">
      {!isAdmin && <Contents />}
      <main className="wiki-main">{children}</main>
      {!isAdmin && <aside className="wiki-appearance" aria-label="Vzhľad">
        <div className="wiki-appearance-heading">Vzhľad <button onClick={() => setAppearanceOpen(value => !value)} aria-expanded={appearanceOpen}>{appearanceOpen ? 'skryť' : 'zobraziť'}</button></div>
        {appearanceOpen && <>
          <fieldset><legend>Text</legend>{[{ value: 'small', label: 'Malý' }, { value: 'standard', label: 'Štandardný' }, { value: 'large', label: 'Veľký' }].map(item => <label key={item.value}><input type="radio" name="wiki-text-size" value={item.value} checked={textSize === item.value} onChange={() => setTextSize(item.value)} />{item.label}</label>)}</fieldset>
          <fieldset><legend>Šírka</legend>{[{ value: 'standard', label: 'Štandardná' }, { value: 'wide', label: 'Široká' }].map(item => <label key={item.value}><input type="radio" name="wiki-page-width" value={item.value} checked={pageWidth === item.value} onChange={() => setPageWidth(item.value)} />{item.label}</label>)}</fieldset>
        </>}
      </aside>}
    </div>
  </div></WikiProvider>;
}
