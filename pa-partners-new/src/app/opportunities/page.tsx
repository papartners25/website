"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { DEALS, computeDealStats } from "@/lib/deals";
import DealCard from "@/components/dataroom/DealCard";
import Link from "next/link";
import { TrendingUp, Building2, Mail } from "lucide-react";
import PortalPreview from "@/components/common/PortalPreview";

export default function OpportunitiesPage() {

  return (
    <>
      <Section>
        <Container>
          {/* Inset Header Card */}
          <div className="surface rounded-xl p-6 md:p-7 shadow-card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">Investment Opportunities</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Explore current deals available for investment
                </p>
              </div>
              <a
                href="mailto:invest@papartners.co?subject=Investment%20Inquiry"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                aria-label="Email Investment Inquiry"
                onClick={(e) => {
                  // Force Chrome to invoke the OS/mail client
                  try {
                    e.preventDefault();
                    window.location.href = "mailto:invest@papartners.co?subject=Investment%20Inquiry";
                  } catch {}
                }}
              >
                <Mail size={16} />
                <span className="hidden sm:inline">Email Investment Team</span>
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          {(() => {
            const stats = computeDealStats(DEALS);
            const irrText = stats.irrRange ? `${stats.irrRange.min.toFixed(0)}-${stats.irrRange.max.toFixed(0)}%` : "—";
            const holdText = stats.holdRange ? `${stats.holdRange.min}-${stats.holdRange.max} years` : "—";
            return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="surface rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-400/10">
                  <Building2 size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Available Deals</p>
                  <p className="text-2xl font-semibold text-white">{stats.availableDeals}</p>
                </div>
              </div>
            </div>
            <div className="surface rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-400/10">
                  <TrendingUp size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Avg Target IRR</p>
                  <p className="text-2xl font-semibold text-white">{irrText}</p>
                </div>
              </div>
            </div>
            <div className="surface rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-400/10">
                  <TrendingUp size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Hold Period</p>
                  <p className="text-2xl font-semibold text-white">{holdText}</p>
                </div>
              </div>
            </div>
          </div>
            );
          })()}

          {/* Deal Cards */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Current Opportunities</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Review detailed summaries, financial models, and investment terms
                </p>
              </div>
              <select className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm">
                <option>All Property Types</option>
                <option>Multifamily</option>
                <option>Commercial</option>
                <option>Mixed-Use</option>
              </select>
            </div>

            <div className="grid gap-4">
              {DEALS.map((deal) => (
                <DealCard key={deal.id} deal={deal} isPublic />
              ))}
            </div>

            {DEALS.length === 0 && (
              <div className="surface rounded-xl p-12 text-center shadow-card">
                <Building2 size={48} className="mx-auto text-slate-600 mb-3" />
                <h3 className="text-lg font-medium text-white mb-2">No Active Opportunities</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                  There are currently no new investment opportunities available. Check back soon or contact us for upcoming deals.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors"
                >
                  Get Notified
                </Link>
              </div>
            )}
          </div>

          {/* Information Banner - Broadway Courts Update */}
          <div className="mt-8 surface rounded-xl p-6 border border-amber-400/20 bg-amber-400/5 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-amber-400/10 mt-0.5">
                <TrendingUp size={20} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">Broadway Courts Update</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  After extensive due diligence on the Broadway Courts property, we&apos;ve made the strategic decision to step away from that transaction. While the fundamentals were solid, competitive bidding pushed pricing beyond our underwriting standards, and our diligence uncovered structural and operational complications that would have added execution risk and capital requirements beyond our initial projections. We remain disciplined in our approach and won&apos;t chase deals that compromise our return thresholds or risk profile.
                </p>
              </div>
            </div>
          </div>

          {/* Public Page Only: Investor Portal Preview */}
          <div className="max-w-4xl mx-auto">
            <PortalPreview />
          </div>
        </Container>
      </Section>
    </>
  );
}
