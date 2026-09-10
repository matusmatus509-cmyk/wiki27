// Rozšírenia slovnej zásoby.
//
// Historicky tento súbor obsahoval doplnkové zoznamy pojmov pre force trik.
// Všetky pôvodné pojmy boli overené voči skutočnej slovenskej Wikipédii
// (cez oficiálne API sk.wikipedia.org) a tie, ktoré reálny článok majú,
// boli presunuté priamo do `VOCABULARY_BY_CATEGORY` v `encyclopedia-db.ts`.
// Pojmy, ktoré neboli reálnymi názvami článkov (preklepy, vymyslené slová
// vytvorené len na doplnenie vzácnych písmen), boli odstránené, aby force
// odkazy vždy viedli na existujúci článok na Wikipédii.
//
// Tento súbor zostáva prázdny a bezpečný na import — `encyclopedia-db.ts`
// doň pridáva ešte 0 slov navyše.

import type { ArticleCategory } from './encyclopedia-db';

export const VOCABULARY_EXPANSION: Record<ArticleCategory, string[]> = {
  culture: [],
  sport: [],
  science: [],
  history: [],
  geography: [],
  person: [],
  technology: [],
  nature: [],
  general: [],
};

export const VOCABULARY_EXPANSION_2: Record<ArticleCategory, string[]> = {
  culture: [],
  sport: [],
  science: [],
  history: [],
  geography: [],
  person: [],
  technology: [],
  nature: [],
  general: [],
};
