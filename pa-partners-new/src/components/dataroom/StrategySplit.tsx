"use client";
import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { Minus, Plus, Maximize2, Minimize2, FileDown, FileText, Table } from "lucide-react";
import CostSegPresentation from "@/components/dataroom/CostSegPresentation";
import type { Deal } from "@/lib/deals";

export default function StrategySplit({ deal }: { deal: Deal | undefined }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [zoom, setZoom] = useState(0.8);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentOuterRef = useRef<HTMLDivElement | null>(null);

  const clamp = (v: number) => Math.min(1.25, Math.max(0.5, v));

  const fitToWidth = useCallback(() => {
    const container = containerRef.current;
    const outer = contentOuterRef.current;
    if (!container || !outer) return;
    
    setZoom((currentZoom) => {
      const scaledWidth = outer.getBoundingClientRect().width; // includes current zoom
      const unscaledWidth = scaledWidth / currentZoom || scaledWidth;
      const target = container.clientWidth;
      if (unscaledWidth > 0) {
        return clamp(target / unscaledWidth);
      }
      return currentZoom;
    });
  }, []); // Remove zoom dependency

  const wrapperStyle = useMemo(() => ({
    transform: `scale(${zoom})`,
    transformOrigin: "top left",
    width: `${(1 / zoom) * 100}%`,
  }), [zoom]);

  const containerHeight = useMemo(() => ({
    height: `${900 * zoom}px`
  }), [zoom]);
  
  // Auto-fit on mount and when sidebar toggles, NOT on every resize
  useEffect(() => {
    // Apply a more zoomed-out default for narrow mobile portrait before fitting
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortrait = height > width;
      if (isPortrait && width <= 420) {
        setZoom((z) => clamp(Math.min(z, width <= 360 ? 0.55 : 0.6)));
      }
    }

    // Only fit once when sidebar changes or on mount
    const timer = setTimeout(() => {
      requestAnimationFrame(() => fitToWidth());
    }, 100);

    return () => clearTimeout(timer);
  }, [fitToWidth, showSidebar]);

  // Handle window resize separately with debouncing
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        requestAnimationFrame(() => fitToWidth());
      }, 250); // Debounce resize events
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [fitToWidth]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
            onClick={() => setShowSidebar((v) => !v)}
            aria-label={showSidebar ? "Enter wide mode" : "Exit wide mode"}
          >
            {showSidebar ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            {showSidebar ? "Wide mode" : "Show documents"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center rounded-lg border border-white/10 px-2 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
            onClick={() => setZoom((z) => clamp(z - 0.1))}
            aria-label="Zoom out"
          >
            <Minus size={16} />
          </button>
          <button
            className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
            onClick={fitToWidth}
          >
            Fit
          </button>
          <button
            className="inline-flex items-center rounded-lg border border-white/10 px-2 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
            onClick={() => setZoom((z) => clamp(z + 0.1))}
            aria-label="Zoom in"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className={showSidebar ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]" : "grid gap-6 grid-cols-1"}>
        <div ref={containerRef} className="surface rounded-xl p-0 md:p-0 shadow-card overflow-hidden" style={containerHeight}>
          <div ref={contentOuterRef} style={wrapperStyle} className="block">
            <CostSegPresentation />
          </div>
        </div>

        {showSidebar && (
          <aside className="surface rounded-xl p-5 shadow-card h-max">
            <h2 className="text-white font-semibold mb-3">Deal Documents</h2>
            <div className="space-y-3">
              {deal?.execSummaryUrl && (
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <div className="px-3 py-2 bg-white/5 flex items-center gap-2 text-slate-200">
                    <FileText size={16} /> Executive Summary
                  </div>
                  <iframe title="Executive Summary" src={`${deal.execSummaryUrl}#view=FitH`} className="w-full h-56 bg-white" />
                  <div className="p-3 border-t border-white/10 flex justify-between">
                    <a href={deal.execSummaryUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-200 hover:text-white">Open</a>
                    <a href={deal.execSummaryUrl} download className="inline-flex items-center gap-1 text-sm text-slate-200 hover:text-white">
                      <FileDown size={14} /> Download
                    </a>
                  </div>
                </div>
              )}

              {deal?.omUrl && (
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <div className="px-3 py-2 bg-white/5 flex items-center gap-2 text-slate-200">
                    <FileText size={16} /> Offering Memorandum
                  </div>
                  <iframe title="Offering Memorandum" src={`${deal.omUrl}#view=FitH`} className="w-full h-56 bg-white" />
                  <div className="p-3 border-t border-white/10 flex justify-between">
                    <a href={deal.omUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-200 hover:text-white">Open</a>
                    <a href={deal.omUrl} download className="inline-flex items-center gap-1 text-sm text-slate-200 hover:text-white">
                      <FileDown size={14} /> Download
                    </a>
                  </div>
                </div>
              )}

              {deal?.excelUrl && (
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <div className="px-3 py-2 bg-white/5 flex items-center gap-2 text-slate-200">
                    <Table size={16} /> Pro Forma (XLSX)
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div className="text-sm text-slate-300 truncate">{deal.excelUrl.split("/").pop()}</div>
                    <a href={deal.excelUrl} download className="inline-flex items-center gap-1 text-sm text-slate-200 hover:text-white">
                      <FileDown size={14} /> Download
                    </a>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}


