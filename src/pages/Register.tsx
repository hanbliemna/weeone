import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Globe, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-6 animate-fade-in-up">
            Join the{" "}
            <span className="bg-gradient-cultural bg-clip-text text-transparent">
              WeeOne
            </span>{" "}
            Community
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up">
            Connect with people from around the world and celebrate the beautiful diversity of cultures
          </p>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="cultural-card hover:bg-primary/5 border-primary/20">
              <CardHeader className="pb-4">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Global Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect with thousands of people from different cultures and backgrounds
                </p>
              </CardContent>
            </Card>
            
            <Card className="cultural-card hover:bg-secondary/5 border-secondary/20">
              <CardHeader className="pb-4">
                <Globe className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-lg">Cultural Exchange</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Share stories, traditions, and learn about cultures from around the world
                </p>
              </CardContent>
            </Card>
            
            <Card className="cultural-card hover:bg-accent/5 border-accent/20">
              <CardHeader className="pb-4">
                <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle className="text-lg">Meaningful Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build lasting friendships and relationships based on mutual respect and understanding
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Registration CTA */}
        <div className="max-w-md mx-auto">
          <Card className="cultural-card border-primary/30 shadow-cultural">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-display text-primary">
                Ready to Start Your Journey?
              </CardTitle>
              <CardDescription className="text-base">
                Create your account and join our diverse global community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => navigate("/register/form")}
                className="w-full h-12 text-lg font-semibold bg-gradient-cultural hover:shadow-glow transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsAnimated(true)}
                onMouseLeave={() => setIsAnimated(false)}
              >
                Start Registration
                <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isAnimated ? 'translate-x-1' : ''}`} />
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Already have an account?
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="w-full border-primary/20 text-primary hover:bg-primary/5"
                >
                  Sign In Instead
                </Button>
              </div>
              
              <div className="text-center pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-scale-in">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="animate-scale-in">
            <div className="text-3xl font-bold text-secondary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Members</div>
          </div>
          <div className="animate-scale-in">
            <div className="text-3xl font-bold text-accent mb-2">1M+</div>
            <div className="text-sm text-muted-foreground">Stories Shared</div>
          </div>
          <div className="animate-scale-in">
            <div className="text-3xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;