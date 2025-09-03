
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import DebugSupabase from "@/components/DebugSupabase";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Solutions from "./pages/Solutions";
import Services from "./pages/Services";
import Analytics from "./pages/Analytics";
import CRM from "./pages/CRM";
import Inbox from "./pages/Inbox";
import Bookings from "./pages/Bookings";
import Automation from "./pages/Automation";
import VoiceAgent from "./pages/VoiceAgent";
import EmailAutomation from "./pages/EmailAutomation";
import NotFound from "./pages/NotFound";
import BusinessOnboarding from "./pages/BusinessOnboarding";

const queryClient = new QueryClient();

function App() {
  console.log('=== App Component Loading ===');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/features" element={<Features />} />
              <Route path="/business-onboarding" element={<BusinessOnboarding />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/services" element={<Services />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/voice-agent" element={<VoiceAgent />} />
              <Route path="/email-automation" element={<EmailAutomation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          {process.env.NODE_ENV === 'development' && <DebugSupabase />}
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
