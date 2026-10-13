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
  return <WikiProvider><div className={`wiki-shell ${isAdmin ? 'wiki-admin-shell' : ''}`} id="top">
    {!isAdmin && <WikiHeader />}
    <div className="wiki-layout">
      {!isAdmin && <Contents />}
      <main className="wiki-main">{children}</main>
    </div>
  </div></WikiProvider>;
}
