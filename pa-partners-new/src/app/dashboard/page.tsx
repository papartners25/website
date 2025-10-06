"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { 
  getInvestorProfile, 
  getInvestments, 
  getDistributions, 
  getPortfolioMetrics,
  getTaxDocuments,
  getPropertyPerformance,
  hasInvestorData
} from '@/lib/investor-mock-data';
import type { 
  Investor, 
  Investment, 
  Distribution, 
  PortfolioMetrics,
  TaxDocument,
  PropertyPerformance
} from '@/lib/investor-types';
import MetricCard from '@/components/dashboard/MetricCard';
import InvestmentCard from '@/components/dashboard/InvestmentCard';
import DistributionHistory from '@/components/dashboard/DistributionHistory';
import TaxDocuments from '@/components/dashboard/TaxDocuments';
import PortfolioChart from '@/components/dashboard/PortfolioChart';
import EmptyState from '@/components/dashboard/EmptyState';
import { 
  TrendingUp, 
  DollarSign, 
  Wallet, 
  BarChart3,
  FileText,
  Building2,
  User,
  LogOut,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<'overview' | 'investments' | 'distributions' | 'tax-documents'>('overview');
  const [loading, setLoading] = useState(true);
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [metrics, setMetrics] = useState<PortfolioMetrics | null>(null);
  const [taxDocuments, setTaxDocuments] = useState<TaxDocument[]>([]);
  const [performanceData, setPerformanceData] = useState<PropertyPerformance | null>(null);
  const [showDealsModal, setShowDealsModal] = useState(false);

  useEffect(() => {
    async function checkAuthAndLoadData() {
      try {
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/login');
          return;
        }

        setLoading(true);

        // Use user ID from Supabase session
        const investorId = session.user.id;

        const [
          investorData,
          investmentsData,
          distributionsData,
          metricsData,
          taxDocsData,
          performanceDataResult,
        ] = await Promise.all([
          getInvestorProfile(investorId),
          getInvestments(investorId),
          getDistributions(investorId),
          getPortfolioMetrics(investorId),
          getTaxDocuments(investorId),
          getPropertyPerformance('prop-001'),
        ]);

        setInvestor(investorData);
        setInvestments(investmentsData);
        setDistributions(distributionsData);
        setMetrics(metricsData);
        setTaxDocuments(taxDocsData);
        setPerformanceData(performanceDataResult);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuthAndLoadData();
  }, [router, supabase.auth]);

  // Timed glass popup to promote the data room (once per session)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (loading) return;
    if (sessionStorage.getItem('newDealsModalShown') === 'true') return;
    const timer = setTimeout(() => {
      setShowDealsModal(true);
      sessionStorage.setItem('newDealsModalShown', 'true');
    }, 4500);
    return () => clearTimeout(timer);
  }, [loading]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
          <p className="text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const hasData = hasInvestorData(investments);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Timed Glass Popup for New Deals */}
        {showDealsModal && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60" onClick={() => setShowDealsModal(false)}>
            <div className="surface relative rounded-2xl p-6 md:p-8 shadow-card border border-white/25 max-w-md w-[92%] text-center backdrop-blur-2xl saturate-150" onClick={(e) => e.stopPropagation()}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4">
                <Sparkles className="text-amber-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">New Deal Documents</h3>
              <p className="text-slate-300 mb-5">Jump into the data room to review the latest offering materials.</p>
              <div className="flex items-center justify-center gap-3">
                <Link href="/opportunities" className="px-5 py-2.5 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors">
                  Browse New Deals
                </Link>
                <button onClick={() => setShowDealsModal(false)} className="px-5 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors">
                  Not now
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Dashboard Header */}
        <div className="surface rounded-xl p-5 shadow-card mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">Welcome back, {investor?.name || 'Investor'}</h1>
              <p className="text-sm text-slate-400 mt-1">Member since {investor?.memberSince ? new Date(investor.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/contact" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors">
                <User size={16} />
                <span className="hidden sm:inline">Support</span>
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <BarChart3 size={16} />
              Overview
            </span>
          </button>
          <button
            onClick={() => setActiveTab('investments')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'investments'
                ? 'bg-white text-slate-900'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <Building2 size={16} />
              Investments ({investments.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('distributions')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'distributions'
                ? 'bg-white text-slate-900'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <DollarSign size={16} />
              Distributions
            </span>
          </button>
          <button
            onClick={() => setActiveTab('tax-documents')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'tax-documents'
                ? 'bg-white text-slate-900'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText size={16} />
              Tax Documents
            </span>
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {!hasData ? (
              <EmptyState type="general" />
            ) : (
              <div className="space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    label="Total Invested"
                    value={formatCurrency(metrics?.totalInvested || 0)}
                    icon={<Wallet size={20} />}
                  />
                  <MetricCard
                    label="Current Value"
                    value={formatCurrency(metrics?.currentValue || 0)}
                    change={{ value: 12.5, positive: true }}
                    icon={<TrendingUp size={20} />}
                  />
                  <MetricCard
                    label="Total Distributions"
                    value={formatCurrency(metrics?.totalDistributions || 0)}
                    subtitle="All time"
                    icon={<DollarSign size={20} />}
                  />
                  <MetricCard
                    label="Total Return"
                    value={formatPercentage(metrics?.totalReturnPercentage || 0)}
                    subtitle={formatCurrency(metrics?.totalReturn || 0)}
                    change={{ value: metrics?.totalReturnPercentage || 0, positive: true }}
                    icon={<BarChart3 size={20} />}
                  />
                </div>

                {/* New Deals / Data Room CTA - moved higher */}
                <div className="surface rounded-xl p-8 shadow-card border border-amber-400/20 bg-gradient-to-br from-amber-400/5 to-transparent">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-medium mb-3">
                        <Sparkles size={14} />
                        <span>New Deal Access</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Visit the Data Room</h3>
                      <p className="text-slate-300 leading-relaxed max-w-2xl">
                        Access documents, models, and details for the latest offerings in our data room.
                      </p>
                    </div>
                    <Link
                      href="/dataroom"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                    >
                      Go to Data Room
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                {/* Performance Chart */}
                {performanceData && (
                  <PortfolioChart
                    title="Portfolio Value Over Time"
                    data={performanceData.monthlyData.map((d, idx) => ({
                      month: d.month,
                      value: (metrics?.totalInvested || 0) + (idx * 15000) + Math.random() * 20000,
                    }))}
                    color="#f59e0b"
                  />
                )}

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MetricCard
                    label="Average IRR"
                    value={formatPercentage(metrics?.averageIRR || 0)}
                    subtitle="Internal Rate of Return"
                  />
                  <MetricCard
                    label="Avg Cash-on-Cash"
                    value={formatPercentage(metrics?.averageCashOnCash || 0)}
                    subtitle="Annual yield"
                  />
                  <MetricCard
                    label="Properties"
                    value={metrics?.numberOfProperties || 0}
                    subtitle="Active investments"
                  />
                </div>

                {/* Recent Investments */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Active Investments</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {investments.slice(0, 4).map((investment) => (
                      <InvestmentCard key={investment.id} investment={investment} />
                    ))}
                  </div>
                </div>

                {/* Recent Distributions */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Recent Distributions</h2>
                  <DistributionHistory distributions={distributions.slice(0, 5)} />
                </div>

                {/* New Opportunities CTA moved above; section removed here */}
              </div>
            )}
          </>
        )}

        {/* Investments Tab */}
        {activeTab === 'investments' && (
          <>
            {investments.length === 0 ? (
              <EmptyState type="investments" />
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Your Investments</h2>
                  <div className="flex items-center gap-3">
                    <select className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm">
                      <option>All Properties</option>
                      <option>Multifamily</option>
                      <option>Commercial</option>
                      <option>Mixed-Use</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {investments.map((investment) => (
                    <InvestmentCard key={investment.id} investment={investment} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Distributions Tab */}
        {activeTab === 'distributions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Distribution History</h2>
            </div>
            <DistributionHistory distributions={distributions} />
          </div>
        )}

        {/* Tax Documents Tab */}
        {activeTab === 'tax-documents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Tax Documents</h2>
            </div>
            <TaxDocuments documents={taxDocuments} />
          </div>
        )}
      </div>
    </div>
  );
}
