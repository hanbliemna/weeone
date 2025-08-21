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
import { ArrowLeft, ArrowRight, Upload, User, Globe, BookOpen, Heart, Camera, Check, Crown, Trophy, CheckCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import LeagueBoard from "@/components/LeagueBoard";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters"),
  profilePhoto: z.string().optional(),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(500, "Bio must be less than 500 characters"),
  age: z.number().min(13, "Must be at least 13 years old").max(120, "Please enter a valid age"),
  gender: z.string().min(1, "Please select your gender"),
  nationality: z.string().min(1, "Please select your nationality"),
  languagesSpoken: z.array(z.string()).min(1, "Please select at least one language"),
  culturePreferences: z.array(z.string()).min(1, "Please select at least one cultural preference"),
  quizScore: z.number().min(0).max(100),
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
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      username: "",
      profilePhoto: "",
      bio: "",
      age: 18,
      gender: "",
      nationality: "",
      languagesSpoken: [],
      culturePreferences: [],
      quizScore: 75,
    },
  });

  const watchedValues = form.watch();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
        throw new Error("No user found");
      }

      // Insert profile data into Supabase
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: user.id,
            full_name: data.fullName,
            username: data.username,
            bio: data.bio,
            age: data.age,
            gender: data.gender,
            nationality: data.nationality,
            country_of_residence: data.nationality, // Use nationality for country_of_residence
            phone_number: '', // Empty for now since we collect it in RegisterForm
            languages_spoken: data.languagesSpoken,
            culture_preferences: data.culturePreferences,
            quiz_score: data.quizScore,
            profile_photo_url: data.profilePhoto,
            user_type: 'visitor',
            total_points: 0,
            countries_unlocked: [],
            badges_collected: ['New Member']
          }
        ]);

      if (error) {
        throw error;
      }
      
      toast({
        title: "Profile Created!",
        description: "Welcome to WeeOne! Your cultural journey begins now.",
      });
      
      // Navigate to main feed
      navigate("/feed");
    } catch (error: any) {
      toast({
        title: "Setup Failed",
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
      return values.fullName && values.username && values.username.length >= 3;
    } else if (currentStep === 2) {
      return values.bio && values.bio.length >= 10 && values.age >= 13 && values.gender && values.nationality;
    } else if (currentStep === 3) {
      return values.languagesSpoken.length > 0 && values.culturePreferences.length > 0;
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
  ].filter(country => country !== "Israel");

  const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary">Basic Information</h3>
              <p className="text-sm text-muted-foreground">Let's start with the basics</p>
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
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Upload a profile photo</p>
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
                    This is how others will find you on WeeOne
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

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write a brief introduction about yourself and your cultural interests..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value.length}/500 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="13" 
                        max="120"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              name="culturePreferences"
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

            <div className="bg-muted/50 rounded-lg p-4">
              <FormField
                control={form.control}
                name="quizScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-accent" />
                      Welcome Culture Quiz Score
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="100"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your score from the cultural awareness quiz (0-100%)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Trophy className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Your WeeOne Profile</h3>
              <p className="text-muted-foreground">
                Review your profile and explore your league board
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Summary */}
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile Summary
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{watchedValues.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Username:</span>
                    <span className="font-medium">@{watchedValues.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span className="font-medium">{watchedValues.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quiz Score:</span>
                    <span className="font-medium text-accent">{watchedValues.quizScore}%</span>
                  </div>
                </div>
                
                {watchedValues.bio && (
                  <div>
                    <span className="text-muted-foreground text-sm">Bio:</span>
                    <p className="text-sm mt-1 bg-background rounded p-2">{watchedValues.bio}</p>
                  </div>
                )}
                
                {watchedValues.languagesSpoken.length > 0 && (
                  <div>
                    <span className="text-muted-foreground text-sm">Languages:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {watchedValues.languagesSpoken.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* League Board Preview */}
              <div>
                <h4 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Trophy className="h-4 w-4" />
                  Your League Board
                </h4>
                <LeagueBoard
                  totalPoints={0}
                  quizScore={watchedValues.quizScore}
                  countriesUnlocked={[]}
                  badgesCollected={["New Member"]}
                />
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
            onClick={() => navigate("/register/verify")}
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
        <div className="max-w-lg mx-auto mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>Profile Setup</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="cultural-card border-primary/30 shadow-cultural bg-gradient-card">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-display bg-gradient-cultural bg-clip-text text-transparent">
                Create Your Cultural Profile
              </CardTitle>
              <CardDescription className="text-base mt-2 text-muted-foreground">
                Tell us about yourself and start your journey in the WeeOne community
              </CardDescription>
              
              {/* User Status Badge */}
              <div className="flex justify-center mt-4">
                <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-4 py-2">
                  <User className="h-4 w-4 mr-2" />
                  Visitor Status
                </Badge>
              </div>
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
                            Setting Up Profile...
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Complete Setup
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

export default ProfileSetup;