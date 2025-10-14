"use client";
import { useState } from "react";
import Link from "next/link";
import type { Deal } from "@/lib/deals";

export default function DealCard({ deal, isPublic }: { deal: Deal; isPublic?: boolean }) {
  const [open, setOpen] = useState(false);
  // Determine initial preview based on deal config
  const initialPreview: "summary" | "om" | "exec" = deal.hideSummaryTab
    ? (deal.execSummaryUrl ? "exec" : (deal.omUrl ? "om" : "summary"))
    : "summary";
  const [preview, setPreview] = useState<"summary" | "om" | "exec">(initialPreview);
  const activeUrl = preview === "exec" && deal.execSummaryUrl
    ? deal.execSummaryUrl
    : (preview === "om" && deal.omUrl ? deal.omUrl : deal.pdfUrl);
  return (
    <article className="rounded-xl surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-medium">{deal.name}</h3>
          <p className="text-slate-300 text-sm">{deal.location}</p>
          <p className="text-slate-300 text-sm mt-2">{deal.summary}</p>
          <dl className="mt-3 grid grid-cols-3 gap-3 text-xs text-slate-300">
            <div><dt className="text-slate-400">Target IRR</dt><dd className="text-white">{deal.metrics.irr ?? "—"}</dd></div>
            <div><dt className="text-slate-400">Equity Multiple</dt><dd className="text-white">{deal.metrics.equityMultiple ?? "—"}</dd></div>
            <div><dt className="text-slate-400">Hold</dt><dd className="text-white">{deal.metrics.hold ?? "—"}</dd></div>
          </dl>
        </div>
        {isPublic ? (
          <Link
            href="/login?next=/dataroom"
            className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-xs sm:text-sm text-slate-200 hover:text-white hover:bg-white/5 whitespace-nowrap shrink-0 self-start"
          >
            <span className="sm:hidden">Login</span>
            <span className="hidden sm:inline">Login to Expand</span>
          </Link>
        ) : (
          <button
            className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide" : "Expand"}
          </button>
        )}
      </div>
      {!isPublic && open && (
        <div className="mt-5 grid gap-4">
          <div className="flex items-center gap-2">
            {!deal.hideSummaryTab && (
              <button
                className={`inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm ${
                  preview === "summary" ? "bg-white text-slate-900" : "text-slate-200 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setPreview("summary")}
              >
                PDF Summary
              </button>
            )}
            {deal.execSummaryUrl && (
              <button
                className={`inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm ${
                  preview === "exec" ? "bg-white text-slate-900" : "text-slate-200 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setPreview("exec")}
              >
                Executive Summary
              </button>
            )}
            {deal.omUrl && (
              <button
                className={`inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm ${
                  preview === "om" ? "bg-white text-slate-900" : "text-slate-200 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setPreview("om")}
              >
                Offering Memorandum (OM)
              </button>
            )}
          </div>
          <div className="rounded-lg overflow-hidden border border-white/10 bg-white/5">
            <div className="block md:hidden">
              <div className="p-3">
                <p className="text-slate-300 text-sm mb-2">Preview opens in your device’s PDF viewer.</p>
                <a
                  href={activeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-white text-slate-900 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
                >
                  Preview PDF
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <iframe
                title={`${deal.name} ${preview === "om" ? "OM" : "Summary PDF"}`}
                src={`${activeUrl}#view=FitH`}
                className="w-full h-[420px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!deal.hideSummaryTab && (
              <a
                href={deal.pdfUrl}
                download
                className="inline-flex items-center rounded-lg bg-white text-slate-900 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
              >
                Download PDF Summary
              </a>
            )}
            {deal.execSummaryUrl && (
              <a
                href={deal.execSummaryUrl}
                download
                className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
              >
                Download Executive Summary (PDF)
              </a>
            )}
            {deal.omUrl && (
              <a
                href={deal.omUrl}
                download
                className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
              >
                Download Offering Memorandum (PDF)
              </a>
            )}
            <a
              href={deal.excelUrl}
              download
              className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
            >
              Download Pro Forma (XLSX)
            </a>
          </div>
          {deal.footerNote && (
            <p className="text-slate-400 text-xs mt-2">
              {deal.footerNote}
            </p>
          )}
        </div>
      )}
    </article>
  );
}


