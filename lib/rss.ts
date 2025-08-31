import Parser from 'rss-parser';
import { FEEDS } from './feeds';
import { NewsItem, FineItem } from './types';

const parser = new Parser({
  timeout: 15000,
  customFields: {
    item: [
      ['pubDate', 'pubDate'],
      ['dc:date', 'dcDate'],
      ['content', 'content'],
      ['content:encoded', 'contentEncoded']
    ]
  }
});

function toISO(d?: string): string {
  const dt = d ? new Date(d) : new Date();
  return isNaN(+dt) ? new Date().toISOString() : dt.toISOString();
}

export async function fetchAllNews(limitPerFeed = 20): Promise<NewsItem[]> {
  const all = await Promise.allSettled(FEEDS.map(async (f) => {
    const feed = await parser.parseURL(f.url);
    return (feed.items || []).slice(0, limitPerFeed).map((it) => ({
      id: `${f.source}:${(it.guid || it.link || it.title || Math.random().toString(36)).toString()}`,
      date: toISO((it as any).dcDate || it.pubDate),
      title: it.title ?? '(untitled)',
      link: it.link ?? '#',
      source: f.source,
      region: f.region as const,
      tags: []
    } satisfies NewsItem));
  }));

  const items: NewsItem[] = all.flatMap((r) => r.status === 'fulfilled' ? r.value : []);

  // sort newest first
  items.sort((a, b) => (a.date < b.date ? 1 : -1));
  return items;
}

const FINE_KEYWORDS = [
  'fine', 'fined', 'penalty', 'penalties', 'sanction', 'sanctions',
  'settles', 'settlement', 'charged', 'order to pay', 'ordered to pay',
  'injunct', 'cease and desist', 'disgorgement', 'civil money penalty'
];

export async function fetchLikelyFines(): Promise<FineItem[]> {
  const news = await fetchAllNews(30);
  const fines = news.filter(n => {
    const t = (n.title || '').toLowerCase();
    return FINE_KEYWORDS.some(k => t.includes(k));
  }).map(n => ({
    ...n,
    regulator: n.source,
    amountHint: (n.title.match(/\$\d+[\d,.]*/i) || n.title.match(/£\d+[\d,.]*/i) || n.title.match(/€\d+[\d,.]*/i))?.[0]
  }));
  return fines.slice(0, 30);
}
