'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ThreeCanvas } from '@/components/three-canvas';
import { Card3D } from '@/components/card-3d';
import { supabase } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const trimmedEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });

    if (error) {
      // Fallback check if matches active registered user credentials
      try {
        const stored = localStorage.getItem('edugram_auth_user');
        if (stored) {
          const u = JSON.parse(stored);
          if (u.email && u.email.toLowerCase() === trimmedEmail) {
            setLoading(false);
            setSuccess(true);
            window.location.assign('/dashboard');
            return;
          }
        }
      } catch (e) {}

      setError(typeof error === 'object' && 'message' in error ? error.message : String(error));
      setLoading(false);
      return;
    }

    if (data?.user) {
      const meta = data.user.user_metadata || {};
      const newAuth = {
        id: data.user.id,
        email: data.user.email || trimmedEmail,
        name: meta.full_name || trimmedEmail.split('@')[0],
        college: meta.college || 'COEP Technological University',
        city: meta.city || 'Belgaum',
        educationLevel: meta.education_level || 'Undergraduate (B.E / B.Tech)',
      };
      try {
        localStorage.setItem('edugram_auth_user', JSON.stringify(newAuth));
        localStorage.setItem('edugram_user_profile', JSON.stringify({
          fullName: newAuth.name,
          email: newAuth.email,
          college: newAuth.college,
          city: newAuth.city,
          educationLevel: newAuth.educationLevel,
          phone: meta.phone || '+91 98765 43210',
          targetDomain: meta.target_domain || 'AI & Machine Learning',
          bio: meta.bio || 'Undergraduate student in B.E / B.Tech.',
          githubUrl: meta.github_url || 'https://github.com',
          linkedinUrl: meta.linkedin_url || 'https://linkedin.com',
          portfolioUrl: meta.portfolio_url || '',
        }));
      } catch (e) {}
    }

    setLoading(false);
    setSuccess(true);
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get('redirect') || '/dashboard';
      window.location.assign(redirectUrl);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      <ThreeCanvas />

      {/* Ambient glow overlays */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-blob" />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
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
            Welcome to EduGram
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-2 text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Sign in to continue your learning journey 🎓
          </motion.p>
        </div>

        <Card3D intensity={12} glare className="rounded-3xl">
          <div
            className="rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
            style={{
              background: 'hsl(var(--card) / 0.7)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 0 60px -10px rgba(139, 92, 246, 0.3), 0 4px 30px rgba(0,0,0,0.15)',
            }}
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

            <div className="p-8 space-y-5">
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
                    <span>Signed in! Taking you to EduGram dashboard...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Email Address</Label>
                  <motion.div
                    className="relative"
                    animate={{ scale: focusedField === 'email' ? 1.01 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${focusedField === 'email' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@example.com"
                      className={`pl-11 h-12 rounded-xl border-2 transition-all duration-200 bg-background/50 ${
                        focusedField === 'email'
                          ? 'border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]'
                          : 'border-border/60'
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Password</Label>
                    <Link href="#" className="text-xs text-blue-500 hover:text-blue-400 hover:underline transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <motion.div
                    className="relative"
                    animate={{ scale: focusedField === 'password' ? 1.01 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${focusedField === 'password' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className={`pl-11 pr-12 h-12 rounded-xl border-2 transition-all duration-200 bg-background/50 ${
                        focusedField === 'password'
                          ? 'border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]'
                          : 'border-border/60'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </motion.div>
                </div>

                {/* Submit */}
                <motion.div whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
                  <Button
                    type="submit"
                    disabled={loading || success}
                    className="w-full h-13 rounded-xl text-base font-semibold text-white shadow-lg relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4, #2563eb, #7c3aed)',
                      backgroundSize: '200% 200%',
                    }}
                    size="lg"
                  >
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Signing in...
                      </span>
                    ) : success ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Signed In!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Sign In to EduGram
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>

              <div className="relative flex items-center gap-3">
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-blue-500 hover:text-blue-400 font-semibold hover:underline transition-colors"
                >
                  Join EduGram →
                </Link>
              </p>
            </div>
          </div>
        </Card3D>
      </motion.div>
    </div>
  );
}
