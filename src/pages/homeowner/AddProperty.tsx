import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Home, Calendar, FileText, Loader2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const propertySchema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters').max(200),
  city: z.string().min(2, 'City is required').max(100),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  propertyType: z.enum(['house', 'apartment', 'condo', 'townhouse']),
  yearBuilt: z.string().regex(/^\d{4}$/, 'Enter valid year').refine(
    (val) => parseInt(val) >= 1800 && parseInt(val) <= new Date().getFullYear(),
    'Year must be between 1800 and current year'
  ),
  policyNumber: z.string().optional(),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof propertySchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function AddProperty() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<FormData>({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'house',
    yearBuilt: '',
    policyNumber: '',
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
      propertySchema.parse(formData);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    toast({
      title: 'Property Added',
      description: 'Your property has been successfully added',
    });
    
    setIsLoading(false);
    navigate('/properties');
  };

  return (
    <MobileLayout>
      <PageHeader title="Add Property" showBack />

      <div className="flex-1 pb-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="px-4 pt-4 space-y-4"
        >
          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Street Address *
            </Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className={errors.address ? 'border-destructive' : ''}
            />
            {errors.address && (
              <p className="text-xs text-destructive">{errors.address}</p>
            )}
          </div>

          {/* City & State */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="Austin"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className={errors.city ? 'border-destructive' : ''}
              />
              {errors.city && (
                <p className="text-xs text-destructive">{errors.city}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select value={formData.state} onValueChange={(v) => handleChange('state', v)}>
                <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-xs text-destructive">{errors.state}</p>
              )}
            </div>
          </div>

          {/* ZIP Code */}
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code *</Label>
            <Input
              id="zipCode"
              placeholder="78701"
              value={formData.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              maxLength={10}
              className={errors.zipCode ? 'border-destructive' : ''}
            />
            {errors.zipCode && (
              <p className="text-xs text-destructive">{errors.zipCode}</p>
            )}
          </div>

          {/* Property Type & Year */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                Type *
              </Label>
              <Select value={formData.propertyType} onValueChange={(v) => handleChange('propertyType', v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearBuilt" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Year Built *
              </Label>
              <Input
                id="yearBuilt"
                placeholder="2020"
                value={formData.yearBuilt}
                onChange={(e) => handleChange('yearBuilt', e.target.value)}
                maxLength={4}
                className={errors.yearBuilt ? 'border-destructive' : ''}
              />
              {errors.yearBuilt && (
                <p className="text-xs text-destructive">{errors.yearBuilt}</p>
              )}
            </div>
          </div>

          {/* Policy Number */}
          <div className="space-y-2">
            <Label htmlFor="policyNumber" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Policy Number (Optional)
            </Label>
            <Input
              id="policyNumber"
              placeholder="POL-123456"
              value={formData.policyNumber}
              onChange={(e) => handleChange('policyNumber', e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional details about your property..."
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding Property...
                </>
              ) : (
                'Add Property'
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </MobileLayout>
  );
}
