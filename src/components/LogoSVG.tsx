import React from 'react';

interface LogoSVGProps {
  width?: number;
  height?: number;
  className?: string;
  id?: string;
}

const LogoSVG: React.FC<LogoSVGProps> = ({ width = 200, height = 60, className = "", id }) => {
  return (
    <svg
      id={id}
      width={width}
      height={height}
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Main gradient for the icon background */}
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        
        {/* Text gradient */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="70%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        
        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background glow circle */}
      <circle
        cx="25"
        cy="30"
        r="20"
        fill="url(#iconGradient)"
        opacity="0.3"
        filter="url(#glow)"
      />
      
      {/* Main icon background */}
      <rect
        x="5"
        y="10"
        width="40"
        height="40"
        rx="12"
        fill="url(#iconGradient)"
      />
      
      {/* Bot icon - simplified robot head */}
      <rect
        x="15"
        y="20"
        width="20"
        height="16"
        rx="4"
        fill="white"
      />
      
      {/* Bot eyes */}
      <circle cx="20" cy="26" r="2" fill="#8b5cf6" />
      <circle cx="30" cy="26" r="2" fill="#8b5cf6" />
      
      {/* Bot mouth */}
      <rect x="18" y="30" width="14" height="2" rx="1" fill="#8b5cf6" />
      
      {/* AI spark - lightning bolt */}
      <path
        d="M38 18 L34 22 L36 22 L32 28 L36 24 L34 24 L38 18 Z"
        fill="#fbbf24"
      />
      
      {/* CoachFlow text */}
      <text
        x="55"
        y="25"
        fontSize="18"
        fontWeight="bold"
        fontFamily="Inter, system-ui, sans-serif"
        fill="#8b5cf6"
      >
        CoachFlow
      </text>
      
      {/* AI text with gradient */}
      <text
        x="155"
        y="25"
        fontSize="18"
        fontWeight="bold"
        fontFamily="Inter, system-ui, sans-serif"
        fill="url(#textGradient)"
      >
        AI
      </text>
      
      {/* Tagline */}
      <text
        x="55"
        y="42"
        fontSize="10"
        fontFamily="Inter, system-ui, sans-serif"
        fill="#64748b"
      >
        Smart Coaching Automation
      </text>
    </svg>
  );
};

export default LogoSVG;
