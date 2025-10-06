"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { DEALS } from "@/lib/deals";
import DealCard from "@/components/dataroom/DealCard";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Building2 } from "lucide-react";

export default function OpportunitiesPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push("/login");
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router, supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
          <p className="text-slate-400">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <>
      <div className="surface border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-6">
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
      </div>

      <Section>
        <Container>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="surface rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-400/10">
                  <Building2 size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Available Deals</p>
                  <p className="text-2xl font-semibold text-white">{DEALS.length}</p>
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
                  <p className="text-2xl font-semibold text-white">15-18%</p>
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
                  <p className="text-2xl font-semibold text-white">3-5 years</p>
                </div>
              </div>
            </div>
          </div>

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
                <DealCard key={deal.id} deal={deal} />
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

          {/* Information Banner */}
          <div className="mt-8 surface rounded-xl p-6 border border-amber-400/20 bg-amber-400/5">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-amber-400/10 mt-0.5">
                <TrendingUp size={20} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">Investment Process</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  Review the executive summary and pro forma for each opportunity. When you&apos;re ready 
                  to proceed, download the full offering memorandum or reach out to discuss investment terms.
                </p>
                <Link 
                  href="/contact" 
                  className="text-sm text-amber-400 hover:text-amber-300 font-medium"
                >
                  Questions? Contact our investment team →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
