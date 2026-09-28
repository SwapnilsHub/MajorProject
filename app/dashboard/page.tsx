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
  const [educationLevel, setEducationLevel] = React.useState('undergraduate');
  const [targetDomain, setTargetDomain] = React.useState('AI & Machine Learning');
  const [bio, setBio] = React.useState('');
  const [githubUrl, setGithubUrl] = React.useState('');
  const [linkedinUrl, setLinkedinUrl] = React.useState('');
  const [portfolioUrl, setPortfolioUrl] = React.useState('');
  
  const [saving, setSaving] = React.useState(false);
  const [savedSuccess, setSavedSuccess] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [activeEditTab, setActiveEditTab] = React.useState<'personal' | 'academic' | 'links'>('personal');

  // Initialize student profile from auth user metadata
  React.useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      setFullName(meta.full_name || user.email?.split('@')[0] || 'Student');
      setEmail(user.email || '');
      setPhone(meta.phone || '+91 98765 43210');
      setCollege(meta.college || 'COEP Technological University');
      setCity(meta.city || 'Pune');
      setEducationLevel(meta.education_level || 'undergraduate');
      setTargetDomain(meta.target_domain || 'AI & Machine Learning');
      setBio(meta.bio || 'Computer Science student passionate about AI, Machine Learning, and Full-Stack Engineering.');
      setGithubUrl(meta.github_url || 'https://github.com');
      setLinkedinUrl(meta.linkedin_url || 'https://linkedin.com');
      setPortfolioUrl(meta.portfolio_url || 'https://edugram.in');
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const { error } = await supabase.auth.updateUser({
        email: email !== user?.email ? email : undefined,
        data: {
          full_name: fullName,
          phone: phone,
          college: college,
          city: city,
          education_level: educationLevel,
          target_domain: targetDomain,
          bio: bio,
          github_url: githubUrl,
          linkedin_url: linkedinUrl,
          portfolio_url: portfolioUrl,
        },
      });

      if (!error) {
        setSavedSuccess(true);
        setTimeout(() => {
          setSavedSuccess(false);
          setShowEditModal(false);
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSaving(false);
    }
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
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* STUDENT PROFILE HEADER HERO CARD */}
        <Card className="border-primary/20 bg-gradient-to-br from-card/95 via-card/60 to-primary/10 mb-8 shadow-xl overflow-hidden rounded-3xl">
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
                    <span className="flex items-center gap-1.5 capitalize font-medium text-primary">
                      <BookOpen className="h-3.5 w-3.5" /> {educationLevel}
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
                    onClick={() => setShowEditModal(true)}
                    className="bg-gradient-brand text-white shadow-lg rounded-xl h-11 px-5 font-semibold text-sm flex-1 sm:flex-initial"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
            <div className="bg-card border border-primary/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-scale-in">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
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
                            <SelectItem value="10th">10th Class</SelectItem>
                            <SelectItem value="12th">12th Science / Commerce / Arts</SelectItem>
                            <SelectItem value="diploma">Diploma Student</SelectItem>
                            <SelectItem value="undergraduate">Undergraduate (B.Tech / B.Sc / BCA)</SelectItem>
                            <SelectItem value="postgraduate">Postgraduate (M.Tech / MBA / MCA)</SelectItem>
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

                {savedSuccess && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium border border-green-500/20">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> Student profile saved successfully!
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-3 border-t">
                  <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving} className="bg-gradient-brand text-white rounded-xl px-6">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Profile Changes
                  </Button>
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
          {/* Progress chart */}
          <Card className="lg:col-span-2 border-primary/10">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Learning Activity & Quizzes (2026)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--chart-1))', r: 4 }}
                    name="Study Hours"
                  />
                  <Line
                    type="monotone"
                    dataKey="quizzes"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    name="Quizzes Completed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skill Distribution */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Skill Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={skillData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {skillData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
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
    </div>
  );
}
