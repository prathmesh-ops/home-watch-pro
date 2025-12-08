import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid3x3, List, Plus, MapPin, User, Edit, Trash2, Eye, MoreVertical, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Property {
  id: string;
  title: string;
  address: string;
  score: number;
  owner: string;
  tags: string[];
  thumbnail: string;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  photoCount: number;
  lastInspection: string;
}

const mockProperties: Property[] = [
  {
    id: '1',
    title: '123 Oak Street',
    address: 'Austin, TX 78701',
    score: 92,
    owner: 'John Doe',
    tags: ['Verified', 'Premium'],
    thumbnail: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
    status: 'excellent',
    photoCount: 24,
    lastInspection: '2 weeks ago',
  },
  {
    id: '2',
    title: '456 Pine Avenue',
    address: 'Austin, TX 78702',
    score: 85,
    owner: 'Jane Smith',
    tags: ['Verified'],
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
    status: 'good',
    photoCount: 18,
    lastInspection: '1 month ago',
  },
  {
    id: '3',
    title: '789 Maple Drive',
    address: 'Austin, TX 78703',
    score: 76,
    owner: 'Bob Johnson',
    tags: ['Inspection Due'],
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    status: 'fair',
    photoCount: 12,
    lastInspection: '3 months ago',
  },
  {
    id: '4',
    title: '321 Elm Street',
    address: 'Austin, TX 78704',
    score: 94,
    owner: 'Sarah Williams',
    tags: ['Verified', 'Premium', 'New'],
    thumbnail: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400',
    status: 'excellent',
    photoCount: 32,
    lastInspection: '1 week ago',
  },
  {
    id: '5',
    title: '654 Cedar Lane',
    address: 'Austin, TX 78705',
    score: 68,
    owner: 'Michael Brown',
    tags: ['At Risk', 'Inspection Due'],
    thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
    status: 'poor',
    photoCount: 8,
    lastInspection: '6 months ago',
  },
];

type ViewMode = 'card' | 'list';

export default function PropertiesList() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredProperties = mockProperties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getScoreBadgeClass = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 80) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (score >= 70) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const handleView = (id: string) => {
    navigate(`/properties/${id}`);
  };

  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/properties/${id}/edit`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Will implement confirmation modal
    console.log('Delete property:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and monitor all properties
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/properties/add')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>

          {/* Search & View Controls */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search properties, owners, or addresses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>

            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
              <Button
                variant={viewMode === 'card' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="h-9 w-9 p-0"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-9 w-9 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {viewMode === 'card' ? (
            <motion.div
              key="card-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleView(property.id)}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.thumbnail}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={cn('font-semibold', getScoreBadgeClass(property.score))}>
                        {property.score}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-primary transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                      <MapPin className="h-3.5 w-3.5" />
                      {property.address}
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                      <User className="h-3.5 w-3.5" />
                      {property.owner}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(property.id);
                        }}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => handleEdit(property.id, e)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={(e) => handleDelete(property.id, e)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-sm text-gray-700">
                <div className="col-span-1">Image</div>
                <div className="col-span-3">Property</div>
                <div className="col-span-2">Owner</div>
                <div className="col-span-1">Score</div>
                <div className="col-span-2">Tags</div>
                <div className="col-span-2">Last Inspection</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {/* Table Rows */}
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleView(property.id)}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer items-center"
                >
                  <div className="col-span-1">
                    <img
                      src={property.thumbnail}
                      alt={property.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                  <div className="col-span-3">
                    <p className="font-medium text-gray-900">{property.title}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {property.address}
                    </p>
                  </div>
                  <div className="col-span-2 text-sm text-gray-700">
                    {property.owner}
                  </div>
                  <div className="col-span-1">
                    <Badge className={cn('font-semibold', getScoreBadgeClass(property.score))}>
                      {property.score}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {property.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {property.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{property.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {property.lastInspection}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleView(property.id);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleEdit(property.id, e as any)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => handleDelete(property.id, e as any)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredProperties.length}</span> of{' '}
            <span className="font-medium">{mockProperties.length}</span> properties
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
