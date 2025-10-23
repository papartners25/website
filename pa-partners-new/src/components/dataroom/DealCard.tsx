"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Deal } from "@/lib/deals";

export default function DealCard({ deal, isPublic }: { deal: Deal; isPublic?: boolean }) {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  // Determine initial preview based on deal config
  const initialPreview: "om" | "exec" | "brief" = deal.execSummaryUrl ? "exec" : (deal.omUrl ? "om" : (deal.briefUrl ? "brief" : "exec"));
  const [preview, setPreview] = useState<"om" | "exec" | "brief">(initialPreview);
  const activeUrl =
    (preview === "brief" && deal.briefUrl)
      ? deal.briefUrl
      : (preview === "exec" && deal.execSummaryUrl)
        ? deal.execSummaryUrl
        : (preview === "om" && deal.omUrl)
          ? deal.omUrl
          : (deal.execSummaryUrl ?? deal.omUrl ?? deal.pdfUrl);

  // Public pages should show more conservative, rounded metrics.
  // Private (/dataroom) shows exact deal.metrics.
  const publicMetricOverrides: Record<string, Partial<Deal["metrics"]>> = {
    "south-of-mound": { irr: "20%+", equityMultiple: "2.0x+" },
    "summit-flats": { irr: "20%+", equityMultiple: "2.0x+" },
  };

  const displayMetrics = isPublic
    ? { ...deal.metrics, ...publicMetricOverrides[deal.id] }
    : deal.metrics;

  // Timed crossfade between primary and secondary renderings every 8.25s (reduced-motion aware)
  useEffect(() => {
    if (!deal.secondaryImageUrl) return;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (!paused) setFlipped((v) => !v);
    }, 8250);
    return () => clearInterval(id);
  }, [deal.secondaryImageUrl, paused]);

  // Detect touch devices to adjust interactivity (expand entire image on tap)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hoverNone = window.matchMedia && window.matchMedia('(hover: none)').matches;
    const hasTouch = 'ontouchstart' in window || (navigator.maxTouchPoints ?? 0) > 0;
    setIsTouch(Boolean(hoverNone || hasTouch));
  }, []);

  return (
    <article className="rounded-xl surface p-5">
      {/* Top section uses absolute buttons on small screens to avoid affecting content width */}
      <div className="relative flex flex-col md:flex-row items-start md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium">{deal.name}</h3>
          <p className="text-slate-300 text-sm">{deal.location}</p>
          {deal.imageUrl && (
            <div className="mt-3 rounded-lg overflow-hidden border border-white/10 bg-white/5">
              <div
                className="relative w-full h-40 group"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <Image
                  src={deal.imageUrl}
                  alt={`${deal.name} rendering`}
                  fill
                  style={{ objectFit: deal.imageFit ?? "cover", objectPosition: deal.imagePosition ?? "center" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                  className={deal.secondaryImageUrl ? `transition-opacity duration-700 ease-out ${flipped ? 'opacity-0' : 'opacity-100'}` : undefined}
                />
                {deal.secondaryImageUrl && (
                  <Image
                    src={deal.secondaryImageUrl}
                    alt={`${deal.name} alternate rendering`}
                    fill
                    style={{ objectFit: deal.imageFit ?? "cover", objectPosition: deal.imagePosition ?? "center" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                    className={`transition-opacity duration-700 ease-out ${flipped ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}
                {/* Hover left/right zones for manual navigation */}
                {deal.secondaryImageUrl && !isTouch && (
                  <>
                    <button
                      aria-label="Previous image"
                      className="absolute left-0 top-0 h-full w-1/3 cursor-pointer bg-gradient-to-r from-black/0 to-black/0 hover:to-black/10 z-[2]"
                      onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                    >
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
                        <ChevronLeft size={20} />
                      </span>
                    </button>
                    <button
                      aria-label="Next image"
                      className="absolute right-0 top-0 h-full w-1/3 cursor-pointer bg-gradient-to-l from-black/0 to-black/0 hover:to-black/10 z-[2]"
                      onClick={(e) => { e.stopPropagation(); setFlipped(true); }}
                    >
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
                        <ChevronRight size={20} />
                      </span>
                    </button>
                  </>
                )}
                {/* Center expand button */}
                <button
                  aria-label="Expand image"
                  className={isTouch ? "absolute inset-0 z-[1]" : "absolute top-0 bottom-0 left-1/3 right-1/3 z-[1]"}
                  onClick={() => { setPaused(true); setLightbox(true); }}
                />
              </div>
            </div>
          )}
          <p className="text-slate-300 text-sm mt-2">{deal.summary}</p>
          <dl className="mt-3 grid grid-cols-3 gap-3 text-xs text-slate-300">
            <div><dt className="text-slate-400">Target IRR</dt><dd className="text-white">{displayMetrics.irr ?? "—"}</dd></div>
            <div><dt className="text-slate-400">Equity Multiple</dt><dd className="text-white">{displayMetrics.equityMultiple ?? "—"}</dd></div>
            <div><dt className="text-slate-400">Hold</dt><dd className="text-white">{displayMetrics.hold ?? "—"}</dd></div>
          </dl>
        </div>
        {/* Action buttons: absolute on small screens so they don't consume content width */}
        {isPublic ? (
          <Link
            href="/login?next=/dataroom"
            className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-xs sm:text-sm text-slate-200 hover:text-white hover:bg-white/5 whitespace-nowrap shrink-0 self-start absolute right-0 top-0 md:static"
          >
            <span className="sm:hidden">Login</span>
            <span className="hidden sm:inline">Login to Expand</span>
          </Link>
        ) : (
          <div className="flex items-center gap-2 absolute right-0 top-0 md:static md:self-start">
            <button
              className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Hide" : "Expand"}
            </button>
            {deal.strategyUrl && (
              <Link
                href={deal.strategyUrl}
                className="inline-flex items-center rounded-lg bg-white text-slate-900 px-3 py-1.5 text-sm font-medium hover:bg-slate-100 max-w-[150px] sm:max-w-[200px] md:max-w-none whitespace-nowrap overflow-hidden text-ellipsis"
                title="Tax & Refi Strategy"
              >
                {/* Short label on very small screens, full label on sm+; still allows truncation if tight */}
                <span className="sm:hidden">Tax & Refi</span>
                <span className="hidden sm:inline">Tax & Refi Strategy</span>
              </Link>
            )}
          </div>
        )}
      </div>
      {!isPublic && open && (
        <div className="mt-5 grid gap-4">
          <div className="flex items-center gap-2">
            {deal.briefUrl && (
              <button
                className={`inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm ${
                  preview === "brief" ? "bg-white text-slate-900" : "text-slate-200 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setPreview("brief")}
              >
                Deal Brief
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
                title={`${deal.name} ${preview === "brief" ? "Deal Brief" : preview === "om" ? "OM" : "Executive Summary"}`}
                src={`${activeUrl}#view=FitH`}
                className="w-full h-[420px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {deal.briefUrl && (
              <a
                href={deal.briefUrl}
                download
                className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
              >
                Download Deal Brief (PDF)
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
      {/* Lightbox modal for image expand */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => { setLightbox(false); setPaused(false); }}>
          <button aria-label="Close" className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 w-full max-w-4xl">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <Image
                src={flipped && deal.secondaryImageUrl ? deal.secondaryImageUrl : (deal.imageUrl as string)}
                alt={`${deal.name} enlarged`}
                fill
                sizes="100vw"
                priority
                className="rounded-xl object-contain bg-black/20"
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
}


