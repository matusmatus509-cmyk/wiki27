export function WikiArticleTabs({ title }: {title: string}) {
  const url = `https://sk.wikipedia.org/w/index.php?title=${encodeURIComponent(title)}`;
  return <nav className="wiki-article-tabs" aria-label="Nástroje stránky">
    <div><span className="selected">Článok</span><a href={`https://sk.wikipedia.org/wiki/Diskusia:${encodeURIComponent(title)}`}>Diskusia</a></div>
    <div><span className="selected">Čítať</span><a href={`${url}&action=edit`}>Zobraziť zdroj</a><a href={`${url}&action=history`}>Zobraziť históriu</a></div>
  </nav>;
}
