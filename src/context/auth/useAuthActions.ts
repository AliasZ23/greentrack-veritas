
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase, mockAuth } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

// Check if we're using mock authentication
const isMockClient = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

type AuthStateProps = {
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
};

export function useAuthActions({ setLoading, setUser, setSession }: AuthStateProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      let error;
      let data;
      
      if (isMockClient) {
        const result = await mockAuth.signUp(email, password);
        error = result.error;
        data = result.data;
        
        if (!error) {
          // For mock, we don't auto-login after signup
          toast({
            title: "Sign up successful",
            description: "Account created successfully. You can now log in.",
          });
        }
      } else {
        const { data: authData, error: authError } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`
          }
        });
        error = authError;
        data = authData;
      }
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Sign up successful",
        description: "Please check your email to confirm your account",
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
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

  return { signIn, signUp, signOut };
}
