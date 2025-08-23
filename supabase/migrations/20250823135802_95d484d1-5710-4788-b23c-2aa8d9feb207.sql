-- Modify the trigger to only insert basic profile data on email confirmation
-- The detailed profile data will be updated later from the profile setup page

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only insert basic profile when email is confirmed to avoid constraint violations
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