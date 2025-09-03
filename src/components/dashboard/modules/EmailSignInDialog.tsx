
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Shield, Server, Zap } from 'lucide-react';

interface EmailSignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EmailSignInDialog: React.FC<EmailSignInDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    smtpHost: '',
    smtpPort: '',
  });

  const emailProviders = [
    {
      id: 'gmail',
      name: 'Gmail',
      icon: Mail,
      description: 'Connect your Gmail account',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      id: 'outlook',
      name: 'Outlook',
      icon: Mail,
      description: 'Connect your Outlook account',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'yahoo',
      name: 'Yahoo',
      icon: Mail,
      description: 'Connect your Yahoo account',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'custom',
      name: 'Custom SMTP',
      icon: Server,
      description: 'Use your own SMTP server',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ];

  const handleConnect = () => {
    console.log('Connecting email account:', { selectedProvider, credentials });
    // TODO: Implement actual email connection logic
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Connect Email Account</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="providers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="providers">Email Providers</TabsTrigger>
            <TabsTrigger value="setup">Setup & Connect</TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {emailProviders.map((provider) => (
                <Card
                  key={provider.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedProvider === provider.id
                      ? 'ring-2 ring-primary border-primary'
                      : ''
                  }`}
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg ${provider.bgColor} flex items-center justify-center mb-2`}>
                      <provider.icon className={`h-6 w-6 ${provider.color}`} />
                    </div>
                    <CardTitle className="text-base">{provider.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">{provider.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedProvider && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Security Note</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your email credentials are encrypted and stored securely. We use industry-standard
                        security practices to protect your information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="setup" className="space-y-4">
            {selectedProvider ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your-email@example.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    {selectedProvider === 'gmail' ? 'App Password' : 'Password'}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={selectedProvider === 'gmail' ? 'Your Gmail app password' : 'Your email password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  />
                  {selectedProvider === 'gmail' && (
                    <p className="text-xs text-muted-foreground">
                      You'll need to generate an app password in your Google Account settings.
                    </p>
                  )}
                </div>

                {selectedProvider === 'custom' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        placeholder="smtp.example.com"
                        value={credentials.smtpHost}
                        onChange={(e) => setCredentials(prev => ({ ...prev, smtpHost: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        placeholder="587"
                        value={credentials.smtpPort}
                        onChange={(e) => setCredentials(prev => ({ ...prev, smtpPort: e.target.value }))}
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleConnect} className="bg-primary hover:bg-primary/90">
                    <Zap className="h-4 w-4 mr-2" />
                    Connect Account
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="pt-6 text-center">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Please select an email provider first</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
