import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Crown, Globe, ArrowRight } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("high");

  const regions = [
    {
      id: "high",
      name: "High Income Countries",
      countries: "US, CA, AU, EU, UK, etc."
    },
    {
      id: "middle", 
      name: "Middle Income Countries",
      countries: "BR, MX, TR, ZA, etc."
    },
    {
      id: "low",
      name: "Lower Income Countries", 
      countries: "IN, ID, PH, BD, etc."
    }
  ];

  const pricingData = {
    high: { master: isAnnual ? 99.99 : 12.99 },
    middle: { master: isAnnual ? 59.99 : 7.99 },
    low: { master: isAnnual ? 29.99 : 3.99 }
  };

  const masterFeatures = [
    "Everything in Visitor plan",
    "Unlimited messaging and connections", 
    "Premium cultural content & stories",
    "Advanced cultural quizzes & games",
    "Private country channels access",
    "Video calls with cultural mentors",
    "Exclusive global events",
    "Cultural achievement badges",
    "Priority customer support",
    "Ad-free experience",
    "Cultural gift exchange program",
    "Monthly cultural care packages*"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-center">
            Upgrade to Global Citizen
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
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
                Save 35%
              </Badge>
            )}
          </div>

          {/* Regional Pricing Selector */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Select Your Region</h3>
            <div className="grid md:grid-cols-3 gap-4">
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
                </Button>
              ))}
            </div>
          </div>

          {/* Master Plan */}
          <Card className="cultural-card border-2 border-primary">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold font-display">Global Citizen Master</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">
                  ${pricingData[selectedRegion].master}
                </span>
                <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                {isAnnual && (
                  <p className="text-sm text-accent mt-1">Save 35% with annual billing</p>
                )}
                <p className="text-muted-foreground mt-2">Full cultural experience</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-2">
                {masterFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-3 pt-4">
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Maybe Later
                </Button>
                <Button className="flex-1 cta-button">
                  Upgrade Now
                  <Crown className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                *Available in select regions
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};