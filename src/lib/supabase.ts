import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  tags: string[];
  created_at: string;
  order: number;
};

export type ContactSubmission = {
  id: string;
  email: string;
  message: string;
  created_at: string;
  status: string;
};