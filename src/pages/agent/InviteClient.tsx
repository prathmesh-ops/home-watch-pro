import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Phone, MessageSquare, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
});

type FormData = z.infer<typeof clientSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function InviteClient() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      clientSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleGenerateLink = async () => {
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors below',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const generatedLink = `https://propertydoc.app/invite/${Math.random().toString(36).substring(7)}`;
    setInviteLink(generatedLink);
    setIsLoading(false);

    toast({
      title: 'Invite Link Generated',
      description: 'You can now share this link with your client',
    });
  };

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      toast({
        title: 'Link Copied',
        description: 'Invite link copied to clipboard',
      });
    }
  };

  const handleSendViaSMS = () => {
    toast({
      title: 'SMS Sent',
      description: `Invite sent to ${formData.phone}`,
    });
  };

  const handleSendViaEmail = () => {
    toast({
      title: 'Email Sent',
      description: `Invite sent to ${formData.email}`,
    });
  };

  return (
    <MobileLayout>
      <PageHeader title="Invite Client" showBack />

      <div className="flex-1 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pt-4"
        >
          {/* Icon Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground text-center">
              Enter your client's details to generate an invite link
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
            </div>

            {!inviteLink ? (
              <Button
                className="w-full mt-4"
                onClick={handleGenerateLink}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Invite Link'
                )}
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mt-6"
              >
                {/* Success Message */}
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm text-success font-medium">Invite link ready!</span>
                </div>

                {/* Link Display */}
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Invite Link</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm text-foreground truncate">{inviteLink}</code>
                    <Button variant="ghost" size="icon" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Send Options */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleSendViaSMS}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send SMS
                  </Button>
                  <Button variant="outline" onClick={handleSendViaEmail}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setInviteLink(null);
                    setFormData({ name: '', email: '', phone: '' });
                  }}
                >
                  Invite Another Client
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
