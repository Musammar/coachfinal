
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLeads, useDashboardStats } from '@/hooks/useDashboardData';
import AddLeadDialog from '../AddLeadDialog';
import { Users, UserPlus, TrendingUp, Target, Plus, Mail, Phone, ExternalLink, Download } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const CRMDashboard = () => {
  const { data: leads, isLoading } = useLeads();
  const { data: stats } = useDashboardStats();

  const hotLeads = leads?.filter(lead => lead.temperature === 'hot').length || 0;
  const warmLeads = leads?.filter(lead => lead.temperature === 'warm').length || 0;
  const coldLeads = leads?.filter(lead => lead.temperature === 'cold').length || 0;
  const convertedLeads = leads?.filter(lead => lead.status === 'converted').length || 0;

  const handleExportLeads = () => {
    if (!leads || leads.length === 0) {
      toast.error('No leads to export');
      return;
    }

    try {
      const csvContent = [
        ['Name', 'Email', 'Phone', 'Source', 'Status', 'Temperature', 'Created At'].join(','),
        ...leads.map(lead => [
          lead.name,
          lead.email,
          lead.phone || '',
          lead.source,
          lead.status,
          lead.temperature,
          new Date(lead.created_at).toLocaleDateString()
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Leads exported successfully!');
    } catch (error) {
      toast.error('Failed to export leads');
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* CRM Header */}
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg md:rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Customer Relationship Management</h2>
            <p className="opacity-90 text-sm md:text-base">Track and nurture your leads through the sales funnel</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <AddLeadDialog>
              <Button className="bg-white text-primary hover:bg-gray-100 text-xs md:text-sm px-3 md:px-4 py-2 touch-manipulation">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Lead</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </AddLeadDialog>
            <Button 
              className="bg-white text-primary hover:bg-gray-100 text-xs md:text-sm px-3 md:px-4 py-2 touch-manipulation"
              onClick={handleExportLeads}
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export All</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* CRM Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-blue-600">Total Leads</p>
                <p className="text-xl md:text-3xl font-bold text-blue-800">{stats?.totalLeads || 0}</p>
              </div>
              <Users className="h-8 md:h-12 w-8 md:w-12 text-blue-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-green-600">Hot Leads</p>
                <p className="text-xl md:text-3xl font-bold text-green-800">{hotLeads}</p>
              </div>
              <Target className="h-8 md:h-12 w-8 md:w-12 text-green-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-orange-600">Converted</p>
                <p className="text-xl md:text-3xl font-bold text-orange-800">{convertedLeads}</p>
              </div>
              <TrendingUp className="h-8 md:h-12 w-8 md:w-12 text-orange-600 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-purple-600">Conversion Rate</p>
                <p className="text-xl md:text-3xl font-bold text-purple-800">{stats?.conversionRate || 0}%</p>
              </div>
              <UserPlus className="h-8 md:h-12 w-8 md:w-12 text-purple-600 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Temperature Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center text-base md:text-lg">
              <Target className="h-5 w-5 mr-2" />
              Hot Leads ({hotLeads})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">Ready to convert leads</p>
            <div className="space-y-2 md:space-y-3">
              {leads?.filter(lead => lead.temperature === 'hot').slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-2 md:p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-medium text-xs md:text-sm">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </div>
              )) || (
                <p className="text-xs md:text-sm text-muted-foreground">No hot leads yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600 flex items-center text-base md:text-lg">
              <Users className="h-5 w-5 mr-2" />
              Warm Leads ({warmLeads})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">Engaged prospects</p>
            <div className="space-y-2 md:space-y-3">
              {leads?.filter(lead => lead.temperature === 'warm').slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-2 md:p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="font-medium text-xs md:text-sm">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </div>
              )) || (
                <p className="text-xs md:text-sm text-muted-foreground">No warm leads yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 flex items-center text-base md:text-lg">
              <UserPlus className="h-5 w-5 mr-2" />
              Cold Leads ({coldLeads})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">New prospects</p>
            <div className="space-y-2 md:space-y-3">
              {leads?.filter(lead => lead.temperature === 'cold').slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-2 md:p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-medium text-xs md:text-sm">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </div>
              )) || (
                <p className="text-xs md:text-sm text-muted-foreground">No cold leads yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg md:text-xl">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Recent Leads
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <AddLeadDialog>
                <Button size="sm" className="text-xs md:text-sm touch-manipulation">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Add Lead</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </AddLeadDialog>
              <Button size="sm" variant="outline" onClick={handleExportLeads} className="text-xs md:text-sm touch-manipulation">
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Export All</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {isLoading ? (
            <div className="space-y-3 md:space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 md:h-16 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : leads && leads.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {leads.slice(0, 10).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                    <div className="w-8 md:w-10 h-8 md:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm md:text-base truncate">{lead.name}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground truncate">{lead.email}</p>
                      <p className="text-xs text-muted-foreground">Source: {lead.source}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1 flex-shrink-0">
                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                      <Badge variant={lead.temperature === 'hot' ? 'destructive' : lead.temperature === 'warm' ? 'default' : 'secondary'}>
                        {lead.temperature}
                      </Badge>
                      <Badge variant="outline">
                        {lead.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground hidden md:block">
                      {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                    </p>
                    <div className="flex space-x-1 mt-2">
                      <Button size="sm" variant="outline" className="p-1 touch-manipulation">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="p-1 touch-manipulation">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-10 md:h-12 w-10 md:w-12 text-gray-400 mx-auto mb-3 md:mb-4" />
              <p className="text-gray-500 mb-3 md:mb-4 text-sm md:text-base">No leads yet</p>
              <AddLeadDialog>
                <Button className="text-sm touch-manipulation">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Lead
                </Button>
              </AddLeadDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMDashboard;
