
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/50 border-t py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="md:col-span-2 text-center md:text-left">
            <Logo size="lg" />
            <p className="text-muted-foreground mt-3 md:mt-4 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              AI-powered automation platform helping coaches scale their practice with intelligent workflows and client management.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">Product</h4>
            <ul className="space-y-2 md:space-y-3 text-muted-foreground text-sm md:text-base">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">Support</h4>
            <ul className="space-y-2 md:space-y-3 text-muted-foreground text-sm md:text-base">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 md:mt-12 pt-6 md:pt-8 text-center text-muted-foreground text-sm md:text-base">
          <p>&copy; 2024 CoachFlow AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
