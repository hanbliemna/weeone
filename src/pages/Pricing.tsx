import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Check, 
  Crown, 
  Globe, 
  Star,
  Trophy,
  Zap,
  Gift,
  Heart,
  MessageCircle,
  Users,
  Calendar,
  Unlock,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("high");

  const regions = [
    {
      id: "high",
      name: "High Income Countries",
      countries: "US, CA, AU, EU, UK, etc.",
      description: "Standard pricing for developed economies"
    },
    {
      id: "middle",
      name: "Middle Income Countries",
      countries: "BR, MX, TR, ZA, etc.",
      description: "Reduced pricing for emerging economies"
    },
    {
      id: "low",
      name: "Lower Income Countries",
      countries: "IN, ID, PH, BD, etc.",
      description: "Accessible pricing for developing economies"
    }
  ];

  const pricingData = {
    high: { visitor: 0, master: isAnnual ? 79.99 : 7.99 },
    middle: { visitor: 0, master: isAnnual ? 59.99 : 5.99 },
    low: { visitor: 0, master: isAnnual ? 39.99 : 3.99 }
  };

  const visitorFeatures = [
    "Browse cultural stories and posts",
    "Free welcome quiz",
    "Limited messaging (5 per day)",
    "Join up to 3 country channels",
    "Basic profile customization",
    "Community guidelines access"
  ];

  const masterFeatures = [
    "Unlimited messaging and connections",
    "Premium cultural content & stories",
    "Advanced cultural quizzes & games",
    "Unlimited country channels access",
    "Exclusive global events",
    "Cultural achievement badges",
    "Free Digital Cultural Souvenirs",
    "Priority customer support",
    "Ad-free experience"
  ];

  const inAppPurchases = [
    {
      item: "Cultural Points Pack",
      price: "$1.99 - $9.99",
      description: "Boost your cultural exploration with points",
      icon: Star
    },
    {
      item: "Digital Cultural Souvenirs",
      price: "$0.99 - $4.99",
      description: "Collectible items from different cultures",
      icon: Gift
    },
    {
      item: "Premium Culture Packs",
      price: "$2.99 - $7.99",
      description: "Deep-dive content on specific cultures",
      icon: Unlock
    },
    {
      item: "Social Boosts",
      price: "$1.99 - $5.99",
      description: "Increase visibility and connections",
      icon: Zap
    }
  ];

  const comparisonFeatures = [
    {
      category: "Cultural Content",
      features: [
        { name: "Browse Cultural Stories", visitor: true, master: true },
        { name: "Welcome Cultural Quiz", visitor: true, master: true },
        { name: "Premium Cultural Content", visitor: false, master: true },
        { name: "Advanced Quizzes & Games", visitor: false, master: true }
      ]
    },
    {
      category: "Community Features",
      features: [
        { name: "Access to Country Channels", visitor: true, master: true },
        { name: "Limited Messaging (5/day)", visitor: true, master: false },
        { name: "Unlimited Messaging", visitor: false, master: true },
        { name: "Video Calls", visitor: false, master: true }
      ]
    },
    {
      category: "Events & Experiences",
      features: [
        { name: "Public Events", visitor: true, master: true },
        { name: "Exclusive Global Events", visitor: false, master: true },
        { name: "Cultural Workshops", visitor: false, master: true },
        { name: "VIP Event Access", visitor: false, master: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Crown className="h-4 w-4 mr-2" />
            Fair Pricing for Everyone
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6">
            Choose Your
            <span className="text-primary block">Cultural Journey</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Start free as a Visitor or unlock the full cultural experience as a Global Citizen. 
            Regional pricing ensures everyone can join our global community.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="bg-accent text-white">
                Save up
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Regional Pricing Selector */}
      <section className="py-12 px-4 border-b border-border">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">
              Select Your Region for Fair Pricing
            </h2>
            <p className="text-muted-foreground">
              We believe cultural exchange should be accessible to everyone, regardless of economic circumstances
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {regions.map((region) => (
              <Button
                key={region.id}
                variant={selectedRegion === region.id ? "default" : "outline"}
                className={`h-auto p-4 text-left flex-col items-start space-y-2 ${
                  selectedRegion === region.id ? "bg-secondary text-white" : ""
                }`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <div className="font-semibold">{region.name}</div>
                <div className="text-xs opacity-80">{region.countries}</div>
                <div className="text-xs opacity-70">{region.description}</div>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Pricing Plans */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Visitor Plan */}
            <Card className="cultural-card border-2 border-border">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                  <Globe className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold font-display">The Visitor</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">Free</span>
                  <p className="text-muted-foreground mt-2">Perfect for exploring cultures</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {visitorFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Start as Visitor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Global Citizen Plan */}
            <Card className="cultural-card border-2 border-primary relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-xs font-medium">
                Most Popular
              </div>
              
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Crown className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold font-display">The Global Citizen</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    ${pricingData[selectedRegion].master}
                  </span>
                  <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                  {isAnnual && (
                    <p className="text-sm text-accent mt-1">Get 2-month FREE Subscription</p>
                  )}
                  <p className="text-muted-foreground mt-2">Full cultural experience</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {masterFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 cta-button">
                  Become a Global Citizen
                  <Crown className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  *Available in select regions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Detailed Feature Comparison
            </h2>
            <p className="text-xl text-muted-foreground">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-background rounded-2xl shadow-cultural overflow-hidden">
              <div className="grid grid-cols-3 bg-muted p-4">
                <div className="font-bold text-foreground">Features</div>
                <div className="text-center font-bold text-foreground">Visitor</div>
                <div className="text-center font-bold text-primary">Global Citizen</div>
              </div>
              
              {comparisonFeatures.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="bg-muted/50 p-3 font-semibold text-foreground border-t border-border">
                    {category.category}
                  </div>
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="grid grid-cols-3 p-4 border-t border-border">
                      <div className="text-sm text-foreground">{feature.name}</div>
                      <div className="text-center">
                        {feature.visitor ? (
                          <Check className="h-5 w-5 text-accent mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </div>
                      <div className="text-center">
                        {feature.master ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* In-App Purchases */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Optional <span className="text-accent">Cultural Enhancements</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Boost your cultural journey with optional in-app purchases
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inAppPurchases.map((item, index) => (
              <Card key={index} className="cultural-card group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <item.icon className="h-10 w-10 mx-auto text-accent group-hover:animate-cultural-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.item}</h3>
                  <p className="text-primary font-semibold mb-3">{item.price}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All in-app purchases are optional and designed to enhance your cultural experience
            </p>
            <Badge variant="outline" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              No pay-to-win mechanics • Pure cultural enhancement
            </Badge>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How does regional pricing work?",
                answer: "We use purchasing power parity to ensure fair pricing across different economies. Your location determines your regional pricing tier automatically."
              },
              {
                question: "Can I switch from Visitor to Global Citizen anytime?",
                answer: "Absolutely! You can upgrade to Global Citizen at any time and start enjoying premium features immediately. Your cultural progress is always saved."
              },
              {
                question: "What happens if I cancel my Global Citizen subscription?",
                answer: "You'll continue to have Global Citizen access until the end of your billing period, then automatically switch to Visitor with all your cultural progress preserved."
              },
              {
                question: "Are in-app purchases necessary to enjoy WeeOne?",
                answer: "Not at all! Both Visitor and Global Citizen plans provide complete cultural experiences. In-app purchases are purely optional enhancements."
              },
            ].map((faq, index) => (
              <Card key={index} className="cultural-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-cultural">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Start Your Cultural Journey Today
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join millions discovering the world through authentic cultural exchange. 
              Start free or unlock the full experience with fair regional pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold">
                Start Free as Visitor
                <Globe className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full font-semibold"
              >
                Become a Global Citizen
                <Crown className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <p className="text-sm text-white/80 mt-6">
              No credit card required for Visitor • Cancel Global Citizen Pass anytime • Fair pricing worldwide
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
