"use client";

import { WikiProvider } from '@/lib/wiki-context';
import { WikiHeader } from '@/components/wiki/WikiHeader';
import { WikiHomepage } from '@/components/wiki/WikiHomepage';

export default function Home() {
  return (
    <WikiProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <WikiHeader />
        
        <main className="flex-1">
          <WikiHomepage />
        </main>
      </div>
    </WikiProvider>
  );
}
