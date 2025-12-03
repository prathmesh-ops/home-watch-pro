import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Send, Building2, User, Loader2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const mockClients = [
  { id: '1', name: 'Jane Doe', properties: ['123 Oak Street', '456 Pine Ave'] },
  { id: '2', name: 'John Smith', properties: ['789 Maple Dr'] },
];

const photoCategories = [
  { id: 'exterior', label: 'Exterior Photos', description: 'Front, back, and side views' },
  { id: 'interior', label: 'Interior Photos', description: 'Living areas, kitchen, bedrooms' },
  { id: 'roof', label: 'Roof Photos', description: 'Multiple angles, any damage' },
  { id: 'damage', label: 'Damage Photos', description: 'Specific damage areas' },
  { id: 'appliances', label: 'Appliances', description: 'Major appliances, HVAC' },
];

export default function RequestPhotos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(searchParams.get('clientId') || '');
  const [selectedProperty, setSelectedProperty] = useState(searchParams.get('propertyId') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');

  const currentClient = mockClients.find(c => c.id === selectedClient);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async () => {
    if (!selectedClient || !selectedProperty || selectedCategories.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please select a client, property, and at least one photo category',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Request Sent',
      description: 'Photo request has been sent to the homeowner',
    });
    
    setIsLoading(false);
    navigate('/agent/properties');
  };

  return (
    <MobileLayout>
      <PageHeader title="Request Photos" showBack />

      <div className="flex-1 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pt-4 space-y-6"
        >
          {/* Client Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Select Client *
            </Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a client" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Property Selection */}
          {selectedClient && currentClient && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Select Property *
              </Label>
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a property" />
                </SelectTrigger>
                <SelectContent>
                  {currentClient.properties.map((property, index) => (
                    <SelectItem key={index} value={property}>
                      {property}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Photo Categories */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-muted-foreground" />
              Required Photos *
            </Label>
            <div className="space-y-2">
              {photoCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                    selectedCategories.includes(category.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    className="mt-0.5"
                  />
                  <div className="text-left">
                    <p className="font-medium text-foreground">{category.label}</p>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Additional Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Add any specific instructions for the homeowner..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending Request...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Photo Request
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
