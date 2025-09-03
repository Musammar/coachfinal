
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      description: 'Perfect for new coaches',
      icon: Star,
      features: [
        'AI Voice Agent (100 calls/month)',
        'Basic CRM (500 leads)',
        'WhatsApp & SMS Integration',
        'Calendar Integration',
        'Email Support',
        '14-day free trial'
      ],
      popular: false,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      name: 'Professional',
      price: '$299',
      description: 'For growing practices',
      icon: Zap,
      features: [
        'Everything in Starter',
        'AI Voice Agent (1000 calls/month)',
        'Advanced CRM (5000 leads)',
        'Omnichannel Chatbot',
        'AI Follow-up Sequences',
        'Priority Support',
        'Custom Integrations'
      ],
      popular: true,
      gradient: 'from-primary to-purple-600',
      bgGradient: 'from-primary/10 to-purple-50'
    },
    {
      name: 'Enterprise',
      price: '$699',
      description: 'For established businesses',
      icon: Crown,
      features: [
        'Everything in Professional',
        'Unlimited Voice Agent Calls',
        'Unlimited Leads & Contacts',
        'White-label Option',
        'Dedicated Success Manager',
        '24/7 Phone Support',
        'Custom AI Training'
      ],
      popular: false,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50'
    }
  ];

  return (
    <section id="pricing" className="relative py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-white via-slate-50/50 to-primary/5">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-5 md:top-10 left-5 md:left-10 w-24 md:w-32 h-24 md:h-32 bg-primary/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-5 md:bottom-10 right-5 md:right-10 w-32 md:w-40 h-32 md:h-40 bg-accent/5 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03)_0%,transparent_50%)]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Simple Pricing</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
            Choose Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Perfect Plan</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
            Start free, scale fast. All plans include 14-day free trial with no commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`
              relative border-2 transition-all duration-500 hover:shadow-lg rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden
              ${plan.popular 
                ? 'border-primary shadow-lg scale-105 bg-white transform' 
                : 'border-slate-200 hover:border-primary/30 hover:scale-102'
              }
            `}>
              {plan.popular && (
                <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center p-4 md:p-6 pb-3 md:pb-4">
                <div className={`w-10 md:w-12 h-10 md:h-12 mx-auto mb-3 md:mb-4 rounded-lg md:rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                  <plan.icon className="h-5 md:h-6 w-5 md:w-6 text-white" />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl font-bold">{plan.price}</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <p className="text-slate-500 text-xs md:text-sm">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="p-4 md:p-6 pt-2">
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Check className="h-4 w-4 text-primary bg-primary/10 rounded-full p-0.5" />
                      </div>
                      <span className="text-slate-700 text-xs md:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`
                    w-full py-3 md:py-2 text-sm font-semibold transition-all duration-300 rounded-xl touch-manipulation
                    ${plan.popular 
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white hover:scale-105' 
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:scale-105'
                    }
                  `}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.popular ? 'Start Free Trial' : 'Get Started'}
                </Button>
                
                {plan.popular && (
                  <p className="text-center text-xs text-slate-500 mt-1 md:mt-2">
                    No credit card required
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Compact guarantee */}
        <div className="text-center mt-6 md:mt-8">
          <div className="inline-flex items-center justify-center p-3 bg-white/80 backdrop-blur-sm border border-primary/10 rounded-xl shadow-sm mx-4">
            <div className="text-center">
              <h3 className="text-sm md:text-base font-bold mb-1">30-Day Money-Back Guarantee</h3>
              <p className="text-slate-500 text-xs md:text-sm">Try risk-free. Full refund if not satisfied.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
