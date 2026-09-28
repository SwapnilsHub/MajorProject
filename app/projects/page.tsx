'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Brain, Search, Clock, Star, Bookmark, ChevronRight, Code2, Layers,
  TrendingUp, Zap, Filter,
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

function ProjectCard({ project }: { project: Project }) {
  const [saved, setSaved] = React.useState(false);
  const gradient = categoryGradients[project.category] || categoryGradients.default;

  return (
    <Card className="border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      {/* Gradient header */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      <CardContent className="pt-4 pb-4 flex flex-col flex-1">
        {/* Category & difficulty */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-xs capitalize">{project.category.replace('-', ' ')}</Badge>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColors[project.difficulty]}`}>
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
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{project.estimatedTime}</span>
          <span className="flex items-center gap-1"><Code2 className="h-3 w-3" />{project.requiredSkills.length} skills</span>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t}</span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">+{project.technologies.length - 4}</span>
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

  const recommended = getRecommendedProjects('Data Science', [], undefined).slice(0, 3);

  const filtered = React.useMemo(() => {
    let result = [...projects];
    if (category !== 'all') result = result.filter((p) => p.category === category);
    if (difficulty !== 'All') result = result.filter((p) => p.difficulty === difficulty);
    if (search.trim()) result = result.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );
    return result;
  }, [category, difficulty, search]);

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
            AI-matched projects based on your skills, career goal, quiz performance, and learning progress
          </p>
        </div>

        {/* AI Recommendation Banner */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-violet-500/5 to-indigo-500/5 mb-8">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display font-bold">AI Project Recommendation</span>
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Personalized</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your assessment (Data Science career goal), quiz scores (strong in Python, weak in ML), and 2 completed courses — here are your top project matches:
                </p>
                <div className="flex flex-wrap gap-2">
                  {recommended.map((p) => (
                    <Link key={p.id} href={`/projects/${p.id}`}>
                      <Badge variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                        <Zap className="h-3 w-3 mr-1" /> {p.title.split(' ').slice(0, 4).join(' ')}...
                      </Badge>
                    </Link>
                  ))}
                </div>
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
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Button variant="outline" className="border-primary/20 gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" /> Difficulty
          </Button>
        </div>

        {showFilters && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${difficulty === d ? 'bg-primary text-white' : 'bg-muted hover:bg-primary/10 text-muted-foreground border border-border'}`}
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
              onClick={() => setCategory(cat.id)}
              className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${category === cat.id ? 'bg-primary text-white' : 'bg-muted hover:bg-primary/10 text-muted-foreground border border-border'}`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">{filtered.length} projects available</span>
        </div>

        {/* Projects grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Layers className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
