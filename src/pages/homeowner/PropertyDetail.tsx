import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Camera, Shield, AlertTriangle, ChevronRight, Plus, FileText, DollarSign, User, Clock, Image } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const propertyImages = [
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
];

const photoCategories = [
  { id: 'exterior', label: 'Exterior', count: 8, icon: '🏠', color: 'from-blue-500 to-blue-600' },
  { id: 'interior', label: 'Interior', count: 12, icon: '🛋️', color: 'from-purple-500 to-purple-600' },
  { id: 'roof', label: 'Roof', count: 4, icon: '🏗️', color: 'from-orange-500 to-orange-600' },
  { id: 'damage', label: 'Damage', count: 2, icon: '⚠️', color: 'from-red-500 to-red-600' },
];

const riskIndicators = [
  { id: 'roof', label: 'Roof Condition', status: 'good', detail: 'No issues detected' },
  { id: 'water', label: 'Water Damage', status: 'warning', detail: 'Minor stains detected' },
  { id: 'exterior', label: 'Exterior', status: 'good', detail: 'Well maintained' },
];

const policyDetails = {
  policyNumber: 'POL-2024-123456',
  provider: 'State Farm Insurance',
  premium: '$1,850/year',
  coverage: '$350,000',
  effectiveDate: 'Jan 15, 2024',
  expiryDate: 'Jan 15, 2025',
  agent: 'Sarah Johnson',
};

const timeline = [
  { 
    id: '1', 
    date: '2024-12-01', 
    type: 'photo', 
    title: 'Exterior Photos Updated', 
    description: '8 new photos uploaded', 
    icon: Camera, 
    color: 'bg-blue-500',
    photos: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300',
    ]
  },
  { 
    id: '2', 
    date: '2024-11-28', 
    type: 'inspection', 
    title: 'Annual Inspection', 
    description: 'Property passed inspection', 
    icon: Shield, 
    color: 'bg-green-500' 
  },
  { 
    id: '3', 
    date: '2024-11-15', 
    type: 'document', 
    title: 'Policy Renewed', 
    description: 'Policy renewed for 2025', 
    icon: FileText, 
    color: 'bg-purple-500' 
  },
  { 
    id: '4', 
    date: '2024-10-20', 
    type: 'alert', 
    title: 'Weather Alert', 
    description: 'Storm warning - no damage reported', 
    icon: AlertTriangle, 
    color: 'bg-orange-500' 
  },
  { 
    id: '5', 
    date: '2024-09-10', 
    type: 'photo', 
    title: 'Roof Photos Added', 
    description: '4 photos uploaded', 
    icon: Camera, 
    color: 'bg-blue-500',
    photos: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=300',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300',
    ]
  },
];

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <PageHeader title="Property Details" showBack />

      <div className="flex-1 pb-8">
        {/* Hero Image Carousel */}
        <div className="aspect-[16/10] relative overflow-hidden">
          <img 
            src={propertyImages[0]} 
            alt="Property" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <Badge className="bg-green-500 text-white mb-2 shadow-lg">GOOD CONDITION</Badge>
            <h2 className="text-2xl font-bold text-white">123 Oak Street</h2>
            <div className="flex items-center gap-2 text-white/90 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Austin, TX 78701</span>
            </div>
          </div>
          {/* Image indicators */}
          <div className="absolute bottom-3 right-3 flex gap-1">
            {propertyImages.map((_, idx) => (
              <div key={idx} className={cn("h-1.5 rounded-full", idx === 0 ? "w-6 bg-white" : "w-1.5 bg-white/50")} />
            ))}
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

        {/* Policy Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-4 mt-4"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-blue-700" />
              <h3 className="font-bold text-blue-900">Policy Details</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">Policy Number</p>
                <p className="font-semibold text-blue-900 text-sm">{policyDetails.policyNumber}</p>
              </div>
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">Provider</p>
                <p className="font-semibold text-blue-900 text-sm">{policyDetails.provider}</p>
              </div>
              <div className="bg-white/60 rounded-xl p-3">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-blue-600" />
                  <p className="text-xs text-blue-600 font-medium">Coverage</p>
                </div>
                <p className="font-semibold text-green-700 text-lg">{policyDetails.coverage}</p>
              </div>
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">Premium</p>
                <p className="font-semibold text-blue-900 text-sm">{policyDetails.premium}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-200 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-blue-600 font-medium mb-1">Effective Date</p>
                <p className="text-blue-900 font-medium">{policyDetails.effectiveDate}</p>
              </div>
              <div>
                <p className="text-xs text-blue-600 font-medium mb-1">Expiry Date</p>
                <p className="text-blue-900 font-medium">{policyDetails.expiryDate}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 bg-white/60 rounded-xl p-3">
              <User className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-xs text-blue-600 font-medium">Your Agent</p>
                <p className="text-blue-900 font-semibold">{policyDetails.agent}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Photo Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-foreground">Photo Gallery</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate(`/properties/${id}/photos`)}>
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {photoCategories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + idx * 0.05 }}
                onClick={() => navigate(`/properties/${id}/photos?category=${cat.id}`)}
                className={`bg-gradient-to-br ${cat.color} rounded-2xl p-4 text-left hover:shadow-lg transition-all`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <p className="font-semibold text-white mt-2">{cat.label}</p>
                <p className="text-sm text-white/90">{cat.count} photos</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-foreground">Activity Timeline</h3>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-blue-300 to-gray-200" />
            
            <div className="space-y-4">
              {timeline.map((item, idx) => {
                const Icon = item.icon;
                const hasPhotos = 'photos' in item && item.photos && item.photos.length > 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                    className="relative flex gap-4"
                  >
                    {/* Icon */}
                    <div className={cn("relative z-10 flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center shadow-lg", item.color)}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-white rounded-xl border-2 border-gray-100 p-4 hover:border-primary/30 transition-all">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      
                      {/* Photo Grid - Samsung Style */}
                      {hasPhotos && (
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          {(item as any).photos.map((photo: string, photoIdx: number) => (
                            <motion.div
                              key={photoIdx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 + photoIdx * 0.1 }}
                              className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                              onClick={() => navigate(`/properties/${id}/photos`)}
                            >
                              <img 
                                src={photo} 
                                alt={`Photo ${photoIdx + 1}`}
                                className="w-full h-full object-cover hover:scale-110 transition-transform"
                              />
                            </motion.div>
                          ))}
                          {(item as any).photos.length > 3 && (
                            <div className="aspect-square rounded-lg bg-gray-900/80 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-gray-900/90 transition-colors">
                              +{(item as any).photos.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* AI Risk Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-foreground">AI Risk Analysis</h3>
          </div>
          <div className="space-y-3">
            {riskIndicators.map((risk) => (
              <div
                key={risk.id}
                className="bg-white rounded-xl border-2 border-gray-100 p-4 flex items-center justify-between hover:border-primary/30 transition-all"
              >
                <div>
                  <p className="font-semibold text-foreground">{risk.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{risk.detail}</p>
                </div>
                <Badge
                  className={cn(
                    'font-semibold',
                    risk.status === 'good' && 'bg-green-100 text-green-700 border-green-200',
                    risk.status === 'warning' && 'bg-orange-100 text-orange-700 border-orange-200',
                    risk.status === 'poor' && 'bg-red-100 text-red-700 border-red-200'
                  )}
                >
                  {risk.status.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Button */}
        <div className="px-4 mt-6">
          <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg" onClick={() => navigate('/capture')}>
            <Plus className="h-5 w-5 mr-2" />
            Add New Photos
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
