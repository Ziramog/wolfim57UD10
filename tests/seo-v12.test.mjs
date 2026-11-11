import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const read=(p)=>readFileSync(path.join(root,p),'utf8');
const urls=[
 ['/','index.html'],
 ['/diagnostico','diagnostico/index.html'],
 ['/inmobiliarias','inmobiliarias/index.html'],
 ['/Juan_AI_CV','Juan_AI_CV/index.html'],
 ['/Juan_Design_CV','Juan_Design_CV/index.html'],
 ['/victor/lotes-rio-tercero','victor/lotes-rio-tercero/index.html'],
 ['/victor/ranger-2015','victor/ranger-2015/index.html']
];
const built=(f)=>read(path.join('.vercel/output/static',f));
test('V12: páginas públicas con canonical absoluto, exacto y coherente con www',()=>{
 for(const [pathname,file] of urls) {
  const html=built(file);
  const canon=[...html.matchAll(/<link\s+[^>]*rel="canonical"[^>]*>/gi)].map(x=>x[0]);
  assert.equal(canon.length,1,pathname+' tiene un único canonical');
  assert.ok(canon[0].includes('href="https://www.wolfim.com'+pathname+'"'),pathname+': '+canon[0]);
 }
});
test('V12: inmobiliarias usa canonical y OpenGraph en el mismo dominio',()=>{
 const html=built('inmobiliarias/index.html');
 assert.match(html,/property="og:url"[^>]*content="https:\/\/www\.wolfim\.com\/inmobiliarias"/);
 assert.match(html,/property="og:image"[^>]*content="https:\/\/www\.wolfim\.com\/og-image\.jpg"/);
 assert.doesNotMatch(html,/https:\/\/wolfim\.com\/inmobiliarias/);
});
test('V12: landings de propiedades usan favicon existente y OpenGraph válido',()=>{
 const ranger=built('victor/ranger-2015/index.html');
 const lotes=built('victor/lotes-rio-tercero/index.html');
 assert.match(ranger,/property="og:title"/);
 assert.match(ranger,/property="og:image"[^>]*content="https:\/\/www\.wolfim\.com\/victor\/costado\.jpeg"/);
 assert.match(ranger,/href="\/favicom\.svg"/);
 assert.match(lotes,/href="\/favicom\.svg"/);
 assert.ok(existsSync(path.join(root,'public/favicom.svg')));
 assert.ok(existsSync(path.join(root,'public/victor/costado.jpeg')));
});
test('V12: sitemap indexable de WOLFIM conserva las tres rutas con fechas reales de cambio',()=>{
 const sitemap=read('public/sitemap.xml');
 const links=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
 assert.deepEqual(links,[
  'https://www.wolfim.com/',
  'https://www.wolfim.com/diagnostico',
  'https://www.wolfim.com/inmobiliarias'
 ]);
 assert.ok(!sitemap.includes('https://wolfim.com/'));
 assert.match(sitemap,/<loc>https:\/\/www\.wolfim\.com\/inmobiliarias<\/loc>\s*<lastmod>2026-11-11<\/lastmod>/);
 assert.match(sitemap,/<loc>https:\/\/www\.wolfim\.com\/diagnostico<\/loc>\s*<lastmod>2026-11-11<\/lastmod>/);
 assert.match(read('public/robots.txt'),/Sitemap: https:\/\/www\.wolfim\.com\/sitemap\.xml/);
});
