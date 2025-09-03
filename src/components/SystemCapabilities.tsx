
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  MessageSquare, 
  Calendar, 
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Sparkles,
  Target,
  Cpu
} from 'lucide-react';

const SystemCapabilities: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const coreCapabilities = [
    {
      icon: Bot,
      title: "AI Voice Assistant",
      subtitle: "24/7 Intelligent Receptionist",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      features: [
        "Natural conversation handling",
        "Automatic appointment booking", 
        "Lead qualification & scoring",
        "Multi-language support"
      ],
      metric: "95% Success Rate",
      description: "Your AI receptionist handles calls like a human, books appointments, and qualifies leads automatically."
    },
    {
      icon: MessageSquare,
      title: "Smart Communication Hub",
      subtitle: "Unified Messaging Platform",
      color: "from-blue-500 to-cyan-500", 
      bgColor: "bg-blue-50",
      features: [
        "WhatsApp automation",
        "Smart SMS campaigns",
        "Email sequences", 
        "Unified inbox"
      ],
      metric: "10x Faster Response",
      description: "All your communications in one place with intelligent automation that responds instantly."
    },
    {
      icon: Calendar,
      title: "Intelligent Scheduling",
      subtitle: "Smart Booking System",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50", 
      features: [
        "Calendar sync",
        "Auto reminders",
        "Smart rescheduling",
        "Time zone handling"
      ],
      metric: "98% Show-up Rate",
      description: "Never miss another booking with intelligent scheduling that handles everything automatically."
    }
  ];

  const automationMetrics = [
    { label: "Time Saved", value: "40+ hrs/week", icon: Clock, color: "text-primary" },
    { label: "Response Time", value: "< 30 seconds", icon: Zap, color: "text-accent" },
    { label: "Success Rate", value: "96%", icon: Target, color: "text-emerald-500" },
    { label: "24/7 Availability", value: "Always On", icon: Cpu, color: "text-purple-500" }
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-20 lg:py-32 px-4 lg:px-6 bg-gradient-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden">
      {/* New geometric background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.1)_0%,transparent_50%)] opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.1)_0%,transparent_50%)] opacity-60"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(120,119,198,0.05)_49%,rgba(120,119,198,0.05)_51%,transparent_51%)] bg-[length:20px_20px]"></div>
        <div className={`absolute top-10 md:top-20 right-5 md:right-10 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl transition-all duration-[2000ms] ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-10 md:bottom-20 left-5 md:left-10 w-40 md:w-80 h-40 md:h-80 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-[2000ms] delay-500 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header with brand colors */}
        <div className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-[800ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/15 to-accent/15 backdrop-blur-sm border border-primary/20 text-primary px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium mb-6 md:mb-8 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Complete Automation Platform</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 leading-tight px-4">
            <span className="bg-gradient-to-r from-slate-900 via-primary to-accent bg-clip-text text-transparent">
              Your Business Runs
            </span>
            <br />
            <span className="text-slate-800">While You Sleep</span>
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            Every lead captured. Every call answered. Every booking confirmed. All automated.
          </p>
        </div>

        {/* Automation Metrics with brand theme */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 lg:mb-20">
          {automationMetrics.map((metric, index) => (
            <Card 
              key={index} 
              className={`border-0 bg-white/80 backdrop-blur-sm text-center hover:bg-white/90 transition-all duration-500 hover:scale-105 group shadow-lg hover:shadow-xl border border-slate-200/50 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200 + 400}ms`, transitionDuration: '800ms' }}
            >
              <CardContent className="p-4 md:p-6">
                <metric.icon className={`h-6 md:h-8 w-6 md:w-8 ${metric.color} mx-auto mb-2 md:mb-3 group-hover:scale-125 transition-transform duration-300`} />
                <p className="text-xl md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">{metric.value}</p>
                <p className="text-xs md:text-sm text-slate-600 font-medium">{metric.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Core Capabilities with new styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {coreCapabilities.map((capability, index) => (
            <Card 
              key={index} 
              className={`border-0 bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-[900ms] cursor-pointer group overflow-hidden hover:bg-white hover:shadow-2xl border border-slate-200/50 ${
                hoveredService === index ? 'scale-105' : 'hover:scale-102'
              } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 300 + 800}ms` }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className={`h-1 bg-gradient-to-r ${capability.color} transition-all duration-300`}></div>
              
              <CardHeader className="text-center pb-3 md:pb-4 p-4 md:p-6">
                <div className={`w-12 md:w-16 h-12 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-r ${capability.color} flex items-center justify-center transform transition-all duration-300 ${
                  hoveredService === index ? 'scale-110 rotate-3' : ''
                } mb-3 md:mb-4`}>
                  <capability.icon className="h-6 md:h-8 w-6 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2">{capability.title}</CardTitle>
                <p className="text-xs md:text-sm text-slate-600 font-medium">{capability.subtitle}</p>
                <div className={`text-primary font-bold text-sm transition-all duration-300 ${
                  hoveredService === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  {capability.metric}
                </div>
              </CardHeader>
              
              <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                <p className="text-slate-700 text-center mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  {capability.description}
                </p>
                
                <div className="space-y-2 md:space-y-3">
                  {capability.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className={`flex items-center space-x-2 md:space-x-3 transition-all duration-300 transform ${
                        hoveredService === index ? 'translate-x-2' : ''
                      }`}
                    >
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700 text-xs md:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA with brand theme */}
        <div className={`text-center transition-all duration-[1000ms] delay-[1600ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-white/90 to-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-12 hover:from-white hover:to-white transition-all duration-500 hover:scale-105 group border border-slate-200/50 shadow-xl mx-4">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                Stop Managing, Start Growing
              </h3>
              <p className="text-slate-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                While other coaches spend hours on admin work, you'll be scaling your practice with complete automation. Your AI team never sleeps, never makes mistakes, and always delivers results.
              </p>
              <div className="flex flex-col gap-4 md:gap-6 justify-center">
                <Button className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-primary to-purple-600 text-white text-base md:text-lg rounded-full hover:scale-105 transition-all duration-300 group/btn shadow-xl touch-manipulation">
                  Start Automating Now
                  <ArrowRight className="ml-2 h-5 w-5 inline group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button variant="outline" className="px-8 md:px-10 py-3 md:py-4 border-2 border-primary/30 text-primary text-base md:text-lg rounded-full hover:bg-primary/5 hover:text-primary hover:border-primary/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-transparent touch-manipulation">
                  See It In Action
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemCapabilities;
