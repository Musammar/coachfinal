
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, Calendar, User, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'call',
    icon: Phone,
    title: 'Voice agent handled lead inquiry',
    description: 'Sarah Johnson called about life coaching packages',
    time: '5 minutes ago',
    status: 'completed',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    id: 2,
    type: 'message',
    icon: MessageSquare,
    title: 'New WhatsApp lead captured',
    description: 'Mike Chen interested in business coaching',
    time: '12 minutes ago',
    status: 'new',
    color: 'text-green-600 bg-green-100'
  },
  {
    id: 3,
    type: 'booking',
    icon: Calendar,
    title: 'Consultation booked',
    description: 'Emma Wilson scheduled for tomorrow 2PM',
    time: '23 minutes ago',
    status: 'scheduled',
    color: 'text-purple-600 bg-purple-100'
  },
  {
    id: 4,
    type: 'lead',
    icon: User,
    title: 'Hot lead converted',
    description: 'James Rodriguez completed onboarding flow',
    time: '1 hour ago',
    status: 'converted',
    color: 'text-orange-600 bg-orange-100'
  },
  {
    id: 5,
    type: 'automation',
    icon: Clock,
    title: 'Follow-up sequence triggered',
    description: 'Day 3 email sent to 12 prospects',
    time: '2 hours ago',
    status: 'automated',
    color: 'text-indigo-600 bg-indigo-100'
  }
];

const RecentActivity: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
                <activity.icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground">{activity.title}</p>
                  <Badge variant="secondary" className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
