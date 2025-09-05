import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Globe, Wifi, Languages } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getCountryFlag } from "@/utils/countryFlags";
import ProfileDropdown from "@/components/ProfileDropdown";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>("English");
  const location = useLocation();
  const navigate = useNavigate();

  const supportedLanguages = ["English", "French", "Spanish", "Arabic"];

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/story" },
    { label: "Community", href: "/community" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isMainFeed = location.pathname === '/feed';
  const isProfileSetup = location.pathname === '/profile-setup';

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
        <img src="/WeeONE_LOGO.png" alt="logo" width="175" />
        </Link>

        {/* Desktop Navigation - Hidden on main feed and profile setup */}
        {!isMainFeed && !isProfileSetup && (
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
        )}

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {isProfileSetup ? (
            // Don't show any buttons on profile setup page
            null
          ) : isMainFeed && user ? (
            // Main Feed Navigation - Only show logo, profile, connected status, and language selector
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Languages className="h-4 w-4 mr-2" />
                    {currentLanguage}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  {supportedLanguages.map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setCurrentLanguage(lang)}
                      className={currentLanguage === lang ? "bg-muted text-primary" : ""}
                    >
                      {lang}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Connected Status */}
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Connected</span>
              </div>
              
              {/* User Profile Dropdown */}
              <ProfileDropdown user={user} profile={profile} />
            </div>
          ) : (
            // Default Actions for other pages (no 24/7 Chat)
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary/20 hover:bg-primary/5"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </Button>
              <Button size="sm" className="cta-button" onClick={() => navigate('/register-form')}>
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
                  <>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-accent">
                          <AvatarImage src={profile?.profile_photo} />
                          <AvatarFallback className="bg-accent text-white">
                            {profile?.username?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {/* Country flag overlay for mobile */}
                        {profile?.nationality && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center text-sm border border-border">
                            {getCountryFlag(profile.nationality)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{profile?.username || 'Visitor'}</p>
                        <div className="flex items-center space-x-1">
                          <Wifi className="h-3 w-3 text-accent" />
                          <span className="text-xs text-muted-foreground">Connected</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile Language Selector */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Languages className="h-4 w-4" />
                        <span>Language</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {supportedLanguages.map((lang) => (
                          <Button
                            key={lang}
                            variant={currentLanguage === lang ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentLanguage(lang)}
                            className="text-xs"
                          >
                            {lang}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="border-primary/20 hover:bg-primary/5"
                      onClick={() => navigate('/signin')}
                    >
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
