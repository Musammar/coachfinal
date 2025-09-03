import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { CheckCircle, Building, Mail, Phone, MessageSquare, Target, Users, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

const BusinessOnboarding = () => {
  const [formData, setFormData] = useState({
    business_name: '',
    business_email: '',
    phone_number: '',
    whatsapp_number: '',
    business_niche: '',
    monthly_clients: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const businessNiches = [
    { value: 'health_coach', label: 'Health Coach' },
    { value: 'mental_coach', label: 'Mental Health Coach' },
    { value: 'business_coach', label: 'Business Coach' },
    { value: 'life_coach', label: 'Life Coach' },
    { value: 'fitness_coach', label: 'Fitness Coach' },
    { value: 'career_coach', label: 'Career Coach' },
    { value: 'relationship_coach', label: 'Relationship Coach' },
    { value: 'executive_coach', label: 'Executive Coach' },
    { value: 'wellness_coach', label: 'Wellness Coach' },
    { value: 'nutrition_coach', label: 'Nutrition Coach' },
    { value: 'mindset_coach', label: 'Mindset Coach' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.business_name && formData.business_email;
      case 2:
        return formData.phone_number && formData.whatsapp_number;
      case 3:
        return formData.business_niche && formData.monthly_clients;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      setError('Please fill in all required fields');
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('User not authenticated');
      return;
    }

    if (!validateStep(3)) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('business_profiles')
        .insert([{
          id: user.id,
          business_name: formData.business_name,
          business_email: formData.business_email,
          phone_number: formData.phone_number,
          whatsapp_number: formData.whatsapp_number,
          business_niche: formData.business_niche,
          monthly_clients: parseInt(formData.monthly_clients),
          onboarding_completed: true
        }]);

      if (insertError) {
        throw insertError;
      }

      // Update the main profiles table to mark onboarding as completed
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      if (updateError) {
        console.warn('Could not update profiles table:', updateError);
      }

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving your information');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h2>
              <p className="text-gray-600">Let's start with your business details</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business_name" className="text-base font-medium">
                  Business Name *
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="business_name"
                    type="text"
                    placeholder="Your Coaching Business"
                    value={formData.business_name}
                    onChange={(e) => handleInputChange('business_name', e.target.value)}
                    className="pl-10 h-12 text-base"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business_email" className="text-base font-medium">
                  Business Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="business_email"
                    type="email"
                    placeholder="business@yourcoaching.com"
                    value={formData.business_email}
                    onChange={(e) => handleInputChange('business_email', e.target.value)}
                    className="pl-10 h-12 text-base"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
              <p className="text-gray-600">How can clients reach you?</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone_number" className="text-base font-medium">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    className="pl-10 h-12 text-base"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp_number" className="text-base font-medium">
                  WhatsApp Number *
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="whatsapp_number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.whatsapp_number}
                    onChange={(e) => handleInputChange('whatsapp_number', e.target.value)}
                    className="pl-10 h-12 text-base"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  This will be used for WhatsApp automation and client communication
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Details</h2>
              <p className="text-gray-600">Tell us about your coaching practice</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business_niche" className="text-base font-medium">
                  Coaching Niche *
                </Label>
                <Select value={formData.business_niche} onValueChange={(value) => handleInputChange('business_niche', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your coaching specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessNiches.map((niche) => (
                      <SelectItem key={niche.value} value={niche.value}>
                        {niche.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="monthly_clients" className="text-base font-medium">
                  Monthly Clients *
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="monthly_clients"
                    type="number"
                    placeholder="25"
                    min="0"
                    max="1000"
                    value={formData.monthly_clients}
                    onChange={(e) => handleInputChange('monthly_clients', e.target.value)}
                    className="pl-10 h-12 text-base"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  How many clients do you typically work with per month?
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6 px-6 md:px-8">
          <div className="mb-6">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Complete Your Setup
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Help us customize CoachFlow AI for your coaching business
          </CardDescription>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
                    currentStep > step ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-500 mt-2">
            Step {currentStep} of 3
          </div>
        </CardHeader>
        
        <CardContent className="px-6 md:px-8 pb-8">
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}
            
            {renderStep()}
            
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 ? (
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={handlePrevStep}
                  className="px-6 py-3 text-base"
                >
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <Button 
                  type="button"
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 px-6 py-3 text-base"
                  disabled={!validateStep(currentStep)}
                >
                  Next Step
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 px-8 py-3 text-base"
                  disabled={loading || !validateStep(3)}
                >
                  {loading ? 'Setting up...' : 'Complete Setup'}
                  <CheckCircle className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </form>
          
          {/* Features Preview */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              What you'll get with CoachFlow AI:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">AI Voice Assistant</p>
                  <p className="text-sm text-blue-700">24/7 call handling</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-green-900">Smart Messaging</p>
                  <p className="text-sm text-green-700">WhatsApp automation</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-purple-900">CRM System</p>
                  <p className="text-sm text-purple-700">Lead management</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-orange-900">Analytics</p>
                  <p className="text-sm text-orange-700">Performance tracking</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessOnboarding;