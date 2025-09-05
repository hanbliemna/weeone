import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Star, Medal, Globe, Target, Award, Crown } from "lucide-react";
import { getCountryFlag } from "@/utils/countryFlags";

interface LeagueBoardProps {
  totalPoints?: number;
  quizScore?: number;
  countriesUnlocked?: string[];
  badgesCollected?: string[];
}

const LeagueBoard = ({ 
  totalPoints = 0, 
  quizScore = 0, 
  countriesUnlocked = [], 
  badgesCollected = [] 
}: LeagueBoardProps) => {
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
  ];

  const topThree = leaderboardUsers.slice(0, 3);
  const achievements = [
    { 
      icon: Star, 
      title: "Cultural Explorer", 
      description: "Discovered 5 different cultures",
      unlocked: countriesUnlocked.length >= 5,
      color: "text-accent"
    },
    { 
      icon: Medal, 
      title: "Quiz Master", 
      description: "Scored 80+ on cultural quiz",
      unlocked: quizScore >= 80,
      color: "text-primary"
    },
    { 
      icon: Globe, 
      title: "Global Citizen", 
      description: "Connected with 10+ countries",
      unlocked: countriesUnlocked.length >= 10,
      color: "text-secondary"
    },
    { 
      icon: Award, 
      title: "Community Builder", 
      description: "Made 25+ cultural connections",
      unlocked: totalPoints >= 1000,
      color: "text-accent"
    }
  ];

  const getProgressLevel = () => {
    if (totalPoints < 500) return { level: "Newcomer", progress: (totalPoints / 500) * 100, color: "bg-secondary" };
    if (totalPoints < 1000) return { level: "Explorer", progress: ((totalPoints - 500) / 500) * 100, color: "bg-accent" };
    if (totalPoints < 2000) return { level: "Ambassador", progress: ((totalPoints - 1000) / 1000) * 100, color: "bg-primary" };
    return { level: "Master", progress: 100, color: "bg-gradient-cultural" };
  };

  const progressInfo = getProgressLevel();

  return (
    <div className="space-y-6">
      {/* Progress Level */}
      <Card className="cultural-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Trophy className="h-5 w-5" />
            League Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{progressInfo.level}</span>
              <span className="text-sm text-muted-foreground">{totalPoints} points</span>
            </div>
            <Progress value={progressInfo.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="cultural-card border-secondary/20">
          <CardContent className="p-4 text-center">
            <Globe className="h-8 w-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary">{countriesUnlocked.length}</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </CardContent>
        </Card>
        
        <Card className="cultural-card border-accent/20">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">{quizScore}%</div>
            <div className="text-sm text-muted-foreground">Quiz Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="cultural-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-primary" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-muted/50 border-border' 
                    : 'bg-muted/20 border-muted opacity-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <achievement.icon className={`h-4 w-4 ${achievement.unlocked ? achievement.color : 'text-muted-foreground'}`} />
                  <span className="text-sm font-medium">{achievement.title}</span>
                </div>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Leaderboard */}
      <Card className="cultural-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            WeeOne Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Podium for Top 3 */}
          <div className="mb-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
            <div className="flex items-end justify-center gap-4 h-32">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-secondary">
                    <AvatarImage src={topThree[1]?.profilePhoto} />
                    <AvatarFallback className="bg-secondary text-white">
                      {topThree[1]?.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 text-lg">
                    {getCountryFlag(topThree[1]?.country)}
                  </div>
                </div>
                <div className="bg-secondary h-16 w-16 rounded-t-lg mt-2 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <p className="text-xs font-medium mt-1 text-center">{topThree[1]?.username}</p>
                <p className="text-xs text-muted-foreground">{topThree[1]?.points}pts</p>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <Crown className="h-6 w-6 text-accent mb-1" />
                <div className="relative">
                  <Avatar className="h-14 w-14 ring-2 ring-accent">
                    <AvatarImage src={topThree[0]?.profilePhoto} />
                    <AvatarFallback className="bg-accent text-white">
                      {topThree[0]?.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 text-xl">
                    {getCountryFlag(topThree[0]?.country)}
                  </div>
                </div>
                <div className="bg-accent h-20 w-16 rounded-t-lg mt-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <p className="text-xs font-medium mt-1 text-center">{topThree[0]?.username}</p>
                <p className="text-xs text-muted-foreground">{topThree[0]?.points}pts</p>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-primary">
                    <AvatarImage src={topThree[2]?.profilePhoto} />
                    <AvatarFallback className="bg-primary text-white">
                      {topThree[2]?.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 text-lg">
                    {getCountryFlag(topThree[2]?.country)}
                  </div>
                </div>
                <div className="bg-primary h-12 w-16 rounded-t-lg mt-2 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <p className="text-xs font-medium mt-1 text-center">{topThree[2]?.username}</p>
                <p className="text-xs text-muted-foreground">{topThree[2]?.points}pts</p>
              </div>
            </div>
          </div>

          {/* Full Rankings */}
          <div className="space-y-3">
            {leaderboardUsers.map((user, index) => (
              <div
                key={user.rank}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  index < 3 
                    ? 'bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20' 
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold">
                  {user.rank}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profilePhoto} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user.username}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{getCountryFlag(user.country)}</span>
                    <span>{user.country}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-primary">{user.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      {badgesCollected.length > 0 && (
        <Card className="cultural-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              Badges Collected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {badgesCollected.map((badge, index) => (
                <Badge key={index} variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeagueBoard;