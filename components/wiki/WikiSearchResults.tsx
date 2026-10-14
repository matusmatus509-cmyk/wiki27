"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWiki } from '@/lib/wiki-context';
import { WikiPageHeader } from './WikiPageHeader';
import { WikiFooter } from './WikiFooter';
import { WikiIcon } from './WikiIcon';

interface SearchResult { title: string; slug: string; snippet: string; wordcount: number; size?: number; timestamp: string; thumbnail: string | null; }
const profiles = [{ id: 'default', label: 'Stránky s obsahom' }, { id: 'images', label: 'Multimédiá' }, { id: 'all', label: 'Všetky' }, { id: 'advanced', label: 'Pokročilé' }];
const namespaces = [{ id: '0', label: 'Článok' }, { id: '1', label: 'Diskusia' }, { id: '4', label: 'Wikipédia' }, { id: '12', label: 'Pomoc' }, { id: '14', label: 'Kategória' }];
const pageSize = 20;

export function WikiSearchResults({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const { config, activateForce } = useWiki();
  const profile = profiles.some(item => item.id === params.get('profile')) ? params.get('profile')! : 'default';
  const offset = Math.max(0, Number.parseInt(params.get('offset') || '0', 10) || 0);
  const selectedNamespaces = params.get('namespaces') || '0';
  const [query, setQuery] = useState(initialQuery);
  const [namespaceSelection, setNamespaceSelection] = useState(selectedNamespaces.split('|'));
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [pending, setLoading] = useState(Boolean(initialQuery));
  const [error, setError] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const [resultKey, setResultKey] = useState('');
  const requestKey = `${initialQuery}:${offset}:${profile}:${selectedNamespaces}:${retry}`;
  const loading = pending || (Boolean(initialQuery) && resultKey !== requestKey);

  useEffect(() => {
    setQuery(initialQuery);
    setNamespaceSelection(selectedNamespaces.split('|'));
    setResults([]); setTotalHits(0); setSuggestion(null); setError(false);
    if (!initialQuery.trim()) { setLoading(false); return; }
    const controller = new AbortController();
    setLoading(true);
    const queryParams = new URLSearchParams({ q: initialQuery, offset: String(offset), profile, namespaces: selectedNamespaces });
    fetch(`/api/wikipedia/search?${queryParams}`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error(); return response.json(); })
      .then(data => { if (!controller.signal.aborted) { setResults(data.results || []); setTotalHits(data.totalHits || 0); setSuggestion(data.suggestion || null); } })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) { setResultKey(requestKey); setLoading(false); } });
    return () => controller.abort();
  }, [initialQuery, offset, profile, selectedNamespaces, retry, requestKey]);

  const navigate = (text: string, nextProfile = profile, nextOffset = 0, ns = selectedNamespaces) => {
    const queryParams = new URLSearchParams({ q: text.trim() });
    if (nextProfile !== 'default') queryParams.set('profile', nextProfile);
    if (nextOffset) queryParams.set('offset', String(nextOffset));
    if (nextProfile === 'advanced') queryParams.set('namespaces', ns || '0');
    router.push(`/wiki/${encodeURIComponent('Špeciálne:Hľadanie')}?${queryParams}`);
  };
  const pagination = <nav className="wiki-search-pagination" aria-label="Stránky výsledkov">
    <span>{totalHits ? `${(offset + 1).toLocaleString('sk-SK')} – ${Math.min(offset + results.length, totalHits).toLocaleString('sk-SK')}` : ''}</span>
    <div><button className="wiki-secondary-button" disabled={offset === 0 || loading} onClick={() => navigate(initialQuery, profile, Math.max(0, offset - pageSize))}>Predchádzajúca</button><button className="wiki-secondary-button" disabled={offset + results.length >= totalHits || loading} onClick={() => navigate(initialQuery, profile, offset + pageSize)}>Ďalšia</button></div>
  </nav>;

  return <article className="wiki-search-results wiki-article-page">
    <div className="wiki-page-body">
      <WikiPageHeader title="Výsledky vyhľadávania" actions={false} />
      <form className="wiki-results-form" onSubmit={event => { event.preventDefault(); if (query.trim()) navigate(query, profile, 0, namespaceSelection.join('|')); }}>
        <label className="wiki-results-input"><WikiIcon name="search" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} aria-label="Hľadať na Wikipédii" placeholder="Hľadať na Wikipédii" autoFocus={!initialQuery} /></label>
        <button type="submit" className="wiki-primary-button">Hľadať</button>
      </form>
      {!loading && !error && totalHits > 0 && <p className="wiki-results-count">Výsledky <strong>{offset + 1} – {offset + results.length}</strong> z <strong>{totalHits.toLocaleString('sk-SK')}</strong></p>}
      <nav className="wiki-search-profiles" aria-label="Rozsah vyhľadávania">{profiles.map(item => <button key={item.id} className={profile === item.id ? 'selected' : ''} aria-current={profile === item.id ? 'page' : undefined} onClick={() => navigate(query, item.id)}>{item.label}</button>)}</nav>
      {profile === 'advanced' && <form className="wiki-search-namespaces" onSubmit={event => { event.preventDefault(); navigate(query, profile, 0, namespaceSelection.join('|')); }}><fieldset><legend>Hľadať v menných priestoroch</legend>{namespaces.map(item => <label key={item.id}><input type="checkbox" checked={namespaceSelection.includes(item.id)} onChange={event => setNamespaceSelection(current => event.target.checked ? [...current, item.id] : current.filter(id => id !== item.id))} />{item.label}</label>)}</fieldset><button className="wiki-secondary-button">Hľadať vo vybraných</button></form>}
      <div aria-busy={loading}>
        {loading && <p role="status" className="wiki-search-status">Načítavajú sa výsledky…</p>}
        {!loading && error && <p className="wiki-search-status">Vyhľadávanie je dočasne nedostupné. <button className="wiki-text-button" onClick={() => setRetry(value => value + 1)}>Skúsiť znova</button></p>}
        {suggestion && !loading && <p className="wiki-search-status">Mali ste na mysli <button className="wiki-text-button" onClick={() => navigate(suggestion)}>{suggestion}</button>?</p>}
        {!loading && !error && results.length > 0 && <>
          {pagination}
          <ul className="wiki-fulltext-results">{results.map(result => <li key={result.slug}>
            {result.thumbnail && <img className="wiki-result-thumbnail" src={result.thumbnail} width="80" height="60" alt="" loading="lazy" />}
            <div className="wiki-result-text"><h2><Link href={`/wiki/${encodeURIComponent(result.slug)}`} onClick={() => { if (config.forceName && !/^[^:]+:/.test(result.title)) activateForce(); }}>{result.title}</Link></h2>
              <p className="wiki-result-snippet" dangerouslySetInnerHTML={{ __html: result.snippet }} />
              <p className="wiki-result-meta">{result.wordcount.toLocaleString('sk-SK')} slov{result.size ? ` (${result.size.toLocaleString('sk-SK')} bajtov)` : ''}{result.timestamp ? ` · ${new Date(result.timestamp).toLocaleString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}` : ''}</p>
            </div>
          </li>)}</ul>
          {pagination}
        </>}
        {!loading && !error && initialQuery && !results.length && <div className="wiki-search-status"><p>Vo Wikipédii nie je žiadna stránka obsahujúca výraz <strong>{initialQuery}</strong>.</p><p>Skúste iné kľúčové slová alebo skontrolujte pravopis.</p></div>}
        {!initialQuery && !loading && <p className="wiki-search-status">Zadajte hľadaný výraz do poľa vyššie.</p>}
      </div>
    </div>
    <WikiFooter articleTitle="Špeciálne:Hľadanie" />
  </article>;
}
