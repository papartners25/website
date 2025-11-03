"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function UpcomingCard() {
  return (
    <article className="rounded-xl surface p-5 border border-blue-400/20 bg-gradient-to-br from-blue-400/5 to-transparent relative overflow-hidden">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      
      {/* Badge positioned absolutely like Summit Flats button */}
      <span className="absolute right-5 top-5 inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium border border-blue-400/30 text-blue-300 bg-blue-400/10">
        Upcoming
      </span>
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={16} className="text-blue-400 shrink-0" />
          <h3 className="text-white font-medium">Upcoming Opportunities</h3>
        </div>
        <p className="text-slate-400 text-xs mb-2">Ohio & Surrounding States</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          We are actively pursuing urban redevelopment projects and value‑add multifamily opportunities in promising economic development sites across Ohio and neighboring states. Our focus remains on well‑located assets in growing submarkets where disciplined capital deployment and operational excellence create durable returns.
        </p>
        <div className="mt-4">
          <Link
            href="/contact?topic=newsletter"
            className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:bg-slate-100 transition-colors shadow-sm"
          >
            <Sparkles size={14} />
            Join Newsletter for Updates
          </Link>
        </div>
      </div>
    </article>
  );
}


