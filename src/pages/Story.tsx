import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Heart, 
  Globe, 
  Users, 
  Target, 
  Lightbulb, 
  Award,
  ArrowRight,
  Quote
} from "lucide-react";
import founderImage from "@/assets/founder-portrait.jpg";

const Story = () => {
  const values = [
    {
      icon: Heart,
      title: "Authentic Connection",
      description: "We believe real relationships are built on genuine cultural exchange, not superficial interactions.",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "Global Inclusivity",
      description: "Every culture has value. We celebrate diversity and ensure everyone feels welcome in our community.",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Our platform is designed by the community, for the community. Your voice shapes our future.",
      color: "text-accent"
    },
    {
      icon: Lightbulb,
      title: "Continuous Learning",
      description: "Cultural understanding is a lifelong journey. We make learning engaging and rewarding.",
      color: "text-primary"
    }
  ];

  const milestones = [
    { year: "2022", event: "WeeOne Founded", description: "Started with a simple idea to connect cultures" },
    { year: "2023", event: "100K Members", description: "Reached our first major community milestone" },
    { year: "2023", event: "50 Countries", description: "Expanded to communities across five continents" },
    { year: "2024", event: "1M Connections", description: "Celebrated one million meaningful cultural exchanges" },
    { year: "2024", event: "Global Recognition", description: "Awarded 'Best Cultural Platform' by Digital Unity Awards" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Heart className="h-4 w-4 mr-2" />
            Our Story
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6">
            Breaking Barriers,
            <span className="text-primary block">Building Bridges</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            WeeOne was born from a simple yet powerful belief: that understanding each other's cultures 
            is the key to a more connected and compassionate world.
          </p>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
                The Problem We're Solving
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">Cultural Misconceptions</h3>
                    <p className="text-muted-foreground">
                      Stereotypes and misinformation create unnecessary divides between people from different backgrounds.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">Lack of Authentic Exchange</h3>
                    <p className="text-muted-foreground">
                      Most platforms focus on surface-level interactions rather than meaningful cultural understanding.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">Geographic Barriers</h3>
                    <p className="text-muted-foreground">
                      Young adults struggle to connect with peers from other cultures due to physical and digital limitations.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-cultural text-white p-8 rounded-2xl">
                  <Quote className="h-12 w-12 mb-4 opacity-80" />
                  <p className="text-lg italic mb-4">
                    "In a world that's more connected than ever, we're paradoxically more divided by cultural misunderstanding."
                  </p>
                  <p className="text-white/80">- WeeOne Research Team</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <div className="text-2xl font-bold text-destructive">78%</div>
                    <p className="text-sm text-muted-foreground">admit to cultural stereotypes</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <div className="text-2xl font-bold text-destructive">65%</div>
                    <p className="text-sm text-muted-foreground">want more cultural connections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src={founderImage} 
                  alt="WeeOne Founder"
                  className="rounded-2xl shadow-cultural w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-2xl shadow-glow">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold font-display text-foreground mb-4">
                    Meet Our Founder
                  </h2>
                  <h3 className="text-2xl font-semibold text-primary mb-6">Emna</h3>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    "Hi, I’m a 27-year-old girl from Tunisia who’s always been fascinated by cultures
                    and the beauty of human connections."
                  </p>
                  
                  <p>
                    "Studying abroad opened my eyes to how much we can learn from one another,
                    and it made me believe that diversity is one of the greatest treasures we share.
                    I truly love meeting people, exchanging stories, and celebrating what makes each
                    of us unique." 
                  </p>
                  
                  <p>
                    "That’s why I created WeeOne — a space to bring people together from all around
                    the world, to connect, share, and embrace our differences as strengths."
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary">9+ Countries Visited</Badge>
                  <Badge variant="secondary">Business Development & Marketing Graduate</Badge>
                  <Badge variant="secondary">Global Volunteer</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Our Mission, Vision & Values
            </h2>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="cultural-card">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold font-display text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To create a global community where young adults can discover, share, and celebrate 
                  cultural diversity through authentic storytelling, meaningful connections, and engaging experiences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="cultural-card">
              <CardContent className="p-8 text-center">
                <Globe className="h-12 w-12 text-secondary mx-auto mb-6" />
                <h3 className="text-2xl font-bold font-display text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A world where cultural differences are celebrated, not feared; where every young person 
                  has the opportunity to learn from others and share their own heritage with pride.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-3xl font-bold font-display text-foreground text-center mb-12">
              Our Core Values
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="cultural-card group">
                  <CardContent className="p-6 text-center">
                    <value.icon className={`h-10 w-10 mx-auto mb-4 ${value.color} group-hover:animate-cultural-bounce`} />
                    <h4 className="text-lg font-bold text-foreground mb-3">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey & Milestones */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Our Journey So Far
            </h2>
            <p className="text-xl text-muted-foreground">
              From a simple idea to a global movement
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-6 group">
                  <div className="flex-shrink-0 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold group-hover:bg-primary-light transition-colors duration-300">
                    {milestone.year}
                  </div>
                  <Card className="flex-1 cultural-card">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{milestone.event}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-cultural">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Join Our Cultural Revolution
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Be part of the movement that's bringing the world closer together, one cultural exchange at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full font-semibold"
              >
                Explore Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Story;
