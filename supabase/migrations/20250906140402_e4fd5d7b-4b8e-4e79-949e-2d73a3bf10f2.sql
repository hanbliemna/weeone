-- Create friend_requests table
CREATE TABLE public.friend_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(sender_id, receiver_id)
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('friend_request', 'friend_accepted', 'post_like', 'post_comment')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.friend_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Friend requests policies
CREATE POLICY "Users can view friend requests involving them" 
ON public.friend_requests 
FOR SELECT 
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can create friend requests" 
ON public.friend_requests 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update friend requests they received" 
ON public.friend_requests 
FOR UPDATE 
USING (auth.uid() = receiver_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_friend_requests_updated_at
BEFORE UPDATE ON public.friend_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle friend request notifications
CREATE OR REPLACE FUNCTION public.handle_friend_request_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sender_profile public.profiles%ROWTYPE;
BEGIN
  -- Get sender profile info
  SELECT * INTO sender_profile 
  FROM public.profiles 
  WHERE user_id = NEW.sender_id;

  -- Create notification for receiver
  INSERT INTO public.notifications (
    user_id,
    type,
    title,
    message,
    data
  ) VALUES (
    NEW.receiver_id,
    'friend_request',
    'New Friend Request',
    COALESCE(sender_profile.username, 'Someone') || ' sent you a friend request',
    jsonb_build_object(
      'friend_request_id', NEW.id,
      'sender_id', NEW.sender_id,
      'sender_username', sender_profile.username,
      'sender_profile_photo', sender_profile.profile_photo
    )
  );

  RETURN NEW;
END;
$$;

-- Create trigger for friend request notifications
CREATE TRIGGER on_friend_request_created
AFTER INSERT ON public.friend_requests
FOR EACH ROW
EXECUTE FUNCTION public.handle_friend_request_notification();

-- Create function to handle friend request acceptance
CREATE OR REPLACE FUNCTION public.handle_friend_request_accepted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  receiver_profile public.profiles%ROWTYPE;
BEGIN
  -- Only trigger when status changes to accepted
  IF OLD.status != 'accepted' AND NEW.status = 'accepted' THEN
    -- Get receiver profile info
    SELECT * INTO receiver_profile 
    FROM public.profiles 
    WHERE user_id = NEW.receiver_id;

    -- Create notification for sender
    INSERT INTO public.notifications (
      user_id,
      type,
      title,
      message,
      data
    ) VALUES (
      NEW.sender_id,
      'friend_accepted',
      'Friend Request Accepted',
      COALESCE(receiver_profile.username, 'Someone') || ' accepted your friend request',
      jsonb_build_object(
        'friend_request_id', NEW.id,
        'receiver_id', NEW.receiver_id,
        'receiver_username', receiver_profile.username,
        'receiver_profile_photo', receiver_profile.profile_photo
      )
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for friend request acceptance
CREATE TRIGGER on_friend_request_updated
AFTER UPDATE ON public.friend_requests
FOR EACH ROW
EXECUTE FUNCTION public.handle_friend_request_accepted();