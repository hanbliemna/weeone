import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const MainFeedTabs = () => {
  const [notifications] = useState([
    { id: 1, message: "Maria Santos liked your comment", time: "2m ago" },
    { id: 2, message: "New member joined Brazilian Channel", time: "5m ago" },
    { id: 3, message: "Kenji shared a new origami tutorial", time: "1h ago" },
  ]);

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Navigation Tabs */}
      <Tabs defaultValue="feed" className="flex-1">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="leaderboard">WeeOne Leaderboard</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notifications.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="p-2 font-semibold border-b">Notifications</div>
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
              <div className="text-sm">{notification.message}</div>
              <div className="text-xs text-muted-foreground">{notification.time}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MainFeedTabs;