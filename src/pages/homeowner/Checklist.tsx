import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Camera, FileText, ClipboardList, ChevronRight } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  type: 'photo' | 'document' | 'form';
  required: boolean;
  completed: boolean;
}

const mockChecklist: ChecklistItem[] = [
  { id: '1', title: 'Front Exterior Photo', description: 'Clear view of front facade', type: 'photo', required: true, completed: true },
  { id: '2', title: 'Back Exterior Photo', description: 'Clear view of back facade', type: 'photo', required: true, completed: true },
  { id: '3', title: 'Roof Photos', description: 'Multiple angles of roof condition', type: 'photo', required: true, completed: false },
  { id: '4', title: 'Interior Living Areas', description: 'Photos of main living spaces', type: 'photo', required: true, completed: false },
  { id: '5', title: 'Property Deed', description: 'Upload property deed document', type: 'document', required: true, completed: false },
  { id: '6', title: 'Insurance Declaration', description: 'Current insurance declaration page', type: 'document', required: false, completed: false },
];

const typeIcons = {
  photo: Camera,
  document: FileText,
  form: ClipboardList,
};

export default function Checklist() {
  const [items, setItems] = useState(mockChecklist);
  
  const completedCount = items.filter(i => i.completed).length;
  const progress = (completedCount / items.length) * 100;

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <MobileLayout>
      <PageHeader title="Documentation Checklist" showBack />

      <div className="flex-1 pb-24">
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pt-4"
        >
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-foreground">Completion Progress</h3>
              <span className="text-sm text-muted-foreground">{completedCount}/{items.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between mt-3 text-sm">
              <span className={cn(
                'font-medium',
                progress === 100 ? 'text-success' : progress >= 50 ? 'text-warning' : 'text-destructive'
              )}>
                {progress.toFixed(0)}% Complete
              </span>
              {progress < 100 && (
                <span className="text-muted-foreground">
                  {items.length - completedCount} items remaining
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Checklist Items */}
        <div className="px-4 mt-4 space-y-3">
          {items.map((item, index) => {
            const Icon = typeIcons[item.type];
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => toggleItem(item.id)}
                className={cn(
                  'w-full bg-card rounded-xl border p-4 text-left transition-colors',
                  item.completed ? 'border-success/30 bg-success/5' : 'border-border hover:border-primary/30'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'mt-0.5',
                    item.completed ? 'text-success' : 'text-muted-foreground'
                  )}>
                    {item.completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={cn(
                        'font-medium',
                        item.completed ? 'text-success line-through' : 'text-foreground'
                      )}>
                        {item.title}
                      </h3>
                      {item.required && !item.completed && (
                        <span className="text-xs text-destructive">Required</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Icon className="h-3.5 w-3.5" />
                      <span className="capitalize">{item.type}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
