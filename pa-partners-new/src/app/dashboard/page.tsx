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
import DashboardHero from '@/components/dashboard/DashboardHero';
import IntegrationConnectModal from '@/components/dashboard/IntegrationConnectModal';
import { 
  TrendingUp, 
  DollarSign, 
  Wallet, 
  BarChart3,
  FileText,
  Building2,
  User,
  Sparkles,
  Shield,
  KeyRound,
  PlugZap
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [integrationsUnlocked, setIntegrationsUnlocked] = useState(false);
  const [unlockInput, setUnlockInput] = useState('');
  const [activeService, setActiveService] = useState<null | 'quickbooks' | 'appfolio' | 'stripe' | 'docusign' | 'gdrive' | 'snowflake'>(null);

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

        // Overlay Supabase profile data (server-authoritative) over mock profile
        let nameFromDb: string | undefined;
        let emailFromDb: string | undefined;
        let createdAtFromDb: string | undefined;
        try {
          const { data: profileRow } = await supabase
            .from('investor_profiles')
            .select('full_name,email,created_at')
            .eq('id', investorId)
            .single();
          nameFromDb = profileRow?.full_name as string | undefined;
          emailFromDb = profileRow?.email as string | undefined;
          createdAtFromDb = profileRow?.created_at as string | undefined;
        } catch {}

        const computedIsAdmin = (emailFromDb || investorData?.email || '').toLowerCase() === 'invest@papartners.co';
        setIsAdmin(computedIsAdmin);

        setInvestor({
          id: investorData?.id || investorId,
          name: nameFromDb || investorData?.name || 'Investor',
          email: emailFromDb || investorData?.email || '',
          phone: investorData?.phone,
          entityName: investorData?.entityName,
          taxId: investorData?.taxId,
          totalCommitment: investorData?.totalCommitment || 0,
          fundsDeployed: investorData?.fundsDeployed || 0,
          availableCapital: investorData?.availableCapital || 0,
          memberSince: investorData?.memberSince || createdAtFromDb || new Date().toISOString(),
        });

        // For non-admin investors, hide demo/mock portfolio data
        if (!computedIsAdmin) {
          setInvestments([]);
          setDistributions([]);
          setMetrics(null);
          setTaxDocuments([]);
          setPerformanceData(null);
        }
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

  // Timed glass popup to promote new deals (once per session for investors)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (loading) return;
    const storageKey = 'investorDealsModalShown_v1';
    if (sessionStorage.getItem(storageKey) === 'true') return;
    const timer = setTimeout(() => {
      setShowDealsModal(true);
      sessionStorage.setItem(storageKey, 'true');
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
  // Restore admin integrations unlock per session
  if (typeof window !== 'undefined' && isAdmin && !integrationsUnlocked) {
    const persisted = sessionStorage.getItem('admin_integrations_unlocked_v1');
    if (persisted === 'true') setIntegrationsUnlocked(true);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Timed Glass Popup for New Deals */}
        {showDealsModal && (
          <div className="fixed inset-0 z-40 flex items-center justify-center px-4" onClick={() => setShowDealsModal(false)}>
            <button aria-label="Close modal overlay" className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 surface rounded-2xl p-6 md:p-8 shadow-card border border-white/25 max-w-md w-full text-center backdrop-blur-2xl saturate-150" onClick={(e) => e.stopPropagation()}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4">
                <Sparkles className="text-amber-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">New Deal Documents</h3>
              <p className="text-slate-300 mb-5">Jump into the data room to review the latest offering materials.</p>
              <div className="flex items-center justify-center gap-3">
                <Link href="/dataroom" className="px-5 py-2.5 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors">
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
          <div className="flex items-center justify-between gap-4">
            <DashboardHero investorName={investor?.name} memberSince={investor?.memberSince ?? null} />
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/dataroom"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors shadow hover:shadow-md"
              >
                <span className="truncate max-w-[10rem]">Browse New Deals</span>
                <Sparkles size={16} className="text-amber-500 shrink-0" />
              </Link>
              <Link
                href="/dataroom"
                className="sm:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors shadow hover:shadow-md"
                aria-label="Browse New Deals"
                title="Browse New Deals"
              >
                <Sparkles size={16} className="text-amber-500" />
                <span className="truncate max-w-[7rem]">New Deals</span>
              </Link>
              <Link href="/contact" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors">
                <User size={16} />
                <span className="hidden sm:inline">Support</span>
              </Link>
            </div>
          </div>
          {/* Admin-only Integrations Unlock */}
          {isAdmin && (
            <div className="mt-4 border-t border-white/5 pt-4">
              {!integrationsUnlocked ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs">
                    <KeyRound size={14} />
                    <span>Owner Integrations</span>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      value={unlockInput}
                      onChange={(e) => setUnlockInput(e.target.value)}
                      placeholder="Enter unlock code"
                      className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white placeholder-slate-400"
                    />
                    <button
                      onClick={() => {
                        if (unlockInput.trim() === 'seekingALPHA6-') {
                          setIntegrationsUnlocked(true);
                          sessionStorage.setItem('admin_integrations_unlocked_v1', 'true');
                        }
                      }}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100"
                    >
                      Unlock
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {/* QuickBooks */}
                  <div className="surface rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PlugZap size={16} className="text-emerald-400" />
                        <span className="text-white text-sm font-medium">QuickBooks</span>
                      </div>
                      <span className="text-xs text-slate-400">Accounting</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">Sync distributions, journal entries, and investor statements.</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setActiveService('quickbooks')} className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100">Connect</button>
                      <button className="px-3 py-1.5 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20">Docs</button>
                    </div>
                  </div>
                  {/* AppFolio */}
                  <div className="surface rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PlugZap size={16} className="text-amber-400" />
                        <span className="text-white text-sm font-medium">AppFolio</span>
                      </div>
                      <span className="text-xs text-slate-400">Property Mgmt</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">Import rent rolls, occupancy, and property performance metrics.</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setActiveService('appfolio')} className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100">Connect</button>
                      <button className="px-3 py-1.5 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20">Docs</button>
                    </div>
                  </div>
                  {/* Stripe */}
                  <div className="surface rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PlugZap size={16} className="text-indigo-400" />
                        <span className="text-white text-sm font-medium">Stripe</span>
                      </div>
                      <span className="text-xs text-slate-400">Payments</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">Sync capital calls, distribution payouts, and ACH details.</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setActiveService('stripe')} className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100">Connect</button>
                      <button className="px-3 py-1.5 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20">Docs</button>
                    </div>
                  </div>
                  {/* DocuSign */}
                  <div className="surface rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PlugZap size={16} className="text-yellow-300" />
                        <span className="text-white text-sm font-medium">DocuSign</span>
                      </div>
                      <span className="text-xs text-slate-400">Documents</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">Automate subscription docs and K‑1 distribution acknowledgements.</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setActiveService('docusign')} className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100">Connect</button>
                      <button className="px-3 py-1.5 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20">Docs</button>
                    </div>
                  </div>
                  {/* Google Drive */}
                  <div className="surface rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PlugZap size={16} className="text-sky-400" />
                        <span className="text-white text-sm font-medium">Google Drive</span>
                      </div>
                      <span className="text-xs text-slate-400">Storage</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">Sync data room folders and share investor-ready documents.</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setActiveService('gdrive')} className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100">Connect</button>
                      <button className="px-3 py-1.5 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20">Docs</button>
                    </div>
                  </div>
                  {/* Snowflake (future) */}
                  <div className="surface rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PlugZap size={16} className="text-cyan-300" />
                        <span className="text-white text-sm font-medium">Snowflake</span>
                      </div>
                      <span className="text-xs text-slate-400">Data Warehouse</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">Centralize deal data and analytics for AI/BI workflows.</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setActiveService('snowflake')} className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100">Connect</button>
                      <button className="px-3 py-1.5 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20">Docs</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {activeService && (
          <IntegrationConnectModal service={activeService} onClose={() => setActiveService(null)} />
        )}
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
              <>
                {!isAdmin && (
                  <div className="surface rounded-xl p-6 shadow-card border border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-amber-400/10">
                        <Shield size={18} className="text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1">Welcome to the Investor Portal</h3>
                        <p className="text-sm text-slate-300">
                          Your portfolio will populate after your first investment is onboarded. In the meantime, you can browse current opportunities and request access to the data room.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                          <Link href="/dataroom" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors">
                            Browse New Deals
                          </Link>
                          <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors">
                            Contact Support
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <EmptyState type="general" />
              </>
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

                {/* Deals CTA integrated in DashboardHero; removed standalone block */}

                {/* Performance Chart */}
                {performanceData && metrics ? (
                  <PortfolioChart
                    title="Portfolio Value Over Time"
                    data={performanceData.monthlyData.map((d, idx) => ({
                      month: d.month,
                      value: (metrics?.totalInvested || 0) + (idx * 15000) + Math.random() * 20000,
                    }))}
                    color="#f59e0b"
                  />
                ) : null}

                {/* Additional Metrics */}
                {metrics ? (
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
                ) : null}

                {/* Recent Investments */}
                {investments.length > 0 ? (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Active Investments</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {investments.slice(0, 4).map((investment) => (
                        <InvestmentCard key={investment.id} investment={investment} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="surface rounded-xl p-8 shadow-card text-center">
                    <h3 className="text-lg font-medium text-white mb-2">No Active Investments Yet</h3>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto mb-4">Your first investment will appear here once paperwork is completed and funded.</p>
                    <Link href="/dataroom" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors">Explore Opportunities</Link>
                  </div>
                )}

                {/* Recent Distributions */}
                {distributions.length > 0 ? (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Distributions</h2>
                    <DistributionHistory distributions={distributions.slice(0, 5)} />
                  </div>
                ) : null}

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
