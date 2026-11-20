-- ak-booking-tattoo-pigment (Cloudflare D1, free plan)
-- Apply: npx wrangler d1 execute ak-booking-tattoo-pigment --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS bookings (
  id         TEXT PRIMARY KEY,          -- human code shown to the customer, e.g. TP-7K3QX
  req_id     TEXT NOT NULL UNIQUE,      -- client idempotency key: a retried POST returns the same booking
  date       TEXT NOT NULL,             -- YYYY-MM-DD, Europe/Ljubljana
  hour       INTEGER NOT NULL,          -- slot start hour, 9..20
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  kind       TEXT NOT NULL,
  note       TEXT NOT NULL DEFAULT '',  -- "Kaj želite": idea, size, body placement (free text)
  created_at INTEGER NOT NULL,          -- epoch ms
  expires_at INTEGER NOT NULL           -- epoch ms; row is purged after this (slot + ~2 days)
);
CREATE INDEX IF NOT EXISTS bookings_slot ON bookings(date, hour);
CREATE INDEX IF NOT EXISTS bookings_exp  ON bookings(expires_at);

CREATE TABLE IF NOT EXISTS ratelimit (
  k   TEXT PRIMARY KEY,                 -- hmac(ip | bucket | scope), never the raw IP
  n   INTEGER NOT NULL,
  exp INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ratelimit_exp ON ratelimit(exp);
