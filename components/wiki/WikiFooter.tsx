import { WikiIcon } from './WikiIcon';

interface WikiFooterProps { articleTitle?: string; lastModified?: string; }

export function WikiFooter({ articleTitle = 'Hlavná stránka', lastModified }: WikiFooterProps) {
  const history = `https://sk.wikipedia.org/w/index.php?title=${encodeURIComponent(articleTitle)}&action=history`;
  const date = lastModified ? new Date(lastModified) : null;
  const modifiedLabel = date && !Number.isNaN(date.getTime()) ? `Naposledy upravené ${date.toLocaleString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}` : 'Zobraziť históriu úprav tejto stránky';
  return <footer className="wiki-footer">
    <a className="wiki-footer-history" href={history}><WikiIcon name="history" /><span>{modifiedLabel}</span><span className="wiki-footer-chevron" aria-hidden="true">›</span></a>
    <div className="wiki-footer-body">
      <div className="wiki-footer-heading">
        <img className="wiki-footer-wordmark" src="/minerva/wikipedia-wordmark.svg" width="119" height="18" alt="Wikipédia" />
        <div className="wiki-footer-brands">
          <a href="https://www.wikimedia.org/" aria-label="Wikimedia Foundation"><picture><source media="(min-width: 500px)" srcSet="/wikimedia-button.svg" /><img src="/minerva/wikimedia.svg" width="25" height="25" alt="Wikimedia Foundation" /></picture></a>
          <a href="https://www.mediawiki.org/" aria-label="Powered by MediaWiki"><picture><source media="(min-width: 500px)" srcSet="/minerva/poweredby_mediawiki.svg" /><img src="/minerva/mediawiki_compact.svg" width="25" height="25" alt="Powered by MediaWiki" /></picture></a>
        </div>
      </div>
      <p>Text je dostupný za podmienok <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0 Unported</a>; prípadne za ďalších podmienok. Podrobnejšie informácie nájdete na stránke <a href="https://foundation.wikimedia.org/wiki/Special:MyLanguage/Policy:Terms_of_Use">Podmienky použitia</a>.</p>
      <nav aria-label="O Wikipédii">
        <a href="https://foundation.wikimedia.org/wiki/Special:MyLanguage/Policy:Privacy_policy">Ochrana osobných údajov</a>
        <a href="https://sk.wikipedia.org/wiki/Wikipédia:O">O Wikipédii</a>
        <a href="https://sk.wikipedia.org/wiki/Wikipédia:Zrieknutie_sa_zodpovednosti">Zrieknutie sa zodpovednosti</a>
        <a href="https://foundation.wikimedia.org/wiki/Special:MyLanguage/Legal:Wikimedia_Foundation_Legal_and_Safety_Contact_Information">Právní a bezpečnostní kontakt</a>
        <a href="https://foundation.wikimedia.org/wiki/Special:MyLanguage/Policy:Universal_Code_of_Conduct">Pravidlá správania</a>
        <a href="https://developer.wikimedia.org/">Vývojári</a>
        <a href="https://stats.wikimedia.org/#/sk.wikipedia.org">Štatistiky</a>
        <a href="https://foundation.wikimedia.org/wiki/Special:MyLanguage/Policy:Cookie_statement">Vyhlásenie o cookies</a>
      </nav>
    </div>
  </footer>;
}
