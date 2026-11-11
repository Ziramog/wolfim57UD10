import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {v7Translations} from '../src/scripts/v7-i18n.js';
const root=fileURLToPath(new URL('..',import.meta.url));
const get=f=>readFileSync(join(root,f),'utf8');
const hero=get('src/components/HeroV5.astro');
const section=get('src/components/Transformacion360V8.astro');
const method=get('src/components/MethodContactV7.astro');
const home=get('src/pages/index.astro');
const source=get('src/scripts/script.js');

test('V8 cube is larger and drops after exactly 1.5 seconds',()=>{
 assert.match(hero,/window\.setTimeout\(\(\)=>\{started=true;play\(\);\},1500\)/);
 assert.match(hero,/width:clamp\(72px,7\.5vw,110px\)/);
 assert.match(hero,/width:clamp\(56px,16vw,72px\)/);
 assert.match(hero,/setPointerCapture/);
 assert.match(hero,/pointermove/);
 assert.match(hero,/compactScreen\.matches \? 2700 : 2200/);
 assert.match(hero,/compactScreen\.matches \? \.31 : \.41/);
 assert.match(hero,/prefers-reduced-motion/);
});
test('V8 hero adopts 360 direction without overwriting manifesto or original logo',()=>{
 assert.match(hero,/Que se vea bien/);
 assert.match(hero,/Tiene que funcionar/);
 assert.match(hero,/TRANSFORMACIÓN DIGITAL 360°/);
 assert.match(hero,/Digitalizamos cómo tu empresa se presenta, vende y opera/);
 assert.match(hero,/SISTEMAS \+ COMERCIO/);
 assert.match(hero,/CRM · B2B · B2C · ECOMMERCE · MERCADO LIBRE/);
 assert.match(hero,/WOLFIM_57UD10_OFICIAL_4K\.png/);
 assert.match(hero,/href="#soluciones"/);
});
test('new service area describes the 6 real strategic scopes without false achievements',()=>{
 assert.match(section,/id="transformacion-360"/);
 assert.match(section,/Tu negocio evolucionó/);
 assert.match(section,/¿Tus sistemas también/);
 for(const key of ['systems','crm','b2b','b2c','ml','data']){
  assert.match(section,new RegExp("key:'"+key+"'"));
 }
 assert.match(section,/No proponemos un ERP completo por defecto/);
 assert.match(section,/según diagnóstico y viabilidad técnica/);
 assert.doesNotMatch(section,/proyecto finalizado|resultados garantizados|integración universal/);
 assert.doesNotMatch(method,/id="transformacion-360"/);
});
test('links and EN/ES have full coverage without new backends',()=>{
 assert.match(home,/Transformacion360V8/);
 assert.match(home,/href="#transformacion-360"/);
 assert.match(section,/href="#contact"/);
 const refs=[...section.matchAll(/data-i18n="(v8\.[^"]+)"/g),...hero.matchAll(/data-i18n="(v8\.[^"]+)"/g)].map(x=>x[1]);
 for(const key of refs) {
  assert.ok(v7Translations.es[key], 'missing ES '+key);
  assert.ok(v7Translations.en[key], 'missing EN '+key);
 }
 assert.match(source,/nav\.digital360/);
 assert.doesNotMatch(section,/\/api\/leads|fetch\(/);
});

test('360 bridge is translated and the floating contact shortcut cannot obscure the module',()=>{
 assert.match(section,/v8\.360\.bridge/);
 assert.match(section,/data-kinetic-order=\{Number\(m\.n\) - 1\}/);
 assert.match(section,/wolfim-v8-360-visible/);
 assert.match(section,/whatsApp\.inert/);
 assert.equal(v7Translations.es['v8.360.bridge'],'UN SISTEMA. SEIS CAPACIDADES.');
 assert.equal(v7Translations.en['v8.360.bridge'],'ONE SYSTEM. SIX CAPABILITIES.');
 assert.match(hero,/wolfim-v8-360-visible/);
 assert.match(method,/wolfim-v8-360-visible/);
});

test('Hero begins editorial numbering at / 000', () => {
  assert.match(hero, /wolfim-hero-v5__kicker-index\">\/ 000<\/span>/);
  assert.doesNotMatch(hero, /wolfim-hero-v5__kicker-index\">\/ 001<\/span>/);
});
