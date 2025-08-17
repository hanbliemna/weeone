import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Users, 
  Globe, 
  MessageCircle, 
  Calendar,
  MapPin,
  Search,
  TrendingUp,
  Heart,
  Trophy,
  Star,
  ArrowRight,
  Filter,
  Play
} from "lucide-react";
import worldMapImage from "@/assets/world-map-community.jpg";

const Community = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const communityStats = [
    { number: "2.5M+", label: "Active Members", icon: Users, color: "text-primary" },
    { number: "150+", label: "Countries", icon: Globe, color: "text-secondary" },
    { number: "75K+", label: "Daily Conversations", icon: MessageCircle, color: "text-accent" },
    { number: "500+", label: "Monthly Events", icon: Calendar, color: "text-primary" }
  ];

  const featuredMembers = [
    {
      name: "Priya Sharma",
      country: "India",
      flag: "🇮🇳",
      bio: "Sharing the vibrant festivals and traditions of Rajasthan",
      followers: "12.5K",
      stories: "89",
      level: "Cultural Ambassador",
      specialty: "Traditional Arts"
    },
    {
      name: "Juan Carlos",
      country: "Colombia",
      flag: "🇨🇴",
      bio: "Teaching Latin dance and Colombian coffee culture",
      followers: "8.9K",
      stories: "67",
      level: "Master Storyteller",
      specialty: "Music & Dance"
    },
    {
      name: "Yuki Tanaka",
      country: "Japan",
      flag: "🇯🇵",
      bio: "Exploring modern Japan beyond anime and sushi",
      followers: "15.2K",
      stories: "134",
      level: "Cultural Ambassador",
      specialty: "Modern Culture"
    }
  ];

  const upcomingEvents = [
    {
      title: "Virtual Diwali Celebration",
      date: "Nov 15, 2024",
      time: "7:00 PM IST",
      participants: "2.3K",
      type: "Cultural Festival",
      region: "Asia"
    },
    {
      title: "Latin American Music Exchange",
      date: "Nov 18, 2024",
      time: "8:00 PM EST",
      participants: "1.8K",
      type: "Music & Arts",
      region: "Americas"
    },
    {
      title: "European Language Café",
      date: "Nov 20, 2024",
      time: "6:00 PM CET",
      participants: "1.5K",
      type: "Language Exchange",
      region: "Europe"
    },
    {
      title: "African Storytelling Night",
      date: "Nov 22, 2024",
      time: "7:30 PM WAT",
      participants: "1.2K",
      type: "Storytelling",
      region: "Africa"
    }
  ];

  const communityStories = [
    {
      title: "How WeeOne Helped Me Find My Cultural Identity",
      author: "Sarah Kim",
      country: "🇰🇷 South Korea",
      likes: "2.3K",
      comments: "189",
      readTime: "5 min",
      tag: "Personal Growth"
    },
    {
      title: "Building Bridges: My Experience Teaching Arabic",
      author: "Omar Hassan",
      country: "🇪🇬 Egypt",
      likes: "1.8K",
      comments: "156",
      readTime: "7 min",
      tag: "Language Exchange"
    },
    {
      title: "From Stranger to Family: My WeeOne Journey",
      author: "Maria Santos",
      country: "🇧🇷 Brazil",
      likes: "3.1K",
      comments: "234",
      readTime: "6 min",
      tag: "Friendship"
    }
  ];

  const regions = [
    { id: "all", name: "All Regions", countries: 150 },
    { id: "asia", name: "Asia", countries: 35 },
    { id: "europe", name: "Europe", countries: 28 },
    { id: "americas", name: "Americas", countries: 25 },
    { id: "africa", name: "Africa", countries: 32 },
    { id: "oceania", name: "Oceania", countries: 8 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20">
            <Users className="h-4 w-4 mr-2" />
            Global Community
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6">
            One World,
            <span className="text-secondary block">Countless Cultures</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Join millions of young adults from 150+ countries sharing authentic cultural experiences, 
            breaking stereotypes, and building lifelong friendships.
          </p>

          {/* Quick Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search cultures, countries, people..."
                className="pl-12 bg-background/50 border-border/50 focus:border-secondary text-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <Card key={index} className="cultural-card group">
                <CardContent className="p-6 text-center">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color} group-hover:animate-cultural-bounce`} />
                  <div className="text-2xl md:text-3xl font-bold font-display text-foreground mb-1">
                    {stat.number}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive World Map */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Our Global Community
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore cultures from every corner of the world
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Region Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region.id)}
                  className={selectedRegion === region.id ? "bg-secondary text-white" : ""}
                >
                  {region.name}
                  <Badge variant="secondary" className="ml-2">
                    {region.countries}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* World Map */}
            <div className="relative rounded-2xl overflow-hidden shadow-cultural mb-8">
              <img 
                src={worldMapImage} 
                alt="Interactive world map showing WeeOne community"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              
              {/* Floating Stats */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur rounded-xl p-4">
                <p className="text-sm font-medium text-foreground">Most Active Region</p>
                <p className="text-lg font-bold text-secondary">Asia-Pacific</p>
                <p className="text-xs text-muted-foreground">45% of daily activity</p>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur rounded-xl p-4">
                <p className="text-sm font-medium text-foreground">Newest Community</p>
                <p className="text-lg font-bold text-accent">Madagascar</p>
                <p className="text-xs text-muted-foreground">+500 members this month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Community Members */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Meet Our <span className="text-primary">Cultural Ambassadors</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Community leaders sharing authentic cultural experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredMembers.map((member, index) => (
              <Card key={index} className="cultural-card group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4 flag-hover">{member.flag}</div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.country}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {member.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm italic">"{member.bio}"</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-primary">{member.followers}</p>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-secondary">{member.stories}</p>
                      <p className="text-xs text-muted-foreground">Stories</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {member.specialty}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-light">
                      Follow
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stories */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Community Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from our global community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {communityStories.map((story, index) => (
              <Card key={index} className="cultural-card group">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3 text-xs">
                    {story.tag}
                  </Badge>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {story.title}
                  </h3>
                  
                  <div className="flex items-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      by <span className="font-medium text-foreground">{story.author}</span>
                    </p>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">{story.country}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {story.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {story.comments}
                      </span>
                    </div>
                    <span>{story.readTime} read</span>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary-light">
                    Read Story
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Upcoming <span className="text-accent">Global Events</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join virtual and in-person cultural events worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="cultural-card group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date} • {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {event.participants} registered
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-2">
                        {event.type}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{event.region}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button size="sm" className="bg-accent hover:bg-accent-light text-white">
                      Join Event
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-accent/20 hover:bg-accent/5">
              View All Events
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-20 px-4 bg-gradient-cultural">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Ready to Join Our Global Family?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Connect with millions of young adults, share your culture, and discover the world 
              from your smartphone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold">
                Join as Visitor - Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full font-semibold"
              >
                Become a Member
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;