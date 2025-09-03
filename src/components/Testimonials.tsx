
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Life Coach & Business Mentor",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      content: "CoachFlow AI transformed my practice completely. I went from manually handling 20 leads per week to automatically nurturing 200+ leads while I sleep. My revenue increased by 400% in just 6 months.",
      rating: 5,
      metric: "+400% revenue",
      highlight: "From 20 to 200+ leads weekly",
      company: "Johnson Life Coaching"
    },
    {
      name: "Michael Chen",
      role: "Executive Coach",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The AI voice agent is incredible. It handles all my initial client calls, books appointments, and even does follow-ups. I can focus on actual coaching instead of administrative tasks.",
      rating: 5,
      metric: "50+ hours saved/week",
      highlight: "Eliminated admin work completely",
      company: "Chen Executive Coaching"
    },
    {
      name: "Emma Rodriguez",
      role: "Health & Wellness Coach",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "The automation workflows are game-changing. My client onboarding is now seamless, and the personalized follow-up sequences have improved my conversion rate to 85%.",
      rating: 5,
      metric: "85% conversion rate",
      highlight: "Seamless client onboarding",
      company: "Rodriguez Wellness"
    },
    {
      name: "David Thompson",
      role: "Career Transition Coach",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "Best investment I've made for my coaching business. The omnichannel chatbot handles inquiries from all platforms, and I never miss a potential client again.",
      rating: 5,
      metric: "Zero missed leads",
      highlight: "24/7 lead capture",
      company: "Thompson Career Coaching"
    },
    {
      name: "Lisa Park",
      role: "Relationship Coach",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      content: "The visual workflow builder made automation so easy. I created complex client journeys without any technical knowledge. My client satisfaction scores are at an all-time high.",
      rating: 5,
      metric: "98% client satisfaction",
      highlight: "No-code automation setup",
      company: "Park Relationship Coaching"
    },
    {
      name: "James Wilson",
      role: "Performance Coach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "CoachFlow AI scaled my business from 1-on-1 coaching to running a coaching empire. The AI handles everything while maintaining that personal touch my clients love.",
      rating: 5,
      metric: "10x business growth",
      highlight: "Scaled to coaching empire",
      company: "Wilson Performance Academy"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20 lg:py-32 px-4 lg:px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0">
        <div className={`absolute top-10 md:top-20 left-5 md:left-10 lg:left-20 w-48 md:w-64 lg:w-96 h-48 md:h-64 lg:h-96 bg-primary/8 rounded-full blur-3xl transition-all duration-1000 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-10 md:bottom-20 right-5 md:right-10 lg:right-20 w-40 md:w-56 lg:w-80 h-40 md:h-56 lg:h-80 bg-accent/8 rounded-full blur-3xl transition-all duration-1000 delay-300 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 md:w-48 lg:w-72 h-36 md:h-48 lg:h-72 bg-purple-500/8 rounded-full blur-3xl transition-all duration-1000 delay-500 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
        
        {/* Floating stars */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <Star
              key={i}
              className={`absolute w-3 h-3 lg:w-4 lg:h-4 text-yellow-400/15 fill-current transition-all duration-1000 delay-${i * 100} ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-3 md:px-4 lg:px-6 py-2 lg:py-3 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 lg:mb-8 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
            <span>Success Stories</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-8 text-white px-4">
            Coaches Love
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent animate-gradient">
              CoachFlow AI
            </span>
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4 md:mb-6 lg:mb-8 px-4">
            See how thousands of coaches transformed their practice and scaled their business with AI automation.
          </p>

          {/* Success metrics showcase */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 lg:gap-8 mb-6 md:mb-8 lg:mb-12">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 lg:px-4 py-2 rounded-full border border-white/20 hover:scale-105 transition-transform duration-300">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-white text-xs md:text-sm">300% Growth</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 lg:px-4 py-2 rounded-full border border-white/20 hover:scale-105 transition-transform duration-300">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-white text-xs md:text-sm">10,000+ Coaches</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 lg:px-4 py-2 rounded-full border border-white/20 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-white text-xs md:text-sm">99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className={`mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Card className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-12 shadow-2xl hover:scale-105 transition-all duration-500 group">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-6 lg:gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].name}
                    className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 rounded-full border-4 border-white/20 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <Quote className="h-8 md:h-10 lg:h-12 w-8 md:w-10 lg:w-12 text-primary mb-3 md:mb-4 mx-auto lg:mx-0 opacity-60" />
                  <p className="text-white/95 leading-relaxed mb-4 md:mb-6 text-base md:text-lg lg:text-xl">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-3 md:gap-4">
                    <div>
                      <h4 className="font-bold text-white text-base md:text-lg">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-white/70 text-sm md:text-base">{testimonials[activeTestimonial].role}</p>
                      <p className="text-white/50 text-xs md:text-sm">{testimonials[activeTestimonial].company}</p>
                    </div>
                    <div className="text-center lg:text-right">
                      <div className="flex items-center mb-1 md:mb-2 justify-center lg:justify-end">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="h-4 md:h-5 w-4 md:w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold">
                        {testimonials[activeTestimonial].metric}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Testimonial navigation dots */}
          <div className="flex justify-center mt-4 md:mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                  activeTestimonial === index 
                    ? 'bg-primary scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`
                bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 rounded-xl md:rounded-2xl lg:rounded-3xl
                transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl lg:rounded-3xl
                animate-fade-in animation-delay-${((index + 1) * 100) % 600}
                ${isVisible ? 'translate-y-0 opacity-100 delay-' + ((index + 1) * 100) : 'translate-y-10 opacity-0'}
              `}
            >
              <CardContent className="p-4 md:p-6 lg:p-8 relative">
                {/* Enhanced quote icon */}
                <Quote className="h-5 md:h-6 lg:h-8 w-5 md:w-6 lg:w-8 text-primary mb-3 md:mb-4 lg:mb-6 opacity-60" />
                
                {/* Highlight badge */}
                <div className="mb-3 md:mb-4">
                  <span className="inline-block bg-primary/20 text-primary px-2 md:px-3 py-1 rounded-full text-xs font-medium">
                    {testimonial.highlight}
                  </span>
                </div>
                
                {/* Content */}
                <p className="text-white/95 leading-relaxed mb-3 md:mb-4 lg:mb-6 text-sm lg:text-base">
                  "{testimonial.content}"
                </p>
                
                {/* Enhanced rating */}
                <div className="flex items-center mb-3 md:mb-4 lg:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 lg:h-5 w-4 lg:w-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                
                {/* Enhanced metric badge */}
                <div className="mb-3 md:mb-4 lg:mb-6">
                  <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold hover:scale-105 transition-transform duration-300">
                    {testimonial.metric}
                  </span>
                </div>
                
                {/* Enhanced author */}
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 rounded-full mr-3 md:mr-4 border-2 border-white/20 hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h4 className="font-bold text-white hover:text-primary transition-colors duration-300 text-xs md:text-sm lg:text-base">{testimonial.name}</h4>
                    <p className="text-white/70 text-xs">{testimonial.role}</p>
                    <p className="text-white/50 text-xs">{testimonial.company}</p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className={`text-center mt-12 md:mt-16 lg:mt-20 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 hover:scale-105 transition-all duration-500 group relative mx-4">
            {/* Floating elements */}
            <div className="absolute -top-1 -left-1 md:-top-2 md:-left-2 lg:-top-4 lg:-left-4 w-4 md:w-6 lg:w-8 h-4 md:h-6 lg:h-8 bg-primary/30 rounded-full animate-bounce-slow"></div>
            <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 lg:-bottom-4 lg:-right-4 w-3 md:w-4 lg:w-6 h-3 md:h-4 lg:h-6 bg-accent/30 rounded-full animate-bounce-slow animation-delay-1000"></div>
            <div className="absolute top-1/2 -left-2 md:-left-4 lg:-left-6 w-2 md:w-3 lg:w-4 h-2 md:h-3 lg:h-4 bg-purple-500/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 -right-2 md:-right-4 lg:-right-6 w-3 md:w-4 lg:w-5 h-3 md:h-4 lg:h-5 bg-yellow-400/30 rounded-full animate-pulse animation-delay-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
                <Star className="h-5 lg:h-6 w-5 lg:w-6 text-yellow-400 fill-current animate-pulse" />
                <span className="text-primary font-medium text-xs md:text-sm lg:text-base">Join 10,000+ Successful Coaches</span>
                <Star className="h-5 lg:h-6 w-5 lg:w-6 text-yellow-400 fill-current animate-pulse" />
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 md:mb-4 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Ready to Join Them?
              </h3>
              <p className="text-white/80 mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto text-sm lg:text-base">
                Start your 14-day free trial and see results like these coaches
              </p>
              <div className="flex flex-col gap-3 md:gap-4 justify-center">
                <button className="px-6 lg:px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 text-sm md:text-base lg:text-lg group/btn w-full sm:w-auto touch-manipulation">
                  Start Your Success Story
                  <ArrowRight className="ml-2 h-4 lg:h-5 w-4 lg:w-5 inline group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="px-6 lg:px-8 py-3 border-2 border-white/20 text-white rounded-full font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300 text-sm md:text-base lg:text-lg w-full sm:w-auto touch-manipulation">
                  See More Success Stories
                </button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-col items-center justify-center space-y-2 mt-3 md:mt-4 lg:mt-6 text-xs md:text-sm text-white/70">
                <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>14-Day Free Trial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Cancel Anytime</span>
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

export default Testimonials;
