
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, FileText, Award, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { suppliers } from '@/utils/mockData';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SustainabilityScore from '@/components/SustainabilityScore';
import VerificationBadge from '@/components/VerificationBadge';
import TransitionComponent from '@/components/TransitionComponent';

const SupplierDetails = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const found = suppliers.find(s => s.id === parseInt(id || '0'));
      setSupplier(found || null);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Supplier Not Found</h2>
            <p className="mb-6 text-muted-foreground">The supplier you're looking for doesn't exist or may have been removed.</p>
            <Button asChild>
              <Link to="/">Return to Dashboard</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const tierBadgeClasses = {
    primary: 'bg-ocean-blue-100 text-ocean-blue-800 border-ocean-blue-200',
    secondary: 'bg-purple-100 text-purple-800 border-purple-200',
    tertiary: 'bg-warm-gray-100 text-warm-gray-800 border-warm-gray-200',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <TransitionComponent animation="fade" className="mb-6 flex items-center">
          <Button variant="outline" size="sm" className="mr-4" asChild>
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">{supplier.name}</h1>
          <VerificationBadge status={supplier.verificationStatus} className="ml-3" />
        </TransitionComponent>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TransitionComponent animation="fade-up" delay={100} className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Supplier Overview</span>
                  <SustainabilityScore score={supplier.sustainabilityScore} size="md" showLabel={true} />
                </CardTitle>
                <CardDescription>
                  Key information and sustainability metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Basic Information</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium">Category</dt>
                        <dd className="text-sm">{supplier.category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium">Location</dt>
                        <dd className="text-sm flex items-center"><MapPin className="h-3 w-3 mr-1" />{supplier.location}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium">Tier</dt>
                        <dd>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${tierBadgeClasses[supplier.tier]}`}>
                            {supplier.tier.charAt(0).toUpperCase() + supplier.tier.slice(1)}
                          </span>
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium">Last Verified</dt>
                        <dd className="text-sm flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(supplier.lastVerified).toLocaleDateString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Sustainability Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Carbon Emissions</span>
                          <span className="text-sm">{supplier.metrics?.carbonEmissions} tons/year</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${Math.min(100, (1 - supplier.metrics?.carbonEmissions / 10000) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Water Usage</span>
                          <span className="text-sm">{supplier.metrics?.waterUsage} kL/year</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${Math.min(100, (1 - supplier.metrics?.waterUsage / 50000) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Waste Generated</span>
                          <span className="text-sm">{supplier.metrics?.wasteGenerated} tons/year</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${Math.min(100, (1 - supplier.metrics?.wasteGenerated / 5000) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TransitionComponent>

          <TransitionComponent animation="fade-up" delay={200}>
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>
                  Valid sustainability certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supplier.certifications.map((cert: string, i: number) => (
                    <div key={i} className="flex items-center p-2 border rounded-md bg-card">
                      <Award className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TransitionComponent>
          
          <TransitionComponent animation="fade-up" delay={300} className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Verification History</CardTitle>
                <CardDescription>
                  Timeline of verification activities and audits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Activities</TabsTrigger>
                    <TabsTrigger value="audits">Audits</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <div className="space-y-4">
                      {Array(5).fill(0).map((_, i) => {
                        const types = ['Audit', 'Document Upload', 'Review', 'Certification'];
                        const type = types[Math.floor(Math.random() * types.length)];
                        const date = new Date();
                        date.setMonth(date.getMonth() - i);
                        
                        return (
                          <div key={i} className="flex items-start gap-4 p-3 border-b last:border-0">
                            {type === 'Audit' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                            {type === 'Document Upload' && <FileText className="h-5 w-5 text-blue-500 mt-0.5" />}
                            {type === 'Review' && <Clock className="h-5 w-5 text-amber-500 mt-0.5" />}
                            {type === 'Certification' && <Award className="h-5 w-5 text-purple-500 mt-0.5" />}
                            
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="text-sm font-medium">{type}</h4>
                                <time className="text-xs text-muted-foreground">{date.toLocaleDateString()}</time>
                              </div>
                              <p className="text-sm mt-1">
                                {type === 'Audit' && 'On-site sustainability audit completed'}
                                {type === 'Document Upload' && 'Supplier uploaded water usage reports'}
                                {type === 'Review' && 'Third-party review of carbon emissions data'}
                                {type === 'Certification' && 'Received ISO 14001 Environmental Certification'}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>
                  <TabsContent value="audits">
                    <div className="space-y-4">
                      {Array(3).fill(0).map((_, i) => {
                        const date = new Date();
                        date.setMonth(date.getMonth() - i * 2);
                        
                        return (
                          <div key={i} className="flex items-start gap-4 p-3 border-b last:border-0">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="text-sm font-medium">On-site Audit</h4>
                                <time className="text-xs text-muted-foreground">{date.toLocaleDateString()}</time>
                              </div>
                              <p className="text-sm mt-1">Comprehensive sustainability audit by third-party verifier</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>
                  <TabsContent value="documents">
                    <div className="space-y-4">
                      {Array(4).fill(0).map((_, i) => {
                        const types = ['Environmental Report', 'Certification Document', 'Water Usage Data', 'Energy Consumption Report'];
                        const type = types[i % types.length];
                        const date = new Date();
                        date.setMonth(date.getMonth() - i);
                        
                        return (
                          <div key={i} className="flex items-start gap-4 p-3 border-b last:border-0">
                            <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="text-sm font-medium">{type}</h4>
                                <time className="text-xs text-muted-foreground">{date.toLocaleDateString()}</time>
                              </div>
                              <p className="text-sm mt-1">Document uploaded and verified by system</p>
                              <Button variant="ghost" size="sm" className="mt-2">Download</Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto">View Full History</Button>
              </CardFooter>
            </Card>
          </TransitionComponent>
        </div>
      </main>
    </div>
  );
};

export default SupplierDetails;
