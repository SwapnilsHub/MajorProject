'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Brain, Search, Clock, Star, Bookmark, ChevronRight, Code2, Layers,
  TrendingUp, Zap, Filter, Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedBg } from '@/components/animated-bg';
import {
  projects,
  projectCategories,
  getRecommendedProjects,
  type Project,
  type ProjectDifficulty,
} from '@/lib/project-data';
import {
  getSelectedDomain,
  setSelectedDomain,
  isProjectMatchingDomain,
  DEFAULT_DOMAIN,
} from '@/lib/domain-selection';

const difficultyColors: Record<ProjectDifficulty, string> = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const categoryGradients: Record<string, string> = {
  'ai-ml': 'from-indigo-500 to-blue-500',
  'data-science': 'from-teal-500 to-cyan-500',
  'fullstack': 'from-orange-500 to-red-500',
  'iot': 'from-green-500 to-emerald-500',
  'blockchain': 'from-purple-500 to-violet-500',
  'devops': 'from-slate-500 to-gray-500',
  'android': 'from-green-400 to-lime-500',
  'cyber-security': 'from-red-600 to-pink-500',
  'cloud': 'from-sky-500 to-blue-400',
  'web-development': 'from-yellow-500 to-orange-500',
  'python': 'from-blue-500 to-indigo-500',
  'java': 'from-orange-600 to-red-500',
  'default': 'from-primary to-violet-500',
};

function ProjectCard({
  project,
  isRecommended,
  selectedDomain,
}: {
  project: Project;
  isRecommended?: boolean;
  selectedDomain?: string;
}) {
  const [saved, setSaved] = React.useState(false);
  const gradient = categoryGradients[project.category] || categoryGradients.default;

  return (
    <Card
      className={`overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col relative ${
        isRecommended
          ? 'border-primary/40 shadow-[0_0_15px_rgba(59,130,246,0.12)] hover:border-primary/60'
          : 'border-primary/10 hover:border-primary/30'
      }`}
    >
      {/* Gradient header */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      <CardContent className="pt-4 pb-4 flex flex-col flex-1">
        {/* Recommended Tag if matches domain */}
        {isRecommended && (
          <div className="mb-2.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-primary/15 to-violet-500/15 border border-primary/30 text-primary text-[10px] font-bold">
              <Zap className="h-3 w-3 fill-primary" /> Recommended for {selectedDomain}
            </span>
          </div>
        )}

        {/* Category & difficulty */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-xs capitalize">
            {project.category.replace('-', ' ')}
          </Badge>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColors[project.difficulty]}`}
          >
            {project.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-base mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2 flex-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{project.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {project.estimatedTime}
          </span>
          <span className="flex items-center gap-1">
            <Code2 className="h-3 w-3" />
            {project.requiredSkills.length} skills
          </span>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {t}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Industry relevance */}
        <div className="text-xs bg-muted/40 border rounded-lg p-2 mb-4 text-muted-foreground line-clamp-2">
          🏭 {project.industryRelevance}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button size="sm" className="flex-1 bg-gradient-brand text-white text-xs" asChild>
            <Link href={`/projects/${project.id}`}>
              <ChevronRight className="h-3.5 w-3.5 mr-1" /> Start Project
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={`border-primary/20 ${saved ? 'text-primary bg-primary/10' : ''}`}
            onClick={() => setSaved(!saved)}
          >
            <Bookmark className="h-3.5 w-3.5" fill={saved ? 'currentColor' : 'none'} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectsPage() {
  const [category, setCategory] = React.useState('all');
  const [difficulty, setDifficulty] = React.useState<'All' | ProjectDifficulty>('All');
  const [search, setSearch] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedDomain, setLocalSelectedDomain] = React.useState(DEFAULT_DOMAIN);
  const [onlyRecommended, setOnlyRecommended] = React.useState(false);

  // Read domain from URL query param or saved preference
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const domainParam = urlParams.get('domain');
      if (domainParam && domainParam.trim()) {
        setLocalSelectedDomain(domainParam.trim());
        setOnlyRecommended(true);
      } else {
        setLocalSelectedDomain(getSelectedDomain());
      }
    }

    const handleDomainChange = (e: any) => {
      if (e.detail?.domain) {
        setLocalSelectedDomain(e.detail.domain);
      }
    };

    window.addEventListener('edugram:domain_selected', handleDomainChange);
    return () => window.removeEventListener('edugram:domain_selected', handleDomainChange);
  }, []);

  // Compute matched projects for the student's chosen domain
  const domainMatchedProjects = React.useMemo(() => {
    return projects.filter((p) => isProjectMatchingDomain(p, selectedDomain));
  }, [selectedDomain]);

  // Top recommended highlights
  const topRecommendations = React.useMemo(() => {
    if (domainMatchedProjects.length > 0) {
      return domainMatchedProjects.slice(0, 3);
    }
    return getRecommendedProjects(selectedDomain, [], undefined).slice(0, 3);
  }, [domainMatchedProjects, selectedDomain]);

  const filtered = React.useMemo(() => {
    let result = [...projects];

    // Filter by domain recommendation if toggle is enabled
    if (onlyRecommended) {
      result = result.filter((p) => isProjectMatchingDomain(p, selectedDomain));
    }

    if (category !== 'all') result = result.filter((p) => p.category === category);
    if (difficulty !== 'All') result = result.filter((p) => p.difficulty === difficulty);
    if (search.trim()) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );
    }
    return result;
  }, [category, difficulty, search, onlyRecommended, selectedDomain]);

  return (
    <div className="relative min-h-screen pb-20 pt-8">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
            <Layers className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Project Recommendations</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-3">
            Build Real <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            AI-matched projects tailored to your chosen professional domain, career ambitions, and hands-on skill roadmap.
          </p>
        </div>

        {/* AI Personalized Recommendation Banner based on Domain Choice */}
        <Card className="border-primary/25 bg-gradient-to-br from-primary/10 via-violet-500/5 to-indigo-500/10 mb-8 overflow-hidden shadow-lg relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <CardContent className="pt-6 pb-6 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center shrink-0 shadow-md text-white">
                  <Brain className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-display font-bold text-lg">
                      AI Project Recommendations for {selectedDomain}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/30 text-xs font-semibold"
                    >
                      ★ Active Professional Domain
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                    Based on your selected professional domain in <strong>{selectedDomain}</strong>, we have personalized <strong>{domainMatchedProjects.length} industry-grade projects</strong> to build your resume and portfolio.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-xs font-medium text-foreground">Top Matches:</span>
                    {topRecommendations.map((p) => (
                      <Link key={p.id} href={`/projects/${p.id}`}>
                        <Badge
                          variant="outline"
                          className="border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer text-xs"
                        >
                          <Zap className="h-3 w-3 mr-1" /> {p.title.split(' ').slice(0, 3).join(' ')}...
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col items-stretch gap-2.5 shrink-0 w-full md:w-auto">
                <Button
                  size="sm"
                  variant={onlyRecommended ? 'default' : 'outline'}
                  className={`text-xs rounded-xl font-semibold transition-all ${
                    onlyRecommended
                      ? 'bg-gradient-brand text-white shadow-md'
                      : 'border-primary/30 text-primary hover:bg-primary/10'
                  }`}
                  onClick={() => setOnlyRecommended(!onlyRecommended)}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  {onlyRecommended ? 'Show All Projects' : `Filter ${selectedDomain} (${domainMatchedProjects.length})`}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl"
                  asChild
                >
                  <Link href="/domains">
                    Change Domain →
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, technologies, skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-9 pr-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <Button
            variant={onlyRecommended ? 'default' : 'outline'}
            className={`gap-2 rounded-xl text-xs sm:text-sm font-semibold ${
              onlyRecommended
                ? 'bg-gradient-brand text-white shadow-md'
                : 'border-primary/30 text-primary hover:bg-primary/10'
            }`}
            onClick={() => setOnlyRecommended(!onlyRecommended)}
          >
            <Sparkles className="h-4 w-4" />
            {onlyRecommended
              ? `Filtered to ${selectedDomain}`
              : `⭐ Recommended for ${selectedDomain} (${domainMatchedProjects.length})`}
          </Button>

          <Button
            variant="outline"
            className="border-primary/20 gap-2 rounded-xl"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" /> Difficulty
          </Button>
        </div>

        {showFilters && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  difficulty === d
                    ? 'bg-primary text-white'
                    : 'bg-muted hover:bg-primary/10 text-muted-foreground border border-border'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                if (onlyRecommended) setOnlyRecommended(false);
              }}
              className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
                category === cat.id && !onlyRecommended
                  ? 'bg-primary text-white'
                  : 'bg-muted hover:bg-primary/10 text-muted-foreground border border-border'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Results count & status */}
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
          <span>
            Showing <strong>{filtered.length}</strong> {onlyRecommended ? `recommended (${selectedDomain})` : ''} projects available
          </span>
          {onlyRecommended && (
            <button
              onClick={() => setOnlyRecommended(false)}
              className="text-primary hover:underline font-medium"
            >
              Clear Domain Filter (View All)
            </button>
          )}
        </div>

        {/* Projects grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isRecommended={isProjectMatchingDomain(project, selectedDomain)}
                selectedDomain={selectedDomain}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground bg-muted/20 border border-border/60 rounded-3xl p-8 max-w-lg mx-auto">
            <Layers className="h-12 w-12 mx-auto mb-4 opacity-40 text-primary" />
            <p className="text-lg font-bold text-foreground mb-1">No projects found</p>
            <p className="text-xs text-muted-foreground mb-4">
              Try adjusting your search criteria or resetting filters to see all available projects.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCategory('all');
                setDifficulty('All');
                setSearch('');
                setOnlyRecommended(false);
              }}
              className="rounded-xl text-xs"
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
