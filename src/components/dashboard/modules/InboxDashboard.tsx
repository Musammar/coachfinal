
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMessages, useCreateMessage } from '@/hooks/useDashboardData';
import { MessageSquare, Mail, Send, Bot, Settings, Phone, MessageCircle, Smartphone, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const InboxDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { data: messages, isLoading, refetch } = useMessages();
  const createMessage = useCreateMessage();
  const [autoReplyOpen, setAutoReplyOpen] = useState(false);
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [messageForm, setMessageForm] = useState({
    platform: 'whatsapp',
    content: ''
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const incomingMessages = messages?.filter(msg => msg.message_type === 'incoming').length || 0;
  const outgoingMessages = messages?.filter(msg => msg.message_type === 'outgoing').length || 0;
  const automatedMessages = messages?.filter(msg => msg.is_automated).length || 0;
  const whatsappMessages = messages?.filter(msg => msg.platform === 'whatsapp').length || 0;
  const emailMessages = messages?.filter(msg => msg.platform === 'email').length || 0;
  const websiteMessages = messages?.filter(msg => msg.platform === 'website').length || 0;

  const recentIncoming = messages?.filter(msg => msg.message_type === 'incoming').slice(0, 3) || [];
  const automationRate = messages?.length ? Math.round((automatedMessages / messages.length) * 100) : 0;

  const handleSendMessage = async () => {
    if (!messageForm.content.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      await createMessage.mutateAsync({
        platform: messageForm.platform,
        message_type: 'outgoing',
        content: messageForm.content,
        response_time_seconds: 0,
        is_automated: false
      });
      
      toast.success('Message sent successfully!');
      setMessageForm({ platform: 'whatsapp', content: '' });
      setNewMessageOpen(false);
      refetch();
    } catch (error) {
      toast.error('Failed to send message');
      console.error(error);
    }
  };

  const handleAutoReplySetup = () => {
    toast.success('Auto-reply settings saved!');
    setAutoReplyOpen(false);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <MessageCircle className="h-5 w-5 text-green-600" />;
      case 'email':
        return <Mail className="h-5 w-5 text-blue-600" />;
      case 'website':
        return <MessageSquare className="h-5 w-5 text-purple-600" />;
      case 'sms':
        return <Smartphone className="h-5 w-5 text-orange-600" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Inbox Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Message Inbox</h2>
            <p className="opacity-90 text-sm md:text-base">{isMobile ? 'Manage communications' : 'Manage all your customer communications across platforms'}</p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
            <Dialog open={autoReplyOpen} onOpenChange={setAutoReplyOpen}>
              <DialogTrigger asChild>
                <Button className={`bg-white text-emerald-600 hover:bg-gray-100 ${isMobile ? 'text-xs px-3 py-2' : ''} touch-manipulation`}>
                  <Settings className="h-4 w-4 mr-2" />
                  {isMobile ? 'Auto' : 'Auto-Reply'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configure Auto-Reply</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Auto-Reply Message</Label>
                    <Textarea 
                      placeholder="Thank you for your message. We'll get back to you soon!"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setAutoReplyOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAutoReplySetup}>
                      Save Settings
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={newMessageOpen} onOpenChange={setNewMessageOpen}>
              <DialogTrigger asChild>
                <Button className={`bg-white text-emerald-600 hover:bg-gray-100 ${isMobile ? 'text-xs px-3 py-2' : ''} touch-manipulation`}>
                  <Send className="h-4 w-4 mr-2" />
                  {isMobile ? 'Send' : 'New Message'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send New Message</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <select 
                      className="w-full p-2 border rounded"
                      value={messageForm.platform}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, platform: e.target.value }))}
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="website">Website</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea 
                      placeholder="Enter your message..."
                      value={messageForm.content}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, content: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setNewMessageOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendMessage} disabled={createMessage.isPending}>
                      {createMessage.isPending ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-emerald-600">{isMobile ? 'Total' : 'Total Messages'}</p>
                <p className="text-xl md:text-3xl font-bold text-emerald-800">{messages?.length || 0}</p>
              </div>
              <MessageSquare className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-emerald-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-blue-600">Incoming</p>
                <p className="text-xl md:text-3xl font-bold text-blue-800">{incomingMessages}</p>
              </div>
              <Mail className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-blue-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-purple-600">Outgoing</p>
                <p className="text-xl md:text-3xl font-bold text-purple-800">{outgoingMessages}</p>
              </div>
              <Send className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-purple-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-orange-600">{isMobile ? 'Auto' : 'Automated'}</p>
                <p className="text-xl md:text-3xl font-bold text-orange-800">{automatedMessages}</p>
              </div>
              <Bot className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-orange-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Distribution */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="flex items-center text-base md:text-lg">
            <MessageSquare className="h-5 w-5 mr-2" />
            Message Platforms
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            <div>
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="text-xs md:text-sm font-medium">WhatsApp ({whatsappMessages})</span>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {messages?.length ? Math.round((whatsappMessages / messages.length) * 100) : 0}%
                </span>
              </div>
              <Progress value={messages?.length ? (whatsappMessages / messages.length) * 100 : 0} className={`${isMobile ? 'h-2' : 'h-3'}`} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-xs md:text-sm font-medium">Email ({emailMessages})</span>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {messages?.length ? Math.round((emailMessages / messages.length) * 100) : 0}%
                </span>
              </div>
              <Progress value={messages?.length ? (emailMessages / messages.length) * 100 : 0} className={`${isMobile ? 'h-2' : 'h-3'}`} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                  <span className="text-xs md:text-sm font-medium">Website ({websiteMessages})</span>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {messages?.length ? Math.round((websiteMessages / messages.length) * 100) : 0}%
                </span>
              </div>
              <Progress value={messages?.length ? (websiteMessages / messages.length) * 100 : 0} className={`${isMobile ? 'h-2' : 'h-3'}`} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Incoming Messages */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className={`flex items-center justify-between text-base md:text-lg ${isMobile ? 'flex-col space-y-2' : ''}`}>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              {isMobile ? 'Recent Messages' : 'Recent Incoming Messages'}
            </div>
            <Button size="sm" variant="outline" onClick={() => setNewMessageOpen(true)} className={`${isMobile ? 'text-xs px-3 py-2' : ''} touch-manipulation`}>
              <Plus className="h-4 w-4 mr-2" />
              {isMobile ? 'Send' : 'Send Message'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {isLoading ? (
            <div className="space-y-3 md:space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className={`${isMobile ? 'h-12' : 'h-16'} bg-gray-200 rounded-lg`}></div>
                </div>
              ))}
            </div>
          ) : recentIncoming.length === 0 ? (
            <div className="text-center py-6 md:py-8">
              <MessageSquare className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-muted-foreground mx-auto mb-3 md:mb-4`} />
              <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">No recent incoming messages</p>
              <Button onClick={() => setNewMessageOpen(true)} className="touch-manipulation">
                <Plus className="h-4 w-4 mr-2" />
                Send Your First Message
              </Button>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {recentIncoming.map((message) => (
                <div key={message.id} className={`flex items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'flex-col space-y-2' : ''}`}>
                  <div className={`flex items-center ${isMobile ? 'w-full' : 'space-x-4'} ${isMobile ? 'space-x-3' : ''}`}>
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                      {getPlatformIcon(message.platform)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center space-x-1 md:space-x-2 mb-1 ${isMobile ? 'flex-wrap' : ''}`}>
                        <Badge variant="outline" className={`capitalize ${isMobile ? 'text-xs' : ''}`}>{message.platform}</Badge>
                        <Badge variant="default">
                          {message.message_type}
                        </Badge>
                        {message.is_automated && (
                          <Badge variant="secondary">Auto-Reply</Badge>
                        )}
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground truncate ${isMobile ? 'max-w-full' : 'max-w-md'}`}>
                        {isMobile ? message.content.slice(0, 50) + '...' : message.content}
                      </p>
                    </div>
                  </div>
                  <div className={`${isMobile ? 'w-full text-left' : 'text-right'}`}>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true }).replace(' ago', isMobile ? '' : ' ago')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Automation Insights */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="flex items-center text-base md:text-lg">
            <Bot className="h-5 w-5 mr-2" />
            Automation Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            <div>
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <span className="text-xs md:text-sm font-medium">Automation Rate</span>
                <span className="text-xs md:text-sm font-bold text-orange-600">{automationRate}%</span>
              </div>
              <Progress value={automationRate} className={`${isMobile ? 'h-2' : 'h-3'}`} />
              <p className="text-xs text-muted-foreground mt-1 md:mt-2">
                {automatedMessages} out of {messages?.length || 0} messages handled automatically
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 bg-green-50 rounded-lg">
                <p className="text-xs md:text-sm font-medium text-green-600">{isMobile ? 'Response' : 'Avg Response Time'}</p>
                <p className="text-lg md:text-2xl font-bold text-green-800">
                  {messages?.length ? Math.round(
                    messages.filter(m => m.response_time_seconds).reduce((sum, m) => sum + (m.response_time_seconds || 0), 0) 
                    / messages.filter(m => m.response_time_seconds).length / 60
                  ) : 0}m
                </p>
              </div>
              
              <div className="p-3 md:p-4 bg-blue-50 rounded-lg">
                <p className="text-xs md:text-sm font-medium text-blue-600">{isMobile ? 'Platforms' : 'Active Platforms'}</p>
                <p className="text-lg md:text-2xl font-bold text-blue-800">
                  {[...new Set(messages?.map(m => m.platform))].length || 0}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InboxDashboard;
