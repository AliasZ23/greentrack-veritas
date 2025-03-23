
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Palette, Globe, Lock, Database, Trash2, Clock } from 'lucide-react';
import Header from '@/components/Header';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your platform preferences</p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full lg:w-auto lg:inline-flex">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="data">Data & Privacy</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>
                  Manage general settings for the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="SupplyVerify" />
                    <p className="text-sm text-muted-foreground">
                      This name appears in the header and email notifications
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Support Email</Label>
                    <Input id="contact-email" type="email" defaultValue="support@supplyverify.example.com" />
                    <p className="text-sm text-muted-foreground">
                      Used for support requests and system notifications
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Regional Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="utc-8">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="utc+0">UTC</SelectItem>
                          <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                          <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="mm-dd-yyyy">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (ISO)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="unit-system">Unit System</Label>
                      <Select defaultValue="metric">
                        <SelectTrigger id="unit-system">
                          <SelectValue placeholder="Select unit system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metric">Metric (kg, km)</SelectItem>
                          <SelectItem value="imperial">Imperial (lb, mi)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Send system notifications via email
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Automated Reports</p>
                        <p className="text-sm text-muted-foreground">
                          Send weekly summary reports to administrators
                        </p>
                      </div>
                      <Switch id="automated-reports" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={saveSettings}>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme Settings
                </CardTitle>
                <CardDescription>
                  Customize the appearance of the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Color Theme</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 border-2 border-primary cursor-pointer">
                      <div className="space-y-2">
                        <div className="h-20 bg-primary rounded-md"></div>
                        <p className="text-center font-medium">Default</p>
                      </div>
                    </Card>
                    
                    <Card className="p-4 cursor-pointer">
                      <div className="space-y-2">
                        <div className="h-20 bg-blue-600 rounded-md"></div>
                        <p className="text-center font-medium">Blue</p>
                      </div>
                    </Card>
                    
                    <Card className="p-4 cursor-pointer">
                      <div className="space-y-2">
                        <div className="h-20 bg-green-600 rounded-md"></div>
                        <p className="text-center font-medium">Green</p>
                      </div>
                    </Card>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Layout Options</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Compact View</p>
                        <p className="text-sm text-muted-foreground">
                          Use a more compact layout with less whitespace
                        </p>
                      </div>
                      <Switch id="compact-view" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Quick Actions</p>
                        <p className="text-sm text-muted-foreground">
                          Display quick action buttons in list views
                        </p>
                      </div>
                      <Switch id="quick-actions" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Animations</p>
                        <p className="text-sm text-muted-foreground">
                          Use transitions and animations in the interface
                        </p>
                      </div>
                      <Switch id="enable-animations" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={saveSettings}>Save Appearance</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Manage your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Export</h3>
                  <p className="text-sm text-muted-foreground">
                    Export all your platform data in various formats
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Export as CSV</Button>
                    <Button variant="outline">Export as Excel</Button>
                    <Button variant="outline">Export as JSON</Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Retention</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Supplier Data Retention Period</Label>
                    <Select defaultValue="7-years">
                      <SelectTrigger id="retention-period">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="3-years">3 Years</SelectItem>
                        <SelectItem value="5-years">5 Years</SelectItem>
                        <SelectItem value="7-years">7 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Specify how long to keep supplier data after it becomes inactive
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="font-medium">Archive Old Reports</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically archive reports older than 2 years
                      </p>
                    </div>
                    <Switch id="archive-reports" defaultChecked />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacy Settings</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Collection</p>
                        <p className="text-sm text-muted-foreground">
                          Allow collection of usage analytics to improve the platform
                        </p>
                      </div>
                      <Switch id="data-collection" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Share Anonymized Data</p>
                        <p className="text-sm text-muted-foreground">
                          Allow sharing anonymized sustainability data for industry benchmarks
                        </p>
                      </div>
                      <Switch id="share-data" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={saveSettings}>Save Data Settings</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/20">
              <CardHeader className="text-destructive">
                <CardTitle className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-destructive/80">
                  Irreversible actions that affect your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-destructive">Reset Platform Data</h3>
                  <p className="text-sm text-muted-foreground">
                    This will remove all suppliers, verifications, and reports. This action cannot be undone.
                  </p>
                  <Button variant="destructive">Reset All Data</Button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-destructive">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  System Performance
                </CardTitle>
                <CardDescription>
                  Configure advanced settings for the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Caching</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Data Caching</p>
                        <p className="text-sm text-muted-foreground">
                          Improve performance by caching frequently accessed data
                        </p>
                      </div>
                      <Switch id="data-caching" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cache-expiry">Cache Expiry Time</Label>
                      <Select defaultValue="1-hour">
                        <SelectTrigger id="cache-expiry">
                          <SelectValue placeholder="Select expiry time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15-min">15 Minutes</SelectItem>
                          <SelectItem value="30-min">30 Minutes</SelectItem>
                          <SelectItem value="1-hour">1 Hour</SelectItem>
                          <SelectItem value="4-hours">4 Hours</SelectItem>
                          <SelectItem value="24-hours">24 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Settings</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex gap-2">
                      <Input id="api-key" value="sk_live_xxxxxxxxxxxxxxxxxxxxx" readOnly className="flex-1" />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Use this key to access the platform API
                    </p>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable API Access</p>
                        <p className="text-sm text-muted-foreground">
                          Allow external applications to access the platform via API
                        </p>
                      </div>
                      <Switch id="api-access" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Rate Limiting</p>
                        <p className="text-sm text-muted-foreground">
                          Restrict API calls to prevent abuse
                        </p>
                      </div>
                      <Switch id="rate-limiting" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Logging</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="log-level">Log Level</Label>
                    <Select defaultValue="info">
                      <SelectTrigger id="log-level">
                        <SelectValue placeholder="Select log level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="verbose">Verbose</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="font-medium">Audit Logging</p>
                      <p className="text-sm text-muted-foreground">
                        Keep detailed logs of all user actions
                      </p>
                    </div>
                    <Switch id="audit-logging" defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={saveSettings}>Save Advanced Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
