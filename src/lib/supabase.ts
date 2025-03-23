
import { createClient } from '@supabase/supabase-js';

// For development purposes only - in production, use environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Create a temporary mock client if credentials are not provided
const isMockClient = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add mock authentication for development
if (isMockClient) {
  console.warn(
    'Using mock Supabase client. For production, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

// Mock authentication methods for development
export const mockAuth = {
  signIn: async (email: string, password: string) => {
    // Mock successful authentication for admin@example.com/password
    if (email === 'admin@example.com' && password === 'password') {
      return { error: null };
    }
    return { error: { message: 'Invalid login credentials' } };
  },
  signOut: async () => {
    return { error: null };
  },
  getSession: async () => {
    return { 
      data: { 
        session: { 
          user: { email: 'admin@example.com', id: '1' } 
        } 
      }, 
      error: null 
    };
  }
};
