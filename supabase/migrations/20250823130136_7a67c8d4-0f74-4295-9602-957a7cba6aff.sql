-- Create RPC functions for safe data insertion

-- Function to insert contacts (bypasses RLS since it's called from frontend)
CREATE OR REPLACE FUNCTION insert_contact(
  contact_name text,
  contact_email text,
  contact_subject text,
  contact_category text,
  contact_message text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO contacts (name, email, subject, category, message)
  VALUES (contact_name, contact_email, contact_subject, contact_category, contact_message);
END;
$$;

-- Function to insert subscriptions (bypasses RLS)
CREATE OR REPLACE FUNCTION insert_subscription(
  subscription_email text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO subscriptions (email)
  VALUES (subscription_email)
  ON CONFLICT (email) DO NOTHING; -- Don't re-subscribe if already exists
END;
$$;