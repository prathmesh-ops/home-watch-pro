import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Camera, Shield, AlertTriangle, ChevronRight, Plus } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const photoCategories = [
  { id: 'exterior', label: 'Exterior', count: 8, icon: '🏠' },
  { id: 'interior', label: 'Interior', count: 12, icon: '🛋️' },
  { id: 'roof', label: 'Roof', count: 4, icon: '🏗️' },
  { id: 'damage', label: 'Damage', count: 2, icon: '⚠️' },
];

const riskIndicators = [
  { id: 'roof', label: 'Roof Condition', status: 'good', detail: 'No issues detected' },
  { id: 'water', label: 'Water Damage', status: 'warning', detail: 'Minor stains detected' },
  { id: 'exterior', label: 'Exterior', status: 'good', detail: 'Well maintained' },
];

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <PageHeader title="Property Details" showBack />

      <div className="flex-1 pb-8">
        {/* Hero Image */}
        <div className="aspect-[16/10] bg-muted relative">
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Badge className="bg-success/90 text-success-foreground mb-2">GOOD</Badge>
            <h2 className="text-xl font-semibold text-primary-foreground">123 Oak Street</h2>
            <div className="flex items-center gap-1 text-primary-foreground/80 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Austin, TX 78701</span>
            </div>
          </div>
        </div>

        {/* Property Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-4"
        >
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium text-foreground capitalize">House</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-sm text-muted-foreground">Year Built</p>
                <p className="font-medium text-foreground">2018</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Policy</p>
                <p className="font-medium text-foreground">Active</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Photo Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Photos</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate(`/properties/${id}/photos`)}>
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {photoCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/properties/${id}/photos?category=${cat.id}`)}
                className="bg-card rounded-xl border border-border p-4 text-left hover:border-primary/30 transition-colors"
              >
                <span className="text-2xl">{cat.icon}</span>
                <p className="font-medium text-foreground mt-2">{cat.label}</p>
                <p className="text-sm text-muted-foreground">{cat.count} photos</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* AI Risk Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">AI Risk Analysis</h3>
          </div>
          <div className="space-y-2">
            {riskIndicators.map((risk) => (
              <div
                key={risk.id}
                className="bg-card rounded-lg border border-border p-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">{risk.label}</p>
                  <p className="text-sm text-muted-foreground">{risk.detail}</p>
                </div>
                <Badge
                  className={cn(
                    risk.status === 'good' && 'bg-success/10 text-success',
                    risk.status === 'warning' && 'bg-warning/10 text-warning',
                    risk.status === 'poor' && 'bg-destructive/10 text-destructive'
                  )}
                >
                  {risk.status}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Button */}
        <div className="px-4 mt-6">
          <Button className="w-full" onClick={() => navigate('/capture')}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Photos
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
