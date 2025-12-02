import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, UserPlus, ChevronRight, Building2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
        subtitle={`${mockClients.length} total`}
        rightAction={
          <Button size="icon" variant="ghost">
            <UserPlus className="h-5 w-5" />
          </Button>
        }
      />

      <div className="flex-1 pb-24">
        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Invite Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 mb-4"
        >
          <button className="w-full bg-primary/10 rounded-xl p-4 flex items-center gap-3 hover:bg-primary/15 transition-colors">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">Invite New Client</p>
              <p className="text-sm text-muted-foreground">Send invite via SMS or Email</p>
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
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => navigate(`/agent/clients/${client.id}`)}
              className="w-full bg-card rounded-xl border border-border p-4 text-left hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-secondary text-foreground">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">{client.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{client.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      {client.propertiesCount} properties
                    </div>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{client.lastActivity}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
