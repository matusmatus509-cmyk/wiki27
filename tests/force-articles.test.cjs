const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { execFileSync } = require('node:child_process');

const output = mkdtempSync(join(tmpdir(), 'wiki-force-tests-'));
execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'),
  'lib/encyclopedia-db.ts', 'lib/force-title-ranking.ts', '--outDir', output, '--module', 'commonjs',
  '--target', 'ES2020', '--skipLibCheck', '--esModuleInterop',
], { cwd: join(__dirname, '..') });
const { generateForceArticleContent, FORCE_ARTICLE_VARIANTS } = require(join(output, 'encyclopedia-db.js'));
const { wikipediaLinkLabel } = require(join(output, 'wikipedia-title.js'));
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

test('contextual priority does not exclude other force targets from prose', () => {
  const html = generateForceArticleContent('Bratislava', 'geography', words, {
    introHtml: lead, contextualWords: ['Slovensko', 'Dunaj'],
  });
  const prose = html.split('<h2>Pozri aj</h2>')[0];
  assert.ok(prose.includes('data-force-word="Slovensko"'));
  assert.ok(prose.includes('data-force-word="Dunaj"'));
  assert.ok(prose.includes('data-force-word="Gitara"'));
  assert.ok(html.includes('data-force-word="Gitara"'));
});

test('a rare letter never falls back to the wrong position', () => {
  const { getForceWordsForLetter } = require(join(output, 'encyclopedia-db.js'));
  for (const position of [1, 2, 3, 4, 5, 6]) {
    assert.ok(getForceWordsForLetter('q', position, 'general', 50).every(word => Array.from(word.toLowerCase())[position - 1] === 'q'));
  }
});


test('links are distributed through body paragraphs and see-also never exceeds three', () => {
  const targets = words.concat(Array.from({ length: 194 }, (_, i) => `Target ${i}`));
  for (const category of ['geography', 'person', 'culture', 'science', 'history', 'sport', 'technology', 'nature', 'general']) {
    for (let variant = 0; variant < 5; variant++) {
      for (const count of [0, 1, 2, 6, 10, 30, 50, 200]) {
        const selected = targets.slice(0, count);
        const html = generateForceArticleContent('Bratislava', category, selected, {
          introHtml: lead, variant, contextualWords: ['Slovensko', 'Dunaj'],
        });
        assert.ok(html.startsWith(lead));
        const [body, tail = ''] = html.split('<h2>Pozri aj</h2>');
        const tailCount = (tail.match(/data-force-word=/g) || []).length;
        assert.ok(tailCount <= 3, `${category}/${variant}/${count}: ${tailCount}`);
        assert.equal((html.match(/data-force-word=/g) || []).length, count);
        for (const word of selected) assert.ok(html.includes(`data-force-word="${word}"`));
        if (count >= 10) {
          const linkedParagraphs = (body.match(/<p>[\s\S]*?<\/p>/g) || []).filter(p => p.includes('data-force-word='));
          assert.ok(linkedParagraphs.length >= 4, `${category}/${variant}/${count}`);
          assert.ok((body.match(/data-force-word=/g) || []).length >= count - 3);
        }
      }
    }
  }
});


test('real links outrank topical vocabulary and unrelated fallback titles', () => {
  const { rankForceTitles, detectArticleCategory } = require(join(output, 'force-title-ranking.js'));
  assert.equal(detectArticleCategory('Bratislava', ['Mestá na Slovensku']), 'geography');
  assert.equal(detectArticleCategory('Mairé', ['Obce v departemente Vienne']), 'geography');
  assert.equal(detectArticleCategory('Albert Einstein', ['Fyzici', 'Narodenia v roku 1879']), 'person');
  const ranked = rankForceTitles(
    ['Gitara', 'Dejiny Bratislavy', 'Dunaj', 'Hlavné mesto'], 'Bratislava',
    ['Dunaj', 'Bratislavský kraj'], ['Mestá na Slovensku'], ['Gitara'],
  );
  assert.equal(ranked[0], 'Dunaj');
  assert.ok(ranked.indexOf('Dejiny Bratislavy') < ranked.indexOf('Gitara'));
  assert.ok(ranked.indexOf('Hlavné mesto') < ranked.indexOf('Gitara'));
  assert.equal(new Set(ranked).size, ranked.length);
});


test('new proper names retain the exact Wikipedia spelling in visible text', () => {
  const html = generateForceArticleContent('Francúzsko', 'geography', ['Argelliers', 'Mairé'], { introHtml: lead });
  assert.ok(html.includes('>Argelliers</a>'));
  assert.ok(html.includes('>Mairé</a>'));
});

test('disambiguators are omitted from visible links while canonical destinations remain intact', () => {
  const targets = ['Akt (filozofia)', 'Autonómia (filozofia)', 'Situácia (filozofia)', 'Duna (film, 2021)', 'Príklad (film (2020))'];
  for (let variant = 0; variant < 5; variant++) {
    const html = generateForceArticleContent('Filozofia', 'general', targets, { introHtml: lead, variant });
    for (const word of targets) {
      assert.ok(html.includes(`>${wikipediaLinkLabel(word)}</a>`));
      assert.ok(html.includes(`data-force-word="${word}"`));
      assert.ok(html.includes(`href="/wiki/${encodeURIComponent(word.replace(/\s+/g, '_'))}"`));
      assert.ok(!html.includes(`>${word}</a>`));
    }
  }
  assert.equal(wikipediaLinkLabel('Akt (filozofia)'), 'Akt');
  assert.equal(Array.from(wikipediaLinkLabel('Akt (filozofia)'))[5], undefined);
  assert.equal(wikipediaLinkLabel('AC/DC'), 'AC/DC');
  assert.equal(wikipediaLinkLabel('Mairé'), 'Mairé');
  assert.equal(wikipediaLinkLabel('(G)I-dle'), '(G)I-dle');
  assert.equal(wikipediaLinkLabel('Názov (časť) pokračovanie'), 'Názov (časť) pokračovanie');
  assert.equal(wikipediaLinkLabel('Názov (neuzatvorený'), 'Názov (neuzatvorený');
  assert.equal(wikipediaLinkLabel('Názov (prvý) (druhý)'), 'Názov');
});


test('dollar signs in canonical titles are not interpreted as template replacements', () => {
  const patterns = ['Joey Bada$$', 'A$&B', "A$'B", 'A$`B', 'A$$B'];
  const targets = patterns.flatMap(word => Array.from({ length: 10 }, (_, i) => `${word} ${i}`));
  for (let variant = 0; variant < 5; variant++) {
    const html = generateForceArticleContent('Hudba', 'culture', targets, { introHtml: lead, variant });
    for (const word of targets) {
      const escaped = word.replace(/&/g, '&amp;').replace(/'/g, '&#039;');
      assert.ok(html.includes(`data-force-word="${escaped}"`));
      assert.ok(html.includes(`>${escaped}</a>`));
    }
  }
});
