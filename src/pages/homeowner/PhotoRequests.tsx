import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Clock, CheckCircle2, AlertCircle, ChevronRight, Upload } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PhotoRequest } from '@/types';

const mockRequests: (PhotoRequest & { propertyAddress: string; agentName: string })[] = [
  {
    id: '1',
    propertyId: '1',
    agentId: '1',
    instructions: 'Please capture clear photos of the roof from multiple angles, including any visible damage from the recent hail storm.',
    category: 'roof',
    status: 'pending',
    createdAt: '2 hours ago',
    propertyAddress: '123 Oak Street',
    agentName: 'John Agent',
  },
  {
    id: '2',
    propertyId: '1',
    agentId: '1',
    instructions: 'Need updated photos of the front and back exterior of the property for the renewal assessment.',
    category: 'exterior',
    status: 'pending',
    createdAt: '1 day ago',
    propertyAddress: '123 Oak Street',
    agentName: 'John Agent',
  },
  {
    id: '3',
    propertyId: '2',
    agentId: '1',
    instructions: 'Please upload photos of any water damage in the basement area.',
    category: 'damage',
    status: 'completed',
    createdAt: '3 days ago',
    propertyAddress: '456 Pine Ave',
    agentName: 'John Agent',
  },
];

export default function PhotoRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(mockRequests);

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  const handleUpload = (requestId: string) => {
    navigate(`/capture?requestId=${requestId}`);
  };

  const handleMarkComplete = (requestId: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: 'completed' as const } : r))
    );
  };

  return (
    <MobileLayout>
      <PageHeader
        title="Photo Requests"
        subtitle={pendingCount > 0 ? `${pendingCount} pending` : undefined}
        showBack
      />

      <div className="flex-1 pb-24">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">No photo requests</p>
          </div>
        ) : (
          <div className="px-4 pt-4 space-y-3">
            {requests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  'bg-card rounded-xl border p-4',
                  request.status === 'pending' ? 'border-warning/30' : 'border-border'
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        request.status === 'pending'
                          ? 'border-warning/30 text-warning bg-warning/10'
                          : 'border-success/30 text-success bg-success/10'
                      )}
                    >
                      {request.status === 'pending' ? (
                        <Clock className="h-3 w-3 mr-1" />
                      ) : (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      )}
                      {request.status}
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {request.category}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{request.createdAt}</span>
                </div>

                <h3 className="font-medium text-foreground">{request.propertyAddress}</h3>
                <p className="text-sm text-muted-foreground mt-1">From: {request.agentName}</p>
                
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{request.instructions}</p>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => handleUpload(request.id)}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photos
                    </Button>
                  </div>
                )}

                {request.status === 'completed' && (
                  <div className="flex items-center gap-2 mt-4 p-2 bg-success/10 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm text-success font-medium">Completed</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
