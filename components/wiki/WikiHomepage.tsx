"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WikiLoading } from './WikiLoading';
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
  // Živá hlavná stránka zo sk.wikipedia.org — rovnaký obsah, rovnaké sekcie
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch('/api/wikipedia/mainpage', {signal: controller.signal});
        if (!res.ok) throw new Error('mainpage');
        const data = await res.json();
        if (!data?.html) throw new Error('empty');
        if (!cancelled) setMainPage(data);
      } catch {
        if (!cancelled) timer = setTimeout(load, 4000);
      }
    };
    load();
    return () => { cancelled = true; controller.abort(); clearTimeout(timer); };
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
      document.getElementById(decodeURIComponent(href.slice(1)))?.scrollIntoView();
    }
  };

  // ─── ŽIVÁ HLAVNÁ STRÁNKA (presný obsah z sk.wikipedia.org) ───
  if (mainPage) {
    return (
      <div className="mw-page wiki-homepage bg-white">
        <h1 className="sr-only">Hlavná stránka</h1>
        <div
          className="wiki-article-content wiki-mainpage-content"
          style={{ color: '#202122' }}
          dangerouslySetInnerHTML={{ __html: mainPage.html }}
          onClick={handleLiveClick}
        />
        <WikiFooter />
      </div>
    );
  }

  return <WikiLoading />;
}
