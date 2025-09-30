"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  DollarSign, 
  Building2, 
  BarChart3,
  Eye,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function PortalPreview() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative my-8 lg:my-12">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-medium mb-4">
          <Sparkles size={16} />
          <span>Coming Soon</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Your Investor Portal
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Track your investments, monitor performance, and access tax documents—all in one place.
        </p>
      </div>

      {/* Glass Preview Window */}
      <div 
        className={`relative transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-blue-500/20 blur-3xl -z-10" />
        
        {/* Glass Container */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-2xl">
          {/* Preview Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <div className="ml-4 flex items-center gap-2 text-slate-400 text-sm">
                <Eye size={14} />
                <span>Preview Mode</span>
              </div>
            </div>
            <div className="text-xs text-slate-500 font-mono">investor-portal.papartners.co</div>
          </div>

          {/* Dashboard Preview Content */}
          <div className="p-6 md:p-8">
            {/* Simulated Welcome Banner */}
            <div className="surface rounded-xl p-5 mb-6 bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-7 w-48 bg-gradient-to-r from-white/20 to-white/10 rounded mb-2 animate-pulse" />
                  <div className="h-4 w-32 bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-white/10 rounded animate-pulse" />
                  <div className="h-8 w-20 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Simulated Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricPreviewCard 
                icon={<DollarSign size={18} />}
                label="Total Invested"
                value="$1.85M"
                color="text-blue-400"
              />
              <MetricPreviewCard 
                icon={<TrendingUp size={18} />}
                label="Current Value"
                value="$2.18M"
                color="text-green-400"
                badge="+18%"
              />
              <MetricPreviewCard 
                icon={<BarChart3 size={18} />}
                label="Distributions"
                value="$127K"
                color="text-amber-400"
              />
              <MetricPreviewCard 
                icon={<Building2 size={18} />}
                label="Properties"
                value="4"
                color="text-purple-400"
              />
            </div>

            {/* Simulated Chart Area */}
            <div className="surface rounded-xl p-5 mb-6 bg-white/[0.03] border border-white/10">
              <div className="h-4 w-40 bg-gradient-to-r from-white/20 to-white/10 rounded mb-4" />
              <div className="relative h-48">
                {/* Simplified Chart Lines */}
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 150 Q 50 140, 100 120 T 200 100 T 300 80 T 400 60"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M 0 150 Q 50 140, 100 120 T 200 100 T 300 80 T 400 60 L 400 200 L 0 200 Z"
                    fill="url(#chartGradient)"
                    className="opacity-50"
                  />
                </svg>
              </div>
            </div>

            {/* Simulated Investment Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InvestmentPreviewCard 
                name="Broadway Court Apartments"
                type="Multifamily"
                amount="$750K"
                return="+18.9%"
              />
              <InvestmentPreviewCard 
                name="South of Mound Mixed-Use"
                type="Commercial"
                amount="$1.1M"
                return="+16.8%"
              />
            </div>
          </div>

          {/* Overlay Gradient for Fade Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
          
          {/* Center Call to Action */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center pointer-events-auto">
              <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl backdrop-blur-xl bg-slate-950/80 border border-white/20 shadow-2xl">
                <div className="p-3 rounded-full bg-amber-400/10 border border-amber-400/20">
                  <Eye size={32} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Experience Full Access
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 max-w-xs">
                    Login to view your complete portfolio, distributions, and performance metrics
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl"
                  >
                    Access Portal
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <FeatureCard
          icon={<BarChart3 size={24} />}
          title="Real-Time Performance"
          description="Monitor your portfolio value, IRR, and cash-on-cash returns with live data integration"
        />
        <FeatureCard
          icon={<DollarSign size={24} />}
          title="Distribution Tracking"
          description="View payment history, upcoming distributions, and export records for tax filing"
        />
        <FeatureCard
          icon={<Building2 size={24} />}
          title="Investment Details"
          description="Access property performance metrics, documents, and detailed financial reports"
        />
      </div>
    </div>
  );
}

interface MetricPreviewCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  badge?: string;
}

function MetricPreviewCard({ icon, label, value, color, badge }: MetricPreviewCardProps) {
  return (
    <div className="surface rounded-lg p-4 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className={`${color} opacity-80`}>{icon}</div>
        {badge && (
          <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

interface InvestmentPreviewCardProps {
  name: string;
  type: string;
  amount: string;
  return: string;
}

function InvestmentPreviewCard({ name, type, amount, return: returnValue }: InvestmentPreviewCardProps) {
  return (
    <div className="surface rounded-lg p-4 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded bg-amber-400/10">
          <Building2 size={20} className="text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white truncate">{name}</h4>
          <p className="text-xs text-slate-400">{type}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
        <div>
          <p className="text-xs text-slate-400">Investment</p>
          <p className="text-sm font-semibold text-white">{amount}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Return</p>
          <p className="text-sm font-semibold text-green-400">{returnValue}</p>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="surface rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-amber-400/10">
          <div className="text-amber-400">{icon}</div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
