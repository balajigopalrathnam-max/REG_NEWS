export type Region = 'Global' | 'UK' | 'EU' | 'US' | 'APAC' | 'MEA';

export interface NewsItem {
  id: string;
  date: string;      // ISO
  title: string;
  link: string;
  source: string;    // Regulator/source name
  region: Region;
  tags?: string[];
}

export interface FineItem extends NewsItem {
  summary?: string;
  amountHint?: string;
  firmHint?: string;
  regulator?: string;
}
