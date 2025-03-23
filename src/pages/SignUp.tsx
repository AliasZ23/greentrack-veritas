
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { UserPlus, Mail, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const { signUp, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signUp(values.email, values.password);
      setRegistrationStatus('success');
    } catch (error) {
      console.error('Sign up error:', error);
      setRegistrationStatus('error');
    }
  };

  // Show confirmation message after registration
  if (registrationStatus === 'success') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header hideNav />
        
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold mt-4">Check your email</CardTitle>
              <CardDescription>
                We've sent a confirmation link to your email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="bg-primary/10 border-primary/20">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertTitle>Email Verification Required</AlertTitle>
                <AlertDescription>
                  Please check your inbox and click the verification link to activate your account.
                  If you don't see the email, check your spam folder.
                </AlertDescription>
              </Alert>
              
              <div className="mt-6 text-center">
                <Button variant="outline" onClick={() => navigate('/login')} className="mr-2">
                  Back to Login
                </Button>
                <Button onClick={() => setRegistrationStatus('idle')}>
                  Register Another Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header hideNav />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <UserPlus className="h-7 w-7 text-primary" />
            </div>
            <h2 className="mt-6 text-2xl font-bold">Create an Account</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign up to access the supplier verification portal
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="confirmation">Email Confirmation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signup">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Creating account...' : 'Sign up'}
                      </Button>
                      <div className="text-center mt-4">
                        <p className="text-sm text-muted-foreground">
                          Already have an account?{' '}
                          <Link to="/login" className="text-primary hover:underline">
                            Log in
                          </Link>
                        </p>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="confirmation">
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Email Confirmation Process</h3>
                      <p className="text-sm text-muted-foreground">
                        After registration, we'll send a confirmation email with a verification link.
                      </p>
                    </div>
                    
                    <div className="space-y-2 border rounded-md p-3">
                      <p className="text-sm font-medium">Email Example:</p>
                      <div className="text-sm text-muted-foreground space-y-2 bg-muted/30 p-2 rounded">
                        <p><strong>Subject:</strong> Confirm Your Signup</p>
                        <div className="border-t pt-2">
                          <p>Follow this link to confirm your user:</p>
                          <p className="text-primary">Confirm your mail</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" onClick={() => form.reset()} className="w-full">
                      Back to Sign Up
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
