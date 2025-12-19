import { createClient } from '@supabase/supabase-js';

// Configuration from environment variables
// Vite automatically replaces process.env or import.meta.env at build time
const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Maintain compatibility for now if needed, but prefer exports
window.supabase = supabase;
