# scripts/

Dev-only tooling. Nothing here is served live: `.assetsignore` excludes both
`scripts/` and `*.md`, so none of this reaches `alejkump.si`.

## lighthouse-check.mjs

A Lighthouse gate for preview pages (`p/<slug>/index.html`) and any other
page in this repo. Adds zero dependencies to the site: it shells out to
`npx lighthouse` (fetched on demand into the npm cache, never committed) and
serves local files with a throwaway static server built from Node's own
`http`/`fs` modules.

Checks four categories with mobile emulation — performance, accessibility,
best-practices, seo — and fails (non-zero exit) if any of them score below
90.

### Usage

```
node scripts/lighthouse-check.mjs <target> [<target> ...]
```

A `<target>` is either:

- a local path relative to the repo root, e.g. `p/studeno` or
  `p/studeno/index.html` — served by the throwaway local server, or
- a full URL, e.g. `https://alejkump.si/p/studeno/` — fetched live.

Examples:

```
node scripts/lighthouse-check.mjs p/studeno
node scripts/lighthouse-check.mjs p/studeno p/slascicarna-medo p/lana-avto
node scripts/lighthouse-check.mjs https://alejkump.si/p/studeno/
```

### Requirements

A Chromium-family browser (Google Chrome or Microsoft Edge) installed
locally. The script looks in the usual Windows/macOS/Linux install
locations; override with `LIGHTHOUSE_CHROME_PATH` (or `CHROME_PATH`) if it
guesses wrong.

### Known environment caveat (2026-11-09)

On this machine, Lighthouse's newer `--headless=new` Chrome flag produced
`NO_FCP` / "Target closed" failures against the local static server even
though the exact same browser handled a live remote URL fine with it. The
script uses the legacy `--headless --no-sandbox` flags instead, which
worked in isolated testing (single category, single target). Running all
four categories back-to-back against multiple local targets in one
session has been slow/prone to hanging in this sandboxed environment —
if a run hangs, kill it and retry one target at a time rather than batching
many in one invocation.

### What this does not do

It does not fix anything. It reports scores and the top failing audits per
category so a human (or a later task) can decide what to fix. It is not
wired into CI — see the repository root for whether a workflow exists;
nothing here should be enabled to run automatically without checking it
cannot create any cost (GitHub Actions minutes, etc).
