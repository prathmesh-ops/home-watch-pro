import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Camera, Cloud, Smartphone, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';

const features = [
  { icon: Camera, title: 'Smart Photo Capture', description: 'AI-guided photo documentation' },
  { icon: Shield, title: 'Insurance Ready', description: 'Policy-compliant records' },
  { icon: Cloud, title: 'Weather Alerts', description: 'Real-time risk notifications' },
  { icon: Smartphone, title: 'Mobile First', description: 'Document anywhere, anytime' },
];

const benefits = [
  'AI-powered damage detection',
  'GPS-verified photo capture',
  'Instant agent communication',
  'Secure cloud storage',
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">PropertyDoc</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/auth/select')}>
            Sign In
          </Button>
        </div>

        {/* Hero */}
        <div className="px-6 pt-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-foreground leading-tight">
              Document Your Property
              <span className="text-primary"> Smarter</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base">
              The complete mobile solution for homeowners and insurance agents to capture, manage, and analyze property documentation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 space-y-3"
          >
            <Button 
              className="w-full h-12 text-base" 
              onClick={() => navigate('/auth/select')}
            >
              Get Started
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="px-6 pb-8">
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                className="bg-card rounded-xl p-4 border border-border"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground text-sm">{feature.title}</h3>
                <p className="text-muted-foreground text-xs mt-1">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="px-6 pb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Why PropertyDoc?</h2>
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto px-6 py-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            Trusted by thousands of homeowners and agents
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
