import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, MapPin, Phone, Mail, Globe, Users, Home, FileText, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type TabType = 'properties' | 'agents' | 'owners' | 'reports';

const mockCompanyData = {
  id: '1',
  name: 'Acme Insurance Corp',
  logo: 'https://ui-avatars.com/api/?name=Acme+Insurance&background=0D8ABC&color=fff&size=120',
  status: 'active',
  address: '123 Insurance Blvd, Austin, TX 78701',
  phone: '+1 (512) 555-0123',
  email: 'contact@acmeinsurance.com',
  website: 'www.acmeinsurance.com',
  propertyCount: 234,
  activeAgents: 12,
  totalOwners: 189,
  averageScore: 87,
  recentIncidents: 3,
};

const propertiesByStatus = [
  { status: 'Excellent', count: 98, color: 'bg-green-500', percentage: 42 },
  { status: 'Good', count: 87, color: 'bg-blue-500', percentage: 37 },
  { status: 'Fair', count: 34, color: 'bg-yellow-500', percentage: 15 },
  { status: 'Poor', count: 15, color: 'bg-red-500', percentage: 6 },
];

const mockProperties = [
  { id: '1', name: '123 Oak Street', address: 'Austin, TX', score: 92, owner: 'John Doe', status: 'excellent', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200' },
  { id: '2', name: '456 Pine Ave', address: 'Austin, TX', score: 85, owner: 'Jane Smith', status: 'good', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200' },
  { id: '3', name: '789 Maple Dr', address: 'Austin, TX', score: 78, owner: 'Bob Johnson', status: 'fair', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200' },
];

const mockAgents = [
  { id: '1', name: 'Sarah Connor', email: 'sarah@acme.com', phone: '(512) 555-0101', assignedProperties: 45, avatar: 'https://ui-avatars.com/api/?name=Sarah+Connor&background=0D8ABC&color=fff' },
  { id: '2', name: 'Mike Ross', email: 'mike@acme.com', phone: '(512) 555-0102', assignedProperties: 38, avatar: 'https://ui-avatars.com/api/?name=Mike+Ross&background=DC2626&color=fff' },
  { id: '3', name: 'Rachel Green', email: 'rachel@acme.com', phone: '(512) 555-0103', assignedProperties: 52, avatar: 'https://ui-avatars.com/api/?name=Rachel+Green&background=16A34A&color=fff' },
];

export default function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('properties');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/companies')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Companies
          </Button>

          <div className="flex items-start gap-6">
            <img
              src={mockCompanyData.logo}
              alt={mockCompanyData.name}
              className="w-24 h-24 rounded-xl ring-4 ring-gray-100"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{mockCompanyData.name}</h1>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  {mockCompanyData.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600 mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {mockCompanyData.address}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {mockCompanyData.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {mockCompanyData.email}
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  {mockCompanyData.website}
                </div>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90">
              Edit Company
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: 'properties', label: 'Properties', icon: Home },
                    { id: 'agents', label: 'Agents', icon: Users },
                    { id: 'owners', label: 'Owners', icon: Users },
                    { id: 'reports', label: 'Reports', icon: FileText },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={cn(
                          'flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors',
                          activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Properties Tab */}
                {activeTab === 'properties' && (
                  <div className="space-y-4">
                    {mockProperties.map((property) => (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigate(`/properties/${property.id}`)}
                      >
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{property.name}</h3>
                          <p className="text-sm text-gray-600">{property.address}</p>
                          <p className="text-xs text-gray-500 mt-1">Owner: {property.owner}</p>
                        </div>
                        <div className="text-right">
                          <div className={cn(
                            'inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg',
                            property.score >= 90 ? 'bg-green-100 text-green-700' :
                            property.score >= 80 ? 'bg-blue-100 text-blue-700' :
                            property.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          )}>
                            {property.score}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Agents Tab */}
                {activeTab === 'agents' && (
                  <div className="space-y-4">
                    {mockAgents.map((agent) => (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all"
                      >
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-14 h-14 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                          <p className="text-sm text-gray-600">{agent.email}</p>
                          <p className="text-sm text-gray-600">{agent.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{agent.assignedProperties}</p>
                          <p className="text-xs text-gray-500">Properties</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Owners Tab */}
                {activeTab === 'owners' && (
                  <div className="text-center py-8 text-gray-500">
                    Owners list will be displayed here
                  </div>
                )}

                {/* Reports Tab */}
                {activeTab === 'reports' && (
                  <div className="text-center py-8 text-gray-500">
                    Reports and analytics will be displayed here
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analytics Sidebar */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Key Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Average Score</span>
                    <span className="text-2xl font-bold text-green-600">{mockCompanyData.averageScore}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${mockCompanyData.averageScore}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockCompanyData.propertyCount}</p>
                    <p className="text-xs text-gray-500">Total Properties</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockCompanyData.activeAgents}</p>
                    <p className="text-xs text-gray-500">Active Agents</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockCompanyData.totalOwners}</p>
                    <p className="text-xs text-gray-500">Total Owners</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{mockCompanyData.recentIncidents}</p>
                    <p className="text-xs text-gray-500">Recent Incidents</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties by Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Properties by Status
              </h3>
              <div className="space-y-3">
                {propertiesByStatus.map((item) => (
                  <div key={item.status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{item.status}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={cn(item.color, 'h-2 rounded-full transition-all')}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Incidents */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Recent Incidents
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Roof Damage</p>
                    <p className="text-xs text-gray-600">Property: 123 Oak St</p>
                    <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Water Leak</p>
                    <p className="text-xs text-gray-600">Property: 456 Pine Ave</p>
                    <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
