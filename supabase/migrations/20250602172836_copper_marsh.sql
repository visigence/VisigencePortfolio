/*
  # Create portfolio items table

  1. New Tables
    - `portfolio_items`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `description` (text)
      - `image_url` (text)
      - `tags` (text array)
      - `created_at` (timestamp)
      - `order` (integer) for custom sorting
  
  2. Security
    - Enable RLS on `portfolio_items` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  "order" integer DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Portfolio items are viewable by everyone"
  ON portfolio_items
  FOR SELECT
  TO public
  USING (true);