import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Building2, Users, Home, Activity, ChevronRight, SortAsc, SortDesc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Company {
  id: string;
  name: string;
  logo: string;
  propertyCount: number;
  activeAgents: number;
  lastActivity: string;
  status: 'active' | 'inactive';
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Insurance Corp',
    logo: 'https://ui-avatars.com/api/?name=Acme+Insurance&background=0D8ABC&color=fff&size=80',
    propertyCount: 234,
    activeAgents: 12,
    lastActivity: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'SafeGuard Properties',
    logo: 'https://ui-avatars.com/api/?name=SafeGuard+Properties&background=DC2626&color=fff&size=80',
    propertyCount: 156,
    activeAgents: 8,
    lastActivity: '5 hours ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'Premier Home Insurance',
    logo: 'https://ui-avatars.com/api/?name=Premier+Home&background=16A34A&color=fff&size=80',
    propertyCount: 189,
    activeAgents: 15,
    lastActivity: '1 day ago',
    status: 'active',
  },
  {
    id: '4',
    name: 'Elite Coverage Group',
    logo: 'https://ui-avatars.com/api/?name=Elite+Coverage&background=9333EA&color=fff&size=80',
    propertyCount: 98,
    activeAgents: 6,
    lastActivity: '3 days ago',
    status: 'active',
  },
  {
    id: '5',
    name: 'Urban Property Solutions',
    logo: 'https://ui-avatars.com/api/?name=Urban+Property&background=EA580C&color=fff&size=80',
    propertyCount: 67,
    activeAgents: 4,
    lastActivity: '1 week ago',
    status: 'inactive',
  },
];

type SortField = 'name' | 'propertyCount' | 'activeAgents' | 'lastActivity';
type SortOrder = 'asc' | 'desc';

export default function Companies() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredCompanies = mockCompanies
    .filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'propertyCount':
          comparison = a.propertyCount - b.propertyCount;
          break;
        case 'activeAgents':
          comparison = a.activeAgents - b.activeAgents;
          break;
        case 'lastActivity':
          // Simple string comparison for demo
          comparison = a.lastActivity.localeCompare(b.lastActivity);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and monitor insurance companies
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Building2 className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </div>

          {/* Search & Filters */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <div className="flex gap-1">
                <Button
                  variant={sortField === 'name' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('name')}
                >
                  Name
                  {sortField === 'name' && (
                    sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                  )}
                </Button>
                <Button
                  variant={sortField === 'propertyCount' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('propertyCount')}
                >
                  Properties
                  {sortField === 'propertyCount' && (
                    sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Companies List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-4">
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => navigate(`/companies/${company.id}`)}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1">
                  {/* Logo */}
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 rounded-lg ring-2 ring-gray-100 group-hover:ring-primary/50 transition-all"
                  />

                  {/* Company Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={cn(
                          company.status === 'active'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                        )}
                      >
                        {company.status}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{company.propertyCount}</span>
                        <span>Properties</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">{company.activeAgents}</span>
                        <span>Active Agents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-orange-500" />
                        <span>Last active:</span>
                        <span className="font-medium">{company.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No companies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
