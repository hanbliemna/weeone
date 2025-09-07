import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChannelsMapModal from "@/components/ChannelsMapModal";

const Channels = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllChannels, setShowAllChannels] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const allChannels = [
    { name: "American Channel", members: 15420, flag: "🇺🇸", description: "Connect with American culture and traditions" },
    { name: "Turkish Channel", members: 8930, flag: "🇹🇷", description: "Explore Turkish heritage and customs" },
    { name: "Palestinian Channel", members: 6740, flag: "🇵🇸", description: "Share Palestinian stories and experiences" },
    { name: "Brazilian Channel", members: 12350, flag: "🇧🇷", description: "Discover Brazilian culture and festivities" },
    { name: "Japanese Channel", members: 9820, flag: "🇯🇵", description: "Experience Japanese traditions and arts" },
    { name: "Indian Channel", members: 18750, flag: "🇮🇳", description: "Celebrate Indian diversity and culture" },
    { name: "Mexican Channel", members: 11200, flag: "🇲🇽", description: "Explore Mexican heritage and cuisine" },
    { name: "French Channel", members: 7650, flag: "🇫🇷", description: "Immerse in French culture and language" },
    { name: "Nigerian Channel", members: 10450, flag: "🇳🇬", description: "Connect with Nigerian traditions" },
    { name: "Chinese Channel", members: 16890, flag: "🇨🇳", description: "Discover Chinese culture and history" },
    { name: "German Channel", members: 8340, flag: "🇩🇪", description: "Experience German traditions and customs" },
    { name: "Italian Channel", members: 6920, flag: "🇮🇹", description: "Explore Italian culture and cuisine" },
    { name: "Spanish Channel", members: 13480, flag: "🇪🇸", description: "Connect with Spanish heritage" },
    { name: "Russian Channel", members: 7230, flag: "🇷🇺", description: "Discover Russian culture and arts" },
    { name: "Korean Channel", members: 9150, flag: "🇰🇷", description: "Experience Korean traditions and K-culture" },
    { name: "Egyptian Channel", members: 8760, flag: "🇪🇬", description: "Explore ancient and modern Egypt" },
    { name: "Canadian Channel", members: 6840, flag: "🇨🇦", description: "Connect with Canadian multiculturalism" },
    { name: "Australian Channel", members: 5920, flag: "🇦🇺", description: "Discover Australian culture and lifestyle" },
    { name: "Thai Channel", members: 7410, flag: "🇹🇭", description: "Experience Thai culture and traditions" },
    { name: "Moroccan Channel", members: 6380, flag: "🇲🇦", description: "Explore Moroccan heritage and customs" },
    // Additional channels shown when "See More" is clicked
    { name: "Argentinian Channel", members: 5240, flag: "🇦🇷", description: "Experience Argentinian culture and tango" },
    { name: "South African Channel", members: 7890, flag: "🇿🇦", description: "Discover South African heritage and diversity" },
    { name: "Greek Channel", members: 4560, flag: "🇬🇷", description: "Explore ancient Greek culture and traditions" },
    { name: "Swedish Channel", members: 3820, flag: "🇸🇪", description: "Connect with Swedish culture and lifestyle" },
    { name: "Portuguese Channel", members: 6140, flag: "🇵🇹", description: "Discover Portuguese heritage and customs" },
    { name: "Polish Channel", members: 5670, flag: "🇵🇱", description: "Experience Polish traditions and culture" },
    { name: "Vietnamese Channel", members: 8920, flag: "🇻🇳", description: "Explore Vietnamese culture and cuisine" },
    { name: "Iranian Channel", members: 4280, flag: "🇮🇷", description: "Connect with Persian culture and arts" },
    { name: "Colombian Channel", members: 6750, flag: "🇨🇴", description: "Discover Colombian heritage and traditions" },
    { name: "Filipino Channel", members: 9340, flag: "🇵🇭", description: "Experience Filipino culture and community" },
  ];

  const channels = showAllChannels ? allChannels : allChannels.slice(0, 20);

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/feed')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Feed
            </Button>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">Global Channels</h1>
            <p className="text-muted-foreground">Discover and join cultural communities from around the world</p>
          </div>
          
          <Button 
            onClick={() => setIsMapModalOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Discover channels on the map
          </Button>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredChannels.map((channel, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">{channel.flag}</span>
                    {channel.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {channel.members.toLocaleString()}
                  </Badge>
                  <Button size="sm">Join Channel</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!showAllChannels && (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowAllChannels(true)}
            >
              See More Channels
            </Button>
          </div>
        )}
      </main>

      <Footer />
      
      <ChannelsMapModal 
        isOpen={isMapModalOpen} 
        onClose={() => setIsMapModalOpen(false)} 
      />
    </div>
  );
};

export default Channels;