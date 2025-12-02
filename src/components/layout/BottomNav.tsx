import { Home, Building2, Camera, Bell, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const homeownerNavItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Building2, label: 'Properties', path: '/properties' },
  { icon: Camera, label: 'Capture', path: '/capture' },
  { icon: Bell, label: 'Alerts', path: '/notifications' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const agentNavItems = [
  { icon: Home, label: 'Home', path: '/agent/dashboard' },
  { icon: Building2, label: 'Clients', path: '/agent/clients' },
  { icon: Camera, label: 'Properties', path: '/agent/properties' },
  { icon: Bell, label: 'Alerts', path: '/agent/notifications' },
  { icon: User, label: 'Profile', path: '/agent/profile' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const navItems = userRole === 'agent' ? agentNavItems : homeownerNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
