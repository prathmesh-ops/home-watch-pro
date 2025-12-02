import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Image, X, Upload, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { value: 'exterior', label: 'Exterior' },
  { value: 'interior', label: 'Interior' },
  { value: 'roof', label: 'Roof' },
  { value: 'damage', label: 'Damage' },
];

export default function Capture() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gpsVerified, setGpsVerified] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = () => {
    // Simulate image selection
    const mockImages = [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
    ];
    setSelectedImages(mockImages);
    setGpsVerified(true);
  };

  const handleUpload = async () => {
    if (!category || selectedImages.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please select images and a category',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Upload Complete',
      description: `${selectedImages.length} photos uploaded successfully`,
    });
    
    setIsUploading(false);
    navigate('/properties');
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <MobileLayout>
      <PageHeader title="Upload Photos" showBack />

      <div className="flex-1 pb-24 px-4">
        {/* Capture Options */}
        {selectedImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleImageSelect}
                className="aspect-square bg-primary/10 rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-3 hover:bg-primary/15 transition-colors"
              >
                <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
                  <Camera className="h-7 w-7 text-primary-foreground" />
                </div>
                <span className="font-medium text-foreground">Take Photo</span>
              </button>
              <button
                onClick={handleImageSelect}
                className="aspect-square bg-secondary rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 hover:bg-muted transition-colors"
              >
                <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                  <Image className="h-7 w-7 text-muted-foreground" />
                </div>
                <span className="font-medium text-foreground">From Gallery</span>
              </button>
            </div>

            <div className="mt-8 bg-card rounded-xl border border-border p-4">
              <h3 className="font-medium text-foreground mb-3">Photo Guidelines</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  Good lighting and clear visibility
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  Capture all corners and angles
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  Include damage close-ups if any
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  GPS location will be captured
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Selected Images Preview */}
        {selectedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-4 space-y-4"
          >
            {/* Image Preview */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Selected Photos ({selectedImages.length})
              </Label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {selectedImages.map((img, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={img}
                      alt={`Selected ${index + 1}`}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 h-6 w-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleImageSelect}
                  className="h-24 w-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center flex-shrink-0 hover:border-primary/30 transition-colors"
                >
                  <Camera className="h-6 w-6 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* GPS Status */}
            <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
              <MapPin className="h-4 w-4 text-success" />
              <span className="text-sm text-success font-medium">GPS Location Verified</span>
              <Badge variant="outline" className="ml-auto text-xs">
                78701
              </Badge>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                placeholder="e.g., Front entrance"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Notes (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any relevant details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            {/* Upload Button */}
            <Button
              className="w-full"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                'Uploading...'
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photos
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
