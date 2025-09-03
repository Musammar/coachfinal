import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, Zap, BarChart3, MessageSquare, Phone } from 'lucide-react';

const quickActions = [
  {
    title: 'Create New Workflow',
    description: 'Build automation flows',
    icon: Zap,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    title: 'View Analytics',
    description: 'Check performance stats',
    icon: BarChart3,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  {
    title: 'Manage Inbox',
    description: 'Handle messages & DMs',
    icon: MessageSquare,
    color: 'bg-gradient-to-r from-emerald-500 to-teal-500'
  },
  {
    title: 'Voice Agent Settings',
    description: 'Configure AI assistant',
    icon: Phone,
    color: 'bg-gradient-to-r from-orange-500 to-red-500'
  }
];

const upcomingTasks = [
  {
    title: 'Call with Sarah Johnson',
    time: '2:00 PM',
    type: 'consultation'
  },
  {
    title: 'Review automation performance',
    time: '4:30 PM',
    type: 'task'
  },
  {
    title: 'Team sync meeting',
    time: '6:00 PM',
    type: 'meeting'
  }
];

const QuickActions: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-lg transition-all duration-200"
              >
                <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.type}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {task.time}
                </Badge>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add New Task
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
