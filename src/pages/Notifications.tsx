
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Bell, Check, Clock, Filter, Trash2, Users } from 'lucide-react';
import Header from '@/components/Header';

// Mock notification data
const notificationsData = [
  {
    id: '1',
    type: 'verification',
    title: 'Verification Request',
    message: 'EcoHarvest Solutions has submitted new documents for verification.',
    timestamp: '2023-11-28T10:23:00Z',
    read: false,
    user: {
      name: 'Sarah Williams',
      avatar: '/placeholder.svg',
    },
  },
  {
    id: '2',
    type: 'task',
    title: 'Task Assignment',
    message: 'You have been assigned to review GreenTech Manufacturing\'s sustainability report.',
    timestamp: '2023-11-27T15:42:00Z',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'System Update',
    message: 'The platform will be undergoing maintenance on December 5th from 2-4 AM UTC.',
    timestamp: '2023-11-27T09:15:00Z',
    read: true,
  },
  {
    id: '4',
    type: 'verification',
    title: 'Verification Completed',
    message: 'Organic Textiles Ltd verification process has been completed successfully.',
    timestamp: '2023-11-26T17:30:00Z',
    read: true,
    user: {
      name: 'Michael Chen',
      avatar: '/placeholder.svg',
    },
  },
  {
    id: '5',
    type: 'supplier',
    title: 'New Supplier Added',
    message: 'Sustainable Packaging Co. has been added to the platform.',
    timestamp: '2023-11-25T11:20:00Z',
    read: true,
  },
  {
    id: '6',
    type: 'report',
    title: 'Report Published',
    message: 'Q3 Sustainability Report has been published and is available for viewing.',
    timestamp: '2023-11-24T14:05:00Z',
    read: true,
  },
];

const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeTab, setActiveTab] = useState('all');
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared.",
    });
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `Today at ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'verification':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'task':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'system':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'supplier':
        return <Users className="h-5 w-5 text-purple-500" />;
      case 'report':
        return <Filter className="h-5 w-5 text-indigo-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'No new notifications'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Mark all as read
            </Button>
            <Button variant="outline" onClick={clearAllNotifications} disabled={notifications.length === 0}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear all
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="px-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center">
                <CardTitle>Your Notifications</CardTitle>
                <TabsList>
                  <TabsTrigger value="all">
                    All
                    {notifications.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {notifications.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="verification">Verification</TabsTrigger>
                  <TabsTrigger value="task">Tasks</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <TabsContent value={activeTab} className="mt-0">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 md:p-6 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-muted/30' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-4">
                        <div className="mt-1">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <h3 className="font-medium text-base">
                                {notification.title}
                                {!notification.read && (
                                  <Badge variant="default" className="ml-2">New</Badge>
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                          
                          {notification.user && (
                            <div className="flex items-center mt-3">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                                <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{notification.user.name}</span>
                            </div>
                          )}
                          
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="ghost">View Details</Button>
                            {!notification.read && (
                              <Button size="sm" variant="outline" onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}>
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    {activeTab === 'all'
                      ? "You don't have any notifications at the moment."
                      : `You don't have any ${activeTab === 'unread' ? 'unread' : activeTab} notifications.`}
                  </p>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Notifications;
