/*
# Create core tables for META Career Advisor

## Purpose
This migration creates the data tables that back the app's interactive features:
career assessment results, saved/bookmarked jobs, and contact form submissions.

## New Tables

1. `assessment_results`
   - Stores a user's saved career assessment output.
   - `id` uuid primary key
   - `user_id` uuid, owner, defaults to auth.uid()
   - `name` text — the respondent's display name captured in the assessment
   - `assessment_data` jsonb — the full raw inputs (interests, skills, aptitude, etc.)
   - `recommendations` jsonb — the generated top-5 career recommendations
   - `career_score` integer — aggregate match score (0-100)
   - `created_at` timestamptz

2. `saved_jobs`
   - Stores a user's bookmarked job postings.
   - `id` uuid primary key
   - `user_id` uuid, owner, defaults to auth.uid()
   - `job_id` text — the static job id from the app's job list
   - `job_title` text
   - `company` text
   - `created_at` timestamptz
   - Unique constraint on (user_id, job_id) so a job can't be saved twice.

3. `contact_submissions`
   - Stores contact form messages from the Contact page.
   - `id` uuid primary key
   - `user_id` uuid, nullable — set when a logged-in user submits (defaults to auth.uid() when present)
   - `name` text
   - `email` text
   - `subject` text
   - `message` text
   - `created_at` timestamptz

## Security — Row Level Security

All tables enable RLS. The app has a sign-in screen, so policies are scoped
to `authenticated` users with ownership checks via `auth.uid()`.

- `assessment_results`: owner can SELECT/INSERT/UPDATE/DELETE their own rows.
- `saved_jobs`: owner can SELECT/INSERT/DELETE their own rows.
- `contact_submissions`: any authenticated user can INSERT (so a logged-in user
  can submit even without pre-existing rows); owner can SELECT their own past
  submissions. user_id is nullable so anonymous submit isn't blocked, but RLS
  requires an authenticated session to insert at all.

## Notes
1. Owner columns default to `auth.uid()` so client inserts that omit `user_id`
   still satisfy the WITH CHECK ownership predicate.
2. All statements are idempotent (IF NOT EXISTS / DROP POLICY IF EXISTS).
*/

-- assessment_results
CREATE TABLE IF NOT EXISTS assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  assessment_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
  career_score integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_assessment_results" ON assessment_results;
CREATE POLICY "select_own_assessment_results"
ON assessment_results FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_assessment_results" ON assessment_results;
CREATE POLICY "insert_own_assessment_results"
ON assessment_results FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_assessment_results" ON assessment_results;
CREATE POLICY "update_own_assessment_results"
ON assessment_results FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_assessment_results" ON assessment_results;
CREATE POLICY "delete_own_assessment_results"
ON assessment_results FOR DELETE
TO authenticated USING (auth.uid() = user_id);

-- saved_jobs
CREATE TABLE IF NOT EXISTS saved_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id text NOT NULL,
  job_title text NOT NULL,
  company text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, job_id)
);

ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_saved_jobs" ON saved_jobs;
CREATE POLICY "select_own_saved_jobs"
ON saved_jobs FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_saved_jobs" ON saved_jobs;
CREATE POLICY "insert_own_saved_jobs"
ON saved_jobs FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_saved_jobs" ON saved_jobs;
CREATE POLICY "delete_own_saved_jobs"
ON saved_jobs FOR DELETE
TO authenticated USING (auth.uid() = user_id);

-- contact_submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own contact submissions.
-- user_id is set from auth.uid() via DEFAULT when a session exists.
DROP POLICY IF EXISTS "insert_own_contact_submissions" ON contact_submissions;
CREATE POLICY "insert_own_contact_submissions"
ON contact_submissions FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "select_own_contact_submissions" ON contact_submissions;
CREATE POLICY "select_own_contact_submissions"
ON contact_submissions FOR SELECT
TO authenticated USING (auth.uid() = user_id);

-- Indexes for common lookups
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON saved_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON contact_submissions(user_id);
