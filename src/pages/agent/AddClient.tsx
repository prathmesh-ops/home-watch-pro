import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters').max(200),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof clientSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function AddClient() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: '',
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

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors below',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Client Added Successfully',
      description: `${formData.name} has been added to your client list`,
    });
    
    setIsLoading(false);
    navigate('/agent/clients');
  };

  return (
    <MobileLayout>
      <PageHeader title="Add New Client" showBack />

      <div className="flex-1 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pt-4"
        >
          {/* Icon Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-3 shadow-lg">
              <User className="h-10 w-10 text-white" />
            </div>
            <p className="text-muted-foreground text-center">
              Enter client details to add them to your portfolio
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Personal Information */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl p-5 border-2 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`bg-white border-2 ${errors.name ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <span className="font-medium">{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Mail className="h-4 w-4 text-gray-500" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`bg-white border-2 ${errors.email ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Phone className="h-4 w-4 text-gray-500" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`bg-white border-2 ${errors.phone ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-2xl p-5 border-2 border-green-200">
              <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">Street Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className={`bg-white border-2 ${errors.address ? 'border-red-300' : 'border-gray-200'} focus:border-green-500`}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City *</Label>
                    <Input
                      id="city"
                      placeholder="Austin"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className={`bg-white border-2 ${errors.city ? 'border-red-300' : 'border-gray-200'} focus:border-green-500`}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">State *</Label>
                    <Input
                      id="state"
                      placeholder="TX"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className={`bg-white border-2 ${errors.state ? 'border-red-300' : 'border-gray-200'} focus:border-green-500`}
                    />
                    {errors.state && (
                      <p className="text-xs text-red-600">{errors.state}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    placeholder="78701"
                    value={formData.zipCode}
                    onChange={(e) => handleChange('zipCode', e.target.value)}
                    className={`bg-white border-2 ${errors.zipCode ? 'border-red-300' : 'border-gray-200'} focus:border-green-500`}
                  />
                  {errors.zipCode && (
                    <p className="text-xs text-red-600">{errors.zipCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about the client..."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="bg-white border-2 border-gray-200 focus:border-primary resize-none"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Adding Client...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Add Client
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
