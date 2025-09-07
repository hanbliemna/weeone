import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, X } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface ChannelsMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CountryChannel {
  country: string;
  coordinates: [number, number];
  channelName: string;
  members: number;
  flag: string;
}

const countryChannels: CountryChannel[] = [
  { country: "United States", coordinates: [-95.7129, 37.0902], channelName: "American Channel", members: 15420, flag: "🇺🇸" },
  { country: "Turkey", coordinates: [35.2433, 38.9637], channelName: "Turkish Channel", members: 8930, flag: "🇹🇷" },
  { country: "Palestine", coordinates: [35.2033, 31.9522], channelName: "Palestinian Channel", members: 6740, flag: "🇵🇸" },
  { country: "Brazil", coordinates: [-51.9253, -14.2351], channelName: "Brazilian Channel", members: 12350, flag: "🇧🇷" },
  { country: "Japan", coordinates: [138.2529, 36.2048], channelName: "Japanese Channel", members: 9820, flag: "🇯🇵" },
  { country: "India", coordinates: [78.9629, 20.5937], channelName: "Indian Channel", members: 18750, flag: "🇮🇳" },
  { country: "Mexico", coordinates: [-102.5528, 23.6345], channelName: "Mexican Channel", members: 11200, flag: "🇲🇽" },
  { country: "France", coordinates: [2.2137, 46.2276], channelName: "French Channel", members: 7650, flag: "🇫🇷" },
  { country: "Nigeria", coordinates: [8.6753, 9.0820], channelName: "Nigerian Channel", members: 10450, flag: "🇳🇬" },
  { country: "China", coordinates: [104.1954, 35.8617], channelName: "Chinese Channel", members: 16890, flag: "🇨🇳" },
  { country: "Germany", coordinates: [10.4515, 51.1657], channelName: "German Channel", members: 8340, flag: "🇩🇪" },
  { country: "Italy", coordinates: [12.5674, 41.8719], channelName: "Italian Channel", members: 6920, flag: "🇮🇹" },
  { country: "Spain", coordinates: [-3.7492, 40.4637], channelName: "Spanish Channel", members: 13480, flag: "🇪🇸" },
  { country: "Russia", coordinates: [105.3188, 61.5240], channelName: "Russian Channel", members: 7230, flag: "🇷🇺" },
  { country: "South Korea", coordinates: [127.7669, 35.9078], channelName: "Korean Channel", members: 9150, flag: "🇰🇷" },
  { country: "Egypt", coordinates: [30.8025, 26.8206], channelName: "Egyptian Channel", members: 8760, flag: "🇪🇬" },
  { country: "Canada", coordinates: [-106.3468, 56.1304], channelName: "Canadian Channel", members: 6840, flag: "🇨🇦" },
  { country: "Australia", coordinates: [133.7751, -25.2744], channelName: "Australian Channel", members: 5920, flag: "🇦🇺" },
  { country: "Thailand", coordinates: [100.9925, 15.8700], channelName: "Thai Channel", members: 7410, flag: "🇹🇭" },
  { country: "Morocco", coordinates: [-7.0926, 31.7917], channelName: "Moroccan Channel", members: 6380, flag: "🇲🇦" },
  { country: "Tunisia", coordinates: [9.5375, 33.8869], channelName: "Tunisian Channel", members: 1750, flag: "🇹🇳" },
];

const ChannelsMapModal: React.FC<ChannelsMapModalProps> = ({ isOpen, onClose }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [hoveredChannel, setHoveredChannel] = useState<CountryChannel | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!isOpen || !mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2x5emgwNXV2MDA5dDJpczQzMWF3N2s2ZCJ9.NzLW5_UKaOr_KzN8OdE5Bw';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 1.2,
      center: [20, 20],
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add atmosphere effects
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });

      // Add markers for each country channel
      countryChannels.forEach((channel) => {
        const el = document.createElement('div');
        el.className = 'channel-marker';
        el.style.cssText = `
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
        `;

        // Create marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat(channel.coordinates)
          .addTo(map.current!);

        markersRef.current.push(marker);

        // Add hover events
        el.addEventListener('mouseenter', (e) => {
          el.style.transform = 'scale(1.5)';
          el.style.zIndex = '1000';
          setHoveredChannel(channel);
          setHoverPosition({ x: e.clientX, y: e.clientY });
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          el.style.zIndex = 'auto';
          setHoveredChannel(null);
          setHoverPosition(null);
        });

        el.addEventListener('mousemove', (e) => {
          setHoverPosition({ x: e.clientX, y: e.clientY });
        });
      });
    });

    // Cleanup function
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, [isOpen]);

  const handleJoinChannel = (channelName: string) => {
    // Handle channel joining logic here
    console.log(`Joining ${channelName}`);
    setHoveredChannel(null);
    setHoverPosition(null);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl h-[80vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">Discover Channels on the Map</DialogTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground">Hover over the pink markers to explore cultural channels worldwide</p>
          </DialogHeader>
          
          <div className="flex-1 relative p-6 pt-0">
            <div ref={mapContainer} className="w-full h-full rounded-lg border overflow-hidden" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Hover Card */}
      {hoveredChannel && hoverPosition && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: hoverPosition.x + 15,
            top: hoverPosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <Card className="pointer-events-auto shadow-lg border-2 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 min-w-[250px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{hoveredChannel.flag}</span>
                <h3 className="font-bold text-lg">{hoveredChannel.channelName}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{hoveredChannel.country}</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {hoveredChannel.members.toLocaleString()}
                </Badge>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
                  onClick={() => handleJoinChannel(hoveredChannel.channelName)}
                >
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChannelsMapModal;