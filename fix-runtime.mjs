import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const configPath = join(process.cwd(), '.vercel', 'output', 'functions', '_render.func', '.vc-config.json');

if (existsSync(configPath)) {
  const config = JSON.parse(readFileSync(configPath, 'utf-8'));
  if (config.runtime === 'nodejs18.x') {
    config.runtime = 'nodejs20.x';
    writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('[fix-runtime] Updated runtime from nodejs18.x to nodejs20.x');
  } else {
    console.log(`[fix-runtime] Runtime is already ${config.runtime}`);
  }
} else {
  console.log('[fix-runtime] .vc-config.json not found');
}
