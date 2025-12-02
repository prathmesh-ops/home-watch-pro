import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, AlertTriangle, Camera, ChevronRight } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mockProperties = [
  { id: '1', address: '123 Oak Street', client: 'Jane Doe', photoCount: 24, riskLevel: 'low', pendingPhotos: 0 },
  { id: '2', address: '456 Pine Ave', client: 'John Smith', photoCount: 12, riskLevel: 'medium', pendingPhotos: 3 },
  { id: '3', address: '789 Maple Dr', client: 'Alice Johnson', photoCount: 18, riskLevel: 'high', pendingPhotos: 5 },
  { id: '4', address: '321 Cedar Lane', client: 'Bob Wilson', photoCount: 8, riskLevel: 'low', pendingPhotos: 2 },
];

const riskStyles = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function AgentProperties() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = mockProperties.filter(p =>
    p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout>
      <PageHeader
        title="Properties"
        subtitle={`${mockProperties.length} total`}
      />

      <div className="flex-1 pb-24">
        {/* Search & Filters */}
        <div className="px-4 py-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties or clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              All
            </Button>
            <Button variant="outline" size="sm" className="text-warning border-warning/30">
              <AlertTriangle className="h-4 w-4 mr-1" />
              At Risk
            </Button>
            <Button variant="outline" size="sm">
              Pending
            </Button>
          </div>
        </div>

        {/* Properties List */}
        <div className="px-4 space-y-3">
          {filteredProperties.map((property, index) => (
            <motion.button
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => navigate(`/agent/properties/${property.id}`)}
              className="w-full bg-card rounded-xl border border-border p-4 text-left hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">{property.address}</h3>
                  <p className="text-sm text-muted-foreground">{property.client}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Camera className="h-3.5 w-3.5" />
                      {property.photoCount} photos
                    </div>
                    {property.pendingPhotos > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {property.pendingPhotos} pending
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className={cn('text-xs', riskStyles[property.riskLevel])}>
                    {property.riskLevel} risk
                  </Badge>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
