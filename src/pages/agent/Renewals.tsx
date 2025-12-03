import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, CheckCircle2, Clock, ChevronRight, Mail, MessageSquare, TrendingUp, TrendingDown } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Renewal {
  id: string;
  clientName: string;
  propertyAddress: string;
  policyNumber: string;
  dueDate: string;
  daysUntilDue: number;
  completeness: number;
  missingItems: string[];
  premiumChange?: number;
}

const mockRenewals: Renewal[] = [
  {
    id: '1',
    clientName: 'Jane Doe',
    propertyAddress: '123 Oak Street',
    policyNumber: 'POL-123456',
    dueDate: 'Dec 15, 2024',
    daysUntilDue: 12,
    completeness: 85,
    missingItems: ['Updated roof photos'],
    premiumChange: -5,
  },
  {
    id: '2',
    clientName: 'John Smith',
    propertyAddress: '456 Pine Ave',
    policyNumber: 'POL-789012',
    dueDate: 'Dec 20, 2024',
    daysUntilDue: 17,
    completeness: 60,
    missingItems: ['Exterior photos', 'Policy declaration'],
    premiumChange: 8,
  },
  {
    id: '3',
    clientName: 'Alice Johnson',
    propertyAddress: '789 Maple Dr',
    policyNumber: 'POL-345678',
    dueDate: 'Dec 28, 2024',
    daysUntilDue: 25,
    completeness: 100,
    missingItems: [],
    premiumChange: 0,
  },
  {
    id: '4',
    clientName: 'Bob Wilson',
    propertyAddress: '321 Cedar Lane',
    policyNumber: 'POL-901234',
    dueDate: 'Nov 30, 2024',
    daysUntilDue: -3,
    completeness: 45,
    missingItems: ['All documentation incomplete'],
    premiumChange: 12,
  },
];

export default function Renewals() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'urgent' | 'complete'>('all');

  const filteredRenewals = mockRenewals.filter(renewal => {
    if (filter === 'urgent') return renewal.daysUntilDue <= 14;
    if (filter === 'complete') return renewal.completeness === 100;
    return true;
  });

  const urgentCount = mockRenewals.filter(r => r.daysUntilDue <= 14).length;
  const overdueCount = mockRenewals.filter(r => r.daysUntilDue < 0).length;

  return (
    <MobileLayout>
      <PageHeader title="Renewals" subtitle={`${mockRenewals.length} policies`} />

      <div className="flex-1 pb-24">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pt-4 grid grid-cols-2 gap-3"
        >
          <div className="bg-warning/10 rounded-xl p-4 border border-warning/20">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-sm text-warning font-medium">Due Soon</span>
            </div>
            <p className="text-2xl font-bold text-warning">{urgentCount}</p>
          </div>
          <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive font-medium">Overdue</span>
            </div>
            <p className="text-2xl font-bold text-destructive">{overdueCount}</p>
          </div>
        </motion.div>

        {/* Filter Pills */}
        <div className="px-4 py-3 flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'urgent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('urgent')}
          >
            Urgent
          </Button>
          <Button
            variant={filter === 'complete' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('complete')}
          >
            Complete
          </Button>
        </div>

        {/* Renewals List */}
        <div className="px-4 space-y-3">
          {filteredRenewals.map((renewal, index) => (
            <motion.button
              key={renewal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => navigate(`/agent/renewals/${renewal.id}`)}
              className={cn(
                'w-full bg-card rounded-xl border p-4 text-left transition-colors',
                renewal.daysUntilDue < 0 ? 'border-destructive/30' :
                renewal.daysUntilDue <= 14 ? 'border-warning/30' : 'border-border'
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-medium text-foreground">{renewal.clientName}</h3>
                  <p className="text-sm text-muted-foreground">{renewal.propertyAddress}</p>
                </div>
                <Badge
                  className={cn(
                    renewal.daysUntilDue < 0 ? 'bg-destructive/10 text-destructive' :
                    renewal.daysUntilDue <= 14 ? 'bg-warning/10 text-warning' :
                    'bg-muted text-muted-foreground'
                  )}
                >
                  {renewal.daysUntilDue < 0 
                    ? `${Math.abs(renewal.daysUntilDue)} days overdue` 
                    : `${renewal.daysUntilDue} days left`}
                </Badge>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Due: {renewal.dueDate}</span>
              </div>

              {/* Completeness */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Documentation</span>
                  <span className={cn(
                    'font-medium',
                    renewal.completeness === 100 ? 'text-success' :
                    renewal.completeness >= 70 ? 'text-warning' : 'text-destructive'
                  )}>
                    {renewal.completeness}%
                  </span>
                </div>
                <Progress value={renewal.completeness} className="h-1.5" />
              </div>

              {/* Missing Items */}
              {renewal.missingItems.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-warning">
                  <AlertTriangle className="h-3 w-3" />
                  Missing: {renewal.missingItems.join(', ')}
                </div>
              )}

              {/* Premium Change */}
              {renewal.premiumChange !== undefined && renewal.premiumChange !== 0 && (
                <div className={cn(
                  'flex items-center gap-1 text-xs mt-2',
                  renewal.premiumChange > 0 ? 'text-destructive' : 'text-success'
                )}>
                  {renewal.premiumChange > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>Est. premium {renewal.premiumChange > 0 ? '+' : ''}{renewal.premiumChange}%</span>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1" onClick={(e) => {
                  e.stopPropagation();
                }}>
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={(e) => {
                  e.stopPropagation();
                }}>
                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                  SMS
                </Button>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
