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
import { ArrowLeft, ArrowRight, Upload, User, Globe, BookOpen, Heart, Camera, Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters"),
  profilePhoto: z.string().optional(),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  culturalPreferences: z.array(z.string()).min(1, "Please select at least one cultural preference"),
  culturalBackground: z.string().min(1, "Please describe your cultural background"),
  biography: z.string().min(10, "Biography must be at least 10 characters").max(500, "Biography must be less than 500 characters"),
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
      username: "",
      profilePhoto: "",
      languages: [],
      interests: [],
      culturalPreferences: [],
      culturalBackground: "",
      biography: "",
    },
  });

  const totalSteps = 3;
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
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate profile setup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Profile Setup Complete!",
        description: "Welcome to the WeeOne community! Let's start connecting.",
      });
      
      // Navigate to dashboard or welcome page
      navigate("/");
    } catch (error) {
      toast({
        title: "Setup Failed",
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
      return values.username && values.username.length >= 3;
    } else if (currentStep === 2) {
      return values.languages.length > 0 && values.interests.length > 0;
    } else if (currentStep === 3) {
      return values.culturalPreferences.length > 0 && values.culturalBackground && values.biography && values.biography.length >= 10;
    }
    
    return false;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Create Your Profile</h3>
              <p className="text-sm text-muted-foreground">Let others know who you are</p>
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
                <label className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary-light transition-colors">
                  <Upload className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Upload a profile photo (optional)</p>
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
                      className="text-center"
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
              <Globe className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Languages & Interests</h3>
              <p className="text-sm text-muted-foreground">Share what you're passionate about</p>
            </div>

            <FormField
              control={form.control}
              name="languages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages You Speak</FormLabel>
                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
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
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests & Hobbies</FormLabel>
                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
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

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Cultural Profile</h3>
              <p className="text-sm text-muted-foreground">Tell us about your cultural journey</p>
            </div>

            <FormField
              control={form.control}
              name="culturalPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cultural Preferences</FormLabel>
                  <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
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
              name="culturalBackground"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cultural Background</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your cultural heritage, traditions, and what makes you unique..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Biography</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write a brief introduction about yourself, your interests, and what you hope to share with the WeeOne community..."
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
        <div className="max-w-lg mx-auto">
          <Card className="cultural-card border-primary/20 shadow-cultural">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Complete Your Profile</CardTitle>
              <CardDescription>
                Help others discover and connect with you
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