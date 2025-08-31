// Force Node runtime & dynamic render (don’t pre-render at build)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { fetchAllNews, fetchLikelyFines } from '../lib/rss';
import keyDates from '../data/key-dates.json';
import fintech from '../data/fintech.json';

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 border border-gray-200 mr-2">{children}</span>;
}

export default async function Page() {
  const [news, fines] = await Promise.all([fetchAllNews(15), fetchLikelyFines()]);

  return (
    <div className="space-y-8">
      <section id="intro" className="bg-white rounded-2xl border p-5">
        <h1 className="text-2xl font-semibold">Your daily regulatory reporting desk</h1>
        <p className="text-sm text-gray-600 mt-1">
          Live feeds from FCA, SEC, and CFTC + curated dates & vendor radar.
        </p>
      </section>

      <section id="updates" className="bg-white rounded-2xl border">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">Latest Regulatory Updates</h2>
          <span className="text-sm text-gray-500">{news.length} items</span>
        </div>
        <ul className="divide-y">
          {news.map(n => (
            <li key={n.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{n.title}</span>
                <Badge>{n.source}</Badge>
                <Badge>{n.region}</Badge>
              </div>
              <div className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                <span>{new Date(n.date).toLocaleString()}</span>
                <span>•</span>
                <a className="underline underline-offset-4" href={n.link} target="_blank">Source</a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="fines" className="bg-white rounded-2xl border">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">Latest Fines & Enforcement (auto-detected)</h2>
          <span className="text-sm text-gray-500">{fines.length} items</span>
        </div>
        <div className="overflow-x-auto p-5 pt-0">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Regulator</th>
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Amount (hint)</th>
                <th className="py-2 pr-4">Link</th>
              </tr>
            </thead>
            <tbody>
              {fines.map(f => (
                <tr key={f.id} className="border-t">
                  <td className="py-2 pr-4 whitespace-nowrap">{new Date(f.date).toLocaleDateString()}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{f.regulator || f.source}</td>
                  <td className="py-2 pr-4">{f.title}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{f.amountHint || '-'}</td>
                  <td className="py-2 pr-4 whitespace-nowrap"><a className="underline underline-offset-4" href={f.link} target="_blank">Open</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="dates" className="bg-white rounded-2xl border">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">Key Dates & Milestones</h2>
          <span className="text-sm text-gray-500">{keyDates.length} items</span>
        </div>
        <ul className="p-5 space-y-3">
          {keyDates.sort((a:any,b:any)=>a.date<b.date?-1:1).map((k:any, idx:number) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-14 text-center">
                <div className="text-xs text-gray-500">{new Date(k.date).toLocaleString(undefined,{month:'short'})}</div>
                <div className="text-lg font-semibold leading-none">{new Date(k.date).getDate()}</div>
              </div>
              <div>
                <div className="font-medium">{k.title}</div>
                <div className="text-xs text-gray-600">
                  <Badge>{k.region}</Badge><Badge>{k.product}</Badge> <a className="underline underline-offset-4" href={k.link} target="_blank">Details</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="fintech" className="bg-white rounded-2xl border">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">FinTech & Platforms Radar</h2>
          <span className="text-sm text-gray-500">{(fintech as any[]).length} items</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {(fintech as any[]).map((f, i) => (
            <div key={i} className="border rounded-xl p-4 hover:shadow-sm bg-gradient-to-b from-white to-neutral-50">
              <div className="text-sm text-gray-500">{f.category}</div>
              <div className="font-medium mt-0.5">{f.name}</div>
              <p className="text-sm text-gray-600 mt-1 min-h-[40px]">{f.blurb}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {(f.regions || []).map((r:any) => <Badge key={r}>{r}</Badge>)}
              </div>
              <div className="mt-2 text-sm">
                <a className="underline underline-offset-4" href={f.url} target="_blank">Visit</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
