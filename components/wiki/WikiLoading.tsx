export function WikiLoading() {
  return <div className="wiki-loading" role="status" aria-label="Načítava sa stránka" aria-busy="true">
    <div className="wiki-loading-title" />
    <div className="wiki-loading-rule" />
    <div className="wiki-loading-line short" />
    <div className="wiki-loading-line" /><div className="wiki-loading-line" />
    <div className="wiki-loading-line medium" />
    <span className="sr-only">Načítava sa stránka…</span>
  </div>;
}
