'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  X,
  Award,
  Target,
  CheckCircle2,
  TrendingUp,
  Search,
  Sparkles,
  ArrowRight,
  Code2,
  Layers,
  Database,
  Server,
  Cloud,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export interface SkillMilestone {
  id: string;
  name: string;
  domain: string;
  category: 'frontend' | 'backend' | 'dsa' | 'cloud';
  status: 'mastered' | 'progress';
  progress: number;
  completedTasks: string;
  levelLabel: string;
  badge?: string;
}

const mockSkillMilestones: SkillMilestone[] = [
  // 8 MASTERED (100%)
  {
    id: 'm-1',
    name: 'Frontend Architecture & React',
    domain: 'Frontend Engineering',
    category: 'frontend',
    status: 'mastered',
    progress: 100,
    completedTasks: '14 Projects & Code Challenges Completed',
    levelLabel: 'Mastered',
    badge: 'Pro Tier',
  },
  {
    id: 'm-2',
    name: 'Python Core & OOP Mastery',
    domain: 'Software Foundations',
    category: 'dsa',
    status: 'mastered',
    progress: 100,
    completedTasks: '12 Mini-projects & Algorithmic Scripts',
    levelLabel: 'Mastered',
  },
  {
    id: 'm-3',
    name: 'SQL & Relational Schema Design',
    domain: 'Databases',
    category: 'backend',
    status: 'mastered',
    progress: 100,
    completedTasks: '10 Complex Database Normalization Projects',
    levelLabel: 'Mastered',
    badge: 'Database Lead',
  },
  {
    id: 'm-4',
    name: 'Git, GitHub & Version Workflows',
    domain: 'Development Tools',
    category: 'cloud',
    status: 'mastered',
    progress: 100,
    completedTasks: '45 Merged Pull Requests & CI Configs',
    levelLabel: 'Mastered',
  },
  {
    id: 'm-5',
    name: 'HTML5, Modern CSS & Tailwind',
    domain: 'Frontend Engineering',
    category: 'frontend',
    status: 'mastered',
    progress: 100,
    completedTasks: '20 High-fidelity Responsive Layouts',
    levelLabel: 'Mastered',
  },
  {
    id: 'm-6',
    name: 'Next.js App Router & SSR Architecture',
    domain: 'Full-Stack Web',
    category: 'frontend',
    status: 'mastered',
    progress: 100,
    completedTasks: '6 Production-Ready Server-Side Apps',
    levelLabel: 'Mastered',
    badge: 'Campus Top 3%',
  },
  {
    id: 'm-7',
    name: 'Responsive UI/UX & Web Accessibility',
    domain: 'Design Systems',
    category: 'frontend',
    status: 'mastered',
    progress: 100,
    completedTasks: 'WCAG 2.1 AA Compliance Certified',
    levelLabel: 'Mastered',
  },
  {
    id: 'm-8',
    name: 'RESTful API Design & HTTP Protocols',
    domain: 'Backend Engineering',
    category: 'backend',
    status: 'mastered',
    progress: 100,
    completedTasks: '16 REST Endpoints & OpenAPI Documentation',
    levelLabel: 'Mastered',
  },

  // 5 IN PROGRESS
  {
    id: 'm-9',
    name: 'Data Structures & Problem Solving',
    domain: 'Core Computer Science',
    category: 'dsa',
    status: 'progress',
    progress: 82,
    completedTasks: '85 / 100 LeetCode & Campus Problems Solved',
    levelLabel: '82% Advanced',
    badge: 'Top Streak',
  },
  {
    id: 'm-10',
    name: 'Backend Systems & Serverless APIs',
    domain: 'Backend Engineering',
    category: 'backend',
    status: 'progress',
    progress: 68,
    completedTasks: '7 / 10 Modules & Schema Tests Passed',
    levelLabel: '68% Intermediate',
  },
  {
    id: 'm-11',
    name: 'TypeScript & Strict Type Safety',
    domain: 'Modern JavaScript',
    category: 'frontend',
    status: 'progress',
    progress: 75,
    completedTasks: '15 Type-Safe Repositories Configured',
    levelLabel: '75% Advanced',
  },
  {
    id: 'm-12',
    name: 'System Design & Scalability Patterns',
    domain: 'Systems Architecture',
    category: 'cloud',
    status: 'progress',
    progress: 60,
    completedTasks: '4 Large-Scale System Architectures Documented',
    levelLabel: '60% Intermediate',
  },
  {
    id: 'm-13',
    name: 'Docker Containerization & Compose',
    domain: 'DevOps & Infrastructure',
    category: 'cloud',
    status: 'progress',
    progress: 55,
    completedTasks: '8 Multi-Container Compose Stacks Configured',
    levelLabel: '55% Intermediate',
  },
];

interface SkillMilestonesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SkillMilestonesModal({ isOpen, onClose }: SkillMilestonesModalProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState<'all' | 'mastered' | 'progress'>('all');

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredMilestones = mockSkillMilestones.filter((m) => {
    const matchesStatus =
      selectedFilter === 'all' || m.status === selectedFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const masteredCount = mockSkillMilestones.filter((m) => m.status === 'mastered').length;
  const progressCount = mockSkillMilestones.filter((m) => m.status === 'progress').length;
  const totalCount = mockSkillMilestones.length;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="bg-card border border-primary/20 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[92vh] flex flex-col animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all hover:rotate-90 active:scale-90 z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 shrink-0">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Award className="h-4 w-4" /> Technical Competency Matrix
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl flex items-center gap-2.5">
            Skill Milestones
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-2.5 py-0.5 font-semibold">
              {totalCount} Active Competencies
            </Badge>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Active competency progress breakdown across Mastered and In Progress skills.
          </p>
        </div>

        {/* Dual-Segment Proficiency Bar (Mastered & In Progress only) */}
        <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-primary" /> Overall Technical Proficiency
            </span>
            <span className="text-emerald-500 font-bold text-sm">78% Campus Ready</span>
          </div>
          <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${(masteredCount / totalCount) * 100}%` }}
              title={`Mastered (${masteredCount})`}
            />
            <div
              className="bg-cyan-500 h-full transition-all duration-500"
              style={{ width: `${(progressCount / totalCount) * 100}%` }}
              title={`In Progress (${progressCount})`}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground pt-0.5">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <strong className="text-foreground">{masteredCount}</strong> Mastered (100%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <strong className="text-foreground">{progressCount}</strong> In Progress (50-85%)
            </span>
          </div>
        </div>

        {/* Search & Status Filter Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill by name or domain..."
              className="pl-10 h-10 rounded-xl text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide text-xs">
            {[
              { id: 'all', label: `All (${totalCount})` },
              { id: 'mastered', label: `Mastered (${masteredCount})` },
              { id: 'progress', label: `In Progress (${progressCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === tab.id
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Milestones Grid */}
        <div className="overflow-y-auto pr-1 space-y-3 flex-1 min-h-[240px]">
          {filteredMilestones.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredMilestones.map((milestone) => {
                const isMastered = milestone.status === 'mastered';

                return (
                  <div
                    key={milestone.id}
                    className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                      isMastered
                        ? 'border-emerald-500/25 bg-emerald-500/5 hover:border-emerald-500/50'
                        : 'border-cyan-500/25 bg-cyan-500/5 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-semibold text-xs sm:text-sm text-foreground truncate">
                            {milestone.name}
                          </h4>
                          {milestone.badge && (
                            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[9px] px-1.5 py-0">
                              {milestone.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{milestone.domain}</p>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 whitespace-nowrap ${
                          isMastered
                            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/15'
                            : 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/15'
                        }`}
                      >
                        {milestone.levelLabel}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isMastered
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        }`}
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                      <span className="truncate pr-2">{milestone.completedTasks}</span>
                      <span className="font-semibold text-foreground shrink-0">{milestone.progress}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm space-y-2">
              <p>No skill milestones matching &ldquo;{searchQuery}&rdquo;</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                className="text-xs rounded-xl"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t shrink-0">
          <p className="text-xs text-muted-foreground">
            Complete practical assignments & quizzes to level up your in-progress competencies.
          </p>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button variant="ghost" onClick={onClose} className="rounded-xl flex-1 sm:flex-initial">
              Close
            </Button>
            <Button className="bg-gradient-brand text-white rounded-xl shadow-lg flex-1 sm:flex-initial" asChild>
              <Link href="/domains">
                Explore Domains & Practice <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
