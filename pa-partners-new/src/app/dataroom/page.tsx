import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, TrendingUp, Building2 } from "lucide-react";
import { DEALS, computeDealStats } from "@/lib/deals";
import DealCard from "@/components/dataroom/DealCard";
import UpcomingCard from "@/components/dataroom/UpcomingCard";

export const metadata = {
  title: "Investor Data Room",
  description: "Authenticated access to interactive deal materials.",
};

export default async function DataroomPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto py-12 md:py-20">
            <div className="surface rounded-2xl p-8 md:p-12 shadow-card text-center">
              <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">Investor Login Required</h1>
              <p className="text-slate-300 leading-relaxed mb-6">Log in to access full previews and downloads.</p>
              <Link href="/login?next=/dataroom" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-slate-900 px-6 py-3 text-sm font-medium hover:bg-slate-100 transition-colors">
                Login to Continue
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        {/* Inset Header Card */}
        <div className="surface rounded-xl p-6 md:p-7 shadow-card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-3"
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-semibold text-white">Investment Opportunities</h1>
              <p className="text-sm text-slate-400 mt-1">
                Explore current deals available for investment
              </p>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors"
            >
              <Building2 size={16} />
              <span className="hidden sm:inline">My Portfolio</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        {(() => {
          const activeDeals = DEALS.filter(d => d.id !== "south-of-mound");
          const stats = computeDealStats(activeDeals);
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
            {DEALS.filter(d => d.id !== "south-of-mound").map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
            <UpcomingCard />
          </div>
        </div>

        {/* Information Banner - South of Mound Update */}
        <div className="mt-8 surface rounded-xl p-6 border border-amber-400/20 bg-amber-400/5 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-400/10 mt-0.5">
              <TrendingUp size={20} className="text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">South of Mound Update</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We have elected to withdraw our name from negotiations on the South of Mound opportunity. While the asset presented potential, the final terms did not align with our underwriting standards and risk posture. We remain disciplined and focused on opportunities that fit our value‑add strategy and return thresholds.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}


