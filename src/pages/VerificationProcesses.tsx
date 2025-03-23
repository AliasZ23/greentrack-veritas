
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarRange,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Shield,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import TransitionComponent from '@/components/TransitionComponent';
import { verificationActivities, suppliers } from '@/utils/mockData';

const statusColors = {
  'completed': 'text-green-500 bg-green-100 dark:bg-green-900/40 dark:text-green-300',
  'in-progress': 'text-amber-500 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-300',
  'scheduled': 'text-blue-500 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300',
};

const VerificationProcesses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredActivities = verificationActivities.filter(activity => {
    const matchesSearch = 
      activity.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.activity.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const activityCounts = {
    completed: verificationActivities.filter(a => a.status === 'completed').length,
    inProgress: verificationActivities.filter(a => a.status === 'in-progress').length,
    scheduled: verificationActivities.filter(a => a.status === 'scheduled').length,
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <TransitionComponent animation="fade-in" className="mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Verification Processes</h1>
              <p className="text-muted-foreground">Track and manage all verification activities across your supply chain</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="gap-1">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                <span>New Verification</span>
              </Button>
            </div>
          </div>
        </TransitionComponent>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activityCounts.completed}</div>
              <p className="text-sm text-muted-foreground">Verifications finalized</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2 text-amber-500" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activityCounts.inProgress}</div>
              <p className="text-sm text-muted-foreground">Active verifications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <CalendarRange className="h-4 w-4 mr-2 text-blue-500" />
                Scheduled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activityCounts.scheduled}</div>
              <p className="text-sm text-muted-foreground">Upcoming verifications</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search verifications..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Type</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Status</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="all">All Verifications</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => {
                  const supplier = suppliers.find(s => s.name === activity.supplier);
                  
                  return (
                    <Card key={activity.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{activity.activity}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Supplier: {activity.supplier}
                              </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[activity.status]}`}>
                              {activity.status}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center text-sm text-muted-foreground">
                            <CalendarRange className="h-4 w-4 mr-2" />
                            <span>{activity.date}</span>
                            
                            <Separator orientation="vertical" className="mx-3 h-4" />
                            
                            {activity.type === 'audit' && <Shield className="h-4 w-4 mr-2" />}
                            {activity.type === 'certification' && <FileText className="h-4 w-4 mr-2" />}
                            {activity.type === 'report' && <FileText className="h-4 w-4 mr-2" />}
                            {activity.type === 'update' && <RefreshCw className="h-4 w-4 mr-2" />}
                            <span className="capitalize">{activity.type}</span>
                            
                            {supplier && (
                              <>
                                <Separator orientation="vertical" className="mx-3 h-4" />
                                <div className="flex items-center">
                                  <span>Score: </span>
                                  <span className="font-medium ml-1">{supplier.sustainabilityScore}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="bg-muted p-4 md:p-6 md:w-52 flex md:flex-col md:items-start items-center justify-between">
                          <div className="md:mb-4">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Assigned to</p>
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <span className="text-xs font-medium text-primary">AJ</span>
                              </div>
                              <span className="text-sm font-medium">Alex Johnson</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/supplier/${supplier?.id || '1'}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Card className="p-8 text-center">
                  <div className="flex flex-col items-center">
                    <XCircle className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No matching verifications</h3>
                    <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                    <Button variant="outline" onClick={() => {
                      setSearchTerm('');
                      setFilterType('all');
                      setFilterStatus('all');
                    }}>
                      Reset Filters
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              {verificationActivities
                .filter(a => a.status === 'in-progress')
                .map((activity) => {
                  const supplier = suppliers.find(s => s.name === activity.supplier);
                  
                  return (
                    <Card key={activity.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{activity.activity}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Supplier: {activity.supplier}
                              </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[activity.status]}`}>
                              {activity.status}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center text-sm text-muted-foreground">
                            <CalendarRange className="h-4 w-4 mr-2" />
                            <span>{activity.date}</span>
                            
                            <Separator orientation="vertical" className="mx-3 h-4" />
                            
                            {activity.type === 'audit' && <Shield className="h-4 w-4 mr-2" />}
                            {activity.type === 'certification' && <FileText className="h-4 w-4 mr-2" />}
                            {activity.type === 'report' && <FileText className="h-4 w-4 mr-2" />}
                            {activity.type === 'update' && <RefreshCw className="h-4 w-4 mr-2" />}
                            <span className="capitalize">{activity.type}</span>
                          </div>
                        </div>
                        <div className="bg-muted p-4 md:p-6 md:w-52 flex md:flex-col md:items-start items-center justify-between">
                          <div className="md:mb-4">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Assigned to</p>
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <span className="text-xs font-medium text-primary">AJ</span>
                              </div>
                              <span className="text-sm font-medium">Alex Johnson</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/supplier/${supplier?.id || '1'}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <div className="space-y-4">
              {verificationActivities
                .filter(a => a.status === 'completed')
                .slice(0, 3)
                .map((activity) => {
                  const supplier = suppliers.find(s => s.name === activity.supplier);
                  
                  return (
                    <Card key={activity.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{activity.activity}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Supplier: {activity.supplier}
                              </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[activity.status]}`}>
                              {activity.status}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center text-sm text-muted-foreground">
                            <CalendarRange className="h-4 w-4 mr-2" />
                            <span>{activity.date}</span>
                            
                            <Separator orientation="vertical" className="mx-3 h-4" />
                            
                            {activity.type === 'audit' && <Shield className="h-4 w-4 mr-2" />}
                            {activity.type === 'certification' && <FileText className="h-4 w-4 mr-2" />}
                            {activity.type === 'report' && <FileText className="h-4 w-4 mr-2" />}
                            {activity.type === 'update' && <RefreshCw className="h-4 w-4 mr-2" />}
                            <span className="capitalize">{activity.type}</span>
                          </div>
                        </div>
                        <div className="bg-muted p-4 md:p-6 md:w-52 flex md:flex-col md:items-start items-center justify-between">
                          <div className="md:mb-4">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Verified by</p>
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <span className="text-xs font-medium text-primary">AJ</span>
                              </div>
                              <span className="text-sm font-medium">Alex Johnson</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/supplier/${supplier?.id || '1'}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VerificationProcesses;
