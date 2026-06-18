"use client";

import { Clock, FileLock2, ShieldCheck } from "lucide-react";

type DashboardHeroProps = {
  investorName?: string | null;
  memberSince?: string | Date | null;
};

export default function DashboardHero({ investorName, memberSince }: DashboardHeroProps) {
  const formattedMemberSince = (() => {
    if (!memberSince) return null;
    try {
      const d = typeof memberSince === "string" ? new Date(memberSince) : memberSince;
      return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } catch {
      return null;
    }
  })();

  return (
    <div className="min-w-0">
      <div className="flex items-start gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-white truncate">
            Welcome back, {investorName || "Investor"}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
            {formattedMemberSince && (
              <span className="text-slate-400 inline-flex items-center gap-1">
                <Clock size={14} className="opacity-70" />
                Member since {formattedMemberSince}
              </span>
            )}
            <span className="text-slate-500">•</span>
            <span className="inline-flex items-center gap-1 text-amber-400">
              <ShieldCheck size={14} />
              Portal access active
            </span>
            <span className="text-slate-500">•</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <FileLock2 size={14} className="opacity-80" />
              Private materials when available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

