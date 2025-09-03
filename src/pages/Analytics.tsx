
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useDashboardStats, useLeads, useBookings, useVoiceCalls, useMessages } from '@/hooks/useDashboardData';
import { BarChart3, TrendingUp, Users, Calendar, Phone, MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';

const Analytics = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: stats } = useDashboardStats();
  const { data: leads } = useLeads();
  const { data: bookings } = useBookings();
  const { data: calls } = useVoiceCalls();
  const { data: messages } = useMessages();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  const analyticsData = [
    {
      title: 'Lead Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Booking Success Rate',
      value: `${bookings?.length ? Math.round((bookings.filter(b => b.status === 'completed').length / bookings.length) * 100) : 0}%`,
      change: '+8%',
      trend: 'up',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Call Resolution Rate',
      value: `${calls?.length ? Math.round((calls.filter(c => c.status === 'completed').length / calls.length) * 100) : 0}%`,
      change: '+5%',
      trend: 'up',
      icon: Phone,
      color: 'text-purple-600'
    },
    {
      title: 'Message Response Rate',
      value: `${stats?.responseRate || 0}%`,
      change: '+15%',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-orange-600'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Track your business performance and growth metrics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              Export Report
            </Button>
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Real-time Data</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-3xl font-bold mt-2">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? (
                        <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change} from last month
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${metric.color}`}>
                    <metric.icon className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Lead Generation</span>
                    <span className="text-sm text-muted-foreground">{stats?.totalLeads || 0} leads</span>
                  </div>
                  <Progress value={Math.min((stats?.totalLeads || 0) * 10, 100)} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Booking Conversion</span>
                    <span className="text-sm text-muted-foreground">{stats?.totalBookings || 0} bookings</span>
                  </div>
                  <Progress value={Math.min((stats?.totalBookings || 0) * 20, 100)} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Voice Engagement</span>
                    <span className="text-sm text-muted-foreground">{stats?.totalCalls || 0} calls</span>
                  </div>
                  <Progress value={Math.min((stats?.totalCalls || 0) * 15, 100)} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Message Activity</span>
                    <span className="text-sm text-muted-foreground">{stats?.totalMessages || 0} messages</span>
                  </div>
                  <Progress value={Math.min((stats?.totalMessages || 0) * 5, 100)} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Business Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Peak Activity Hours</h4>
                  <p className="text-sm text-blue-600 mt-1">Most engagement between 2-4 PM</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Top Lead Source</h4>
                  <p className="text-sm text-green-600 mt-1">
                    {leads?.length > 0 ? 
                      leads.reduce((acc, lead) => {
                        acc[lead.source] = (acc[lead.source] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>) &&
                      Object.entries(
                        leads.reduce((acc, lead) => {
                          acc[lead.source] = (acc[lead.source] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Website'
                      : 'Website'
                    }
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Automation Impact</h4>
                  <p className="text-sm text-purple-600 mt-1">
                    {messages?.filter(m => m.is_automated).length || 0} automated responses sent
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats?.totalLeads || 0}</div>
                <div className="text-sm text-muted-foreground">Total Leads Generated</div>
                <div className="text-xs text-green-600 mt-1">
                  {leads?.filter(l => l.temperature === 'hot').length || 0} hot leads
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats?.totalBookings || 0}</div>
                <div className="text-sm text-muted-foreground">Total Bookings</div>
                <div className="text-xs text-blue-600 mt-1">
                  {bookings?.filter(b => b.status === 'scheduled').length || 0} upcoming
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats?.activeWorkflows || 0}</div>
                <div className="text-sm text-muted-foreground">Active Workflows</div>
                <div className="text-xs text-orange-600 mt-1">
                  {Math.round((stats?.responseRate || 0))}% efficiency
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
