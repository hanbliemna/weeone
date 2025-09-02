import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";
import Header from "@/components/Header";

const ExistingUserRedirect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="cultural-card border-primary/30 shadow-cultural">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-cultural flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-display text-primary">
                Account Already Exists
              </CardTitle>
            </CardHeader>
            
            <CardContent className="text-center space-y-6">
              <div className="space-y-3">
                <p className="text-lg text-foreground">
                  Your email already exists, try signing in!
                </p>
                <p className="text-sm text-muted-foreground">
                  It looks like you already have an account with this email address.
                </p>
              </div>

              <Button
                onClick={() => navigate("/signin")}
                className="w-full h-12 text-lg font-semibold bg-gradient-cultural hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                Sign In to Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  Need help? Contact our support team for assistance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ExistingUserRedirect;