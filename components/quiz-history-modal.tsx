'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  X,
  TrendingUp,
  History,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  Brain,
  Code2,
  Trophy,
  Award,
  ArrowRight,
  BookOpen,
  Calendar,
  Flame,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export interface QuizHistoryItem {
  id: string;
  title: string;
  domain: string;
  category: 'dsa' | 'frontend' | 'backend' | 'ai' | 'systems';
  score: number;
  correct: number;
  totalQuestions: number;
  durationMinutes: number;
  date: string;
  timeAgo: string;
  badge?: string;
  rank?: string;
}

const mockQuizHistory: QuizHistoryItem[] = [
  {
    id: 'quiz-1',
    title: 'Data Structures & Algorithms MCQ Challenge',
    domain: 'Algorithms & DSA',
    category: 'dsa',
    score: 92,
    correct: 23,
    totalQuestions: 25,
    durationMinutes: 18,
    date: 'Oct 27, 2026',
    timeAgo: 'Yesterday, 4:30 PM',
    rank: 'Rank #4 in College',
  },
  {
    id: 'quiz-2',
    title: 'Full-Stack React & Next.js Architecture Quiz',
    domain: 'Frontend Dev',
    category: 'frontend',
    score: 88,
    correct: 18,
    totalQuestions: 20,
    durationMinutes: 14,
    date: 'Oct 25, 2026',
    timeAgo: '3 days ago',
    badge: '4 Badges Earned',
  },
  {
    id: 'quiz-3',
    title: 'Python, AI & Machine Learning Foundations',
    domain: 'AI & Data',
    category: 'ai',
    score: 96,
    correct: 24,
    totalQuestions: 25,
    durationMinutes: 20,
    date: 'Oct 23, 2026',
    timeAgo: '5 days ago',
    badge: 'Distinction Top 🔥',
  },
  {
    id: 'quiz-4',
    title: 'SQL & Relational Schema Optimization',
    domain: 'Backend & Databases',
    category: 'backend',
    score: 95,
    correct: 19,
    totalQuestions: 20,
    durationMinutes: 12,
    date: 'Oct 19, 2026',
    timeAgo: '9 days ago',
    rank: 'Rank #2 in Batch',
  },
  {
    id: 'quiz-5',
    title: 'System Design: Scalability & Caching Patterns',
    domain: 'Systems & Cloud',
    category: 'systems',
    score: 85,
    correct: 17,
    totalQuestions: 20,
    durationMinutes: 24,
    date: 'Oct 15, 2026',
    timeAgo: '2 weeks ago',
  },
  {
    id: 'quiz-6',
    title: 'JavaScript ES6+ Async & Event Loop Challenge',
    domain: 'Frontend Dev',
    category: 'frontend',
    score: 100,
    correct: 20,
    totalQuestions: 20,
    durationMinutes: 11,
    date: 'Oct 10, 2026',
    timeAgo: '2 weeks ago',
    badge: 'Perfect Score 🌟',
  },
  {
    id: 'quiz-7',
    title: 'Dynamic Programming & Recursion Sprint',
    domain: 'Algorithms & DSA',
    category: 'dsa',
    score: 88,
    correct: 22,
    totalQuestions: 25,
    durationMinutes: 27,
    date: 'Oct 04, 2026',
    timeAgo: '3 weeks ago',
  },
  {
    id: 'quiz-8',
    title: 'Docker, Containerization & CI/CD Pipelines',
    domain: 'Systems & Cloud',
    category: 'systems',
    score: 84,
    correct: 21,
    totalQuestions: 25,
    durationMinutes: 22,
    date: 'Sep 28, 2026',
    timeAgo: '1 month ago',
    badge: 'DevOps Verified',
  },
  {
    id: 'quiz-9',
    title: 'Neural Networks & Deep Learning Essentials',
    domain: 'AI & Data',
    category: 'ai',
    score: 90,
    correct: 18,
    totalQuestions: 20,
    durationMinutes: 19,
    date: 'Sep 21, 2026',
    timeAgo: '1 month ago',
  },
  {
    id: 'quiz-10',
    title: 'REST API Security & JWT Authentication',
    domain: 'Backend & Security',
    category: 'backend',
    score: 92,
    correct: 23,
    totalQuestions: 25,
    durationMinutes: 16,
    date: 'Sep 15, 2026',
    timeAgo: '1.5 months ago',
    rank: 'Gold Level',
  },
  {
    id: 'quiz-11',
    title: 'TypeScript Generics & Strict Typing Test',
    domain: 'Frontend Dev',
    category: 'frontend',
    score: 95,
    correct: 19,
    totalQuestions: 20,
    durationMinutes: 13,
    date: 'Sep 08, 2026',
    timeAgo: '1.5 months ago',
  },
  {
    id: 'quiz-12',
    title: 'Graph Algorithms: BFS, DFS & Dijkstra',
    domain: 'Algorithms & DSA',
    category: 'dsa',
    score: 88,
    correct: 22,
    totalQuestions: 25,
    durationMinutes: 26,
    date: 'Sep 01, 2026',
    timeAgo: '2 months ago',
    badge: 'Campus Top 5%',
  },
];

interface QuizHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuizHistoryModal({ isOpen, onClose }: QuizHistoryModalProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedQuiz, setSelectedQuiz] = React.useState<QuizHistoryItem | null>(null);

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

  const filteredQuizzes = mockQuizHistory.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all hover:rotate-90 active:scale-95 z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 shrink-0">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <TrendingUp className="h-4 w-4" /> Assessment Record & Analytics
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl flex items-center gap-2.5">
            Quiz & Learning History
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-2.5 py-0.5 font-semibold">
              {mockQuizHistory.length} Attempts
            </Badge>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Complete timeline of all assessments, scores, time taken, and competitive rankings.
          </p>
        </div>

        {/* Summary Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
            <div className="text-[11px] text-muted-foreground font-medium">Total Quizzes</div>
            <div className="font-display text-xl font-bold text-foreground mt-0.5">
              {mockQuizHistory.length}
            </div>
            <div className="text-[10px] text-emerald-500 font-medium mt-0.5">100% Verified</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
            <div className="text-[11px] text-muted-foreground font-medium">Average Score</div>
            <div className="font-display text-xl font-bold text-emerald-500 mt-0.5">
              91.5%
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Top 5% of class</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
            <div className="text-[11px] text-muted-foreground font-medium">Active Streak</div>
            <div className="font-display text-xl font-bold text-amber-500 mt-0.5 flex items-center gap-1">
              14 Days <Flame className="h-4 w-4 fill-amber-500" />
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Consistent learner</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
            <div className="text-[11px] text-muted-foreground font-medium">Distinction Rate</div>
            <div className="font-display text-xl font-bold text-primary mt-0.5">
              83%
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">&gt;90% in 10 tests</div>
          </div>
        </div>

        {/* Search & Category Filter Ribbon */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quiz topic or domain..."
              className="pl-10 h-10 rounded-xl text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide text-xs">
            {[
              { id: 'all', label: 'All (12)' },
              { id: 'dsa', label: 'Algorithms' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend' },
              { id: 'ai', label: 'AI & Data' },
              { id: 'systems', label: 'Systems' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable List of Quizzes */}
        <div className="overflow-y-auto pr-1 space-y-3 flex-1 min-h-[220px]">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => {
              const isHigh = quiz.score >= 90;
              const isMedium = quiz.score >= 80 && quiz.score < 90;

              return (
                <div
                  key={quiz.id}
                  className="p-4 rounded-2xl border border-border/80 bg-card hover:border-primary/40 hover:bg-muted/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base shrink-0 mt-0.5 ${
                        quiz.category === 'dsa'
                          ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                          : quiz.category === 'frontend'
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                          : quiz.category === 'ai'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : quiz.category === 'backend'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                      }`}
                    >
                      {quiz.category === 'dsa' ? (
                        <Code2 className="w-5 h-5" />
                      ) : quiz.category === 'frontend' ? (
                        <Brain className="w-5 h-5" />
                      ) : quiz.category === 'ai' ? (
                        <Trophy className="w-5 h-5" />
                      ) : (
                        <Award className="w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {quiz.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className="text-[10px] px-2 py-0 border-primary/20 text-muted-foreground"
                        >
                          {quiz.domain}
                        </Badge>
                        {quiz.badge && (
                          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] px-1.5 py-0">
                            {quiz.badge}
                          </Badge>
                        )}
                        {quiz.rank && (
                          <Badge className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20 text-[10px] px-1.5 py-0">
                            {quiz.rank}
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          {quiz.correct}/{quiz.totalQuestions} Questions Correct
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          {quiz.durationMinutes} mins taken
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {quiz.date} ({quiz.timeAgo})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0">
                    <span
                      className={`font-bold text-sm px-2.5 py-1 rounded-xl ${
                        isHigh
                          ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20'
                          : isMedium
                          ? 'text-cyan-500 bg-cyan-500/10 border border-cyan-500/20'
                          : 'text-amber-500 bg-amber-500/10 border border-amber-500/20'
                      }`}
                    >
                      {quiz.score}% Score
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedQuiz(quiz)}
                      className="text-xs h-8 text-primary hover:bg-primary/10 rounded-lg px-2.5"
                    >
                      Review Summary <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm space-y-2">
              <p>No quiz history matching &ldquo;{searchQuery}&rdquo;</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs rounded-xl"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Selected Quiz Detail Drawer / Card Preview if clicked */}
        {selectedQuiz && (
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2 animate-fade-in shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-semibold text-xs text-foreground">
                  Performance Breakdown: {selectedQuiz.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Dismiss
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              You answered <span className="font-semibold text-foreground">{selectedQuiz.correct}</span> out of{' '}
              <span className="font-semibold text-foreground">{selectedQuiz.totalQuestions}</span> questions correctly in{' '}
              <span className="font-semibold text-foreground">{selectedQuiz.durationMinutes} minutes</span> with an accuracy rating of{' '}
              <span className="font-bold text-emerald-500">{selectedQuiz.score}%</span>.
            </p>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t shrink-0">
          <p className="text-xs text-muted-foreground">
            Want to test yourself on another domain? Practice tests update in real-time.
          </p>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button variant="ghost" onClick={onClose} className="rounded-xl flex-1 sm:flex-initial">
              Close
            </Button>
            <Button className="bg-gradient-brand text-white rounded-xl shadow-lg flex-1 sm:flex-initial" asChild>
              <Link href="/domains">
                Take New Assessment <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
