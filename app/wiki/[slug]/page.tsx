"use client";

import { use } from 'react';
import { WikiProvider } from '@/lib/wiki-context';
import { WikiHeader } from '@/components/wiki/WikiHeader';
import { WikiArticle } from '@/components/wiki/WikiArticle';
import { WikiSearchResults } from '@/components/wiki/WikiSearchResults';

// Špeciálne stránky — rovnaké názvy ako na skutočnej Wikipédii
const SPECIAL_SEARCH = /^(špeciálne[:%Šš]*h(ľ|l)adanie|special[:_]?search)$/i;

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug).replace(/_/g, ' ');
  } catch {
    return slug.replace(/_/g, ' ');
  }
}

export default function WikiArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = use(params);
  const sp = use(searchParams);
  const q = typeof sp?.q === 'string' ? sp.q : Array.isArray(sp?.q) ? sp.q[0] : '';

  const decoded = decodeSlug(slug);

  // Špeciálne:Hľadanie — stránka výsledkov plného vyhľadávania
  if (SPECIAL_SEARCH.test(decoded)) {
    return (
      <WikiProvider>
        <div className="min-h-screen bg-white flex flex-col">
          <WikiHeader />
          <main className="flex-1">
            <WikiSearchResults initialQuery={q} />
          </main>
        </div>
      </WikiProvider>
    );
  }

  return (
    <WikiProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <WikiHeader />

        <main className="flex-1">
          <WikiArticle slug={slug} />
        </main>
      </div>
    </WikiProvider>
  );
}
