import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, X, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MatchingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MatchProfile {
  name: string;
  country: string;
  flag: string;
  avatar: string;
  interests: string[];
  languages: string[];
  commonInterests: string[];
  commonLanguages: string[];
  age: number;
  bio: string;
}

const MatchingModal = ({ isOpen, onClose }: MatchingModalProps) => {
  const { toast } = useToast();
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getCurrentUser();
  }, []);

  const potentialMatches: MatchProfile[] = [
    {
      name: "Amira Hassan",
      country: "Lebanon",
      flag: "🇱🇧",
      avatar: "/public/yassminesfax.png",
      interests: ["Music", "Literature", "Photography", "Travel", "Art"],
      languages: ["Arabic", "French", "English"],
      commonInterests: ["Music", "Literature"],
      commonLanguages: ["Arabic", "French"],
      age: 26,
      bio: "Passionate about Middle Eastern literature and contemporary art. Love exploring different cultures through music and food."
    },
    {
      name: "Sofia Petrov",
      country: "Bulgaria",
      flag: "🇧🇬",
      avatar: "/public/linatunis.png",
      interests: ["Dance", "History", "Art", "Photography", "Travel"],
      languages: ["Bulgarian", "Russian", "English"],
      commonInterests: ["Dance", "Art"],
      commonLanguages: ["Russian", "English"],
      age: 24,
      bio: "Folk dancer and history enthusiast. Always eager to learn about different traditions and share Bulgarian culture."
    },
    {
      name: "Hassan Al-Rashid",
      country: "UAE",
      flag: "🇦🇪",
      avatar: "/public/chefhamza.png",
      interests: ["Technology", "Photography", "Travel", "Music", "Business"],
      languages: ["Arabic", "English", "Hindi"],
      commonInterests: ["Technology", "Photography"],
      commonLanguages: ["Arabic", "English"],
      age: 29,
      bio: "Tech entrepreneur with a passion for capturing life's moments. Love connecting with people from different backgrounds."
    },
    {
      name: "Elena Rodriguez",
      country: "Colombia",
      flag: "🇨🇴",
      avatar: "/public/sidibou.png",
      interests: ["Literature", "Art", "Music", "Dance", "Cooking"],
      languages: ["Spanish", "English", "Portuguese"],
      commonInterests: ["Literature", "Art", "Music"],
      commonLanguages: ["Spanish", "English"],
      age: 27,
      bio: "Writer and artist exploring the intersection of Latin American culture and contemporary expression."
    },
    {
      name: "Omar Benali",
      country: "Morocco",
      flag: "🇲🇦",
      avatar: "/public/historybuf.png",
      interests: ["History", "Architecture", "Literature", "Travel", "Music"],
      languages: ["Arabic", "French", "Berber", "English"],
      commonInterests: ["History", "Literature"],
      commonLanguages: ["Arabic", "French"],
      age: 31,
      bio: "Architect fascinated by Islamic art and historical preservation. Love sharing stories about North African heritage."
    }
  ];

  const currentProfile = potentialMatches[currentProfileIndex];

  const handleSwipe = async (direction: 'left' | 'right') => {
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    // If swiping right (connecting), send friend request
    if (direction === 'right' && currentUser) {
      try {
        // Create a mock user ID for the demo - in a real app, this would be the actual user ID
        const mockUserId = `mock-user-${currentProfile.name.replace(/\s+/g, '-').toLowerCase()}`;
        
        const { error } = await supabase
          .from('friend_requests')
          .insert([{
            sender_id: currentUser.id,
            receiver_id: mockUserId
          }]);

        if (error && !error.message.includes('duplicate key')) {
          throw error;
        }

        toast({
          title: "Connection sent!",
          description: `Friend request sent to ${currentProfile.name}`,
        });
      } catch (error) {
        console.error('Error sending friend request:', error);
        toast({
          title: "Error",
          description: "Failed to send connection request",
          variant: "destructive"
        });
      }
    }
    
    setTimeout(() => {
      if (currentProfileIndex < potentialMatches.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        setCurrentProfileIndex(0); // Reset to first profile
      }
      setIsAnimating(false);
      setSwipeDirection(null);
    }, 300);
  };

  const handleReset = () => {
    setCurrentProfileIndex(0);
    setIsAnimating(false);
    setSwipeDirection(null);
  };

  if (!currentProfile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-0 bg-transparent border-none shadow-none">
        <div className="relative">
          {/* Header */}
          <div className="bg-background/95 backdrop-blur rounded-t-xl p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Find Your Match</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <Card className={`transition-all duration-300 ${
            isAnimating 
              ? swipeDirection === 'right' 
                ? 'transform translate-x-full rotate-12 opacity-0' 
                : 'transform -translate-x-full -rotate-12 opacity-0'
              : 'transform translate-x-0 rotate-0 opacity-100'
          }`}>
            <CardContent className="p-0">
              {/* Profile Image Section */}
              <div className="relative h-80 bg-gradient-to-br from-primary/20 to-secondary/30 rounded-t-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                    <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
                    <AvatarFallback className="text-2xl">{currentProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
                
                {/* Country Flag */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {currentProfile.flag} {currentProfile.country}
                  </Badge>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold mb-1">{currentProfile.name}</h3>
                  <p className="text-muted-foreground">Age {currentProfile.age}</p>
                </div>

                <p className="text-sm text-muted-foreground mb-4 text-center">
                  {currentProfile.bio}
                </p>

                {/* Common Interests */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-green-600">Common Interests</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentProfile.commonInterests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-green-500 text-green-600">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Common Languages */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2 text-blue-600">Common Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentProfile.commonLanguages.map((language, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-blue-500 text-blue-600">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* All Interests */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2">All Interests</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentProfile.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="bg-background/95 backdrop-blur rounded-b-xl p-4 border-t">
            <div className="flex justify-center gap-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleSwipe('left')}
                className="h-14 w-14 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                disabled={isAnimating}
              >
                <X className="h-6 w-6" />
              </Button>
              
              <Button
                size="lg"
                onClick={() => handleSwipe('right')}
                className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white"
                disabled={isAnimating}
              >
                <Heart className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="text-center mt-3">
              <p className="text-xs text-muted-foreground">
                Swipe left to pass • Swipe right to connect
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchingModal;