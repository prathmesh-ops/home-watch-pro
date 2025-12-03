import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CloudRain, AlertTriangle, MapPin, Clock, Camera, CheckCircle2, Shield } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const mockAlert = {
  id: '1',
  type: 'hail',
  severity: 'high',
  title: 'Severe Hail Storm Alert',
  message: 'A severe hail storm with golf ball-sized hail is expected in your area. This could cause significant damage to roofs, siding, and vehicles.',
  affectedZip: '78701',
  timestamp: '2 hours ago',
  recommendations: [
    'Document current condition of exterior and roof',
    'Take photos of vehicles parked outside',
    'Check gutters and downspouts after storm passes',
    'Inspect for any visible damage once safe',
  ],
  requiredPhotos: [
    { category: 'roof', label: 'Roof (all sides)', completed: false },
    { category: 'exterior', label: 'Front Exterior', completed: true },
    { category: 'exterior', label: 'Back Exterior', completed: false },
    { category: 'damage', label: 'Any Visible Damage', completed: false },
  ],
};

const severityStyles = {
  low: { bg: 'bg-success/10', text: 'text-success', badge: 'bg-success' },
  medium: { bg: 'bg-warning/10', text: 'text-warning', badge: 'bg-warning' },
  high: { bg: 'bg-destructive/10', text: 'text-destructive', badge: 'bg-destructive' },
};

export default function WeatherAlertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const completedCount = mockAlert.requiredPhotos.filter(p => p.completed).length;
  const progress = (completedCount / mockAlert.requiredPhotos.length) * 100;
  const styles = severityStyles[mockAlert.severity as keyof typeof severityStyles];

  return (
    <MobileLayout>
      <PageHeader title="Weather Alert" showBack />

      <div className="flex-1 pb-8">
        {/* Alert Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn('mx-4 mt-4 p-4 rounded-xl', styles.bg)}
        >
          <div className="flex items-start gap-3">
            <div className={cn('p-3 rounded-full', styles.badge)}>
              <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={styles.badge}>
                  {mockAlert.severity.toUpperCase()} SEVERITY
                </Badge>
              </div>
              <h2 className="text-lg font-semibold text-foreground">{mockAlert.title}</h2>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  ZIP: {mockAlert.affectedZip}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {mockAlert.timestamp}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alert Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-4 mt-4"
        >
          <p className="text-foreground">{mockAlert.message}</p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="px-4 mt-6"
        >
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Recommendations
          </h3>
          <div className="space-y-2">
            {mockAlert.recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border"
              >
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <p className="text-sm text-foreground">{rec}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Required Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Required Photos
            </h3>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{mockAlert.requiredPhotos.length}
            </span>
          </div>
          
          <Progress value={progress} className="h-2 mb-4" />

          <div className="space-y-2">
            {mockAlert.requiredPhotos.map((photo, index) => (
              <button
                key={index}
                onClick={() => !photo.completed && navigate('/capture')}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg border transition-colors',
                  photo.completed
                    ? 'bg-success/5 border-success/30'
                    : 'bg-card border-border hover:border-primary/30'
                )}
              >
                {photo.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <Camera className="h-5 w-5 text-muted-foreground" />
                )}
                <span className={cn(
                  'flex-1 text-left',
                  photo.completed ? 'text-success line-through' : 'text-foreground'
                )}>
                  {photo.label}
                </span>
                {!photo.completed && (
                  <Badge variant="secondary">Upload</Badge>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Action Button */}
        <div className="px-4 mt-6">
          <Button className="w-full" onClick={() => navigate('/capture')}>
            <Camera className="h-4 w-4 mr-2" />
            Start Photo Capture
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
