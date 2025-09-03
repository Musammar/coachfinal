
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Target, Heart, TrendingUp, Globe, CheckCircle, ArrowRight, Star, Zap, Shield, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Coaches', color: 'text-blue-500' },
    { icon: TrendingUp, value: '300%', label: 'Average Growth', color: 'text-green-500' },
    { icon: Globe, value: '50+', label: 'Countries', color: 'text-purple-500' },
    { icon: Zap, value: '99.9%', label: 'Uptime', color: 'text-yellow-500' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Coach-Centric Design',
      description: 'Every feature is built with coaches in mind, understanding your unique challenges and workflows.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Enterprise-grade security protecting your client data with bank-level encryption.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on measurable outcomes that directly impact your business growth and success.'
    },
    {
      icon: Clock,
      title: 'Always Innovating',
      description: 'Continuous improvement and cutting-edge AI technology to keep you ahead of the curve.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      background: 'Former Life Coach, 15+ years experience',
      image: '/placeholder.svg'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      background: 'AI/ML Expert, Ex-Google Engineer',
      image: '/placeholder.svg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      background: 'UX Design Leader, Coach Experience Specialist',
      image: '/placeholder.svg'
    },
    {
      name: 'David Kim',
      role: 'Head of Customer Success',
      background: 'Business Coach, Growth Strategy Expert',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 md:top-20 left-10 md:left-20 w-48 md:w-96 h-48 md:h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-40 md:w-80 h-40 md:h-80 bg-accent/20 rounded-full blur-3xl animate-float animation-delay-1000"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge className="mb-4 md:mb-6 bg-primary/20 text-primary border-primary/30 text-xs md:text-sm">
              <Star className="w-4 h-4 mr-2" />
              Built by Coaches, for Coaches
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 text-white leading-tight px-4">
              Empowering Coaches
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 mb-8 md:mb-12 leading-relaxed px-4">
              We're on a mission to help every coach build a thriving, automated practice that scales beyond their wildest dreams. Our story began with a simple question: "What if coaches could focus 100% on coaching?"
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 -mt-5 md:-mt-10 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-4 md:p-6 hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-xl">
                <CardContent className="p-0">
                  <stat.icon className={`w-6 md:w-8 h-6 md:h-8 mx-auto mb-2 md:mb-4 ${stat.color}`} />
                  <div className="text-xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-xs md:text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 md:space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  CoachFlow was born from the frustration of our founder, Sarah Johnson, who spent more time managing her coaching business than actually coaching. After 15 years as a successful life coach, she realized that the industry needed a fundamental shift.
                </p>
                <p>
                  "I became a coach to transform lives, not to spend my days on administrative tasks, chasing leads, or managing calendars," Sarah recalls. "There had to be a better way."
                </p>
                <p>
                  That's when she teamed up with AI expert Michael Chen to create the first truly intelligent coaching automation platform. Today, CoachFlow serves over 10,000 coaches worldwide, helping them reclaim their time and scale their impact.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl"></div>
              <Card className="relative bg-white/90 backdrop-blur-sm shadow-2xl mt-8 lg:mt-0">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                    <Award className="w-6 md:w-8 h-6 md:h-8 text-primary" />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">Our Mission</h3>
                      <p className="text-muted-foreground text-sm md:text-base">What drives us every day</p>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    "To eliminate the barriers between coaches and their potential, creating a world where every coach can focus purely on transforming lives while AI handles everything else."
                  </p>
                  <div className="mt-4 md:mt-6 flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="w-6 md:w-8 h-6 md:h-8 bg-gradient-to-r from-primary to-accent rounded-full border-2 border-white"></div>
                      ))}
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground">— The CoachFlow Team</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-slate-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground">Our Values</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              The principles that guide everything we do and every feature we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 md:p-8 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-r from-primary to-accent rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-5 md:w-6 h-5 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground">Meet Our Team</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              A diverse group of coaches, engineers, and growth experts united by one mission.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-4 md:p-6 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center">
                    <Users className="w-6 md:w-8 h-6 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-foreground">{member.name}</h3>
                  <p className="text-primary font-semibold mb-1 md:mb-2 text-sm md:text-base">{member.role}</p>
                  <p className="text-muted-foreground text-xs md:text-sm">{member.background}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Join Our Mission
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
              Ready to become part of the coaching revolution? Let's transform your practice together.
            </p>
            <div className="flex flex-col gap-4 md:gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 text-white hover:scale-105 transition-all duration-300 text-base md:text-lg px-8 md:px-10 py-4 md:py-6 rounded-full touch-manipulation">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base md:text-lg px-8 md:px-10 py-4 md:py-6 rounded-full border-2 border-primary/20 hover:bg-primary/5 touch-manipulation">
                Contact Our Team
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
