import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Story from "./pages/Story";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import RegisterForm from "./pages/RegisterForm";
import EmailVerification from "./pages/EmailVerification";
import ExistingUserRedirect from "./pages/ExistingUserRedirect";
import ProfileSetup from "./pages/ProfileSetup";
import MainFeed from "./pages/MainFeed";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import TunisianChannel from "./pages/TunisianChannel";
import Channels from "./pages/Channels";
import People from "./pages/People";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/story" element={<Story />} />
          <Route path="/community" element={<Community />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-form" element={<RegisterForm />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/email-existing" element={<ExistingUserRedirect />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/feed" element={<MainFeed />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/people" element={<People />} />
          <Route path="/tunisian-channel" element={<TunisianChannel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
