
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useVoiceCalls, useDashboardStats } from '@/hooks/useDashboardData';
import { Phone, PhoneCall, Clock, Activity, Play, Settings, Mic, Volume2, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import AddBookingDialog from '../AddBookingDialog';
import { toast } from 'sonner';

const VoiceAgentDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { data: calls, isLoading } = useVoiceCalls();
  const { data: stats } = useDashboardStats();
  const [configOpen, setConfigOpen] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    model: 'professional-female',
    responseSpeed: 'fast',
    personality: 'friendly-professional'
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const completedCalls = calls?.filter(call => call.status === 'completed').length || 0;
  const failedCalls = calls?.filter(call => call.status === 'failed').length || 0;
  const inProgressCalls = calls?.filter(call => call.status === 'in_progress').length || 0;
  const averageDuration = calls?.length ? 
    Math.round(calls.reduce((sum, call) => sum + call.duration_seconds, 0) / calls.length / 60) : 0;

  const handleConfigurationSave = () => {
    toast.success('Voice agent configuration updated!');
    setConfigOpen(false);
  };

  const handleTestAgent = () => {
    toast.success('Voice agent test initiated - check your phone!');
  };

  return (
    <div className="space-y-6">
      {/* Voice Agent Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">AI Voice Agent</h2>
            <p className="opacity-90 text-sm md:text-base">{isMobile ? 'AI voice interactions' : 'Monitor and configure your AI-powered voice interactions'}</p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
            <AddBookingDialog>
              <Button className={`bg-white text-blue-600 hover:bg-gray-100 ${isMobile ? 'text-xs px-3 py-2' : ''} touch-manipulation`}>
                <Plus className="h-4 w-4 mr-2" />
                {isMobile ? 'Call' : 'Schedule Call'}
              </Button>
            </AddBookingDialog>
            <Dialog open={configOpen} onOpenChange={setConfigOpen}>
              <DialogTrigger asChild>
                <Button className={`bg-white text-blue-600 hover:bg-gray-100 ${isMobile ? 'text-xs px-3 py-2' : ''} touch-manipulation`}>
                  <Settings className="h-4 w-4 mr-2" />
                  {isMobile ? 'Config' : 'Configure Agent'}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Voice Agent Configuration</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Voice Model</Label>
                    <Select value={voiceSettings.model} onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, model: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional-female">Professional Female</SelectItem>
                        <SelectItem value="professional-male">Professional Male</SelectItem>
                        <SelectItem value="casual-female">Casual Female</SelectItem>
                        <SelectItem value="casual-male">Casual Male</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Response Speed</Label>
                    <Select value={voiceSettings.responseSpeed} onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, responseSpeed: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fast">Fast (0.8s)</SelectItem>
                        <SelectItem value="normal">Normal (1.2s)</SelectItem>
                        <SelectItem value="slow">Slow (1.8s)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>AI Personality</Label>
                    <Select value={voiceSettings.personality} onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, personality: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly-professional">Friendly & Professional</SelectItem>
                        <SelectItem value="formal-business">Formal Business</SelectItem>
                        <SelectItem value="casual-conversational">Casual Conversational</SelectItem>
                        <SelectItem value="empathetic-coach">Empathetic Coach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setConfigOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleConfigurationSave}>
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              className={`bg-white text-blue-600 hover:bg-gray-100 ${isMobile ? 'text-xs px-3 py-2' : ''} touch-manipulation`}
              onClick={handleTestAgent}
            >
              <Play className="h-4 w-4 mr-2" />
              {isMobile ? 'Test' : 'Test Agent'}
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Agent Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-blue-600">{isMobile ? 'Total' : 'Total Calls'}</p>
                <p className="text-xl md:text-3xl font-bold text-blue-800">{stats?.totalCalls || 0}</p>
              </div>
              <Phone className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-blue-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-green-600">Completed</p>
                <p className="text-xl md:text-3xl font-bold text-green-800">{completedCalls}</p>
              </div>
              <PhoneCall className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-green-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-purple-600">{isMobile ? 'Duration' : 'Avg Duration'}</p>
                <p className="text-xl md:text-3xl font-bold text-purple-800">{averageDuration}m</p>
              </div>
              <Clock className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-purple-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-emerald-600">{isMobile ? 'Success' : 'Success Rate'}</p>
                <p className="text-xl md:text-3xl font-bold text-emerald-800">
                  {calls?.length ? Math.round((completedCalls / calls.length) * 100) : 0}%
                </p>
              </div>
              <Activity className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-emerald-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voice Agent Configuration */}
      <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'lg:grid-cols-2 gap-6'}`}>
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="flex items-center text-base md:text-lg">
              <Settings className="h-5 w-5 mr-2" />
              Current Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
            <div className={`flex items-center justify-between p-3 border rounded-lg ${isMobile ? 'flex-col space-y-2' : ''}`}>
              <div className="flex items-center space-x-3">
                <Mic className="h-5 w-5 text-blue-600" />
                <div>
                  <p className={`font-medium ${isMobile ? 'text-sm' : ''}`}>Voice Model</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{voiceSettings.model.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setConfigOpen(true)} className={`${isMobile ? 'text-xs px-3 py-1' : ''} touch-manipulation`}>
                Change
              </Button>
            </div>
            
            <div className={`flex items-center justify-between p-3 border rounded-lg ${isMobile ? 'flex-col space-y-2' : ''}`}>
              <div className="flex items-center space-x-3">
                <Volume2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className={`font-medium ${isMobile ? 'text-sm' : ''}`}>Response Speed</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{voiceSettings.responseSpeed.charAt(0).toUpperCase() + voiceSettings.responseSpeed.slice(1)}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setConfigOpen(true)} className={`${isMobile ? 'text-xs px-3 py-1' : ''} touch-manipulation`}>
                Adjust
              </Button>
            </div>
            
            <div className={`flex items-center justify-between p-3 border rounded-lg ${isMobile ? 'flex-col space-y-2' : ''}`}>
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-purple-600" />
                <div>
                  <p className={`font-medium ${isMobile ? 'text-sm' : ''}`}>AI Personality</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{voiceSettings.personality.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setConfigOpen(true)} className={`${isMobile ? 'text-xs px-3 py-1' : ''} touch-manipulation`}>
                Customize
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="flex items-center text-base md:text-lg">
              <Activity className="h-5 w-5 mr-2" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4 md:space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-xs md:text-sm font-medium">{isMobile ? 'Resolution' : 'Call Resolution Rate'}</span>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {calls?.length ? Math.round((completedCalls / calls.length) * 100) : 0}%
                  </span>
                </div>
                <Progress value={calls?.length ? (completedCalls / calls.length) * 100 : 0} className={`${isMobile ? 'h-2' : 'h-3'}`} />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-xs md:text-sm font-medium">{isMobile ? 'Satisfaction' : 'Customer Satisfaction'}</span>
                  <span className="text-xs md:text-sm text-muted-foreground">94%</span>
                </div>
                <Progress value={94} className={`${isMobile ? 'h-2' : 'h-3'}`} />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-xs md:text-sm font-medium">{isMobile ? 'Accuracy' : 'Response Accuracy'}</span>
                  <span className="text-xs md:text-sm text-muted-foreground">96%</span>
                </div>
                <Progress value={96} className={`${isMobile ? 'h-2' : 'h-3'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Calls */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className={`flex items-center justify-between text-base md:text-lg ${isMobile ? 'flex-col space-y-2' : ''}`}>
            <div className="flex items-center">
              <PhoneCall className="h-5 w-5 mr-2" />
              Recent Voice Calls
            </div>
            <div className={`flex ${isMobile ? 'space-x-1' : 'space-x-2'}`}>
              <Button size="sm" variant="outline" className={`${isMobile ? 'text-xs px-2 py-1' : ''} touch-manipulation`}>
                <Play className="h-4 w-4 mr-2" />
                {isMobile ? 'Listen' : 'Listen to Samples'}
              </Button>
              <Button size="sm" variant="outline" className={`${isMobile ? 'text-xs px-2 py-1' : ''} touch-manipulation`}>
                {isMobile ? 'Export' : 'Export Transcripts'}
              </Button>
            </div>
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
          ) : calls && calls.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {calls.slice(0, 5).map((call) => (
                <div key={call.id} className={`flex items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'flex-col space-y-2' : ''}`}>
                  <div className={`flex items-center ${isMobile ? 'w-full' : 'space-x-4'} ${isMobile ? 'space-x-3' : ''}`}>
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Phone className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-blue-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
                        {isMobile ? (call.caller_phone || 'Unknown').slice(-4) : (call.caller_phone || 'Unknown Number')}
                      </h4>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                        Duration: {Math.floor(call.duration_seconds / 60)}m {call.duration_seconds % 60}s
                      </p>
                      <p className="text-xs text-muted-foreground">{call.resolution_status}</p>
                    </div>
                  </div>
                  <div className={`${isMobile ? 'w-full flex justify-between items-center' : 'text-right space-y-1'}`}>
                    <Badge variant={call.status === 'completed' ? 'default' : call.status === 'failed' ? 'destructive' : 'secondary'} className={isMobile ? 'text-xs' : ''}>
                      {call.status}
                    </Badge>
                    <div className={isMobile ? 'text-right' : ''}>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(call.created_at), { addSuffix: true })}
                    </p>
                    </div>
                    <div className={`flex space-x-1 ${isMobile ? 'justify-end' : ''}`}>
                      <Button size="sm" variant="outline" className={`${isMobile ? 'text-xs px-2 py-1' : ''} touch-manipulation`}>
                        Listen
                      </Button>
                      <Button size="sm" variant="outline" className={`${isMobile ? 'text-xs px-2 py-1' : ''} touch-manipulation`}>
                        {isMobile ? 'Text' : 'Transcript'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 md:py-8">
              <Phone className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-gray-400 mx-auto mb-3 md:mb-4`} />
              <p className="text-gray-500 mb-3 md:mb-4 text-sm md:text-base">No voice calls yet</p>
              <AddBookingDialog>
                <Button className="touch-manipulation">
                  <Plus className="h-4 w-4 mr-2" />
                  {isMobile ? 'Schedule Call' : 'Schedule Your First Call'}
                </Button>
              </AddBookingDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAgentDashboard;
