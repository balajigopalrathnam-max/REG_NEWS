export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { fetchAllNews } from '../../../lib/rss';

export async function GET() {
  const items = await fetchAllNews(20);
  return NextResponse.json(items);
}
