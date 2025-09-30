import { Investment } from '@/lib/investor-types';
import { Building2, TrendingUp } from 'lucide-react';

interface InvestmentCardProps {
  investment: Investment;
}

export default function InvestmentCard({ investment }: InvestmentCardProps) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'pending':
        return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'exited':
        return 'bg-slate-400/10 text-slate-400 border-slate-400/20';
      default:
        return 'bg-slate-400/10 text-slate-400 border-slate-400/20';
    }
  };

  return (
    <div className="surface rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-white/5">
            <Building2 size={24} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{investment.propertyName}</h3>
            <p className="text-sm text-slate-400 mt-0.5">{investment.propertyAddress}</p>
            <p className="text-xs text-slate-500 mt-1 capitalize">{investment.propertyType.replace('-', ' ')}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(investment.status)}`}>
          {investment.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-400">Investment Amount</p>
          <p className="text-base font-semibold text-white mt-1">{formatCurrency(investment.investmentAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Current Value</p>
          <p className="text-base font-semibold text-white mt-1">{formatCurrency(investment.currentValue)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Ownership</p>
          <p className="text-base font-semibold text-white mt-1">{formatPercentage(investment.ownershipPercentage)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Total Return</p>
          <div className="flex items-center gap-1.5 mt-1">
            <p className="text-base font-semibold text-green-400">{formatCurrency(investment.totalReturn)}</p>
            <TrendingUp size={14} className="text-green-400" />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-slate-400">IRR</p>
            <p className="text-sm font-semibold text-white mt-1">{formatPercentage(investment.irr)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Cash-on-Cash</p>
            <p className="text-sm font-semibold text-white mt-1">{formatPercentage(investment.cashOnCash)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Return</p>
            <p className="text-sm font-semibold text-green-400 mt-1">+{formatPercentage(investment.returnPercentage)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
