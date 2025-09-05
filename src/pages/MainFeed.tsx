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
  Globe,
  Eye,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import WiwiChatbot from "@/components/WiwiChatbot";
import MainFeedTabs from "@/components/MainFeedTabs";
import Footer from "@/components/Footer";

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
      saves: 23,
      userType: "global_citizen",
      profilePhoto: "/maria-profile.png",
      hasPhoto: true,
      photo: "/Festa Junina.jfif"
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
      saves: 31,
      userType: "visitor",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      hasPhoto: false
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
      saves: 45,
      userType: "global_citizen",
      profilePhoto: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
      hasPhoto: true,
      photo: "/sundiata.jfif"
    }
  ]);

  const [channelSuggestions] = useState([
    { name: "🇺🇸 American Channel", members: "4.2k", category: "Country", flag: "🇺🇸" },
    { name: "🇹🇷 Turkish Channel", members: "3.1k", category: "Country", flag: "🇹🇷" },
    { name: "🇵🇸 Palestinian Channel", members: "2.8k", category: "Country", flag: "🇵🇸" },
    { name: "🇧🇷 Brazilian Channel", members: "2.3k", category: "Country", flag: "🇧🇷" },
    { name: "🇯🇵 Japanese Channel", members: "3.5k", category: "Country", flag: "🇯🇵" },
    { name: "🇮🇳 Indian Channel", members: "4.1k", category: "Country", flag: "🇮🇳" },
    { name: "🇳🇬 Nigerian Channel", members: "2.9k", category: "Country", flag: "🇳🇬" },
    { name: "🇹🇳 Tunisian Channel", members: "1.7k", category: "Country", flag: "🇹🇳" },
    { name: "🇲🇽 Mexican Channel", members: "3.3k", category: "Country", flag: "🇲🇽" },
    { name: "🇮🇩 Indonesian Channel", members: "2.6k", category: "Country", flag: "🇮🇩" },
  ]);

  const [peopleSuggestions] = useState([
    { name: "Elena Rodriguez", country: "Spain", profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", userType: "global_citizen" },
    { name: "Ahmed Hassan", country: "Egypt", profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", userType: "visitor" },
    { name: "Priya Sharma", country: "India", profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", userType: "global_citizen" },
    { name: "Marcus Johnson", country: "Ghana", profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", userType: "visitor" },
    { name: "Fatima Al-Zahra", country: "Morocco", profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b192?w=150&h=150&fit=crop&crop=face", userType: "global_citizen" },
    { name: "Hiroshi Tanaka", country: "Japan", profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", userType: "visitor" },
    { name: "Olumide Adebayo", country: "Nigeria", profilePhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face", userType: "global_citizen" },
    { name: "Sofia Petrov", country: "Bulgaria", profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", userType: "visitor" },
    { name: "Carlos Mendoza", country: "Mexico", profilePhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face", userType: "global_citizen" },
    { name: "Aisha Kone", country: "Mali", profilePhoto: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face", userType: "visitor" },
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
                  {channelSuggestions.slice(0, 8).map((channel, index) => (
                    <div key={index} className="group p-3 bg-gradient-to-r from-muted/20 to-muted/40 rounded-lg hover:from-primary/10 hover:to-accent/10 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{channel.name}</p>
                        <Badge variant="outline" className="text-xs">{channel.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{channel.members} members</p>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white text-xs px-3 py-1"
                          onClick={() => {
                            if (channel.name.includes("Tunisian")) {
                              window.location.href = "/tunisian-channel";
                            }
                          }}
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {/* See More Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full text-primary hover:bg-primary/10 flex items-center justify-center gap-2"
                  >
                    <span>See More Channels</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Feed - Wider and centered */}
          <div className="xl:col-span-3 lg:col-span-2 lg:order-2 order-1">
            <div className="space-y-8">
              {posts.map((post) => (
                <Card key={post.id} className="cultural-card shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-background to-muted/20 pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="cursor-pointer h-12 w-12 ring-2 ring-primary/20" onClick={() => openUserProfile(post.username)}>
                        <AvatarImage src={post.profilePhoto} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                          {post.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-bold text-lg cursor-pointer hover:text-primary transition-colors truncate"
                            onClick={() => openUserProfile(post.username)}
                          >
                            {post.username}
                          </span>
                          {getUserIcon(post.userType)}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Globe className="h-4 w-4" />
                          <span className="font-medium">{post.country}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <p className="text-foreground mb-6 text-lg leading-relaxed">{post.content}</p>

                    {/* Post Photo */}
                    {post.hasPhoto && (
                      <div className="mb-6 -mx-6">
                        <img
                          src={post.photo}
                          alt="Post content"
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    )}

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.hashtags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-sm px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all duration-200 cursor-pointer">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Interaction Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t-2 border-gradient-to-r from-transparent via-border to-transparent">
                      <div className="flex items-center gap-6">
                        <Button variant="ghost" size="lg" className="flex items-center gap-3 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all duration-200 px-4 py-2">
                          <Heart className="h-5 w-5" />
                          <span className="font-semibold">{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="lg" className="flex items-center gap-3 text-muted-foreground hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 px-4 py-2">
                          <MessageCircle className="h-5 w-5" />
                          <span className="font-semibold">{post.comments}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="lg" className="flex items-center gap-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 px-4 py-2">
                        <Bookmark className="h-5 w-5" />
                        <span className="font-semibold">{post.saves}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
                  {peopleSuggestions.slice(0, 6).map((person, index) => (
                    <div key={index} className="group p-3 bg-gradient-to-br from-background to-muted/30 rounded-lg hover:from-primary/5 hover:to-accent/5 transition-all duration-300 border hover:border-primary/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300">
                          <AvatarImage src={person.profilePhoto} />
                          <AvatarFallback className="bg-gradient-to-br from-secondary to-primary text-white text-sm font-bold">
                            {person.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 mb-1">
                            <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">{person.name}</p>
                            {getUserIcon(person.userType)}
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {person.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-xs py-1.5"
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Connect
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="px-3 hover:bg-accent/10 hover:border-accent"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {/* See More Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full text-primary hover:bg-primary/10 flex items-center justify-center gap-2"
                  >
                    <span>Discover More People</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
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