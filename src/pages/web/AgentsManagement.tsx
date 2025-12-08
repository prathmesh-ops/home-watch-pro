import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Users, Home, Mail, Phone, Plus, MessageSquare, UserMinus, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedProperties: number;
  activeClients: number;
  status: 'active' | 'inactive';
  avatar: string;
  specialization: string;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    email: 'sarah.connor@acme.com',
    phone: '(512) 555-0201',
    assignedProperties: 45,
    activeClients: 28,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Connor&background=0D8ABC&color=fff',
    specialization: 'Residential Properties',
  },
  {
    id: '2',
    name: 'Mike Ross',
    email: 'mike.ross@acme.com',
    phone: '(512) 555-0202',
    assignedProperties: 38,
    activeClients: 22,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Ross&background=DC2626&color=fff',
    specialization: 'Commercial Properties',
  },
  {
    id: '3',
    name: 'Rachel Green',
    email: 'rachel.green@acme.com',
    phone: '(512) 555-0203',
    assignedProperties: 52,
    activeClients: 34,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Rachel+Green&background=16A34A&color=fff',
    specialization: 'Luxury Homes',
  },
  {
    id: '4',
    name: 'Tom Hardy',
    email: 'tom.hardy@acme.com',
    phone: '(512) 555-0204',
    assignedProperties: 31,
    activeClients: 19,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Tom+Hardy&background=9333EA&color=fff',
    specialization: 'Multi-family Units',
  },
  {
    id: '5',
    name: 'Emma Watson',
    email: 'emma.watson@acme.com',
    phone: '(512) 555-0205',
    assignedProperties: 0,
    activeClients: 0,
    status: 'inactive',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Watson&background=EA580C&color=fff',
    specialization: 'General',
  },
];

export default function AgentsManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.phone.includes(searchQuery);
    const matchesFilter = filterStatus === 'all' || agent.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleMessage = (agentId: string) => {
    console.log('Message agent:', agentId);
    // Implement messaging functionality
  };

  const handleReassign = (agentId: string) => {
    console.log('Reassign properties for agent:', agentId);
    // Implement reassignment functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage insurance agents and their assignments
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </div>

          {/* Search & Filters */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search agents by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('active')}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'inactive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('inactive')}
              >
                Inactive
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Card Header */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-start justify-between mb-4">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full ring-4 ring-white shadow-lg"
                  />
                  <Badge
                    className={agent.status === 'active' 
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : 'bg-gray-100 text-gray-600 border-gray-200'}
                  >
                    {agent.status}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {agent.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {agent.specialization}
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {agent.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {agent.phone}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Home className="h-4 w-4 text-blue-500" />
                      <span className="text-2xl font-bold text-gray-900">
                        {agent.assignedProperties}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Properties</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span className="text-2xl font-bold text-gray-900">
                        {agent.activeClients}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Clients</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleMessage(agent.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleReassign(agent.id)}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Reassign
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No agents found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
