
-- Fix the profiles table constraints that are causing signup failures
-- The business_type and other required fields need proper defaults

-- Update the profiles table to have proper defaults for required fields
ALTER TABLE public.profiles 
ALTER COLUMN business_type SET DEFAULT 'coaching';

ALTER TABLE public.profiles 
ALTER COLUMN team_size SET DEFAULT '1-5';

ALTER TABLE public.profiles 
ALTER COLUMN primary_communication SET DEFAULT 'email';

-- Update the handle_new_user function to properly handle the signup process
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

-- Ensure RLS policies are properly set
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Fix any existing RLS policies for other tables that might be causing issues
DROP POLICY IF EXISTS "Users can view their own leads" ON public.leads;
DROP POLICY IF EXISTS "Users can insert their own leads" ON public.leads;
DROP POLICY IF EXISTS "Users can update their own leads" ON public.leads;
DROP POLICY IF EXISTS "Users can delete their own leads" ON public.leads;

CREATE POLICY "Users can view their own leads" ON public.leads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own leads" ON public.leads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads" ON public.leads
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads" ON public.leads
  FOR DELETE USING (auth.uid() = user_id);
