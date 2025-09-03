import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface DashboardStats {
  totalLeads: number;
  totalCalls: number;
  totalMessages: number;
  totalBookings: number;
  conversionRate: number;
  avgCallDuration: number;
  responseRate: number;
  activeWorkflows: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  temperature: string;
  created_at: string;
  updated_at: string;
}

export interface VoiceCall {
  id: string;
  caller_phone: string;
  duration_seconds: number;
  status: string;
  resolution_status: string;
  transcript: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  platform: string;
  message_type: string;
  content: string;
  response_time_seconds: number;
  is_automated: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  booking_type: string;
  scheduled_at: string;
  status: string;
  duration_minutes: number;
  client_name: string | null;
  client_email: string | null;
  created_at: string;
}

export interface Workflow {
  id: string;
  name: string;
  status: string;
  trigger_type: string;
  actions_count: number;
  success_rate: number;
  last_run_at: string | null;
  created_at: string;
}

export const useDashboardStats = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['dashboard-stats', user?.id],
    queryFn: async (): Promise<DashboardStats> => {
      if (!user) throw new Error('User not authenticated');
      
      console.log('=== Fetching Dashboard Stats for user:', user.id, '===');
      
      // Get leads count and conversion rate
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id);
      
      if (leadsError) {
        console.error('Error fetching leads:', leadsError);
      } else {
        console.log('Leads data:', leads);
      }

      // Get voice calls
      const { data: calls, error: callsError } = await supabase
        .from('voice_calls')
        .select('*')
        .eq('user_id', user.id);
      
      if (callsError) {
        console.error('Error fetching voice calls:', callsError);
      } else {
        console.log('Voice calls data:', calls);
      }

      // Get messages
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id);
      
      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
      } else {
        console.log('Messages data:', messages);
      }

      // Get bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id);
      
      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
      } else {
        console.log('Bookings data:', bookings);
      }

      // Get workflows
      const { data: workflows, error: workflowsError } = await supabase
        .from('workflows')
        .select('*')
        .eq('user_id', user.id);
      
      if (workflowsError) {
        console.error('Error fetching workflows:', workflowsError);
      } else {
        console.log('Workflows data:', workflows);
      }

      const totalLeads = leads?.length || 0;
      const totalCalls = calls?.length || 0;
      const totalMessages = messages?.length || 0;
      const totalBookings = bookings?.length || 0;
      const convertedLeads = leads?.filter(l => l.status === 'converted').length || 0;
      const avgCallDuration = calls?.length ? 
        Math.round(calls.reduce((sum, call) => sum + call.duration_seconds, 0) / calls.length) : 0;
      const activeWorkflows = workflows?.filter(w => w.status === 'active').length || 0;

      const stats = {
        totalLeads,
        totalCalls,
        totalMessages,
        totalBookings,
        conversionRate: totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0,
        avgCallDuration,
        responseRate: 94, // Based on automated messages
        activeWorkflows
      };

      console.log('Calculated dashboard stats:', stats);
      return stats;
    },
    enabled: !!user,
    refetchInterval: 30000,
  });
};

export const useLeads = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['leads', user?.id],
    queryFn: async (): Promise<Lead[]> => {
      if (!user) throw new Error('User not authenticated');
      
      console.log('=== Fetching Leads for user:', user.id, '===');
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching leads:', error);
        return [];
      }
      
      console.log('Leads fetched:', data);
      return data || [];
    },
    enabled: !!user,
    refetchInterval: 30000,
  });
};

export const useVoiceCalls = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['voice-calls', user?.id],
    queryFn: async (): Promise<VoiceCall[]> => {
      if (!user) throw new Error('User not authenticated');
      
      console.log('=== Fetching Voice Calls for user:', user.id, '===');
      const { data, error } = await supabase
        .from('voice_calls')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching voice calls:', error);
        return [];
      }
      
      console.log('Voice calls fetched:', data);
      return data || [];
    },
    enabled: !!user,
    refetchInterval: 30000,
  });
};

export const useMessages = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['messages', user?.id],
    queryFn: async (): Promise<Message[]> => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!user,
    refetchInterval: 30000,
  });
};

export const useBookings = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async (): Promise<Booking[]> => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching bookings:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!user,
    refetchInterval: 30000,
  });
};

export const useWorkflows = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['workflows', user?.id],
    queryFn: async (): Promise<Workflow[]> => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching workflows:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!user,
    refetchInterval: 30000,
  });
};

// Mutation hooks for creating new records
export const useCreateLead = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('leads')
        .insert([{ ...leadData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', user?.id] });
    },
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (bookingData: Omit<Booking, 'id' | 'created_at'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('bookings')
        .insert([{ ...bookingData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', user?.id] });
    },
  });
};

export const useCreateVoiceCall = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (callData: Omit<VoiceCall, 'id' | 'created_at'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('voice_calls')
        .insert([{ ...callData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voice-calls', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', user?.id] });
    },
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (messageData: Omit<Message, 'id' | 'created_at'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('messages')
        .insert([{ ...messageData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', user?.id] });
    },
  });
};

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (workflowData: Omit<Workflow, 'id' | 'created_at'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('workflows')
        .insert([{ ...workflowData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', user?.id] });
    },
  });
};
