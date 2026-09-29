'use client';

import * as React from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  Star,
  Eye,
  Bookmark,
  ThumbsUp,
  Share2,
  Play,
  Clock,
  SlidersHorizontal,
  Sparkles,
  X,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedBg } from '@/components/animated-bg';
import {
  learningVideos,
  videoCategories,
  type LearningVideo,
} from '@/lib/video-data';
import {
  getCareerBySlug,
  getDomainRecommendations,
  getDomainSkillBreakdown,
} from '@/lib/recommendation-model';

const sortOptions = ['Latest', 'Most Popular', 'Top Rated', 'Shortest'];
const difficultyOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

function VideosContent() {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get('domain') || '';

  const [search, setSearch] = React.useState('');
  const [selectedDomain, setSelectedDomain] = React.useState<string>(domainParam);
  const [selectedSkillTag, setSelectedSkillTag] = React.useState<string>('All');
  const [category, setCategory] = React.useState('All');
  const [difficulty, setDifficulty] = React.useState('All');
  const [sort, setSort] = React.useState('Latest');
  const [bookmarks, setBookmarks] = React.useState<Set<string>>(new Set());
  const [likes, setLikes] = React.useState<Set<string>>(new Set());
  const [activeVideo, setActiveVideo] = React.useState<LearningVideo | null>(null);
  const [showFilters, setShowFilters] = React.useState(false);

  React.useEffect(() => {
    const dom = searchParams.get('domain');
    if (dom) {
      setSelectedDomain(dom);
      setSelectedSkillTag('All');
    }
  }, [searchParams]);

  const career = React.useMemo(() => {
    if (!selectedDomain) return null;
    return getCareerBySlug(selectedDomain) || null;
  }, [selectedDomain]);

  const domainSkills = React.useMemo(() => {
    if (!career) return null;
    return getDomainSkillBreakdown(career);
  }, [career]);

  const domainRecs = React.useMemo(() => {
    if (!career) return null;
    return getDomainRecommendations(career.slug, {
      skillFilter: selectedSkillTag,
    });
  }, [career, selectedSkillTag]);

  // Base list of videos
  const baseVideos = React.useMemo(() => {
    if (domainRecs) return domainRecs.recommendedVideos;
    return learningVideos;
  }, [domainRecs]);

  const filtered = React.useMemo(() => {
    let result = [...baseVideos];
    if (search.trim()) {
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(search.toLowerCase()) ||
          v.instructor.toLowerCase().includes(search.toLowerCase()) ||
          v.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (category !== 'All') result = result.filter((v) => v.category === category);
    if (difficulty !== 'All') result = result.filter((v) => v.difficulty === difficulty);

    if (sort === 'Most Popular') {
      result = result.sort((a, b) => parseInt(b.views) - parseInt(a.views));
    } else if (sort === 'Top Rated') {
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'Shortest') {
      result = result.sort((a, b) => a.durationSeconds - b.durationSeconds);
    }
    return result;
  }, [baseVideos, search, category, difficulty, sort]);

  const toggleBookmark = (id: string) =>
    setBookmarks((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const toggleLike = (id: string) =>
    setLikes((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className="relative min-h-screen pb-20 pt-8">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Button variant="ghost" size="sm" asChild className="h-7 px-2 -ml-2 text-xs">
                <Link href="/learn">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Learn Hub
                </Link>
              </Button>
            </div>
            <h1 className="font-display text-3xl font-bold">
              Learning <span className="text-gradient">Videos</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              {career
                ? `Showing tutorials recommended for ${career.title} filtered by tags`
                : 'Expert-curated video tutorials across all tech domains'}
            </p>
          </div>

          {career && (
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-brand text-white border-0 text-xs py-1 px-3">
                <Sparkles className="h-3 w-3 mr-1" /> Domain: {career.title}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedDomain('');
                  setSelectedSkillTag('All');
                }}
                className="text-xs h-8"
              >
                Clear Domain
              </Button>
            </div>
          )}
        </div>

        {/* Domain Language / Skill Tag Filter Chips */}
        {domainSkills && (
          <div className="bg-card/70 border border-primary/20 rounded-2xl p-4 mb-6 backdrop-blur-md">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-primary" /> Filter {career?.title} Languages & Skills:
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {domainSkills.allFilterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedSkillTag(tag)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                    selectedSkillTag === tag
                      ? 'bg-gradient-brand text-white shadow-md'
                      : 'bg-muted/70 hover:bg-primary/10 text-muted-foreground'
                  }`}
                >
                  {tag === 'All' ? `All (${domainRecs?.totalMatches || 0})` : tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search & filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search videos, instructors, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Button
            variant="outline"
            className="border-primary/20 gap-2 rounded-xl"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
            {(category !== 'All' || difficulty !== 'All') && (
              <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                {[category !== 'All', difficulty !== 'All'].filter(Boolean).length}
              </span>
            )}
          </Button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-4">
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Category</div>
              <div className="flex flex-wrap gap-2">
                {videoCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      category === c ? 'bg-primary text-white' : 'bg-muted hover:bg-primary/10 text-muted-foreground'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Difficulty</div>
                <div className="flex gap-2">
                  {difficultyOptions.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        difficulty === d ? 'bg-primary text-white' : 'bg-muted hover:bg-primary/10 text-muted-foreground'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sort By</div>
                <div className="flex gap-2">
                  {sortOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSort(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        sort === s ? 'bg-primary text-white' : 'bg-muted hover:bg-primary/10 text-muted-foreground'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video) => (
            <Card
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="border-primary/10 overflow-hidden group hover:border-primary/40 transition-all duration-300 hover:shadow-xl rounded-2xl cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden bg-black/10">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      <Play className="h-5 w-5 text-primary ml-0.5" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-2 right-2 bg-black/75 text-white text-xs">
                    {video.duration}
                  </Badge>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(video.id);
                    }}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      bookmarks.has(video.id) ? 'bg-primary text-white' : 'bg-black/50 text-white hover:bg-black/70'
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" fill={bookmarks.has(video.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <CardContent className="py-4 px-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[11px] py-0">
                      {video.category}
                    </Badge>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${difficultyColors[video.difficulty] || ''}`}>
                      {video.difficulty}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <div className="text-xs text-muted-foreground">{video.instructor}</div>

                  <div className="flex items-center gap-1 flex-wrap pt-1">
                    {video.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              <div className="px-5 pb-4 pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                  {video.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {video.views}
                </div>
                <span>{new Date(video.uploadDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-3xl bg-card border border-primary/20 rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-card/90 px-5 py-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary border-0 text-xs">
                    {activeVideo.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium truncate max-w-[300px]">
                    {activeVideo.instructor}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-8 h-8 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-bold leading-snug">
                    {activeVideo.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-yellow-500 font-semibold shrink-0 pt-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-500" />
                    {activeVideo.rating} ({activeVideo.views} views)
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {activeVideo.description}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {activeVideo.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-[11px] py-0.5 border-primary/20 text-primary">
                      #{t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function VideosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <VideosContent />
    </Suspense>
  );
}
