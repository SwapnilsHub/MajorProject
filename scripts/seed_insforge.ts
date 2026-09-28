import fs from 'fs';
import path from 'path';
import { createClient } from '@insforge/sdk';
import { careers, courses, colleges, blogPosts, jobs, Course, College, BlogPost, Job } from '../lib/data';
import { quizQuestions, QuizQuestion } from '../lib/quiz-data';
import { learningVideos, learningReels, LearningVideo, LearningReel } from '../lib/video-data';
import { projects, Project } from '../lib/project-data';
import { allBadges, Badge } from '../lib/learning-stats';

// Helper to escape strings for SQL
function sqlStr(val: any): string {
  if (val === null || val === undefined) return 'NULL';
  return `'${String(val).replace(/'/g, "''")}'`;
}

function sqlJson(val: any): string {
  if (val === null || val === undefined) return "'[]'::jsonb";
  return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
}

function generateSeedSql(): string {
  const sqlStatements: string[] = [
    '-- InsForge Comprehensive Data Seed Script',
    '-- Automatically generated from project static datasets',
    '-- ─────────────────────────────────────────────────────────────────────────────\n'
  ];

  // 1. Careers
  if (careers.length > 0) {
    sqlStatements.push('-- Careers');
    careers.forEach((c) => {
      sqlStatements.push(
        `INSERT INTO public.careers (slug, title, category, overview, skills, salary, demand, future_scope, growth, roadmap, top_companies, courses, certifications, eligibility, match_tags) VALUES (${sqlStr(
          c.slug
        )}, ${sqlStr(c.title)}, ${sqlStr(c.category)}, ${sqlStr(c.overview)}, ${sqlJson(c.skills)}, ${sqlStr(
          c.salary
        )}, ${sqlStr(c.demand)}, ${sqlStr(c.futureScope)}, ${sqlStr(c.growth)}, ${sqlJson(c.roadmap)}, ${sqlJson(
          c.topCompanies
        )}, ${sqlJson(c.courses)}, ${sqlJson(c.certifications)}, ${sqlStr(c.eligibility)}, ${sqlJson(
          c.matchTags
        )}) ON CONFLICT (slug) DO NOTHING;`
      );
    });
    sqlStatements.push('');
  }

  // 2. Courses
  if (courses.length > 0) {
    sqlStatements.push('-- Courses');
    courses.forEach((c: Course) => {
      sqlStatements.push(
        `INSERT INTO public.courses (title, provider, rating, duration, level, link, category, image) VALUES (${sqlStr(
          c.title
        )}, ${sqlStr(c.provider)}, ${c.rating || 4.5}, ${sqlStr(c.duration)}, ${sqlStr(c.level)}, ${sqlStr(
          c.url
        )}, ${sqlStr(c.category)}, ${sqlStr(null)}) ON CONFLICT DO NOTHING;`
      );
    });
    sqlStatements.push('');
  }

  // 3. Colleges
  if (colleges.length > 0) {
    sqlStatements.push('-- Colleges');
    colleges.forEach((c: College) => {
      sqlStatements.push(
        `INSERT INTO public.colleges (name, location, rating, nirf_rank, courses_offered, avg_package, highest_package, website) VALUES (${sqlStr(
          c.name
        )}, ${sqlStr(`${c.city}, ${c.state}`)}, 4.5, ${c.ranking || 'NULL'}, ${sqlJson(
          c.courses
        )}, ${sqlStr(c.placements)}, ${sqlStr(c.fees)}, ${sqlStr(c.website)}) ON CONFLICT DO NOTHING;`
      );
    });
    sqlStatements.push('');
  }

  // 4. Jobs
  if (jobs.length > 0) {
    sqlStatements.push('-- Jobs');
    jobs.forEach((j: Job) => {
      sqlStatements.push(
        `INSERT INTO public.jobs (title, company, location, salary, type, experience, skills, posted_date, description) VALUES (${sqlStr(
          j.title
        )}, ${sqlStr(j.company)}, ${sqlStr(j.location)}, ${sqlStr(j.salary)}, ${sqlStr(j.type)}, ${sqlStr(
          j.experience
        )}, ${sqlJson(j.skills)}, ${sqlStr(j.posted)}, ${sqlStr(j.description)}) ON CONFLICT DO NOTHING;`
      );
    });
    sqlStatements.push('');
  }

  // 5. Blog Posts
  if (blogPosts.length > 0) {
    sqlStatements.push('-- Blog Posts');
    blogPosts.forEach((b: BlogPost) => {
      sqlStatements.push(
        `INSERT INTO public.blog_posts (slug, title, excerpt, author, date, category, read_time, image, content) VALUES (${sqlStr(
          b.slug
        )}, ${sqlStr(b.title)}, ${sqlStr(b.excerpt)}, ${sqlStr(b.author)}, ${sqlStr(b.date)}, ${sqlStr(
          b.category
        )}, ${sqlStr(b.readTime)}, ${sqlStr(b.image)}, ${sqlStr(b.excerpt)}) ON CONFLICT (slug) DO NOTHING;`
      );
    });
    sqlStatements.push('');
  }

  // 6. Quiz Questions
  if (quizQuestions.length > 0) {
    sqlStatements.push('-- Quiz Questions');
    quizQuestions.forEach((q: QuizQuestion) => {
      sqlStatements.push(
        `INSERT INTO public.quiz_questions (question_id, category, difficulty, question, options, correct_answer, explanation) VALUES (${sqlStr(
          q.id
        )}, ${sqlStr(q.category)}, ${sqlStr(q.difficulty)}, ${sqlStr(q.question)}, ${sqlJson(
          q.options
        )}, ${q.correctAnswer}, ${sqlStr(q.explanation)}) ON CONFLICT (question_id) DO NOTHING;`
      );
    });
    sqlStatements.push('');
  }

  // 7. Learning Videos
  if (learningVideos.length > 0) {
    sqlStatements.push('-- Learning Videos');
    learningVideos.forEach((v: LearningVideo) => {
      sqlStatements.push(
        `INSERT INTO public.learning_videos (video_id, title, channel, duration, thumbnail, category, views, level, video_url) VALUES (${sqlStr(
          v.id
        )}, ${sqlStr(v.title)}, ${sqlStr(v.instructor)}, ${sqlStr(v.duration)}, ${sqlStr(v.thumbnail)}, ${sqlStr(
          v.category
        )}, ${sqlStr(v.views)}, ${sqlStr(v.difficulty)}, ${sqlStr(`https://www.youtube.com/watch?v=${v.youtubeId}`)}) ON CONFLICT (video_id) DO NOTHING;`
      );
    });
    sqlStatements.push('');
  }

  // 8. Learning Reels
  if (learningReels.length > 0) {
    sqlStatements.push('-- Learning Reels');
    learningReels.forEach((r: LearningReel) => {
      sqlStatements.push(
        `INSERT INTO public.learning_reels (reel_id, title, creator, duration, video_url, likes_count, saves_count, tags) VALUES (${sqlStr(
          r.id
        )}, ${sqlStr(r.title)}, ${sqlStr(r.instructor)}, ${sqlStr(r.duration)}, ${sqlStr(`https://www.youtube.com/watch?v=${r.youtubeId || ''}`)}, ${
          r.likes || 0
        }, 0, ${sqlJson(r.tags)}) ON CONFLICT (reel_id) DO NOTHING;`
      );
    });
    sqlStatements.push('');
  }

  // 9. Projects
  if (projects.length > 0) {
    sqlStatements.push('-- Projects');
    projects.forEach((p: Project) => {
      sqlStatements.push(
        `INSERT INTO public.projects (project_id, title, category, difficulty, description, time_estimate, skills, steps, github_url, demo_url) VALUES (${sqlStr(
          p.id
        )}, ${sqlStr(p.title)}, ${sqlStr(p.category)}, ${sqlStr(p.difficulty)}, ${sqlStr(
          p.description
        )}, ${sqlStr(p.estimatedTime)}, ${sqlJson(p.requiredSkills)}, ${sqlJson(p.roadmap)}, ${sqlStr(
          p.githubRef
        )}, ${sqlStr(null)}) ON CONFLICT (project_id) DO NOTHING;`
      );
    });
    sqlStatements.push('');
  }

  // 10. Badges
  if (allBadges.length > 0) {
    sqlStatements.push('-- Badges');
    allBadges.forEach((b: Badge) => {
      sqlStatements.push(
        `INSERT INTO public.badges (badge_id, name, description, icon, category, requirement) VALUES (${sqlStr(
          b.id
        )}, ${sqlStr(b.title)}, ${sqlStr(b.description)}, ${sqlStr(b.icon)}, ${sqlStr('General')}, ${sqlStr(
          b.requirement
        )}) ON CONFLICT (badge_id) DO NOTHING;`
      );
    });
    sqlStatements.push('');
  }

  // 11. EduMart Categories
  sqlStatements.push('-- EduMart Default Categories');
  const edumartCategories = [
    { name: 'Textbooks & Study Material', slug: 'textbooks', icon: 'BookOpen' },
    { name: 'Electronics & Gadgets', slug: 'electronics', icon: 'Laptop' },
    { name: 'Lab Equipment & Tools', slug: 'lab-tools', icon: 'Microscope' },
    { name: 'Classroom & Stationery', slug: 'stationery', icon: 'Pencil' },
    { name: 'Projects & Kits', slug: 'project-kits', icon: 'Cpu' },
    { name: 'Uniforms & Apparel', slug: 'apparel', icon: 'Shirt' },
  ];
  edumartCategories.forEach((cat) => {
    sqlStatements.push(
      `INSERT INTO public.edumart_categories (name, slug, icon) VALUES (${sqlStr(cat.name)}, ${sqlStr(
        cat.slug
      )}, ${sqlStr(cat.icon)}) ON CONFLICT (slug) DO NOTHING;`
    );
  });

  return sqlStatements.join('\n');
}

async function runSeed() {
  console.log('📦 Generating SQL Seed File...');
  const sql = generateSeedSql();
  const outputPath = path.join(__dirname, '../insforge/seed_data.sql');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, sql, 'utf-8');
  console.log(`✅ Seed SQL saved successfully to: ${outputPath}`);

  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

  if (baseUrl && anonKey && !baseUrl.includes('placeholder')) {
    console.log('🚀 Connecting to live InsForge backend to seed datasets...');
    const client: any = createClient({ baseUrl, anonKey });

    try {
      console.log('Seeding careers...');
      const db = client.database ? client.database : client;
      if (typeof db.from === 'function') {
        await db.from('careers').insert(
          careers.map((c) => ({
            slug: c.slug,
            title: c.title,
            category: c.category,
            overview: c.overview,
            skills: c.skills,
            salary: c.salary,
            demand: c.demand,
            future_scope: c.futureScope,
            growth: c.growth,
            roadmap: c.roadmap,
            top_companies: c.topCompanies,
            courses: c.courses,
            certifications: c.certifications,
            eligibility: c.eligibility,
            match_tags: c.matchTags,
          }))
        );
        console.log('✅ Live seed completed for careers!');
      }
    } catch (err: any) {
      console.error('⚠️ Live SDK seed warning:', err?.message || err);
    }
  } else {
    console.log(
      'ℹ️ Live InsForge URL not provided in env. You can execute `insforge/seed_data.sql` in InsForge Dashboard SQL Editor!'
    );
  }
}

runSeed().catch(console.error);
