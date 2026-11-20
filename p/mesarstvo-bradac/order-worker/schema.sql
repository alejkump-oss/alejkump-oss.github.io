-- ak-booking-mesarstvo-bradac (Cloudflare D1, free plan)
-- Apply: npx wrangler d1 execute ak-booking-mesarstvo-bradac --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS orders (
  id         TEXT PRIMARY KEY,          -- human code shown to the customer, e.g. MB-7K3QX
  req_id     TEXT NOT NULL UNIQUE,      -- client idempotency key: a retried POST returns the same order
  date       TEXT NOT NULL,             -- pickup day YYYY-MM-DD, Europe/Ljubljana
  win        TEXT NOT NULL,             -- pickup window id, e.g. 08-12
  items      TEXT NOT NULL,             -- free text: what the customer wants (vrsta mesa, količina)
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  created_at INTEGER NOT NULL,          -- epoch ms
  expires_at INTEGER NOT NULL           -- epoch ms; row is purged after this (window end + ~2 days)
);
CREATE INDEX IF NOT EXISTS orders_win ON orders(date, win);
CREATE INDEX IF NOT EXISTS orders_exp ON orders(expires_at);

CREATE TABLE IF NOT EXISTS ratelimit (
  k   TEXT PRIMARY KEY,                 -- hmac(ip | bucket | scope), never the raw IP
  n   INTEGER NOT NULL,
  exp INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ratelimit_exp ON ratelimit(exp);
