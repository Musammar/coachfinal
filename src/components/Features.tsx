import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Phone, MessageSquare, Users, Calendar, Zap, TrendingUp, Shield, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const handleStartTrial = () => {
    navigate('/auth');
  };

  const handleViewFeatures = () => {
    navigate('/features');
  };

  const handleFeatureClick = (featureId: string) => {
    navigate(`/features#${featureId}`);
  };

  const features = [
    {
      id: 'voice',
      title: 'AI Lead Generation',
      description: 'Smart automation that captures, qualifies, and nurtures leads with personalized experiences.',
      metric: '300% more leads',
      gradient: 'from-primary to-purple-600',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
      benefits: ['Automated lead capture', 'Smart qualification', 'Personalized nurturing'],
      delay: 'animation-delay-100',
      icon: Users
    },
    {
      id: 'messaging',
      title: 'Voice AI Assistant',
      description: 'AI receptionist that answers calls, handles queries, and books appointments with natural conversation.',
      metric: '24/7 availability',
      gradient: 'from-accent to-blue-600',
      bgPattern: 'radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
      benefits: ['Natural conversations', 'Appointment booking', 'Call analytics'],
      delay: 'animation-delay-200',
      icon: Phone
    },
    {
      id: 'automation',
      title: 'Smart Messaging Hub',
      description: 'Unified inbox for WhatsApp, SMS, and email with intelligent auto-responses and routing.',
      metric: '90% response rate',
      gradient: 'from-purple-500 to-primary',
      bgPattern: 'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
      benefits: ['Unified messaging', 'Auto-responses', 'Smart routing'],
      delay: 'animation-delay-300',
      icon: MessageSquare
    },
    {
      id: 'crm',
      title: 'Client Management CRM',
      description: 'Comprehensive dashboard with lead tracking, activity timelines, and intelligent insights.',
      metric: '5x faster management',
      gradient: 'from-emerald-500 to-accent',
      bgPattern: 'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
      benefits: ['Activity tracking', 'Lead scoring', 'Performance insights'],
      delay: 'animation-delay-400',
      icon: Bot
    },
    {
      id: 'booking',
      title: 'Booking Automation',
      description: 'Smart calendar integration with confirmations, reminders, and intelligent reschedule flows.',
      metric: '95% show-up rate',
      gradient: 'from-orange-500 to-red-500',
      bgPattern: 'radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
      benefits: ['Smart scheduling', 'Auto-reminders', 'Reschedule handling'],
      delay: 'animation-delay-500',
      icon: Calendar
    },
    {
      id: 'security',
      title: 'Workflow Automation',
      description: 'Visual automation builder with pre-built templates and real-time performance analytics.',
      metric: '10x faster setup',
      gradient: 'from-violet-500 to-primary',
      bgPattern: 'radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
      benefits: ['Visual builder', 'Pre-built templates', 'Real-time analytics'],
      delay: 'animation-delay-600',
      icon: Zap
    }
  ];

  return (
    <section ref={sectionRef} id="features" className="relative py-12 md:py-20 lg:py-32 px-4 lg:px-6 overflow-hidden bg-gradient-to-br from-white via-slate-50/80 to-blue-50/30">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-10 md:top-20 left-5 md:left-10 w-32 md:w-48 lg:w-72 h-32 md:h-48 lg:h-72 bg-primary/3 rounded-full blur-3xl transition-all duration-1000 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-20 md:top-40 right-10 md:right-20 w-40 md:w-64 lg:w-96 h-40 md:h-64 lg:h-96 bg-accent/3 rounded-full blur-3xl transition-all duration-1000 delay-300 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-10 md:bottom-20 left-1/3 w-36 md:w-56 lg:w-80 h-36 md:h-56 lg:h-80 bg-purple-500/3 rounded-full blur-3xl transition-all duration-1000 delay-500 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-primary px-3 md:px-4 lg:px-6 py-2 lg:py-3 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 lg:mb-8 animate-fade-in hover:scale-105 transition-transform duration-300 border border-primary/10">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span>AI-Powered Coaching Tools</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-8 text-slate-900 animate-fade-in px-4">
            Everything Coaches Need to <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                Scale & Automate
              </span>
              <div className="absolute -bottom-1 md:-bottom-2 lg:-bottom-4 left-0 w-full h-0.5 md:h-1 lg:h-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed animate-fade-in mb-6 md:mb-8 lg:mb-12 px-4">
            Comprehensive AI-powered tools designed specifically for modern coaches who want to automate their practice and focus on what they do best - coaching.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 lg:gap-8 mb-8 md:mb-12 lg:mb-16">
            <div className="flex items-center space-x-2 md:space-x-3 bg-white/90 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-slate-200 hover:scale-105 hover:shadow-lg transition-all duration-300 group">
              <TrendingUp className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs md:text-sm lg:text-base font-medium text-slate-700">300% revenue growth</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3 bg-white/90 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-slate-200 hover:scale-105 hover:shadow-lg transition-all duration-300 group">
              <Shield className="h-4 lg:h-5 w-4 lg:w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs md:text-sm lg:text-base font-medium text-slate-700">Enterprise security</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3 bg-white/90 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-slate-200 hover:scale-105 hover:shadow-lg transition-all duration-300 group">
              <Users className="h-4 lg:h-5 w-4 lg:w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs md:text-sm lg:text-base font-medium text-slate-700">10,000+ coaches</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group block cursor-pointer"
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div
                className={`relative animate-fade-in ${feature.delay} transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div 
                  className={`absolute inset-0 rounded-2xl lg:rounded-3xl transition-all duration-500 ${
                    hoveredFeature === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                  }`}
                  style={{ background: feature.bgPattern }}
                ></div>
                
                <Card className="relative border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:shadow-xl hover:scale-[1.02] lg:hover:scale-[1.05] group-hover:border-primary/20 overflow-hidden h-full rounded-2xl lg:rounded-3xl cursor-pointer">
                  <div className={`absolute top-0 left-0 w-full h-1 lg:h-2 bg-gradient-to-r transition-all duration-500 ${
                    hoveredFeature === index ? 'opacity-100' : 'opacity-60'
                  }`} 
                       style={{ backgroundImage: `linear-gradient(135deg, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})` }}></div>
                  
                  <CardContent className="p-4 md:p-6 lg:p-8 relative">
                    <div className="relative mb-4 md:mb-6 lg:mb-8">
                      <div className={`w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 rounded-xl md:rounded-2xl lg:rounded-3xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <feature.icon className="h-6 md:h-8 lg:h-10 w-6 md:w-8 lg:w-10 text-white" />
                      </div>
                      <div className={`absolute inset-0 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 rounded-xl md:rounded-2xl lg:rounded-3xl bg-gradient-to-r ${feature.gradient} transition-all duration-500 ${
                        hoveredFeature === index ? 'opacity-20 blur-xl scale-125' : 'opacity-0 blur-xl scale-100'
                      }`}></div>
                    </div>
                    
                    <div className="mb-3 md:mb-4">
                      <span className={`inline-block bg-primary/10 text-primary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                        hoveredFeature === index ? 'bg-primary/20 scale-105' : ''
                      }`}>
                        {feature.metric}
                      </span>
                    </div>
                    
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4 text-slate-900 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base group-hover:text-slate-700 transition-colors duration-300 mb-3 md:mb-4 lg:mb-6">
                      {feature.description}
                    </p>
                    
                    <div className={`space-y-2 mb-4 lg:mb-6 transition-all duration-500 ${
                      hoveredFeature === index ? 'opacity-100 max-h-20' : 'opacity-70 max-h-20'
                    }`}>
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2 text-xs md:text-sm text-slate-600">
                          <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-primary flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`flex items-center text-primary transition-all duration-300 transform ${
                      hoveredFeature === index ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-0'
                    }`}>
                      <span className="text-xs md:text-sm font-semibold mr-2">Explore Module</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 md:mt-16 lg:mt-24 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-flex items-center justify-center p-6 md:p-8 lg:p-12 rounded-2xl lg:rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl group hover:scale-105 transition-all duration-500 mx-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl lg:rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
            
            <div className="absolute -top-1 -left-1 md:-top-2 md:-left-2 lg:-top-4 lg:-left-4 w-4 md:w-6 lg:w-8 h-4 md:h-6 lg:h-8 bg-primary/20 rounded-full animate-bounce-slow"></div>
            <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 lg:-bottom-4 lg:-right-4 w-3 md:w-4 lg:w-6 h-3 md:h-4 lg:h-6 bg-accent/20 rounded-full animate-bounce-slow animation-delay-1000"></div>
            
            <div className="text-center relative z-10">
              <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
                <Star className="h-5 lg:h-6 w-5 lg:w-6 text-yellow-500 fill-current animate-pulse" />
                <span className="text-xs md:text-sm lg:text-base font-medium text-primary">Trusted by 10,000+ Coaches</span>
                <Star className="h-5 lg:h-6 w-5 lg:w-6 text-yellow-500 fill-current animate-pulse" />
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 text-slate-900">
                Ready to 10x Your Coaching Business?
              </h3>
              <p className="text-slate-600 mb-4 md:mb-6 lg:mb-8 max-w-2xl text-sm md:text-base lg:text-lg">
                Join thousands of coaches who've transformed their practice with AI automation. Start your free trial today.
              </p>
              <div className="flex flex-col gap-3 md:gap-4 lg:gap-6 justify-center">
                <Button 
                  onClick={handleStartTrial}
                  className="px-6 md:px-8 lg:px-10 py-3 lg:py-4 bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 hover:scale-105 transition-all duration-300 text-sm md:text-base lg:text-lg group rounded-full font-semibold shadow-lg w-full sm:w-auto touch-manipulation"
                >
                  Start Free 14-Day Trial
                  <ArrowRight className="ml-2 h-4 lg:h-5 w-4 lg:w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  onClick={handleViewFeatures}
                  variant="outline" 
                  className="px-6 md:px-8 lg:px-10 py-3 lg:py-4 border-2 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/40 hover:scale-105 transition-all duration-300 text-sm md:text-base lg:text-lg group rounded-full font-semibold w-full sm:w-auto touch-manipulation"
                >
                  Explore More Features
                </Button>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-2 mt-4 md:mt-6 lg:mt-8 text-xs md:text-sm text-slate-600">
                <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No Setup Fees</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel Anytime</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>30-Day Money Back</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
