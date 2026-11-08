#!/usr/bin/env node
// scripts/lighthouse-check.mjs
//
// Dev-only Lighthouse gate for preview pages (p/<slug>/index.html) and any
// other page in this repo. Adds NOTHING to the served site: it shells out
// to `npx lighthouse` (downloaded on demand into the npm cache, never
// committed, never deployed) and spins up a throwaway static file server
// from Node's own http/fs modules — no new dependency anywhere.
//
// Usage:
//   node scripts/lighthouse-check.mjs <target> [<target> ...]
//
// A <target> is either:
//   - a local path relative to the repo root, e.g. "p/studeno" or
//     "p/studeno/index.html" (served by a throwaway local static server), or
//   - a full URL, e.g. "https://alejkump.si/p/studeno/" (fetched live).
//
// Exits 0 only if every category (performance, accessibility,
// best-practices, seo) scores >= 90 on every target. Exits non-zero
// otherwise, or if Lighthouse/Chrome could not run at all — a check that
// cannot run must fail, not pass silently (agency/lessons/0011).
//
// Requires a Chromium-family browser (Google Chrome or Microsoft Edge) on
// the machine. Set LIGHTHOUSE_CHROME_PATH (or CHROME_PATH) to override
// autodetection.

import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const THRESHOLD = 90;
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function findChromePath() {
  if (process.env.LIGHTHOUSE_CHROME_PATH) return process.env.LIGHTHOUSE_CHROME_PATH;
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = process.platform === 'win32'
    ? [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      ]
    : process.platform === 'darwin'
    ? [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      ]
    : [
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        '/usr/bin/microsoft-edge',
      ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function startStaticServer(root) {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
        let relPath = urlPath.endsWith('/') ? urlPath + 'index.html' : urlPath;
        const filePath = path.normalize(path.join(root, relPath));
        if (!filePath.startsWith(root)) {
          res.writeHead(403);
          res.end('Forbidden');
          return;
        }
        const data = await readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

function resolveTargetUrl(target, port) {
  if (/^https?:\/\//i.test(target)) return target;
  let rel = target.replace(/^\.\/?/, '').replace(/^\/+/, '');
  if (!rel.endsWith('.html') && !rel.endsWith('/')) rel += '/';
  return `http://127.0.0.1:${port}/${rel}`;
}

async function runLighthouse(url, chromePath) {
  const tmpFile = path.join(
    os.tmpdir(),
    `lh-${Date.now()}-${Math.random().toString(36).slice(2)}.json`
  );
  const args = [
    '--yes',
    'lighthouse',
    url,
    '--output=json',
    `--output-path=${tmpFile}`,
    `--only-categories=${CATEGORIES.join(',')}`,
    '--emulated-form-factor=mobile',
    '--throttling-method=simulate',
    // Legacy --headless (not --headless=new) is what actually paints content
    // reliably with Edge/Chrome on this machine; --headless=new produced
    // NO_FCP / "Target closed" failures in testing even though the same
    // browser handles a live remote URL fine with it. --disable-gpu made
    // this worse (NO_FCP), so it is left out.
    '--chrome-flags=--headless --no-sandbox',
    '--quiet',
  ];
  const env = { ...process.env };
  if (chromePath) env.CHROME_PATH = chromePath;
  const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';

  const result = spawnSync(cmd, args, {
    env,
    encoding: 'utf8',
    shell: process.platform === 'win32',
    maxBuffer: 64 * 1024 * 1024,
  });

  if (result.error) {
    throw new Error(`could not launch lighthouse: ${result.error.message}`);
  }
  if (result.status !== 0 || !existsSync(tmpFile)) {
    const tail = (result.stderr || result.stdout || '').trim().slice(-4000);
    throw new Error(`lighthouse exited ${result.status} for ${url}\n${tail}`);
  }

  const raw = await readFile(tmpFile, 'utf8');
  await rm(tmpFile, { force: true });
  return JSON.parse(raw);
}

function topFailingAudits(lhr, categoryKey, limit = 3) {
  const category = lhr.categories[categoryKey];
  const refs = (category.auditRefs || []).filter((r) => (r.weight || 0) > 0);
  const failing = refs
    .map((r) => ({ ref: r, audit: lhr.audits[r.id] }))
    .filter(({ audit }) => audit && typeof audit.score === 'number' && audit.score < 1)
    .sort((a, b) => (b.ref.weight || 0) - (a.ref.weight || 0))
    .slice(0, limit)
    .map(({ audit }) => {
      const dv = audit.displayValue ? ` (${audit.displayValue})` : '';
      return `${audit.title}${dv}`;
    });
  return failing;
}

async function main() {
  const targets = process.argv.slice(2);
  if (targets.length === 0) {
    console.error('Usage: node scripts/lighthouse-check.mjs <target> [<target> ...]');
    console.error('  <target> = local path (e.g. p/studeno) or full URL');
    process.exit(2);
  }

  const chromePath = findChromePath();
  if (!chromePath && !process.env.CHROME_PATH && !process.env.LIGHTHOUSE_CHROME_PATH) {
    console.error(
      'No Chrome or Edge found at the usual install paths, and CHROME_PATH is not set.\n' +
        'Set LIGHTHOUSE_CHROME_PATH to a Chromium-family browser executable and retry.'
    );
    process.exit(1);
  }
  if (chromePath) console.log(`Using browser: ${chromePath}`);

  const needsServer = targets.some((t) => !/^https?:\/\//i.test(t));
  let server = null;
  if (needsServer) {
    server = await startStaticServer(REPO_ROOT);
  }
  const port = server ? server.address().port : null;

  let allPassed = true;
  const summary = [];

  try {
    for (const target of targets) {
      const url = resolveTargetUrl(target, port);
      console.log(`\n=== ${target} -> ${url} ===`);
      let lhr;
      try {
        lhr = await runLighthouse(url, chromePath);
      } catch (err) {
        allPassed = false;
        console.error(`FAILED TO RUN: ${err.message}`);
        summary.push({ target, error: err.message });
        continue;
      }

      const scores = {};
      let targetPassed = true;
      for (const key of CATEGORIES) {
        const cat = lhr.categories[key];
        const score = cat ? Math.round(cat.score * 100) : null;
        scores[key] = score;
        const ok = score !== null && score >= THRESHOLD;
        if (!ok) targetPassed = false;
        console.log(`  ${key.padEnd(16)} ${score === null ? 'N/A' : score}${ok ? '' : '  <-- below ' + THRESHOLD}`);
        if (!ok && score !== null) {
          const top = topFailingAudits(lhr, key);
          for (const line of top) console.log(`      - ${line}`);
        }
      }
      if (!targetPassed) allPassed = false;
      summary.push({ target, scores, passed: targetPassed });
    }
  } finally {
    if (server) server.close();
  }

  console.log('\n=== Summary ===');
  for (const row of summary) {
    if (row.error) {
      console.log(`${row.target}: ERROR - ${row.error.split('\n')[0]}`);
    } else {
      const parts = CATEGORIES.map((k) => `${k}=${row.scores[k]}`).join(' ');
      console.log(`${row.target}: ${row.passed ? 'PASS' : 'FAIL'}  ${parts}`);
    }
  }

  process.exit(allPassed ? 0 : 1);
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
