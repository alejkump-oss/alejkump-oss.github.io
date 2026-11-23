// AK agencija site v2 – Astro source. Output is plain static HTML that is
// copied into the live-site root (index.html, storitve.html, cene.html) plus
// public/assets/v2/*. No component-scoped styles are used on purpose, so the
// build emits no hashed _astro/ bundle: every asset path is stable.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alejkump.si',
  output: 'static',
  outDir: './dist',
  build: {
    format: 'file',          // src/pages/storitve.astro -> dist/storitve.html
    inlineStylesheets: 'never',
  },
  compressHTML: false,       // keep the HTML readable for review
  trailingSlash: 'ignore',
});
