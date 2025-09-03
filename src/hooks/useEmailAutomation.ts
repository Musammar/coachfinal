
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useEmailAutomation = () => {
  const queryClient = useQueryClient();

  // Trigger email automation
  const triggerAutomation = useMutation({
    mutationFn: async ({ leadId, triggerType, triggerData }: {
      leadId: string;
      triggerType: string;
      triggerData?: any;
    }) => {
      const { error } = await supabase.rpc('trigger_email_automation', {
        p_lead_id: leadId,
        p_trigger_type: triggerType,
        p_trigger_data: triggerData
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-queue'] });
      toast.success('Email automation triggered successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to trigger email automation');
    }
  });

  // Update email engagement
  const updateEngagement = useMutation({
    mutationFn: async ({ emailId, engagementType }: {
      emailId: string;
      engagementType: 'opened' | 'clicked' | 'replied';
    }) => {
      const updateData: any = {};
      updateData[`${engagementType}_at`] = new Date().toISOString();
      
      const { error } = await supabase
        .from('email_queue')
        .update(updateData)
        .eq('id', emailId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-queue'] });
    }
  });

  // Get email analytics
  const getEmailAnalytics = useQuery({
    queryKey: ['email-analytics'],
    queryFn: async () => {
      const { data: emailStats, error } = await supabase
        .from('email_queue')
        .select('status, opened_at, clicked_at, replied_at')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const analytics = {
        totalSent: emailStats.filter(e => e.status === 'sent').length,
        totalOpened: emailStats.filter(e => e.opened_at).length,
        totalClicked: emailStats.filter(e => e.clicked_at).length,
        totalReplied: emailStats.filter(e => e.replied_at).length,
        openRate: 0,
        clickRate: 0,
        replyRate: 0
      };
      
      if (analytics.totalSent > 0) {
        analytics.openRate = Math.round((analytics.totalOpened / analytics.totalSent) * 100);
        analytics.clickRate = Math.round((analytics.totalClicked / analytics.totalSent) * 100);
        analytics.replyRate = Math.round((analytics.totalReplied / analytics.totalSent) * 100);
      }
      
      return analytics;
    },
  });

  return {
    triggerAutomation,
    updateEngagement,
    getEmailAnalytics
  };
};
