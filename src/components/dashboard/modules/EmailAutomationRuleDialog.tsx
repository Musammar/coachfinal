
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface EmailAutomationRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule?: any;
}

export const EmailAutomationRuleDialog: React.FC<EmailAutomationRuleDialogProps> = ({
  open,
  onOpenChange,
  rule
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: rule?.name || '',
    trigger_type: rule?.trigger_type || 'new_lead',
    template_id: rule?.template_id || '',
    delay_minutes: rule?.delay_minutes || 0,
    active: rule?.active ?? true
  });

  const queryClient = useQueryClient();

  // Fetch email templates for selection
  const { data: templates } = useQuery({
    queryKey: ['email-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_templates')
        .select('id, name, subject')
        .eq('active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (rule) {
        // Update existing rule
        const { error } = await supabase
          .from('email_automation_rules')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', rule.id);

        if (error) throw error;
        toast.success('Automation rule updated successfully!');
      } else {
        // Create new rule
        const { error } = await supabase
          .from('email_automation_rules')
          .insert([formData]);

        if (error) throw error;
        toast.success('Automation rule created successfully!');
      }

      queryClient.invalidateQueries({ queryKey: ['email-automation-rules'] });
      onOpenChange(false);
      setFormData({
        name: '',
        trigger_type: 'new_lead',
        template_id: '',
        delay_minutes: 0,
        active: true
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to save automation rule');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {rule ? 'Edit Automation Rule' : 'Create Automation Rule'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Rule Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Welcome Email for New Leads"
              required
            />
          </div>

          <div>
            <Label htmlFor="trigger_type">Trigger Type</Label>
            <Select
              value={formData.trigger_type}
              onValueChange={(value) => setFormData({ ...formData, trigger_type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new_lead">New Lead Added</SelectItem>
                <SelectItem value="status_change">Status Change</SelectItem>
                <SelectItem value="time_based">Time Based</SelectItem>
                <SelectItem value="interaction">After Interaction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="template_id">Email Template</Label>
            <Select
              value={formData.template_id}
              onValueChange={(value) => setFormData({ ...formData, template_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates?.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name} - {template.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="delay_minutes">Delay (Minutes)</Label>
            <Input
              id="delay_minutes"
              type="number"
              value={formData.delay_minutes}
              onChange={(e) => setFormData({ ...formData, delay_minutes: parseInt(e.target.value) || 0 })}
              placeholder="0"
              min="0"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
            <Label htmlFor="active">Active Rule</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : rule ? 'Update Rule' : 'Create Rule'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
