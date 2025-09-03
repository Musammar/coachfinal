
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Phone, MessageSquare, Calendar } from 'lucide-react';

const statsData = [
  {
    title: 'Total Leads',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Calls Handled',
    value: '1,203',
    change: '+8.2%',
    trend: 'up',
    icon: Phone,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Messages Sent',
    value: '8,492',
    change: '+15.3%',
    trend: 'up',
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Bookings',
    value: '184',
    change: '-2.1%',
    trend: 'down',
    icon: Calendar,
    color: 'from-orange-500 to-red-500'
  }
];

const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
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

export default StatsCards;
