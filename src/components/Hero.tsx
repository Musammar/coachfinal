import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    leads: 0,
    conversion: 0,
    automation: 0
  });
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: "Active Leads", value: "2,543", color: "text-blue-400" },
    { icon: TrendingUp, label: "Conversion Rate", value: "94%", color: "text-green-400" },
    { icon: Zap, label: "Automation Rate", value: "87%", color: "text-yellow-400" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [stats.length]);

  useEffect(() => {
    const animateNumbers = () => {
      const targets = { leads: 2543, conversion: 94, automation: 87 };
      const duration = 3000;
      const steps = 80;
      const increment = duration / steps;

      let current = { leads: 0, conversion: 0, automation: 0 };
      const timer = setInterval(() => {
        current.leads = Math.min(current.leads + targets.leads / steps, targets.leads);
        current.conversion = Math.min(current.conversion + targets.conversion / steps, targets.conversion);
        current.automation = Math.min(current.automation + targets.automation / steps, targets.automation);
        
        setAnimatedNumbers({
          leads: Math.floor(current.leads),
          conversion: Math.floor(current.conversion),
          automation: Math.floor(current.automation)
        });

        if (current.leads >= targets.leads) {
          clearInterval(timer);
        }
      }, increment);
    };

    if (isVisible) {
      setTimeout(animateNumbers, 2000);
    }
  }, [isVisible]);

  const StatIcon = stats[currentStat].icon;

  const handleStartTrial = () => {
    navigate('/auth');
  };

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  const handleWatchDemo = () => {
    navigate('/features');
  };

  return (
    <section className="relative pt-20 md:pt-28 pb-12 md:pb-20 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90">
        <div className="absolute inset-0">
          <div className={`absolute top-5 md:top-10 left-5 md:left-10 w-48 md:w-96 h-48 md:h-96 bg-primary/10 rounded-full blur-3xl transition-all duration-[6000ms] ease-out ${isVisible ? 'animate-pulse opacity-60 scale-110' : 'opacity-0 scale-75'}`}></div>
          <div className={`absolute bottom-5 md:bottom-10 right-5 md:right-10 w-40 md:w-80 h-40 md:h-80 bg-accent/10 rounded-full blur-3xl transition-all duration-[6000ms] ease-out delay-1000 ${isVisible ? 'animate-pulse opacity-60 scale-110' : 'opacity-0 scale-75'}`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/5 rounded-full blur-3xl transition-all duration-[8000ms] ease-out delay-1500 ${isVisible ? 'animate-pulse opacity-80 scale-125' : 'opacity-0 scale-90'}`}></div>
          
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] opacity-30"></div>
          
          <div className={`absolute top-1/4 left-1/6 w-6 h-6 bg-blue-400/40 rounded-full transition-all duration-[3000ms] ease-out delay-2000 ${isVisible ? 'animate-bounce opacity-80' : 'opacity-0 translate-y-20'}`}></div>
          <div className={`absolute top-3/4 right-1/6 w-8 h-8 bg-green-400/40 rounded-full transition-all duration-[3000ms] ease-out delay-2500 ${isVisible ? 'animate-bounce opacity-80' : 'opacity-0 translate-y-20'}`}></div>
          <div className={`absolute bottom-1/3 left-3/4 w-4 h-4 bg-yellow-400/40 rounded-full transition-all duration-[3000ms] ease-out delay-3000 ${isVisible ? 'animate-bounce opacity-80' : 'opacity-0 translate-y-20'}`}></div>
        </div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className={`transition-all duration-[2000ms] ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 md:space-x-3 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium mb-6 md:mb-8 hover:scale-105 transition-transform duration-700 shadow-2xl">
            <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
            <span className="font-semibold hidden sm:inline">Trusted by 10,000+ Coaches Worldwide</span>
            <span className="font-semibold sm:hidden">10,000+ Coaches Trust Us</span>
            <div className="flex items-center space-x-2">
              <StatIcon className={`w-4 h-4 ${stats[currentStat].color} transition-all duration-1000`} />
              <span className={`${stats[currentStat].color} font-bold transition-all duration-1000`}>
                {stats[currentStat].value}
              </span>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-[2500ms] delay-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 text-white leading-tight drop-shadow-2xl">
            AI-Powered Coach
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]">
              Automation Platform
            </span>
          </h1>
        </div>

        <div className={`transition-all duration-[2500ms] delay-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg px-4">
            Transform your coaching practice with intelligent automation. Generate leads, nurture clients, and scale your business while you focus on what you do best — coaching.
          </p>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-3 md:gap-8 mb-8 md:mb-12 transition-all duration-[2500ms] delay-1500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex items-center space-x-2 md:space-x-3 bg-white/15 backdrop-blur-lg px-3 md:px-6 py-2 md:py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-700 hover:scale-105 shadow-xl">
            <Users className="h-5 w-5 text-blue-400" />
            <span className="text-white font-semibold text-sm md:text-base">{animatedNumbers.leads.toLocaleString()}+ Leads</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3 bg-white/15 backdrop-blur-lg px-3 md:px-6 py-2 md:py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-700 hover:scale-105 shadow-xl">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span className="text-white font-semibold text-sm md:text-base">{animatedNumbers.conversion}% Rate</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3 bg-white/15 backdrop-blur-lg px-3 md:px-6 py-2 md:py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-700 hover:scale-105 shadow-xl">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-semibold text-sm md:text-base">{animatedNumbers.automation}% Auto</span>
          </div>
        </div>

        <div className={`flex flex-col items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16 transition-all duration-[2500ms] delay-2000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 hover:scale-110 transition-all duration-700 text-base md:text-lg px-8 md:px-12 py-4 md:py-6 rounded-xl shadow-2xl hover:shadow-primary/25 border-0 font-semibold w-full sm:w-auto touch-manipulation"
            onClick={handleStartTrial}
          >
            Start Free 14-Day Trial
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
            size="lg" 
            variant="outline" 
            className="text-base md:text-lg px-8 md:px-12 py-4 md:py-6 rounded-xl border-2 border-white/40 text-white hover:bg-white/20 hover:text-white hover:border-white/60 backdrop-blur-lg transition-all duration-700 hover:scale-110 hover:shadow-2xl bg-white/10 font-semibold w-full sm:w-auto touch-manipulation"
            onClick={handleWatchDemo}
          >
            <Play className="mr-3 h-5 w-5" />
            Watch Demo
          </Button>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-accent to-cyan-600 text-white hover:from-accent/80 hover:to-cyan-600/80 hover:scale-110 transition-all duration-700 text-base md:text-lg px-8 md:px-12 py-4 md:py-6 rounded-xl shadow-2xl hover:shadow-accent/25 font-semibold w-full sm:w-auto touch-manipulation"
            onClick={handleViewDashboard}
          >
            View Dashboard
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
          </div>
        </div>

        <div className={`flex flex-col items-center justify-center space-y-2 md:space-y-3 text-white/90 transition-all duration-[2500ms] delay-2500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium text-sm md:text-base">No Setup Required</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-500"></div>
            <span className="font-medium text-sm md:text-base">Cancel Anytime</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-1000"></div>
            <span className="font-medium text-sm md:text-base">30-Day Money Back</span>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
