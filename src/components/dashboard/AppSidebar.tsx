
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  BarChart3,
  Phone,
  Zap,
  Mail
} from 'lucide-react';
import Logo from '@/components/Logo';

interface AppSidebarProps {
  onLogoClick: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ onLogoClick }) => {
  const navigationItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'CRM',
      url: '/crm',
      icon: Users,
    },
    {
      title: 'Email Automation',
      url: '/email-automation',
      icon: Mail,
    },
    {
      title: 'Inbox',
      url: '/inbox',
      icon: MessageSquare,
    },
    {
      title: 'Bookings',
      url: '/bookings',
      icon: Calendar,
    },
    {
      title: 'Voice Agent',
      url: '/voice-agent',
      icon: Phone,
    },
    {
      title: 'Automation',
      url: '/automation',
      icon: Zap,
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: BarChart3,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={onLogoClick}>
          <Logo />
          <span className="font-bold text-xl">CoachFlow</span>
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
