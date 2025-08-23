-- Fix email confirmation failure due to NOT NULL on profiles.username
-- Allow username to be set later during Profile Setup
ALTER TABLE public.profiles
  ALTER COLUMN username DROP NOT NULL;