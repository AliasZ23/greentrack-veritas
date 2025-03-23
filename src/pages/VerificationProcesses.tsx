
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, AlertTriangle, FileCheck, Filter, Search } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TransitionComponent from '@/components/TransitionComponent';

// Mock verification requests
const verificationRequests = [
  {
    id: 1,
    supplierName: 'EcoFabrics Inc.',
    documentType: 'Carbon Emissions Report',
    submittedDate: '2023-10-15',
    status: 'approved',
    reviewer: 'John Smith',
    notes: 'All documentation meets our standards.',
  },
  {
    id: 2,
    supplierName: 'Green Logistics Ltd.',
    documentType: 'Water Usage Certification',
    submittedDate: '2023-10-14',
    status: 'pending',
    reviewer: 'Pending Assignment',
    notes: '',
  },
  {
    id: 3,
    supplierName: 'Sustainable Packaging Co.',
    documentType: 'Ethical Labor Audit',
    submittedDate: '2023-10-10',
    status: 'rejected',
    reviewer: 'Emma Johnson',
    notes: 'Missing required documentation on worker interviews.',
  },
  {
    id: 4,
    supplierName: 'Clean Energy Solutions',
    documentType: 'Renewable Energy Certificate',
    submittedDate: '2023-10-08',
    status: 'approved',
    reviewer: 'Michael Chen',
    notes: 'Verified with third-party auditor.',
  },
  {
    id: 5,
    supplierName: 'Organic Materials Inc.',
    documentType: 'Material Sourcing Documentation',
    submittedDate: '2023-10-05',
    status: 'pending',
    reviewer: 'Pending Assignment',
    notes: '',
  },
  {
    id: 6,
    supplierName: 'Ethical Apparel Makers',
    documentType: 'Factory Conditions Report',
    submittedDate: '2023-10-01',
    status: 'approved',
    reviewer: 'Sarah Williams',
    notes: 'Meets all ethical standards.',
  },
  {
    id: 7,
    supplierName: 'Bio Plastics Ltd.',
    documentType: 'Biodegradability Test Results',
    submittedDate: '2023-09-28',
    status: 'pending',
    reviewer: 'David Lopez',
    notes: 'Awaiting additional lab results.',
  },
];

const VerificationProcesses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredRequests = verificationRequests.filter(request => {
    const matchesSearch = !searchTerm || 
      request.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.documentType.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'approved') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
    } else if (status === 'pending') {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
    } else {
      return <Badge variant="destructive">Rejected</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'approved') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (status === 'pending') {
      return <Clock className="h-5 w-5 text-amber-500" />;
    } else {
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <TransitionComponent animation="fade" className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Verification Processes</h1>
              <p className="text-muted-foreground">Track and manage verification requests from suppliers</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button>
                <FileCheck className="mr-2 h-4 w-4" />
                New Verification
              </Button>
            </div>
          </div>
        </TransitionComponent>

        <TransitionComponent animation="fade-up" delay={100}>
          <Card>
            <CardHeader>
              <CardTitle>Verification Queue</CardTitle>
              <CardDescription>
                Review and process verification requests from suppliers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                  <TabsList>
                    <TabsTrigger value="all">All Requests</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex w-full md:w-auto gap-2">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search requests..." 
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                            All Statuses
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setStatusFilter('approved')}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            Approved
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                            <Clock className="mr-2 h-4 w-4 text-amber-500" />
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setStatusFilter('rejected')}>
                            <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                            Rejected
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <TabsContent value="all" className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Status</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Document Type</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Reviewer</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>
                              <div className="flex items-center">
                                {getStatusIcon(request.status)}
                                <span className="sr-only">{request.status}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              <Link to={`/supplier/${request.id}`} className="hover:underline">
                                {request.supplierName}
                              </Link>
                            </TableCell>
                            <TableCell>{request.documentType}</TableCell>
                            <TableCell>{new Date(request.submittedDate).toLocaleDateString()}</TableCell>
                            <TableCell>{request.reviewer}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredRequests.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center h-24">
                              <div className="flex flex-col items-center justify-center">
                                <Search className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-muted-foreground">No verification requests found</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="pending">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Status</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Document Type</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Reviewer</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {verificationRequests
                          .filter(request => request.status === 'pending')
                          .map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  <Clock className="h-5 w-5 text-amber-500" />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                <Link to={`/supplier/${request.id}`} className="hover:underline">
                                  {request.supplierName}
                                </Link>
                              </TableCell>
                              <TableCell>{request.documentType}</TableCell>
                              <TableCell>{new Date(request.submittedDate).toLocaleDateString()}</TableCell>
                              <TableCell>{request.reviewer}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm">
                                    Assign
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="approved">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Status</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Document Type</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Reviewer</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {verificationRequests
                          .filter(request => request.status === 'approved')
                          .map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                <Link to={`/supplier/${request.id}`} className="hover:underline">
                                  {request.supplierName}
                                </Link>
                              </TableCell>
                              <TableCell>{request.documentType}</TableCell>
                              <TableCell>{new Date(request.submittedDate).toLocaleDateString()}</TableCell>
                              <TableCell>{request.reviewer}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="rejected">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Status</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Document Type</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Reviewer</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {verificationRequests
                          .filter(request => request.status === 'rejected')
                          .map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  <AlertTriangle className="h-5 w-5 text-red-500" />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                <Link to={`/supplier/${request.id}`} className="hover:underline">
                                  {request.supplierName}
                                </Link>
                              </TableCell>
                              <TableCell>{request.documentType}</TableCell>
                              <TableCell>{new Date(request.submittedDate).toLocaleDateString()}</TableCell>
                              <TableCell>{request.reviewer}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm">
                                    Request Revision
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TransitionComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <TransitionComponent animation="fade-up" delay={200}>
            <Card>
              <CardHeader>
                <CardTitle>Verification Steps</CardTitle>
                <CardDescription>Standard process for verifying supplier claims</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Document Submission</h3>
                      <p className="text-sm text-muted-foreground">Suppliers submit required documentation</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Initial Screening</h3>
                      <p className="text-sm text-muted-foreground">Documents checked for completeness</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Detailed Review</h3>
                      <p className="text-sm text-muted-foreground">Verification specialists analyze claims</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                      <span className="text-sm font-medium">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium">On-site Audit (if required)</h3>
                      <p className="text-sm text-muted-foreground">Physical inspection of facilities</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Final Verification</h3>
                      <p className="text-sm text-muted-foreground">Approval or rejection with feedback</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TransitionComponent>

          <TransitionComponent animation="fade-up" delay={300}>
            <Card>
              <CardHeader>
                <CardTitle>Verification Statistics</CardTitle>
                <CardDescription>Overview of processing metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                      <p className="text-2xl font-bold">{verificationRequests.length}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium">
                            {verificationRequests.filter(r => r.status === 'approved').length}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Approved</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm font-medium">
                            {verificationRequests.filter(r => r.status === 'pending').length}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="text-sm font-medium">
                            {verificationRequests.filter(r => r.status === 'rejected').length}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Rejected</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Processing Time (Avg.)</p>
                    <div className="h-8 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 flex items-center justify-end px-3"
                        style={{ width: '65%' }}
                      >
                        <span className="text-xs font-medium text-white">3.2 days</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">Target: 5 days</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Recent Activity</p>
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                          <span>
                            {i === 1 ? 'New water usage report verified' : 
                             i === 2 ? 'Carbon audit requested for EcoFabrics' : 
                                       'Labor practices documentation rejected'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TransitionComponent>
        </div>
      </main>
    </div>
  );
};

export default VerificationProcesses;
