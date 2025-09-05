import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Upload, User, Calendar, Globe, Users, Crown, CheckCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { countries } from "@/data/countries";
import { languages } from "@/data/languages";
import { PricingModal } from "@/components/PricingModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters"),
  profilePhoto: z.string().optional(),
  gender: z.string().min(1, "Please select your gender"),
  dateOfBirth: z.string().min(1, "Please select your date of birth"),
  nationality: z.string().min(1, "Please select your nationality"),
  countryOfResidence: z.string().min(1, "Please select your country of residence"),
  languagesSpoken: z.array(z.string()).min(1, "Please select at least one language"),
  culturalPreferences: z.array(z.string()).min(1, "Please select at least one cultural preference"),
  topicsOfInterest: z.array(z.string()).min(1, "Please select at least one topic of interest"),
});

type FormData = z.infer<typeof formSchema>;

const culturalPreferences = [
  "Traditional Music", "Modern Art", "Historical Sites", "Local Festivals", "Street Food", "Museums",
  "Religious Ceremonies", "Folk Tales", "Traditional Clothing", "Cultural Exchanges", "Language Practice",
  "Cultural Workshops", "Community Events", "Cultural Tours", "International Friendships"
];

const topicsOfInterest = [
  "Travel", "Food & Cuisine", "Music", "Art", "Literature", "Photography", "History", "Language Learning",
  "Traditional Crafts", "Folk Dances", "Festivals", "Religion & Spirituality", "Philosophy", "Sports",
  "Technology", "Science", "Fashion", "Architecture", "Film & Cinema", "Theater", "Storytelling"
];

const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated and email is verified
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/register/form");
        return;
      }
      
      if (!user.email_confirmed_at) {
        navigate("/register/email-verification");
        return;
      }
      
      // Check if user already has a complete profile (already registered)
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('username')
        .eq('user_id', user.id)
        .single();
      
      if (existingProfile?.username) {
        toast({
          title: "You are already registered with WeeOne",
          description: "Redirecting you to sign in page.",
          variant: "destructive",
        });
        navigate("/signin");
        return;
      }
      
      setUser(user);
    };

    checkAuth();
  }, [navigate, toast]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      profilePhoto: "",
      gender: "",
      dateOfBirth: "",
      nationality: "",
      countryOfResidence: "",
      languagesSpoken: [],
      culturalPreferences: [],
      topicsOfInterest: [],
    },
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        form.setValue("profilePhoto", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (currentStep < 4) {
      nextStep();
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (!user) throw new Error("No authenticated user found");

      // Check if user is at least 13 years old
      const today = new Date();
      const birthDate = new Date(data.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (age < 13 || (age === 13 && monthDiff < 0) || 
          (age === 13 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        toast({
          title: "Age Requirement",
          description: "You must be at least 13 years old to create an account.",
          variant: "destructive",
        });
        return;
      }

      // Update existing profile with detailed data from setup form
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          profile_photo: profileImage,
          gender: data.gender,
          date_of_birth: data.dateOfBirth,
          nationality: data.nationality,
          country_of_residence: data.countryOfResidence,
          languages_spoken: data.languagesSpoken,
          cultural_preferences: data.culturalPreferences,
          topics_of_interest: data.topicsOfInterest,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Created Successfully!",
        description: "Welcome to WeeOne! Your cultural journey begins now.",
      });
      
      setProfileCompleted(true);
      setCurrentStep(5);
    } catch (error: any) {
      toast({
        title: "Profile Creation Failed",
        description: error.message || "Please try again. If the problem persists, contact support.",
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
      return values.username && values.username.length >= 3;
    } else if (currentStep === 2) {
      return values.gender && values.dateOfBirth && values.nationality && values.countryOfResidence;
    } else if (currentStep === 3) {
      return values.languagesSpoken.length > 0 && values.culturalPreferences.length > 0 && values.topicsOfInterest.length > 0;
    } else if (currentStep === 4) {
      return true; // Review step, no additional validation needed
    } else if (currentStep === 5) {
      return true; // Confirmation step, no additional validation needed
    }
    
    return false;
  };

  const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary">Profile Information</h3>
              <p className="text-sm text-muted-foreground">Create your unique WeeOne identity</p>
            </div>

            {/* Profile Photo Upload */}
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-24 h-24">
                <Avatar className="w-24 h-24">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <AvatarFallback className="text-2xl bg-gradient-cultural text-white">
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <label className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/80 transition-colors">
                  <Upload className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Upload a profile photo (max 5MB, JPG/PNG/WEBP)</p>
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Choose a unique username" 
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    3-20 characters, alphanumeric and underscore only
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Calendar className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary">Personal Details</h3>
              <p className="text-sm text-muted-foreground">Tell us more about yourself</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your nationality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-48">
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              {country.display}
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
              name="countryOfResidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country of Residence</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country of residence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-48">
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.display}
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
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-accent">Cultural Interests</h3>
              <p className="text-sm text-muted-foreground">Help us personalize your cultural experience</p>
            </div>

            <FormField
              control={form.control}
              name="languagesSpoken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages You Speak</FormLabel>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-lg p-4 bg-muted/20">
                    {languages.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={`language-${language}`}
                          checked={field.value?.includes(language)}
                          onCheckedChange={(checked) => {
                            const updatedLanguages = checked
                              ? [...(field.value || []), language]
                              : (field.value || []).filter((l) => l !== language);
                            field.onChange(updatedLanguages);
                          }}
                        />
                        <Label htmlFor={`language-${language}`} className="text-sm">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="culturalPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cultural Preferences</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {culturalPreferences.map((preference) => (
                      <div key={preference} className="flex items-center space-x-2">
                        <Checkbox
                          id={`culture-${preference}`}
                          checked={field.value?.includes(preference)}
                          onCheckedChange={(checked) => {
                            const updatedPreferences = checked
                              ? [...(field.value || []), preference]
                              : (field.value || []).filter((p) => p !== preference);
                            field.onChange(updatedPreferences);
                          }}
                        />
                        <Label htmlFor={`culture-${preference}`} className="text-sm">
                          {preference}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topicsOfInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topics of Interest</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {topicsOfInterest.map((topic) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <Checkbox
                          id={`topic-${topic}`}
                          checked={field.value?.includes(topic)}
                          onCheckedChange={(checked) => {
                            const updatedTopics = checked
                              ? [...(field.value || []), topic]
                              : (field.value || []).filter((t) => t !== topic);
                            field.onChange(updatedTopics);
                          }}
                        />
                        <Label htmlFor={`topic-${topic}`} className="text-sm">
                          {topic}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Choose Your Journey</h3>
              <p className="text-muted-foreground">All new users start as Visitors</p>
            </div>

            <div className="space-y-4">
              {/* Visitor Card - Always Selected */}
              <div className="p-4 border border-accent bg-accent/5 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Globe className="h-6 w-6 text-accent" />
                  <h4 className="font-semibold text-foreground">The Visitor</h4>
                  <CheckCircle className="h-5 w-5 text-accent ml-auto" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Perfect for exploring cultures and making new connections
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-accent" />
                    <span className="text-muted-foreground">Browse cultural stories</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-accent" />
                    <span className="text-muted-foreground">Join public channels</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-accent" />
                    <span className="text-muted-foreground">Limited messaging (5 per day)</span>
                  </div>
                </div>
                <div className="mt-3 text-lg font-bold text-accent">Free</div>
              </div>

              {/* Upgrade Button */}
              <div className="text-center">
                <Button
                  type="button"
                  onClick={() => setIsPricingModalOpen(true)}
                  className="cta-button"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Global Citizen
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  You can upgrade anytime to unlock premium features
                </p>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-muted/20 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Profile Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Username:</span>
                  <span className="ml-2 text-foreground font-medium">{form.watch('username')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="ml-2 text-foreground font-medium">{form.watch('gender')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Nationality:</span>
                  <span className="ml-2 text-foreground font-medium">{form.watch('nationality')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Residence:</span>
                  <span className="ml-2 text-foreground font-medium">{form.watch('countryOfResidence')}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-muted-foreground">Languages:</span>
                  <span className="ml-2 text-foreground font-medium">
                    {form.watch('languagesSpoken')?.join(', ') || 'None selected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="text-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-primary">Profile Complete!</h3>
              <p className="text-muted-foreground">Your WeeOne profile has been successfully created.</p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Welcome to the WeeOne Community! 🎉
              </h4>
              <p className="text-green-700 dark:text-green-300 text-sm">
                You're now ready to connect with people from diverse cultures around the world. 
                Your cultural journey awaits!
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                type="button"
                onClick={() => navigate("/feed")}
                className="w-full cta-button text-lg py-6"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Enter WeeOne Community
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Click above to confirm and start exploring the community
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="cultural-card border-primary/30 shadow-cultural">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-cultural flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-display text-primary">
                Complete Your Profile
              </CardTitle>
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
                        className="flex items-center"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                    )}
                    
                    <div className="ml-auto">
                      {currentStep < 4 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!validateCurrentStep()}
                          className="flex items-center cta-button"
                        >
                          Next
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : currentStep === 4 ? (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex items-center cta-button"
                        >
                          {isSubmitting ? "Creating Profile..." : "Create Profile"}
                          {!isSubmitting && <CheckCircle className="h-4 w-4 ml-2" />}
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  );
};

export default ProfileSetup;