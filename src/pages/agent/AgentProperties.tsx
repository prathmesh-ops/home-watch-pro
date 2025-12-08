import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, AlertTriangle, Camera, ChevronRight, Home, MapPin, Calendar } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mockProperties = [
  { 
    id: '1', 
    address: '123 Oak Street, Austin TX', 
    client: 'Jane Doe', 
    photoCount: 24, 
    riskLevel: 'low', 
    pendingPhotos: 0,
    type: 'House',
    yearBuilt: 2018,
    lastUpdated: '2 days ago',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600',
    value: '$450,000'
  },
  { 
    id: '2', 
    address: '456 Pine Ave, Austin TX', 
    client: 'John Smith', 
    photoCount: 12, 
    riskLevel: 'medium', 
    pendingPhotos: 3,
    type: 'Condo',
    yearBuilt: 2015,
    lastUpdated: '1 week ago',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
    value: '$320,000'
  },
  { 
    id: '3', 
    address: '789 Maple Dr, Austin TX', 
    client: 'Alice Johnson', 
    photoCount: 18, 
    riskLevel: 'high', 
    pendingPhotos: 5,
    type: 'House',
    yearBuilt: 2010,
    lastUpdated: '3 days ago',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600',
    value: '$380,000'
  },
  { 
    id: '4', 
    address: '321 Cedar Lane, Austin TX', 
    client: 'Bob Wilson', 
    photoCount: 8, 
    riskLevel: 'low', 
    pendingPhotos: 2,
    type: 'Townhouse',
    yearBuilt: 2020,
    lastUpdated: '5 days ago',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600',
    value: '$425,000'
  },
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
        <div className="px-4 space-y-4">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => navigate(`/agent/properties/${property.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100"
            >
              {/* Property Image */}
              <div className="relative h-32">
                <img
                  src={property.image}
                  alt={property.address}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Risk Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className={cn(
                    'text-xs font-bold border-0',
                    property.riskLevel === 'high' ? 'bg-red-500 text-white' :
                    property.riskLevel === 'medium' ? 'bg-orange-500 text-white' :
                    'bg-green-500 text-white'
                  )}>
                    {property.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                
                {/* Property Value */}
                <div className="absolute top-3 left-3">
                  <div className="bg-white/90 backdrop-blur rounded-lg px-2 py-1">
                    <p className="text-xs font-bold text-gray-900">{property.value}</p>
                  </div>
                </div>
                
                {/* Property Address */}
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-white font-bold text-sm">{property.address.split(',')[0]}</h3>
                  <p className="text-white/80 text-xs capitalize">{property.type} • Built {property.yearBuilt}</p>
                </div>
              </div>
              
              {/* Property Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      <p className="text-sm text-gray-600">{property.address}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{property.client}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                      <Camera className="h-3.5 w-3.5" />
                      <span className="font-medium">{property.photoCount}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Photos</p>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <p className="text-xs font-medium text-gray-900">
                      {property.pendingPhotos > 0 ? (
                        <span className="text-orange-600">{property.pendingPhotos}</span>
                      ) : (
                        '0'
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Pending</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                      <Calendar className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">{property.lastUpdated}</p>
                  </div>
                </div>
                
                {/* Pending Alert */}
                {property.pendingPhotos > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <p className="text-xs text-orange-700 font-medium">
                        {property.pendingPhotos} photos pending review
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
