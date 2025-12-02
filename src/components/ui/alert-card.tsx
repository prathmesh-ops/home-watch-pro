import { AlertTriangle, CloudRain, Wind, Droplets } from 'lucide-react';
import { WeatherAlert } from '@/types';
import { cn } from '@/lib/utils';

const weatherIcons = {
  storm: CloudRain,
  hail: AlertTriangle,
  flood: Droplets,
  wind: Wind,
};

const severityStyles = {
  low: 'border-l-success bg-success/5',
  medium: 'border-l-warning bg-warning/5',
  high: 'border-l-destructive bg-destructive/5',
};

interface AlertCardProps {
  alert: WeatherAlert;
  onPress?: () => void;
}

export function AlertCard({ alert, onPress }: AlertCardProps) {
  const Icon = weatherIcons[alert.type];

  return (
    <button
      onClick={onPress}
      className={cn(
        'w-full text-left p-4 rounded-lg border-l-4 border border-border transition-colors hover:bg-muted/50',
        severityStyles[alert.severity]
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'p-2 rounded-lg',
          alert.severity === 'high' ? 'bg-destructive/10 text-destructive' :
          alert.severity === 'medium' ? 'bg-warning/10 text-warning' :
          'bg-success/10 text-success'
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-foreground capitalize">{alert.type} Alert</span>
            <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{alert.message}</p>
          <p className="text-xs text-muted-foreground mt-1">ZIP: {alert.affectedZip}</p>
        </div>
      </div>
    </button>
  );
}
