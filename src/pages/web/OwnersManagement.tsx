import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Home, Mail, Phone, ChevronDown, ChevronRight, Plus, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyCount: number;
  properties: Property[];
  avatar: string;
}

interface Property {
  id: string;
  address: string;
  score: number;
  status: string;
}

const mockOwners: Owner[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(512) 555-0123',
    propertyCount: 3,
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
    properties: [
      { id: '1', address: '123 Oak Street, Austin TX', score: 92, status: 'excellent' },
      { id: '2', address: '456 Pine Ave, Austin TX', score: 85, status: 'good' },
      { id: '3', address: '789 Maple Dr, Austin TX', score: 78, status: 'fair' },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(512) 555-0124',
    propertyCount: 2,
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=DC2626&color=fff',
    properties: [
      { id: '4', address: '321 Elm Street, Austin TX', score: 94, status: 'excellent' },
      { id: '5', address: '654 Cedar Lane, Austin TX', score: 68, status: 'poor' },
    ],
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '(512) 555-0125',
    propertyCount: 1,
    avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=16A34A&color=fff',
    properties: [
      { id: '6', address: '987 Birch Road, Austin TX', score: 88, status: 'good' },
    ],
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '(512) 555-0126',
    propertyCount: 4,
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=9333EA&color=fff',
    properties: [
      { id: '7', address: '111 Willow Way, Austin TX', score: 91, status: 'excellent' },
      { id: '8', address: '222 Spruce St, Austin TX', score: 86, status: 'good' },
      { id: '9', address: '333 Ash Ave, Austin TX', score: 89, status: 'good' },
      { id: '10', address: '444 Poplar Pl, Austin TX', score: 93, status: 'excellent' },
    ],
  },
];

export default function OwnersManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOwners, setExpandedOwners] = useState<Set<string>>(new Set());

  const toggleOwner = (ownerId: string) => {
    const newExpanded = new Set(expandedOwners);
    if (newExpanded.has(ownerId)) {
      newExpanded.delete(ownerId);
    } else {
      newExpanded.add(ownerId);
    }
    setExpandedOwners(newExpanded);
  };

  const filteredOwners = mockOwners.filter(owner =>
    owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    owner.phone.includes(searchQuery)
  );

  const getScoreBadgeClass = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 80) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (score >= 70) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Owners & Clients</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage property owners and their portfolios
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Owner
            </Button>
          </div>

          {/* Search */}
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search owners by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </div>

      {/* Owners List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {filteredOwners.map((owner, index) => (
            <motion.div
              key={owner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Owner Header */}
              <div
                onClick={() => toggleOwner(owner.id)}
                className="flex items-center gap-4 p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <img
                  src={owner.avatar}
                  alt={owner.name}
                  className="w-16 h-16 rounded-full ring-2 ring-gray-100"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{owner.name}</h3>
                  <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {owner.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {owner.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-blue-500" />
                      <span className="text-2xl font-bold text-gray-900">
                        {owner.propertyCount}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Properties</p>
                  </div>

                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    // Handle message
                  }}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>

                  {expandedOwners.has(owner.id) ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Properties List (Expanded) */}
              <AnimatePresence>
                {expandedOwners.has(owner.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 bg-gray-50"
                  >
                    <div className="p-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">
                        Properties ({owner.properties.length})
                      </h4>
                      <div className="grid gap-3">
                        {owner.properties.map((property) => (
                          <motion.div
                            key={property.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate(`/properties/${property.id}`)}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-3">
                              <Home className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                              <div>
                                <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                                  {property.address}
                                </p>
                                <p className="text-xs text-gray-500 capitalize mt-1">
                                  Status: {property.status}
                                </p>
                              </div>
                            </div>
                            <Badge className={getScoreBadgeClass(property.score)}>
                              {property.score}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredOwners.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No owners found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
