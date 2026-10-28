'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Building2,
  MapPin,
  BookOpen,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Sparkles,
  Zap,
  Target,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ThreeCanvas } from '@/components/three-canvas';
import { Card3D } from '@/components/card-3d';
import { supabase } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

const floatingFeatures = [
  { icon: Sparkles, label: 'Video Courses & Tutorials', color: 'from-blue-500 to-cyan-600', delay: 0 },
  { icon: Zap, label: 'Interactive Quizzes', color: 'from-purple-500 to-indigo-600', delay: 0.3 },
  { icon: Target, label: 'Project Roadmaps', color: 'from-emerald-500 to-teal-600', delay: 0.6 },
  { icon: ShoppingBag, label: 'EduMart Second-Hand Market', color: 'from-amber-500 to-rose-600', delay: 0.9 },
];

function PasswordStrength({ password }: { password: string }) {
  const strength = React.useMemo(() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  }, [password]);

  const label = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength];
  const colors = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-emerald-500'];

  if (!password) return null;
  return (
    <div className="space-y-1 mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= strength ? colors[strength] : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${
        strength <= 1 ? 'text-red-500' : strength <= 3 ? 'text-yellow-500' : 'text-green-500'
      }`}>
        {label} password
      </p>
    </div>
  );
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [college, setCollege] = React.useState('');
  const [city, setCity] = React.useState('');
  const [educationLevel, setEducationLevel] = React.useState('Undergraduate (B.E / B.Tech)');
  const [agreed, setAgreed] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedCollege = college.trim() || 'COEP Technological University';
    const trimmedCity = city.trim() || 'Pune';
    const selectedEducation = educationLevel || 'Undergraduate (B.E / B.Tech)';

    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }
    if (!trimmedEmail) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!agreed) {
      setError('Please accept the Terms and Privacy Policy to continue.');
      return;
    }

    setLoading(true);

    // 1. Clear any old user session/profile from previous sessions
    try {
      localStorage.removeItem('edugram_user_profile');
      localStorage.removeItem('edugram_auth_user');
    } catch (e) {}

    // 2. Set newly registered credentials as the active student profile
    const freshProfile = {
      fullName: trimmedName,
      email: trimmedEmail,
      college: trimmedCollege,
      city: trimmedCity,
      educationLevel: selectedEducation,
      phone: '+91 98765 43210',
      targetDomain: 'AI & Machine Learning',
      bio: `Undergraduate student in ${selectedEducation} at ${trimmedCollege}. Passionate about technology, coding, and innovation.`,
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      portfolioUrl: '',
      registeredAt: new Date().toISOString(),
    };

    const newAuthUser = {
      id: 'user-' + Date.now(),
      email: trimmedEmail,
      name: trimmedName,
      college: trimmedCollege,
      city: trimmedCity,
      educationLevel: selectedEducation,
    };

    try {
      localStorage.setItem('edugram_user_profile', JSON.stringify(freshProfile));
      localStorage.setItem('edugram_auth_user', JSON.stringify(newAuthUser));
      window.dispatchEvent(new CustomEvent('edugram:profile_updated', { detail: freshProfile }));
    } catch (e) {
      console.warn('LocalStorage save notice:', e);
    }

    // 3. Register with Supabase and attempt immediate session creation
    try {
      await supabase.auth.signOut().catch(() => {});
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            full_name: trimmedName,
            college: trimmedCollege,
            city: trimmedCity,
            education_level: selectedEducation,
          },
        },
      });

      // If auto-confirmation enabled or session returned, attempt sign-in
      if (!data?.session) {
        await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        }).catch(() => {});
      }
    } catch (authErr) {
      console.warn('Supabase registration sync notice:', authErr);
    }

    setLoading(false);
    setSuccess(true);
    if (typeof window !== 'undefined') {
      window.location.assign('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      <ThreeCanvas />

      {/* Ambient gradient overlays */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      </div>

      {/* Floating Feature Badges */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {floatingFeatures.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={i}
              className={`absolute bg-gradient-to-br ${feat.color} rounded-2xl p-3 shadow-2xl`}
              style={{
                left: i % 2 === 0 ? '6%' : '78%',
                top: `${20 + i * 18}%`,
              }}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -12, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: feat.delay + 0.5 },
                scale: { duration: 0.5, delay: feat.delay + 0.5 },
                y: {
                  repeat: Infinity,
                  duration: 3 + i * 0.5,
                  ease: 'easeInOut',
                  delay: feat.delay + 1,
                },
              }}
            >
              <div className="flex items-center gap-2 text-white">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-xs font-semibold whitespace-nowrap">{feat.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Form */}
      <motion.div
        className="w-full max-w-lg relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
              </div>
              <span className="font-display font-bold text-2xl text-gradient">EduGram</span>
            </Link>
          </motion.div>

          <motion.h1
            className="font-display text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Join the EduGram Community
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-2 text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Connect, learn, share, and trade study materials with students ✨
          </motion.p>
        </div>

        {/* 3D Glassmorphic Card */}
        <Card3D intensity={12} glare className="rounded-3xl">
          <div
            className="rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
            style={{
              background: 'hsl(var(--card) / 0.7)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 0 60px -10px rgba(59, 130, 246, 0.3), 0 4px 30px rgba(0,0,0,0.15)',
            }}
          >
            {/* Card header gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />

            <div className="p-8 space-y-5">
              {/* Error / Success states */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Welcome to EduGram! Taking you to your dashboard...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Patil"
                      className="pl-11 h-11 rounded-xl border-border/60 bg-background/50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-11 h-11 rounded-xl border-border/60 bg-background/50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="pl-11 pr-12 h-11 rounded-xl border-border/60 bg-background/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <PasswordStrength password={password} />
                </div>

                {/* College & City Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold">College / School</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="COEP / IIT / VIT"
                        className="pl-10 h-11 rounded-xl border-border/60 bg-background/50 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold">City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Pune / Mumbai"
                        className="pl-10 h-11 rounded-xl border-border/60 bg-background/50 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Education Level */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold">Education Level</Label>
                  <Select value={educationLevel} onValueChange={setEducationLevel}>
                    <SelectTrigger className="h-11 rounded-xl border-border/60 bg-background/50">
                      <SelectValue placeholder="Select Education Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Undergraduate (B.E / B.Tech)">Undergraduate (B.E / B.Tech)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-3 text-sm pt-1">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor="terms"
                      className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border-2 transition-all duration-200 ${
                        agreed
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-border hover:border-blue-400'
                      }`}
                    >
                      {agreed && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-3 w-3 text-white"
                          viewBox="0 0 12 10"
                          fill="none"
                        >
                          <path
                            d="M1 5L4.5 8.5L11 1.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      )}
                    </label>
                  </div>
                  <span className="text-muted-foreground leading-snug text-xs">
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-500 hover:text-blue-400 font-medium hover:underline transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-blue-500 hover:text-blue-400 font-medium hover:underline transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </div>

                {/* Submit button */}
                <motion.div
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={loading || success}
                    className="w-full h-12 rounded-xl text-base font-semibold text-white shadow-lg relative overflow-hidden group mt-2"
                    style={{
                      background: 'linear-gradient(135deg, #2563eb, #7c3aed, #06b6d4)',
                      backgroundSize: '200% 200%',
                    }}
                    size="lg"
                  >
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Joining EduGram...
                      </span>
                    ) : success ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Account Created!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Join EduGram Community
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Sign in link */}
              <p className="text-center text-sm text-muted-foreground pt-2">
                Already have an EduGram account?{' '}
                <Link
                  href="/login"
                  className="text-blue-500 hover:text-blue-400 font-semibold hover:underline transition-colors"
                >
                  Sign in →
                </Link>
              </p>
            </div>
          </div>
        </Card3D>
      </motion.div>
    </div>
  );
}
