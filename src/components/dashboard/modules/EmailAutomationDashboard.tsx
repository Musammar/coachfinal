import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Send, Clock, Users, Settings, Plus, Play, Pause, Edit, Trash2, Link } from 'lucide-react';
import { EmailTemplateDialog } from './EmailTemplateDialog';
import { EmailCampaignDialog } from './EmailCampaignDialog';
import { EmailAutomationRuleDialog } from './EmailAutomationRuleDialog';
import { EmailSignInDialog } from './EmailSignInDialog';

const EmailAutomationDashboard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [showEmailSignInDialog, setShowEmailSignInDialog] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch email templates
  const { data: templates, isLoading: templatesLoading } = useQuery({
    queryKey: ['email-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch email campaigns
  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ['email-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch automation rules
  const { data: rules, isLoading: rulesLoading } = useQuery({
    queryKey: ['email-automation-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_automation_rules')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch email queue
  const { data: emailQueue, isLoading: queueLoading } = useQuery({
    queryKey: ['email-queue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_queue')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data;
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-500';
      case 'queued': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-gray-500';
      case 'draft': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const formatEngagementRate = (opened: number, total: number) => {
    if (total === 0) return '0%';
    return `${Math.round((opened / total) * 100)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Email Connection Status Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4 md:pt-6 p-4 md:p-6">
          <div className={`flex items-center justify-between ${isMobile ? 'flex-col space-y-3' : ''}`}>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className={`font-medium text-blue-900 ${isMobile ? 'text-sm' : ''}`}>Email Account Connection</h3>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-700`}>
                  {isMobile ? 'Connect email for automation' : 'Connect your email account to send automated emails'}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setShowEmailSignInDialog(true)}
              className={`bg-blue-600 hover:bg-blue-700 text-white ${isMobile ? 'text-xs px-3 py-2 w-full' : ''} touch-manipulation`}
            >
              <Link className="h-4 w-4 mr-2" />
              {isMobile ? 'Connect Email' : 'Connect Email Account'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
            <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{isMobile ? 'Templates' : 'Active Templates'}</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>
              {templates?.filter(t => t.active).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {templates?.length || 0} total templates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
            <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{isMobile ? 'Campaigns' : 'Active Campaigns'}</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>
              {campaigns?.filter(c => c.status === 'sending' || c.status === 'scheduled').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {campaigns?.length || 0} total campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
            <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{isMobile ? 'Queue' : 'Emails in Queue'}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>
              {emailQueue?.filter(e => e.status === 'queued').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {emailQueue?.length || 0} total emails
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
            <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{isMobile ? 'Rules' : 'Automation Rules'}</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>
              {rules?.filter(r => r.active).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {rules?.length || 0} total rules
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${isMobile ? 'h-auto' : ''}`}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          {!isMobile && (
            <>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">{isMobile ? 'Recent Activity' : 'Recent Email Activity'}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-2 md:space-y-3">
                {emailQueue?.slice(0, 10).map((email) => (
                  <div key={email.id} className={`flex items-center justify-between p-2 md:p-3 border rounded-lg ${isMobile ? 'flex-col space-y-2' : ''}`}>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4" />
                      <div>
                        <p className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{isMobile ? email.subject.slice(0, 30) + '...' : email.subject}</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>To: {email.to_email}</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 md:space-x-2 ${isMobile ? 'w-full justify-between' : ''}`}>
                      <Badge className={`${getStatusColor(email.status)} ${isMobile ? 'text-xs' : ''}`}>
                        {email.status}
                      </Badge>
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                        {isMobile ? new Date(email.created_at).toLocaleDateString() : new Date(email.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 md:space-y-6">
          <div className={`flex justify-between items-center ${isMobile ? 'flex-col space-y-2' : ''}`}>
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold`}>Email Templates</h3>
            <Button onClick={() => setShowTemplateDialog(true)} className={`${isMobile ? 'text-xs px-3 py-2 w-full' : ''} touch-manipulation`}>
              <Plus className="h-4 w-4 mr-2" />
              {isMobile ? 'Create Template' : 'Create Template'}
            </Button>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
            {templates?.map((template) => (
              <Card key={template.id}>
                <CardHeader className="p-3 md:p-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'}`}>{template.name}</CardTitle>
                    <Badge variant={template.active ? 'default' : 'secondary'} className={isMobile ? 'text-xs' : ''}>
                      {template.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mb-2`}>
                    {isMobile ? template.subject.slice(0, 40) + '...' : template.subject}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Type: {template.template_type}
                  </p>
                  <div className={`flex space-x-1 md:space-x-2 ${isMobile ? 'justify-center' : ''}`}>
                    <Button size="sm" variant="outline" className={`${isMobile ? 'text-xs px-2 py-1' : ''} touch-manipulation`}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className={`${isMobile ? 'text-xs px-2 py-1' : ''} touch-manipulation`}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {!isMobile && (
          <>
        <TabsContent value="campaigns" className="space-y-4 md:space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Email Campaigns</h3>
            <Button onClick={() => setShowCampaignDialog(true)} className="touch-manipulation">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="space-y-3 md:space-y-4">
            {campaigns?.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base md:text-lg">{campaign.name}</CardTitle>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-3 md:mb-4">
                    <div>
                      <p className="text-xs md:text-sm font-medium">Recipients</p>
                      <p className="text-base md:text-lg">{campaign.total_recipients}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium">Sent</p>
                      <p className="text-base md:text-lg">{campaign.sent_count}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium">Opened</p>
                      <p className="text-base md:text-lg">{campaign.opened_count}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium">Open Rate</p>
                      <p className="text-base md:text-lg">{formatEngagementRate(campaign.opened_count, campaign.sent_count)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 md:space-x-2">
                    <Button size="sm" variant="outline" className="touch-manipulation">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="touch-manipulation">
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                    <Button size="sm" variant="outline" className="touch-manipulation">
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4 md:space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Automation Rules</h3>
            <Button onClick={() => setShowRuleDialog(true)} className="touch-manipulation">
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
          </div>

          <div className="space-y-3 md:space-y-4">
            {rules?.map((rule) => (
              <Card key={rule.id}>
                <CardHeader className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base md:text-lg">{rule.name}</CardTitle>
                    <Badge variant={rule.active ? 'default' : 'secondary'}>
                      {rule.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm">
                      <span className="font-medium">Trigger:</span> {rule.trigger_type}
                    </p>
                    <p className="text-xs md:text-sm">
                      <span className="font-medium">Delay:</span> {rule.delay_minutes} minutes
                    </p>
                    <div className="flex space-x-1 md:space-x-2 mt-3 md:mt-4">
                      <Button size="sm" variant="outline" className="touch-manipulation">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="touch-manipulation">
                        {rule.active ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                        {rule.active ? 'Pause' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
          </>
        )}
      </Tabs>

      {/* Dialogs */}
      <EmailTemplateDialog 
        open={showTemplateDialog} 
        onOpenChange={setShowTemplateDialog}
      />
      <EmailCampaignDialog 
        open={showCampaignDialog} 
        onOpenChange={setShowCampaignDialog}
      />
      <EmailAutomationRuleDialog 
        open={showRuleDialog} 
        onOpenChange={setShowRuleDialog}
      />
      <EmailSignInDialog 
        open={showEmailSignInDialog} 
        onOpenChange={setShowEmailSignInDialog}
      />
    </div>
  );
};

export default EmailAutomationDashboard;