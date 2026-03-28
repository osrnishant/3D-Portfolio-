/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, sender name)
      - `email` (text, sender email)
      - `message` (text, message body)
      - `created_at` (timestamptz, auto-set)
  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for anonymous users to insert messages (public contact form)
    - No select/update/delete policies (messages are write-only from frontend)
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (
    length(name) > 0 AND
    length(email) > 0 AND
    length(message) > 0
  );
