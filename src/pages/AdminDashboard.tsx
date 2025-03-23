import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle,
  BarChart3, 
  Bell, 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  Clock, 
  Download, 
  FileText, 
  Filter, 
  HelpCircle,
  Layout, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Settings, 
  Shield, 
  User, 
  Users,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from '@/components/Header';
import SustainabilityScore from '@/components/SustainabilityScore';
import TransitionComponent from '@/components/TransitionComponent';
import { suppliers, verificationActivities, performanceSummary } from '@/utils/mockData';

const AdminDashboard = () => {
  const [searchSuppliers, setSearchSuppliers] = useState('');
  const [searchUsers, setSearchUsers] = useState('');
  const [searchReports, setSearchReports] = useState('');
  
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = [...new Set(suppliers.map(s => s.category))];
  const statuses = [...new Set(suppliers.map(s => s.verificationStatus))];
  const locations = [...new Set(suppliers.map(s => s.location))];
  
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchSuppliers.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchSuppliers.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchSuppliers.toLowerCase());
    
    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(supplier.category);
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(supplier.verificationStatus);
    
    const matchesLocation = locationFilter.length === 0 || locationFilter.includes(supplier.location);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUsers.toLowerCase()) ||
    user.role.toLowerCase().includes(searchUsers.toLowerCase())
  );
  
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchReports.toLowerCase())
  );
  
  const pendingVerifications = verificationActivities.filter(a => 
    a.status === 'in-progress' || a.status === 'scheduled'
  ).length;
  
  const pendingTasks = tasks.filter(t => t.status !== 'completed').length;
  
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-300';
      case 'medium':
        return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-300';
      case 'low':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20 dark:text-slate-300';
    }
  };
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20 dark:text-green-300';
      case 'in-progress':
        return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-300';
      case 'pending':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20 dark:text-slate-300';
    }
  };
  
  const toggleCategoryFilter = (category: string) => {
    setCategoryFilter(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
  
  const toggleLocationFilter = (location: string) => {
    setLocationFilter(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };
  
  const clearFilters = () => {
    setCategoryFilter([]);
    setStatusFilter([]);
    setLocationFilter([]);
    setSearchSuppliers('');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <TransitionComponent animation="fade-in" className="mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your supply chain verification platform</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" asChild>
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link to="/settings">
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>
              <Button className="gap-1" asChild>
                <Link to="/account">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Link>
              </Button>
            </div>
          </div>
        </TransitionComponent>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Total Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{suppliers.length}</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-500">+2</span> added this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Pending Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingVerifications}</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-amber-500">3</span> require attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Platform Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.length}</div>
              <p className="text-sm text-muted-foreground">
                Across {users.filter(u => u.role === 'Admin').length} admins and {users.filter(u => u.role === 'Verifier').length} verifiers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingTasks}</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-red-500">{tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length}</span> high priority
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="suppliers" className="mt-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="suppliers" className="mt-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search suppliers..." 
                  className="pl-10"
                  value={searchSuppliers}
                  onChange={(e) => setSearchSuppliers(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter Suppliers</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Category</p>
                      {categories.map(category => (
                        <DropdownMenuCheckboxItem
                          key={category}
                          checked={categoryFilter.includes(category)}
                          onCheckedChange={() => toggleCategoryFilter(category)}
                        >
                          {category}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </div>
                    
                    <DropdownMenuSeparator />
                    
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Status</p>
                      {statuses.map(status => (
                        <DropdownMenuCheckboxItem
                          key={status}
                          checked={statusFilter.includes(status)}
                          onCheckedChange={() => toggleStatusFilter(status)}
                        >
                          {status}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </div>
                    
                    <DropdownMenuSeparator />
                    
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Location</p>
                      {locations.map(location => (
                        <DropdownMenuCheckboxItem
                          key={location}
                          checked={locationFilter.includes(location)}
                          onCheckedChange={() => toggleLocationFilter(location)}
                        >
                          {location}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </div>
                    
                    <DropdownMenuSeparator />
                    
                    <div className="p-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full flex items-center justify-center"
                        onClick={clearFilters}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear Filters
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button className="gap-1" asChild>
                  <Link to="/add-supplier">
                    <Plus className="h-4 w-4" />
                    <span>Add Supplier</span>
                  </Link>
                </Button>
              </div>
            </div>
            
            {(categoryFilter.length > 0 || statusFilter.length > 0 || locationFilter.length > 0) && (
              <div className="flex flex-wrap gap-2 items-center py-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                
                {categoryFilter.map(cat => (
                  <Badge key={`cat-${cat}`} variant="outline" className="flex items-center gap-1">
                    {cat}
                    <button 
                      onClick={() => toggleCategoryFilter(cat)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                
                {statusFilter.map(status => (
                  <Badge key={`status-${status}`} variant="outline" className="flex items-center gap-1">
                    {status}
                    <button 
                      onClick={() => toggleStatusFilter(status)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                
                {locationFilter.map(loc => (
                  <Badge key={`loc-${loc}`} variant="outline" className="flex items-center gap-1">
                    {loc}
                    <button 
                      onClick={() => toggleLocationFilter(loc)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                
                {(categoryFilter.length > 0 || statusFilter.length > 0 || locationFilter.length > 0) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2">
                    Clear all
                  </Button>
                )}
              </div>
            )}
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">
                          <Link to={`/supplier/${supplier.id}`} className="hover:underline">
                            {supplier.name}
                          </Link>
                        </TableCell>
                        <TableCell>{supplier.category}</TableCell>
                        <TableCell>{supplier.location}</TableCell>
                        <TableCell>
                          <Badge variant={
                            supplier.verificationStatus === 'verified' ? 'default' : 
                            supplier.verificationStatus === 'pending' ? 'outline' : 'secondary'
                          }>
                            {supplier.verificationStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <SustainabilityScore score={supplier.sustainabilityScore} size="sm" />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Remove Supplier</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredSuppliers.length}</strong> of <strong>{suppliers.length}</strong> suppliers
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-10"
                  value={searchUsers}
                  onChange={(e) => setSearchUsers(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add User</span>
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0) + user.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'Admin' ? 'default' : 'outline'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Assign Tasks</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Deactivate Account</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search reports..." 
                  className="pl-10"
                  value={searchReports}
                  onChange={(e) => setSearchReports(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Create Report</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <Badge variant={report.status === 'published' ? 'default' : 'secondary'}>
                        {report.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Created on {new Date(report.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Sustainability Report</span>
                      
                      <Separator orientation="vertical" className="mx-3 h-4" />
                      
                      <User className="h-4 w-4 mr-2" />
                      <span>Alex Johnson</span>
                    </div>
                    
                    <p className="text-sm">
                      {report.status === 'published' 
                        ? 'This report contains verified sustainability metrics and compliance data for the specified period.' 
                        : 'This report is currently in draft stage and is awaiting final review before publication.'}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex justify-between items-center w-full">
                      <Button variant="outline" size="sm">Preview</Button>
                      <Button size="sm">
                        {report.status === 'published' ? 'Download' : 'Edit Draft'}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{tasks.length}</strong> tasks, <strong>{tasks.filter(t => t.status !== 'completed').length}</strong> pending
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Task</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <div className="flex items-start p-4 md:p-6">
                    <div className="mr-4 mt-1">
                      {task.status === 'completed' ? (
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                      ) : task.status === 'in-progress' ? (
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-amber-600" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3 className="text-base font-medium">{task.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityStyle(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusStyle(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-center text-sm text-muted-foreground mt-2 gap-y-2 md:gap-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          <span>Assigned to: {task.assignee}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-2 md:ml-4 flex items-center">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
