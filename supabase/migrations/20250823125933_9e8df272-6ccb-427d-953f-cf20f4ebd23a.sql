-- Update the handle_new_user trigger to ensure email verification is required
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only insert if email is confirmed
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    INSERT INTO public.profiles (user_id, user_email, account_type)
    VALUES (NEW.id, NEW.email, 'visitor')
    ON CONFLICT (user_id) DO UPDATE SET
      user_email = NEW.email,
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for email confirmation
CREATE TRIGGER on_auth_user_email_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();