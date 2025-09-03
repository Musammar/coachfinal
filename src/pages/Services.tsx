
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Database, Bot, MessageSquare, Calendar } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "AI Lead Generation",
      icon: Database,
      description: "Transform your lead generation with intelligent automation that captures, qualifies, and nurtures prospects automatically.",
      features: [
        "Smart lead capture from all channels",
        "Automated qualification and scoring",
        "Personalized nurturing sequences",
        "Conversion rate optimization",
        "Lead behavior tracking",
        "ROI analytics and reporting"
      ],
      pricing: "Starting at $99/month"
    },
    {
      title: "AI Voice Assistant",
      icon: Bot,
      description: "24/7 AI receptionist that handles calls, qualifies leads, and books appointments with natural conversation.",
      features: [
        "Natural conversation handling",
        "Automatic appointment booking",
        "Lead qualification calls",
        "Multi-language support",
        "Call recording and transcription",
        "Performance analytics"
      ],
      pricing: "Starting at $149/month"
    },
    {
      title: "Smart Messaging Hub",
      icon: MessageSquare,
      description: "Unified messaging platform that manages WhatsApp, SMS, and email communications automatically.",
      features: [
        "WhatsApp Business automation",
        "Smart SMS campaigns",
        "Email sequence automation",
        "Unified inbox management",
        "Message scheduling",
        "Response rate analytics"
      ],
      pricing: "Starting at $79/month"
    },
    {
      title: "Automated Booking System",
      icon: Calendar,
      description: "Intelligent scheduling system with automatic reminders and smart reschedule handling.",
      features: [
        "Smart calendar integration",
        "Automated reminder system",
        "Intelligent reschedule flows",
        "Time zone optimization",
        "No-show reduction",
        "Booking analytics"
      ],
      pricing: "Starting at $59/month"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 px-4">
            Our AI-Powered
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">
              Coaching Services
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive automation solutions designed specifically for modern coaches who want to scale their practice.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-4">
                    <div className="w-10 md:w-14 h-10 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                      <service.icon className="h-5 md:h-7 w-5 md:w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold text-slate-900">{service.title}</h3>
                      <p className="text-primary font-semibold text-sm md:text-base">{service.pricing}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-8">
                  <p className="text-slate-600 leading-relaxed mb-4 md:mb-6 text-sm md:text-base lg:text-lg">
                    {service.description}
                  </p>
                  <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white hover:scale-105 transition-all duration-300 touch-manipulation">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
