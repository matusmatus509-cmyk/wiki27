"use client";

import { use } from 'react';
import { WikiProvider } from '@/lib/wiki-context';
import { WikiHeader } from '@/components/wiki/WikiHeader';
import { WikiArticle } from '@/components/wiki/WikiArticle';

export default function WikiArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

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
