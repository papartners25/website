interface MetricCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    positive: boolean;
  };
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function MetricCard({ label, value, change, subtitle, icon }: MetricCardProps) {
  return (
    <div className="surface rounded-xl p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
          {change && (
            <div className="mt-2 flex items-center gap-1">
              <span className={`text-xs font-medium ${change.positive ? 'text-green-400' : 'text-red-400'}`}>
                {change.positive ? '↑' : '↓'} {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-slate-400">vs last quarter</span>
            </div>
          )}
        </div>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
    </div>
  );
}
