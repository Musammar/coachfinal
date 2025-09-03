
import React from 'react';
import { Bot, Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'default' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const colorClasses = {
    default: 'text-primary',
    white: 'text-white'
  };

  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      {/* Enhanced Logo Icon */}
      <div className={`
        ${sizeClasses[size]} 
        relative
        rounded-2xl 
        bg-gradient-to-br from-primary via-purple-600 to-accent
        flex 
        items-center 
        justify-center 
        shadow-xl
        group-hover:scale-110
        group-hover:shadow-2xl
        group-hover:shadow-primary/25
        transition-all 
        duration-300
        border-2 border-white/20
      `}>
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-accent rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        
        {/* Main icon */}
        <div className="relative z-10 flex items-center justify-center">
          <Bot className={`${size === 'lg' ? 'w-7 h-7' : size === 'md' ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
          
          {/* AI spark effect */}
          <Zap className={`${size === 'lg' ? 'w-3 h-3' : size === 'md' ? 'w-2.5 h-2.5' : 'w-2 h-2'} text-yellow-300 absolute -top-1 -right-1`} />
        </div>
        
        {/* Animated pulse ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-pulse"></div>
      </div>
      
      {/* Enhanced Brand Text */}
      <div className="flex flex-col">
        <span className={`font-bold ${colorClasses[variant]} ${textSizeClasses[size]} leading-tight tracking-tight`}>
          CoachFlow
          <span className="bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent ml-1">
            AI
          </span>
        </span>
        {size === 'lg' && (
          <span className={`text-xs ${variant === 'white' ? 'text-white/60' : 'text-muted-foreground'} font-medium tracking-wide`}>
            Smart Coaching Automation
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
