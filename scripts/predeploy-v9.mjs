import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const has=name=>fs.existsSync(path.join(root,name));
const page=read('.vercel/output/static/index.html');
const home=read('src/pages/index.astro');
const hero=read('src/components/HeroV5.astro');
const method=read('src/components/MethodStackV9.astro');
const business=read('src/components/BusinessOverview.astro');
const projects=read('src/components/ProjectShowcaseV7.astro');
const tests=[];
const check=(label,ok)=>tests.push({label,ok:!!ok});
check('Seven static routes build',[
 'index.html','diagnostico/index.html','inmobiliarias/index.html',
 'Juan_AI_CV/index.html','Juan_Design_CV/index.html',
 'victor/lotes-rio-tercero/index.html','victor/ranger-2015/index.html'
].every(f=>has('.vercel/output/static/'+f)));
check('Canonical production domain',page.includes('https://www.wolfim.com/'));
check('Compact SVG nav logo',home.includes('logo_wolfim_57UD10.svg')&&has('public/wolfim_logos/logo_wolfim_57UD10.svg'));
check('Official hero logo and 000',hero.includes('WOLFIM_57UD10_OFICIAL_4K.png')&&hero.includes('/ 000'));
check('Five sticky method steps',method.includes('position:sticky')&&['s1','s2','s3','s4','s5'].every(s=>method.includes("key:'"+s+"'")));
check('Motion accessibility',hero.includes('prefers-reduced-motion')&&method.includes('prefers-reduced-motion:reduce'));
check('Gravity and drag intact',hero.includes('},1500)')&&hero.includes('setPointerCapture'));
check('Business, 360 and contact exist',page.includes('id="soluciones"')&&page.includes('id="modelos"')&&page.includes('id="transformacion-360"')&&page.includes('id="v7-contact-form"'));
check('No broken same-page links',[...page.matchAll(/href="#([^"]+)"/g)].every(m=>page.includes('id="'+m[1]+'"')));
check('Legacy campaign anchors exist',['pricing','capabilities','testimonials'].every(x=>page.includes('id="'+x+'"')));
check('Portfolio remains factual',projects.includes('MATERIAL EN REVISIÓN')&&!projects.includes('Visitar sitio en vivo'));
check('Media preview is opt-in',projects.includes('preload="none"')&&!projects.includes('autoplay loop'));
check('Four real posters', ['roggero-roma','sp-cars','construvial','korantis'].every(x=>has('public/v7-previews/'+x+'.jpg')));
check('SEO assets and canonical robots',has('public/og-image.jpg')&&has('public/sitemap.xml')&&read('public/robots.txt').includes('https://www.wolfim.com/sitemap.xml'));
check('Specialized diagnostics preserved',page.includes('href="/diagnostico"')&&has('src/pages/api/leads.ts'));
const warnings=[];
if(!has('.vercel/project.json'))warnings.push('Vercel project/team is not linked locally; connect the verified target before any deployment.');
if(!has('.env')&&!has('.env.local'))warnings.push('Local Supabase variables not set; verify staging/production env and live /api/leads behavior.');
warnings.push('Staging GA4 is intentionally disabled with a visible warning; verify analytics only on authorized production domain.');
warnings.push('Approval still needed: portfolio image rights, lead receipt, privacy review, Lighthouse and human sign-off.');
const result={version:'WOLFIM V9 release candidate',date:'2026-11-11',count:tests.length,passed:tests.filter(t=>t.ok).length,failed:tests.filter(t=>!t.ok),warnings};
fs.writeFileSync(path.join(root,'_review','v9_predeploy_results.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
if(result.failed.length) process.exitCode=1;
