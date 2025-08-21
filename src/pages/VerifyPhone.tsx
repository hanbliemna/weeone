import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Phone, RefreshCw, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const VerifyPhone = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const phoneNumber = location.state?.phoneNumber || "+1 (555) 123-4567";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the complete 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      // Check verification code against database
      const { data, error } = await supabase
        .from('phone_verification_codes')
        .select('*')
        .eq('phone_number', phoneNumber)
        .eq('code', verificationCode)
        .eq('verified', false)
        .gte('expires_at', new Date().toISOString())
        .maybeSingle();

      if (error || !data) {
        throw new Error('Invalid or expired verification code');
      }

      // Mark as verified
      await supabase
        .from('phone_verification_codes')
        .update({ verified: true })
        .eq('id', data.id);
      
      toast({
        title: "Phone Verified!",
        description: "Your phone number has been successfully verified.",
      });
      
      // Navigate to profile setup
      navigate("/register/profile-setup");
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setCanResend(false);
    setTimeLeft(60);
    setVerificationCode("");

    try {
      // Simulate sending SMS
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Code Sent",
        description: "A new verification code has been sent to your phone.",
      });
    } catch (error) {
      toast({
        title: "Failed to Send Code",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-community">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/register/form")}
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold font-display text-primary">WeeOne</h1>
            <p className="text-sm text-muted-foreground">Cultures United</p>
          </div>
          
          <div className="w-20"></div> {/* Spacer */}
        </div>

        {/* Verification Card */}
        <div className="max-w-md mx-auto">
          <Card className="cultural-card border-accent/30 shadow-cultural">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full">
                <Phone className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl">Verify Your Phone</CardTitle>
              <CardDescription className="text-base">
                We've sent a 6-digit verification code to<br />
                <span className="font-medium text-foreground">{phoneNumber}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* OTP Input */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP
                    value={verificationCode}
                    onChange={setVerificationCode}
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <p className="text-sm text-muted-foreground text-center">
                  Enter the 6-digit code sent to your phone
                </p>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerify}
                disabled={verificationCode.length !== 6 || isVerifying}
                className="w-full h-12 bg-gradient-cultural hover:shadow-glow"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify Phone Number
                  </>
                )}
              </Button>

              {/* Resend Code */}
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?
                </p>
                
                {canResend ? (
                  <Button
                    variant="outline"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="border-accent/20 text-accent hover:bg-accent/5"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Resend Code
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Resend available in {formatTime(timeLeft)}
                  </div>
                )}
              </div>

              {/* Help Text */}
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Having trouble? Check your spam folder or ensure your phone has signal.
                  Contact our support team if issues persist.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;