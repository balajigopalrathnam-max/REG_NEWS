import { Region } from './types';

export type Feed = { url: string; source: string; region: Region };

// Authoritative, public RSS feeds we can reliably aggregate
// (If a site lacks RSS, add an HTML scraper separately.)
export const FEEDS: Feed[] = [
  // UK — FCA (official)
  { url: "https://www.fca.org.uk/news/rss.xml?category=All", source: "FCA", region: "UK" },

  // US — SEC (official)
  { url: "https://www.sec.gov/news/pressreleases.rss", source: "SEC Press Releases", region: "US" },
  { url: "https://www.sec.gov/rss/litigation/litreleases.xml", source: "SEC Litigation Releases", region: "US" },

  // US — CFTC (official)
  { url: "https://www.cftc.gov/RSS/RSSGP/rssgp.xml", source: "CFTC Press Releases", region: "US" },
  { url: "https://www.cftc.gov/RSS/RSSENF/rssenf.xml", source: "CFTC Enforcement", region: "US" }
];
