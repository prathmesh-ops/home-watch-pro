import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Grid, List, Filter } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { PropertyCard } from '@/components/ui/property-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Property } from '@/types';

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
  {
    id: '3',
    address: '789 Maple Dr, Dallas TX',
    type: 'townhouse',
    yearBuilt: 2020,
    conditionScore: 'good',
    photoCount: 18,
    lastUpdated: '3 days ago',
    riskLevel: 'low',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
  },
];

export default function Properties() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const filteredProperties = mockProperties.filter(p =>
    p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout>
      <PageHeader
        title="Properties"
        subtitle={`${mockProperties.length} properties`}
        rightAction={
          <Button size="icon" variant="ghost" onClick={() => navigate('/properties/add')}>
            <Plus className="h-5 w-5" />
          </Button>
        }
      />

      <div className="flex-1 pb-24">
        {/* Search & Filters */}
        <div className="px-4 py-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="px-4">
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PropertyCard
                  property={property}
                  onPress={() => navigate(`/properties/${property.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
