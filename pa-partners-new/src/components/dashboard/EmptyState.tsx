import { TrendingUp, FileText, Building2 } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  type: 'investments' | 'distributions' | 'documents' | 'general';
}

export default function EmptyState({ type }: EmptyStateProps) {
  const configs = {
    investments: {
      icon: <Building2 size={64} className="text-slate-600" />,
      title: 'No Active Investments',
      description: 'You haven\'t made any investments yet. Browse our available opportunities to get started.',
      actionLabel: 'View Opportunities',
      actionHref: '/portfolio',
    },
    distributions: {
      icon: <TrendingUp size={64} className="text-slate-600" />,
      title: 'No Distribution History',
      description: 'Distribution payments will appear here once your investments begin generating returns.',
      actionLabel: null,
      actionHref: null,
    },
    documents: {
      icon: <FileText size={64} className="text-slate-600" />,
      title: 'No Documents Available',
      description: 'Tax documents and statements will be available here. K-1s typically arrive by March 15th.',
      actionLabel: null,
      actionHref: null,
    },
    general: {
      icon: <Building2 size={64} className="text-slate-600" />,
      title: 'Welcome to Your Dashboard',
      description: 'Once you make your first investment, you\'ll see your portfolio performance, distributions, and tax documents here.',
      actionLabel: 'Explore Opportunities',
      actionHref: '/portfolio',
    },
  };

  const config = configs[type];

  return (
    <div className="surface rounded-xl p-12 shadow-card text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-4">{config.icon}</div>
        <h3 className="text-xl font-semibold text-white mb-3">{config.title}</h3>
        <p className="text-slate-400 mb-6 leading-relaxed">{config.description}</p>
        {config.actionLabel && config.actionHref && (
          <Link
            href={config.actionHref}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors"
          >
            {config.actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
