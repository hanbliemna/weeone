import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Medal, Globe, Target, Award } from "lucide-react";

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