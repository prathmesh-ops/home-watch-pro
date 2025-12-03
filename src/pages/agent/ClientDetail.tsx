import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Building2, Calendar, Camera, FileText, MessageSquare, UserX, Edit } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const mockClient = {
  id: '1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+1 234 567 8901',
  address: '789 Elm Street, Austin, TX 78701',
  joinedDate: 'Jan 15, 2024',
  properties: [
    { id: '1', address: '123 Oak Street', photoCount: 24, status: 'active' },
    { id: '2', address: '456 Pine Ave', photoCount: 12, status: 'pending' },
  ],
  recentActivity: [
    { id: '1', type: 'photo', message: 'Uploaded 6 photos to 123 Oak Street', time: '2 hours ago' },
    { id: '2', type: 'document', message: 'Submitted renewal documents', time: '1 day ago' },
    { id: '3', type: 'message', message: 'Sent message about roof inspection', time: '3 days ago' },
  ],
};

const activityIcons = {
  photo: Camera,
  document: FileText,
  message: MessageSquare,
};

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendMessage = () => {
    toast({
      title: 'Message Sent',
      description: `Message sent to ${mockClient.name}`,
    });
  };

  const handleRemoveClient = () => {
    toast({
      title: 'Client Removed',
      description: `${mockClient.name} has been removed`,
      variant: 'destructive',
    });
    navigate('/agent/clients');
  };

  return (
    <MobileLayout>
      <PageHeader
        title="Client Details"
        showBack
        rightAction={
          <Button size="icon" variant="ghost" onClick={() => navigate(`/agent/clients/${id}/edit`)}>
            <Edit className="h-5 w-5" />
          </Button>
        }
      />

      <div className="flex-1 pb-8">
        {/* Client Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pt-4"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                  {mockClient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{mockClient.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white">Active Client</Badge>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm bg-white/50 rounded-lg p-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{mockClient.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm bg-white/50 rounded-lg p-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{mockClient.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm bg-white/50 rounded-lg p-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{mockClient.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm bg-white/50 rounded-lg p-3">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">Joined {mockClient.joinedDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" className="bg-white">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Properties Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">Properties ({mockClient.properties.length})</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/agent/properties')}>
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {mockClient.properties.map((property, index) => (
              <motion.button
                key={property.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                onClick={() => navigate(`/agent/properties/${property.id}`)}
                className="w-full bg-white rounded-xl border-2 border-gray-100 p-4 text-left hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground">{property.address}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Camera className="h-3.5 w-3.5" />
                        {property.photoCount} photos
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={property.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                      >
                        {property.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="px-4 mt-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-3">Recent Activity</h3>
          
          <div className="space-y-3">
            {mockClient.recentActivity.map((activity, index) => {
              const Icon = activityIcons[activity.type as keyof typeof activityIcons];
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 p-4"
                >
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="px-4 mt-8"
        >
          <div className="bg-red-50 rounded-xl border border-red-200 p-4">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Danger Zone</h3>
            <p className="text-xs text-red-600 mb-3">Removing this client will delete all associated data.</p>
            <Button 
              variant="outline" 
              className="w-full text-red-600 border-red-300 hover:bg-red-100"
              onClick={handleRemoveClient}
            >
              <UserX className="h-4 w-4 mr-2" />
              Remove Client
            </Button>
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
