
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Settings, MessageSquare, Mail, Instagram, Phone, Zap } from 'lucide-react';

const IntegrationsDialog = () => {
  const [open, setOpen] = useState(false);
  const [integrations, setIntegrations] = useState({
    whatsapp: { connected: false, webhook: '' },
    email: { connected: false, apiKey: '' },
    instagram: { connected: false, accessToken: '' },
    voiceAgent: { connected: false, provider: '' }
  });

  const handleConnect = (type: string, value: string) => {
    if (!value.trim()) {
      toast.error('Please enter the required information');
      return;
    }

    setIntegrations(prev => ({
      ...prev,
      [type]: { ...prev[type as keyof typeof prev], connected: true }
    }));
    
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} connected successfully!`);
  };

  const integrationItems = [
    {
      key: 'whatsapp',
      title: 'WhatsApp Business',
      description: 'Connect your WhatsApp Business API',
      icon: MessageSquare,
      color: 'text-green-600',
      placeholder: 'Enter WhatsApp webhook URL'
    },
    {
      key: 'email',
      title: 'Email Marketing',
      description: 'Connect your email service provider',
      icon: Mail,
      color: 'text-blue-600',
      placeholder: 'Enter API key'
    },
    {
      key: 'instagram',
      title: 'Instagram',
      description: 'Connect Instagram for DMs and comments',
      icon: Instagram,
      color: 'text-pink-600',
      placeholder: 'Enter access token'
    },
    {
      key: 'voiceAgent',
      title: 'Voice Agent',
      description: 'Configure AI voice assistant',
      icon: Phone,
      color: 'text-purple-600',
      placeholder: 'Enter provider configuration'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Integrations
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Platform Integrations
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrationItems.map((item) => {
            const IconComponent = item.icon;
            const integration = integrations[item.key as keyof typeof integrations];
            
            return (
              <Card key={item.key}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IconComponent className={`h-5 w-5 mr-2 ${item.color}`} />
                      {item.title}
                    </div>
                    <Badge variant={integration.connected ? 'default' : 'secondary'}>
                      {integration.connected ? 'Connected' : 'Not Connected'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="space-y-2">
                    <Label htmlFor={item.key}>Configuration</Label>
                    <div className="flex space-x-2">
                      <Input
                        id={item.key}
                        placeholder={item.placeholder}
                        type={item.key === 'email' ? 'password' : 'text'}
                      />
                      <Button 
                        onClick={() => {
                          const input = document.getElementById(item.key) as HTMLInputElement;
                          handleConnect(item.key, input.value);
                        }}
                        size="sm"
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium mb-2">Integration Benefits:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Automate lead capture from multiple channels</li>
            <li>• Sync conversations across platforms</li>
            <li>• Enable AI-powered responses</li>
            <li>• Track performance metrics</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationsDialog;
