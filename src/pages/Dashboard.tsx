
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  console.log('=== Dashboard Component Loading ===');
  console.log('User:', user?.id, 'Loading:', loading);

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Here's what's happening with your coaching business today
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              All Systems Active
            </div>
          </div>
        </div>
        <DashboardOverview />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
