import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root = fileURLToPath(new URL('..',import.meta.url));
const file = x => readFileSync(join(root,x),'utf8');
const page = file('src/pages/index.astro');
const process = file('src/components/MethodStackV9.astro');
const contact = file('src/components/MethodContactV7.astro');
const css = file('src/styles/global.css');
const publicOld = file('public/wolfim_logos/logo_wolfim_57UD10.svg');

test('V9 header restores cleaner vector from current public site without changing main hero logo',()=>{
 assert.match(page,/src="\/wolfim_logos\/logo_wolfim_57UD10\.svg"[^>]+class="nav__logo-img"/);
 assert.match(publicOld,/viewBox="0 0 4188 738"/);
 assert.match(css,/\.nav__logo-img \{ display:block; height:clamp/);
 assert.match(file('src/components/HeroV5.astro'),/WOLFIM_57UD10_OFICIAL_4K\.png/);
});
test('V9 method restores original sticky stack interaction with five strategic stages',()=>{
 assert.match(page,/MethodStackV9/);
 assert.match(process,/id="process"/);
 assert.match(process,/position:sticky/);
 assert.match(process,/data-method-stack/);
 assert.match(process,/data-stack-card/);
 assert.match(process,/data-stack-face/);
 assert.match(process,/requestAnimationFrame\(render\)/);
 assert.match(process,/window\.addEventListener\('scroll',onScroll,\{passive:true\}\)/);
 assert.match(process,/prefers-reduced-motion:reduce/);
 for(const key of ['s1','s2','s3','s4','s5']) assert.match(process,new RegExp("key:'"+key+"'"));
 assert.doesNotMatch(contact,/id="process"/);
 assert.match(contact,/id="v7-contact-form"/);
});

test('V9 migration preserves legacy campaign anchors and the public header identity',()=>{
 const business=file('src/components/BusinessOverview.astro');
 const portfolio=file('src/components/ProjectShowcaseV7.astro');
 for(const anchor of ['pricing','capabilities'])assert.match(business,new RegExp('id="'+anchor+'"'));
 assert.match(portfolio,/id="testimonials"/);
 assert.match(file('public/robots.txt'),/Sitemap: https:\/\/www\.wolfim\.com\/sitemap\.xml/);
 assert.match(file('astro.config.mjs'),/site: 'https:\/\/www\.wolfim\.com'/);
});
test('V9 method hides floating CTA while stacked and has no label collision on narrow mobile',()=>{
 const hero=file('src/components/HeroV5.astro');
 assert.match(process,/wolfim-v9-method-visible/);
 assert.match(process,/whatsApp\.inert/);
 assert.match(hero,/wolfim-v9-method-visible/);
 assert.match(process,/font-size:3rem;letter-spacing:-\.065em/);
});
