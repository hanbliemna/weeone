-- Fix email verification issues by allowing NULL values for fields not available at signup
-- This prevents the NOT NULL constraint violations when users verify their email

-- Make date_of_birth nullable since it's not available during signup
ALTER TABLE public.profiles 
  ALTER COLUMN date_of_birth DROP NOT NULL;

-- Make nationality nullable since it's not available during signup  
ALTER TABLE public.profiles 
  ALTER COLUMN nationality DROP NOT NULL;

-- Make country_of_residence nullable since it's not available during signup
ALTER TABLE public.profiles 
  ALTER COLUMN country_of_residence DROP NOT NULL;

-- Update the handle_new_user trigger to only create profile when email is confirmed
-- and handle the verification status properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only insert if email is confirmed to avoid constraint violations
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    INSERT INTO public.profiles (
      user_id, 
      user_email, 
      account_type
    )
    VALUES (
      NEW.id, 
      NEW.email, 
      'visitor'
    )
    ON CONFLICT (user_id) DO UPDATE SET
      user_email = NEW.email,
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$function$;