"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WikiFooter } from './WikiFooter';

interface MainPageData {
  title: string;
  html: string;
  stats: { articles: number; edits: number; users: number; activeUsers: number };
}

export function WikiHomepage() {
  const router = useRouter();
  const [mainPage, setMainPage] = useState<MainPageData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/wikipedia/mainpage', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Wikipedia API error');
        return response.json();
      })
      .then((data) => {
        if (!data?.html) throw new Error('Missing Wikipedia content');
        setMainPage(data);
      })
      .catch((error) => {
        if (error instanceof Error && error.name !== 'AbortError') setFailed(true);
      });
    return () => controller.abort();
  }, []);

  const handleLiveClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    const match = href.match(/(?:https?:\/\/[^/]*wikipedia\.org)?\/wiki\/([^#?]+)/);
    if (match) {
      event.preventDefault();
      event.stopPropagation();
      router.push(`/wiki/${match[1]}`);
    } else if (href.startsWith('#')) {
      event.preventDefault();
    }
  };

  if (failed) {
    return (
      <main className="mw-page min-h-[70vh] bg-white px-4 py-6">
        <h1 className="border-b border-[#a2a9b1] pb-2 text-[24px] font-normal">Wikipédia</h1>
        <div className="mt-4 border border-[#a2a9b1] bg-[#f8f9fa] p-4 text-[14px]">
          Obsah slovenskej Wikipédie sa momentálne nepodarilo načítať. Skúste stránku obnoviť.
        </div>
      </main>
    );
  }

  if (!mainPage) {
    return (
      <main className="mw-page min-h-[70vh] bg-white px-4 py-5" aria-busy="true">
        <div className="animate-pulse">
          <div className="mb-5 h-8 w-52 bg-[#eaecf0]" />
          <div className="mb-3 h-28 bg-[#f8f9fa]" />
          <div className="mb-3 h-48 bg-[#eaecf0]" />
          <div className="h-48 bg-[#f8f9fa]" />
        </div>
      </main>
    );
  }

  return (
    <div className="mw-page bg-white">
      <div className="px-4 pt-4">
        <h1 className="pb-1 text-[24px] font-normal text-black" style={{ fontFamily: "'Linux Libertine', Georgia, Times, serif", lineHeight: 1.2 }}>
          {mainPage.title}
        </h1>
      </div>
      <div className="wiki-article-content wiki-mainpage-content px-3 pb-4" dangerouslySetInnerHTML={{ __html: mainPage.html }} onClick={handleLiveClick} />
      <WikiFooter />
    </div>
  );
}
