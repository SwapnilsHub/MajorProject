-- ─────────────────────────────────────────────────────────────────────────────
-- InsForge Database Schema for META Career Advisor & EduMart
-- ─────────────────────────────────────────────────────────────────────────────

-- Disable RLS momentarily during creation / migration setup
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. PUBLIC CATALOG & CORE TABLES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    overview TEXT NOT NULL,
    skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    salary TEXT NOT NULL,
    demand TEXT NOT NULL,
    future_scope TEXT,
    growth TEXT,
    roadmap JSONB NOT NULL DEFAULT '[]'::jsonb,
    top_companies JSONB NOT NULL DEFAULT '[]'::jsonb,
    courses JSONB NOT NULL DEFAULT '[]'::jsonb,
    certifications JSONB NOT NULL DEFAULT '[]'::jsonb,
    eligibility TEXT,
    match_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    rating NUMERIC(3,2) NOT NULL DEFAULT 4.5,
    duration TEXT NOT NULL,
    level TEXT NOT NULL,
    link TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.colleges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    rating NUMERIC(3,2) NOT NULL DEFAULT 4.5,
    nirf_rank INTEGER,
    courses_offered JSONB NOT NULL DEFAULT '[]'::jsonb,
    avg_package TEXT,
    highest_package TEXT,
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    salary TEXT NOT NULL,
    type TEXT NOT NULL,
    experience TEXT NOT NULL,
    skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    posted_date TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    read_time TEXT NOT NULL,
    image TEXT,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER CAREER & ASSESSMENT TABLES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    assessment_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
    career_score INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.saved_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    job_id TEXT NOT NULL,
    job_title TEXT NOT NULL,
    company TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, job_id)
);

CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. LEARNING MODULES & STATS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'Beginner',
    question TEXT NOT NULL,
    options JSONB NOT NULL DEFAULT '[]'::jsonb,
    correct_answer INTEGER NOT NULL,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'Beginner',
    score INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL DEFAULT 0,
    correct_answers INTEGER NOT NULL DEFAULT 0,
    time_taken_seconds INTEGER NOT NULL DEFAULT 0,
    answers JSONB NOT NULL DEFAULT '[]'::jsonb,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.learning_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    channel TEXT NOT NULL,
    duration TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    category TEXT NOT NULL,
    views TEXT NOT NULL DEFAULT '0',
    level TEXT NOT NULL DEFAULT 'Beginner',
    video_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.video_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    video_id TEXT NOT NULL,
    progress_pct INTEGER NOT NULL DEFAULT 0,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    bookmarked BOOLEAN NOT NULL DEFAULT FALSE,
    liked BOOLEAN NOT NULL DEFAULT FALSE,
    watched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, video_id)
);

CREATE TABLE IF NOT EXISTS public.learning_reels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reel_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    creator TEXT NOT NULL,
    duration TEXT NOT NULL,
    video_url TEXT NOT NULL,
    likes_count INTEGER NOT NULL DEFAULT 0,
    saves_count INTEGER NOT NULL DEFAULT 0,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reel_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    reel_id TEXT NOT NULL,
    liked BOOLEAN NOT NULL DEFAULT FALSE,
    saved BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (user_id, reel_id)
);

CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    description TEXT NOT NULL,
    time_estimate TEXT NOT NULL,
    skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    github_url TEXT,
    demo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_saves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    project_id TEXT NOT NULL,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, project_id)
);

CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    category TEXT NOT NULL,
    requirement TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_learning_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    streak_days INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    total_hours NUMERIC(8,2) NOT NULL DEFAULT 0,
    quizzes_completed INTEGER NOT NULL DEFAULT 0,
    videos_watched INTEGER NOT NULL DEFAULT 0,
    reels_watched INTEGER NOT NULL DEFAULT 0,
    projects_completed INTEGER NOT NULL DEFAULT 0,
    certificates_earned INTEGER NOT NULL DEFAULT 0,
    badges JSONB NOT NULL DEFAULT '[]'::jsonb,
    weekly_hours JSONB NOT NULL DEFAULT '[]'::jsonb,
    last_active_date DATE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. EDUMART MARKETPLACE TABLES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.edumart_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.edumart_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category_slug TEXT REFERENCES public.edumart_categories(slug),
    images JSONB DEFAULT '[]'::jsonb,
    original_price NUMERIC NOT NULL CHECK (original_price >= 0),
    selling_price NUMERIC NOT NULL CHECK (selling_price >= 0),
    condition TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold', 'deleted')),
    location TEXT NOT NULL,
    college TEXT,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.edumart_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.edumart_products(id) ON DELETE RESTRICT,
    amount NUMERIC NOT NULL,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    delivery_method TEXT NOT NULL CHECK (delivery_method IN ('pickup', 'delivery')),
    status TEXT DEFAULT 'placed' CHECK (status IN ('placed', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.edumart_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.edumart_products(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'countered', 'expired')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.edumart_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.edumart_products(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.edumart_wishlist (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.edumart_products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS public.edumart_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reviewer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.edumart_products(id) ON DELETE SET NULL,
    order_id UUID REFERENCES public.edumart_orders(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.edumart_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. INDEXES FOR HIGH-PERFORMANCE SEARCH & LOOKUPS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_careers_slug ON careers(slug);
CREATE INDEX IF NOT EXISTS idx_careers_category ON careers(category);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_category ON quiz_questions(category);
CREATE INDEX IF NOT EXISTS idx_learning_videos_category ON learning_videos(category);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON saved_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON contact_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_video_progress_user_id ON video_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_reel_interactions_user_id ON reel_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_project_saves_user_id ON project_saves(user_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_stats_user_id ON user_learning_stats(user_id);

-- 6. ROW LEVEL SECURITY POLICIES
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE reel_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read access to catalog tables
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public careers read" ON careers;
CREATE POLICY "Public careers read" ON careers FOR SELECT USING (true);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public courses read" ON courses;
CREATE POLICY "Public courses read" ON courses FOR SELECT USING (true);

ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public colleges read" ON colleges;
CREATE POLICY "Public colleges read" ON colleges FOR SELECT USING (true);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public jobs read" ON jobs;
CREATE POLICY "Public jobs read" ON jobs FOR SELECT USING (true);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public blog_posts read" ON blog_posts;
CREATE POLICY "Public blog_posts read" ON blog_posts FOR SELECT USING (true);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public quiz_questions read" ON quiz_questions;
CREATE POLICY "Public quiz_questions read" ON quiz_questions FOR SELECT USING (true);

ALTER TABLE learning_videos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public learning_videos read" ON learning_videos;
CREATE POLICY "Public learning_videos read" ON learning_videos FOR SELECT USING (true);

ALTER TABLE learning_reels ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public learning_reels read" ON learning_reels;
CREATE POLICY "Public learning_reels read" ON learning_reels FOR SELECT USING (true);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public projects read" ON projects;
CREATE POLICY "Public projects read" ON projects FOR SELECT USING (true);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public badges read" ON badges;
CREATE POLICY "Public badges read" ON badges FOR SELECT USING (true);


-- User-facing dynamic tables: Allow SELECT, INSERT, UPDATE, DELETE for anon & authenticated
DROP POLICY IF EXISTS "select_own_assessment_results" ON assessment_results;
DROP POLICY IF EXISTS "insert_own_assessment_results" ON assessment_results;
DROP POLICY IF EXISTS "update_own_assessment_results" ON assessment_results;
DROP POLICY IF EXISTS "delete_own_assessment_results" ON assessment_results;
CREATE POLICY "Public all assessment_results" ON assessment_results FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "select_own_saved_jobs" ON saved_jobs;
DROP POLICY IF EXISTS "insert_own_saved_jobs" ON saved_jobs;
DROP POLICY IF EXISTS "delete_own_saved_jobs" ON saved_jobs;
CREATE POLICY "Public all saved_jobs" ON saved_jobs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "insert_own_contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "select_own_contact_submissions" ON contact_submissions;
CREATE POLICY "Public all contact_submissions" ON contact_submissions FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "select_own_quiz_attempts" ON quiz_attempts;
DROP POLICY IF EXISTS "insert_own_quiz_attempts" ON quiz_attempts;
CREATE POLICY "Public all quiz_attempts" ON quiz_attempts FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "select_own_video_progress" ON video_progress;
DROP POLICY IF EXISTS "insert_own_video_progress" ON video_progress;
DROP POLICY IF EXISTS "update_own_video_progress" ON video_progress;
CREATE POLICY "Public all video_progress" ON video_progress FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "select_own_reel_interactions" ON reel_interactions;
DROP POLICY IF EXISTS "insert_own_reel_interactions" ON reel_interactions;
DROP POLICY IF EXISTS "update_own_reel_interactions" ON reel_interactions;
CREATE POLICY "Public all reel_interactions" ON reel_interactions FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "select_own_project_saves" ON project_saves;
DROP POLICY IF EXISTS "insert_own_project_saves" ON project_saves;
DROP POLICY IF EXISTS "delete_own_project_saves" ON project_saves;
CREATE POLICY "Public all project_saves" ON project_saves FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "select_own_learning_stats" ON user_learning_stats;
DROP POLICY IF EXISTS "insert_own_learning_stats" ON user_learning_stats;
DROP POLICY IF EXISTS "update_own_learning_stats" ON user_learning_stats;
CREATE POLICY "Public all user_learning_stats" ON user_learning_stats FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- EduMart Tables RLS
ALTER TABLE edumart_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public edumart_categories read" ON edumart_categories FOR SELECT USING (true);

ALTER TABLE edumart_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public edumart_products all" ON edumart_products FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE edumart_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public edumart_orders all" ON edumart_orders FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE edumart_offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public edumart_offers all" ON edumart_offers FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE edumart_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public edumart_messages all" ON edumart_messages FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE edumart_wishlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public edumart_wishlist all" ON edumart_wishlist FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE edumart_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public edumart_reviews all" ON edumart_reviews FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE edumart_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public edumart_notifications all" ON edumart_notifications FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

