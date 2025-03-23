
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, mockAuth } from '@/lib/supabase';

// Check if we're using mock authentication
const isMockClient = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

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

  return {
    user,
    session,
    loading,
    setLoading,
    isAuthenticated: !!user
  };
}
