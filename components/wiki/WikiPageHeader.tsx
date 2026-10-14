"use client";

import { useEffect, useState } from 'react';
import { WikiArticleTabs } from './WikiArticleTabs';
import { WikiIcon } from './WikiIcon';
import { WikiDialog } from './WikiDialog';

interface Language { lang: string; autonym: string; langname: string; url: string; }

function ArticleActions({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [languageQuery, setLanguageQuery] = useState('');
  const [languageError, setLanguageError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    try { setSaved((JSON.parse(localStorage.getItem('wiki-reading-list') || '[]') as string[]).includes(title)); } catch { setSaved(false); }
  }, [title]);
  useEffect(() => {
    if (!showLanguages) return;
    const controller = new AbortController();
    setLanguageError(false);
    setLanguages(null);
    fetch(`/api/wikipedia/languages?title=${encodeURIComponent(title)}`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error(); return response.json(); })
      .then(data => { if (!controller.signal.aborted) setLanguages(data.languages || []); })
      .catch(() => { if (!controller.signal.aborted) setLanguageError(true); });
    return () => controller.abort();
  }, [showLanguages, title, retry]);
  const toggleSaved = () => {
    try {
      const list = JSON.parse(localStorage.getItem('wiki-reading-list') || '[]') as string[];
      localStorage.setItem('wiki-reading-list', JSON.stringify(saved ? list.filter(item => item !== title) : [...new Set([...list, title])]));
      setSaved(!saved);
    } catch { /* Storage may be unavailable in a private browser. */ }
  };
  return <>
    <nav className="wiki-article-actions" aria-label="Nástroje článku">
      <button className="wiki-icon-button wiki-language-button" onClick={() => setShowLanguages(true)} aria-label="Čítať v inom jazyku"><WikiIcon name="language" /><span className="wiki-language-button-label">Jazyky</span></button>
      <div>
        <button className="wiki-icon-button" onClick={toggleSaved} aria-label={saved ? 'Odstrániť z uložených stránok' : 'Uložiť stránku'} aria-pressed={saved}><WikiIcon name={saved ? 'bookmark' : 'bookmarkOutline'} /></button>
        <a className="wiki-icon-button" href={`https://sk.wikipedia.org/w/index.php?title=${encodeURIComponent(title)}&action=edit`} aria-label="Upraviť článok"><WikiIcon name="edit" /></a>
        <button className="wiki-icon-button" onClick={() => window.print()} aria-label="Stiahnuť ako PDF"><WikiIcon name="download" /></button>
      </div>
    </nav>
    {showLanguages && <WikiDialog title="Jazyky" onClose={() => setShowLanguages(false)}>
      <label className="wiki-language-search"><WikiIcon name="search" /><input type="search" placeholder="Hľadať jazyk" aria-label="Hľadať jazyk" value={languageQuery} onChange={event => setLanguageQuery(event.target.value)} /></label>
      {languageError ? <p>Nepodarilo sa načítať jazyky. <button className="wiki-text-button" onClick={() => setRetry(value => value + 1)}>Skúsiť znova</button></p> : languages === null ? <p role="status">Načítavajú sa jazyky…</p> : <ul className="wiki-language-list">
        {languages.filter(language => `${language.autonym} ${language.langname} ${language.lang}`.toLocaleLowerCase('sk-SK').includes(languageQuery.toLocaleLowerCase('sk-SK'))).map(language => <li key={language.lang}><a href={language.url} lang={language.lang}><strong>{language.autonym}</strong><span>{language.langname}</span></a></li>)}
        {!languages.length && <li>Tento článok zatiaľ nie je dostupný v iných jazykoch.</li>}
      </ul>}
    </WikiDialog>}
  </>;
}

export function WikiPageHeader({ title, actions = true }: { title: string; actions?: boolean }) {
  return <header className="wiki-page-header">
    <h1>{title}</h1>
    <WikiArticleTabs title={title} />
    <p className="wiki-page-tagline">Z Wikipédie, slobodnej encyklopédie</p>
    {actions && <ArticleActions title={title} />}
  </header>;
}
