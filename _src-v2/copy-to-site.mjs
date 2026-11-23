// Copies the built pages and assets/v2 from dist/ into the live-site root.
// It touches ONLY index.html, storitve.html, cene.html and assets/v2/**.
import { cpSync, copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, 'dist');
const site = resolve(here, '..');
for (const f of ['index.html', 'storitve.html', 'cene.html']) {
  const src = resolve(dist, f);
  if (!existsSync(src)) throw new Error(`missing ${src}`);
  copyFileSync(src, resolve(site, f));
  console.log('copied', f);
}
mkdirSync(resolve(site, 'assets/v2'), { recursive: true });
cpSync(resolve(dist, 'assets/v2'), resolve(site, 'assets/v2'), { recursive: true });
console.log('copied assets/v2');
