interface WikiFooterProps { articleTitle?: string; }

export function WikiFooter({ articleTitle = 'Hlavná stránka' }: WikiFooterProps) {
  const history = `https://sk.wikipedia.org/w/index.php?title=${encodeURIComponent(articleTitle)}&action=history`;
  return <footer className="wiki-footer mt-6">
    <a className="wiki-footer-history" href={history}><span aria-hidden="true">◷</span> Zobraziť históriu úprav tejto stránky <span aria-hidden="true">›</span></a>
    <div className="wiki-footer-body">
      <p>Text je dostupný za podmienok <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike</a>; môžu platiť ďalšie podmienky. Podrobnosti nájdete na stránke <a href="https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use/sk">Podmienky používania</a>.</p>
      <nav aria-label="O Wikipédii">
        <a href="https://foundation.wikimedia.org/wiki/Policy:Privacy_policy/sk">Ochrana osobných údajov</a>
        <a href="https://sk.wikipedia.org/wiki/Wikipédia:O_Wikipédii">O Wikipédii</a>
        <a href="https://sk.wikipedia.org/wiki/Wikipédia:Vylúčenie_zodpovednosti">Vylúčenie zodpovednosti</a>
        <a href="https://foundation.wikimedia.org/wiki/Policy:Universal_Code_of_Conduct/sk">Pravidlá správania</a>
        <a href="https://developer.wikimedia.org/">Vývojári</a>
        <a href="https://stats.wikimedia.org/">Štatistiky</a>
        <a href="https://foundation.wikimedia.org/wiki/Policy:Cookie_statement">Vyhlásenie o cookies</a>
      </nav>
      <div className="wiki-footer-brands">
        <a href="https://wikimediafoundation.org/"><img src="/wikimedia-button.svg" width="120" height="40" alt="Wikimedia Foundation" /></a>
        <a href="https://www.mediawiki.org/"><img src="/mediawiki-button.svg" width="100" height="35" alt="Powered by MediaWiki" /></a>
      </div>
    </div>
  </footer>;
}
