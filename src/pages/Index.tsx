
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SystemCapabilities from '@/components/SystemCapabilities';
import PerformanceAnalytics from '@/components/PerformanceAnalytics';
import CoachAutomation from '@/components/CoachAutomation';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Removed the automatic redirect - users should be able to view the landing page
  // even when logged in, and navigate back to dashboard manually if needed

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <SystemCapabilities />
      <PerformanceAnalytics />
      <Pricing />
      <CoachAutomation />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
