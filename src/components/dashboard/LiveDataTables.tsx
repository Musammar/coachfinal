
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLeads, useVoiceCalls, useMessages, useBookings } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

const LiveDataTables: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { data: leads, isLoading: leadsLoading } = useLeads();
  const { data: calls, isLoading: callsLoading } = useVoiceCalls();
  const { data: messages, isLoading: messagesLoading } = useMessages();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'scheduled':
        return 'default';
      case 'contacted':
      case 'completed':
        return 'secondary';
      case 'qualified':
      case 'resolved':
        return 'default';
      case 'converted':
        return 'default';
      case 'hot':
        return 'destructive';
      case 'warm':
        return 'secondary';
      case 'cold':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const TableSkeleton = () => (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-base md:text-lg">Live Data Tables</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${isMobile ? 'h-auto' : ''}`}>
            <TabsTrigger value="leads" className={isMobile ? 'text-xs p-2' : ''}>
              {isMobile ? `Leads (${leads?.length || 0})` : `Leads (${leads?.length || 0})`}
            </TabsTrigger>
            <TabsTrigger value="calls" className={isMobile ? 'text-xs p-2' : ''}>
              {isMobile ? `Calls (${calls?.length || 0})` : `Voice Calls (${calls?.length || 0})`}
            </TabsTrigger>
            {!isMobile && (
              <>
            <TabsTrigger value="messages">Messages ({messages?.length || 0})</TabsTrigger>
            <TabsTrigger value="bookings">Bookings ({bookings?.length || 0})</TabsTrigger>
              </>
            )}
          </TabsList>
          
          <TabsContent value="leads" className="mt-4 md:mt-6">
            {leadsLoading ? (
              <TableSkeleton />
            ) : (
              <div className={isMobile ? 'overflow-x-auto' : ''}>
              <Table className={isMobile ? 'mobile-table-compact' : ''}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    {!isMobile && <TableHead>Source</TableHead>}
                    <TableHead>Status</TableHead>
                    {!isMobile && <TableHead>Temperature</TableHead>}
                    {!isMobile && <TableHead>Created</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={isMobile ? 2 : 5} className="text-center text-muted-foreground text-sm">
                        No leads data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads?.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className={`font-medium ${isMobile ? 'text-xs' : ''}`}>
                          <div>
                            <div>{lead.name}</div>
                            {isMobile && <div className="text-xs text-muted-foreground">{lead.email}</div>}
                          </div>
                        </TableCell>
                        {!isMobile && (
                        <TableCell>
                          <Badge variant="outline">{lead.source}</Badge>
                        </TableCell>
                        )}
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant={getStatusBadgeVariant(lead.status)} className={isMobile ? 'text-xs' : ''}>
                              {lead.status}
                            </Badge>
                            {isMobile && (
                              <Badge variant={getStatusBadgeVariant(lead.temperature)} className="text-xs block">
                                {lead.temperature}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        {!isMobile && (
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(lead.temperature)}>{lead.temperature}</Badge>
                        </TableCell>
                        )}
                        {!isMobile && (
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                        </TableCell>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calls" className="mt-4 md:mt-6">
            {callsLoading ? (
              <TableSkeleton />
            ) : (
              <div className={isMobile ? 'overflow-x-auto' : ''}>
              <Table className={isMobile ? 'mobile-table-compact' : ''}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phone</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    {!isMobile && <TableHead>Resolution</TableHead>}
                    {!isMobile && <TableHead>Created</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calls?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={isMobile ? 3 : 5} className="text-center text-muted-foreground text-sm">
                        No voice calls data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    calls?.map((call) => (
                      <TableRow key={call.id}>
                        <TableCell className={`font-medium ${isMobile ? 'text-xs' : ''}`}>
                          {isMobile ? (call.caller_phone || 'Unknown').slice(-4) : (call.caller_phone || 'Unknown')}
                        </TableCell>
                        <TableCell className={isMobile ? 'text-xs' : ''}>
                          {Math.floor(call.duration_seconds / 60)}m {isMobile ? '' : `${call.duration_seconds % 60}s`}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant={getStatusBadgeVariant(call.status)} className={isMobile ? 'text-xs' : ''}>
                              {call.status}
                            </Badge>
                            {isMobile && (
                              <Badge variant={getStatusBadgeVariant(call.resolution_status)} className="text-xs block">
                                {call.resolution_status}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        {!isMobile && (
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(call.resolution_status)}>{call.resolution_status}</Badge>
                        </TableCell>
                        )}
                        {!isMobile && (
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(call.created_at), { addSuffix: true })}
                        </TableCell>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="messages" className="mt-4 md:mt-6">
            {messagesLoading ? (
              <TableSkeleton />
            ) : (
              <div className="overflow-x-auto">
              <Table className="mobile-table-compact">
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Auto</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground text-sm">
                        No messages data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    messages?.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{message.platform}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={message.message_type === 'incoming' ? 'default' : 'secondary'} className="text-xs">
                            {message.message_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-xs">{message.content.slice(0, 30)}...</TableCell>
                        <TableCell>
                          <Badge variant={message.is_automated ? 'default' : 'outline'} className="text-xs">
                            {message.is_automated ? 'Auto' : 'Manual'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true }).replace(' ago', '')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="mt-4 md:mt-6">
            {bookingsLoading ? (
              <TableSkeleton />
            ) : (
              <div className="overflow-x-auto">
              <Table className="mobile-table-compact">
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Scheduled</TableHead>
                    {!isMobile && <TableHead>Duration</TableHead>}
                    <TableHead>Status</TableHead>
                    {!isMobile && <TableHead>Created</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={isMobile ? 3 : 5} className="text-center text-muted-foreground text-sm">
                        No bookings data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookings?.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{booking.booking_type.replace('_', ' ')}</Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          <div>
                            <div>{new Date(booking.scheduled_at).toLocaleDateString()}</div>
                            <div className="text-muted-foreground">
                              {new Date(booking.scheduled_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                            </div>
                            {isMobile && <div className="text-muted-foreground">{booking.duration_minutes}m</div>}
                          </div>
                        </TableCell>
                        {!isMobile && <TableCell>{booking.duration_minutes}m</TableCell>}
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(booking.status)} className="text-xs">{booking.status}</Badge>
                        </TableCell>
                        {!isMobile && (
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(booking.created_at), { addSuffix: true })}
                        </TableCell>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LiveDataTables;
