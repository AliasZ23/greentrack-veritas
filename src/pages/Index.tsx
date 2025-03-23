
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smoother animations
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="mt-4 text-muted-foreground animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
