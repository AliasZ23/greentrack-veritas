
import { createClient } from '@supabase/supabase-js';

// Use the specific Supabase URL and anon key you provided
const supabaseUrl = 'https://lqzmcseprzlsqhpztqav.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxem1jc2Vwcnpsc3FocHp0cWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDI4ODAsImV4cCI6MjA1ODI3ODg4MH0.qrCD-OzqJUYO5G6npN423tA_n7bfXJhCQZVsDy8gBtU';

// Remove the fallback and use the provided credentials directly
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Remove mock authentication warning since we're now using real credentials
