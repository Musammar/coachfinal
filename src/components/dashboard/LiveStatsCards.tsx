
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Phone, MessageSquare, Users, Calendar, Zap, Target, Activity } from 'lucide-react';
import { useDashboardStats } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';

const LiveStatsCards: React.FC = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <Skeleton className="h-12 w-12 rounded-xl mb-4" />
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        Error loading dashboard statistics. Please try again.
      </div>
    );
  }

  const statsData = [
    {
      title: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      change: '+12.5%'
    },
    {
      title: 'Voice Calls',
      value: stats?.totalCalls || 0,
      icon: Phone,
      color: 'from-purple-500 to-pink-500',
      change: '+8.2%'
    },
    {
      title: 'Messages',
      value: stats?.totalMessages || 0,
      icon: MessageSquare,
      color: 'from-emerald-500 to-teal-500',
      change: '+15.3%'
    },
    {
      title: 'Bookings',
      value: stats?.totalBookings || 0,
      icon: Calendar,
      color: 'from-orange-500 to-red-500',
      change: '+5.1%'
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      change: '+2.3%'
    },
    {
      title: 'Avg Call Duration',
      value: `${Math.floor((stats?.avgCallDuration || 0) / 60)}m`,
      icon: Activity,
      color: 'from-indigo-500 to-purple-500',
      change: '+1.2%'
    },
    {
      title: 'Response Rate',
      value: `${stats?.responseRate || 0}%`,
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-500',
      change: '+3.1%'
    },
    {
      title: 'Active Workflows',
      value: stats?.activeWorkflows || 0,
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      change: '+0.5%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">{stat.change}</span>
              </div>
            </div>
            
            <div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LiveStatsCards;
