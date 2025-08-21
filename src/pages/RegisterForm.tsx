import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Phone, Mail, User, Calendar, MapPin, Flag } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  gender: z.string().min(1, "Please select your gender"),
  dateOfBirth: z.string().min(1, "Please enter your date of birth"),
  nationality: z.string().min(1, "Please select your nationality"),
  countryOfResidence: z.string().min(1, "Please select your country of residence"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Spain", "Italy",
  "Japan", "South Korea", "China", "India", "Brazil", "Mexico", "Argentina", "South Africa",
  "Nigeria", "Egypt", "Morocco", "Kenya", "Ghana", "Ethiopia", "Tunisia", "Algeria",
  "Russian Federation", "Poland", "Czech Republic", "Hungary", "Romania", "Ukraine",
  "Sweden", "Norway", "Denmark", "Finland", "Netherlands", "Belgium", "Switzerland",
  "Austria", "Portugal", "Greece", "Turkey", "Israel", "Jordan", "Lebanon", "UAE",
  "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain", "Iraq", "Iran", "Afghanistan",
  "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Myanmar", "Thailand", "Vietnam",
  "Indonesia", "Malaysia", "Singapore", "Philippines", "Cambodia", "Laos", "Mongolia"
];

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      gender: "",
      dateOfBirth: "",
      nationality: "",
      countryOfResidence: "",
      phoneNumber: "",
    },
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const onSubmit = async (data: FormData) => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate registration process
    try {
      // Here you would integrate with your authentication system
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: "Welcome to WeeOne! Please verify your phone number.",
      });
      
      // Navigate to verification step
      navigate("/register/verify", { state: { phoneNumber: data.phoneNumber } });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again. If the problem persists, contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    const currentStepValid = validateCurrentStep();
    if (currentStepValid) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const validateCurrentStep = () => {
    const values = form.getValues();
    
    if (currentStep === 1) {
      return values.email && values.password && values.confirmPassword && values.fullName;
    } else if (currentStep === 2) {
      return values.gender && values.dateOfBirth && values.nationality;
    } else if (currentStep === 3) {
      return values.countryOfResidence && values.phoneNumber;
    }
    
    return false;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Account Information</h3>
              <p className="text-sm text-muted-foreground">Create your secure account</p>
            </div>

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a strong password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Personal Details</h3>
              <p className="text-sm text-muted-foreground">Help us get to know you better</p>
            </div>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-row space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your nationality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 bg-background border border-border z-50">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Phone className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Contact & Location</h3>
              <p className="text-sm text-muted-foreground">Final step to complete your registration</p>
            </div>

            <FormField
              control={form.control}
              name="countryOfResidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country of Residence</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Where do you currently live?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 bg-background border border-border z-50">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-accent mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-accent">SMS Verification Required</p>
                  <p className="text-muted-foreground mt-1">
                    We'll send a verification code to this number to secure your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-community">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/register")}
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

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <div className="max-w-md mx-auto">
          <Card className="cultural-card border-primary/20 shadow-cultural">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Join WeeOne</CardTitle>
              <CardDescription>
                Connect with cultures from around the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {renderStepContent()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-primary/20"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                    )}
                    
                    <div className="flex-1"></div>

                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-cultural hover:shadow-glow"
                        disabled={!validateCurrentStep()}
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting || !validateCurrentStep()}
                        className="bg-gradient-cultural hover:shadow-glow"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Complete Registration
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;