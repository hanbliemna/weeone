import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Crown } from "lucide-react";
import { getCountryFlag } from "@/utils/countryFlags";

const LeaderboardView = () => {
  // Mock leaderboard data with diverse users
  const leaderboardUsers = [
    { rank: 1, username: "AmiraEl_Masri", points: 2850, country: "Tunisia", profilePhoto: "/linatunis.png" },
    { rank: 2, username: "Carlos_Mendoza", points: 2740, country: "Mexico", profilePhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face" },
    { rank: 3, username: "Priya_Sharma", points: 2680, country: "India", profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
    { rank: 4, username: "Elena_Rodriguez", points: 2420, country: "Spain", profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
    { rank: 5, username: "Ahmed_Hassan", points: 2380, country: "Egypt", profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { rank: 6, username: "Hiroshi_Tanaka", points: 2200, country: "Japan", profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    { rank: 7, username: "Sofia_Petrov", points: 2180, country: "Bulgaria", profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
    { rank: 8, username: "Marcus_Johnson", points: 2050, country: "Ghana", profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
    { rank: 9, username: "Fatima_AlZahra", points: 1980, country: "Morocco", profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b192?w=150&h=150&fit=crop&crop=face" },
    { rank: 10, username: "Olumide_Adebayo", points: 1920, country: "Nigeria", profilePhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face" },
    { rank: 11, username: "Yuki_Sasaki", points: 1850, country: "Japan", profilePhoto: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face" },
    { rank: 12, username: "Isabella_Rossi", points: 1780, country: "Italy", profilePhoto: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face" },
    { rank: 13, username: "David_Kim", points: 1720, country: "South Korea", profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
    { rank: 14, username: "Anya_Volkov", points: 1680, country: "Russia", profilePhoto: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face" },
    { rank: 15, username: "Mohammed_Al_Rashid", points: 1620, country: "UAE", profilePhoto: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face" }
  ];

  const topThree = leaderboardUsers.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-display text-primary mb-3 flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-accent" />
          WeeOne Leaderboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Celebrating our global cultural ambassadors
        </p>
      </div>

      {/* Podium for Top 3 */}
      <Card className="cultural-card shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-end justify-center gap-8 h-48">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-16 w-16 ring-4 ring-secondary shadow-lg">
                  <AvatarImage src={topThree[1]?.profilePhoto} />
                  <AvatarFallback className="bg-secondary text-white text-lg font-bold">
                    {topThree[1]?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-3 -right-3 text-2xl bg-background rounded-full p-1 shadow-md">
                  {getCountryFlag(topThree[1]?.country)}
                </div>
              </div>
              <div className="bg-gradient-to-t from-secondary to-secondary/80 h-24 w-20 rounded-t-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <p className="font-bold mt-3 text-center text-lg">{topThree[1]?.username}</p>
              <p className="text-sm text-muted-foreground">{topThree[1]?.country}</p>
              <p className="font-semibold text-secondary">{topThree[1]?.points} points</p>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <Crown className="h-8 w-8 text-accent mb-2 animate-pulse" />
              <div className="relative mb-4">
                <Avatar className="h-20 w-20 ring-4 ring-accent shadow-xl">
                  <AvatarImage src={topThree[0]?.profilePhoto} />
                  <AvatarFallback className="bg-accent text-white text-xl font-bold">
                    {topThree[0]?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-3 -right-3 text-3xl bg-background rounded-full p-1 shadow-md">
                  {getCountryFlag(topThree[0]?.country)}
                </div>
              </div>
              <div className="bg-gradient-to-t from-accent to-accent/80 h-32 w-20 rounded-t-xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-3xl">1</span>
              </div>
              <p className="font-bold mt-3 text-center text-xl">{topThree[0]?.username}</p>
              <p className="text-sm text-muted-foreground">{topThree[0]?.country}</p>
              <p className="font-semibold text-accent text-lg">{topThree[0]?.points} points</p>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-16 w-16 ring-4 ring-primary shadow-lg">
                  <AvatarImage src={topThree[2]?.profilePhoto} />
                  <AvatarFallback className="bg-primary text-white text-lg font-bold">
                    {topThree[2]?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-3 -right-3 text-2xl bg-background rounded-full p-1 shadow-md">
                  {getCountryFlag(topThree[2]?.country)}
                </div>
              </div>
              <div className="bg-gradient-to-t from-primary to-primary/80 h-20 w-20 rounded-t-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <p className="font-bold mt-3 text-center text-lg">{topThree[2]?.username}</p>
              <p className="text-sm text-muted-foreground">{topThree[2]?.country}</p>
              <p className="font-semibold text-primary">{topThree[2]?.points} points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Rankings */}
      <Card className="cultural-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Global Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardUsers.map((user, index) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-md ${
                  index < 3 
                    ? 'bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 border-2 border-accent/20' 
                    : 'bg-muted/30 hover:bg-muted/50 border border-border/20'
                }`}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${
                  index === 0 ? 'bg-accent text-white' :
                  index === 1 ? 'bg-secondary text-white' :
                  index === 2 ? 'bg-primary text-white' :
                  'bg-muted text-foreground'
                }`}>
                  {user.rank}
                </div>
                
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-border">
                    <AvatarImage src={user.profilePhoto} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 text-lg bg-background rounded-full border border-border">
                    {getCountryFlag(user.country)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg truncate">{user.username}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-medium">{user.country}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-xl text-primary">{user.points.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardView;