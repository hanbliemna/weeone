import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, UserPlus, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const People = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const people = [
    { name: "Maria Santos", country: "Brazil", flag: "🇧🇷", avatar: "/maria-profile.png", interests: "Dance, Music", mutual: 5 },
    { name: "Kenji Nakamura", country: "Japan", flag: "🇯🇵", avatar: "/public/chefhamza.png", interests: "Art, Technology", mutual: 12 },
    { name: "Ahmed Hassan", country: "Egypt", flag: "🇪🇬", avatar: "/public/historybuf.png", interests: "History, Photography", mutual: 8 },
    { name: "Emma Thompson", country: "Canada", flag: "🇨🇦", avatar: "/public/linatunis.png", interests: "Literature, Travel", mutual: 3 },
    { name: "Carlos Rodriguez", country: "Mexico", flag: "🇲🇽", avatar: "/public/sidibou.png", interests: "Cooking, Football", mutual: 7 },
    { name: "Fatima Al-Zahra", country: "Palestine", flag: "🇵🇸", avatar: "/public/yassminesfax.png", interests: "Poetry, Education", mutual: 15 },
    { name: "Rajesh Sharma", country: "India", flag: "🇮🇳", avatar: "/maria-profile.png", interests: "Yoga, Spirituality", mutual: 9 },
    { name: "Sophie Dubois", country: "France", flag: "🇫🇷", avatar: "/public/chefhamza.png", interests: "Fashion, Art", mutual: 6 },
    { name: "Chen Wei", country: "China", flag: "🇨🇳", avatar: "/public/historybuf.png", interests: "Martial Arts, Philosophy", mutual: 11 },
    { name: "Olumide Adebayo", country: "Nigeria", flag: "🇳🇬", avatar: "/public/linatunis.png", interests: "Music, Business", mutual: 4 },
    { name: "Isabella Rossi", country: "Italy", flag: "🇮🇹", avatar: "/public/sidibou.png", interests: "Cooking, Fashion", mutual: 13 },
    { name: "Dimitri Petrov", country: "Russia", flag: "🇷🇺", avatar: "/public/yassminesfax.png", interests: "Literature, Chess", mutual: 2 },
    { name: "Park Min-jun", country: "South Korea", flag: "🇰🇷", avatar: "/maria-profile.png", interests: "K-pop, Gaming", mutual: 10 },
    { name: "Hassan Al-Mansouri", country: "Morocco", flag: "🇲🇦", avatar: "/public/chefhamza.png", interests: "Architecture, Design", mutual: 6 },
    { name: "Ana Kovač", country: "Serbia", flag: "🇷🇸", avatar: "/public/historybuf.png", interests: "Music, Sports", mutual: 8 },
    { name: "James Wilson", country: "Australia", flag: "🇦🇺", avatar: "/public/linatunis.png", interests: "Surfing, Nature", mutual: 5 },
    { name: "Priya Patel", country: "India", flag: "🇮🇳", avatar: "/public/sidibou.png", interests: "Dance, Technology", mutual: 14 },
    { name: "Luis García", country: "Spain", flag: "🇪🇸", avatar: "/public/yassminesfax.png", interests: "Football, Travel", mutual: 7 },
    { name: "Marta Kowalski", country: "Poland", flag: "🇵🇱", avatar: "/maria-profile.png", interests: "Art, History", mutual: 9 },
    { name: "Omar Benali", country: "Tunisia", flag: "🇹🇳", avatar: "/public/chefhamza.png", interests: "Music, Literature", mutual: 11 },
  ];

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.interests.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/feed')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Feed
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">Discover People</h1>
          <p className="text-muted-foreground">Connect with people from diverse cultures and backgrounds</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search people by name, country, or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredPeople.map((person, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="font-semibold text-lg mb-1">{person.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-lg">{person.flag}</span>
                    <span className="text-sm text-muted-foreground">{person.country}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">{person.interests}</p>
                  
                  <Badge variant="secondary" className="mb-4 text-xs">
                    {person.mutual} mutual connections
                  </Badge>
                  
                  <div className="flex gap-2 w-full">
                    <Button size="sm" className="flex-1 text-xs">
                      <UserPlus className="mr-1 h-3 w-3" />
                      Connect
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <Eye className="mr-1 h-3 w-3" />
                      Explore
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            Discover More People
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default People;