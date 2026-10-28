'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Search,
  TrendingUp,
  Briefcase,
  ArrowRight,
  Compass,
  Layers,
  Sparkles,
  CheckCircle2,
  Target,
  Check,
  Star,
  Zap,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SectionHeader } from '@/components/section-header';
import { AnimatedBg } from '@/components/animated-bg';
import { careers, jobs, type Career } from '@/lib/data';
import { projects } from '@/lib/project-data';
import {
  getSelectedDomain,
  setSelectedDomain,
  isProjectMatchingDomain,
  isJobMatchingDomain,
  DEFAULT_DOMAIN,
} from '@/lib/domain-selection';

const categories = [
  'All',
  'AI & Machine Learning',
  'Data & Analytics',
  'Software Development',
  'Cyber Security',
  'Cloud Computing',
  'Design',
  'Marketing',
  'Emerging Tech',
  'Government Jobs',
  'Medical',
  'Law',
  'Commerce',
  'Management',
  'Agriculture',
];

export default function DomainsPage() {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const [selectedDomain, setLocalSelectedDomain] = React.useState(DEFAULT_DOMAIN);
  const [showCelebrationToast, setShowCelebrationToast] = React.useState(false);
  const [toastDomainName, setToastDomainName] = React.useState('');

  // Load user's chosen domain on mount and listen for real-time updates
  React.useEffect(() => {
    setLocalSelectedDomain(getSelectedDomain());

    const handleDomainChange = (e: any) => {
      if (e.detail?.domain) {
        setLocalSelectedDomain(e.detail.domain);
      }
    };

    window.addEventListener('edugram:domain_selected', handleDomainChange);
    return () => window.removeEventListener('edugram:domain_selected', handleDomainChange);
  }, []);

  const handleChooseDomain = (career: Career, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDomain(career.title, career.category);
    setLocalSelectedDomain(career.title);
    setToastDomainName(career.title);
    setShowCelebrationToast(true);
    setTimeout(() => setShowCelebrationToast(false), 3800);
  };

  // Compute live recommendation counts for current chosen domain
  const matchingProjectsCount = React.useMemo(() => {
    return projects.filter((p) => isProjectMatchingDomain(p, selectedDomain)).length;
  }, [selectedDomain]);

  const matchingJobsCount = React.useMemo(() => {
    return jobs.filter((j) => isJobMatchingDomain(j, selectedDomain)).length;
  }, [selectedDomain]);

  const filtered = careers.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === 'All' || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />

      {/* FLOATING CELEBRATORY TOAST */}
      {showCelebrationToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] max-w-lg w-[92vw] sm:w-auto animate-slide-up pointer-events-auto">
          <div className="relative group overflow-hidden flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-card/95 border border-primary/40 shadow-[0_12px_45px_rgba(59,130,246,0.35)] backdrop-blur-2xl text-foreground">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-cyan-500/20 to-purple-500/10 animate-shimmer pointer-events-none" />
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-cyan-400 text-white shrink-0 shadow-lg shadow-primary/30">
              <Sparkles className="w-5 h-5 animate-spin-glow" />
            </div>
            <div className="relative space-y-0.5 pr-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-foreground">
                  Professional Domain Updated!
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Set to <strong>{toastDomainName}</strong>. Tailored projects, quizzes & jobs are now personalized for you.
              </p>
            </div>
            <button
              onClick={() => setShowCelebrationToast(false)}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground ml-2 px-1 py-0.5"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <SectionHeader
          eyebrow="Domains & Career Specialization"
          title={
            <>
              Choose Your <span className="text-gradient">Professional Career Domain</span>
            </>
          }
          description="Select your primary career domain. EduGram uses your domain choice to intelligently recommend hands-on projects, industry certifications, and matching internships."
        />

        {/* HERO: ACTIVE CAREER DOMAIN & PERSONALIZED INSIGHTS */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-card/95 via-card/70 to-primary/15 border border-primary/25 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Active Career Specialization
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                My Primary Domain:{' '}
                <span className="text-gradient">{selectedDomain}</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Your projects, assessments, and job recommendations are dynamically tailored to this domain. You can switch your domain at any time below.
              </p>

              {/* Dynamic metric indicators */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card border border-border/80 shadow-xs font-medium">
                  <Layers className="w-4 h-4 text-cyan-500" />
                  <span>
                    <strong>{matchingProjectsCount}</strong> Curated Projects Ready
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card border border-border/80 shadow-xs font-medium">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>
                    <strong>{matchingJobsCount}</strong> Matching Jobs & Internships
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>94% High Industry Relevance</span>
                </div>
              </div>
            </div>

            {/* Direct CTA shortcuts */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto shrink-0 pt-2 lg:pt-0">
              <Button
                asChild
                className="bg-gradient-brand text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 h-11 px-5 text-xs font-semibold"
              >
                <Link href={`/projects?domain=${encodeURIComponent(selectedDomain)}`}>
                  <Layers className="w-4 h-4 mr-2" />
                  View Recommended Projects ({matchingProjectsCount})
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary/30 rounded-xl h-11 px-5 text-xs font-semibold hover:bg-primary/5"
              >
                <Link href={`/jobs?domain=${encodeURIComponent(selectedDomain)}`}>
                  <Briefcase className="w-4 h-4 mr-2 text-primary" />
                  View Curated Jobs & Internships ({matchingJobsCount})
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Ribbon */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search career domains, skills, technologies..."
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="sm:w-56 h-11 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* DOMAINS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((career) => {
            const Icon = career.icon;
            const isSelected =
              selectedDomain.toLowerCase() === career.title.toLowerCase() ||
              selectedDomain.toLowerCase() === career.category.toLowerCase();

            return (
              <div key={career.slug} className="flex">
                <Card
                  className={`group w-full flex flex-col justify-between transition-all duration-300 rounded-3xl overflow-hidden ${
                    isSelected
                      ? 'border-2 border-primary bg-gradient-to-br from-card via-card to-primary/10 shadow-[0_0_35px_rgba(59,130,246,0.25)] ring-2 ring-primary/40'
                      : 'border-border/80 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 bg-card'
                  }`}
                >
                  <CardContent className="p-6 space-y-4 flex flex-col flex-1">
                    {/* Top status & icons */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-md ${
                          isSelected
                            ? 'bg-gradient-brand text-white ring-2 ring-primary/40'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <Badge className="bg-primary text-primary-foreground font-semibold text-[10px] px-2 py-0.5 shadow-xs">
                            ★ Active Focus
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={
                            career.demand === 'Very High'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                              : career.demand === 'High'
                              ? 'bg-blue-500/10 text-blue-600 border-blue-500/30'
                              : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30'
                          }
                        >
                          {career.demand} Demand
                        </Badge>
                      </div>
                    </div>

                    {/* Title & Category */}
                    <div>
                      <Link href={`/domains/${career.slug}`}>
                        <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors cursor-pointer">
                          {career.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{career.category}</p>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {career.overview}
                    </p>

                    {/* Salary & Growth stats */}
                    <div className="flex items-center justify-between text-xs pt-3 border-t">
                      <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {career.salary}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Briefcase className="h-3.5 w-3.5 text-primary" />
                        {career.growth}
                      </span>
                    </div>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {career.skills.slice(0, 4).map((s) => (
                        <Badge key={s} variant="secondary" className="text-[10px] font-medium px-2 py-0.5">
                          {s}
                        </Badge>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2 pt-2 mt-auto">
                      {isSelected ? (
                        <div className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-primary/15 text-primary text-xs font-bold border border-primary/30">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span>Selected Professional Domain</span>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          size="sm"
                          onClick={(e) => handleChooseDomain(career, e)}
                          className="w-full text-xs font-semibold rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 transition-all shadow-xs"
                        >
                          <Target className="w-3.5 h-3.5 mr-1.5" />
                          Set as My Professional Domain
                        </Button>
                      )}

                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs text-muted-foreground hover:text-foreground justify-between"
                      >
                        <Link href={`/domains/${career.slug}`}>
                          <span>View Domain Roadmap & Courses</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-sm">
            No domains found. Try a different search keyword or category filter.
          </div>
        )}
      </div>
    </div>
  );
}
