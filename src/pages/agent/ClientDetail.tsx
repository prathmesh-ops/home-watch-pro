import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Building2, Calendar, Camera, FileText, MessageSquare, UserX, Edit, Home, Shield, Star, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const mockClient = {
  id: '1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+1 234 567 8901',
  address: '789 Elm Street, Austin, TX 78701',
  joinedDate: 'Jan 15, 2024',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  totalValue: '$770,000',
  policyCount: 2,
  status: 'active',
  properties: [
    { 
      id: '1', 
      address: '123 Oak Street, Austin TX', 
      photoCount: 24, 
      status: 'active',
      type: 'House',
      yearBuilt: 2018,
      value: '$450,000',
      lastUpdated: '2 days ago',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600',
      riskLevel: 'low'
    },
    { 
      id: '2', 
      address: '456 Pine Ave, Austin TX', 
      photoCount: 12, 
      status: 'pending',
      type: 'Condo',
      yearBuilt: 2015,
      value: '$320,000',
      lastUpdated: '1 week ago',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
      riskLevel: 'medium'
    },
  ],
  recentActivity: [
    { id: '1', type: 'photo', message: 'Uploaded 6 photos to 123 Oak Street', time: '2 hours ago', icon: Camera, color: 'blue' },
    { id: '2', type: 'document', message: 'Submitted renewal documents', time: '1 day ago', icon: FileText, color: 'green' },
    { id: '3', type: 'message', message: 'Sent message about roof inspection', time: '3 days ago', icon: MessageSquare, color: 'purple' },
    { id: '4', type: 'property', message: 'Added new property at 456 Pine Ave', time: '1 week ago', icon: Home, color: 'orange' },
    { id: '5', type: 'policy', message: 'Updated insurance policy', time: '2 weeks ago', icon: Shield, color: 'red' },
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
          className="relative"
        >
          <div className="relative h-40 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
              <div className="absolute top-8 right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              <div className="absolute bottom-4 left-1/2 w-24 h-24 bg-white/8 rounded-full blur-xl -translate-x-1/2" />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Badge className="bg-green-500/90 backdrop-blur text-white text-xs font-bold border-0 px-3 py-1 shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  {mockClient.status.toUpperCase()}
                </Badge>
              </motion.div>
            </div>
            
            {/* Client Rating */}
            {/* <div className="absolute top-4 left-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-1 bg-white/20 backdrop-blur rounded-full px-3 py-1"
              >
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-3 w-3 text-yellow-300 fill-current" />
                ))}
                <span className="text-xs text-white font-medium ml-1">5.0</span>
              </motion.div>
            </div> */}
            
            {/* Client Avatar & Name */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <div className="flex items-end gap-4">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <img
                      src={mockClient.avatar}
                      alt={mockClient.name}
                      className="w-20 h-20 rounded-2xl border-4 border-white/90 shadow-2xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    {/* Avatar Ring Animation */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse" />
                  </motion.div>
                </div>
                <div className="flex-1 pb-2">
                  <h2 className="text-white font-bold text-2xl drop-shadow-lg">{mockClient.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur rounded-full px-2 py-1">
                      <MapPin className="h-3 w-3 text-white" />
                      <span className="text-white/90 text-sm font-medium">Austin, TX</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur rounded-full px-2 py-1">
                      <Calendar className="h-3 w-3 text-white" />
                      <span className="text-white/90 text-sm font-medium">Since 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

            {/* Stats Cards */}
          <div className="px-4 mt-2">
            <div className="grid grid-cols-3 gap-3">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -mr-6 -mt-6" />
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                    <Building2 className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xs text-white/80 font-medium mb-1">Properties</p>
                  <p className="text-2xl font-bold text-white">{mockClient.properties.length}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <p className="text-xs text-white/90">Active</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -mr-6 -mt-6" />
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xs text-white/80 font-medium mb-1">Policies</p>
                  <p className="text-2xl font-bold text-white">{mockClient.policyCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <p className="text-xs text-white/90">Valid</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -mr-6 -mt-6" />
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xs text-white/80 font-medium mb-1">Total Value</p>
                  <p className="text-lg font-bold text-white">{mockClient.totalValue}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <p className="text-xs text-white/90">High</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="px-4 mt-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">{mockClient.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">{mockClient.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-700">{mockClient.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-700">Client since {mockClient.joinedDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" className="border-gray-200">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
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

          <div className="space-y-4">
            {mockClient.properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
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
                    <h4 className="text-white font-bold text-sm">{property.address.split(',')[0]}</h4>
                    <p className="text-white/80 text-xs capitalize">{property.type} • Built {property.yearBuilt}</p>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{property.address}</p>
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
                        {property.status === 'active' ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-yellow-600">Pending</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Status</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                        <Clock className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">{property.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="px-4 mt-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-3">Recent Activity</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            <div className="space-y-4">
              {mockClient.recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 text-blue-600 border-blue-200',
                  green: 'bg-green-50 text-green-600 border-green-200',
                  purple: 'bg-purple-50 text-purple-600 border-purple-200',
                  orange: 'bg-orange-50 text-orange-600 border-orange-200',
                  red: 'bg-red-50 text-red-600 border-red-200',
                };
                
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                    className="relative flex items-start gap-4"
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10">
                      <div className={cn(
                        'w-16 h-16 rounded-full border-2 flex items-center justify-center bg-white',
                        colorClasses[activity.color as keyof typeof colorClasses]
                      )}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    
                    {/* Activity Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
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
