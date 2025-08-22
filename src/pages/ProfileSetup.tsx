import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ArrowRight, Upload, User, Globe, BookOpen, Heart, Camera, Crown, Flag } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

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

const languages = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese", "Russian", "Chinese", "Japanese", "Korean",
  "Arabic", "Hindi", "Bengali", "Turkish", "Vietnamese", "Thai", "Indonesian", "Malay", "Dutch", "Swedish",
  "Norwegian", "Danish", "Finnish", "Polish", "Czech", "Hungarian", "Romanian", "Greek", "Hebrew", "Swahili"
];

const interests = [
  "Travel", "Food & Cuisine", "Music", "Art", "Literature", "Photography", "History", "Language Learning",
  "Traditional Crafts", "Folk Dances", "Festivals", "Religion & Spirituality", "Philosophy", "Sports",
  "Technology", "Science", "Fashion", "Architecture", "Film & Cinema", "Theater", "Storytelling"
];

const culturalPreferences = [
  "Traditional Music", "Modern Art", "Historical Sites", "Local Festivals", "Street Food", "Museums",
  "Religious Ceremonies", "Folk Tales", "Traditional Clothing", "Cultural Exchanges", "Language Practice",
  "Cultural Workshops", "Community Events", "Cultural Tours", "International Friendships"
];

const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<'visitor' | 'global_citizen'>('visitor');
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  const totalSteps = 4;
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
    setIsSubmitting(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No user found. Please log in again.");
      }

      // Calculate age from date of birth
      const birthDate = new Date(data.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 13) {
        throw new Error("You must be at least 13 years old to create an account.");
      }

      // Insert profile data into Supabase
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: user.id,
            username: data.username,
            profile_photo: data.profilePhoto || null,
            gender: data.gender,
            date_of_birth: data.dateOfBirth,
            nationality: data.nationality,
            country_of_residence: data.countryOfResidence,
            languages_spoken: data.languagesSpoken,
            cultural_preferences: data.culturalPreferences,
            topics_of_interest: data.topicsOfInterest,
            account_type: accountType,
          }
        ]);

      if (error) {
        throw error;
      }
      
      toast({
        title: "Profile Created Successfully!",
        description: `Welcome to WeeOne, ${data.username}! Your cultural journey begins now.`,
      });
      
      // Navigate to main feed
      navigate("/feed");
    } catch (error: any) {
      toast({
        title: "Profile Setup Failed",
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
    }
    
    return false;
  };

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", 
    "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia", "Croatia", "Czech Republic", 
    "Denmark", "Ecuador", "Egypt", "Finland", "France", "Germany", "Ghana", "Greece", "Hungary", 
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Italy", "Japan", "Jordan", "Kenya", 
    "South Korea", "Lebanon", "Malaysia", "Mexico", "Morocco", "Netherlands", "Nigeria", "Norway", 
    "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia", 
    "South Africa", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", "United Kingdom", 
    "United States", "Venezuela", "Vietnam"
  ];

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
                      <Camera className="h-8 w-8" />
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
              <Heart className="h-12 w-12 text-secondary mx-auto mb-4" />
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
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-accent">Cultural Interests</h3>
              <p className="text-sm text-muted-foreground">Share your cultural preferences</p>
            </div>

            <FormField
              control={form.control}
              name="languagesSpoken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages You Speak</FormLabel>
                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border rounded-lg p-4 bg-muted/20">
                    {languages.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={`language-${language}`}
                          checked={field.value.includes(language)}
                          onCheckedChange={(checked) => {
                            const updatedLanguages = checked
                              ? [...field.value, language]
                              : field.value.filter((l) => l !== language);
                            field.onChange(updatedLanguages);
                          }}
                        />
                        <label
                          htmlFor={`language-${language}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {language}
                        </label>
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
                  <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto border rounded-lg p-4 bg-muted/20">
                    {culturalPreferences.map((preference) => (
                      <div key={preference} className="flex items-center space-x-2">
                        <Checkbox
                          id={`preference-${preference}`}
                          checked={field.value.includes(preference)}
                          onCheckedChange={(checked) => {
                            const updatedPreferences = checked
                              ? [...field.value, preference]
                              : field.value.filter((p) => p !== preference);
                            field.onChange(updatedPreferences);
                          }}
                        />
                        <label
                          htmlFor={`preference-${preference}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {preference}
                        </label>
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
                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border rounded-lg p-4 bg-muted/20">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interest-${interest}`}
                          checked={field.value.includes(interest)}
                          onCheckedChange={(checked) => {
                            const updatedInterests = checked
                              ? [...field.value, interest]
                              : field.value.filter((i) => i !== interest);
                            field.onChange(updatedInterests);
                          }}
                        />
                        <label
                          htmlFor={`interest-${interest}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {interest}
                        </label>
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
              <Flag className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary">Account Type & Review</h3>
              <p className="text-sm text-muted-foreground">Choose your account type and review your profile</p>
            </div>

            {/* Account Type Selection */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Account Type</h4>
              <div className="grid grid-cols-1 gap-4">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    accountType === 'visitor' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setAccountType('visitor')}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold">Visitor</h5>
                      <p className="text-sm text-muted-foreground">Start your cultural journey</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    accountType === 'global_citizen' 
                      ? 'border-accent bg-accent/5' 
                      : 'border-border hover:border-accent/50'
                  }`}
                  onClick={() => setAccountType('global_citizen')}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold">Global Citizen</h5>
                      <p className="text-sm text-muted-foreground">Unlock exclusive features and connect deeper</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-sm">Profile Summary</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Username:</span> {form.watch("username")}</p>
                <p><span className="font-medium">Gender:</span> {form.watch("gender")}</p>
                <p><span className="font-medium">Nationality:</span> {form.watch("nationality")}</p>
                <p><span className="font-medium">Languages:</span> {form.watch("languagesSpoken").join(", ")}</p>
                <p><span className="font-medium">Account Type:</span> 
                  <Badge variant="outline" className="ml-2">
                    {accountType === 'visitor' ? 'Visitor' : 'Global Citizen'}
                  </Badge>
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-primary">Profile Setup</span>
              <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="cultural-card border-primary/30 shadow-cultural">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-display text-primary">
                Complete Your Profile
              </CardTitle>
              <CardDescription className="text-base">
                Help us create the perfect cultural experience for you
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {renderStepContent()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t border-border/50">
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
                    
                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!validateCurrentStep()}
                        className="ml-auto flex items-center bg-gradient-cultural hover:shadow-glow"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting || !validateCurrentStep()}
                        className="ml-auto flex items-center bg-gradient-cultural hover:shadow-glow"
                      >
                        {isSubmitting ? "Creating Profile..." : "Complete Profile"}
                        {!isSubmitting && <ArrowRight className="h-4 w-4 ml-2" />}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfileSetup;