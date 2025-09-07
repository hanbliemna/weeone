import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Calendar, Users, Heart, MessageCircle, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  username: string;
  profile_photo: string;
  nationality: string;
  country_of_residence: string;
  date_of_birth: string;
  languages_spoken: string[];
  topics_of_interest: string[];
  cultural_preferences: string[];
  created_at: string;
}

interface UserPost {
  id: string;
  content: string;
  created_at: string;
  hashtags: string[];
  channel: string;
  likes_count: number;
  comments_count: number;
}

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [friendRequestStatus, setFriendRequestStatus] = useState<'none' | 'pending' | 'accepted' | 'sent'>('none');

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userId && currentUser) {
      fetchUserProfile();
      fetchUserPosts();
      checkFriendRequestStatus();
    }
  }, [userId, currentUser]);

  const fetchUserProfile = async () => {
    try {
      // Check if it's a mock user (starts with 'mock-user-')
      if (userId?.startsWith('mock-user-')) {
        // Generate mock profile data
        const mockProfile = {
          id: userId,
          user_id: userId,
          username: userId.replace('mock-user-', '').replace(/-/g, ' '),
          profile_photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          nationality: "Brazil",
          country_of_residence: "Brazil",
          date_of_birth: "1990-01-01",
          languages_spoken: ["Portuguese", "English"],
          topics_of_interest: ["Music", "Dance", "Culture", "Travel"],
          cultural_preferences: ["Traditional Music", "Folk Dance", "Cultural Festivals"],
          created_at: "2024-01-01T00:00:00Z"
        };
        setProfile(mockProfile);
        return;
      }

      // Real user profile fetch
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      // Check if it's a mock user
      if (userId?.startsWith('mock-user-')) {
        // Generate mock posts
        const mockPosts = [
          {
            id: "1",
            content: "Just experienced the most amazing cultural festival! The traditional dances and music brought tears to my eyes. This is what real cultural connection feels like! 🎭✨",
            created_at: "2024-03-15T10:30:00Z",
            hashtags: ["#Culture", "#Festival", "#Tradition", "#Music"],
            channel: "general",
            likes_count: 45,
            comments_count: 12
          },
          {
            id: "2", 
            content: "Sharing my favorite traditional recipe with the community today. Food is such a beautiful way to connect across cultures! 🍲❤️",
            created_at: "2024-03-10T14:20:00Z",
            hashtags: ["#Food", "#Recipe", "#Culture", "#Sharing"],
            channel: "food",
            likes_count: 78,
            comments_count: 23
          },
          {
            id: "3",
            content: "Learning a new language opens so many doors to understanding different cultures. Currently practicing my third language! 📚🌍",
            created_at: "2024-03-05T16:45:00Z",
            hashtags: ["#Language", "#Learning", "#Culture", "#Education"],
            channel: "education",
            likes_count: 34,
            comments_count: 8
          }
        ];
        setPosts(mockPosts);
        setLoading(false);
        return;
      }

      // Real posts fetch
      const { data: postsData, error } = await supabase
        .from('posts')
        .select(`
          *,
          likes:likes(count),
          comments:comments(count)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPosts = postsData?.map(post => ({
        ...post,
        likes_count: post.likes?.[0]?.count || 0,
        comments_count: post.comments?.[0]?.count || 0
      })) || [];

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFriendRequestStatus = async () => {
    try {
      // Skip friend request check for mock users
      if (userId?.startsWith('mock-user-')) {
        setFriendRequestStatus('none');
        return;
      }

      const { data, error } = await supabase
        .from('friend_requests')
        .select('*')
        .or(`and(sender_id.eq.${currentUser.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${currentUser.id})`)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        if (data.status === 'accepted') {
          setFriendRequestStatus('accepted');
        } else if (data.sender_id === currentUser.id) {
          setFriendRequestStatus('sent');
        } else {
          setFriendRequestStatus('pending');
        }
      }
    } catch (error) {
      console.error('Error checking friend request status:', error);
    }
  };

  const sendFriendRequest = async () => {
    try {
      // Handle mock users
      if (userId?.startsWith('mock-user-')) {
        // Simulate friend request for demo purposes
        setFriendRequestStatus('sent');
        toast({
          title: "Connection sent!",
          description: `Friend request sent to ${profile?.username || 'user'}`,
        });
        return;
      }

      const { error } = await supabase
        .from('friend_requests')
        .insert([{
          sender_id: currentUser.id,
          receiver_id: userId
        }]);

      if (error) throw error;
      setFriendRequestStatus('sent');
      toast({
        title: "Connection sent!",
        description: `Friend request sent to ${profile?.username || 'user'}`,
      });
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast({
        title: "Error",
        description: "Failed to send connection request",
        variant: "destructive"
      });
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">User not found</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-32 w-32 mx-auto md:mx-0">
                <AvatarImage src={profile.profile_photo} alt={profile.username} />
                <AvatarFallback className="text-2xl">
                  {profile.username?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{profile.username || 'Anonymous User'}</h1>
                
                <div className="flex flex-wrap gap-4 mb-4 justify-center md:justify-start text-sm text-muted-foreground">
                  {profile.country_of_residence && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.country_of_residence}
                    </div>
                  )}
                  {profile.date_of_birth && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Age {calculateAge(profile.date_of_birth)}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Member since {formatDate(profile.created_at)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center md:justify-start">
                  {friendRequestStatus === 'none' && (
                    <Button onClick={sendFriendRequest}>
                      <Users className="mr-2 h-4 w-4" />
                      Send Friend Request
                    </Button>
                  )}
                  {friendRequestStatus === 'sent' && (
                    <Button disabled variant="outline">
                      Friend Request Sent
                    </Button>
                  )}
                  {friendRequestStatus === 'pending' && (
                    <Button variant="outline">
                      Respond to Friend Request
                    </Button>
                  )}
                  {friendRequestStatus === 'accepted' && (
                    <Badge variant="default" className="px-4 py-2">
                      Friends
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details and Posts */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Languages */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Languages Spoken</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages_spoken?.map((language, index) => (
                      <Badge key={index} variant="secondary">
                        {language}
                      </Badge>
                    )) || <p className="text-muted-foreground">No languages specified</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Interests</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.topics_of_interest?.map((interest, index) => (
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    )) || <p className="text-muted-foreground">No interests specified</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Cultural Preferences */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Cultural Preferences</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.cultural_preferences?.map((preference, index) => (
                      <Badge key={index} variant="outline">
                        {preference}
                      </Badge>
                    )) || <p className="text-muted-foreground">No cultural preferences specified</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            {posts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No posts yet</p>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.profile_photo} alt={profile.username} />
                        <AvatarFallback>
                          {profile.username?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{profile.username}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(post.created_at)}
                          </span>
                          {post.channel && (
                            <Badge variant="secondary" className="text-xs">
                              #{post.channel}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="mb-3">{post.content}</p>
                        
                        {post.hashtags && post.hashtags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.hashtags.map((hashtag, index) => (
                              <span key={index} className="text-sm text-primary">
                                #{hashtag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <Separator className="my-3" />
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Heart className="h-4 w-4" />
                            {post.likes_count}
                          </button>
                          <button className="flex items-center gap-1 hover:text-primary transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments_count}
                          </button>
                          <button className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Share2 className="h-4 w-4" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;