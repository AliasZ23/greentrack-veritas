
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  PieChart, 
  Users, 
  FileCheck, 
  Shield, 
  Bell, 
  Settings, 
  User, 
  Briefcase,
  Filter,
  ArrowUpDown,
  FileText,
  Download,
  AlertTriangle
} from 'lucide-react';
import Header from '@/components/Header';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/ThemeToggle';
import TransitionComponent from '@/components/TransitionComponent';

// Mock data for admin dashboard
const users = [
  { id: 1, name: 'Alex Johnson', role: 'Admin', email: 'alex@example.com', lastActive: '2023-10-15T14:30:00' },
  { id: 2, name: 'Maria Garcia', role: 'Verifier', email: 'maria@example.com', lastActive: '2023-10-15T09:45:00' },
  { id: 3, name: 'Sam Taylor', role: 'Verifier', email: 'sam@example.com', lastActive: '2023-10-14T16:20:00' },
  { id: 4, name: 'Lin Wei', role: 'Manager', email: 'lin@example.com', lastActive: '2023-10-13T11:10:00' },
  { id: 5, name: 'John Smith', role: 'Verifier', email: 'john@example.com', lastActive: '2023-10-12T15:30:00' },
];

const recentActivities = [
  { id: 1, user: 'Maria Garcia', action: 'Approved verification request', time: '2 hours ago', target: 'EcoFabrics Inc.' },
  { id: 2, user: 'System', action: 'Scheduled automatic audit', time: '5 hours ago', target: 'Green Logistics Ltd.' },
  { id: 3, user: 'Alex Johnson', action: 'Updated system settings', time: '1 day ago', target: 'Verification thresholds' },
  { id: 4, user: 'Sam Taylor', action: 'Rejected verification request', time: '1 day ago', target: 'Bio Plastics Ltd.' },
  { id: 5, user: 'Lin Wei', action: 'Generated monthly report', time: '2 days ago', target: 'September Verifications' },
];

const pendingTasks = [
  { id: 1, task: 'Review verification standards update', deadline: '2023-10-20', priority: 'high' },
  { id: 2, task: 'Approve new verifier accounts', deadline: '2023-10-18', priority: 'medium' },
  { id: 3, task: 'Finalize quarterly sustainability report', deadline: '2023-10-31', priority: 'high' },
  { id: 4, task: 'Schedule training for new verification protocol', deadline: '2023-11-05', priority: 'medium' },
  { id: 5, task: 'Update data retention policy', deadline: '2023-11-10', priority: 'low' },
];

const systemAlerts = [
  { id: 1, message: 'System maintenance scheduled for October 20', type: 'info' },
  { id: 2, message: '3 verification requests pending for more than 7 days', type: 'warning' },
  { id: 3, message: 'New sustainable certification standard available', type: 'update' },
  { id: 4, message: 'Database backup completed successfully', type: 'success' },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.role.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="bg-background flex w-full min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">SupplyVerify</span>
              </div>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={true}>
                      <Link to="/admin">
                        <BarChart3 />
                        <span>Overview</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/">
                        <PieChart />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/verification">
                        <FileCheck />
                        <span>Verifications</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/">
                        <Briefcase />
                        <span>Suppliers</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/">
                        <Users />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <button>
                        <Settings />
                        <span>Settings</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <button>
                        <Bell />
                        <span>Notifications</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Alex Johnson</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        
        <SidebarInset>
          <Header hideNav />
          <div className="container px-4 pt-20 pb-16">
            <TransitionComponent animation="fade" className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                  <p className="text-muted-foreground">Manage verification processes and system settings</p>
                </div>
                <div className="mt-4 md:mt-0 space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>System Settings</DialogTitle>
                        <DialogDescription>
                          Configure system settings and preferences.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Verification Settings</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-xs" htmlFor="threshold">Review Threshold (days)</label>
                              <Input id="threshold" defaultValue="7" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs" htmlFor="approvers">Min. Approvers</label>
                              <Input id="approvers" defaultValue="2" />
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Notification Preferences</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="email-notif" className="rounded border-gray-300" defaultChecked />
                              <label htmlFor="email-notif" className="text-xs">Email Notifications</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="system-notif" className="rounded border-gray-300" defaultChecked />
                              <label htmlFor="system-notif" className="text-xs">System Alerts</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger asChild>
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Generate System Report</DrawerTitle>
                        <DrawerDescription>
                          Create a custom report for your verification processes.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Report Type</label>
                          <select className="w-full rounded-md border border-input p-2">
                            <option>Verification Summary</option>
                            <option>User Activity</option>
                            <option>Supplier Compliance</option>
                            <option>System Performance</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Date Range</label>
                          <div className="flex space-x-2">
                            <Input type="date" placeholder="Start Date" />
                            <Input type="date" placeholder="End Date" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Include Sections</label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="summary" className="rounded border-gray-300" defaultChecked />
                              <label htmlFor="summary" className="text-sm">Executive Summary</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="charts" className="rounded border-gray-300" defaultChecked />
                              <label htmlFor="charts" className="text-sm">Charts & Graphs</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="details" className="rounded border-gray-300" defaultChecked />
                              <label htmlFor="details" className="text-sm">Detailed Records</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="recommendations" className="rounded border-gray-300" defaultChecked />
                              <label htmlFor="recommendations" className="text-sm">Recommendations</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DrawerFooter>
                        <Button>
                          <Download className="mr-2 h-4 w-4" />
                          Generate Report
                        </Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
            </TransitionComponent>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <TransitionComponent animation="fade-up" delay={100}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
                    <FileCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,284</div>
                    <p className="text-xs text-muted-foreground">
                      +12.5% from last month
                    </p>
                  </CardContent>
                </Card>
              </TransitionComponent>
              
              <TransitionComponent animation="fade-up" delay={150}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-xs text-muted-foreground">
                      +4.3% from last month
                    </p>
                  </CardContent>
                </Card>
              </TransitionComponent>
              
              <TransitionComponent animation="fade-up" delay={200}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">System Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">38</div>
                    <p className="text-xs text-muted-foreground">
                      +2 new users this month
                    </p>
                  </CardContent>
                </Card>
              </TransitionComponent>
              
              <TransitionComponent animation="fade-up" delay={250}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      3 require immediate attention
                    </p>
                  </CardContent>
                </Card>
              </TransitionComponent>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
              <TransitionComponent animation="fade-up" delay={300} className="lg:col-span-4">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>System Users</CardTitle>
                    <CardDescription>
                      Manage user accounts and permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
                      <Input 
                        placeholder="Search users..." 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[300px]">
                              <Button variant="ghost" className="p-0 font-medium flex items-center">
                                Name
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </Button>
                            </TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map(user => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">
                                <div>
                                  <div>{user.name}</div>
                                  <div className="text-xs text-muted-foreground">{user.email}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={user.role === 'Admin' ? 'destructive' : user.role === 'Manager' ? 'default' : 'outline'}>
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {new Date(user.lastActive).toLocaleDateString()} at {new Date(user.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <span className="sr-only">Open menu</span>
                                      <Settings className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>View profile</DropdownMenuItem>
                                    <DropdownMenuItem>Edit permissions</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <Button variant="outline" size="sm">Previous</Button>
                    <div className="text-sm text-muted-foreground">Page 1 of 1</div>
                    <Button variant="outline" size="sm">Next</Button>
                  </CardFooter>
                </Card>
              </TransitionComponent>
              
              <TransitionComponent animation="fade-up" delay={350} className="lg:col-span-3">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest actions in the system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {recentActivities.map(activity => (
                        <div key={activity.id} className="flex">
                          <div className="relative mr-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <span className="absolute top-0 right-0 flex h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {activity.user}
                              <span className="text-xs text-muted-foreground ml-2">
                                {activity.time}
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {activity.action} - <strong>{activity.target}</strong>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">View All Activity</Button>
                  </CardFooter>
                </Card>
              </TransitionComponent>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <TransitionComponent animation="fade-up" delay={400}>
                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>
                      Important notifications requiring attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemAlerts.map(alert => (
                        <div 
                          key={alert.id} 
                          className={`p-4 rounded-lg border ${
                            alert.type === 'warning' 
                              ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800' 
                              : alert.type === 'info' 
                                ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800'
                                : alert.type === 'success'
                                  ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800'
                                  : 'bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`rounded-full p-1 mr-3 ${
                              alert.type === 'warning' 
                                ? 'bg-amber-100 dark:bg-amber-900'
                                : alert.type === 'info'
                                  ? 'bg-blue-100 dark:bg-blue-900'
                                  : alert.type === 'success'
                                    ? 'bg-green-100 dark:bg-green-900'
                                    : 'bg-purple-100 dark:bg-purple-900'
                            }`}>
                              {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                              {alert.type === 'info' && <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                              {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />}
                              {alert.type === 'update' && <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${
                                alert.type === 'warning' 
                                  ? 'text-amber-800 dark:text-amber-300'
                                  : alert.type === 'info'
                                    ? 'text-blue-800 dark:text-blue-300'
                                    : alert.type === 'success'
                                      ? 'text-green-800 dark:text-green-300'
                                      : 'text-purple-800 dark:text-purple-300'
                              }`}>
                                {alert.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TransitionComponent>
              
              <TransitionComponent animation="fade-up" delay={450}>
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Tasks</CardTitle>
                    <CardDescription>
                      Tasks requiring action
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingTasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className={`rounded-full h-2 w-2 mt-2 ${
                              task.priority === 'high' 
                                ? 'bg-red-500' 
                                : task.priority === 'medium' 
                                  ? 'bg-amber-500' 
                                  : 'bg-blue-500'
                            }`} />
                            <div>
                              <p className="text-sm font-medium">{task.task}</p>
                              <p className="text-xs text-muted-foreground">Due: {new Date(task.deadline).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Start</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">View All Tasks</Button>
                  </CardFooter>
                </Card>
              </TransitionComponent>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
