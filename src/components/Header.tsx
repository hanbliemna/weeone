import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Globe, Wifi, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/story" },
    { label: "Community", href: "/community" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isMainFeed = location.pathname === '/feed';

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        
        // Get user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
        }
      }
    };

    if (isMainFeed) {
      getUser();
    }
  }, [isMainFeed]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Globe className="h-8 w-8 text-primary group-hover:text-primary-light transition-colors duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-glow"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold font-display text-foreground">WeeOne</h1>
            <p className="text-xs text-muted-foreground -mt-1">Cultures United</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary relative group ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                isActive(item.href) ? "w-full" : ""
              }`}></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {isMainFeed && user ? (
            // Main Feed User Profile
            <div className="flex items-center space-x-3">
              {/* Connected Status */}
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Connected</span>
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border-2 border-secondary">
                  <AvatarImage src={profile?.profile_photo} />
                  <AvatarFallback className="bg-secondary text-white text-sm">
                    {profile?.username?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">
                  {profile?.username || 'Visitor'}
                </span>
              </div>
            </div>
          ) : (
            // Default Actions for other pages
            <>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <MessageCircle className="h-4 w-4 mr-2" />
                24/7 Chat
              </Button>
              <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                Sign In
              </Button>
              <Button size="sm" className="cta-button" onClick={() => window.location.href = '/register/form'}>
                Join Now
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-6 mt-6">
              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-lg font-medium transition-colors duration-300 hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="flex flex-col space-y-3 pt-6 border-t border-border">
                {isMainFeed && user ? (
                  // Main Feed Mobile Profile
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Avatar className="h-10 w-10 border-2 border-secondary">
                      <AvatarImage src={profile?.profile_photo} />
                      <AvatarFallback className="bg-secondary text-white">
                        {profile?.username?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{profile?.username || 'Visitor'}</p>
                      <div className="flex items-center space-x-1">
                        <Wifi className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-muted-foreground">Connected</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start text-muted-foreground hover:text-primary">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      24/7 Chat Assistant
                    </Button>
                    <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
                      Sign In
                    </Button>
                    <Button className="cta-button" onClick={() => window.location.href = '/register/form'}>
                      Join WeeOne Community
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;