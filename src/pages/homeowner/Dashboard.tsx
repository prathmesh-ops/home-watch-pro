import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Camera, ClipboardList, Package, Plus, Bell, Shield, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { StatCard } from '@/components/ui/stat-card';
import { AlertCard } from '@/components/ui/alert-card';
import { PropertyCard } from '@/components/ui/property-card';
import { QuickAction } from '@/components/ui/quick-action';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Property, WeatherAlert } from '@/types';

const mockProperties: Property[] = [
  {
    id: '1',
    address: '123 Oak Street, Austin TX',
    type: 'house',
    yearBuilt: 2018,
    conditionScore: 'good',
    photoCount: 24,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600',
    lastUpdated: '2 days ago',
    riskLevel: 'low',
    healthScore: 'good',
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
    healthScore: 'fair',
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
        <div className="relative px-4 pt-6 pb-8">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-b-3xl">
            {/* Animated Background Elements */}
            <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-8 left-8 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-white/8 rounded-full blur-xl" />
          </div>
          
          <div className="relative z-10">
            {/* User Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between mb-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-white/90 text-sm font-medium">Welcome back</p>
                </div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                  {user?.name || 'Homeowner'}
                </h1>
                <p className="text-white/80 text-sm mt-1">Manage your properties with confidence</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/20 backdrop-blur border border-white/30 hover:bg-white/30"
                  onClick={() => navigate('/notifications')}
                >
                  <Bell className="h-5 w-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-2 gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/20 backdrop-blur rounded-2xl p-4 border border-white/30 shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1 bg-green-400/30 rounded-full px-2 py-1">
                    <TrendingUp className="h-3 w-3 text-green-300" />
                    <span className="text-xs text-green-300 font-medium">+82%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">2</p>
                <p className="text-sm text-white/80">Properties</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/20 backdrop-blur rounded-2xl p-4 border border-white/30 shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1 bg-green-400/30 rounded-full px-2 py-1">
                    <TrendingUp className="h-3 w-3 text-green-300" />
                    <span className="text-xs text-green-300 font-medium">+12%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">36</p>
                <p className="text-sm text-white/80">Photos</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-4 mt-2"
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
 {/* Properties Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Your Properties</h2>
              <p className="text-sm text-gray-500 mt-1">Manage and monitor your real estate</p>
            </div>
            <Button 
              onClick={() => navigate('/properties/add')}
              className="bg-primary hover:bg-primary/90 shadow-md"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Property
            </Button>
          </div>
          
          <div className="grid gap-4">
            {mockProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                onClick={() => navigate(`/properties/${property.id}`)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 overflow-hidden"
              >
                {/* Property Header with Image */}
                <div className="relative h-32">
                  <img
                    src={property.image}
                    alt={property.address}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Property Status */}
                  <div className="absolute top-3 right-3">
                    <div className={cn(
                      'px-2 py-1 rounded-full text-xs font-bold backdrop-blur',
                      property.riskLevel === 'low' ? 'bg-green-500/90 text-white' :
                      property.riskLevel === 'medium' ? 'bg-yellow-500/90 text-white' :
                      'bg-red-500/90 text-white'
                    )}>
                      {property.riskLevel.charAt(0).toUpperCase() + property.riskLevel.slice(1)} Risk
                    </div>
                  </div>
                  
                  {/* Property Value */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 backdrop-blur rounded-lg px-2 py-1">
                      <p className="text-xs font-bold text-gray-900">$450,000</p>
                    </div>
                  </div>
                  
                  {/* Property Address */}
                  <div className="absolute bottom-3 left-4">
                    <h3 className="font-bold text-white text-base">{property.address.split(',')[0]}</h3>
                    <p className="text-white/90 text-sm capitalize">{property.type} • Built {property.yearBuilt}</p>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-blue-600">
                        <Camera className="h-4 w-4" />
                        <span className="font-semibold text-lg">{property.photoCount}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Photos</p>
                    </div>
                    <div className="text-center border-x border-gray-200">
                      <div className="flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Active</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Updated</p>
                    </div>
                  </div>
                  
                  {/* Health Score */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Health Score</p>
                        <p className="text-xs text-gray-500">Overall condition</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{property.healthScore}</p>
                      <p className="text-xs text-gray-500">Excellent</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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

       
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
