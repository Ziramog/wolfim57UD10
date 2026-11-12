import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('..',import.meta.url));
const read=p=>readFileSync(join(root,p),'utf8');
const overview=read('src/components/BusinessOverview.astro');
const graphic=read('src/components/ChallengeGraphicV14.astro');
const ticker=read('src/components/ScrollVelocityV14.astro');
const hero=read('src/components/HeroV5.astro');
const home=read('src/pages/index.astro');
const translations=read('src/scripts/v7-i18n.js');

test('V14 starts clean from V12, no rejected curtain',()=>{
 assert.match(home,/<HeroV5\s*\/>/);
 assert.doesNotMatch(home,/wolfim-v13-curtain-front/);
 assert.doesNotMatch(hero,/position:sticky; top:0/);
 assert.match(hero,/height:100vh; height:100svh/);
 assert.match(hero,/1500/);
});
test('V14 360 concept illustration is original lightweight vector parallax',()=>{
 assert.match(overview,/import ChallengeGraphicV14 from/);
 assert.match(overview,/<ChallengeGraphicV14\s*\/>/);
 assert.match(overview,/wolfim-v14-challenges/);
 assert.match(graphic,/<svg class="v14-network__wires"/);
 assert.match(graphic,/data-v14-depth/);
 assert.match(graphic,/getBoundingClientRect\(\)/);
 assert.match(graphic,/requestAnimationFrame\(render\)/);
 assert.match(graphic,/IntersectionObserver/);
 assert.match(graphic,/prefers-reduced-motion: reduce/);
 assert.doesNotMatch(graphic,/from 'react'|from 'motion\/react'/);
});
test('V14 velocity headline reacts to scroll direction, pauses and respects reduced motion',()=>{
 assert.match(overview,/import ScrollVelocityV14 from/);
 assert.match(overview,/<ScrollVelocityV14\s*\/>/);
 assert.match(ticker,/data-v14-velocity/);
 assert.match(ticker,/data-v14-direction="-1"/);
 assert.match(ticker,/data-v14-direction="1"/);
 assert.match(ticker,/direction=delta>0\?1:-1/);
 assert.match(ticker,/desired=Math\.max/);
 assert.match(ticker,/document\.hidden/);
 assert.match(ticker,/IntersectionObserver/);
 assert.match(ticker,/prefers-reduced-motion: reduce/);
 assert.match(ticker,/MutationObserver/);
 assert.doesNotMatch(ticker,/from 'react'|from 'motion\/react'/);
});
test('V14 labels translated in ES and EN; no functional claims',()=>{
 for(const key of ['v14.micro','v14.graph.core','v14.graph.n1.title','v14.graph.n4.title','v14.band.brand','v14.band.growth','v14.band.alt']){
   assert.equal(translations.split('"'+key+'"').length-1,2,'missing ES/EN key '+key);
 }
 assert.match(graphic,/data-i18n="v14.graph.core"/);
 assert.match(ticker,/data-i18n="v14.band.brand"/);
 assert.match(overview,/id="desafios"/);
 assert.doesNotMatch(graphic,/integraci[oó]n implementada|software ya integrado/i);
});
