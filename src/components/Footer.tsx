import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Mail, Phone, Facebook, Instagram, Twitter, Youtube, Smartphone, Download } from "lucide-react";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      // For now, let's use a workaround until types are updated
      const { error } = await (supabase as any).from('subscriptions').insert({
        email: email
      });

      if (error) throw error;

      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Subscription Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-gradient-community border-t border-border/40">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12 border-b border-border/20">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold font-display text-foreground mb-4">
            Stay Connected with WeeOne
          </h3>
          <p className="text-muted-foreground mb-6">
            Get the latest cultural stories, community updates, and exclusive content delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-background/50 border-border/50 focus:border-primary"
              required
            />
            <Button type="submit" disabled={isSubscribing} className="cta-button whitespace-nowrap">
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-xl font-bold font-display text-foreground">WeeOne</h2>
                <p className="text-sm text-muted-foreground">Cultures United</p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Connecting young adults worldwide through authentic cultural exchange, 
              breaking stereotypes, and building a more united global community.
            </p>
            
            {/* App Download Buttons */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Download WeeOne</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-primary/20 hover:bg-primary/5 text-xs"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  App Store
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-secondary/20 hover:bg-secondary/5 text-xs"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Google Play
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <nav className="space-y-3">
              {[
                { label: "Channels", href: "/feed" },
                { label: "People", href: "/feed" },
                { label: "Languages", href: "/feed" },
                { label: "WeeOne Leaderboard", href: "/feed" },
                { label: "Our Story", href: "/story" },
                { label: "Community", href: "/community" },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <nav className="space-y-3">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "Help Center", href: "/contact" },
                { label: "Community Guidelines", href: "/contact" },
                { label: "Safety & Privacy", href: "/contact" },
                { label: "Report Content", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>hello@weeone.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h5 className="font-medium text-foreground mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  {[
                    { icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
                    { icon: Instagram, label: "Instagram", color: "hover:text-pink-600" },
                    { icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
                    { icon: Youtube, label: "YouTube", color: "hover:text-red-600" },
                  ].map(({ icon: Icon, label, color }) => (
                    <Button
                      key={label}
                      variant="ghost"
                      size="sm"
                      className={`h-9 w-9 p-0 text-muted-foreground transition-colors duration-300 ${color}`}
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <Link to="/contact" className="hover:text-primary transition-colors duration-300">
                Terms & Conditions
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                ©2025 WeeOne. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;