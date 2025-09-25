"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DataroomPrompt({ delayMs = 5000 }: { delayMs?: number }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show only once per session and only if user hasn't visited the dataroom
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem("dataroomPromptDismissed") === "1";
      const visited = sessionStorage.getItem("dataroomVisited") === "1";
      if (dismissed || visited) return;
    }
    const id = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(id);
  }, [delayMs]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button aria-label="Close modal overlay" className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
      <div className="relative z-10 w-full max-w-md rounded-2xl p-6 shadow-card bg-white/20 border border-white/25 backdrop-blur-2xl saturate-150">
        <h3 className="text-lg font-medium text-white">Visit our Real Estate Dataroom?</h3>
        <p className="mt-2 text-sm text-slate-300">
          Explore current opportunities with expandable summaries, PDF previews, and downloadable pro formas.
        </p>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
            onClick={() => {
              if (typeof window !== "undefined") sessionStorage.setItem("dataroomPromptDismissed", "1");
              setOpen(false);
            }}
          >
            Not now
          </button>
          <Link
            href="/dataroom"
            className="inline-flex items-center rounded-lg bg-white text-slate-900 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
            onClick={() => {
              if (typeof window !== "undefined") sessionStorage.setItem("dataroomVisited", "1");
              setOpen(false);
            }}
          >
            Visit Dataroom
          </Link>
        </div>
      </div>
    </div>
  );
}


