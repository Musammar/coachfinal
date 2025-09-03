/*
  # Business Onboarding Schema

  1. New Tables
    - `business_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `business_name` (text, required)
      - `business_email` (text, required)
      - `phone_number` (text, required)
      - `whatsapp_number` (text, required)
      - `business_niche` (text, required - health_coach, mental_coach, business_coach, etc.)
      - `monthly_clients` (integer, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `business_profiles` table
    - Add policy for authenticated users to manage their own business profile
*/

-- Create business_profiles table for storing detailed business information
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

-- Enable RLS on business_profiles
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for business_profiles
CREATE POLICY "Users can view their own business profile"
  ON public.business_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own business profile"
  ON public.business_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own business profile"
  ON public.business_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_business_profiles_niche ON public.business_profiles(business_niche);
CREATE INDEX IF NOT EXISTS idx_business_profiles_monthly_clients ON public.business_profiles(monthly_clients);

-- Update the existing profiles table to mark onboarding as incomplete by default
-- This ensures users go through the business onboarding flow
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'onboarding_completed'
  ) THEN
    UPDATE public.profiles SET onboarding_completed = FALSE WHERE onboarding_completed IS NULL;
  END IF;
END $$;