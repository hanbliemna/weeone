import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin,
  Clock,
  Send,
  Shield,
  Heart,
  Globe,
  HeadphonesIcon,
  Users,
  AlertTriangle,
  FileText,
  Cookie,
  Scale,
  Building2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          category: formData.category,
          message: formData.message
        });

      if (error) throw error;

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting WeeOne. We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", category: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      value: "hello@weeone.com",
      description: "Get help with your account or general inquiries",
      response: "Within 24 hours",
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Phone Support",
      value: "+216 00 000 000",
      description: "Speak directly with our support team",
      response: "Mon-Fri 9AM-5PM CET",
      color: "text-secondary"
    },
    {
      icon: MessageCircle,
      title: "24/7 Live Chat",
      value: "Available in app",
      description: "Instant help from our AI assistant",
      response: "Immediate response",
      color: "text-accent"
    }
  ];

  const supportCategories = [
    {
      icon: Users,
      title: "Community Guidelines",
      description: "Learn about our community standards and reporting process",
      links: ["Community Standards", "Reporting Content", "User Safety"]
    },
    {
      icon: Shield,
      title: "Safety & Privacy",
      description: "Information about keeping your data and identity safe",
      links: ["Privacy Policy", "Data Protection", "Safety Tips"]
    },
    {
      icon: Heart,
      title: "Cultural Sensitivity",
      description: "Guidelines for respectful cultural exchange",
      links: ["Cultural Guidelines", "Inclusive Language", "Respect Standards"]
    },
    {
      icon: HeadphonesIcon,
      title: "Technical Support",
      description: "Help with app functionality and technical issues",
      links: ["Troubleshooting", "App Updates", "Bug Reports"]
    }
  ];

  const legalPages = [
    {
      icon: FileText,
      title: "Terms & Conditions",
      description: "Legal terms for using WeeOne platform",
      updated: "Updated Nov 2024"
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      description: "How we collect, use, and protect your data",
      updated: "Updated Nov 2024"
    },
    {
      icon: Cookie,
      title: "Cookie Policy",
      description: "Information about cookies and tracking",
      updated: "Updated Nov 2024"
    },
    {
      icon: Scale,
      title: "GDPR Compliance",
      description: "Your rights under data protection laws",
      updated: "Updated Nov 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
            <MessageCircle className="h-4 w-4 mr-2" />
            Get in Touch
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6">
            We're Here to
            <span className="text-accent block">Help You</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions about cultural exchange? Need technical support? Want to share feedback? 
            Our global team is ready to assist you in building bridges across cultures.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
                Send Us a Message
              </h2>
              <p className="text-xl text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>

            <Card className="cultural-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-background/50 border-border/50 focus:border-accent"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        className="bg-background/50 border-border/50 focus:border-accent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-foreground font-medium">
                        Category *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-background/50 border-border/50 focus:border-accent">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="community">Community Guidelines</SelectItem>
                          <SelectItem value="safety">Safety & Privacy</SelectItem>
                          <SelectItem value="cultural">Cultural Content</SelectItem>
                          <SelectItem value="billing">Billing & Subscriptions</SelectItem>
                          <SelectItem value="partnership">Partnerships</SelectItem>
                          <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your inquiry"
                        className="bg-background/50 border-border/50 focus:border-accent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                      className="bg-background/50 border-border/50 focus:border-accent min-h-32"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24 hours
                    </p>
                    <Button type="submit" className="cta-button">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="cultural-card group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <method.icon className={`h-10 w-10 mx-auto ${method.color} group-hover:animate-cultural-bounce`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{method.title}</h3>
                  <p className="text-foreground font-semibold mb-2">{method.value}</p>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {method.response}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Help Center Topics
            </h2>
            <p className="text-xl text-muted-foreground">
              Find quick answers to common questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => (
              <Card key={index} className="cultural-card group">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <category.icon className="h-8 w-8 text-primary group-hover:animate-cultural-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <div className="space-y-2">
                    {category.links.map((link, linkIndex) => (
                      <Button
                        key={linkIndex}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs text-primary hover:text-primary-light"
                      >
                        {link}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Pages */}
      <section className="py-20 px-4 bg-gradient-community">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Legal & Privacy Information
            </h2>
            <p className="text-xl text-muted-foreground">
              Important documents and policies for our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalPages.map((page, index) => (
              <Card key={index} className="cultural-card group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <page.icon className="h-8 w-8 mx-auto text-secondary group-hover:animate-cultural-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{page.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{page.description}</p>
                  <Badge variant="outline" className="text-xs mb-3">
                    {page.updated}
                  </Badge>
                  <Button variant="ghost" size="sm" className="w-full text-secondary hover:text-secondary-light">
                    Read Document
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Emergency Contact */}
      <section className="py-16 px-4 bg-gradient-cultural">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto text-white">
            <AlertTriangle className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold font-display mb-4">
              Emergency Support
            </h2>
            <p className="text-lg mb-6 text-white/90">
              If you're experiencing harassment, safety concerns, or urgent technical issues, 
              contact our emergency support immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Emergency Chat
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 font-semibold"
              >
                Report Issue
                <AlertTriangle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;