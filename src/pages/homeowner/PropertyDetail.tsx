import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Camera, Shield, AlertTriangle, ChevronRight, Plus, FileText, DollarSign, User, Clock, Image, CheckSquare, Package, Circle, CheckCircle2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const propertyImages = [
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
];

const photoCategories = [
  { id: 'exterior', label: 'Exterior', count: 8, icon: '🏠', color: 'from-blue-500 to-blue-600' ,bgImage:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'},
  { id: 'interior', label: 'Interior', count: 12, icon: '🛋️', color: 'from-purple-500 to-purple-600',bgImage:'https://plus.unsplash.com/premium_photo-1670360414483-64e6d9ba9038?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 'roof', label: 'Roof', count: 4, icon: '🏗️', color: 'from-orange-500 to-orange-600',bgImage:'https://images.unsplash.com/photo-1557671009-600c3a1973ca?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 'damage', label: 'Damage', count: 2, icon: '⚠️', color: 'from-red-500 to-red-600',bgImage:'https://plus.unsplash.com/premium_photo-1675630925629-2de5c664c908?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const riskIndicators = [
  { id: 'roof', label: 'Roof Condition', status: 'good', detail: 'No issues detected' },
  { id: 'water', label: 'Water Damage', status: 'warning', detail: 'Minor stains detected' },
  { id: 'exterior', label: 'Exterior', status: 'good', detail: 'Well maintained' },
];

const policyDetails = {
  policyNumber: 'POL-2024-123456',
  provider: 'State Farm Insurance',
  premium: '$1,850/year',
  coverage: '$350,000',
  effectiveDate: 'Jan 15, 2024',
  expiryDate: 'Jan 15, 2025',
  agent: 'Sarah Johnson',
};

const checklistItems = [
  { id: '1', category: 'Exterior', task: 'Inspect roof for damage', completed: true, dueDate: '2024-12-01' },
  { id: '2', category: 'Exterior', task: 'Check gutters and downspouts', completed: true, dueDate: '2024-12-01' },
  { id: '3', category: 'Exterior', task: 'Photograph all sides of property', completed: false, dueDate: '2024-12-15' },
  { id: '4', category: 'Interior', task: 'Document valuable items', completed: false, dueDate: '2024-12-20' },
  { id: '5', category: 'Interior', task: 'Check smoke detectors', completed: true, dueDate: '2024-11-30' },
  { id: '6', category: 'Safety', task: 'Test fire extinguishers', completed: false, dueDate: '2024-12-25' },
  { id: '7', category: 'Maintenance', task: 'HVAC system inspection', completed: true, dueDate: '2024-11-15' },
];

const inventoryItems = [
  { id: '1', name: 'Living Room TV', category: 'Electronics', value: '$1,200', photo: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200', purchaseDate: '2023-05-10' },
  { id: '2', name: 'Leather Sofa Set', category: 'Furniture', value: '$3,500', photo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200', purchaseDate: '2022-08-20' },
  { id: '3', name: 'MacBook Pro', category: 'Electronics', value: '$2,400', photo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200', purchaseDate: '2024-01-15' },
  { id: '4', name: 'Dining Table', category: 'Furniture', value: '$1,800', photo: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200', purchaseDate: '2022-06-05' },
  { id: '5', name: 'Refrigerator', category: 'Appliances', value: '$2,200', photo: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200', purchaseDate: '2023-03-12' },
  { id: '6', name: 'Washer & Dryer', category: 'Appliances', value: '$1,600', photo: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=200', purchaseDate: '2023-07-22' },
];

const timeline = [
  { 
    id: '1', 
    date: '2024-12-01', 
    type: 'photo', 
    title: 'Exterior Photos Updated', 
    description: '8 new photos uploaded', 
    icon: Camera, 
    color: 'bg-blue-500',
    photos: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300',
    ]
  },
  { 
    id: '2', 
    date: '2024-11-28', 
    type: 'inspection', 
    title: 'Annual Inspection', 
    description: 'Property passed inspection', 
    icon: Shield, 
    color: 'bg-green-500' 
  },
  { 
    id: '3', 
    date: '2024-11-15', 
    type: 'document', 
    title: 'Policy Renewed', 
    description: 'Policy renewed for 2025', 
    icon: FileText, 
    color: 'bg-purple-500' 
  },
  { 
    id: '4', 
    date: '2024-10-20', 
    type: 'alert', 
    title: 'Weather Alert', 
    description: 'Storm warning - no damage reported', 
    icon: AlertTriangle, 
    color: 'bg-orange-500' 
  },
  { 
    id: '5', 
    date: '2024-09-10', 
    type: 'photo', 
    title: 'Roof Photos Added', 
    description: '4 photos uploaded', 
    icon: Camera, 
    color: 'bg-blue-500',
    photos: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=300',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300',
    ]
  },
];

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isAgentView = location.pathname.startsWith('/agent');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <MobileLayout>
      <PageHeader title="Property Details" showBack />

      <div className="flex-1 pb-8">
        {/* Hero Image with Prominent Score Badge */}
        <div className="relative">
          <div className="aspect-[16/10] relative overflow-hidden">
            <img 
              src={propertyImages[0]} 
              alt="Property" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Image indicators */}
            <div className="absolute bottom-3 left-3 flex gap-1">
              {propertyImages.map((_, idx) => (
                <div key={idx} className={cn("h-1.5 rounded-full", idx === 0 ? "w-6 bg-white" : "w-1.5 bg-white/50")} />
              ))}
            </div>
          </div>
          
          {/* Prominent Score Badge with Progress Ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              {/* Progress Ring */}
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(92 / 100) * 327} 327`}
                  initial={{ strokeDasharray: "0 327" }}
                  animate={{ strokeDasharray: `${(92 / 100) * 327} 327` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                />
              </svg>
              
              {/* Score Number */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                  className="text-5xl font-black text-white drop-shadow-2xl"
                >
                  92
                </motion.span>
                <span className="text-xs text-white/90 font-bold tracking-widest mt-1">SCORE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Property Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="px-4 py-4"
        >
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 font-medium mb-1">Type</p>
                <p className="font-bold text-gray-900 capitalize">House</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <p className="text-xs text-gray-500 font-medium mb-1">Year Built</p>
                <p className="font-bold text-gray-900">2018</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 font-medium mb-1">Policy</p>
                <p className="font-bold text-green-600">Active</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="px-4 mt-4"
        >
          <div className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm">
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={cn(
                  'flex flex-col items-center gap-1 py-3 rounded-xl transition-all',
                  activeTab === 'overview' ? 'bg-blue-100' : 'hover:bg-gray-50'
                )}
              >
                <Image className={cn('h-5 w-5', activeTab === 'overview' ? 'text-blue-600' : 'text-gray-600')} />
                <span className={cn('text-xs font-medium', activeTab === 'overview' ? 'text-blue-600' : 'text-gray-600')}>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={cn(
                  'flex flex-col items-center gap-1 py-3 rounded-xl transition-all',
                  activeTab === 'checklist' ? 'bg-green-100' : 'hover:bg-gray-50'
                )}
              >
                <CheckSquare className={cn('h-5 w-5', activeTab === 'checklist' ? 'text-green-600' : 'text-gray-600')} />
                <span className={cn('text-xs font-medium', activeTab === 'checklist' ? 'text-green-600' : 'text-gray-600')}>Checklist</span>
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={cn(
                  'flex flex-col items-center gap-1 py-3 rounded-xl transition-all',
                  activeTab === 'inventory' ? 'bg-purple-100' : 'hover:bg-gray-50'
                )}
              >
                <Package className={cn('h-5 w-5', activeTab === 'inventory' ? 'text-purple-600' : 'text-gray-600')} />
                <span className={cn('text-xs font-medium', activeTab === 'inventory' ? 'text-purple-600' : 'text-gray-600')}>Inventory</span>
              </button>
              <button
                onClick={() => setActiveTab('policy')}
                className={cn(
                  'flex flex-col items-center gap-1 py-3 rounded-xl transition-all',
                  activeTab === 'policy' ? 'bg-orange-100' : 'hover:bg-gray-50'
                )}
              >
                <FileText className={cn('h-5 w-5', activeTab === 'policy' ? 'text-orange-600' : 'text-gray-600')} />
                <span className={cn('text-xs font-medium', activeTab === 'policy' ? 'text-orange-600' : 'text-gray-600')}>Policy</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
        {/* Photo Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="px-4 mt-6"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Policy Details</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">Policy Number</p>
                <p className="font-semibold text-blue-900 text-sm">{policyDetails.policyNumber}</p>
              </div>
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">Provider</p>
                <p className="font-semibold text-blue-900 text-sm">{policyDetails.provider}</p>
              </div>
              <div className="bg-white/60 rounded-xl p-3">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-blue-600" />
                  <p className="text-xs text-blue-600 font-medium">Coverage</p>
                </div>
                <p className="font-semibold text-green-700 text-lg">{policyDetails.coverage}</p>
              </div>
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">Premium</p>
                <p className="font-semibold text-blue-900 text-sm">{policyDetails.premium}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-200 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-blue-600 font-medium mb-1">Effective Date</p>
                <p className="text-blue-900 font-medium">{policyDetails.effectiveDate}</p>
              </div>
              <div>
                <p className="text-xs text-blue-600 font-medium mb-1">Expiry Date</p>
                <p className="text-blue-900 font-medium">{policyDetails.expiryDate}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 bg-white/60 rounded-xl p-3">
              <User className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-xs text-blue-600 font-medium">Your Agent</p>
                <p className="text-blue-900 font-semibold">{policyDetails.agent}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Photo Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Photo Gallery</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate(`/properties/${id}/photos`)} className="text-primary font-semibold">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {photoCategories.map((cat, idx) => (
              <motion.button
  key={cat.id}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3, delay: 0.35 + idx * 0.05 }}
  onClick={() => navigate(`/properties/${id}/photos?category=${cat.id}`)}
  className={`${cat.color} rounded-2xl p-4 text-left hover:shadow-xl transition-all active:scale-95 bg-cover bg-center`}
  style={{ backgroundImage: `url(${cat.bgImage})` }}
>

                <span className="text-3xl mb-2 block">{cat.icon}</span>
                <p className="font-bold text-white">{cat.label}</p>
                <p className="text-sm text-white/90 font-medium">{cat.count} photos</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="px-4 mt-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Timeline</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-blue-300 to-gray-200" />
            
            <div className="space-y-4">
              {timeline.map((item, idx) => {
                const Icon = item.icon;
                const hasPhotos = 'photos' in item && item.photos && item.photos.length > 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                    className="relative flex gap-4"
                  >
                    {/* Icon */}
                    <div className={cn("relative z-10 flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center shadow-lg", item.color)}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-white rounded-xl border-2 border-gray-100 p-4 hover:border-primary/30 transition-all">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      
                      {/* Photo Grid - Samsung Style */}
                      {hasPhotos && (
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          {(item as any).photos.map((photo: string, photoIdx: number) => (
                            <motion.div
                              key={photoIdx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 + photoIdx * 0.1 }}
                              className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                              onClick={() => navigate(`/properties/${id}/photos`)}
                            >
                              <img 
                                src={photo} 
                                alt={`Photo ${photoIdx + 1}`}
                                className="w-full h-full object-cover hover:scale-110 transition-transform"
                              />
                            </motion.div>
                          ))}
                          {(item as any).photos.length > 3 && (
                            <div className="aspect-square rounded-lg bg-gray-900/80 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-gray-900/90 transition-colors">
                              +{(item as any).photos.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* AI Risk Indicators - Collapsible on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="px-4 mt-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">AI Risk Analysis</h3>
          <div className="space-y-3">
            {riskIndicators.map((risk, idx) => (
              <motion.div
                key={risk.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + idx * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex-1 mr-3">
                  <p className="font-bold text-gray-900">{risk.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{risk.detail}</p>
                </div>
                <Badge
                  className={cn(
                    'font-bold capitalize',
                    risk.status === 'good' && 'bg-green-100 text-green-700 border-green-200',
                    risk.status === 'warning' && 'bg-orange-100 text-orange-700 border-orange-200',
                    risk.status === 'poor' && 'bg-red-100 text-red-700 border-red-200'
                  )}
                >
                  {risk.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

          </>
        )}

        {/* Checklist Tab */}
        {activeTab === 'checklist' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 mt-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Property Checklist</h3>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
            <div className="space-y-3">
              {checklistItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <button className="mt-0.5">
                      {item.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-300" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p className={cn(
                        "font-semibold text-sm",
                        item.completed ? "text-gray-500 line-through" : "text-gray-900"
                      )}>
                        {item.task}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-gray-500">Due: {item.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 mt-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Home Inventory</h3>
                <p className="text-sm text-gray-500">Total Value: $12,700</p>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {inventoryItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-sm text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    <p className="text-sm font-bold text-purple-600 mt-2">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Policy Tab */}
        {activeTab === 'policy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 mt-6"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Policy Details</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-xl p-3">
                  <p className="text-xs text-blue-600 font-medium mb-1">Policy Number</p>
                  <p className="font-semibold text-blue-900 text-sm">{policyDetails.policyNumber}</p>
                </div>
                <div className="bg-white/60 rounded-xl p-3">
                  <p className="text-xs text-blue-600 font-medium mb-1">Provider</p>
                  <p className="font-semibold text-blue-900 text-sm">{policyDetails.provider}</p>
                </div>
                <div className="bg-white/60 rounded-xl p-3">
                  <p className="text-xs text-blue-600 font-medium mb-1">Premium</p>
                  <p className="font-semibold text-blue-900 text-sm">{policyDetails.premium}</p>
                </div>
                <div className="bg-white/60 rounded-xl p-3">
                  <p className="text-xs text-blue-600 font-medium mb-1">Coverage</p>
                  <p className="font-semibold text-blue-900 text-sm">{policyDetails.coverage}</p>
                </div>
                <div className="bg-white/60 rounded-xl p-3">
                  <p className="text-xs text-blue-600 font-medium mb-1">Effective Date</p>
                  <p className="font-semibold text-blue-900 text-sm">{policyDetails.effectiveDate}</p>
                </div>
                <div className="bg-white/60 rounded-xl p-3">
                  <p className="text-xs text-blue-600 font-medium mb-1">Expiry Date</p>
                  <p className="font-semibold text-blue-900 text-sm">{policyDetails.expiryDate}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-blue-600 font-medium">Agent</p>
                    <p className="text-blue-900 font-semibold">{policyDetails.agent}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <div className="px-4 mt-6 pb-6">
          {isAgentView ? (
            <Button 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg text-white" 
              onClick={() => navigate(`/agent/properties/${id}/request-photos`)}
            >
              <Camera className="h-5 w-5 mr-2" />
              Request Photos from Client
            </Button>
          ) : (
            <Button 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg" 
              onClick={() => navigate('/capture')}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Photos
            </Button>
          )}
        </div>
      </div>

      {/* Floating Action Button (FAB) for Quick Photo Capture */}
      {!isAgentView && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/capture')}
          className="fixed bottom-24 right-4 w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-primary/50 transition-shadow"
        >
          <Camera className="h-7 w-7 text-white" />
        </motion.button>
      )}
    </MobileLayout>
  );
}
