
-- Create CoachFlow main schema tables starting with Email Automation Module

-- Email Templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    template_type TEXT NOT NULL, -- 'welcome', 'follow_up', 'sequence', 'custom'
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES auth.users(id)
);

-- Email Campaigns table
CREATE TABLE IF NOT EXISTS public.email_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    template_id UUID REFERENCES public.email_templates(id),
    status TEXT DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'sent', 'paused'
    scheduled_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    total_recipients INTEGER DEFAULT 0,
    sent_count INTEGER DEFAULT 0,
    opened_count INTEGER DEFAULT 0,
    clicked_count INTEGER DEFAULT 0,
    replied_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES auth.users(id)
);

-- Email Automation Rules table
CREATE TABLE IF NOT EXISTS public.email_automation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    trigger_type TEXT NOT NULL, -- 'new_lead', 'status_change', 'time_based', 'interaction'
    trigger_conditions JSONB,
    template_id UUID REFERENCES public.email_templates(id),
    delay_minutes INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES auth.users(id)
);

-- Email Queue table for managing outbound emails
CREATE TABLE IF NOT EXISTS public.email_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES public.leads(id),
    template_id UUID REFERENCES public.email_templates(id),
    campaign_id UUID REFERENCES public.email_campaigns(id),
    to_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'queued', -- 'queued', 'sending', 'sent', 'failed', 'cancelled'
    scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    sent_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    replied_at TIMESTAMP WITH TIME ZONE,
    bounce_reason TEXT,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES auth.users(id)
);

-- Enable RLS for email automation tables
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_queue ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for email automation
CREATE POLICY "Users can manage their own email templates" ON public.email_templates
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own email campaigns" ON public.email_campaigns
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own automation rules" ON public.email_automation_rules
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own email queue" ON public.email_queue
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes for email automation
CREATE INDEX IF NOT EXISTS idx_email_templates_type ON public.email_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON public.email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_scheduled ON public.email_campaigns(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_email_automation_trigger ON public.email_automation_rules(trigger_type);
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON public.email_queue(status);
CREATE INDEX IF NOT EXISTS idx_email_queue_scheduled ON public.email_queue(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_email_queue_lead_id ON public.email_queue(lead_id);

-- Add function to trigger email automation
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
    queue_id UUID;
BEGIN
    -- Find matching automation rules
    FOR rule_record IN 
        SELECT * FROM public.email_automation_rules 
        WHERE trigger_type = p_trigger_type 
        AND active = true 
        AND user_id = auth.uid()
    LOOP
        -- Add to email queue with delay
        INSERT INTO public.email_queue (
            lead_id, template_id, to_email, subject, content,
            scheduled_at, user_id
        )
        SELECT 
            p_lead_id,
            rule_record.template_id,
            leads.email,
            templates.subject,
            templates.content,
            now() + (rule_record.delay_minutes || ' minutes')::INTERVAL,
            auth.uid()
        FROM public.leads
        JOIN public.email_templates templates ON templates.id = rule_record.template_id
        WHERE leads.id = p_lead_id;
    END LOOP;
END;
$$;
