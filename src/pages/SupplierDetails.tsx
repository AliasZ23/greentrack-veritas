
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, FileCheck, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import SustainabilityScore from '@/components/SustainabilityScore';
import VerificationBadge from '@/components/VerificationBadge';
import TransitionComponent from '@/components/TransitionComponent';
import { suppliers, verificationActivities } from '@/utils/mockData';

const SupplierDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [supplier, setSupplier] = useState(suppliers.find(s => s.id === id));
  
  useEffect(() => {
    if (id) {
      const foundSupplier = suppliers.find(s => s.id === id);
      setSupplier(foundSupplier);
    }
  }, [id]);
  
  if (!supplier) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h2 className="text-2xl font-bold">Supplier not found</h2>
            <p className="text-muted-foreground mt-2">The supplier you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="mt-6">
              <Link to="/">Back to Dashboard</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  const supplierActivities = verificationActivities.filter(activity => 
    activity.supplier === supplier.name
  );
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <TransitionComponent animation="fade-in" delay={50}>
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{supplier.name}</h1>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <Badge variant="outline" className="mr-2">Tier {supplier.tier === 'primary' ? '1' : supplier.tier === 'secondary' ? '2' : '3'}</Badge>
                  <span className="text-sm">{supplier.location}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardContent className="p-0">
                    <SustainabilityScore score={supplier.sustainabilityScore} size="lg" />
                  </CardContent>
                </Card>
                
                <VerificationBadge status={supplier.verificationStatus} />
              </div>
            </div>
          </div>
        </TransitionComponent>
        
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="verifications">Verification History</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>
          
          <TransitionComponent animation="fade-up" delay={150}>
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <User className="h-5 w-5 mr-2 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium">Primary Contact</p>
                        <p className="text-sm text-muted-foreground">Sarah Johnson</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">contact@{supplier.name.toLowerCase().replace(/\s+/g, '')}.com</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      Compliance Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium">Last Audit Date</p>
                        <p className="text-sm text-muted-foreground">{supplier.lastVerified}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Audit Result</p>
                        <p className="text-sm text-muted-foreground">
                          {supplier.verificationStatus === 'verified' ? 'Passed' : 
                           supplier.verificationStatus === 'pending' ? 'In Review' : 'Needs Attention'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Next Scheduled Audit</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(new Date(supplier.lastVerified).setMonth(new Date(supplier.lastVerified).getMonth() + 12)).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <FileCheck className="h-5 w-5 mr-2 text-primary" />
                      Category Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Environmental</span>
                          <span className="font-medium">{supplier.sustainabilityScore - 5}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${supplier.sustainabilityScore - 5}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Social</span>
                          <span className="font-medium">{supplier.sustainabilityScore + 2}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${supplier.sustainabilityScore + 2}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Governance</span>
                          <span className="font-medium">{supplier.sustainabilityScore - 2}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${supplier.sustainabilityScore - 2}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Supplier Overview</CardTitle>
                  <CardDescription>
                    Key information about {supplier.name}'s sustainability practices
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                  <p>
                    {supplier.name} is a {supplier.tier} tier supplier specializing in {supplier.category.toLowerCase()}. 
                    They have consistently demonstrated strong commitment to sustainability practices, 
                    achieving a sustainability score of {supplier.sustainabilityScore}/100.
                  </p>
                  <p>
                    Based in {supplier.location}, they have been a certified partner since 
                    {new Date().getFullYear() - Math.floor(Math.random() * 5 + 3)}. Their operations are 
                    aligned with our sustainability goals, particularly in reducing carbon emissions and 
                    implementing ethical labor practices.
                  </p>
                  <p>
                    Recent improvements include investments in renewable energy, waste reduction initiatives, 
                    and enhanced supply chain transparency measures. {supplier.name} continues to be a 
                    valuable partner in our sustainable supply chain network.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </TransitionComponent>
          
          <TransitionComponent animation="fade-up" delay={150}>
            <TabsContent value="verifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verification History</CardTitle>
                  <CardDescription>
                    Record of all audits, certifications, and compliance checks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {supplierActivities.length > 0 ? (
                    <div className="space-y-6">
                      {supplierActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4">
                          <div className="mt-1">
                            {activity.type === 'audit' && (
                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                              </div>
                            )}
                            {activity.type === 'certification' && (
                              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <FileCheck className="h-5 w-5 text-green-600 dark:text-green-300" />
                              </div>
                            )}
                            {activity.type === 'report' && (
                              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                              </div>
                            )}
                            {activity.type === 'update' && (
                              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-base font-medium">{activity.activity}</h4>
                              <Badge variant={
                                activity.status === 'completed' ? 'default' : 
                                activity.status === 'in-progress' ? 'outline' : 'secondary'
                              }>
                                {activity.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Date: {activity.date}</p>
                            <p className="text-sm mt-2">
                              {activity.status === 'completed' 
                                ? 'Verification completed successfully. All requirements met.' 
                                : activity.status === 'in-progress'
                                ? 'Verification in progress. Awaiting final documentation.'
                                : 'Scheduled for future verification. No action required at this time.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No verification activities found for this supplier.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </TransitionComponent>
          
          <TransitionComponent animation="fade-up" delay={150}>
            <TabsContent value="certifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>
                    Sustainability and compliance certifications held by {supplier.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {supplier.certifications.map((cert, index) => (
                      <Card key={index} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileCheck className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="text-base font-medium">{cert}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Verified: {new Date(supplier.lastVerified).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                              <p className="text-xs mt-2">Renewal in {Math.floor(Math.random() * 11 + 1)} months</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {supplier.certifications.length < 3 && (
                    <div className="mt-6">
                      <Separator className="mb-6" />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-base font-medium">Recommended Certifications</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Additional certifications that would benefit this supplier
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Suggest to Supplier</Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <Card className="border border-dashed">
                          <CardContent className="p-4">
                            <h4 className="text-base font-medium">ISO 14001</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Environmental Management System certification
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border border-dashed">
                          <CardContent className="p-4">
                            <h4 className="text-base font-medium">SA8000</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Social Accountability certification for ethical working conditions
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </TransitionComponent>
        </Tabs>
      </main>
    </div>
  );
};

export default SupplierDetails;
