import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Languages,
  Heart,
  MessageCircle,
  Bookmark,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TunisianChannel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      category: "Photography",
      username: "yasmine_sfax",
      content: "Just captured the most beautiful sunset over Sidi Bou Said! The blue and white architecture creates such magical contrasts. 📸🇹🇳",
      img: "/sidibou.png",
      hashtags: ["#Photography", "#SidiBouSaid", "#Tunisia", "#Sunset"],
      likes: 45,
      comments: 8,
      saves: 12,
      profilePhoto: "/yassminesfax.png"
    },
    {
      id: 2,
      category: "Cuisine",
      username: "chef_hamza",
      content: "Traditional Tunisian couscous recipe passed down from my grandmother. The secret is in the seven vegetables and the perfect blend of spices! 🥘",
      img: "/tunisian-couscous.png",
      hashtags: ["#TunisianCuisine", "#Couscous", "#TraditionalFood", "#Recipe"],
      likes: 78,
      comments: 15,
      saves: 34,
      profilePhoto: "/chefhamza.png"
    },
    {
      id: 3,
      category: "Language",
      username: "lina_tunis",
      content: "Learning Tunisian Arabic phrases today! 'Ahla w sahla' means welcome - such a warm greeting that reflects our hospitality! 🗣️",
      img: "",
      hashtags: ["#TunisianArabic", "#Language", "#Culture", "#Learning"],
      likes: 23,
      comments: 6,
      saves: 18,
      profilePhoto: "/linatunis.png"
    },
    {
      id: 4,
      category: "Landmarks",
      username: "history_buff_tunis",
      content: "Exploring the ancient ruins of Carthage today. Standing where Hannibal once walked gives me chills! Our history is incredible. 🏛️",
      img: "/landmarks.jpg",
      hashtags: ["#Carthage", "#History", "#Landmarks", "#AncientTunisia"],
      likes: 56,
      comments: 12,
      saves: 28,
      profilePhoto: "/public/historybuf.png"
    }
  ]);

  const channelInfo = {
    name: "Tunisian Channel",
    flag: "🇹🇳",
    members: 3127,
    location: "North Africa",
    capital: "Tunis",
    officialLanguages: ["Arabic"],
    spokenLanguages: ["Arabic", "French", "Berber"],
    population: "11.8 million",
    currency: "Tunisian Dinar (TND)",
    currentTime: new Date().toLocaleTimeString('en-US', {
      timeZone: 'Africa/Tunis',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  const handleShareStory = () => {
    if (!newPost.trim()) return;

    const story = {
      id: posts.length + 1,
      category: "General",
      username: "current_user",
      content: newPost,
      img: "",
      hashtags: ["#Tunisia", "#MyStory"],
      likes: 0,
      comments: 0,
      saves: 0,
      profilePhoto: null
    };

    setPosts([story, ...posts]);
    setNewPost("");

    toast({
      title: "Story Shared!",
      description: "Your story has been shared in the Tunisian Channel and will appear in the main feed.",
    });
  };

  const getTopicPosts = (topic: string) => {
    return posts.filter(post => post.category === topic);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with navigation */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/feed")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Main Feed
            </Button>
            <h1 className="text-xl font-bold text-primary">Tunisian Channel</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Channel Header */}
        <Card className="cultural-card mb-8">
          <div
            className="h-80 bg-cover bg-center rounded-t-lg"
            style={{
              backgroundImage: "url('/medina.png')"
            }}
          />
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="h-20 w-20 border-4 border-white -mt-10">
                <AvatarFallback className="text-4xl bg-red-500 ">
                  <img className="rounded-full object-cover" src="/tnFlag.jfif" alt="" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {channelInfo.flag} {channelInfo.name}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{channelInfo.members.toLocaleString()} members</span>
                </div>

                {/* Channel Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Capital</p>
                      <p className="text-muted-foreground">{channelInfo.capital}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-secondary" />
                    <div>
                      <p className="font-medium">Languages</p>
                      <p className="text-muted-foreground">{channelInfo.spokenLanguages.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" />
                    <div>
                      <p className="font-medium">Population</p>
                      <p className="text-muted-foreground">{channelInfo.population}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Current Time</p>
                      <p className="text-muted-foreground">{channelInfo.currentTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Write a Post Section */}
        <Card className="cultural-card mb-8">
          <CardHeader>
            <h3 className="text-lg font-semibold text-primary">Share Your Story</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What's your Tunisian story? Share your experiences, memories, or thoughts about Tunisia..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-24"
            />
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Stories shared here will also appear in the main feed
              </div>
              <Button
                onClick={handleShareStory}
                disabled={!newPost.trim()}
                className="cta-button"
              >
                <Send className="h-4 w-4 mr-2" />
                Share My Story
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Topic Tabs */}
        <Tabs defaultValue="Photography" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="Photography">Photography</TabsTrigger>
            <TabsTrigger value="Cuisine">Cuisine</TabsTrigger>
            <TabsTrigger value="Language">Language</TabsTrigger>
            <TabsTrigger value="Landmarks">Landmarks</TabsTrigger>
          </TabsList>

          {["Photography", "Cuisine", "Language", "Landmarks"].map((topic) => (
            <TabsContent key={topic} value={topic} className="space-y-6">
              <div className="space-y-6">
                {getTopicPosts(topic).map((post) => (
                  <Card key={post.id} className="cultural-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-white">
                            <img src={post.profilePhoto} alt="" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{post.username}</span>
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>🇹🇳 Tunisia</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground mb-4">{post.content}</p>
                      <img className="rounded-lg m-6 w-80" src={post.img} alt="" />
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
                          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-red-500">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-secondary">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                          <Bookmark className="h-4 w-4" />
                          {post.saves}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TunisianChannel;