'use client';

import * as React from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Play,
  Film,
  Search,
  TrendingUp,
  Clock,
  BookOpen,
  ChevronRight,
  Star,
  Eye,
  Bookmark,
  Share2,
  Sparkles,
  Flame,
  X,
  SlidersHorizontal,
  CheckCircle2,
  Layers,
  Compass,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedBg } from '@/components/animated-bg';
import { careers, type Career } from '@/lib/data';
import { learningVideos, type LearningVideo } from '@/lib/video-data';
import {
  getCareerBySlug,
  getDomainRecommendations,
  getDomainSkillBreakdown,
} from '@/lib/recommendation-model';

function LearnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL Query Params
  const domainParam = searchParams.get('domain') || '';

  // Component States
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('all');
  const [search, setSearch] = React.useState('');
  const [selectedDomainSlug, setSelectedDomainSlug] = React.useState<string>(domainParam);
  const [selectedSkillFilter, setSelectedSkillFilter] = React.useState<string>('All');
  const [activeVideo, setActiveVideo] = React.useState<LearningVideo | null>(null);

  // Sync state if query params change
  React.useEffect(() => {
    const dom = searchParams.get('domain');
    if (dom) {
      setSelectedDomainSlug(dom);
      setSelectedSkillFilter('All');
    }
  }, [searchParams]);

  // Current active career domain
  const currentCareer = React.useMemo(() => {
    if (!selectedDomainSlug) return null;
    return getCareerBySlug(selectedDomainSlug) || null;
  }, [selectedDomainSlug]);

  // Domain skill & language breakdown
  const domainBreakdown = React.useMemo(() => {
    if (!currentCareer) return null;
    return getDomainSkillBreakdown(currentCareer);
  }, [currentCareer]);

  // AI Domain Recommendations
  const domainRecs = React.useMemo(() => {
    if (!currentCareer) return null;
    return getDomainRecommendations(currentCareer.slug, {
      skillFilter: selectedSkillFilter,
    });
  }, [currentCareer, selectedSkillFilter]);

  // Handlers for switching domains
  const handleSelectDomain = (slug: string) => {
    setSelectedDomainSlug(slug);
    setSelectedSkillFilter('All');
    if (slug) {
      router.push(`/learn?domain=${slug}`);
    } else {
      router.push('/learn');
    }
  };

  // Base video candidate pool (filtered by domain recommendation model if domain is selected)
  const baseVideos = React.useMemo(() => {
    if (domainRecs) return domainRecs.recommendedVideos;
    return learningVideos;
  }, [domainRecs]);

  // Search & Difficulty Filter
  const filteredVideos = React.useMemo(() => {
    return baseVideos.filter((v) => {
      const matchesSearch =
        search.trim() === '' ||
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.category.toLowerCase().includes(search.toLowerCase()) ||
        v.instructor.toLowerCase().includes(search.toLowerCase()) ||
        v.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesDifficulty =
        selectedDifficulty === 'all' || v.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      return matchesSearch && matchesDifficulty;
    });
  }, [baseVideos, search, selectedDifficulty]);

  // Featured Hero Video (top recommended video if domain selected, else fallback)
  const featuredVideo = filteredVideos[0] || learningVideos[0];

  return (
    <div className="relative min-h-screen pb-20 pt-8">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* ─── DOMAIN RECOMMENDATION ACTIVE BANNER ─── */}
        {currentCareer ? (
          <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-pink-900/20 border border-primary/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-gradient-brand text-white border-0 text-xs px-3 py-1 font-semibold shadow-md">
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" /> AI Recommendation Model Active
                  </Badge>
                  <Badge variant="outline" className="bg-card/50 border-primary/30 text-xs py-1">
                    {currentCareer.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Filtered using {currentCareer.title} Skill Tags
                  </span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                  Learning Curriculum for <span className="text-gradient">{currentCareer.title}</span>
                </h1>

                <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
                  Videos filtered strictly for{' '}
                  <span className="text-foreground font-semibold">{currentCareer.title}</span> based on programming languages & core skills:
                  {' '}
                  <span className="text-primary font-medium">{currentCareer.skills.join(', ')}</span>.
                </p>
              </div>

              {/* Action Buttons: Switch Domain or Clear Filter */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative">
                  <select
                    value={selectedDomainSlug}
                    onChange={(e) => handleSelectDomain(e.target.value)}
                    className="h-11 px-4 pr-9 rounded-xl border border-primary/30 bg-card/90 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="">Switch Domain / All Domains</option>
                    {careers.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none rotate-90" />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectDomain('')}
                  className="rounded-xl border-border/80 h-11 text-xs"
                >
                  Clear Domain Filter
                </Button>
              </div>
            </div>

            {/* Programming Language & Skill Filter Chips for this Domain */}
            {domainBreakdown && domainBreakdown.allFilterTags.length > 1 && (
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-primary" /> Filter by {currentCareer.title} Language / Skill:
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {domainBreakdown.allFilterTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedSkillFilter(tag)}
                      className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                        selectedSkillFilter === tag
                          ? 'bg-gradient-brand text-white shadow-md scale-105'
                          : 'bg-card/70 hover:bg-primary/20 text-muted-foreground border border-border/60'
                      }`}
                    >
                      {tag === 'All' ? `All (${domainRecs?.totalMatches || 0})` : tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Default Header when no domain is active */
          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">EduGram Video Learning Hub</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Learn & <span className="text-gradient">Video Masterclasses</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Curated video masterclasses and tutorials filtered by career domains and skill tags.
            </p>

            {/* Quick Domain Selector Dropdown Pills */}
            <div className="pt-2 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1">
                  <Compass className="h-3.5 w-3.5 text-primary" /> Select Domain:
                </span>
                {careers.slice(0, 7).map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => handleSelectDomain(c.slug)}
                    className="text-xs px-3 py-1 rounded-full bg-card border border-border/70 hover:border-primary/40 hover:text-primary transition-colors text-muted-foreground"
                  >
                    {c.title}
                  </button>
                ))}
                <div className="relative inline-block">
                  <select
                    value=""
                    onChange={(e) => handleSelectDomain(e.target.value)}
                    className="text-xs px-3 py-1 rounded-full bg-card border border-border/70 text-primary font-medium cursor-pointer"
                  >
                    <option value="">More Domains...</option>
                    {careers.slice(7).map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Search bar & Difficulty Filter Tabs ─── */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={
                currentCareer
                  ? `Search ${currentCareer.title} videos, skills (e.g. ${currentCareer.skills.slice(0, 3).join(', ')})...`
                  : 'Search video courses, programming languages, topics...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs md:text-sm transition-all ${
                selectedDifficulty === 'all'
                  ? 'bg-gradient-brand text-white shadow-md'
                  : 'bg-muted/70 hover:bg-primary/10 text-muted-foreground'
              }`}
            >
              <Sparkles className="h-4 w-4" /> All Videos ({baseVideos.length})
            </button>
            {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
              const count = baseVideos.filter((v) => v.difficulty.toLowerCase() === lvl.toLowerCase()).length;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedDifficulty(lvl)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs md:text-sm transition-all ${
                    selectedDifficulty === lvl
                      ? 'bg-gradient-brand text-white shadow-md'
                      : 'bg-muted/70 hover:bg-primary/10 text-muted-foreground'
                  }`}
                >
                  {lvl} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── FEATURED HERO VIDEO ─── */}
        {!search && selectedDifficulty === 'all' && featuredVideo && (
          <Card className="border-primary/20 overflow-hidden mb-12 bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/5 rounded-3xl shadow-xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div
                  className="relative aspect-video md:aspect-auto cursor-pointer group bg-black"
                  onClick={() => setActiveVideo(featuredVideo)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/hqdefault.jpg`}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/95 group-hover:scale-110 flex items-center justify-center shadow-xl transition-transform">
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-gradient-brand text-white text-xs border-0">
                    {currentCareer ? `Top Match for ${currentCareer.title}` : 'Featured Masterclass'}
                  </Badge>
                  <Badge className="absolute bottom-3 right-3 bg-black/70 text-white text-xs">
                    {featuredVideo.duration}
                  </Badge>
                </div>

                <div className="p-8 flex flex-col justify-center space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {featuredVideo.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                      {featuredVideo.difficulty}
                    </Badge>
                  </div>
                  <h2 className="font-display text-2xl font-bold leading-snug">
                    {featuredVideo.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {featuredVideo.description}
                  </p>

                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {featuredVideo.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                      {featuredVideo.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {featuredVideo.views}
                    </span>
                    <span>{featuredVideo.instructor}</span>
                  </div>

                  <Button
                    className="bg-gradient-brand text-white w-fit rounded-xl mt-2 font-semibold shadow-md"
                    onClick={() => setActiveVideo(featuredVideo)}
                  >
                    <Play className="mr-2 h-4 w-4" /> Watch Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ─── FULL VIDEO COURSES SECTION ─── */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                <Play className="h-6 w-6 text-blue-500" />
                {currentCareer ? `Recommended Courses for ${currentCareer.title}` : 'Structured Video Courses'}
              </h2>
              <p className="text-xs text-muted-foreground">
                Comprehensive video tutorials matching languages & skills: {filteredVideos.length} available
              </p>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl border-primary/30" asChild>
              <Link href={`/learn/videos${currentCareer ? `?domain=${currentCareer.slug}` : ''}`}>
                Browse Video Grid <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {filteredVideos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={() => setActiveVideo(video)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card/40 rounded-2xl border border-dashed border-border text-muted-foreground">
              <p className="text-base font-semibold">No video courses found.</p>
              <p className="text-xs mt-1">Try selecting a different skill tag or clearing your search query.</p>
            </div>
          )}
        </div>

        {/* ─── EMBEDDED VIDEO PLAYER MODAL ─── */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-3xl bg-card border border-primary/20 rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
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

              {/* Video Iframe */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
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

export default function LearnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <LearnContent />
    </Suspense>
  );
}

function VideoCard({
  video,
  onPlay,
}: {
  video: LearningVideo;
  onPlay: () => void;
}) {
  const [bookmarked, setBookmarked] = React.useState(false);

  const diffColors: Record<string, string> = {
    Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <Card
      onClick={onPlay}
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
              setBookmarked(!bookmarked);
            }}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              bookmarked ? 'bg-primary text-white' : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <CardContent className="py-4 px-5 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[11px] py-0">
              {video.category}
            </Badge>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${diffColors[video.difficulty] || ''}`}>
              {video.difficulty}
            </span>
          </div>
          <h3 className="text-base font-semibold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <div className="text-xs text-muted-foreground">{video.instructor}</div>

          {/* Tags */}
          <div className="flex items-center gap-1 flex-wrap pt-1">
            {video.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium"
              >
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
  );
}
