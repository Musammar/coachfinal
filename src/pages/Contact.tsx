import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Headphones, Users, CheckCircle, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: 'general'
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@coachflow.ai',
      description: 'Get in touch for any questions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'San Francisco, CA',
      description: 'Schedule an in-person meeting'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '< 2 hours',
      description: 'Average response time'
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant help from our team',
      available: '24/7',
      badge: 'Fastest'
    },
    {
      icon: Headphones,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      available: 'Business Hours',
      badge: 'Personal'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Detailed help via email',
      available: '< 2 hours response',
      badge: 'Detailed'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other coaches',
      available: 'Always Active',
      badge: 'Collaborative'
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
              We're Here to Help
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 text-white leading-tight px-4">
              Get in Touch
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">
                With Our Team
              </span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 mb-8 md:mb-12 leading-relaxed px-4">
              Have questions about CoachFlow? Want to schedule a demo? Our team of experts is ready to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 md:py-20 px-4 md:px-6 -mt-5 md:-mt-10 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-4 md:p-6 hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-xl">
                <CardContent className="p-0">
                  <div className="w-10 md:w-12 h-10 md:h-12 mx-auto mb-3 md:mb-4 bg-gradient-to-r from-primary to-accent rounded-lg md:rounded-xl flex items-center justify-center">
                    <info.icon className="w-5 md:w-6 h-5 md:h-6 text-white" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-foreground">{info.title}</h3>
                  <p className="text-primary font-semibold mb-1 text-sm md:text-base">{info.details}</p>
                  <p className="text-muted-foreground text-xs md:text-sm">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">Send us a Message</h2>
              <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
                Fill out the form below and we'll get back to you within 2 hours during business hours.
              </p>
              
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Contact Form</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm md:text-base font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="h-12 text-base"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm md:text-base font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm md:text-base font-medium text-foreground mb-2">
                        Company/Practice Name
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your Coaching Practice"
                        className="h-12 text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm md:text-base font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-12 text-base"
                        required
                      >
                        <option value="general">General Inquiry</option>
                        <option value="demo">Schedule Demo</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm md:text-base font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your coaching practice and how we can help..."
                        rows={5}
                        className="text-base"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-purple-600 text-white hover:scale-105 transition-all duration-300 h-12 text-base touch-manipulation"
                      size="lg"
                    >
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Support Options */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground mt-8 lg:mt-0">Other Ways to Reach Us</h2>
              <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
                Choose the support channel that works best for you.
              </p>
              
              <div className="space-y-4 md:space-y-6">
                {supportOptions.map((option, index) => (
                  <Card key={index} className="hover:scale-105 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-r from-primary to-accent rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                          <option.icon className="w-5 md:w-6 h-5 md:h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1 md:mb-2">
                            <h3 className="text-base md:text-lg font-bold text-foreground">{option.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {option.badge}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-1 md:mb-2 text-sm md:text-base">{option.description}</p>
                          <p className="text-xs md:text-sm text-primary font-semibold">{option.available}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Quick Stats */}
              <Card className="mt-6 md:mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-foreground">Why Coaches Love Our Support</h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-primary mb-1">{"4.9/5"}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Support Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-primary mb-1">{"< 2hrs"}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-primary mb-1">{"24/7"}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Chat Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-primary mb-1">{"98%"}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Resolution Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-slate-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground">Quick Answers</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              Common questions answered instantly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="p-4 md:p-6">
              <CardContent className="p-0">
                <h3 className="font-bold mb-2 text-foreground text-sm md:text-base">How quickly can I get started?</h3>
                <p className="text-muted-foreground text-xs md:text-sm">Most coaches are up and running within 24 hours of signing up.</p>
              </CardContent>
            </Card>
            <Card className="p-4 md:p-6">
              <CardContent className="p-0">
                <h3 className="font-bold mb-2 text-foreground text-sm md:text-base">Do you offer training?</h3>
                <p className="text-muted-foreground text-xs md:text-sm">Yes! Free onboarding and comprehensive training materials included.</p>
              </CardContent>
            </Card>
            <Card className="p-4 md:p-6">
              <CardContent className="p-0">
                <h3 className="font-bold mb-2 text-foreground text-sm md:text-base">Can I cancel anytime?</h3>
                <p className="text-muted-foreground text-xs md:text-sm">Absolutely. No contracts, cancel with just one click.</p>
              </CardContent>
            </Card>
            <Card className="p-4 md:p-6">
              <CardContent className="p-0">
                <h3 className="font-bold mb-2 text-foreground text-sm md:text-base">Is my data secure?</h3>
                <p className="text-muted-foreground text-xs md:text-sm">Bank-level security with SOC 2 compliance and 99.9% uptime.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
