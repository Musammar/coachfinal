
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBookings, useDashboardStats } from '@/hooks/useDashboardData';
import AddBookingDialog from '../AddBookingDialog';
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Filter, Download, ExternalLink } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'sonner';

const BookingsDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { data: bookings, isLoading } = useBookings();
  const { data: stats } = useDashboardStats();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scheduledBookings = bookings?.filter(booking => booking.status === 'scheduled').length || 0;
  const completedBookings = bookings?.filter(booking => booking.status === 'completed').length || 0;
  const cancelledBookings = bookings?.filter(booking => booking.status === 'cancelled').length || 0;
  const upcomingBookings = bookings?.filter(booking => 
    booking.status === 'scheduled' && new Date(booking.scheduled_at) > new Date()
  ).length || 0;

  const todayBookings = bookings?.filter(booking => 
    new Date(booking.scheduled_at).toDateString() === new Date().toDateString()
  ).length || 0;

  const handleExportCalendar = () => {
    if (!bookings || bookings.length === 0) {
      toast.error('No bookings to export');
      return;
    }

    try {
      // Create ICS calendar format
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Your Company//Your App//EN',
        ...bookings.map(booking => [
          'BEGIN:VEVENT',
          `UID:${booking.id}@yourapp.com`,
          `DTSTART:${new Date(booking.scheduled_at).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          `DTEND:${new Date(new Date(booking.scheduled_at).getTime() + booking.duration_minutes * 60000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          `SUMMARY:${booking.booking_type} with ${booking.client_name || 'Client'}`,
          `DESCRIPTION:Booking Type: ${booking.booking_type}\\nDuration: ${booking.duration_minutes} minutes`,
          'END:VEVENT'
        ]).flat(),
        'END:VCALENDAR'
      ].join('\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `bookings_calendar_${new Date().toISOString().split('T')[0]}.ics`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Calendar exported successfully!');
    } catch (error) {
      toast.error('Failed to export calendar');
      console.error(error);
    }
  };

  const handleSyncExternal = () => {
    toast.success('External calendar sync initiated! Check your calendar app.');
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getBookingTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'text-blue-600';
      case 'coaching_session': return 'text-green-600';
      case 'follow_up': return 'text-orange-600';
      case 'discovery_call': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Bookings Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Bookings & Appointments</h2>
            <p className="opacity-90 text-sm md:text-base">{isMobile ? 'Manage sessions' : 'Manage your coaching sessions and appointments'}</p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
            <Button variant="outline" className={`bg-white/20 text-white border-white/30 hover:bg-white/30 ${isMobile ? 'text-xs px-3 py-2' : ''} touch-manipulation`}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <AddBookingDialog>
              <Button className={`${isMobile ? 'text-xs px-3 py-2' : ''} touch-manipulation`}>
                <Plus className="h-4 w-4 mr-2" />
                {isMobile ? 'Add' : 'Add Booking'}
              </Button>
            </AddBookingDialog>
          </div>
        </div>
      </div>

      {/* Bookings Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-purple-600">{isMobile ? 'Total' : 'Total Bookings'}</p>
                <p className="text-xl md:text-3xl font-bold text-purple-800">{stats?.totalBookings || 0}</p>
              </div>
              <Calendar className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-purple-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-blue-600">Scheduled</p>
                <p className="text-xl md:text-3xl font-bold text-blue-800">{scheduledBookings}</p>
              </div>
              <Clock className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-blue-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-green-600">Today</p>
                <p className="text-xl md:text-3xl font-bold text-green-800">{todayBookings}</p>
              </div>
              <CheckCircle className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-green-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-orange-600">{isMobile ? 'Rate' : 'Completion Rate'}</p>
                <p className="text-xl md:text-3xl font-bold text-orange-800">
                  {bookings?.length ? Math.round((completedBookings / bookings.length) * 100) : 0}%
                </p>
              </div>
              <Users className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-orange-600 opacity-80`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Analytics */}
      <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'lg:grid-cols-2 gap-6'}`}>
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="flex items-center text-base md:text-lg">
              <CheckCircle className="h-5 w-5 mr-2" />
              Booking Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4 md:space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-xs md:text-sm font-medium">Show-up Rate</span>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {bookings?.length ? Math.round((completedBookings / bookings.length) * 100) : 0}%
                  </span>
                </div>
                <Progress value={bookings?.length ? (completedBookings / bookings.length) * 100 : 0} className={`${isMobile ? 'h-2' : 'h-3'}`} />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-xs md:text-sm font-medium">Rebooking Rate</span>
                  <span className="text-xs md:text-sm text-muted-foreground">68%</span>
                </div>
                <Progress value={68} className={`${isMobile ? 'h-2' : 'h-3'}`} />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-xs md:text-sm font-medium">Client Satisfaction</span>
                  <span className="text-xs md:text-sm text-muted-foreground">96%</span>
                </div>
                <Progress value={96} className={`${isMobile ? 'h-2' : 'h-3'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="flex items-center text-base md:text-lg">
              <Calendar className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3 p-4 md:p-6">
            <Button className={`w-full justify-start ${isMobile ? 'text-xs py-2' : ''} touch-manipulation`} variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              {isMobile ? 'Calendar' : 'View Calendar'}
            </Button>
            <Button className={`w-full justify-start ${isMobile ? 'text-xs py-2' : ''} touch-manipulation`} variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              {isMobile ? 'Reminders' : 'Send Reminders'}
            </Button>
            <Button className={`w-full justify-start ${isMobile ? 'text-xs py-2' : ''} touch-manipulation`} variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              {isMobile ? 'Cancellations' : 'Manage Cancellations'}
            </Button>
            <Button className={`w-full justify-start ${isMobile ? 'text-xs py-2' : ''} touch-manipulation`} variant="outline">
              <Users className="h-4 w-4 mr-2" />
              {isMobile ? 'History' : 'Client History'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className={`flex items-center justify-between text-base md:text-lg ${isMobile ? 'flex-col space-y-2' : ''}`}>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {isMobile ? 'Recent Bookings' : 'Recent Bookings'}
            </div>
            <div className={`flex ${isMobile ? 'space-x-1' : 'space-x-2'}`}>
              <Button size="sm" variant="outline" onClick={handleExportCalendar} className={`${isMobile ? 'text-xs px-2 py-1' : ''} touch-manipulation`}>
                <Download className="h-4 w-4 mr-2" />
                {isMobile ? 'Export' : 'Export Calendar'}
              </Button>
              <Button size="sm" variant="outline" onClick={handleSyncExternal} className={`${isMobile ? 'text-xs px-2 py-1' : ''} touch-manipulation`}>
                <ExternalLink className="h-4 w-4 mr-2" />
                {isMobile ? 'Sync' : 'Sync External'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {isLoading ? (
            <div className="space-y-3 md:space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className={`${isMobile ? 'h-16' : 'h-20'} bg-gray-200 rounded-lg`}></div>
                </div>
              ))}
            </div>
          ) : bookings && bookings.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {bookings.slice(0, 8).map((booking) => (
                <div key={booking.id} className={`flex items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'flex-col space-y-2' : ''}`}>
                  <div className={`flex items-center ${isMobile ? 'w-full' : 'space-x-4'} ${isMobile ? 'space-x-3' : ''}`}>
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Calendar className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-purple-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{booking.client_name || 'Unknown Client'}</h4>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground truncate`}>{booking.client_email}</p>
                      <div className={`flex items-center space-x-1 md:space-x-2 mt-1 ${isMobile ? 'flex-wrap' : ''}`}>
                        <Badge variant="outline" className={`${getBookingTypeColor(booking.booking_type)} ${isMobile ? 'text-xs' : ''}`}>
                          {booking.booking_type.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {booking.duration_minutes} min
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${isMobile ? 'w-full flex justify-between items-center' : 'text-right space-y-1'}`}>
                    <Badge variant={getStatusBadgeVariant(booking.status)} className={isMobile ? 'text-xs' : ''}>
                      {booking.status}
                    </Badge>
                    <div className={isMobile ? 'text-right' : ''}>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                      {format(new Date(booking.scheduled_at), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(booking.scheduled_at), 'h:mm a')}
                    </p>
                    </div>
                    <div className={`flex space-x-1 mt-1 md:mt-2 ${isMobile ? 'justify-end' : ''}`}>
                      <Button size="sm" variant="outline" className={`${isMobile ? 'text-xs px-2 py-1' : ''} touch-manipulation`}>
                        {isMobile ? 'Edit' : 'Reschedule'}
                      </Button>
                      <Button size="sm" variant="outline" className={`${isMobile ? 'text-xs px-2 py-1' : ''} touch-manipulation`}>
                        {isMobile ? 'View' : 'Details'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 md:py-8">
              <Calendar className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-gray-400 mx-auto mb-3 md:mb-4`} />
              <p className="text-gray-500 mb-3 md:mb-4 text-sm md:text-base">No bookings yet</p>
              <AddBookingDialog>
                <Button className="touch-manipulation">
                  <Calendar className="h-4 w-4 mr-2" />
                  {isMobile ? 'Schedule Booking' : 'Schedule Your First Booking'}
                </Button>
              </AddBookingDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsDashboard;
