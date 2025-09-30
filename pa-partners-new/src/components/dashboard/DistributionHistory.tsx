import { Distribution } from '@/lib/investor-types';
import { Download, CheckCircle, Clock, RefreshCw } from 'lucide-react';

interface DistributionHistoryProps {
  distributions: Distribution[];
}

export default function DistributionHistory({ distributions }: DistributionHistoryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'pending':
        return <Clock size={16} className="text-amber-400" />;
      case 'processing':
        return <RefreshCw size={16} className="text-blue-400 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-400';
      case 'pending':
        return 'text-amber-400';
      case 'processing':
        return 'text-blue-400';
      default:
        return 'text-slate-400';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (distributions.length === 0) {
    return (
      <div className="surface rounded-xl p-8 shadow-card text-center">
        <Download size={48} className="mx-auto text-slate-600 mb-3" />
        <h3 className="text-lg font-medium text-white mb-2">No Distributions Yet</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Distribution history will appear here once your investments begin generating returns.
        </p>
      </div>
    );
  }

  const totalDistributions = distributions.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="surface rounded-xl shadow-card">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Distribution History</h3>
            <p className="text-sm text-slate-400 mt-0.5">
              Total received: {formatCurrency(totalDistributions)}
            </p>
          </div>
          <button className="px-3 py-1.5 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors">
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Property
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Period
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-5 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {distributions.map((distribution) => (
              <tr key={distribution.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4 text-sm text-slate-300">
                  {formatDate(distribution.distributionDate)}
                </td>
                <td className="px-5 py-4 text-sm text-white font-medium">
                  {distribution.propertyName}
                </td>
                <td className="px-5 py-4 text-sm text-slate-300">
                  {distribution.period}
                </td>
                <td className="px-5 py-4 text-sm text-slate-400">
                  {getTypeLabel(distribution.type)}
                </td>
                <td className="px-5 py-4 text-sm text-right font-semibold text-green-400">
                  {formatCurrency(distribution.amount)}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-1.5">
                    {getStatusIcon(distribution.status)}
                    <span className={`text-xs font-medium capitalize ${getStatusColor(distribution.status)}`}>
                      {distribution.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
