import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('..',import.meta.url));
const get=f=>readFileSync(join(root,f),'utf8');
const hero=get('src/components/HeroV5.astro');
const layout=get('src/layouts/Layout.astro');
const page=get('src/pages/index.astro');
const portfolio=get('src/components/ProjectShowcaseV7.astro');
const styles=get('src/styles/global.css');

test('V11 selects responsive editions of the intact official mark',()=>{
 assert.match(hero,/WOLFIM_57UD10_OFICIAL_720\.webp 720w/);
 assert.match(hero,/WOLFIM_57UD10_OFICIAL_1440\.webp 1440w/);
 assert.match(hero,/WOLFIM_57UD10_OFICIAL_4K\.png 4096w/);
 assert.match(hero,/fetchpriority="high"/);
 const original=statSync(join(root,'public/wolfim_logos/WOLFIM_57UD10_OFICIAL_4K.png')).size;
 for(const width of [720,1440]){
   const opt=statSync(join(root,'public/wolfim_logos/WOLFIM_57UD10_OFICIAL_'+width+'.webp')).size;
   assert.ok(opt<original*.6,'optimized logo must be substantially smaller');
 }
});
test('V11 font CSS is nonblocking without losing the fallback',()=>{
 assert.match(layout,/media="print" onload="this\.media='all'"/);
 assert.match(layout,/<noscript><link href="https:\/\/fonts\.googleapis\.com/);
 assert.match(layout,/rel="preload" as="style"/);
});
test('V11 accessibility landmarks and buttons',()=>{
 assert.match(page,/<main id="main-content">/);
 assert.match(page,/<\/main>/);
 assert.match(page,/id="lang-toggle" title="Cambiar idioma"/);
 assert.doesNotMatch(page,/aria-label="Toggle language"/);
 assert.doesNotMatch(portfolio,/aria-label=\{'Ver vista previa de '/);
 assert.match(portfolio,/title=\{'Ver previsualización de '/);
 assert.match(styles,/\.nav__menu-btn \{[\s\S]*?min-height: 44px;/);
});
test('V11 keeps the approved motion and original logo fallback',()=>{
 assert.match(hero,/\},1500\)/);
 assert.match(hero,/setPointerCapture/);
 assert.match(hero,/prefers-reduced-motion/);
 assert.match(hero,/src="\/wolfim_logos\/WOLFIM_57UD10_OFICIAL_4K\.png"/);
});
