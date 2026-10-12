const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { execFileSync } = require('node:child_process');

const output = mkdtempSync(join(tmpdir(), 'wiki-force-tests-'));
execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'),
  'lib/encyclopedia-db.ts', '--outDir', output, '--module', 'commonjs',
  '--target', 'ES2020', '--skipLibCheck', '--esModuleInterop',
], { cwd: join(__dirname, '..') });
const { generateForceArticleContent, FORCE_ARTICLE_VARIANTS } = require(join(output, 'encyclopedia-db.js'));
after(() => rmSync(output, { recursive: true, force: true }));

const words = ['Albert Einstein', 'Bratislava', 'Slovensko', 'Gitara', 'Európa', 'Dunaj'];
const lead = '<p><b>Bratislava</b> je hlavné mesto Slovenska.</p>';
const generate = (variant, category = 'geography', targets = words) =>
  generateForceArticleContent('Bratislava', category, targets, { introHtml: lead, variant, seed: 'session' });

test('five distinct article structures are available in every category', () => {
  assert.equal(FORCE_ARTICLE_VARIANTS.length, 5);
  for (const category of ['geography', 'person', 'culture', 'science', 'history', 'sport', 'technology', 'nature', 'general']) {
    assert.equal(new Set(Array.from({ length: 5 }, (_, i) => generate(i, category))).size, 5, category);
  }
});

test('variants cycle after five articles', () => {
  for (let i = 0; i < 5; i++) assert.equal(generate(i), generate(i + 5));
});

test('real opening is preserved before all generated sections', () => {
  for (let i = 0; i < 5; i++) {
    assert.ok(generate(i).startsWith(lead));
    assert.ok(generate(i).indexOf('data-force-word') > lead.length);
  }
});

test('all force targets stay visible with their exact canonical title', () => {
  for (let i = 0; i < 5; i++) {
    const html = generate(i);
    for (const word of words) assert.ok(html.includes(`data-force-word="${word}"`));
    assert.ok(html.includes('/wiki/Albert_Einstein'));
    assert.ok(!html.includes('display:none'));
    assert.ok(!html.includes('Vydavateľstvo SAV, 2023'));
  }
});

test('short candidate lists do not lose targets', () => {
  for (let count = 0; count < 5; count++) {
    const html = generate(0, 'general', words.slice(0, count));
    for (const word of words.slice(0, count)) assert.ok(html.includes(`data-force-word="${word}"`));
  }
});

test('repeated rendering is stable and HTML attributes are escaped', () => {
  assert.equal(generate(2), generate(2));
  const html = generateForceArticleContent('A < B', 'general', ['A "quoted" title'], { introHtml: lead });
  assert.ok(html.includes('data-force-word="A &quot;quoted&quot; title"'));
  assert.ok(!html.includes('data-force-word="A "quoted"'));
});

test('only actual contextual targets enter prose; other verified titles stay in see-also', () => {
  const html = generateForceArticleContent('Bratislava', 'geography', words, {
    introHtml: lead, contextualWords: ['Slovensko', 'Dunaj'],
  });
  const prose = html.split('<h2>Pozri aj</h2>')[0];
  assert.ok(prose.includes('data-force-word="Slovensko"'));
  assert.ok(prose.includes('data-force-word="Dunaj"'));
  assert.ok(!prose.includes('data-force-word="Gitara"'));
  assert.ok(html.includes('data-force-word="Gitara"'));
});

test('a rare letter never falls back to the wrong position', () => {
  const { getForceWordsForLetter } = require(join(output, 'encyclopedia-db.js'));
  for (const position of [1, 2, 3, 4, 5, 6]) {
    assert.ok(getForceWordsForLetter('q', position, 'general', 50).every(word => Array.from(word.toLowerCase())[position - 1] === 'q'));
  }
});
