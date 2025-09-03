
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search, User, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm md:text-base hidden md:block">Welcome back! Here's what's happening today.</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackToHome}
            className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm px-2 md:px-3 touch-manipulation"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative hidden md:flex touch-manipulation">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative touch-manipulation">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-2 md:w-3 h-2 md:h-3 bg-accent rounded-full text-xs"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative hidden sm:flex touch-manipulation">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
