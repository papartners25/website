"use client";
import { useState } from "react";
import type { Deal } from "@/lib/deals";

export default function DealCard({ deal }: { deal: Deal }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<"summary" | "om">("summary");
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
        <button
          className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide" : "Expand"}
        </button>
      </div>
      {open && (
        <div className="mt-5 grid gap-4">
          <div className="flex items-center gap-2">
            <button
              className={`inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm ${
                preview === "summary" ? "bg-white text-slate-900" : "text-slate-200 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setPreview("summary")}
            >
              PDF Summary
            </button>
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
            <iframe
              title={`${deal.name} ${preview === "om" ? "OM" : "Summary PDF"}`}
              src={`${(preview === "om" && deal.omUrl) ? deal.omUrl : deal.pdfUrl}#view=FitH`}
              className="w-full h-[420px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <a
              href={deal.pdfUrl}
              download
              className="inline-flex items-center rounded-lg bg-white text-slate-900 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
            >
              Download PDF Summary
            </a>
            {deal.omUrl && (
              <a
                href={deal.omUrl}
                download
                className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
              >
                Download OM (PDF)
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
        </div>
      )}
    </article>
  );
}


