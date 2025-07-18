// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nojoldpvnclqbdcuedbe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vam9sZHB2bmNscWJkY3VlZGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NjU1NTksImV4cCI6MjA2ODI0MTU1OX0._V2bnlr4ydTwJmhIQuViCzw_pGcY5gqVIDCQBKrkqKc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});