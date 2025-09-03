
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useWorkflows, useDashboardStats } from '@/hooks/useDashboardData';
import { Zap, Bot, Settings, Plus, Activity, Clock, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const AutomationDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { data: workflows, isLoading } = useWorkflows();
  const { data: stats } = useDashboardStats();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeWorkflows = workflows?.filter(w => w.status === 'active').length || 0;
  const pausedWorkflows = workflows?.filter(w => w.status === 'paused').length || 0;
  const failedWorkflows = workflows?.filter(w => w.status === 'failed').length || 0;
  const totalActions = workflows?.reduce((sum, w) => sum + (w.actions_count || 0), 0) || 0;
  const avgSuccessRate = workflows?.length ? 
    Math.round(workflows.reduce((sum, w) => sum + (w.success_rate || 0), 0) / workflows.length) : 0;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'default';
      case 'paused':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Automation Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Automation Hub</h2>
            <p className="opacity-90 text-sm md:text-base">{isMobile ? 'Manage workflows' : 'Manage your automated workflows and AI processes'}</p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
            <Button className={`bg-white text-yellow-600 hover:bg-gray-100 ${isMobile ? 'text-xs px-3 py-2' : ''} touch-manipulation`}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className={`bg-white text-yellow-600 hover:bg-gray-100 ${isMobile ? 'text-xs px-3 py-2' : ''} touch-manipulation`}>
              <Plus className="h-4 w-4 mr-2" />
              {isMobile ? 'Create' : 'Create Workflow'}
            </Button>
          </div>
        </div>
      </div>

      {/* Automation Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-yellow-600">{isMobile ? 'Active' : 'Active Workflows'}</p>
                <p className="text-xl md:text-3xl font-bold text-yellow-800">{activeWorkflows}</p>
              </div>
              <Zap className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-yellow-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-blue-600">{isMobile ? 'Actions' : 'Total Actions'}</p>
                <p className="text-xl md:text-3xl font-bold text-blue-800">{totalActions}</p>
              </div>
              <Bot className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-blue-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-green-600">{isMobile ? 'Success' : 'Success Rate'}</p>
                <p className="text-xl md:text-3xl font-bold text-green-800">{avgSuccessRate}%</p>
              </div>
              <Activity className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-green-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-purple-600">{isMobile ? 'Total' : 'Total Workflows'}</p>
                <p className="text-xl md:text-3xl font-bold text-purple-800">{workflows?.length || 0}</p>
              </div>
              <Settings className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-purple-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Performance */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="flex items-center text-base md:text-lg">
            <Activity className="h-5 w-5 mr-2" />
            Automation Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            <div>
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <span className="text-xs md:text-sm font-medium">Email Automation</span>
                <span className="text-xs md:text-sm text-muted-foreground">94%</span>
              </div>
              <Progress value={94} className={`${isMobile ? 'h-2' : 'h-3'}`} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <span className="text-xs md:text-sm font-medium">SMS Automation</span>
                <span className="text-xs md:text-sm text-muted-foreground">87%</span>
              </div>
              <Progress value={87} className={`${isMobile ? 'h-2' : 'h-3'}`} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <span className="text-xs md:text-sm font-medium">Lead Scoring</span>
                <span className="text-xs md:text-sm text-muted-foreground">99%</span>
              </div>
              <Progress value={99} className={`${isMobile ? 'h-2' : 'h-3'}`} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <span className="text-xs md:text-sm font-medium">Task Assignment</span>
                <span className="text-xs md:text-sm text-muted-foreground">{avgSuccessRate}%</span>
              </div>
              <Progress value={avgSuccessRate} className={`${isMobile ? 'h-2' : 'h-3'}`} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Workflows */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="flex items-center text-base md:text-lg">
            <Zap className="h-5 w-5 mr-2" />
            Active Workflows
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {isLoading ? (
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className={`${isMobile ? 'h-24' : 'h-32'} bg-gray-200 rounded-lg`}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
              {workflows?.slice(0, 6).map((workflow) => (
                <div key={workflow.id} className="p-3 md:p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className={`flex items-center justify-between mb-2 md:mb-3 ${isMobile ? 'flex-col space-y-1' : ''}`}>
                    <h4 className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'} ${isMobile ? 'text-center' : ''}`}>{workflow.name}</h4>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(workflow.status)}
                      <Badge variant={getStatusBadgeVariant(workflow.status)} className="text-xs">
                        {workflow.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className={`space-y-1 md:space-y-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trigger:</span>
                      <span className="font-medium">{isMobile ? workflow.trigger_type.slice(0, 10) + '...' : workflow.trigger_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actions:</span>
                      <span className="font-medium">{workflow.actions_count || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Success:</span>
                      <span className="font-medium text-green-600">{workflow.success_rate || 0}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      Last run: {workflow.last_run_at 
                        ? formatDistanceToNow(new Date(workflow.last_run_at), { addSuffix: true })
                        : 'Never'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Workflow Templates */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="flex items-center text-base md:text-lg">
            <Bot className="h-5 w-5 mr-2" />
            {isMobile ? 'Templates' : 'Quick Start Templates'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
            <div className="p-3 md:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer touch-manipulation">
              <div className="text-center">
                <Bot className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-blue-600 mx-auto mb-1 md:mb-2`} />
                <h4 className={`font-medium mb-1 ${isMobile ? 'text-sm' : ''}`}>Lead Follow-up</h4>
                <p className="text-xs text-muted-foreground">{isMobile ? 'Auto follow-up' : 'Automatically follow up with new leads'}</p>
              </div>
            </div>
            
            <div className="p-3 md:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition-colors cursor-pointer touch-manipulation">
              <div className="text-center">
                <Zap className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-green-600 mx-auto mb-1 md:mb-2`} />
                <h4 className={`font-medium mb-1 ${isMobile ? 'text-sm' : ''}`}>Booking Reminder</h4>
                <p className="text-xs text-muted-foreground">{isMobile ? 'Session reminders' : 'Send reminders for upcoming sessions'}</p>
              </div>
            </div>
            
            <div className="p-3 md:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors cursor-pointer touch-manipulation">
              <div className="text-center">
                <Activity className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-purple-600 mx-auto mb-1 md:mb-2`} />
                <h4 className={`font-medium mb-1 ${isMobile ? 'text-sm' : ''}`}>Lead Scoring</h4>
                <p className="text-xs text-muted-foreground">{isMobile ? 'Auto scoring' : 'Automatically score and categorize leads'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationDashboard;
