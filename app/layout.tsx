import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Regulatory Reporting Hub',
  description: 'Live regulatory updates, fines, key dates, and resources for TR consultants'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="RR" width={28} height={28} />
              <span className="font-semibold">Regulatory Reporting Hub</span>
            </div>
            <nav className="text-sm flex items-center gap-4">
              <Link href="#updates" className="hover:underline">Updates</Link>
              <Link href="#fines" className="hover:underline">Fines</Link>
              <Link href="#dates" className="hover:underline">Key Dates</Link>
              <Link href="#fintech" className="hover:underline">FinTech</Link>
              <a href="https://www.fca.org.uk/news" target="_blank" className="hover:underline">FCA</a>
              <a href="https://www.esma.europa.eu/press-news/esma-news" target="_blank" className="hover:underline">ESMA</a>
              <a href="https://www.cftc.gov/PressRoom/index.htm" target="_blank" className="hover:underline">CFTC</a>
              <a href="https://www.sec.gov/newsroom" target="_blank" className="hover:underline">SEC</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        <footer className="max-w-6xl mx-auto px-4 py-10 text-xs text-gray-600">
          © {new Date().getFullYear()} • Built for speed & clarity
        </footer>
      </body>
    </html>
  );
}
