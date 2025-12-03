import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, Calendar, Folder, Plus, X, ZoomIn, Trash2, RefreshCw, MessageSquare } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'timeline' | 'categories';

const categories = [
  { id: 'exterior', label: 'Exterior', icon: '🏠', count: 8 },
  { id: 'interior', label: 'Interior', icon: '🛋️', count: 12 },
  { id: 'roof', label: 'Roof', icon: '🏗️', count: 4 },
  { id: 'damage', label: 'Damage', icon: '⚠️', count: 2 },
  { id: 'appliances', label: 'Appliances', icon: '🔌', count: 6 },
  { id: 'documents', label: 'Documents', icon: '📄', count: 3 },
];

const mockPhotos = [
  { id: '1', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400', category: 'exterior', date: '2024-01-15', hasAIFlag: false },
  { id: '2', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', category: 'exterior', date: '2024-01-15', hasAIFlag: false },
  { id: '3', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', category: 'interior', date: '2024-01-14', hasAIFlag: true },
  { id: '4', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400', category: 'interior', date: '2024-01-14', hasAIFlag: false },
  { id: '5', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400', category: 'roof', date: '2024-01-10', hasAIFlag: true },
  { id: '6', url: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400', category: 'damage', date: '2024-01-10', hasAIFlag: true },
];

interface PhotoPreviewModalProps {
  photo: typeof mockPhotos[0] | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onReplace: (id: string) => void;
  onAddNote: (id: string) => void;
  onCompare: (id: string) => void;
}

function PhotoPreviewModal({ photo, onClose, onDelete, onReplace, onAddNote, onCompare }: PhotoPreviewModalProps) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onReplace(photo.id)}>
              <RefreshCw className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(photo.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={photo.url}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="capitalize">{photo.category}</Badge>
            <span className="text-sm text-muted-foreground">{photo.date}</span>
          </div>
          {photo.hasAIFlag && (
            <div className="flex items-center gap-2 p-2 bg-warning/10 rounded-lg">
              <span className="text-warning text-sm font-medium">⚠️ AI detected potential issue</span>
            </div>
          )}
          <div className="flex gap-2 mt-3">
            <Button variant="outline" className="flex-1" onClick={() => onAddNote(photo.id)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Note
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => onCompare(photo.id)}>
              Compare
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PhotoGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'));
  const [selectedPhoto, setSelectedPhoto] = useState<typeof mockPhotos[0] | null>(null);

  const filteredPhotos = selectedCategory
    ? mockPhotos.filter(p => p.category === selectedCategory)
    : mockPhotos;

  const groupedByDate = filteredPhotos.reduce((acc, photo) => {
    if (!acc[photo.date]) acc[photo.date] = [];
    acc[photo.date].push(photo);
    return acc;
  }, {} as Record<string, typeof mockPhotos>);

  const handleDelete = (photoId: string) => {
    setSelectedPhoto(null);
    // Handle delete
  };

  const handleReplace = (photoId: string) => {
    setSelectedPhoto(null);
    navigate('/capture');
  };

  const handleAddNote = (photoId: string) => {
    setSelectedPhoto(null);
    // You can add a note dialog here or navigate to a notes page
    alert('Add note functionality - Photo ID: ' + photoId);
  };

  const handleCompare = (photoId: string) => {
    setSelectedPhoto(null);
    navigate(`/properties/${id}/photos/compare?photo=${photoId}`);
  };

  return (
    <MobileLayout>
      <PageHeader
        title="Photos"
        subtitle={`${filteredPhotos.length} photos`}
        showBack
        rightAction={
          <Button size="icon" variant="ghost" onClick={() => navigate('/capture')}>
            <Plus className="h-5 w-5" />
          </Button>
        }
      />

      <div className="flex-1 pb-8">
        {/* View Mode Toggle */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8"
            >
              <Grid className="h-4 w-4 mr-1" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'timeline' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('timeline')}
              className="h-8"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Timeline
            </Button>
            <Button
              variant={viewMode === 'categories' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('categories')}
              className="h-8"
            >
              <Folder className="h-4 w-4 mr-1" />
              Categories
            </Button>
          </div>
        </div>

        {/* Category Filter Pills */}
        {viewMode !== 'categories' && (
          <div className="px-4 py-3 flex gap-2 overflow-x-auto">
            <Button
              variant={!selectedCategory ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="flex-shrink-0"
              >
                {cat.icon} {cat.label}
              </Button>
            ))}
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="px-4 grid grid-cols-3 gap-2">
            {filteredPhotos.map((photo, index) => (
              <motion.button
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                onClick={() => setSelectedPhoto(photo)}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <img src={photo.url} alt="" className="w-full h-full object-cover" />
                {photo.hasAIFlag && (
                  <div className="absolute top-1 right-1 h-5 w-5 bg-warning rounded-full flex items-center justify-center">
                    <span className="text-xs">⚠️</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-6 w-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="px-4 space-y-4">
            {Object.entries(groupedByDate).map(([date, photos]) => (
              <div key={date}>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">{date}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo) => (
                    <button
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      className="relative aspect-square rounded-lg overflow-hidden"
                    >
                      <img src={photo.url} alt="" className="w-full h-full object-cover" />
                      {photo.hasAIFlag && (
                        <div className="absolute top-1 right-1 h-5 w-5 bg-warning rounded-full flex items-center justify-center">
                          <span className="text-xs">⚠️</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Categories View */}
        {viewMode === 'categories' && (
          <div className="px-4 pt-3 grid grid-cols-2 gap-3">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setViewMode('grid');
                }}
                className="bg-card rounded-xl border border-border p-4 text-left hover:border-primary/30 transition-colors"
              >
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="font-medium text-foreground mt-2">{cat.label}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} photos</p>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Photo Preview Modal */}
      {selectedPhoto && (
        <PhotoPreviewModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onDelete={handleDelete}
          onReplace={handleReplace}
          onAddNote={handleAddNote}
          onCompare={handleCompare}
        />
      )}
    </MobileLayout>
  );
}
