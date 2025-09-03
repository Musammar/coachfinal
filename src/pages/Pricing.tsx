
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, Star, ArrowRight, Zap, Crown, Rocket, Users, Phone, MessageSquare, Calendar, BarChart3, Shield, Globe, Headphones } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const plans = [
    {
      name: 'Starter',
      icon: Rocket,
      description: 'Perfect for new coaches getting started',
      monthlyPrice: 49,
      yearlyPrice: 39,
      features: [
        { name: 'AI Voice Agent (100 calls/month)', included: true },
        { name: 'WhatsApp & SMS Integration', included: true },
        { name: 'Basic CRM (500 contacts)', included: true },
        { name: 'Appointment Booking', included: true },
        { name: '3 Automation Workflows', included: true },
        { name: 'Email Support', included: true },
        { name: 'Mobile App Access', included: true },
        { name: 'Advanced Analytics', included: false },
        { name: 'Multi-language Support', included: false },
        { name: 'Priority Support', included: false }
      ],
      popular: false,
      cta: 'Start Free Trial',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional',
      icon: Crown,
      description: 'For growing coaches ready to scale',
      monthlyPrice: 99,
      yearlyPrice: 79,
      features: [
        { name: 'AI Voice Agent (500 calls/month)', included: true },
        { name: 'All Messaging Channels', included: true },
        { name: 'Advanced CRM (5,000 contacts)', included: true },
        { name: 'Smart Booking System', included: true },
        { name: 'Unlimited Automation Workflows', included: true },
        { name: 'Advanced Analytics & Reports', included: true },
        { name: 'Multi-language Support', included: true },
        { name: 'Priority Email Support', included: true },
        { name: 'Team Collaboration (3 users)', included: true },
        { name: 'Custom Branding', included: false }
      ],
      popular: true,
      cta: 'Most Popular',
      gradient: 'from-primary to-purple-600'
    },
    {
      name: 'Enterprise',
      icon: Zap,
      description: 'For established coaches and agencies',
      monthlyPrice: 199,
      yearlyPrice: 159,
      features: [
        { name: 'AI Voice Agent (Unlimited calls)', included: true },
        { name: 'All Features Included', included: true },
        { name: 'Unlimited CRM Contacts', included: true },
        { name: 'White-label Solution', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'Dedicated Account Manager', included: true },
        { name: 'Phone & Priority Support', included: true },
        { name: 'Team Collaboration (Unlimited)', included: true },
        { name: 'Custom Branding', included: true },
        { name: 'SLA Guarantee', included: true }
      ],
      popular: false,
      cta: 'Contact Sales',
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  const features = [
    { icon: Phone, name: 'AI Voice Assistant', description: '24/7 intelligent call handling' },
    { icon: MessageSquare, name: 'Omnichannel Messaging', description: 'WhatsApp, SMS, Email, Chat' },
    { icon: Users, name: 'Smart CRM', description: 'Lead scoring and management' },
    { icon: Calendar, name: 'Booking Automation', description: 'Smart scheduling system' },
    { icon: BarChart3, name: 'Analytics Dashboard', description: 'Real-time insights' },
    { icon: Shield, name: 'Enterprise Security', description: 'Bank-level protection' }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate any billing differences.'
    },
    {
      question: 'What happens during the free trial?',
      answer: 'You get full access to all Professional plan features for 14 days. No credit card required to start, and you can cancel anytime.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your payment in full, no questions asked.'
    },
    {
      question: 'Is there setup or training included?',
      answer: 'Yes! All plans include free setup assistance and comprehensive training materials. Enterprise plans get dedicated onboarding support.'
    },
    {
      question: 'Can I integrate with my existing tools?',
      answer: 'Absolutely! We integrate with 50+ popular tools including Calendly, Zoom, Stripe, and all major CRM systems.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer email support for all plans, priority support for Professional users, and dedicated phone support for Enterprise customers.'
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
              Simple, Transparent Pricing
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 text-white leading-tight px-4">
              Plans That Grow
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">
                With Your Success
              </span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 mb-8 md:mb-12 leading-relaxed px-4">
              Start free, scale fast. Choose the perfect plan for your coaching practice and upgrade as you grow.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-6 md:mb-8">
              <span className={`text-sm md:text-lg ${!isYearly ? 'text-white' : 'text-white/60'}`}>Monthly</span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className={`${isMobile ? 'scale-110' : 'scale-125'}`}
              />
              <span className={`text-sm md:text-lg ${isYearly ? 'text-white' : 'text-white/60'}`}>
                Yearly
                <Badge className="ml-1 md:ml-2 bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                  Save 20%
                </Badge>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-20 px-4 md:px-6 -mt-5 md:-mt-10 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative hover:scale-105 transition-all duration-300 ${plan.popular ? 'ring-2 ring-primary shadow-2xl scale-105' : 'shadow-xl'} bg-white/90 backdrop-blur-sm`}>
                {plan.popular && (
                  <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 md:px-6 py-1 md:py-2 text-xs md:text-sm">
                      <Crown className="w-4 h-4 mr-2" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2 p-4 md:p-6">
                  <div className={`w-12 md:w-16 h-12 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                    <plan.icon className="w-6 md:w-8 h-6 md:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg md:text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm md:text-base">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-2 p-4 md:p-6">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      <span className="text-sm md:text-lg text-muted-foreground font-normal">/month</span>
                    </div>
                    {isYearly && (
                      <p className="text-xs md:text-sm text-green-600">
                        Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    className={`w-full mb-6 md:mb-8 ${plan.popular ? 'bg-gradient-to-r from-primary to-purple-600 text-white' : ''} ${isMobile ? 'text-sm py-3' : ''} touch-manipulation`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <div className="space-y-2 md:space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className={`w-5 h-5 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className={`text-xs md:text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-slate-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground px-4">Everything You Need to Succeed</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              All plans include our core features designed to automate and scale your coaching practice.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-4 md:p-6 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-10 md:w-12 h-10 md:h-12 mx-auto mb-3 md:mb-4 bg-gradient-to-r from-primary to-accent rounded-lg md:rounded-xl flex items-center justify-center">
                    <feature.icon className="w-5 md:w-6 h-5 md:h-6 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">{feature.name}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground px-4">Frequently Asked Questions</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              Everything you need to know about our pricing and plans.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-4 md:p-6 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">Still have questions?</p>
            <Button variant="outline" className="hover:scale-105 transition-all duration-300 touch-manipulation">
              <Headphones className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-4">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
              Join thousands of coaches who've automated their business and increased revenue by 300%.
            </p>
            <div className="flex flex-col gap-4 md:gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 text-white hover:scale-105 transition-all duration-300 text-base md:text-lg px-8 md:px-10 py-4 md:py-6 rounded-full w-full sm:w-auto touch-manipulation">
                Start Free 14-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base md:text-lg px-8 md:px-10 py-4 md:py-6 rounded-full border-2 border-primary/20 hover:bg-primary/5 w-full sm:w-auto touch-manipulation">
                Schedule Demo Call
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No Credit Card Required</span>
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
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
