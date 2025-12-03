import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Building2, Camera, AlertTriangle, Bell, TrendingUp, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const highRiskProperties = [
  { id: '1', address: '789 Storm Lane', client: 'Alice Johnson', risk: 'high', reason: 'Hail damage detected' },
  { id: '2', address: '321 Flood Ave', client: 'Bob Smith', risk: 'medium', reason: 'Water stains visible' },
];

const recentActivity = [
  { id: '1', action: 'Photos uploaded', client: 'Jane Doe', property: '123 Oak St', time: '2h ago' },
  { id: '2', action: 'New client joined', client: 'Mike Wilson', property: null, time: '5h ago' },
  { id: '3', action: 'Checklist completed', client: 'Sarah Brown', property: '456 Pine Ave', time: '1d ago' },
];

export default function AgentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <MobileLayout>
      <div className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-primary px-4 pt-6 pb-8 rounded-b-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-primary-foreground/80 text-sm">Good morning</p>
              <h1 className="text-xl font-semibold text-primary-foreground">
                {user?.name || 'Agent'}
              </h1>
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={() => navigate('/agent/notifications')}
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => navigate('/agent/clients')} className="text-left">
              <StatCard
                title="Total Clients"
                value="24"
                icon={Users}
                trend={{ value: 8, isPositive: true }}
                variant="default"
              />
            </button>
            <button onClick={() => navigate('/agent/properties')} className="text-left">
              <StatCard
                title="Properties"
                value="47"
                icon={Building2}
                variant="default"
              />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-4 -mt-4"
        >
          <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Pending Photos</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-2xl font-semibold text-foreground">5</p>
                <p className="text-xs text-muted-foreground">Renewals Due</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-warning">3</p>
                <p className="text-xs text-muted-foreground">Risk Alerts</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* High Risk Properties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h2 className="text-base font-semibold text-foreground">Risk Alerts</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {highRiskProperties.map((prop) => (
              <button
                key={prop.id}
                onClick={() => navigate(`/agent/properties/${prop.id}`)}
                className="w-full bg-card rounded-xl border border-border p-4 text-left hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">{prop.address}</h3>
                    <p className="text-sm text-muted-foreground">{prop.client}</p>
                    <p className="text-xs text-muted-foreground mt-1">{prop.reason}</p>
                  </div>
                  <Badge
                    className={cn(
                      prop.risk === 'high' && 'bg-destructive/10 text-destructive',
                      prop.risk === 'medium' && 'bg-warning/10 text-warning'
                    )}
                  >
                    {prop.risk}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="px-4 mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className="p-4 border-b border-border last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.client}
                      {activity.property && ` • ${activity.property}`}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
