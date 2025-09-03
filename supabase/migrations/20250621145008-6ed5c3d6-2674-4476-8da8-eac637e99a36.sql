
-- Create tables for each dashboard module with proper structure

-- Leads table for CRM module
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted')),
  temperature TEXT NOT NULL DEFAULT 'cold' CHECK (temperature IN ('hot', 'warm', 'cold')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Voice calls table for Voice Agent module
CREATE TABLE IF NOT EXISTS public.voice_calls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  caller_phone TEXT,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'in_progress', 'failed')),
  resolution_status TEXT NOT NULL DEFAULT 'resolved' CHECK (resolution_status IN ('resolved', 'pending', 'escalated')),
  transcript TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Messages table for Inbox module
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL DEFAULT 'whatsapp' CHECK (platform IN ('whatsapp', 'website', 'email', 'sms')),
  message_type TEXT NOT NULL DEFAULT 'incoming' CHECK (message_type IN ('incoming', 'outgoing')),
  content TEXT NOT NULL,
  response_time_seconds INTEGER DEFAULT 0,
  is_automated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Bookings table for Bookings module
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_type TEXT NOT NULL DEFAULT 'consultation' CHECK (booking_type IN ('consultation', 'coaching_session', 'follow_up')),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  client_name TEXT,
  client_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Workflows table for Automation module
CREATE TABLE IF NOT EXISTS public.workflows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'failed')),
  trigger_type TEXT NOT NULL,
  actions_count INTEGER DEFAULT 0,
  success_rate INTEGER DEFAULT 0,
  last_run_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample data for testing
INSERT INTO public.leads (name, email, phone, source, status, temperature) VALUES
('Sarah Johnson', 'sarah@example.com', '+1234567890', 'website', 'new', 'hot'),
('Mike Chen', 'mike@example.com', '+1234567891', 'whatsapp', 'contacted', 'warm'),
('Emma Wilson', 'emma@example.com', '+1234567892', 'referral', 'qualified', 'hot'),
('David Brown', 'david@example.com', '+1234567893', 'social', 'converted', 'warm'),
('Lisa Garcia', 'lisa@example.com', '+1234567894', 'website', 'new', 'cold')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.voice_calls (caller_phone, duration_seconds, status, resolution_status) VALUES
('+1234567890', 180, 'completed', 'resolved'),
('+1234567891', 240, 'completed', 'resolved'),
('+1234567892', 120, 'completed', 'pending'),
('+1234567893', 300, 'failed', 'escalated'),
('+1234567894', 200, 'completed', 'resolved')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.messages (platform, message_type, content, response_time_seconds, is_automated) VALUES
('whatsapp', 'incoming', 'Hi, I need help with my coaching goals', 30, false),
('website', 'outgoing', 'Thank you for your interest! How can I help you?', 45, true),
('email', 'incoming', 'I want to book a consultation', 60, false),
('sms', 'outgoing', 'Your appointment is confirmed for tomorrow', 20, true),
('whatsapp', 'incoming', 'What are your coaching rates?', 35, false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.bookings (booking_type, scheduled_at, status, duration_minutes, client_name, client_email) VALUES
('consultation', NOW() + INTERVAL '1 day', 'scheduled', 60, 'Sarah Johnson', 'sarah@example.com'),
('coaching_session', NOW() + INTERVAL '2 days', 'scheduled', 90, 'Mike Chen', 'mike@example.com'),
('follow_up', NOW() + INTERVAL '3 days', 'scheduled', 30, 'Emma Wilson', 'emma@example.com'),
('consultation', NOW() - INTERVAL '1 day', 'completed', 60, 'David Brown', 'david@example.com'),
('coaching_session', NOW() - INTERVAL '2 days', 'cancelled', 90, 'Lisa Garcia', 'lisa@example.com')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.workflows (name, status, trigger_type, actions_count, success_rate, last_run_at) VALUES
('Lead Nurturing Sequence', 'active', 'New lead added', 5, 94, NOW() - INTERVAL '2 hours'),
('Follow-up Reminder', 'active', 'No response after 24h', 3, 87, NOW() - INTERVAL '1 hour'),
('Booking Confirmation', 'paused', 'New booking created', 4, 99, NOW() - INTERVAL '1 day'),
('Client Onboarding', 'active', 'Payment received', 6, 92, NOW() - INTERVAL '30 minutes'),
('Review Request', 'active', 'Session completed', 2, 85, NOW() - INTERVAL '4 hours')
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (these tables are for demo purposes, so we'll make them publicly readable)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access for demo
CREATE POLICY "Allow public read access on leads" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Allow public read access on voice_calls" ON public.voice_calls FOR SELECT USING (true);
CREATE POLICY "Allow public read access on messages" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Allow public read access on bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public read access on workflows" ON public.workflows FOR SELECT USING (true);
