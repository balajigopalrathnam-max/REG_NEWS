export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { fetchLikelyFines } from '../../../lib/rss';

export async function GET() {
  const items = await fetchLikelyFines();
  return NextResponse.json(items);
}
