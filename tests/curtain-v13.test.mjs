import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
const read=path=>readFileSync(join(root,path),'utf8');
const home=read('src/pages/index.astro');
const hero=read('src/components/HeroV5.astro');
const business=read('src/components/BusinessOverview.astro');
const styles=read('src/styles/global.css');
test('V13: second section is a real curtain, not a JS scroll hijack',()=>{
 assert.match(hero,/position:sticky; top:0; z-index:1/);
 assert.match(home,/<HeroV5\s*\/>[\s\S]*<main id="main-content" class="wolfim-v13-curtain-front">/);
 assert.match(styles,/#main-content\.wolfim-v13-curtain-front\s*\{[\s\S]*?z-index: 2;/);
 assert.match(business,/box-shadow:0 -18px 48px/);
 assert.match(business,/border-radius:clamp\(12px/);
 assert.doesNotMatch(home,/window\.onscroll\s*=/);
});
test('V13: scroll exposure is measured by curtain edge so floating WhatsApp does not stay hidden',()=>{
 assert.match(hero,/const curtain = document\.getElementById\('desafios'\)/);
 assert.match(hero,/const edge = curtain\?\.getBoundingClientRect\(\)\.top/);
 assert.match(hero,/visible = edge > window\.innerHeight \* \.38/);
 assert.match(hero,/hero\.inert = edge <= 0/);
 assert.match(hero,/window\.addEventListener\('scroll', queueHeroExposure, \{passive:true\}\)/);
 assert.doesNotMatch(hero,/observer\.observe\(hero\)/);
});
test('V13: respect reduced motion and retain approved gravity/cube interaction',()=>{
 assert.match(hero,/\.wolfim-hero-v5 \{ position:relative; top:auto; \}/);
 assert.match(hero,/window\.setTimeout\(\(\)=>\{started=true;play\(\);\},1500\)/);
 assert.match(hero,/setPointerCapture/);
 assert.match(hero,/data-gravity-cube/);
 assert.match(home,/<MethodStackV9\s*\/>/);
 assert.match(home,/brandHome\?\.addEventListener\('click', event =>/);
 assert.match(home,/window\.scrollTo\(\{ top:0, behavior:/);
});
