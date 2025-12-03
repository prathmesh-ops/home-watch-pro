import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Splash() {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (isAuthenticated) {
        navigate(userRole === 'agent' ? '/agent/dashboard' : '/dashboard', { replace: true });
      } else {
        navigate('/auth/select', { replace: true });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, userRole, navigate]);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-primary flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-24 w-24 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mb-6"
        >
          <Shield className="h-14 w-14 text-primary-foreground" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-3xl font-bold text-primary-foreground"
        >
          PropertyDoc
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-primary-foreground/70 mt-2"
        >
          Smart Property Documentation
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-12"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="h-2 w-2 rounded-full bg-primary-foreground/50"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
