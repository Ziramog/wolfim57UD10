import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = (relative) => readFileSync(join(root, relative), 'utf8');
const home = source('src/pages/index.astro');
const hero = source('src/components/HeroV5.astro');
const business = source('src/components/BusinessOverview.astro');
const js = source('src/scripts/script.js');
const diagnostics = source('src/pages/diagnostico.astro');
const api = source('src/pages/api/leads.ts');
const built = source('.vercel/output/static/index.html');

test('V6 outputs approved brand and strategic value proposition', () => {
  assert.match(built, /WOLFIM_57UD10_OFICIAL_4K\.png/);
  assert.match(hero, /Que se vea bien/);
  assert.match(hero, /Tiene que funcionar/);
  assert.match(hero, /Digitalizamos cómo tu empresa se presenta, vende y opera/);
  assert.match(business, /Soluciones para negocios B2B, B2C y operaciones mixtas/);
  assert.doesNotMatch(hero, /¿Preferís conversar directamente\?|hero_v5_whatsapp/);
});

test('primary hero CTA is a real contact route and secondary leads to a real section', () => {
  assert.match(hero, /data-v6-cta="challenge"/);
  assert.match(hero, /data-cta="hero_v6_challenge"/);
  assert.match(hero, /href="https:\/\/wa\.me\//);
  assert.match(hero, /data-v6-cta="solutions"/);
  assert.match(hero, /href="#soluciones"/);
  assert.match(business, /id="soluciones"/);
});

test('three documented B2B/B2C/mixed models exist in one homepage', () => {
  assert.match(business, /id="desafios"/);
  assert.match(business, /id="modelos"/);
  for (const model of ['b2b', 'b2c', 'mixto']) {
    assert.match(business, new RegExp('data-model-tab="'+model+'"'));
    assert.match(business, new RegExp('data-model-panel="'+model+'"'));
    assert.match(business, new RegExp('data-cta="v6_'+model+'_conversation"'));
  }
  assert.match(business, /role="tablist"/);
  assert.match(business, /aria-selected="true"/);
  assert.match(business, /segment_selected/);
});

test('navigation points to existing anchored sections; preserves old SEO routes and lead capture', () => {
  assert.match(home, /href="#soluciones"/);
  assert.match(home, /href="#modelos"/);
  assert.match(home, /href="#projects"/);
  assert.match(home, /href="#process"/);
  assert.match(home, /href="#contact"/);
  const v7Contact = source('src/components/MethodContactV7.astro');
  assert.match(v7Contact, /href="\/diagnostico"/);
  assert.match(diagnostics, /id="diagnostico-form"/);
  assert.match(api, /export const POST/);
});

test('existing gravity, drag and reduced-motion behavior remain', () => {
  assert.doesNotMatch(hero, /data-gravity-stage|data-restart-gravity/);
  assert.match(hero, /window\.setTimeout\(\(\)=>\{started=true;play\(\);\},1500\)/);
  assert.match(hero, /pointerdown/);
  assert.match(hero, /pointermove/);
  assert.match(hero, /setPointerCapture/);
  assert.match(hero, /prefers-reduced-motion/);
  assert.match(hero, /height:100svh/);
});

test('both languages cover new strategic content', () => {
  for (const key of ['v6.hero.description','v6.hero.primary','v6.models.title','v6.b2b.title','v6.b2c.title','v6.mixto.title']) {
    assert.ok(js.split("'"+key+"'").length>=3, 'missing es/en for '+key);
  }
  assert.match(js, /'nav\.models'/);
  assert.match(js, /'nav\.solutions'/);
});

test('no new backend route or unverifiable outcome metric has been added by V6', () => {
  assert.doesNotMatch(business, /\+40%|\+20%|resultados garantizados|caso publicado/);
  assert.doesNotMatch(business, /href="\/soluciones\//);
  assert.match(home, /BusinessOverview/);
});

test('legacy animation does not access a removed hero and V6 nav appears immediately', () => {
  assert.match(js, /if \(!oldHeroGrid \|\| gridLines\.length === 0\) return/);
  assert.match(home, /class="nav nav--v6"/);
  const globalCss = source('src/styles/global.css');
  assert.match(globalCss, /\.nav\.nav--v6 \{ opacity:1; transform:none; \}/);
});

test('official vertical 57UD10 logo is deployed without a duplicate tagline', async () => {
  const { statSync } = await import('node:fs');
  const approved = join(root, 'public/wolfim_logos/WOLFIM_57UD10_OFICIAL_4K.png');
  assert.ok(statSync(approved).size >= 140000, '4K master must remain intact');
  assert.match(hero, /src="\/wolfim_logos\/WOLFIM_57UD10_OFICIAL_4K\.png"/);
  assert.match(hero, /width="4096"/);
  assert.match(hero, /height="1368"/);
  assert.doesNotMatch(hero, /class="wolfim-hero-v5__baseline"/);
  assert.match(home, /logo_wolfim_57UD10\.svg/);
  assert.match(diagnostics, /WOLFIM_57UD10_OFICIAL_4K\.png/);
});

test('V6.1 kinetic editorial direction preserves the official mark and gravity', () => {
  const kinetic = source('src/components/KineticDirection.astro');
  assert.match(home, /KineticDirection/);
  assert.match(hero, /data-kinetic-logo/);
  assert.match(hero, /data-kinetic-line/);
  assert.match(hero, /data-kinetic-rule/);
  assert.match(hero, /WOLFIM_57UD10_OFICIAL_4K\.png/);
  assert.match(kinetic, /prefers-reduced-motion/);
  assert.match(kinetic, /IntersectionObserver/);
  assert.match(kinetic, /translate3d\(0,/);
  assert.match(kinetic, /wolfim-progress/);
  assert.match(kinetic, /spring\(logo/);
  assert.match(kinetic, /ownAnimations/);
  assert.match(business, /data-kinetic-scroll/);
  assert.match(hero, /window\.setTimeout\(\(\)=>\{started=true;play\(\);\},1500\)/);
  assert.match(hero, /setPointerCapture/);
});

test('V6.2 removes redundant contact, hides duplicate nav logo and adds grounded impact', () => {
  assert.doesNotMatch(home, /id="nav-time"/);
  assert.doesNotMatch(js, /setInterval\(updateTime, 1000\)/);
  assert.match(js, /nav--identity-compact/);
  assert.match(js, /compactMark\.inert/);
  assert.match(business, /class="wolfim-v6-audience"/);
  assert.doesNotMatch(hero, /data-kinetic-support/);
  assert.match(hero, /physics\.impact=/);
  assert.match(hero, /impactSpeed/);
  assert.match(hero, /width:min\(580px,55%\)/);
  assert.match(source('src/styles/global.css'), /nav--identity-compact/);
});
