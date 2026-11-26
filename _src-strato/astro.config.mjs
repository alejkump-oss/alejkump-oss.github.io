// Strato Apartment previews (7 variants, one per reference site the client sent).
// Each variant is src/pages/p/strato/vN/index.astro -> dist/p/strato/vN/index.html.
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://alejkump.si',
  output: 'static',
  outDir: './dist',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: false,
  trailingSlash: 'ignore',
});
