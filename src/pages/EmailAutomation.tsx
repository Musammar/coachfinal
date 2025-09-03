
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EmailAutomationDashboard from '@/components/dashboard/modules/EmailAutomationDashboard';

const EmailAutomation: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Automation</h1>
          <p className="text-gray-600 mt-2">
            Manage your email templates, campaigns, and automation rules
          </p>
        </div>
        <EmailAutomationDashboard />
      </div>
    </DashboardLayout>
  );
};

export default EmailAutomation;
