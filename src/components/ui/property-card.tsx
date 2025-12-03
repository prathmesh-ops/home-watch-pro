import { Building2, Camera, MapPin, ChevronRight } from 'lucide-react';
import { Property } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: Property;
  onPress?: () => void;
}

const conditionStyles = {
  good: 'bg-success/10 text-success',
  fair: 'bg-warning/10 text-warning',
  poor: 'bg-destructive/10 text-destructive',
};

const riskStyles = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function PropertyCard({ property, onPress }: PropertyCardProps) {
  return (
    <button
      onClick={onPress}
      className="w-full text-left bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors"
    >
      <div className="aspect-[16/9] bg-muted relative">
        {(property.image || property.thumbnail) ? (
          <img
            src={property.image || property.thumbnail}
            alt={property.address}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        {property.conditionScore && (
          <Badge className={cn(
            'absolute top-2 right-2 text-xs',
            conditionStyles[property.conditionScore]
          )}>
            {property.conditionScore.toUpperCase()}
          </Badge>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{property.address}</h3>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-sm capitalize">{property.type}</span>
              <span className="mx-1">•</span>
              <span className="text-sm">{property.yearBuilt}</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Camera className="h-4 w-4" />
            <span>{property.photoCount} photos</span>
          </div>
          {property.riskLevel && (
            <Badge variant="outline" className={cn('text-xs', riskStyles[property.riskLevel])}>
              {property.riskLevel} risk
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
