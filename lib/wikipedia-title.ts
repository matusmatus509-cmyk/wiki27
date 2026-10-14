// Wikipedia's piped links omit trailing disambiguators in running text.
// Keep the canonical title separately for the destination and force navigation.
export function wikipediaLinkLabel(title: string): string {
  let label = title.trim();
  while (label.endsWith(')')) {
    let depth = 0;
    let opening = -1;
    for (let i = label.length - 1; i >= 0; i--) {
      if (label[i] === ')') depth++;
      else if (label[i] === '(' && --depth === 0) { opening = i; break; }
    }
    if (opening <= 0 || !/\s/u.test(label[opening - 1])) break;
    const shorter = label.slice(0, opening).trimEnd();
    if (!shorter) break;
    label = shorter;
  }
  return label;
}
