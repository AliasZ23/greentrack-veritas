
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, mockAuth } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Check if we're using mock authentication
const isMockClient = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const setData = async () => {
      if (isMockClient) {
        // For development, set a mock user after a delay to simulate loading
        setTimeout(() => {
          setUser({ email: 'admin@example.com', id: '1' } as User);
          setSession({ user: { email: 'admin@example.com', id: '1' } as User } as Session);
          setLoading(false);
        }, 500);
        return;
      }

      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        return;
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    if (isMockClient) {
      // Skip subscription for mock client
      setData();
    } else {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      setData();

      return () => {
        if (subscription) subscription.unsubscribe();
      };
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      let error;
      
      if (isMockClient) {
        const result = await mockAuth.signIn(email, password);
        error = result.error;
        
        if (!error) {
          // Set mock user for development
          setUser({ email, id: '1' } as User);
          setSession({ user: { email, id: '1' } as User } as Session);
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        error = authError;
      }
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Login successful",
        description: "You have been logged in successfully",
      });
      
      navigate('/admin');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      let error;
      
      if (isMockClient) {
        const result = await mockAuth.signOut();
        error = result.error;
        
        // Clear mock user data
        setUser(null);
        setSession(null);
      } else {
        const { error: authError } = await supabase.auth.signOut();
        error = authError;
      }
      
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
