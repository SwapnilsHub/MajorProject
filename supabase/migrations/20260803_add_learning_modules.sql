/*
# Add Learning Modules Tables — META Career Advisor

## New Tables

1. `quiz_attempts` — Each quiz session a user completes
2. `quiz_questions` — Static question bank (admin-managed)
3. `video_progress` — Per-user per-video watch progress, bookmarks, likes
4. `reel_interactions` — Per-user per-reel likes and saves
5. `project_saves` — User-saved project recommendations
6. `user_learning_stats` — Aggregate learning stats per user (streak, hours, badges)

## Security
All tables use RLS scoped to auth.uid().
*/

-- ─────────────────────────────────────────────
-- quiz_attempts
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL,
  difficulty text NOT NULL DEFAULT 'Beginner',
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL DEFAULT 0,
  correct_answers integer NOT NULL DEFAULT 0,
  time_taken_seconds integer NOT NULL DEFAULT 0,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  completed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_quiz_attempts" ON quiz_attempts;
CREATE POLICY "select_own_quiz_attempts"
ON quiz_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_quiz_attempts" ON quiz_attempts;
CREATE POLICY "insert_own_quiz_attempts"
ON quiz_attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- video_progress
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS video_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id text NOT NULL,
  progress_pct integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  bookmarked boolean NOT NULL DEFAULT false,
  liked boolean NOT NULL DEFAULT false,
  watched_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, video_id)
);

ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_video_progress" ON video_progress;
CREATE POLICY "select_own_video_progress"
ON video_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_video_progress" ON video_progress;
CREATE POLICY "insert_own_video_progress"
ON video_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_video_progress" ON video_progress;
CREATE POLICY "update_own_video_progress"
ON video_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- reel_interactions
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reel_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  reel_id text NOT NULL,
  liked boolean NOT NULL DEFAULT false,
  saved boolean NOT NULL DEFAULT false,
  UNIQUE (user_id, reel_id)
);

ALTER TABLE reel_interactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_reel_interactions" ON reel_interactions;
CREATE POLICY "select_own_reel_interactions"
ON reel_interactions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_reel_interactions" ON reel_interactions;
CREATE POLICY "insert_own_reel_interactions"
ON reel_interactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_reel_interactions" ON reel_interactions;
CREATE POLICY "update_own_reel_interactions"
ON reel_interactions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- project_saves
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS project_saves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id text NOT NULL,
  saved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, project_id)
);

ALTER TABLE project_saves ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_project_saves" ON project_saves;
CREATE POLICY "select_own_project_saves"
ON project_saves FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_project_saves" ON project_saves;
CREATE POLICY "insert_own_project_saves"
ON project_saves FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_project_saves" ON project_saves;
CREATE POLICY "delete_own_project_saves"
ON project_saves FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- user_learning_stats
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_learning_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  streak_days integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  total_hours numeric(8,2) NOT NULL DEFAULT 0,
  quizzes_completed integer NOT NULL DEFAULT 0,
  videos_watched integer NOT NULL DEFAULT 0,
  reels_watched integer NOT NULL DEFAULT 0,
  projects_completed integer NOT NULL DEFAULT 0,
  certificates_earned integer NOT NULL DEFAULT 0,
  badges jsonb NOT NULL DEFAULT '[]'::jsonb,
  weekly_hours jsonb NOT NULL DEFAULT '[]'::jsonb,
  last_active_date date,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_learning_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_learning_stats" ON user_learning_stats;
CREATE POLICY "select_own_learning_stats"
ON user_learning_stats FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_learning_stats" ON user_learning_stats;
CREATE POLICY "insert_own_learning_stats"
ON user_learning_stats FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_learning_stats" ON user_learning_stats;
CREATE POLICY "update_own_learning_stats"
ON user_learning_stats FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_category ON quiz_attempts(category);
CREATE INDEX IF NOT EXISTS idx_video_progress_user_id ON video_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_reel_interactions_user_id ON reel_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_project_saves_user_id ON project_saves(user_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_stats_user_id ON user_learning_stats(user_id);
