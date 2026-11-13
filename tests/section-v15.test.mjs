import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
const read=f=>readFileSync(join(root,f),'utf8');
const page=read('src/components/BusinessOverview.astro');
const orbital=read('src/components/Orbit360V15.astro');
const locale=read('src/scripts/script.js');
test('V15 starts from approved V12 rather than rejected V13/V14',()=>{
 assert.doesNotMatch(page,/v14-velocity|v14-network|v13-curtain/);
 assert.match(page,/import Orbit360V15/);
 assert.match(page,/class="wolfim-v15-layout"/);
 assert.match(page,/<Orbit360V15\s*\/>/);
});
test('V15 visual communicates four channels and supporting web/CRM without claims of active integrations',()=>{
 for(const brand of ['MERCADO','LIBRE','INSTAGRAM','FACEBOOK','WHATSAPP','WEB','CRM'])assert.match(orbital,new RegExp(brand));
 assert.match(orbital,/Ecosistema conceptual/);
 assert.match(orbital,/no implica integraciones activas/i);
 assert.doesNotMatch(orbital,/resultados garantizados/i);
 assert.match(orbital,/WOLFIM/);
 assert.match(orbital,/360/);
});
test('V15 orbits are self contained, slow, legible and reduced-motion aware',()=>{
 assert.match(orbital,/36s linear infinite/);
 assert.match(orbital,/25s linear infinite/);
 assert.match(orbital,/wolfim-orbit-counterrotate/);
 assert.match(orbital,/prefers-reduced-motion:reduce/);
 assert.match(orbital,/IntersectionObserver/);
 assert.match(orbital,/data-paused/);
 assert.match(orbital,/visibilitychange/);
 assert.doesNotMatch(orbital,/React|framer-motion|requestAnimationFrame/);
});
test('V15 section fits one desktop viewport without forced mobile clipping',()=>{
 assert.match(page,/@media\(min-width:1001px\) and \(min-height:720px\)\{\.wolfim-v6-challenges\{height:100svh\}\}/);
 assert.match(page,/@media\(max-width:800px\)\{/);
 assert.match(page,/\.wolfim-v6-challenges\{height:auto;min-height:0/);
 assert.match(page,/grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
 assert.match(page,/background:#1B1B1B/);
});
test('V15 captions, accessible description and shortened strategic copy in ES and EN',()=>{
 assert.match(orbital,/aria-labelledby="wolfim-v15-orbit-description"/);
 assert.match(orbital,/v15\.orbit\.description/);
 assert.match(orbital,/v15\.orbit\.caption/);
 for(const key of ['v15.orbit.description','v15.orbit.caption','v6.challenges.title','v6.challenges.lead']){
   const occurrences=locale.split("'"+key+"'").length-1;
   assert.equal(occurrences,2,key+' must be translated in both languages');
 }
 assert.match(page,/Cuando los canales no se conectan/);
 assert.match(page,/Soluciones para negocios B2B, B2C y operaciones mixtas/);
});

test('V15 keeps WhatsApp shortcut from obscuring the compact challenge cards',()=>{
 const globalCss=read('src/styles/global.css');
 assert.match(globalCss,/body\.wolfim-v15-challenges-visible \.whatsapp-sticky/);
 assert.match(orbital,/classList\.toggle\('wolfim-v15-challenges-visible'/);
 assert.match(orbital,/reconcileShortcut\(\)/);
 for (const component of ['HeroV5','Transformacion360V8','MethodStackV9','MethodContactV7']){
   assert.match(read('src/components/'+component+'.astro'),/wolfim-v15-challenges-visible/);
 }
});
