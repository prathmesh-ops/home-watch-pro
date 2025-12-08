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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl relative">
              <Shield className="h-8 w-8 text-white" />
              <div className="absolute inset-0 rounded-2xl border-2 border-white/20 animate-pulse" />
            </div>
            <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PropertyDoc</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-3"
          >
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PropertyDoc</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg"
          >
            Choose your role and start managing properties smarter
          </motion.p>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center gap-6 py-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={() => handleSelectRole('homeowner')}
            className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-transparent" />
              <div className="absolute top-4 right-4 w-24 h-24 bg-blue-500 rounded-full blur-2xl" />
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-blue-400 rounded-full blur-3xl" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <Home className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            
            <div className="relative p-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all">
                    <Home className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                  <div className="absolute inset-0 rounded-3xl border-2 border-white/30 animate-pulse" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Homeowner</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Document and manage your properties with ease
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 bg-blue-50 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-xs text-blue-700 font-medium">Property management</span>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-green-700 font-medium">Photo documentation</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-7 w-7 text-blue-500" />
                </motion.div>
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            onClick={() => handleSelectRole('agent')}
            className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500 to-transparent" />
              <div className="absolute top-4 right-4 w-24 h-24 bg-purple-500 rounded-full blur-2xl" />
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-purple-400 rounded-full blur-3xl" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            
            <div className="relative p-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all">
                    <Briefcase className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full border-3 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                  <div className="absolute inset-0 rounded-3xl border-2 border-white/30 animate-pulse" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl text-gray-900 mb-2 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">Agent</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Manage properties for multiple clients
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 bg-purple-50 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-xs text-purple-700 font-medium">Client management</span>
                    </div>
                    <div className="flex items-center gap-1 bg-orange-50 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-xs text-orange-700 font-medium">Property oversight</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-7 w-7 text-purple-500" />
                </motion.div>
              </div>
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
