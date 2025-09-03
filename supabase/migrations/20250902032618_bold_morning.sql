/*
  # CoachFlow AI Complete Database Schema

  1. New Tables
    - `profiles` - User profile information
    - `business_profiles` - Business-specific details for coaches
    - `leads` - Lead management and tracking
    - `voice_calls` - AI voice agent call records
    - `messages` - Multi-platform messaging hub
    - `bookings` - Appointment and session management
    - `workflows` - Automation workflow definitions
    - `email_templates` - Email template management
    - `email_campaigns` - Email campaign tracking
    - `email_automation_rules` - Automation rule definitions
    - `email_queue` - Email sending queue management

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for user data isolation
    - Proper foreign key relationships

  3. Features
    - Complete CRM functionality
    - Voice agent integration
    - Multi-platform messaging
    - Email automation system
    - Booking management
    - Workflow automation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for basic user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  website TEXT,
  industry TEXT,
  business_type TEXT NOT NULL DEFAULT 'coaching' CHECK (business_type IN ('coaching', 'consulting', 'healthcare', 'real_estate', 'ecommerce', 'other')),
  team_size TEXT NOT NULL DEFAULT '1-5' CHECK (team_size IN ('1-5', '6-20', '21-50', '51-100', '100+')),
  monthly_leads_goal INTEGER,
  primary_communication TEXT NOT NULL DEFAULT 'email' CHECK (primary_communication IN ('phone', 'email', 'sms', 'whatsapp')),
  current_tools TEXT[],
  pain_points TEXT[],
  goals TEXT[],
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business_profiles table for detailed business information
CREATE TABLE IF NOT EXISTS public.business_profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  business_name TEXT NOT NULL,
  business_email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  business_niche TEXT NOT NULL CHECK (business_niche IN (
    'health_coach', 
    'mental_coach', 
    'business_coach', 
    'life_coach', 
    'fitness_coach', 
    'career_coach', 
    'relationship_coach', 
    'executive_coach',
    'wellness_coach',
    'nutrition_coach',
    'mindset_coach',
    'other'
  )),
  monthly_clients INTEGER NOT NULL CHECK (monthly_clients >= 0),
  onboarding_completed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table for CRM functionality
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'website' CHECK (source IN ('website', 'whatsapp', 'social_media', 'referral', 'email_campaign', 'cold_outreach', 'other')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted')),
  temperature TEXT NOT NULL DEFAULT 'cold' CHECK (temperature IN ('hot', 'warm', 'cold')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create voice_calls table for AI voice agent
CREATE TABLE IF NOT EXISTS public.voice_calls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  caller_phone TEXT,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'in_progress', 'failed')),
  resolution_status TEXT NOT NULL DEFAULT 'resolved' CHECK (resolution_status IN ('resolved', 'pending', 'escalated')),
  transcript TEXT,
  call_summary TEXT,
  lead_id UUID REFERENCES public.leads(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table for multi-platform messaging
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  platform TEXT NOT NULL DEFAULT 'whatsapp' CHECK (platform IN ('whatsapp', 'website', 'email', 'sms', 'instagram', 'facebook')),
  message_type TEXT NOT NULL DEFAULT 'incoming' CHECK (message_type IN ('incoming', 'outgoing')),
  content TEXT NOT NULL,
  response_time_seconds INTEGER DEFAULT 0,
  is_automated BOOLEAN DEFAULT false,
  lead_id UUID REFERENCES public.leads(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table for appointment management
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  booking_type TEXT NOT NULL DEFAULT 'consultation' CHECK (booking_type IN ('consultation', 'coaching_session', 'follow_up', 'discovery_call')),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show', 'rescheduled')),
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  client_name TEXT,
  client_email TEXT,
  client_phone TEXT,
  lead_id UUID REFERENCES public.leads(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workflows table for automation
CREATE TABLE IF NOT EXISTS public.workflows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'failed', 'draft')),
  trigger_type TEXT NOT NULL,
  trigger_conditions JSONB,
  actions JSONB,
  actions_count INTEGER DEFAULT 0,
  success_rate INTEGER DEFAULT 0,
  last_run_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create email_templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('welcome', 'follow_up', 'sequence', 'custom', 'reminder', 'thank_you')),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create email_campaigns table
CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  template_id UUID REFERENCES public.email_templates(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  total_recipients INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  replied_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create email_automation_rules table
CREATE TABLE IF NOT EXISTS public.email_automation_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('new_lead', 'status_change', 'time_based', 'interaction', 'booking_created', 'booking_completed')),
  trigger_conditions JSONB,
  template_id UUID REFERENCES public.email_templates(id),
  delay_minutes INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create email_queue table
CREATE TABLE IF NOT EXISTS public.email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id),
  template_id UUID REFERENCES public.email_templates(id),
  campaign_id UUID REFERENCES public.email_campaigns(id),
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'sending', 'sent', 'failed', 'cancelled')),
  scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  replied_at TIMESTAMP WITH TIME ZONE,
  bounce_reason TEXT,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_queue ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Business profiles policies
CREATE POLICY "Users can view their own business profile" ON public.business_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own business profile" ON public.business_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own business profile" ON public.business_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Leads policies
CREATE POLICY "Users can view their own leads" ON public.leads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own leads" ON public.leads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads" ON public.leads
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads" ON public.leads
  FOR DELETE USING (auth.uid() = user_id);

-- Voice calls policies
CREATE POLICY "Users can view their own voice calls" ON public.voice_calls
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own voice calls" ON public.voice_calls
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own voice calls" ON public.voice_calls
  FOR UPDATE USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON public.messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages" ON public.messages
  FOR UPDATE USING (auth.uid() = user_id);

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookings" ON public.bookings
  FOR DELETE USING (auth.uid() = user_id);

-- Workflows policies
CREATE POLICY "Users can view their own workflows" ON public.workflows
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workflows" ON public.workflows
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workflows" ON public.workflows
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workflows" ON public.workflows
  FOR DELETE USING (auth.uid() = user_id);

-- Email templates policies
CREATE POLICY "Users can manage their own email templates" ON public.email_templates
  FOR ALL USING (auth.uid() = user_id);

-- Email campaigns policies
CREATE POLICY "Users can manage their own email campaigns" ON public.email_campaigns
  FOR ALL USING (auth.uid() = user_id);

-- Email automation rules policies
CREATE POLICY "Users can manage their own automation rules" ON public.email_automation_rules
  FOR ALL USING (auth.uid() = user_id);

-- Email queue policies
CREATE POLICY "Users can manage their own email queue" ON public.email_queue
  FOR ALL USING (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, 
    business_type, 
    team_size, 
    primary_communication, 
    created_at, 
    updated_at,
    onboarding_completed
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'New User'),
    'coaching',
    '1-5',
    'email',
    NOW(),
    NOW(),
    false
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to trigger email automation
CREATE OR REPLACE FUNCTION public.trigger_email_automation(
    p_lead_id UUID,
    p_trigger_type TEXT,
    p_trigger_data JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    rule_record RECORD;
    lead_record RECORD;
BEGIN
    -- Get lead information
    SELECT * INTO lead_record FROM public.leads WHERE id = p_lead_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Lead not found';
    END IF;

    -- Find matching automation rules
    FOR rule_record IN 
        SELECT * FROM public.email_automation_rules 
        WHERE trigger_type = p_trigger_type 
        AND active = true 
        AND user_id = lead_record.user_id
    LOOP
        -- Add to email queue with delay
        INSERT INTO public.email_queue (
            user_id, lead_id, template_id, to_email, subject, content,
            scheduled_at
        )
        SELECT 
            lead_record.user_id,
            p_lead_id,
            rule_record.template_id,
            lead_record.email,
            templates.subject,
            templates.content,
            now() + (rule_record.delay_minutes || ' minutes')::INTERVAL
        FROM public.email_templates templates 
        WHERE templates.id = rule_record.template_id
        AND templates.user_id = lead_record.user_id;
    END LOOP;
END;
$$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding ON public.profiles(onboarding_completed);
CREATE INDEX IF NOT EXISTS idx_business_profiles_niche ON public.business_profiles(business_niche);
CREATE INDEX IF NOT EXISTS idx_business_profiles_monthly_clients ON public.business_profiles(monthly_clients);
CREATE INDEX IF NOT EXISTS idx_leads_user_id ON public.leads(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_temperature ON public.leads(temperature);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_voice_calls_user_id ON public.voice_calls(user_id);
CREATE INDEX IF NOT EXISTS idx_voice_calls_status ON public.voice_calls(status);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON public.messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_platform ON public.messages(platform);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_at ON public.bookings(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON public.workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_status ON public.workflows(status);
CREATE INDEX IF NOT EXISTS idx_email_templates_user_id ON public.email_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_email_templates_type ON public.email_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_user_id ON public.email_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON public.email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_automation_rules_user_id ON public.email_automation_rules(user_id);
CREATE INDEX IF NOT EXISTS idx_email_automation_trigger ON public.email_automation_rules(trigger_type);
CREATE INDEX IF NOT EXISTS idx_email_queue_user_id ON public.email_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON public.email_queue(status);
CREATE INDEX IF NOT EXISTS idx_email_queue_scheduled ON public.email_queue(scheduled_at);

-- Insert sample data for demonstration (optional)
-- This data will only be visible to the user who creates it due to RLS policies

-- Sample email templates
INSERT INTO public.email_templates (name, subject, content, template_type, user_id) 
SELECT 
  'Welcome Email',
  'Welcome to CoachFlow AI!',
  'Dear {{name}},

Welcome to CoachFlow AI! We''re excited to help you transform your coaching practice with our AI-powered automation platform.

Your journey to scaling your coaching business starts now. Our AI assistant will help you:
- Capture and qualify leads automatically
- Handle client communications 24/7
- Schedule appointments seamlessly
- Track your business performance

If you have any questions, our support team is here to help.

Best regards,
The CoachFlow AI Team',
  'welcome',
  auth.uid()
WHERE auth.uid() IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO public.email_templates (name, subject, content, template_type, user_id) 
SELECT 
  'Follow-up Email',
  'Let''s continue your coaching journey',
  'Hi {{name}},

I wanted to follow up on our recent conversation about your coaching goals.

Our AI-powered platform can help you:
- Automate lead generation and qualification
- Manage client communications across all channels
- Scale your practice without increasing workload

Would you like to schedule a quick call to discuss how CoachFlow AI can transform your coaching business?

Best regards,
Your CoachFlow AI Assistant',
  'follow_up',
  auth.uid()
WHERE auth.uid() IS NOT NULL
ON CONFLICT DO NOTHING;

-- Sample automation rule
INSERT INTO public.email_automation_rules (name, trigger_type, template_id, delay_minutes, user_id)
SELECT 
  'Welcome New Leads',
  'new_lead',
  (SELECT id FROM public.email_templates WHERE template_type = 'welcome' AND user_id = auth.uid() LIMIT 1),
  5,
  auth.uid()
WHERE auth.uid() IS NOT NULL
ON CONFLICT DO NOTHING;