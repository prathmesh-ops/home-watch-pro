import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Camera, ClipboardList, Package, Plus, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { StatCard } from '@/components/ui/stat-card';
import { AlertCard } from '@/components/ui/alert-card';
import { PropertyCard } from '@/components/ui/property-card';
import { QuickAction } from '@/components/ui/quick-action';
import { Button } from '@/components/ui/button';
import { Property, WeatherAlert } from '@/types';

const mockProperties: Property[] = [
  {
    id: '1',
    address: '123 Oak Street, Austin TX',
    type: 'house',
    yearBuilt: 2018,
    conditionScore: 'good',
    photoCount: 24,
    lastUpdated: '2 days ago',
    riskLevel: 'low',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600',
  },
  {
    id: '2',
    address: '456 Pine Ave, Austin TX',
    type: 'condo',
    yearBuilt: 2015,
    conditionScore: 'fair',
    photoCount: 12,
    lastUpdated: '1 week ago',
    riskLevel: 'medium',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
  },
];

const mockAlerts: WeatherAlert[] = [
  {
    id: '1',
    type: 'hail',
    severity: 'high',
    message: 'Severe hail storm expected. Update roof and exterior photos.',
    affectedZip: '78701',
    timestamp: '2h ago',
  },
  {
    id: '2',
    type: 'storm',
    severity: 'medium',
    message: 'Thunderstorm warning in your area. Check property drainage.',
    affectedZip: '78702',
    timestamp: '5h ago',
  },
];

export default function HomeownerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <MobileLayout>
      <div className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-primary px-4 pt-6 pb-8 rounded-b-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-primary-foreground/80 text-sm">Welcome back</p>
              <h1 className="text-xl font-semibold text-primary-foreground">
                {user?.name || 'Homeowner'}
              </h1>
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              title="Properties"
              value="2"
              icon={Building2}
              variant="default"
            />
            <StatCard
              title="Photos"
              value="36"
              icon={Camera}
              trend={{ value: 12, isPositive: true }}
              variant="default"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-4 -mt-4"
        >
          <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-2">
              <QuickAction
                icon={Camera}
                label="Upload"
                onClick={() => navigate('/capture')}
                variant="primary"
              />
              <QuickAction
                icon={Building2}
                label="Properties"
                onClick={() => navigate('/properties')}
              />
              <QuickAction
                icon={ClipboardList}
                label="Checklist"
                onClick={() => navigate('/checklist')}
              />
              <QuickAction
                icon={Package}
                label="Inventory"
                onClick={() => navigate('/inventory')}
              />
            </div>
          </div>
        </motion.div>

        {/* Weather Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Weather Alerts</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </motion.div>

        {/* Recent Properties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Your Properties</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/properties/add')}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="space-y-3">
            {mockProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onPress={() => navigate(`/properties/${property.id}`)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
