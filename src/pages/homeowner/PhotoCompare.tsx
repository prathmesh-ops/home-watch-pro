import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Check, X, Sparkles } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const mockPhotos = [
  { id: '1', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', date: 'Jan 15, 2024', label: 'Before' },
  { id: '2', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', date: 'Dec 01, 2024', label: 'After' },
];

const aiDetectedChanges = [
  { type: 'damage', description: 'New crack detected on foundation', severity: 'warning' },
  { type: 'improvement', description: 'Roof appears to be in better condition', severity: 'success' },
];

export default function PhotoCompare() {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState([50]);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(['1', '2']);

  return (
    <MobileLayout>
      <PageHeader title="Before / After" showBack />

      <div className="flex-1 pb-8">
        {/* Comparison Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-[4/3] mx-4 mt-4 rounded-xl overflow-hidden bg-muted"
        >
          {/* Before Image */}
          <img
            src={mockPhotos[0].url}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* After Image with Clip */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)` }}
          >
            <img
              src={mockPhotos[1].url}
              alt="After"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground shadow-lg"
            style={{ left: `${sliderValue[0]}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 bg-primary-foreground rounded-full flex items-center justify-center shadow-lg">
              <ArrowLeftRight className="h-5 w-5 text-primary" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-foreground/70 rounded text-xs text-background font-medium">
            Before • {mockPhotos[0].date}
          </div>
          <div className="absolute top-3 right-3 px-2 py-1 bg-foreground/70 rounded text-xs text-background font-medium">
            After • {mockPhotos[1].date}
          </div>
        </motion.div>

        {/* Slider Control */}
        <div className="px-8 mt-4">
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* AI Analysis Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-4 mt-6"
        >
          <Button
            variant={showAIAnalysis ? 'default' : 'outline'}
            className="w-full"
            onClick={() => setShowAIAnalysis(!showAIAnalysis)}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {showAIAnalysis ? 'Hide AI Analysis' : 'Show AI Analysis'}
          </Button>
        </motion.div>

        {/* AI Detected Changes */}
        {showAIAnalysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 mt-4"
          >
            <h3 className="font-medium text-foreground mb-3">AI Detected Changes</h3>
            <div className="space-y-2">
              {aiDetectedChanges.map((change, index) => (
                <div
                  key={index}
                  className={cn(
                    'p-3 rounded-lg border',
                    change.severity === 'warning' 
                      ? 'bg-warning/10 border-warning/30' 
                      : 'bg-success/10 border-success/30'
                  )}
                >
                  <div className="flex items-start gap-2">
                    {change.severity === 'warning' ? (
                      <span className="text-warning">⚠️</span>
                    ) : (
                      <Check className="h-4 w-4 text-success mt-0.5" />
                    )}
                    <div>
                      <p className={cn(
                        'text-sm font-medium',
                        change.severity === 'warning' ? 'text-warning' : 'text-success'
                      )}>
                        {change.type === 'damage' ? 'Issue Detected' : 'Improvement'}
                      </p>
                      <p className="text-sm text-muted-foreground">{change.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Photo Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="px-4 mt-6"
        >
          <h3 className="font-medium text-foreground mb-3">Select Photos to Compare</h3>
          <div className="grid grid-cols-4 gap-2">
            {[...mockPhotos, ...mockPhotos].map((photo, index) => (
              <button
                key={`${photo.id}-${index}`}
                className={cn(
                  'aspect-square rounded-lg overflow-hidden border-2 transition-colors',
                  selectedPhotos.includes(photo.id) ? 'border-primary' : 'border-transparent'
                )}
              >
                <img src={photo.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
