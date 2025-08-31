# Regulatory Reporting Hub (Next.js)

A consulting-grade dashboard for regulatory reporting pros. It aggregates **live regulator feeds** (FCA, SEC, CFTC) and presents:
- Latest updates
- Auto-detected fines/enforcement
- Key dates (editable JSON)
- FinTech radar

> Starter scope uses official **RSS** feeds for reliability. Extend with ESMA/MAS/ASIC by adding feeds or HTML parsers.

## Quick start

1) Ensure Node.js 18+ and npm are installed.
2) Unzip this folder, then open a terminal in it.
3) Install deps: `npm install`
4) Run dev server: `npm run dev`
5) Open: http://localhost:3000

## Feeds included (official sources)

- FCA News (RSS): https://www.fca.org.uk/news/rss.xml?category=All
- SEC Press Releases (RSS): https://www.sec.gov/news/pressreleases.rss
- SEC Litigation Releases (RSS): https://www.sec.gov/rss/litigation/litreleases.xml
- CFTC Press Releases (RSS): https://www.cftc.gov/RSS/RSSGP/rssgp.xml
- CFTC Enforcement Press Releases (RSS): https://www.cftc.gov/RSS/RSSENF/rssenf.xml

You can modify `lib/feeds.ts` to add more.

## Add ESMA, MAS, ASIC (two options)

**Option A – RSS** (preferred if available):
- Replace/augment `lib/feeds.ts` with their RSS URLs once confirmed by your compliance team.

**Option B – HTML** (when no RSS):
- Create a new function `fetchHtmlSources()` in `lib/rss.ts` using `fetch()` and a lightweight HTML parse (e.g., regex or `cheerio` if you add it).
- Map to the common `NewsItem` shape and merge into `fetchAllNews()`.

## Branding & theming

- Swap `/public/logo.svg` and adjust colors via Tailwind classes in `app/*.tsx`.
- Add your firm’s favicon to `/public` and include in `app/layout.tsx` metadata if desired.

## Deploy

- **Vercel**: One-click deploy from GitHub, set Node 18+.
- **Docker**: `docker build -t rrhub .` then `docker run -p 3000:3000 rrhub`.
- **On-prem**: `npm run build` then `npm start` behind your reverse proxy.

## Notes

- Fines/enforcement are detected by keyword heuristics. For critical MI, point to **official enforcement feeds** or build per-regulator scrapers.
- All dates render in your browser timezone.
- This code is server-rendered; feed fetching happens server-side.
