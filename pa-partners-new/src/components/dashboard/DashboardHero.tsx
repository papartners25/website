"use client";

import { Sparkles, BarChart3, Clock } from "lucide-react";
import { DEALS, computeDealStats } from "@/lib/deals";

type DashboardHeroProps = {
  investorName?: string | null;
  memberSince?: string | Date | null;
};

export default function DashboardHero({ investorName, memberSince }: DashboardHeroProps) {
  const stats = computeDealStats(DEALS);

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
              <Sparkles size={14} />
              {stats.availableDeals} open deal{stats.availableDeals === 1 ? "" : "s"}
            </span>
            {stats.irrRange && (
              <>
                <span className="text-slate-500">•</span>
                <span className="inline-flex items-center gap-1 text-slate-300">
                  <BarChart3 size={14} className="opacity-80" />
                  IRR {stats.irrRange.min.toFixed(1)}%–{stats.irrRange.max.toFixed(1)}%
                </span>
              </>
            )}
            {stats.holdRange && (
              <>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">Hold {stats.holdRange.min}–{stats.holdRange.max} yrs</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


