import { createClient } from '@supabase/supabase-js';

// Create Supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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

export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: '3D Product Visualization',
    category: '3D Modeling',
    description: 'High-fidelity 3D product visualization for an e-commerce platform, featuring photorealistic rendering and interactive viewing.',
    image_url: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
    tags: ['3D Modeling', 'Product Design', 'WebGL', 'Three.js'],
    created_at: '2025-01-15T10:00:00Z',
    order: 1
  },
  {
    id: '2',
    title: 'AI-Powered Analytics Dashboard',
    category: 'AI Solutions',
    description: 'Custom analytics dashboard with AI-driven insights, real-time data processing, and predictive modeling capabilities.',
    image_url: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg',
    tags: ['AI', 'Machine Learning', 'Data Visualization', 'React'],
    created_at: '2025-02-01T14:30:00Z',
    order: 2
  },
  {
    id: '3',
    title: 'E-commerce Website Redesign',
    category: 'Web Design',
    description: 'Complete redesign of an e-commerce platform focusing on user experience, performance, and conversion optimization.',
    image_url: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg',
    tags: ['Web Design', 'UI/UX', 'E-commerce', 'React'],
    created_at: '2025-02-15T09:15:00Z',
    order: 3
  },
  {
    id: '4',
    title: 'Virtual Reality Experience',
    category: '3D Modeling',
    description: 'Immersive VR experience for architectural visualization, allowing users to explore and interact with 3D spaces.',
    image_url: 'https://images.pexels.com/photos/8728560/pexels-photo-8728560.jpeg',
    tags: ['VR', '3D Modeling', 'Architecture', 'Unity'],
    created_at: '2025-03-01T11:45:00Z',
    order: 4
  }
];