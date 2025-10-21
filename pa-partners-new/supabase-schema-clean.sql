-- PA Partners Investor Portal Database Schema
-- CLEAN INSTALL - Drops existing tables and recreates everything
-- Run this in your Supabase SQL Editor

-- Drop existing tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS public.approval_tokens CASCADE;
DROP TABLE IF EXISTS public.tax_documents CASCADE;
DROP TABLE IF EXISTS public.distributions CASCADE;
DROP TABLE IF EXISTS public.investments CASCADE;
DROP TABLE IF EXISTS public.investor_profiles CASCADE;

-- Drop existing triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_investor_profiles_updated_at ON public.investor_profiles;
DROP TRIGGER IF EXISTS update_investments_updated_at ON public.investments;

-- Drop existing functions
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Drop existing type
DROP TYPE IF EXISTS approval_status CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for approval status
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'denied');

-- Investor profiles table (extends auth.users)
CREATE TABLE public.investor_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  company_name TEXT,
  entity_type TEXT, -- LLC, Trust, Individual, etc.
  accredited_investor BOOLEAN DEFAULT false,
  
  -- Approval workflow
  approval_status approval_status DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  denied_reason TEXT,
  
  -- Investment details (populated after approval)
  total_commitment NUMERIC(12,2) DEFAULT 0,
  funds_deployed NUMERIC(12,2) DEFAULT 0,
  available_capital NUMERIC(12,2) DEFAULT 0,
  
  -- Metadata
  signup_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Investments table
CREATE TABLE public.investments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  investor_id UUID REFERENCES public.investor_profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Property details
  property_id TEXT NOT NULL,
  property_name TEXT NOT NULL,
  property_address TEXT,
  property_type TEXT NOT NULL, -- multifamily, commercial, mixed-use, etc.
  
  -- Investment details
  investment_amount NUMERIC(12,2) NOT NULL,
  ownership_percentage NUMERIC(5,2) NOT NULL,
  acquisition_date DATE NOT NULL,
  
  -- Performance metrics
  current_value NUMERIC(12,2),
  total_return NUMERIC(12,2) DEFAULT 0,
  return_percentage NUMERIC(5,2) DEFAULT 0,
  cash_on_cash NUMERIC(5,2) DEFAULT 0,
  irr NUMERIC(5,2) DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'active', -- active, pending, exited
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Distributions table
CREATE TABLE public.distributions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  investment_id UUID REFERENCES public.investments(id) ON DELETE CASCADE NOT NULL,
  investor_id UUID REFERENCES public.investor_profiles(id) ON DELETE CASCADE NOT NULL,
  property_name TEXT NOT NULL,
  
  -- Distribution details
  amount NUMERIC(12,2) NOT NULL,
  distribution_date DATE NOT NULL,
  period TEXT NOT NULL, -- Q1 2025, etc.
  type TEXT NOT NULL, -- operating-income, refinance, sale, capital-return
  
  -- Payment details
  status TEXT DEFAULT 'pending', -- pending, processing, paid
  payment_method TEXT,
  transaction_id TEXT, -- Stripe or bank reference
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax documents table
CREATE TABLE public.tax_documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  investor_id UUID REFERENCES public.investor_profiles(id) ON DELETE CASCADE NOT NULL,
  investment_id UUID REFERENCES public.investments(id) ON DELETE SET NULL,
  
  -- Document details
  year INTEGER NOT NULL,
  document_type TEXT NOT NULL, -- k1, 1099, year-end-statement, distribution-summary
  document_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'available', -- available, pending, amended
  property_name TEXT,
  
  -- Metadata
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Approval tokens table (for email approval links)
CREATE TABLE public.approval_tokens (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  investor_id UUID REFERENCES public.investor_profiles(id) ON DELETE CASCADE NOT NULL,
  token TEXT NOT NULL UNIQUE,
  action TEXT NOT NULL, -- approve, deny
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT false,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_investor_profiles_email ON public.investor_profiles(email);
CREATE INDEX idx_investor_profiles_approval_status ON public.investor_profiles(approval_status);
CREATE INDEX idx_investments_investor_id ON public.investments(investor_id);
CREATE INDEX idx_investments_status ON public.investments(status);
CREATE INDEX idx_distributions_investor_id ON public.distributions(investor_id);
CREATE INDEX idx_distributions_distribution_date ON public.distributions(distribution_date DESC);
CREATE INDEX idx_tax_documents_investor_id ON public.tax_documents(investor_id);
CREATE INDEX idx_tax_documents_year ON public.tax_documents(year DESC);
CREATE INDEX idx_approval_tokens_token ON public.approval_tokens(token);

-- Enable Row Level Security
ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approval_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for investor_profiles
CREATE POLICY "Investors can view own profile"
  ON public.investor_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Investors can update own profile"
  ON public.investor_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for investments
CREATE POLICY "Investors can view own investments"
  ON public.investments FOR SELECT
  USING (auth.uid() = investor_id);

-- RLS Policies for distributions
CREATE POLICY "Investors can view own distributions"
  ON public.distributions FOR SELECT
  USING (auth.uid() = investor_id);

-- RLS Policies for tax_documents
CREATE POLICY "Investors can view own tax documents"
  ON public.tax_documents FOR SELECT
  USING (auth.uid() = investor_id);

-- RLS Policies for approval_tokens
CREATE POLICY "No public access to approval tokens"
  ON public.approval_tokens FOR ALL
  USING (false);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_investor_profiles_updated_at
  BEFORE UPDATE ON public.investor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_investments_updated_at
  BEFORE UPDATE ON public.investments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create investor profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.investor_profiles (id, email, full_name, approval_status)
  VALUES (
    NEW.id,
    NEW.email,
    CASE
      WHEN lower(NEW.email) = 'invest@papartners.co' THEN 'Investor Admin'
      ELSE COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Investor')
    END,
    'pending'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create investor profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Success message
DO $$ 
BEGIN 
  RAISE NOTICE '✅ Database schema created successfully!';
  RAISE NOTICE '📊 Tables created: investor_profiles, investments, distributions, tax_documents, approval_tokens';
  RAISE NOTICE '🔒 Row Level Security enabled on all tables';
  RAISE NOTICE '⚡ Indexes created for performance';
  RAISE NOTICE '🎯 Ready to use!';
END $$;
