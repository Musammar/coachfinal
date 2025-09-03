
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import BookingsDashboard from '@/components/dashboard/modules/BookingsDashboard';
import { useAuth } from '@/hooks/useAuth';

const Bookings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Bookings & Calendar
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Manage appointments and scheduling automation
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span>Calendar Synced</span>
            </div>
          </div>
        </div>
        <BookingsDashboard />
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
