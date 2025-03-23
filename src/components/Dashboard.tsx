
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle, Clock, ExternalLink, FileText, MapPin, ShieldCheck, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { suppliers, sustainabilityMetrics } from '@/utils/mockData';
import TransitionComponent from './TransitionComponent';
import MetricsPanel from './MetricsPanel';
import SupplierCard from './SupplierCard';

const Dashboard = () => {
  const topSuppliers = suppliers.slice(0, 6);
  
  return (
    <div className="space-y-8">
      <TransitionComponent animation="fade-in" className="mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Supply Chain Verification</h1>
            <p className="text-muted-foreground">Monitor and verify sustainability across your supply chain</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/verification" className="inline-flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                View Verifications
              </Link>
            </Button>
            <Button asChild>
              <Link to="/admin" className="inline-flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </TransitionComponent>

      <TransitionComponent animation="fade-up" delay={100}>
        <MetricsPanel metrics={sustainabilityMetrics} />
      </TransitionComponent>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TransitionComponent animation="fade-up" delay={150}>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Verifications</CardTitle>
              <CardDescription>Latest verification activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => {
                  const statuses = ['completed', 'pending', 'rejected'];
                  const status = statuses[i];
                  
                  return (
                    <div key={i} className="flex items-start gap-3">
                      {status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                      {status === 'pending' && <Clock className="h-5 w-5 text-amber-500 mt-0.5" />}
                      {status === 'rejected' && <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                      
                      <div className="flex-1">
                        <div className="flex justify-between w-full">
                          <p className="text-sm font-medium">
                            {status === 'completed' ? 'Carbon Emissions Report' : 
                             status === 'pending' ? 'Water Usage Certification' : 
                                                    'Labor Practices Audit'}
                          </p>
                          <span className="text-xs text-muted-foreground">{i + 1}d ago</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {status === 'completed' ? 'EcoFabrics Inc.' : 
                           status === 'pending' ? 'Green Logistics Ltd.' : 
                                                  'Sustainable Packaging Co.'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Separator />
              
              <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                <Link to="/verification" className="flex items-center justify-center">
                  View All Verifications
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TransitionComponent>

        <TransitionComponent animation="fade-up" delay={200}>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Verification Tasks</CardTitle>
              <CardDescription>Tasks requiring your attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => {
                  const priorities = ['high', 'medium', 'low'];
                  const priority = priorities[i];
                  
                  return (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-3 rounded-md border"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "h-2 w-2 rounded-full mt-1.5",
                          priority === 'high' ? 'bg-red-500' : 
                          priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                        )} />
                        <div>
                          <p className="text-sm font-medium">
                            {i === 0 ? 'Review carbon emissions data' : 
                             i === 1 ? 'Verify supplier certifications' : 
                                       'Update sustainability metrics'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Due in {i === 0 ? '2' : i === 1 ? '4' : '7'} days
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Start</Button>
                    </div>
                  );
                })}
              </div>
              
              <Separator />
              
              <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                <Link to="/admin" className="flex items-center justify-center">
                  View All Tasks
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TransitionComponent>

        <TransitionComponent animation="fade-up" delay={250}>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Sustainability Insights</CardTitle>
              <CardDescription>Latest trends and achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                      Carbon Reduction
                    </h3>
                    <span className="text-xs font-medium text-green-500">-12.5%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Overall carbon emissions reduced across tier 1 suppliers
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Top Performing Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Packaging', 'Logistics'].map((category, i) => (
                      <div key={i} className="rounded-md border p-2 text-center">
                        <p className="text-xs font-medium">{category}</p>
                        <p className="text-lg font-bold text-primary mt-1">
                          {i === 0 ? '93%' : '87%'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          compliance
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                <Link to="/verification" className="flex items-center justify-center">
                  View Full Report
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TransitionComponent>
      </div>

      <TransitionComponent animation="fade-up" delay={300}>
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Top Suppliers</h2>
              <p className="text-sm text-muted-foreground">Your best performing sustainability partners</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                View All Suppliers
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSuppliers.map((supplier, index) => (
              <Link to={`/supplier/${supplier.id}`} key={supplier.id} className="block h-full">
                <SupplierCard supplier={supplier} index={index} />
              </Link>
            ))}
          </div>
        </div>
      </TransitionComponent>
    </div>
  );
};

export default Dashboard;
