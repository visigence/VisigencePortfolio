/*
  # Contact submissions table and policies

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamptz)
      - `status` (text, default: 'pending')

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for public users to submit forms
    - Add policy for admins to read submissions
*/

-- Create the contact_submissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

-- Enable RLS if not already enabled
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  -- Drop "Anyone can submit contact forms" policy if it exists
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Anyone can submit contact forms'
  ) THEN
    DROP POLICY "Anyone can submit contact forms" ON contact_submissions;
  END IF;

  -- Drop "Admins can read contact submissions" policy if it exists
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Admins can read contact submissions'
  ) THEN
    DROP POLICY "Admins can read contact submissions" ON contact_submissions;
  END IF;
END $$;

-- Create the policies
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

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