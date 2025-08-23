-- Create admin role system and fix security issues

-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.is_admin());

-- Fix contacts table security - only admins can read contact submissions
CREATE POLICY "Only admins can view contact submissions" 
ON public.contacts 
FOR SELECT 
USING (public.is_admin());

-- Fix subscriptions table security - only admins can view all subscriptions
CREATE POLICY "Only admins can view all subscriptions" 
ON public.subscriptions 
FOR SELECT 
USING (public.is_admin());

-- Drop the existing subscription policy that referenced auth.users
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscriptions;

-- Recreate RPC functions for contact and subscription insertion
CREATE OR REPLACE FUNCTION public.insert_contact(
    contact_name text, 
    contact_email text, 
    contact_subject text, 
    contact_category text, 
    contact_message text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO contacts (name, email, subject, category, message)
  VALUES (contact_name, contact_email, contact_subject, contact_category, contact_message);
END;
$$;

CREATE OR REPLACE FUNCTION public.insert_subscription(subscription_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO subscriptions (email)
  VALUES (subscription_email)
  ON CONFLICT (email) DO NOTHING;
END;
$$;