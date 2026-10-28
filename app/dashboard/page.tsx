'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Building2,
  MapPin,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Award,
  ShoppingBag,
  Target,
  Bookmark,
  ArrowRight,
  Circle,
  Loader2,
  LogIn,
  Flame,
  PlayCircle,
  Layers,
  Sparkles,
  Heart,
  Package,
  Book,
  Calculator,
  Laptop,
  ShieldCheck,
  Edit3,
  Save,
  Clock,
  Brain,
  Play,
  Code2,
  BarChart3,
  Activity,
  Calendar,
  Lock,
  Lightbulb,
  Trophy,
  Phone,
  Globe,
  Github,
  Linkedin,
  X,
  FileText,
  LogOut,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { AnimatedBg } from '@/components/animated-bg';
import { useAuth } from '@/components/auth-provider';
import { supabase } from '@/lib/supabase/client';
import { QuizHistoryModal } from '@/components/quiz-history-modal';
import { SkillMilestonesModal } from '@/components/skill-milestones-modal';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  mockLearningStats,
  mockMonthlyProgress,
  mockLeaderboard,
  mockSkillProgress,
  generateAISuggestions,
  generateWeeklyPlan,
  getPlacementReadiness,
} from '@/lib/learning-stats';

const progressData = [
  { month: 'Jan', hours: 12, quizzes: 8 },
  { month: 'Feb', hours: 18, quizzes: 14 },
  { month: 'Mar', hours: 25, quizzes: 22 },
  { month: 'Apr', hours: 32, quizzes: 28 },
  { month: 'May', hours: 40, quizzes: 35 },
  { month: 'Jun', hours: 48, quizzes: 42 },
  { month: 'Jul', hours: 55, quizzes: 50 },
];

const skillData = [
  { name: 'Completed', value: 8, color: 'hsl(var(--chart-1))' },
  { name: 'In Progress', value: 5, color: 'hsl(var(--chart-2))' },
  { name: 'Not Started', value: 7, color: 'hsl(var(--chart-3))' },
];

const learningPath = [
  { topic: 'Python Basics & Logic', type: 'Video', status: 'done' },
  { topic: 'Data Structures MCQ Challenge', type: 'Quiz', status: 'done' },
  { topic: 'SQL & Relational Databases', type: 'Course', status: 'done' },
  { topic: 'Build Portfolio Website', type: 'Project', status: 'progress' },
  { topic: 'Machine Learning Foundations', type: 'Video', status: 'todo' },
];

const recommendationsForYou = [
  {
    title: 'Casio fx-991EX Scientific Calculator',
    type: 'EduMart Marketplace',
    price: '₹750 (40% OFF)',
    badge: 'Popular Gear',
    icon: Calculator,
    href: '/edumart',
  },
  {
    title: 'Python for Data Science & ML',
    type: 'Course Recommendation',
    price: 'Free Course',
    badge: 'Trending Course',
    icon: BookOpen,
    href: '/courses',
  },
  {
    title: 'AI Image Classifier Project Roadmap',
    type: 'Project Recommendation',
    price: 'Hands-on',
    badge: 'Build Project',
    icon: Layers,
    href: '/projects',
  },
  {
    title: 'Engineering Mechanics Textbook (2nd Hand)',
    type: 'EduMart Marketplace',
    price: '₹350 (60% OFF)',
    badge: 'EduMart Special',
    icon: Book,
    href: '/edumart',
  },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

function ActivityCalendar() {
  const today = new Date();
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (34 - i));
    const activity = Math.random();
    return {
      date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      level: activity > 0.7 ? 3 : activity > 0.45 ? 2 : activity > 0.2 ? 1 : 0,
    };
  });

  const levels = [
    'bg-muted',
    'bg-green-200 dark:bg-green-900/40',
    'bg-green-400 dark:bg-green-700/60',
    'bg-green-600 dark:bg-green-500',
  ];

  return (
    <div>
      <div className="grid grid-cols-[repeat(35,1fr)] gap-0.5">
        {days.map((d, i) => (
          <div
            key={i}
            title={`${d.date}: ${d.level > 0 ? `${d.level * 30} min` : 'No activity'}`}
            className={`aspect-square rounded-sm ${levels[d.level]} transition-all hover:scale-125 cursor-pointer`}
          />
        ))}
      </div>
      <div className="flex items-center justify-end gap-1.5 mt-2 text-xs text-muted-foreground">
        <span>Less</span>
        {levels.map((l, i) => <div key={i} className={`w-3 h-3 rounded-sm ${l}`} />)}
        <span>More</span>
      </div>
    </div>
  );
}

export default function StudentProfilePage() {
  const { user, signOut, loading: authLoading } = useAuth();

  // Profile Edit Form States
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [college, setCollege] = React.useState('');
  const [city, setCity] = React.useState('');
  const [educationLevel, setEducationLevel] = React.useState('Undergraduate (B.E / B.Tech)');
  const [targetDomain, setTargetDomain] = React.useState('AI & Machine Learning');
  const [bio, setBio] = React.useState('');
  const [githubUrl, setGithubUrl] = React.useState('');
  const [linkedinUrl, setLinkedinUrl] = React.useState('');
  const [portfolioUrl, setPortfolioUrl] = React.useState('');
  
  const [saving, setSaving] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [isClosingModal, setIsClosingModal] = React.useState(false);
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [profileHighlight, setProfileHighlight] = React.useState(false);
  const [showQuizHistoryModal, setShowQuizHistoryModal] = React.useState(false);
  const [showSkillMilestonesModal, setShowSkillMilestonesModal] = React.useState(false);
  const [activeEditTab, setActiveEditTab] = React.useState<'personal' | 'academic' | 'links'>('personal');

  // Initialize student profile from localStorage or auth user metadata
  React.useEffect(() => {
    let loadedFromLocal = false;
    try {
      const cached = localStorage.getItem('edugram_user_profile');
      if (cached) {
        const p = JSON.parse(cached);
        // Only load if matches currently active user or if no other user is logged in
        if (!user?.email || !p.email || p.email.toLowerCase() === user.email.toLowerCase()) {
          if (p.fullName) setFullName(p.fullName);
          if (p.email) setEmail(p.email);
          if (p.phone) setPhone(p.phone);
          if (p.college) setCollege(p.college);
          if (p.city) setCity(p.city);
          if (p.educationLevel) setEducationLevel(p.educationLevel === 'undergraduate' ? 'Undergraduate (B.E / B.Tech)' : p.educationLevel);
          if (p.targetDomain) setTargetDomain(p.targetDomain);
          if (p.bio !== undefined) setBio(p.bio);
          if (p.githubUrl !== undefined) setGithubUrl(p.githubUrl);
          if (p.linkedinUrl !== undefined) setLinkedinUrl(p.linkedinUrl);
          if (p.portfolioUrl !== undefined) setPortfolioUrl(p.portfolioUrl);
          loadedFromLocal = true;
        }
      }
    } catch (e) {
      console.warn('Error reading local profile cache:', e);
    }

    if (!loadedFromLocal && user) {
      const meta = user.user_metadata || {};
      const uName = meta.full_name || user.email?.split('@')[0] || 'Student';
      setFullName(uName);
      setEmail(user.email || '');
      setPhone(meta.phone || '');
      setCollege(meta.college || 'COEP Technological University');
      setCity(meta.city || 'Belgaum');
      setEducationLevel(meta.education_level && meta.education_level !== 'undergraduate' ? meta.education_level : 'Undergraduate (B.E / B.Tech)');
      setTargetDomain(meta.target_domain || 'AI & Machine Learning');
      setBio(meta.bio || `Undergraduate student in ${meta.education_level || 'Undergraduate (B.E / B.Tech)'} at ${meta.college || 'COEP Technological University'}.`);
      setGithubUrl(meta.github_url || '');
      setLinkedinUrl(meta.linkedin_url || '');
      setPortfolioUrl(meta.portfolio_url || '');
    }
  }, [user]);

  const handleOpenModal = () => {
    setIsClosingModal(false);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    if (isClosingModal) return;
    setIsClosingModal(true);
    setTimeout(() => {
      setShowEditModal(false);
      setIsClosingModal(false);
    }, 280);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const profilePayload = {
      fullName: fullName.trim() || 'Student',
      email: email.trim(),
      phone: phone.trim(),
      college: college.trim(),
      city: city.trim(),
      educationLevel,
      targetDomain,
      bio: bio.trim(),
      githubUrl: githubUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
      portfolioUrl: portfolioUrl.trim(),
      updatedAt: new Date().toISOString(),
    };

    // 1. Instant local persistence so changes never lag or vanish
    try {
      localStorage.setItem('edugram_user_profile', JSON.stringify(profilePayload));
      window.dispatchEvent(new CustomEvent('edugram:profile_updated', { detail: profilePayload }));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    // 2. Trigger sleek closing animation immediately
    setIsClosingModal(true);

    // 3. Asynchronously sync to Supabase in background without blocking the UI
    if (user && supabase) {
      try {
        supabase.auth.updateUser({
          email: email && email !== user?.email ? email : undefined,
          data: {
            full_name: profilePayload.fullName,
            phone: profilePayload.phone,
            college: profilePayload.college,
            city: profilePayload.city,
            education_level: profilePayload.educationLevel,
            target_domain: profilePayload.targetDomain,
            bio: profilePayload.bio,
            github_url: profilePayload.githubUrl,
            linkedin_url: profilePayload.linkedinUrl,
            portfolio_url: profilePayload.portfolioUrl,
          },
        }).catch((err) => {
          console.warn('Background Supabase update notice:', err);
        });
      } catch (err) {
        console.warn('Supabase call notice:', err);
      }
    }

    // 4. Complete exit animation smoothly, unmount modal, and trigger celebration effects
    setTimeout(() => {
      setShowEditModal(false);
      setIsClosingModal(false);
      setSaving(false);

      // Celebrate with glowing toast and hero card highlight pulse
      setShowSuccessToast(true);
      setProfileHighlight(true);
      setTimeout(() => setProfileHighlight(false), 2400);
      setTimeout(() => setShowSuccessToast(false), 4500);
    }, 280);
  };

  const stats = mockLearningStats;
  const suggestions = generateAISuggestions(stats);
  const weeklyPlan = generateWeeklyPlan(targetDomain || 'Data Science');
  const readiness = getPlacementReadiness(stats);
  const earnedBadges = stats.badges.filter((b) => b.earned);
  const lockedBadges = stats.badges.filter((b) => !b.earned);

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-[70vh] flex items-center justify-center px-4">
        <AnimatedBg />
        <Card className="max-w-md w-full text-center border-primary/10 relative z-10">
          <CardContent className="pt-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto">
              <LogIn className="h-7 w-7 text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold">Sign in to EduGram</h2>
            <p className="text-muted-foreground text-sm">
              Your student profile, learning stats, quiz scores, certificates, and EduMart orders are saved in your account.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button className="bg-gradient-brand text-white" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button variant="outline" className="border-primary/30" asChild>
                <Link href="/register">Join EduGram</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initialLetter = (fullName || 'S').charAt(0).toUpperCase();

  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />

      {/* CREATIVE CELEBRATORY NOTIFICATION BANNER */}
      {showSuccessToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] max-w-lg w-[92vw] sm:w-auto animate-slide-up pointer-events-auto">
          <div className="relative group overflow-hidden flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-card/95 border border-emerald-500/40 shadow-[0_12px_45px_rgba(16,185,129,0.35)] backdrop-blur-2xl text-foreground">
            {/* Animated shimmer beam */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-primary/20 to-teal-500/10 animate-shimmer pointer-events-none" />
            
            {/* Glowing animated badge */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shrink-0 shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
            </div>

            <div className="relative space-y-0.5 pr-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-foreground">
                  Profile Updated Successfully!
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                  <Sparkles className="w-3 h-3 text-amber-400 animate-spin-glow" /> SAVED
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your changes are active & updated across your student portal in real-time.
              </p>
            </div>

            <button
              onClick={() => setShowSuccessToast(false)}
              className="relative text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted/60 transition-colors ml-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* STUDENT PROFILE HEADER HERO CARD */}
        <Card className={`border-primary/20 bg-gradient-to-br from-card/95 via-card/60 to-primary/10 mb-8 shadow-xl overflow-hidden rounded-3xl transition-all duration-700 ${
          profileHighlight
            ? 'ring-4 ring-emerald-500/60 shadow-[0_0_50px_rgba(16,185,129,0.35)] scale-[1.01]'
            : 'ring-0'
        }`}>
          <div className="h-2 w-full bg-gradient-brand" />
          <CardContent className="pt-8 pb-8 px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              
              {/* Left: Avatar + Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-brand flex items-center justify-center text-white font-display text-4xl font-bold shadow-xl border-4 border-background">
                    {initialLetter}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1.5 rounded-full border-2 border-background shadow-md" title="Verified Student">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="font-display text-3xl font-bold tracking-tight">
                      {fullName}
                    </h1>
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-2.5 py-0.5">
                      Verified Student
                    </Badge>
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      ID: EDU-2026-8942
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground max-w-xl line-clamp-2">
                    {bio}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <Mail className="h-3.5 w-3.5 text-primary" /> {email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-primary" /> {phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-primary" /> {college}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> {city}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-primary">
                      <BookOpen className="h-3.5 w-3.5" /> {educationLevel || 'Undergraduate (B.E / B.Tech)'}
                    </span>
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-3 pt-2">
                    {githubUrl && (
                      <a href={githubUrl} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                        <Github className="h-3.5 w-3.5" /> GitHub
                      </a>
                    )}
                    {linkedinUrl && (
                      <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                        <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                      </a>
                    )}
                    {portfolioUrl && (
                      <a href={portfolioUrl} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5" /> Portfolio
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Profile Completeness & Edit Button */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0">
                <div className="w-full sm:w-48 text-left lg:text-right space-y-1">
                  <div className="flex justify-between lg:justify-end gap-2 text-xs font-semibold">
                    <span className="text-muted-foreground">Profile Completeness:</span>
                    <span className="text-primary font-bold">92%</span>
                  </div>
                  <Progress value={92} className="h-2 rounded-full" />
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  <Button
                    onClick={handleOpenModal}
                    className="bg-gradient-brand text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 rounded-xl h-11 px-5 font-semibold text-sm flex-1 sm:flex-initial transition-all active:scale-95"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="border-primary/30 rounded-xl h-11" asChild>
                    <Link href="/domains">
                      <Sparkles className="mr-2 h-4 w-4 text-cyan-500" />
                      Explore Domains
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={signOut}
                    className="border-red-500/30 text-red-600 hover:text-red-700 hover:bg-red-500/10 rounded-xl h-11 px-4 font-semibold text-sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* EDIT PROFILE MODAL / DIALOG */}
        {showEditModal && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget && !saving) handleCloseModal();
            }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
              isClosingModal
                ? 'bg-black/0 backdrop-blur-none pointer-events-none'
                : 'bg-black/75 backdrop-blur-md animate-fade-in'
            }`}
          >
            <div
              className={`bg-card/95 border border-primary/25 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out ${
                isClosingModal
                  ? 'scale-90 opacity-0 -translate-y-8 -rotate-1 blur-xs pointer-events-none'
                  : 'scale-100 opacity-100 translate-y-0 shadow-2xl animate-scale-in'
              }`}
            >
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={saving}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all hover:rotate-90 active:scale-90"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <Edit3 className="h-3.5 w-3.5" /> Account Settings
                </div>
                <h2 className="font-display font-bold text-2xl">Edit Student Profile</h2>
                <p className="text-xs text-muted-foreground">Update your personal information, academic details, and portfolio links</p>
              </div>

              {/* Modal Tabs */}
              <div className="flex gap-2 border-b pb-2">
                {[
                  { id: 'personal', label: 'Personal & Contact' },
                  { id: 'academic', label: 'Academic & Domain' },
                  { id: 'links', label: 'Portfolio & Socials' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveEditTab(tab.id as any)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                      activeEditTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                {/* TAB 1: Personal & Contact */}
                {activeEditTab === 'personal' && (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold">Full Name / Username *</Label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Rahul Patil"
                            className="pl-10 h-11 rounded-xl"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="rahul@example.com"
                            className="pl-10 h-11 rounded-xl"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold">Phone / Mobile Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="pl-10 h-11 rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold">City / Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Pune, Maharashtra"
                            className="pl-10 h-11 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Student Bio / Summary</Label>
                      <Textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself, your learning goals, and hobbies..."
                        className="rounded-xl rows-3"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: Academic & Domain */}
                {activeEditTab === 'academic' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">College / University / School Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          placeholder="e.g. COEP Technological University"
                          className="pl-10 h-11 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold">Education Level</Label>
                        <Select value={educationLevel} onValueChange={setEducationLevel}>
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue placeholder="Select Education Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Undergraduate (B.E / B.Tech)">Undergraduate (B.E / B.Tech)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold">Target Domain Specialization</Label>
                        <Select value={targetDomain} onValueChange={setTargetDomain}>
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue placeholder="Select Target Domain" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                            <SelectItem value="Data Science">Data & Analytics</SelectItem>
                            <SelectItem value="Software Development">Full Stack Web Development</SelectItem>
                            <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                            <SelectItem value="Cloud Computing">Cloud & DevOps</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: Portfolio & Socials */}
                {activeEditTab === 'links' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">GitHub Profile URL</Label>
                      <div className="relative">
                        <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                          placeholder="https://github.com/yourusername"
                          className="pl-10 h-11 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">LinkedIn Profile URL</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/yourusername"
                          className="pl-10 h-11 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Personal Portfolio Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={portfolioUrl}
                          onChange={(e) => setPortfolioUrl(e.target.value)}
                          placeholder="https://yourportfolio.com"
                          className="pl-10 h-11 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Auto-updates in real-time
                  </p>
                  <div className="flex items-center gap-2.5">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleCloseModal}
                      disabled={saving}
                      className="rounded-xl px-4 text-xs font-semibold hover:bg-muted"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={saving}
                      className="bg-gradient-brand text-white rounded-xl px-6 relative overflow-hidden group shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all text-xs font-semibold h-11"
                    >
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                      {saving ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2 animate-bounce text-emerald-300" />
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                          Save Profile Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Dashboard Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {[
            { label: 'Learning Hours', value: '55 hrs', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
            { label: 'Quiz Score', value: '88%', icon: Target, color: 'from-purple-500 to-indigo-500' },
            { label: 'Videos Watched', value: '34', icon: PlayCircle, color: 'from-emerald-500 to-teal-500' },
            { label: 'Projects Built', value: '4', icon: Layers, color: 'from-amber-500 to-orange-500' },
            { label: 'Certificates', value: '2', icon: Award, color: 'from-rose-500 to-pink-500' },
            { label: 'EduMart Orders', value: '3', icon: Package, color: 'from-cyan-500 to-blue-600' },
            { label: 'Wishlist Items', value: '7', icon: Heart, color: 'from-purple-600 to-pink-600' },
            { label: 'Saved Courses', value: '5', icon: Bookmark, color: 'from-indigo-500 to-cyan-500' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="border-primary/10 overflow-hidden hover:border-primary/30 transition-all">
                <CardContent className="p-3.5 text-center space-y-1">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="font-display text-lg font-bold">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-tight truncate">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Placement Readiness */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5 mb-8">
          <CardContent className="pt-5 pb-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center shrink-0">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-0.5">AI Placement Readiness Score</div>
                  <div className="font-display text-3xl font-bold text-gradient">{readiness}%</div>
                  <div className="text-sm text-muted-foreground">
                    {readiness >= 80 ? '🚀 Ready for internship applications!' :
                      readiness >= 60 ? '📈 Good progress — keep building skills' :
                        '📚 Focus on quizzes and projects to improve'}
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-64">
                <Progress value={readiness} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Beginner</span>
                  <span>Internship Ready</span>
                  <span>Job Ready</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended for You (Educational + Marketplace) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-500" />
              Recommended for You
            </h2>
            <Badge variant="outline" className="text-xs">
              Education & Marketplace
            </Badge>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendationsForYou.map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <Link key={i} href={item.href}>
                  <Card className="border-primary/10 hover:border-primary/30 hover:shadow-glow transition-all cursor-pointer h-full">
                    <CardContent className="pt-5 pb-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                          <ItemIcon className="h-5 w-5 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      </div>
                      <div>
                        <div className="font-semibold text-sm line-clamp-1">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item.type}</div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t text-xs font-medium">
                        <span className="text-cyan-600 dark:text-cyan-400">{item.price}</span>
                        <span className="text-primary flex items-center gap-1">
                          View <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Progress chart & Learning Activity */}
          <Card className="lg:col-span-2 border-primary/10 hover:border-primary/30 transition-all rounded-2xl overflow-hidden shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="font-display flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Learning Activity & Quizzes (2026)
                </CardTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-500 border-amber-500/30 font-semibold">
                    🔥 14-Day Streak
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/30 font-semibold">
                    🎯 91.5% Avg Score
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-5">
              {/* Visual Performance Trend Chart */}
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Monthly Hours vs Quizzes Completed</span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Study Hours
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Quizzes Passed
                    </span>
                  </div>
                </div>

                {/* Reliable SVG Trend Curve */}
                <div className="w-full h-36 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="20" x2="500" y2="20" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
                    <line x1="0" y1="60" x2="500" y2="60" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />

                    {/* Shaded Area */}
                    <path
                      d="M 20 100 Q 100 85, 180 65 T 340 35 T 480 15 L 480 110 L 20 110 Z"
                      fill="url(#chartGrad)"
                    />

                    {/* Hours Line (Cyan) */}
                    <path
                      d="M 20 100 Q 100 85, 180 65 T 340 35 T 480 15"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Quizzes Line (Indigo) */}
                    <path
                      d="M 20 108 Q 100 95, 180 80 T 340 52 T 480 30"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="4 2"
                    />

                    {/* Labeled Data Nodes */}
                    {[
                      { cx: 20, cy: 100, val: '12h' },
                      { cx: 100, cy: 85, val: '18h' },
                      { cx: 180, cy: 65, val: '25h' },
                      { cx: 260, cy: 50, val: '32h' },
                      { cx: 340, cy: 35, val: '40h' },
                      { cx: 420, cy: 25, val: '48h' },
                      { cx: 480, cy: 15, val: '55h' },
                    ].map((dot, i) => (
                      <g key={i}>
                        <circle cx={dot.cx} cy={dot.cy} r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                      </g>
                    ))}
                  </svg>

                  {/* Month Labels */}
                  <div className="flex justify-between text-[11px] text-muted-foreground pt-1.5 px-1 font-medium">
                    <span>Jan (12h)</span>
                    <span>Feb (18h)</span>
                    <span>Mar (25h)</span>
                    <span>Apr (32h)</span>
                    <span>May (40h)</span>
                    <span>Jun (48h)</span>
                    <span>Jul (55h)</span>
                  </div>
                </div>
              </div>

              {/* 3 Presentation-Ready Dummy Quiz & Activity Records */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <span>Recent Quiz Performances & Milestones (3 Records)</span>
                  <button
                    type="button"
                    onClick={() => setShowQuizHistoryModal(true)}
                    className="text-primary hover:text-primary/80 font-bold hover:underline cursor-pointer flex items-center gap-1 transition-colors group"
                  >
                    View History <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {/* Record 1 */}
                  <div className="p-3.5 rounded-xl border border-primary/20 bg-card hover:bg-muted/40 transition-colors flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm truncate">Data Structures & Algorithms MCQ Challenge</h4>
                          <Badge className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20 text-[10px] px-1.5 py-0">
                            Algorithms & DSA
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          23/25 Correct • 18 mins • Rank #4 in College Leaderboard
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-sm text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        92% Score
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-1">Yesterday, 4:30 PM</p>
                    </div>
                  </div>

                  {/* Record 2 */}
                  <div className="p-3.5 rounded-xl border border-border/80 bg-card hover:bg-muted/40 transition-colors flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm truncate">Full-Stack React & Next.js Architecture Quiz</h4>
                          <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 text-[10px] px-1.5 py-0">
                            Frontend Dev
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          18/20 Correct • 14 mins • 4 Advanced Badges Earned
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-sm text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        88% Score
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-1">3 days ago</p>
                    </div>
                  </div>

                  {/* Record 3 */}
                  <div className="p-3.5 rounded-xl border border-border/80 bg-card hover:bg-muted/40 transition-colors flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm truncate">Python, AI & Machine Learning Foundations</h4>
                          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] px-1.5 py-0">
                            AI & Data
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          24/25 Correct • 20 mins • Distinction Certification
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-sm text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                        96% Top 🔥
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-1">5 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Milestones & Achievements */}
          <Card className="border-primary/10 hover:border-primary/30 transition-all rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="font-display flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Skill Milestones
                  </span>
                  <Badge variant="outline" className="text-xs text-primary border-primary/30">
                    13 Tracked
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Visual Status Overview */}
                <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Overall Skill Proficiency</span>
                    <span className="text-emerald-500 font-bold">78% Ready</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: '61.5%' }} title="Mastered (8)" />
                    <div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: '38.5%' }} title="In Progress (5)" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> 8 Mastered (100%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" /> 5 In Progress (50-85%)
                    </span>
                  </div>
                </div>

                {/* 3 Presentation-Ready Milestone Progress Items */}
                <div className="space-y-3 pt-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Key Competency Progress (3 Milestones)
                  </span>

                  {/* Milestone 1 */}
                  <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-foreground">Frontend Architecture & React</span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                        100% Mastered
                      </span>
                    </div>
                    <div className="h-2 w-full bg-emerald-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-full" />
                    </div>
                    <p className="text-[11px] text-muted-foreground">14 Projects & Code Challenges Completed</p>
                  </div>

                  {/* Milestone 2 */}
                  <div className="p-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-foreground">Data Structures & Problem Solving</span>
                      <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-md">
                        82% Advanced
                      </span>
                    </div>
                    <div className="h-2 w-full bg-cyan-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[82%]" />
                    </div>
                    <p className="text-[11px] text-muted-foreground">85 / 100 LeetCode & Campus Problems Solved</p>
                  </div>

                  {/* Milestone 3 */}
                  <div className="p-3 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-foreground">Backend Systems & REST APIs</span>
                      <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/15 px-2 py-0.5 rounded-md">
                        68% Intermediate
                      </span>
                    </div>
                    <div className="h-2 w-full bg-purple-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-[68%]" />
                    </div>
                    <p className="text-[11px] text-muted-foreground">7 / 10 Modules & Schema Tests Passed</p>
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="p-4 pt-0">
              <Button
                type="button"
                onClick={() => setShowSkillMilestonesModal(true)}
                variant="outline"
                size="sm"
                className="w-full text-xs rounded-xl border-primary/20 hover:bg-primary/5 hover:border-primary/40 font-semibold transition-all group"
              >
                <Target className="w-3.5 h-3.5 mr-1.5 text-primary group-hover:scale-110 transition-transform" />
                View All Skill Milestones
              </Button>
            </div>
          </Card>
        </div>

        {/* Skill Completion */}
        <Card className="border-primary/10 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Skill Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {mockSkillProgress.map((s) => (
                <div key={s.skill}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium">{s.skill}</span>
                    <span className={`text-xs font-bold ${s.completed >= 70 ? 'text-green-600 dark:text-green-400' : s.completed >= 40 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-500'}`}>
                      {s.completed}%
                    </span>
                  </div>
                  <Progress value={s.completed} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Calendar */}
        <Card className="border-primary/10 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> Activity Heatmap — Last 35 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityCalendar />
          </CardContent>
        </Card>

        {/* Achievements & Badges */}
        <Card className="border-primary/10 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" /> Achievements & Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-sm font-semibold mb-3 text-green-600 dark:text-green-400">✅ Earned ({earnedBadges.length})</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {earnedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`relative p-3 rounded-xl bg-gradient-to-br ${badge.color} border border-white/20 text-center group hover:scale-105 transition-all cursor-pointer`}
                    title={badge.description}
                  >
                    <div className="text-3xl mb-1.5">{badge.icon}</div>
                    <div className="text-xs font-bold text-white leading-tight">{badge.title}</div>
                    <div className="text-xs text-white/70 mt-0.5">{badge.requirement}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold mb-3 text-muted-foreground">🔒 Locked ({lockedBadges.length})</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {lockedBadges.slice(0, 6).map((badge) => (
                  <div
                    key={badge.id}
                    className="relative p-3 rounded-xl bg-muted/30 border border-border text-center opacity-50 cursor-not-allowed"
                    title={badge.requirement}
                  >
                    <div className="text-3xl mb-1.5 grayscale">{badge.icon}</div>
                    <div className="text-xs font-bold leading-tight">{badge.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{badge.requirement}</div>
                    <Lock className="h-3 w-3 absolute top-2 right-2 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions & Plan */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-primary/10 bg-gradient-to-br from-primary/3 to-violet-500/3">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" /> AI Learning Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-background/60 border border-border text-sm">
                  <span className="shrink-0 mt-0.5">{s.slice(0, 2)}</span>
                  <span className="text-muted-foreground">{s.slice(2)}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> AI Weekly Learning Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {weeklyPlan.slice(0, 5).map((plan, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-12 text-xs font-bold text-primary shrink-0 mt-0.5">{plan.day.slice(0, 3)}</div>
                  <div className="flex-1 min-w-0">
                    {plan.tasks.map((task, j) => (
                      <div key={j} className="text-xs text-muted-foreground">{task}</div>
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{plan.estimatedTime}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Active Learning Path */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Active Learning Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {learningPath.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-lg border bg-muted/30 hover:bg-primary/5 transition-colors"
                >
                  {item.status === 'done' ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  ) : item.status === 'progress' ? (
                    <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1">
                    <div
                      className={
                        item.status === 'done'
                          ? 'text-muted-foreground line-through text-sm font-medium'
                          : 'text-sm font-medium'
                      }
                    >
                      {item.topic}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* EduMart Marketplace Shortcut */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-cyan-500" />
                EduMart Activity & Saved Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: 'Casio fx-991EX Calculator', price: '₹750', seller: 'Priya S.', status: 'Saved in Wishlist' },
                { title: 'Digital Electronics Lab Kit', price: '₹1,200', seller: 'Amit R.', status: 'In Cart' },
                { title: 'Let Us C Textbook (16th Ed)', price: '₹200', seller: 'Rahul V.', status: 'Purchased' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border bg-card">
                  <div>
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.seller} • {item.status}</div>
                  </div>
                  <Badge className="bg-cyan-500/10 text-cyan-600 border-cyan-500/30">
                    {item.price}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full border-primary/30 rounded-xl mt-2" asChild>
                <Link href="/edumart">
                  Explore All EduMart Gear <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Interactive Quiz History Modal */}
      <QuizHistoryModal
        isOpen={showQuizHistoryModal}
        onClose={() => setShowQuizHistoryModal(false)}
      />

      {/* Interactive Complete 20 Skill Milestones Modal */}
      <SkillMilestonesModal
        isOpen={showSkillMilestonesModal}
        onClose={() => setShowSkillMilestonesModal(false)}
      />
    </div>
  );
}
