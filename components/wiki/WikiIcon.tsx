export function WikiIcon({ name, className = '' }: { name: string; className?: string }) {
  const source = `url("/minerva/${name}.svg")`;
  return <span className={`wiki-minerva-icon ${className}`} style={{ maskImage: source, WebkitMaskImage: source }} aria-hidden="true" />;
}
