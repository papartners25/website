-- Newsletter System Migration
-- Run this in your Supabase SQL Editor to add newsletter functionality
-- This is safe to run on an existing database

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- active, unsubscribed
  source TEXT DEFAULT 'website', -- website, manual, import
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON public.newsletter_subscribers(status);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin can manage subscribers" ON public.newsletter_subscribers;

-- Allow anyone to subscribe (via API route)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Only admin can view subscribers
CREATE POLICY "Admin can view subscribers"
  ON public.newsletter_subscribers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.investor_profiles
      WHERE id = auth.uid() AND email = 'invest@papartners.co'
    )
  );

-- Only admin can update/delete subscribers
CREATE POLICY "Admin can manage subscribers"
  ON public.newsletter_subscribers FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.investor_profiles
      WHERE id = auth.uid() AND email = 'invest@papartners.co'
    )
  );

-- Newsletter sends table (track email campaigns)
CREATE TABLE IF NOT EXISTS public.newsletter_sends (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  sent_by UUID REFERENCES public.investor_profiles(id),
  recipient_count INTEGER DEFAULT 0,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.newsletter_sends ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin can view sends" ON public.newsletter_sends;
DROP POLICY IF EXISTS "Admin can create sends" ON public.newsletter_sends;

-- Only admin can view and create sends
CREATE POLICY "Admin can view sends"
  ON public.newsletter_sends FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.investor_profiles
      WHERE id = auth.uid() AND email = 'invest@papartners.co'
    )
  );

CREATE POLICY "Admin can create sends"
  ON public.newsletter_sends FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.investor_profiles
      WHERE id = auth.uid() AND email = 'invest@papartners.co'
    )
  );

