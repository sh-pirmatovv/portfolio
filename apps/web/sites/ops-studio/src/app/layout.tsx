import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10 xl:px-16">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Ops Studio</p>
              <p className="mt-1 text-sm text-slate-200">Operational command surface for the first ecosystem slice</p>
            </div>
            <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
              <Link href="/">Overview</Link>
              <Link href="/queue">Queue</Link>
              <Link href="/accounts">Accounts</Link>
              <Link href="/automation">Automation</Link>
            </nav>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
