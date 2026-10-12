// Use one real introductory paragraph, keeping its emphasis but removing links.
export function extractWikipediaLead(html: string, fallbackImage?: string | null): string {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const root = document.querySelector('.mw-parser-output') ?? document.body;
  const heading = root.querySelector('h2');
  const range = document.createRange();
  range.selectNodeContents(root);
  if (heading) range.setEndBefore(heading.closest('.mw-heading') ?? heading);
  const lead = document.createElement('div');
  lead.append(range.cloneContents());

  const paragraph = Array.from(lead.querySelectorAll('p')).find((element) =>
    element.textContent?.trim() && !element.closest('table, figure, .thumb, .hatnote, .metadata, .coordinates, .noprint'),
  );
  const output = document.createElement('div');
  if (paragraph) {
    const intro = paragraph.cloneNode(true) as HTMLParagraphElement;
    intro.querySelectorAll('sup.reference, .mw-editsection, script, style').forEach((element) => element.remove());
    intro.querySelectorAll('a').forEach((link) => link.replaceWith(...Array.from(link.childNodes)));
    const text = intro.textContent ?? '';
    const sentences = Array.from(new Intl.Segmenter('sk', { granularity: 'sentence' }).segment(text));
    if (sentences.length > 5) {
      const end = sentences[4].index + sentences[4].segment.length;
      const walker = document.createTreeWalker(intro, 4 /* SHOW_TEXT */);
      let offset = 0;
      let node = walker.nextNode();
      while (node) {
        const length = node.textContent?.length ?? 0;
        if (offset + length >= end) {
          const remainder = document.createRange();
          remainder.setStart(node, end - offset);
          remainder.setEnd(intro, intro.childNodes.length);
          remainder.deleteContents();
          break;
        }
        offset += length;
        node = walker.nextNode();
      }
    }
    intro.className = 'wiki-real-lead';
    output.append(intro);
  }

  // Keep article photographs from Wikipedia, without copying a long infobox.
  const images = Array.from(lead.querySelectorAll('img')).filter((image) =>
    Number(image.getAttribute('width')) >= 160 && Number(image.getAttribute('height')) >= 100,
  );
  const seen = new Set<string>();
  for (const original of images) {
    const source = original.getAttribute('src');
    if (!source || seen.has(source)) continue;
    seen.add(source);
    const figure = document.createElement('figure');
    figure.className = 'wiki-lead-image';
    const image = original.cloneNode(true) as HTMLImageElement;
    const secureUrl = (url: string) => url.replace(/^\/\//, 'https://').replace(/^http:\/\//, 'https://');
    image.src = secureUrl(source);
    image.removeAttribute('srcset');
    image.removeAttribute('style');
    image.loading = 'lazy';
    figure.append(image);
    const caption = original.closest('figure, .thumb')?.querySelector('figcaption, .thumbcaption');
    if (caption?.textContent?.trim()) {
      const text = document.createElement('figcaption');
      text.textContent = caption.textContent.trim();
      figure.append(text);
    }
    output.append(figure);
    if (seen.size === 3) break;
  }
  if (seen.size === 0 && fallbackImage) {
    const figure = document.createElement('figure');
    figure.className = 'wiki-lead-image';
    const image = document.createElement('img');
    image.src = fallbackImage.replace(/^\/\//, 'https://').replace(/^http:\/\//, 'https://');
    image.alt = paragraph?.querySelector('b, strong')?.textContent ?? '';
    image.loading = 'lazy';
    figure.append(image);
    output.append(figure);
  }
  return output.innerHTML;
}

export function formatWikipediaArticleContent(html: string, image?: string | null): string {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const root = document.querySelector('.mw-parser-output') ?? document.body;
  const heading = root.querySelector('h2');
  const body = document.createElement('div');
  if (heading) {
    const range = document.createRange();
    range.selectNodeContents(root);
    range.setStartBefore(heading.closest('.mw-heading') ?? heading);
    body.append(range.cloneContents());
  }
  return extractWikipediaLead(html, image) + body.innerHTML;
}
