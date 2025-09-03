
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Features from '@/components/Features';

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
