/*
  # Create contact submissions table and policies

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)
      - `status` (text, default 'pending')

  2. Security
    - Enable RLS
    - Add policy for public submissions
    - Add policy for admin access
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  -- Check if the insert policy exists before creating it
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Anyone can submit contact forms'
  ) THEN
    CREATE POLICY "Anyone can submit contact forms"
      ON contact_submissions
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;

  -- Check if the select policy exists before creating it
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Admins can read contact submissions'
  ) THEN
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
  END IF;
END $$;