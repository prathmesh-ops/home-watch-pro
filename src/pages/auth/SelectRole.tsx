import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Briefcase, ChevronRight, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { UserRole } from '@/types';

export default function SelectRole() {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    navigate('/auth/login');
  };

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">PropertyDoc</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Welcome</h1>
          <p className="text-muted-foreground mt-2">
            Select how you'll be using PropertyDoc
          </p>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center gap-4 py-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={() => handleSelectRole('homeowner')}
            className="w-full bg-card rounded-xl border border-border p-5 text-left hover:border-primary/50 hover:bg-muted/30 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Home className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">Homeowner</h3>
                <p className="text-muted-foreground text-sm mt-0.5">
                  Document and manage your properties
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            onClick={() => handleSelectRole('agent')}
            className="w-full bg-card rounded-xl border border-border p-5 text-left hover:border-primary/50 hover:bg-muted/30 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <Briefcase className="h-7 w-7 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">Insurance Agent</h3>
                <p className="text-muted-foreground text-sm mt-0.5">
                  Manage clients and property inspections
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          </motion.button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </MobileLayout>
  );
}
