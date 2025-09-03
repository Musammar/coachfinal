import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  MessageSquare, 
  DollarSign,
  Phone,
  Mail,
  Clock,
  Target,
  Zap,
  Bot,
  ArrowRight,
  Activity,
  Eye
} from 'lucide-react';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#a4de6c'];

const data = [
  { name: 'Leads', value: 2543 },
  { name: 'Conversion', value: 94 },
  { name: 'Revenue', value: 58500 },
  { name: 'Calls', value: 342 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DashboardPreview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredPieSlice, setHoveredPieSlice] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    leads: 0,
    conversion: 0,
    revenue: 0,
    calls: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const monthlyData = [
    { month: 'Jan', leads: 120, bookings: 95, revenue: 28500 },
    { month: 'Feb', leads: 145, bookings: 118, revenue: 35400 },
    { month: 'Mar', leads: 168, bookings: 142, revenue: 42600 },
    { month: 'Apr', leads: 192, bookings: 156, revenue: 46800 },
    { month: 'May', leads: 215, bookings: 178, revenue: 53400 },
    { month: 'Jun', leads: 238, bookings: 195, revenue: 58500 }
  ];

  const revenueGrowthData = [
    { month: 'Jan', revenue: 28500, growth: 12 },
    { month: 'Feb', revenue: 35400, growth: 24 },
    { month: 'Mar', revenue: 42600, growth: 20 },
    { month: 'Apr', revenue: 46800, growth: 10 },
    { month: 'May', revenue: 53400, growth: 14 },
    { month: 'Jun', revenue: 58500, growth: 10 }
  ];

  const automationData = [
    { name: 'Lead Capture', value: 95, color: '#8b5cf6' },
    { name: 'Follow-ups', value: 88, color: '#06b6d4' },
    { name: 'Scheduling', value: 92, color: '#10b981' },
    { name: 'Reminders', value: 97, color: '#f59e0b' }
  ];

  const performanceData = [
    { name: 'Calls Answered', value: 342, color: '#8b5cf6', percentage: 96 },
    { name: 'Appointments Booked', value: 189, color: '#06b6d4', percentage: 87 },
    { name: 'Follow-ups Sent', value: 425, color: '#10b981', percentage: 92 },
    { name: 'Leads Qualified', value: 267, color: '#f59e0b', percentage: 89 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateNumbers = () => {
        const targets = { leads: 2543, conversion: 94, revenue: 58500, calls: 342 };
        const duration = 2000;
        const steps = 60;
        const increment = duration / steps;

        let current = { leads: 0, conversion: 0, revenue: 0, calls: 0 };
        const timer = setInterval(() => {
          current.leads = Math.min(current.leads + targets.leads / steps, targets.leads);
          current.conversion = Math.min(current.conversion + targets.conversion / steps, targets.conversion);
          current.revenue = Math.min(current.revenue + targets.revenue / steps, targets.revenue);
          current.calls = Math.min(current.calls + targets.calls / steps, targets.calls);
          
          setAnimatedStats({
            leads: Math.floor(current.leads),
            conversion: Math.floor(current.conversion),
            revenue: Math.floor(current.revenue),
            calls: Math.floor(current.calls)
          });

          if (current.leads >= targets.leads) {
            clearInterval(timer);
          }
        }, increment);
      };

      setTimeout(animateNumbers, 500);
    }
  }, [isVisible]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-lg border border-white/20 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          <p className="font-semibold text-slate-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={isMobile ? 'text-xs' : 'text-sm'} style={{ color: entry.color }}>
              {entry.dataKey === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-20 lg:py-32 px-4 lg:px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
      {/* Enhanced Background with better theme consistency */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-all duration-2000 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-20 left-10 w-80 h-80 bg-accent/8 rounded-full blur-3xl transition-all duration-2000 delay-500 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm text-primary px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-8">
            <Eye className="w-4 h-4" />
            <span>Live Dashboard Preview</span>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-8 text-slate-900 leading-tight px-4">
            Real-Time Business
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-12 px-4">
            Watch your coaching business thrive with comprehensive analytics, automated insights, and actionable data that drives growth.
          </p>
        </div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
          {[
            { icon: Users, label: "Active Leads", value: animatedStats.leads, color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50" },
            { icon: TrendingUp, label: "Conversion Rate", value: `${animatedStats.conversion}%`, color: "from-green-500 to-green-600", bgColor: "bg-green-50" },
            { icon: DollarSign, label: "Monthly Revenue", value: `$${animatedStats.revenue.toLocaleString()}`, color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50" },
            { icon: Phone, label: "Calls Handled", value: animatedStats.calls, color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50" }
          ].map((stat, index) => (
            <Card 
              key={index}
              className={`border-0 bg-white/80 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <CardContent className="p-3 md:p-6">
                <div className={`flex items-center justify-between mb-2 md:mb-4 ${isMobile ? 'flex-col space-y-2' : ''}`}>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} transform transition-all duration-300 ${
                    hoveredStat === index ? 'scale-110 rotate-3' : ''
                  }`}>
                    <stat.icon className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                  </div>
                  <div className={`${isMobile ? 'text-center' : 'text-right'} transition-all duration-300 ${
                    hoveredStat === index ? 'translate-x-2' : ''
                  }`}>
                    <p className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-slate-900`}>{stat.value}</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-600 font-medium`}>{stat.label}</p>
                  </div>
                </div>
                <div className={`h-1.5 md:h-2 bg-slate-200 rounded-full overflow-hidden transition-all duration-500 ${
                  hoveredStat === index ? 'bg-slate-300' : ''
                }`}>
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 delay-500`}
                    style={{ width: isVisible ? '85%' : '0%' }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          {/* Revenue Growth Chart - More Visible */}
          <Card className={`border-0 bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-700 hover:shadow-2xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center space-x-2 text-slate-900 text-base md:text-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Revenue Growth Trend</span>
              </CardTitle>
              <p className="text-xs md:text-sm text-slate-600">Monthly revenue progression with growth indicators</p>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
                <AreaChart data={revenueGrowthData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={isMobile ? 10 : 12} />
                  <YAxis stroke="#64748b" fontSize={isMobile ? 10 : 12} tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={isMobile ? 2 : 3}
                    fill="url(#revenueGradient)"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: isMobile ? 4 : 6 }}
                    activeDot={{ r: isMobile ? 6 : 8, stroke: '#10b981', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enhanced Automation Analysis */}
          <Card className={`border-0 bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-700 hover:shadow-2xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '700ms' }}>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center space-x-2 text-slate-900 text-base md:text-lg">
                <Bot className="h-5 w-5 text-purple-600" />
                <span>Automation Performance</span>
              </CardTitle>
              <p className="text-xs md:text-sm text-slate-600">AI-driven process efficiency metrics</p>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4 md:space-y-6">
                {automationData.map((item, index) => (
                  <div key={index} className="space-y-1 md:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm font-medium text-slate-700">{item.name}</span>
                      <span className="text-xs md:text-sm font-bold text-slate-900">{item.value}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={isVisible ? item.value : 0} 
                        className={`${isMobile ? 'h-2' : 'h-3'}`}
                        style={{ 
                          backgroundColor: '#e2e8f0',
                          transition: 'all 1s ease-in-out',
                          transitionDelay: `${index * 200 + 800}ms`
                        }}
                      />
                      <div 
                        className={`absolute top-0 left-0 ${isMobile ? 'h-2' : 'h-3'} rounded-full transition-all duration-1000 ease-in-out`}
                        style={{ 
                          backgroundColor: item.color,
                          width: isVisible ? `${item.value}%` : '0%',
                          transitionDelay: `${index * 200 + 800}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Performance Analytics - Interactive Pie Chart */}
        <Card className={`border-0 bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-700 hover:shadow-2xl mb-12 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="flex items-center space-x-2 text-slate-900 text-base md:text-lg">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Performance Analytics</span>
            </CardTitle>
            <p className="text-xs md:text-sm text-slate-600">Interactive breakdown of automated processes</p>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'lg:grid-cols-2 gap-8'}`}>
              <div className={isMobile ? 'order-2' : ''}>
                <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={isMobile ? 70 : 100}
                      innerRadius={isMobile ? 30 : 40}
                      paddingAngle={2}
                      dataKey="value"
                      onMouseEnter={(_, index) => setHoveredPieSlice(index)}
                      onMouseLeave={() => setHoveredPieSlice(null)}
                    >
                      {performanceData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke={hoveredPieSlice === index ? '#1e293b' : 'none'}
                          strokeWidth={hoveredPieSlice === index ? 2 : 0}
                          style={{
                            filter: hoveredPieSlice === index ? 'brightness(1.1)' : 'none',
                            transform: hoveredPieSlice === index ? 'scale(1.05)' : 'scale(1)',
                            transformOrigin: 'center',
                            transition: 'all 0.2s ease-in-out'
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className={`space-y-3 md:space-y-4 ${isMobile ? 'order-1' : ''}`}>
                {performanceData.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-3 md:p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                      hoveredPieSlice === index ? 'bg-slate-100 scale-105' : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                    onMouseEnter={() => setHoveredPieSlice(index)}
                    onMouseLeave={() => setHoveredPieSlice(null)}
                  >
                    <div className="flex items-center justify-between mb-1 md:mb-2">
                      <div className="flex items-center space-x-3">
                        <div 
                          className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded-full`}
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className={`font-medium text-slate-800 ${isMobile ? 'text-xs' : 'text-sm'}`}>{item.name}</span>
                      </div>
                      <span className={`font-bold text-slate-900 ${isMobile ? 'text-sm' : 'text-base'}`}>{item.value}</span>
                    </div>
                    <div className="text-right">
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-600`}>{item.percentage}% efficiency</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} px-4`}>
          <div className="bg-gradient-to-r from-white/60 to-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-12 hover:from-white/70 hover:to-white/90 transition-all duration-500 hover:scale-105 group border border-white/20 shadow-xl">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 md:mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-slate-700 mb-4 md:mb-8 text-sm md:text-base lg:text-lg">
              Get access to your own intelligent dashboard and start automating your success today.
            </p>
            <Button className="px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-primary to-purple-600 text-white text-sm md:text-lg rounded-full hover:scale-105 transition-all duration-300 group/btn shadow-xl w-full sm:w-auto touch-manipulation">
              View Live Dashboard
              <ArrowRight className="ml-2 h-5 w-5 inline group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;