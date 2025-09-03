
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logo from './Logo';
import { Menu, X, Home, User, LayoutDashboard, Mail } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignInClick = () => {
    navigate('/auth');
  };

  const handleStartTrialClick = () => {
    navigate('/auth');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleSignOutClick = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <button onClick={handleLogoClick}>
            <Logo size="sm" variant="white" />
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/')}
              className="text-white/80 hover:text-white transition-colors font-medium relative group flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => handleNavigation('/features')}
              className="text-white/80 hover:text-white transition-colors font-medium relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className="text-white/80 hover:text-white transition-colors font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => handleNavigation('/contact')}
              className="text-white/80 hover:text-white transition-colors font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              // User is logged in - show profile section
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 text-white">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-primary text-white text-sm">
                      {getUserInitials(getUserDisplayName())}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Welcome, {getUserDisplayName()}</span>
                  </div>
                </div>
                <Button 
                  className="bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-2 text-sm px-3 py-2"
                  onClick={handleDashboardClick}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white border border-white/20 hover:bg-white/10 hover:text-white text-sm px-3 py-2"
                  onClick={handleSignOutClick}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              // User is not logged in - show sign in/up buttons
              <>
                <Button 
                  variant="ghost" 
                  className="text-white border border-white/20 hover:bg-white/10 hover:text-white flex items-center space-x-2 text-sm px-3 py-2"
                  onClick={handleSignInClick}
                >
                  <Mail className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
                <Button 
                  className="bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 hover:scale-105 transition-all duration-300 shadow-lg text-sm px-3 py-2"
                  onClick={handleStartTrialClick}
                >
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            {user && (
              <Button 
                size="sm"
                className="bg-gradient-to-r from-primary to-purple-600 text-white px-2 py-1 text-xs"
                onClick={handleDashboardClick}
              >
                <LayoutDashboard className="h-3 w-3" />
              </Button>
            )}
            <button 
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-white/20 mobile-scroll">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => handleNavigation('/')}
                className="text-white/80 hover:text-white transition-colors font-medium flex items-center space-x-2 text-left py-2 touch-manipulation"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button 
                onClick={() => handleNavigation('/features')}
                className="text-white/80 hover:text-white transition-colors font-medium text-left py-2 touch-manipulation"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className="text-white/80 hover:text-white transition-colors font-medium text-left py-2 touch-manipulation"
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('/contact')}
                className="text-white/80 hover:text-white transition-colors font-medium text-left py-2 touch-manipulation"
              >
                Contact
              </button>
              
              {user ? (
                // Mobile user profile section
                <div className="flex flex-col space-y-3 pt-3 border-t border-white/20">
                  <div className="flex items-center space-x-3 text-white">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-primary text-white text-sm">
                        {getUserInitials(getUserDisplayName())}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Welcome, {getUserDisplayName()}</span>
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 flex items-center justify-center space-x-2 w-full py-3 text-sm touch-manipulation"
                    onClick={handleDashboardClick}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Go to Dashboard</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-white border border-white/20 hover:bg-white/10 hover:text-white w-full py-3 text-sm touch-manipulation"
                    onClick={handleSignOutClick}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                // Mobile sign in/up buttons
                <div className="flex flex-col space-y-3 pt-3">
                  <Button 
                    variant="ghost" 
                    className="text-white border border-white/20 hover:bg-white/10 hover:text-white flex items-center justify-center space-x-2 w-full py-3 text-sm touch-manipulation"
                    onClick={handleSignInClick}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 w-full py-3 text-sm touch-manipulation"
                    onClick={handleStartTrialClick}
                  >
                    Start Free Trial
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
