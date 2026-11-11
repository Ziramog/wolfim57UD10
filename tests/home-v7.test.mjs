import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
const get=p=>readFileSync(join(root,p),'utf8');
const home=get('src/pages/index.astro');
const projects=get('src/components/ProjectShowcaseV7.astro');
const method=get('src/components/MethodContactV7.astro');
const business=get('src/components/BusinessOverview.astro');
const layout=get('src/layouts/Layout.astro');
const i18n=await import('../src/scripts/v7-i18n.js');

test('V7 aligns homepage architecture and excludes legacy social proof',()=>{
 assert.match(home, /ProjectShowcaseV7/);
 assert.match(home, /MethodContactV7/);
 assert.doesNotMatch(home, /<section id="pricing"/);
 assert.doesNotMatch(home, /<section id="testimonials"/);
 assert.doesNotMatch(home, /class="pricing-card"/);
 assert.doesNotMatch(home, /href="#"/);
 assert.doesNotMatch(home, /unpkg.com\/lucide/);
 assert.match(get("src/components/MethodStackV9.astro"), /id="process"/);
 assert.match(method, /id="contact"/);
 assert.match(business, /id="soluciones"/);
 assert.match(business, /id="modelos"/);
});
test('V7 previews have real original media and independent lightweight posters',()=>{
 for(const name of ['roggero-roma','sp-cars','construvial','korantis']){
   assert.ok(statSync(join(root,'public/v7-previews/'+name+'.jpg')).size>10000);
   assert.match(projects,new RegExp('/v7-previews/'+name.replace(/-/g,'-')+'\\.jpg'));
 }
 for(const name of ['roggeroyroma_hero2.mp4','SPCars.mp4','construvial-2.mp4','Korantis_web_UI_showcase.mp4']){
   assert.ok(statSync(join(root,'public',name)).size>1000000);
   assert.ok(projects.includes('/'+name));
 }
 assert.match(projects, /preload="none"/);
 assert.match(projects, /dialog\.showModal\(\)/);
 assert.match(projects, /dialog\.addEventListener\('close'/);
});
test('V7 visually labels unverified work and does not claim production links',()=>{
 assert.match(projects, /MATERIAL EN REVISIÓN/);
 assert.match(projects, /No implica que los proyectos estén publicados/);
 assert.doesNotMatch(projects, /Visitar sitio en vivo|href="#"/);
 assert.doesNotMatch(projects, /Retención|\+40%|resultados garantizados/);
});
test('V7 conversion flow is real WhatsApp, preserving specialized diagnostics',()=>{
 assert.match(method, /id="v7-contact-form"/);
 assert.match(method, /name="model"/);
 assert.match(method, /name="challenge"/);
 assert.match(method, /id="contact"/);
});
test('V7 general brief does not invent server delivery',()=>{
 assert.match(method, /event\.preventDefault\(\)/);
 assert.match(method, /window\.location\.assign\('https:\/\/wa\.me\//);
 assert.match(method, /Abriremos WhatsApp con tu mensaje preparado/);
 assert.match(method, /href="\/diagnostico"/);
 assert.match(method, /mailto:juan@wolfim\.com/);
 assert.doesNotMatch(method, /fetch\(|\/api\/leads/);
});
test('V7 ES/EN dictionaries use same keys and cover every displayed copy',()=>{
 const a=Object.keys(i18n.v7Translations.es).sort();
 const b=Object.keys(i18n.v7Translations.en).sort();
 assert.deepEqual(a,b);
 const all=projects+method;
 const refs=[...all.matchAll(/data-i18n="(v7\.[^"]+)"/g),...all.matchAll(/data-i18n-placeholder="(v7\.[^"]+)"/g)].map(x=>x[1]);
 for(const key of refs){assert.ok(a.includes(key),'Missing bilingual key '+key);}
 assert.ok(a.length>=61, 'the V7 content and new V8 keys must remain bilingual');
});
test('institutional SEO no longer advertises legacy prices and plans',()=>{
 assert.doesNotMatch(layout, /"price": "200"|"price": "450"|"price": "650"/);
 assert.doesNotMatch(layout, /plan-presencia-comercial|plan-loteo-activo/);
 assert.match(layout, /WOLFIM \/ 57UD10/);
});
