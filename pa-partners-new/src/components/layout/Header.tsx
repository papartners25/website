"use client";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/site";
import { Menu } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="surface mt-2.5 mb-3 rounded-xl px-4 py-2.5 flex items-center justify-between shadow-elevated">
          <Link href="/" className="flex items-center gap-2" aria-label="PA Partners Home">
            <Image src="/logo/pa-partners-logo.png" alt="PA Partners" width={200} height={50} priority className="h-9 md:h-10 w-auto" />
            <span className="sr-only">PA Partners</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden md:inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:border-white/20">
              Investor Login
            </Link>
            <button
              className="md:hidden inline-flex items-center p-2 rounded-lg hover:bg-white/5"
              aria-label="Open navigation menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-3">
            <div className="surface rounded-xl p-2 grid gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/5"
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                {item.label}
              </Link>
            ))}
              <Link href="/login" className="px-2 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/5">Investor Login</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


