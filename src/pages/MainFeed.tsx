import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

const MainFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [posts] = useState([
    {
      id: 1,
      username: "maria_santos",
      country: "Brazil",
      culture: "Brazilian",
      language: "Portuguese",
      content: "Just experienced the most amazing Festa Junina celebration! The traditional dances and food brought tears to my eyes. This is what real cultural connection feels like! 🇧🇷✨",
      hashtags: ["#Brazil", "#Portuguese", "#FestaJunina", "#Tradition"],
      likes: 124,
      comments: 18,
      userType: "global_citizen",
      profilePhoto: null
    },
    {
      id: 2,
      username: "kenji_yamamoto",
      country: "Japan",
      culture: "Japanese",
      language: "Japanese",
      content: "Teaching my WeeOne friends how to fold origami cranes today. Each fold carries a wish for peace and understanding between our cultures. 🕊️",
      hashtags: ["#Japan", "#Japanese", "#Origami", "#Peace"],
      likes: 89,
      comments: 12,
      userType: "visitor",
      profilePhoto: null
    },
    {
      id: 3,
      username: "amara_kone",
      country: "Mali",
      culture: "Malian",
      language: "Bambara",
      content: "Sharing the story of Sundiata Keita with my global friends. Our oral traditions are not just stories - they're the foundation of who we are! 👑",
      hashtags: ["#Mali", "#Bambara", "#OralTradition", "#Sundiata"],
      likes: 156,
      comments: 24,
      userType: "global_citizen",
      profilePhoto: null
    }
  ]);

  const [channelSuggestions] = useState([
    { name: "🇧🇷 Brazilian Channel", members: "2.3k", category: "Country" },
    { name: "Chinese Channel", members: "1.8k", category: "Culture" },
    { name: "Tunisian Channel", members: "3.1k", category: "Food" },
    { name: "Congolese Channel", members: "924", category: "Art" },
    { name: "Hungarian Channel", members: "1.5k", category: "Country" },
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Channel Suggestions */}
          <div className="lg:col-span-1">
            <Card className="cultural-card">
              <CardHeader>
                <h3 className="text-lg font-bold text-primary">Channel Suggestions</h3>
                <p className="text-sm text-muted-foreground">Based on your interests</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {channelSuggestions.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{channel.name}</p>
                      <p className="text-xs text-muted-foreground">{channel.members} members</p>
                    </div>
                    <Button size="sm" className="bg-accent hover:bg-accent/90 text-white">
                      Join
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Search and Filter Bar */}
            <Card className="cultural-card mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search cultures, countries, users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feed Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="cultural-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="cursor-pointer" onClick={() => openUserProfile(post.username)}>
                        <AvatarFallback className="bg-primary text-white">
                          {post.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span 
                            className="font-semibold cursor-pointer hover:text-primary"
                            onClick={() => openUserProfile(post.username)}
                          >
                            {post.username}
                          </span>
                          {getUserIcon(post.userType)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          {post.country}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-4">{post.content}</p>
                    
                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.hashtags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Interaction Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                          <Heart className="h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-secondary">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-accent">
                          <Share2 className="h-4 w-4" />
                          {post.shares}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
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
    </div>
  );
};

export default MainFeed;
