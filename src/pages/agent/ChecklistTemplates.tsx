import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardList, Plus, Eye, Send, Copy, ChevronRight, CheckCircle2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  requiredCount: number;
  usageCount: number;
  isCustom: boolean;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Standard Renewal',
    description: 'Complete property documentation for policy renewal',
    itemCount: 12,
    requiredCount: 8,
    usageCount: 45,
    isCustom: false,
  },
  {
    id: '2',
    name: 'Storm Damage Assessment',
    description: 'Post-storm documentation requirements',
    itemCount: 8,
    requiredCount: 6,
    usageCount: 12,
    isCustom: false,
  },
  {
    id: '3',
    name: 'New Policy Onboarding',
    description: 'Initial property documentation for new clients',
    itemCount: 15,
    requiredCount: 10,
    usageCount: 28,
    isCustom: false,
  },
  {
    id: '4',
    name: 'Roof Inspection',
    description: 'Custom template for detailed roof assessment',
    itemCount: 6,
    requiredCount: 5,
    usageCount: 8,
    isCustom: true,
  },
];

export default function ChecklistTemplates() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [templates] = useState(mockTemplates);

  const handleAssign = (templateId: string) => {
    navigate(`/agent/templates/${templateId}/assign`);
  };

  const handlePreview = (templateId: string) => {
    navigate(`/agent/templates/${templateId}`);
  };

  const handleDuplicate = (template: Template) => {
    toast({
      title: 'Template Duplicated',
      description: `"${template.name}" has been duplicated`,
    });
  };

  return (
    <MobileLayout>
      <PageHeader
        title="Checklist Templates"
        subtitle={`${templates.length} templates`}
        showBack
        rightAction={
          <Button size="icon" variant="ghost">
            <Plus className="h-5 w-5" />
          </Button>
        }
      />

      <div className="flex-1 pb-8">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-4 mt-4 p-4 bg-primary/10 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <ClipboardList className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Checklist Templates</p>
              <p className="text-sm text-muted-foreground mt-1">
                Select and assign templates to clients for structured documentation collection.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Templates List */}
        <div className="px-4 mt-4 space-y-3">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{template.name}</h3>
                    {template.isCustom && (
                      <Badge variant="secondary" className="text-xs">Custom</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  {template.itemCount} items ({template.requiredCount} required)
                </div>
                <div>
                  Used {template.usageCount}x
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleAssign(template.id)}
                >
                  <Send className="h-3.5 w-3.5 mr-1" />
                  Assign
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview(template.id)}
                >
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDuplicate(template)}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Custom */}
        <div className="px-4 mt-6">
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Custom Template
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
