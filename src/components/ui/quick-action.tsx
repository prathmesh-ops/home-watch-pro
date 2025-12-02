import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'primary';
}

export function QuickAction({ icon: Icon, label, onClick, variant = 'default' }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors',
        variant === 'primary'
          ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
          : 'bg-card border-border hover:bg-muted/50'
      )}
    >
      <div className={cn(
        'p-3 rounded-full',
        variant === 'primary' 
          ? 'bg-primary-foreground/20' 
          : 'bg-secondary'
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
