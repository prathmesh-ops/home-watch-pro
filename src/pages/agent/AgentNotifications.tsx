import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Camera, AlertTriangle, CheckCircle2, Users } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Notification } from '@/types';

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Photos Uploaded',
    message: 'Jane Doe uploaded 6 new photos for 123 Oak Street.',
    type: 'success',
    read: false,
    timestamp: '30 min ago',
  },
  {
    id: '2',
    title: 'High Risk Alert',
    message: 'AI detected potential hail damage on 789 Storm Lane.',
    type: 'warning',
    read: false,
    timestamp: '2 hours ago',
  },
  {
    id: '3',
    title: 'New Client',
    message: 'Mike Wilson has joined and linked their property.',
    type: 'info',
    read: false,
    timestamp: '5 hours ago',
  },
  {
    id: '4',
    title: 'Checklist Completed',
    message: 'Sarah Brown completed all documentation requirements.',
    type: 'success',
    read: true,
    timestamp: 'Yesterday',
  },
  {
    id: '5',
    title: 'Renewal Reminder',
    message: '3 policies are due for renewal this week.',
    type: 'info',
    read: true,
    timestamp: '2 days ago',
  },
];

const iconMap = {
  info: Bell,
  warning: AlertTriangle,
  success: CheckCircle2,
  error: AlertTriangle,
};

const colorMap = {
  info: 'bg-primary/10 text-primary',
  warning: 'bg-warning/10 text-warning',
  success: 'bg-success/10 text-success',
  error: 'bg-destructive/10 text-destructive',
};

export default function AgentNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const clearAll = () => {
    setNotifications([]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <MobileLayout>
      <PageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : undefined}
        rightAction={
          notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          )
        }
      />

      <div className="flex-1 pb-24">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">No notifications yet</p>
          </div>
        ) : (
          <div className="px-4 pt-4 space-y-3">
            {notifications.map((notification, index) => {
              const Icon = iconMap[notification.type];
              return (
                <motion.button
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => markAsRead(notification.id)}
                  className={cn(
                    'w-full text-left bg-card rounded-xl border border-border p-4 transition-colors',
                    !notification.read && 'border-l-4 border-l-accent'
                  )}
                >
                  <div className="flex gap-3">
                    <div className={cn('p-2 rounded-lg flex-shrink-0', colorMap[notification.type])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={cn(
                          'font-medium text-foreground',
                          !notification.read && 'font-semibold'
                        )}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
