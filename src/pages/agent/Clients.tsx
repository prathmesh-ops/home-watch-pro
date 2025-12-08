import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, UserPlus, ChevronRight, Building2, Mail, Phone, TrendingUp, MapPin, Calendar, Shield, Star, Users } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Client } from '@/types';

const mockClients = [
  { 
    id: '1', 
    name: 'Jane Doe', 
    email: 'jane@example.com', 
    phone: '+1 234 567 8901', 
    propertiesCount: 2, 
    lastActivity: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    joinedDate: '2023-01-15',
    totalValue: '$770,000',
    status: 'active',
    city: 'Austin, TX',
    policyCount: 2,
    recentActivity: 'Photos uploaded'
  },
  { 
    id: '2', 
    name: 'John Smith', 
    email: 'john@example.com', 
    phone: '+1 234 567 8902', 
    propertiesCount: 1, 
    lastActivity: '1d ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    joinedDate: '2022-08-20',
    totalValue: '$320,000',
    status: 'active',
    city: 'Austin, TX',
    policyCount: 1,
    recentActivity: 'Policy renewed'
  },
  { 
    id: '3', 
    name: 'Alice Johnson', 
    email: 'alice@example.com', 
    phone: '+1 234 567 8903', 
    propertiesCount: 3, 
    lastActivity: '3d ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    joinedDate: '2021-12-10',
    totalValue: '$1,150,000',
    status: 'active',
    city: 'Austin, TX',
    policyCount: 3,
    recentActivity: 'Photos uploaded'
  },
  { 
    id: '4', 
    name: 'Bob Wilson', 
    email: 'bob@example.com', 
    phone: '+1 234 567 8904', 
    propertiesCount: 1, 
    lastActivity: '1w ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    joinedDate: '2023-03-05',
    totalValue: '$425,000',
    status: 'inactive',
    city: 'Austin, TX',
    policyCount: 1,
    recentActivity: 'Payment pending'
  },
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
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xs text-white/80 font-medium">Total Clients</p>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{mockClients.length}</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <p className="text-xs text-white/90">+2 this month</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xs text-white/80 font-medium">Active</p>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{mockClients.filter(c => c.status === 'active').length}</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <p className="text-xs text-white/90">100% active</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xs text-white/80 font-medium">Growth</p>
                </div>
                <p className="text-3xl font-bold text-white mb-1">12%</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <p className="text-xs text-white/90">vs last month</p>
                </div>
              </div>
            </motion.div>
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
        <div className="px-4 space-y-4">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              onClick={() => navigate(`/agent/clients/${client.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100"
            >
              {/* Client Header */}
              <div className="relative h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600">
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className={cn(
                    'text-xs font-bold border-0',
                    client.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                  )}>
                    {client.status.toUpperCase()}
                  </Badge>
                </div>
                
                {/* Client Avatar & Name */}
                <div className="absolute bottom-3 left-4 flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-14 h-14 rounded-full border-3 border-white object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{client.name}</h3>
                    <p className="text-white/90 text-sm flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {client.city}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Client Details */}
              <div className="p-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                      <Building2 className="h-3.5 w-3.5" />
                      <span className="font-bold text-lg text-gray-900">{client.propertiesCount}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Properties</p>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <p className="text-sm font-bold text-gray-900">{client.policyCount}</p>
                    <p className="text-xs text-gray-500 mt-1">Policies</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-blue-600">{client.totalValue}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Value</p>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{client.phone}</span>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-xs text-gray-500">
                      <span className="font-medium text-gray-700">{client.recentActivity}</span>
                      <span className="ml-1">• {client.lastActivity}</span>
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                
                {/* Client Since Badge */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-blue-50 rounded-full px-2 py-1">
                    <Calendar className="h-3 w-3 text-blue-600" />
                    <span className="text-xs text-blue-700 font-medium">Since {client.joinedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
