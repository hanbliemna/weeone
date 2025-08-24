import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { 
  User, 
  Users, 
  MessageCircle, 
  Bookmark, 
  Trophy, 
  Coins, 
  Bell, 
  Settings, 
  LogOut 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getCountryFlag } from "@/utils/countryFlags";

interface ProfileDropdownProps {
  user: any;
  profile: any;
}

const ProfileDropdown = ({ user, profile }: ProfileDropdownProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of WeeOne.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { icon: User, label: "Your Profile Details", action: () => {} },
    { icon: Users, label: "Your Connections", action: () => {} },
    { icon: MessageCircle, label: "Your Messages", action: () => {} },
    { icon: Bookmark, label: "Your Saved Posts", action: () => {} },
    { icon: Trophy, label: "Your Achievements", action: () => {} },
    { icon: Coins, label: "Your Points (10)", action: () => {} },
    { icon: Bell, label: "Your Subscriptions", action: () => {} },
    { icon: Settings, label: "Your Account Settings", action: () => {} },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 p-2">
          <div className="relative">
            <Avatar className="h-8 w-8 border-2 border-accent">
              <AvatarImage src={profile?.profile_photo} />
              <AvatarFallback className="bg-accent text-white text-sm">
                {profile?.username?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Country flag overlay */}
            {profile?.nationality && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-background rounded-full flex items-center justify-center text-xs border border-border">
                {getCountryFlag(profile.nationality)}
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-foreground">
            {profile?.username || 'Visitor'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 max-h-80 overflow-y-auto">
        <div className="p-3 border-b">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-accent">
                <AvatarImage src={profile?.profile_photo} />
                <AvatarFallback className="bg-accent text-white">
                  {profile?.username?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {profile?.nationality && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center text-sm border border-border">
                  {getCountryFlag(profile.nationality)}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">{profile?.username || 'Visitor'}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
        
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.action}
            className="flex items-center space-x-3 p-3 cursor-pointer"
          >
            <item.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{item.label}</span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center space-x-3 p-3 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;