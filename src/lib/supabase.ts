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

// Mock portfolio items for development
export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: '3D Product Visualization',
    category: '3D Modeling',
    description: 'Interactive 3D product visualization for e-commerce platform',
    image_url: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
    tags: ['Three.js', 'WebGL', 'React'],
    created_at: '2024-01-01',
    order: 1
  },
  {
    id: '2',
    title: 'AI-Powered Analytics Dashboard',
    category: 'AI Solutions',
    description: 'Real-time analytics dashboard with AI-driven insights',
    image_url: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
    tags: ['Machine Learning', 'Data Visualization', 'React'],
    created_at: '2024-01-02',
    order: 2
  },
  {
    id: '3',
    title: 'Modern E-commerce Platform',
    category: 'Web Design',
    description: 'Fully responsive e-commerce website with modern UI/UX',
    image_url: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg',
    tags: ['React', 'Tailwind CSS', 'Supabase'],
    created_at: '2024-01-03',
    order: 3
  },
  {
    id: '4',
    title: 'Business Strategy Development',
    category: 'Consultation',
    description: 'Strategic business development and digital transformation consulting',
    image_url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    tags: ['Strategy', 'Digital Transformation', 'Consulting'],
    created_at: '2024-01-04',
    order: 4
  }
];