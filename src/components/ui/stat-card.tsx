import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent' | 'warning';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-primary/10',
  accent: 'bg-accent/10',
  warning: 'bg-warning/10',
};

const iconVariantStyles = {
  default: 'bg-secondary text-foreground',
  primary: 'bg-primary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
  warning: 'bg-warning text-warning-foreground',
};

export function StatCard({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  return (
    <div className={cn(
      'rounded-xl p-4 border border-border',
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          {title !== 'Properties' && trend && (
            <p className={cn(
              'text-xs mt-1 font-medium',
              trend.isPositive ? 'text-success' : 'text-destructive'
            )}>
              {trend.isPositive ? '+' : ''}{trend.value}% from last month
            </p>
          )}
          {title === 'Properties' && (
            <span className="text-xs text-green-800 bg-green-300/10 mt-1 border border-primary/10 rounded-full px-1 py-1 font-medium text-muted-foreground">
              Avg. Health Score:{trend.value} 
            </span>
          )}
        </div>
        <div className={cn(
          'p-2.5 rounded-lg',
          iconVariantStyles[variant]
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
