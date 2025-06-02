/*
  # Create profiles and contact submissions tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `role` (text, default 'visitor')
      - `created_at` (timestamp)
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)
      - `status` (text, default 'pending')

  2. Security
    - Enable RLS on both tables
    - Add policies for contact form submissions
    - Add policies for profile access
*/

-- Create profiles table first
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role text DEFAULT 'visitor',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact forms
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users with admin role can read submissions
CREATE POLICY "Admins can read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );