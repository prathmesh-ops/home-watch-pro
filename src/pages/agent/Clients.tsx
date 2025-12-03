import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, UserPlus, ChevronRight, Building2, Mail, Phone, TrendingUp } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Client } from '@/types';

const mockClients: Client[] = [
  { id: '1', name: 'Jane Doe', email: 'jane@example.com', phone: '+1 234 567 8901', propertiesCount: 2, lastActivity: '2h ago' },
  { id: '2', name: 'John Smith', email: 'john@example.com', phone: '+1 234 567 8902', propertiesCount: 1, lastActivity: '1d ago' },
  { id: '3', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 234 567 8903', propertiesCount: 3, lastActivity: '3d ago' },
  { id: '4', name: 'Bob Wilson', email: 'bob@example.com', phone: '+1 234 567 8904', propertiesCount: 1, lastActivity: '1w ago' },
];

export default function Clients() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = mockClients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout>
      <PageHeader
        title="Clients"
        subtitle={`${mockClients.length} total clients`}
        rightAction={
          <Button size="icon" variant="ghost" onClick={() => navigate('/agent/clients/add')}>
            <Plus className="h-5 w-5" />
          </Button>
        }
      />

      <div className="flex-1 pb-24">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pt-4 pb-2"
        >
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200">
              <p className="text-xs text-blue-600 font-medium mb-1">Total</p>
              <p className="text-2xl font-bold text-blue-700">{mockClients.length}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-green-200">
              <p className="text-xs text-green-600 font-medium mb-1">Active</p>
              <p className="text-2xl font-bold text-green-700">{mockClients.length}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-200">
              <p className="text-xs text-purple-600 font-medium mb-1">Growth</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-purple-700" />
                <p className="text-xl font-bold text-purple-700">12%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-white border-2 border-gray-100 focus:border-primary rounded-xl"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-4 mb-4 grid grid-cols-2 gap-3"
        >
          <button 
            onClick={() => navigate('/agent/clients/add')}
            className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-4 flex items-center gap-3 hover:shadow-lg transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">Add Client</p>
              <p className="text-xs text-white/80">Create new</p>
            </div>
          </button>
          <button 
            onClick={() => navigate('/agent/clients/invite')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 flex items-center gap-3 hover:shadow-lg transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">Invite Client</p>
              <p className="text-xs text-white/80">Send invite</p>
            </div>
          </button>
        </motion.div>

        {/* Clients List */}
        <div className="px-4 space-y-3">
          {filteredClients.map((client, index) => (
            <motion.button
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              onClick={() => navigate(`/agent/clients/${client.id}`)}
              className="w-full bg-white rounded-2xl border-2 border-gray-100 p-4 text-left hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-4 border-gray-50">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-lg">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-foreground">{client.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <Building2 className="h-3 w-3 mr-1" />
                      {client.propertiesCount} properties
                    </Badge>
                    <span className="text-xs text-green-600 font-medium">• Active {client.lastActivity}</span>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-gray-300" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
