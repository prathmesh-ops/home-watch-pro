import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, User, Camera, FileText, Package, CheckCircle2,
  Circle, Plus, Edit, Trash2, Upload, X, AlertTriangle, CloudRain,
  BarChart3, TrendingUp, Clock, Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  status: 'good' | 'fair' | 'poor';
  value: number;
}

interface Photo {
  id: string;
  url: string;
  category: string;
  uploadedAt: string;
}

const mockProperty = {
  id: '1',
  name: '123 Oak Street',
  address: '123 Oak Street, Austin, TX 78701',
  owner: 'John Doe',
  ownerEmail: 'john@example.com',
  ownerPhone: '(512) 555-0123',
  score: 92,
  status: 'excellent',
  tags: ['Verified', 'Premium', 'New'],
  lastInspection: '2 weeks ago',
  propertyType: 'Single Family Home',
  yearBuilt: 2018,
  squareFeet: 2500,
};

const mockChecklist: ChecklistItem[] = [
  { id: '1', title: 'Roof Inspection', completed: true, category: 'Exterior' },
  { id: '2', title: 'Gutter Cleaning', completed: true, category: 'Exterior' },
  { id: '3', title: 'HVAC Service', completed: false, category: 'Interior' },
  { id: '4', title: 'Smoke Detector Test', completed: true, category: 'Safety' },
  { id: '5', title: 'Foundation Check', completed: false, category: 'Structural' },
];

const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Living Room Sofa', quantity: 1, status: 'good', value: 1200 },
  { id: '2', name: 'Kitchen Appliances', quantity: 4, status: 'good', value: 3500 },
  { id: '3', name: 'Bedroom Furniture', quantity: 3, status: 'fair', value: 2000 },
  { id: '4', name: 'Dining Table Set', quantity: 1, status: 'good', value: 800 },
];

const mockPhotos: Photo[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300', category: 'Exterior', uploadedAt: '2024-01-15' },
  { id: '2', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300', category: 'Interior', uploadedAt: '2024-01-14' },
  { id: '3', url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=300', category: 'Exterior', uploadedAt: '2024-01-13' },
  { id: '4', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300', category: 'Roof', uploadedAt: '2024-01-12' },
  { id: '5', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300', category: 'Interior', uploadedAt: '2024-01-11' },
  { id: '6', url: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=300', category: 'Kitchen', uploadedAt: '2024-01-10' },
];

export default function PropertyDetailWeb() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(mockChecklist);
  const [inventory, setInventory] = useState(mockInventory);
  const [photos, setPhotos] = useState(mockPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [showAddChecklist, setShowAddChecklist] = useState(false);

  const completedCount = checklist.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);

  const toggleChecklistItem = (itemId: string) => {
    setChecklist(checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        title: newChecklistItem,
        completed: false,
        category: 'General',
      };
      setChecklist([...checklist, newItem]);
      setNewChecklistItem('');
      setShowAddChecklist(false);
    }
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const newPhoto: Photo = {
      id: Date.now().toString(),
      url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=300',
      category: 'General',
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setPhotos([newPhoto, ...photos]);
  };

  const deletePhoto = (photoId: string) => {
    setPhotos(photos.filter(p => p.id !== photoId));
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Weather Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <CloudRain className="h-5 w-5" />
            <p className="text-sm font-medium">
              Severe Weather Alert: Heavy rain expected in your area. Check drainage systems.
            </p>
            <Button variant="ghost" size="sm" className="ml-auto text-white hover:bg-white/20">
              View Details
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/properties')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{mockProperty.name}</h1>
                <Badge className={cn(
                  'px-4 py-1.5 text-lg font-bold',
                  mockProperty.score >= 90 ? 'bg-green-100 text-green-700 border-green-200' :
                  mockProperty.score >= 80 ? 'bg-blue-100 text-blue-700 border-blue-200' :
                  'bg-yellow-100 text-yellow-700 border-yellow-200'
                )}>
                  {mockProperty.score}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {mockProperty.address}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  {mockProperty.owner}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {mockProperty.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" className="text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Checklist Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-gray-900">Checklist Management</h2>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAddChecklist(!showAddChecklist)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Completion Progress</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {completedCount} / {checklist.length} ({completionPercentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Add New Item Form */}
              {showAddChecklist && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter new checklist item..."
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addChecklistItem()}
                    />
                    <Button onClick={addChecklistItem}>Add</Button>
                    <Button variant="ghost" onClick={() => setShowAddChecklist(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Checklist Items */}
              <div className="space-y-2">
                {checklist.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                      className="h-5 w-5"
                    />
                    <span className={cn(
                      'flex-1 text-sm',
                      item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    )}>
                      {item.title}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Inventory Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Package className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-gray-900">Inventory</h2>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Item</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Qty</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{item.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.quantity}</td>
                        <td className="py-3 px-4">
                          <Badge
                            className={cn(
                              item.status === 'good' && 'bg-green-100 text-green-700',
                              item.status === 'fair' && 'bg-yellow-100 text-yellow-700',
                              item.status === 'poor' && 'bg-red-100 text-red-700'
                            )}
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                          ${item.value.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total Value:</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${inventory.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Camera className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-gray-900">Photo Gallery</h2>
                  <Badge variant="outline">{photos.length} photos</Badge>
                </div>
                <Button size="sm" onClick={handlePhotoUpload}>
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSelectedPhoto(photo)}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={photo.url}
                      alt={photo.category}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Analytics Sidebar */}
          <div className="space-y-6">
            {/* Key Analytics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Analytics
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <p className="text-sm text-green-700 mb-1">Property Score</p>
                  <p className="text-3xl font-bold text-green-900">{mockProperty.score}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-green-700">
                    <TrendingUp className="h-3 w-3" />
                    <span>+3 from last month</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700 mb-1">Photos</p>
                    <p className="text-2xl font-bold text-blue-900">{photos.length}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-700 mb-1">Items</p>
                    <p className="text-2xl font-bold text-purple-900">{inventory.length}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">Checklist Progress</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">{completionPercentage}% Complete</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                  <div>
                    <p className="text-gray-900">Roof inspection completed</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                  <div>
                    <p className="text-gray-900">3 photos uploaded</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5"></div>
                  <div>
                    <p className="text-gray-900">Inventory updated</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.category}
              className="max-w-full max-h-[80vh] rounded-lg"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => deletePhoto(selectedPhoto.id)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePhotoUpload}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        <Camera className="h-7 w-7" />
      </motion.button>
    </div>
  );
}
