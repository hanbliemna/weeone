import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PostCard } from "@/components/PostCard";
import {
  Search,
  Filter,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  UserPlus,
  Crown,
  User,
  Globe
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import WiwiChatbot from "@/components/WiwiChatbot";
import MainFeedTabs from "@/components/MainFeedTabs";
import Footer from "@/components/Footer";

const MainFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [staticPosts] = useState([
    {
      id: "main_1",
      user_id: "static",
      username: "maria_santos",
      country: "Brazil",
      culture: "Brazilian",
      language: "Portuguese",
      content: "Just experienced the most amazing Festa Junina celebration! The traditional dances and food brought tears to my eyes. This is what real cultural connection feels like! 🇧🇷✨",
      hashtags: ["#Brazil", "#Portuguese", "#FestaJunina", "#Tradition"],
      likes: 124,
      comments: 18,
      saves: 23,
      userType: "global_citizen",
      profilePhoto: "/maria-profile.png",
      hasPhoto: true,
      img: "/Festa Junina.jfif",
      photo: "/Festa Junina.jfif",
      created_at: new Date().toISOString(),
      channel: "Brazil"
    },
    {
      id: "main_2",
      user_id: "static",
      username: "kenji_yamamoto",
      country: "Japan",
      culture: "Japanese",
      language: "Japanese",
      content: "Teaching my WeeOne friends how to fold origami cranes today. Each fold carries a wish for peace and understanding between our cultures. 🕊️",
      hashtags: ["#Japan", "#Japanese", "#Origami", "#Peace"],
      likes: 89,
      comments: 12,
      saves: 31,
      userType: "visitor",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      hasPhoto: false,
      created_at: new Date().toISOString(),
      channel: "Japan"
    },
    {
      id: "main_3",
      user_id: "static",
      username: "amara_kone",
      country: "Mali",
      culture: "Malian",
      language: "Bambara",
      content: "Sharing the story of Sundiata Keita with my global friends. Our oral traditions are not just stories - they're the foundation of who we are! 👑",
      hashtags: ["#Mali", "#Bambara", "#OralTradition", "#Sundiata"],
      likes: 156,
      comments: 24,
      saves: 45,
      userType: "global_citizen",
      profilePhoto: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
      hasPhoto: true,
      img: "/sundiata.jfif",
      photo: "/sundiata.jfif",
      created_at: new Date().toISOString(),
      channel: "Mali"
    }
  ]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data: dbPosts } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    const allPosts = [...(dbPosts || []), ...staticPosts].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    setPosts(allPosts);
  };

  const [channelSuggestions] = useState([
    { name: "🇧🇷 Brazilian Channel", members: "2.3k", category: "Country" },
    { name: "Chinese Channel", members: "1.8k", category: "Culture" },
    { name: "Tunisian Channel", members: "3.1k", category: "Food" },
    { name: "Congolese Channel", members: "924", category: "Art" },
    { name: "Hungarian Channel", members: "1.5k", category: "Country" },
  ]);

  const [peopleSuggestions] = useState([
    { name: "Elena Rodriguez", country: "Spain", profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
    { name: "Ahmed Hassan", country: "Egypt", profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { name: "Priya Sharma", country: "India", profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
    { name: "Marcus Johnson", country: "Ghana", profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  ]);

  const getUserIcon = (userType: string) => {
    if (userType === "global_citizen") {
      return <Crown className="h-4 w-4 text-accent" />;
    }
    return <User className="h-4 w-4 text-secondary" />;
  };

  const openUserProfile = (username: string) => {
    // Mock user data - in real app this would fetch from Supabase
    setSelectedUser({
      username,
      fullName: username.replace("_", " ").toUpperCase(),
      bio: "Cultural enthusiast sharing authentic stories from my homeland",
      country: "Brazil",
      languages: ["Portuguese", "English"],
      culturePreferences: ["Music", "Dance", "Food"],
      totalPoints: 1250,
      badges: ["Cultural Ambassador", "Story Teller"],
      countriesUnlocked: ["Brazil", "Japan", "Mali"],
      userType: "global_citizen"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Main Feed Tabs - Now full width at top */}
        <div className="mb-8">
          <div className="flex justify-center"> {/* Changed to justify-end to align right */}
            <MainFeedTabs />
          </div>
        </div>

        {/* Search Bar - Centered and prominent */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="cultural-card shadow-lg">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search cultures, countries, users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Channel Suggestions */}
          <div className="xl:col-span-1 lg:col-span-1 lg:order-1 order-3">
            <div className="sticky top-24 space-y-6">
              <Card className="cultural-card shadow-md">
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Trending Channels
                  </h3>
                  <p className="text-sm text-muted-foreground">Join conversations worldwide</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {channelSuggestions.map((channel, index) => (
                    <div key={index} className="group p-4 bg-gradient-to-r from-muted/30 to-muted/60 rounded-xl hover:from-primary/10 hover:to-accent/10 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm group-hover:text-primary transition-colors">{channel.name}</p>
                        <Badge variant="outline" className="text-xs">{channel.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{channel.members} members</p>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white text-xs px-4 py-1"
                          onClick={() => {
                            if (channel.name === "Tunisian Channel") {
                              window.location.href = "/tunisian-channel";
                            }
                          }}
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Feed - Wider and centered */}
          <div className="xl:col-span-3 lg:col-span-2 lg:order-2 order-1">
            <div className="space-y-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar - People Suggestions */}
          <div className="xl:col-span-1 lg:col-span-1 lg:order-3 order-2">
            <div className="sticky top-24">
              <Card className="cultural-card shadow-md">
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Connect & Explore
                  </h3>
                  <p className="text-sm text-muted-foreground">Meet amazing people</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {peopleSuggestions.map((person, index) => (
                    <div key={index} className="group p-4 bg-gradient-to-br from-background to-muted/40 rounded-xl hover:from-primary/5 hover:to-accent/5 transition-all duration-300 border hover:border-primary/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-12 w-12 ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300">
                          <AvatarImage src={person.profilePhoto} />
                          <AvatarFallback className="bg-gradient-to-br from-secondary to-primary text-white text-sm font-bold">
                            {person.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm group-hover:text-primary transition-colors truncate">{person.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {person.country}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-xs py-2"
                      >
                        <UserPlus className="h-3 w-3 mr-2" />
                        Connect
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Modal - Same as before */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">User Profile</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {selectedUser.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{selectedUser.fullName}</h3>
                  {getUserIcon(selectedUser.userType)}
                </div>
                <p className="text-sm text-muted-foreground mb-2">@{selectedUser.username}</p>
                <p className="text-sm">{selectedUser.bio}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Country</p>
                  <p className="text-sm">{selectedUser.country}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Languages</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedUser.languages.map((lang: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                  <p className="text-sm font-bold text-primary">{selectedUser.totalPoints}</p>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Send Friend Request
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Wiwi Chatbot */}
      <WiwiChatbot />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainFeed;