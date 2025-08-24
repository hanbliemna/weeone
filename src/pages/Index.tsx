import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Globe, 
  Users, 
  MessageCircle, 
  Trophy, 
  Heart, 
  Star, 
  Play,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";
import heroImage from "@/assets/hero-cultural-connection.jpg";
import culturalStoriesImage from "@/assets/cultural-stories.jpg";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Globe,
      title: "Discover Cultures",
      description: "Explore authentic stories and traditions from over 150 countries",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Join Communities",
      description: "Connect with like-minded people in country-specific channels",
      color: "text-secondary"
    },
    {
      icon: MessageCircle,
      title: "Share Stories",
      description: "Tell your own cultural experiences and learn from others",
      color: "text-accent"
    },
    {
      icon: Trophy,
      title: "Play & Learn",
      description: "Test your cultural knowledge with fun quizzes and games",
      color: "text-primary"
    }
  ];

  const testimonials = [
    {
      name: "Maya Chen",
      country: "Singapore",
      flag: "🇸🇬",
      text: "WeeOne helped me understand my Malaysian neighbor's traditions. We're now best friends!",
      rating: 5
    },
    {
      name: "Carlos Rodriguez",
      country: "Mexico",
      flag: "🇲🇽",
      text: "I've learned so much about Japanese culture through authentic stories. It's amazing!",
      rating: 5
    },
    {
      name: "Amara Okafor",
      country: "Nigeria",
      flag: "🇳🇬",
      text: "The community here is so welcoming. I've made friends from 12 different countries!",
      rating: 5
    }
  ];

  const stats = [
    { number: "2.5M+", label: "Global Members", icon: Users },
    { number: "150+", label: "Countries", icon: Globe },
    { number: "50K+", label: "Cultural Stories", icon: MessageCircle },
    { number: "1M+", label: "Connections Made", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Diverse young adults connecting globally"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
          <div className="absolute inset-0 bg-background/20"></div>
        </div>

        {/* Floating Cultural Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-20 left-10 text-4xl animate-float">🌍</div>
          <div className="absolute top-40 right-20 text-3xl animate-float" style={{animationDelay: '1s'}}>🎭</div>
          <div className="absolute bottom-40 left-20 text-3xl animate-float" style={{animationDelay: '2s'}}>🎵</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-float" style={{animationDelay: '0.5s'}}>🏮</div>
        </div>

        {/* Hero Content */}
        <div className={`relative z-20 max-w-4xl mx-auto px-4 text-center text-white transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            <Sparkles className="h-4 w-4 mr-2" />
            Cultures United Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
            Connect Beyond
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent"> Borders</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed max-w-3xl mx-auto">
            Join millions of young adults breaking cultural barriers through authentic stories, 
            meaningful connections, and gamified learning experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold shadow-glow">
                Start as Visitor - Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold font-display">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is WeeOne Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              What is <span className="text-primary">WeeOne?</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              WeeOne is where young adults from around the world come together to share authentic cultural experiences, 
              break down stereotypes, and build meaningful connections that last a lifetime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold font-display text-foreground">
                Real Stories, Real Connections
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Authentic Cultural Exchange:</strong> Share and discover real stories from people living their cultures daily
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Gamified Learning:</strong> Earn points, unlock achievements, and climb leaderboards while learning
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Global Community:</strong> Join country channels and connect with people who share your interests
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={culturalStoriesImage} 
                alt="People sharing cultural stories and experiences"
                className="rounded-2xl shadow-cultural w-full hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-4 rounded-2xl shadow-glow">
                <Trophy className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              How WeeOne Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From sign-up to making lifelong friendships - discover how our platform makes cultural exchange fun and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="cultural-card group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 relative">
                    <feature.icon className={`h-12 w-12 mx-auto ${feature.color} group-hover:animate-cultural-bounce`} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-cultural rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold font-display text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Experiences Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Real Stories from Our <span className="text-primary">Community</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See how WeeOne is changing lives and building bridges across cultures
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="cultural-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3 flag-hover">{testimonial.flag}</div>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-20 px-4 bg-gradient-cultural">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Choose Your Cultural Journey
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Start free as a Visitor or unlock the full experience as a WeeOne Member with regional pricing that's fair for everyone
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <Card className="border-white/20 bg-white/10 backdrop-blur">
                <CardContent className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4">The Visitor</h3>
                  <p className="text-3xl font-bold mb-2">Free</p>
                  <p className="text-white/80 mb-4">Start your cultural journey</p>
                  <ul className="text-sm space-y-2 text-white/90">
                    <li>✓ Browse cultural stories</li>
                    <li>✓ Welcome quiz</li>
                    <li>✓ Limited messaging</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-white/30 bg-white/20 backdrop-blur">
                <CardContent className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4">The Global Citizen</h3>
                  <p className="text-3xl font-bold mb-2">From $3.99</p>
                  <p className="text-white/80 mb-4">Full cultural experience</p>
                  <ul className="text-sm space-y-2 text-white/90">
                    <li>✓ Everything in Visitor</li>
                    <li>✓ Unlimited messaging</li>
                    <li>✓ Premium cultural content</li>
                    <li>✓ Exclusive events</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Link to="/pricing">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold">
                  View All Plans & Regional Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-white/80">
                Fair pricing for all regions • No hidden fees • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
