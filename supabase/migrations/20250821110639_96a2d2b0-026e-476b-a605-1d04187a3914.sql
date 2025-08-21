-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT UNIQUE,
  full_name TEXT NOT NULL,
  bio TEXT,
  age INTEGER,
  gender TEXT NOT NULL,
  nationality TEXT NOT NULL,
  country_of_residence TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  phone_verified BOOLEAN DEFAULT FALSE,
  languages_spoken TEXT[],
  culture_preferences TEXT[],
  quiz_score INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  countries_unlocked TEXT[] DEFAULT '{}',
  badges_collected TEXT[] DEFAULT '{}',
  user_type TEXT DEFAULT 'visitor' CHECK (user_type IN ('visitor', 'global_citizen')),
  profile_photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create phone verification codes table
CREATE TABLE public.phone_verification_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on verification codes
ALTER TABLE public.phone_verification_codes ENABLE ROW LEVEL SECURITY;

-- Create policy for verification codes (users can only access their own)
CREATE POLICY "Users can manage their own verification codes" 
ON public.phone_verification_codes 
FOR ALL 
USING (true);