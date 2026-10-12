// Preserve the original lead, including markup and infoboxes. A DOM range
// keeps nested MediaWiki wrappers balanced when the first section is removed.
export function extractWikipediaLead(html: string): string {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const root = document.querySelector('.mw-parser-output') ?? document.body;
  const heading = root.querySelector('h2');
  if (!heading) return root.innerHTML;

  const boundary = heading.closest('.mw-heading') ?? heading;
  const range = document.createRange();
  range.setStart(root, 0);
  range.setEndBefore(boundary);
  const container = document.createElement('div');
  container.append(range.cloneContents());
  return container.innerHTML;
}
