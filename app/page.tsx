'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Compass,
  GraduationCap,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Star,
  Users,
  Award,
  Target,
  Rocket,
  PlayCircle,
  Clapperboard,
  ClipboardCheck,
  ShoppingBag,
  Layers,
  Book,
  Calculator,
  Laptop,
  Flame,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/section-header';
import { AnimatedBg } from '@/components/animated-bg';
import { Card3D } from '@/components/card-3d';
import { stats, careers } from '@/lib/data';
import { motion } from 'framer-motion';

const heroFloatingIcons = [
  { icon: BookOpen, x: '8%', y: '22%', delay: '0s' },
  { icon: PlayCircle, x: '85%', y: '18%', delay: '1s' },
  { icon: ClipboardCheck, x: '12%', y: '68%', delay: '2s' },
  { icon: ShoppingBag, x: '80%', y: '65%', delay: '0.5s' },
  { icon: Layers, x: '50%', y: '12%', delay: '1.5s' },
  { icon: GraduationCap, x: '90%', y: '42%', delay: '2.5s' },
];

const ecosystemSections = [
  {
    icon: PlayCircle,
    title: 'Learn',
    badge: 'Videos & Reels',
    desc: 'Structured courses, bite-sized educational reels, and interactive video lessons to master any topic.',
    href: '/learn',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: ClipboardCheck,
    title: 'Practice',
    badge: 'Quizzes & MCQs',
    desc: 'Subject quizzes, timed MCQ challenges, instant explanations, and competitive leaderboards.',
    href: '/quiz',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: TrendingUp,
    title: 'Track',
    badge: 'Progress & Badges',
    desc: 'Monitor study hours, quiz accuracy, daily streaks, completion certificates, and achievements.',
    href: '/progress',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Layers,
    title: 'Build',
    badge: 'Project Roadmaps',
    desc: 'Step-by-step project recommendations, hands-on tutorials, and skill roadmaps.',
    href: '/projects',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Compass,
    title: 'Explore',
    badge: 'Careers & Colleges',
    desc: 'In-demand career paths, salary insights, skills needed, and top government & private colleges.',
    href: '/careers',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: ShoppingBag,
    title: 'Exchange',
    badge: 'EduMart Marketplace',
    desc: 'Buy and sell affordable second-hand textbooks, calculators, lab gear, and electronics.',
    href: '/edumart',
    color: 'from-cyan-500 to-blue-600',
  },
];

const edumartCategories = [
  { name: 'Second-Hand Textbooks', desc: 'Engineering, Medical, Commerce & School books', icon: Book },
  { name: 'Scientific Calculators', desc: 'Casio fx-991EX, fx-82MS & graphing calculators', icon: Calculator },
  { name: 'Lab & Engineering Tools', desc: 'Breadboards, Arduinos, Drafters & Geometry sets', icon: Layers },
  { name: 'Laptops & Gadgets', desc: 'Affordable study laptops, tablets & accessories', icon: Laptop },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' as const },
  }),
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-12">
        <AnimatedBg />

        {/* Floating icons */}
        {heroFloatingIcons.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              className="absolute hidden md:block"
              style={{ left: item.x, top: item.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.25, scale: 1 }}
              transition={{ delay: parseFloat(item.delay) + 0.8, duration: 0.5, type: 'spring' }}
            >
              <div
                className="animate-float-slow p-3 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm"
                style={{ animationDelay: item.delay }}
              >
                <Icon className="h-10 w-10 text-primary" />
              </div>
            </motion.div>
          );
        })}

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="bg-primary/5 border-primary/20 text-primary px-4 py-1.5 text-sm font-medium"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-cyan-500" />
                Your Digital Education Community
              </Badge>
            </motion.div>

            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              Learn. Share. <span className="text-gradient">Grow.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              EduGram brings learning, career development, educational resources, projects, and affordable study materials together in one platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="bg-gradient-brand text-white hover:opacity-90 shadow-glow text-base h-12 px-8 rounded-xl"
                  asChild
                >
                  <Link href="/domains">
                    Explore Domains
                    <Compass className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-12 px-8 border-primary/30 hover:bg-primary/5 rounded-xl flex items-center gap-2"
                  asChild
                >
                  <Link href="/edumart">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    Explore EduMart
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {['100% Student Focused', 'Interactive Video & Reels', 'Affordable EduMart Marketplace', '50,000+ Students'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {t}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Platform Stats ─── */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-brand-purple/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center space-y-1"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EduGram Education Ecosystem ─── */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            eyebrow="EduGram Ecosystem"
            title={
              <>
                Everything You Need to <span className="text-gradient">Learn & Succeed</span>
              </>
            }
            description="EduGram is more than a platform — it is a complete student community uniting education, practice, projects, and affordable resources."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemSections.map((sec, i) => {
              const Icon = sec.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Link href={sec.href}>
                    <Card3D intensity={10} className="h-full rounded-2xl">
                      <Card className="group h-full hover:shadow-glow transition-all border-primary/10 overflow-hidden relative rounded-2xl cursor-pointer">
                        <CardContent className="pt-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sec.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {sec.badge}
                            </Badge>
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-xl">{sec.title}</h3>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                              {sec.desc}
                            </p>
                          </div>
                          <div className="flex items-center text-sm font-semibold text-primary pt-2">
                            Explore {sec.title} <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Card3D>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── EduMart Marketplace Spotlight ─── */}
      <section className="py-20 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl border border-primary/20 bg-card/80 backdrop-blur-md p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-4 max-w-xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                    <ShoppingBag className="h-3.5 w-3.5" /> EduGram → EduMart
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-bold">
                    EduMart <span className="text-gradient-cyan">Marketplace</span>
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Buy and sell second-hand books, calculators, lab equipment, electronics, instruments and study materials at student-friendly prices.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                    <Button className="bg-gradient-cyan-blue text-white rounded-xl shadow-md" asChild>
                      <Link href="/edumart">
                        Browse EduMart <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-primary/30 rounded-xl" asChild>
                      <Link href="/edumart">Sell Study Gear</Link>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
                  {edumartCategories.map((cat, i) => {
                    const CatIcon = cat.icon;
                    return (
                      <div key={i} className="p-4 rounded-2xl border bg-background/60 backdrop-blur-sm space-y-2 hover:border-cyan-500/50 transition-colors">
                        <CatIcon className="h-6 w-6 text-cyan-500" />
                        <div className="font-semibold text-sm">{cat.name}</div>
                        <div className="text-xs text-muted-foreground">{cat.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Popular Careers ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            eyebrow="Career Guidance"
            title={
              <>
                Explore <span className="text-gradient">In-Demand</span> Careers
              </>
            }
            description="Discover career roadmaps, salary insights, and required skills for top modern industries."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careers.slice(0, 8).map((career, i) => {
              const Icon = career.icon;
              return (
                <motion.div
                  key={career.slug}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Link href={`/careers/${career.slug}`}>
                    <Card3D intensity={12} className="h-full rounded-2xl">
                      <Card className="group h-full hover:shadow-glow transition-all border-primary/10 cursor-pointer rounded-2xl">
                        <CardContent className="pt-6 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-primary/5 text-primary border-primary/20"
                            >
                              {career.demand}
                            </Badge>
                          </div>
                          <h3 className="font-display font-semibold">{career.title}</h3>
                          <p className="text-xs text-muted-foreground">{career.category}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                            <span className="font-medium">{career.salary}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Card3D>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Community Testimonials ─── */}
      <section className="py-20 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            eyebrow="Community Stories"
            title={
              <>
                Loved by <span className="text-gradient">Students</span> Across India
              </>
            }
            description="Real experiences from students learning, sharing, and trading study resources on EduGram."
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Priya Sharma',
                role: 'Engineering Student, COEP',
                text: 'EduGram reels and quizzes helped me quickly revise concepts before exams, and I bought my Casio calculator on EduMart at half price!',
                rating: 5,
              },
              {
                name: 'Rahul Verma',
                role: 'B.Sc Computer Science',
                text: 'The project recommendations guided me step-by-step to build my first AI project. The community aspect is super encouraging.',
                rating: 5,
              },
              {
                name: 'Sneha Patel',
                role: 'Medical Student',
                text: 'EduMart let me sell my 1st year medical textbooks to juniors smoothly. EduGram is the ultimate digital student community!',
                rating: 5,
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card3D intensity={8} className="h-full rounded-2xl">
                  <Card className="h-full border-primary/10 hover:shadow-glow transition-all rounded-2xl">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-2 border-t">
                        <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-semibold">
                          {t.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{t.name}</div>
                          <div className="text-xs text-muted-foreground">{t.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Call to Action ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-3xl bg-gradient-brand p-12 md:p-16 text-center overflow-hidden animate-gradient">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              <div className="relative z-10 space-y-6 max-w-2xl mx-auto text-white">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                  <Users className="h-12 w-12 mx-auto opacity-90" />
                </motion.div>
                <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                  Ready to Join EduGram?
                </h2>
                <p className="text-lg opacity-90">
                  Join 50,000+ students who learn, practice, build projects, and exchange affordable study gear together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="text-base h-12 px-8 bg-white text-primary hover:bg-white/90 rounded-xl"
                      asChild
                    >
                      <Link href="/register">
                        Join EduGram Community
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-base h-12 px-8 border-white text-white hover:bg-white/10 rounded-xl"
                      asChild
                    >
                      <Link href="/domains">Explore Domains</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
