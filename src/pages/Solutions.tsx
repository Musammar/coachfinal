
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, TrendingUp, Zap, Target, Globe, Shield } from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      title: "Individual Coaches",
      icon: Users,
      description: "Perfect for solo coaches looking to automate their practice and scale their impact.",
      benefits: [
        "Automated lead generation",
        "24/7 client communication",
        "Smart booking system",
        "Personal branding tools"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Coaching Teams",
      icon: TrendingUp,
      description: "Designed for coaching teams who want to streamline operations and increase efficiency.",
      benefits: [
        "Team collaboration tools",
        "Centralized client management",
        "Performance analytics",
        "Resource sharing"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Coaching Agencies",
      icon: Globe,
      description: "Enterprise solutions for coaching agencies managing multiple coaches and clients.",
      benefits: [
        "Multi-coach management",
        "White-label solutions",
        "Advanced analytics",
        "Custom integrations"
      ],
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 px-4">
            Solutions for Every
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">
              Type of Coach
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
            Whether you're a solo coach, part of a team, or running an agency, we have the perfect AI solution for your needs.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16">
            {solutions.map((solution, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center">
                <CardContent className="p-6 md:p-8">
                  <div className={`w-16 md:w-20 h-16 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-r ${solution.color} flex items-center justify-center mx-auto mb-4 md:mb-6`}>
                    <solution.icon className="h-8 md:h-10 w-8 md:w-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">{solution.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">{solution.description}</p>
                  <ul className="space-y-1 md:space-y-2 mb-6 md:mb-8">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-slate-700 text-sm md:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full bg-gradient-to-r ${solution.color} text-white hover:scale-105 transition-all duration-300 touch-manipulation`}>
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <CardContent className="p-4 md:p-6">
                <Target className="h-10 md:h-12 w-10 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
                <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Targeted Automation</h4>
                <p className="text-slate-600 text-sm md:text-base">Customize automation flows based on your specific coaching niche and client needs.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <CardContent className="p-4 md:p-6">
                <Zap className="h-10 md:h-12 w-10 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
                <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Lightning Fast Setup</h4>
                <p className="text-slate-600 text-sm md:text-base">Get up and running in minutes with our intuitive setup process and pre-built templates.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <CardContent className="p-4 md:p-6">
                <Shield className="h-10 md:h-12 w-10 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
                <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Secure & Reliable</h4>
                <p className="text-slate-600 text-sm md:text-base">Bank-level security with 99.9% uptime guarantee to keep your coaching business running smoothly.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;
