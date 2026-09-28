'use client';

import * as React from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  Clapperboard,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Flame,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedBg } from '@/components/animated-bg';
import { learningVideos, learningReels } from '@/lib/video-data';

const featuredVideo = learningVideos[9]; // Interview Prep

function LearnContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'all' | 'videos' | 'reels') || 'all';
  const [activeTab, setActiveTab] = React.useState<'all' | 'videos' | 'reels'>(initialTab);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'reels') setActiveTab('reels');
    else if (tabParam === 'videos') setActiveTab('videos');
  }, [searchParams]);

  const filteredVideos = learningVideos.filter(
    (v) =>
      search.trim() === '' ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.instructor.toLowerCase().includes(search.toLowerCase())
  );

  const filteredReels = learningReels.filter(
    (r) =>
      search.trim() === '' ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.topic.toLowerCase().includes(search.toLowerCase()) ||
      r.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen pb-20 pt-8">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">EduGram Learn & Reels Hub</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Learn & <span className="text-gradient">Short Reels</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Full-length video courses & 60-second bite-sized learning reels merged into one interactive hub.
          </p>
        </div>

        {/* Search bar & Filter Tabs */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search videos, reels, topics, instructors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm"
            />
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-xs md:text-sm transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-brand text-white shadow-md'
                  : 'bg-muted/70 hover:bg-primary/10 text-muted-foreground'
              }`}
            >
              <Sparkles className="h-4 w-4" /> All (Videos + Reels)
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-xs md:text-sm transition-all ${
                activeTab === 'videos'
                  ? 'bg-gradient-brand text-white shadow-md'
                  : 'bg-muted/70 hover:bg-primary/10 text-muted-foreground'
              }`}
            >
              <Play className="h-4 w-4" /> Video Courses
            </button>
            <button
              onClick={() => setActiveTab('reels')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-xs md:text-sm transition-all ${
                activeTab === 'reels'
                  ? 'bg-gradient-brand text-white shadow-md'
                  : 'bg-muted/70 hover:bg-primary/10 text-muted-foreground'
              }`}
            >
              <Clapperboard className="h-4 w-4" /> Short Reels
            </button>
          </div>
        </div>

        {/* ─── FEATURED HERO VIDEO ─── */}
        {!search && activeTab !== 'reels' && (
          <Card className="border-primary/20 overflow-hidden mb-12 bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/5 rounded-3xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto">
                  <img
                    src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/hqdefault.jpg`}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-gradient-brand text-white text-xs border-0">
                    Featured Masterclass
                  </Badge>
                  <Badge className="absolute bottom-3 right-3 bg-black/70 text-white text-xs">
                    {featuredVideo.duration}
                  </Badge>
                </div>
                <div className="p-8 flex flex-col justify-center space-y-3">
                  <Badge variant="secondary" className="w-fit text-xs">
                    {featuredVideo.category}
                  </Badge>
                  <h2 className="font-display text-2xl font-bold leading-snug">
                    {featuredVideo.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {featuredVideo.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
                  <Button className="bg-gradient-brand text-white w-fit rounded-xl mt-2" asChild>
                    <Link href="/learn/videos">
                      Watch Masterclass <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ─── SHORT REELS SPOTLIGHT ─── */}
        {(activeTab === 'all' || activeTab === 'reels') && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                  <Clapperboard className="h-6 w-6 text-purple-500" />
                  EduGram Short Reels
                </h2>
                <p className="text-xs text-muted-foreground">60-second quick learning concept reels</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl border-primary/30" asChild>
                <Link href="/learn/reels">
                  Open Vertical Player <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {filteredReels.map((reel) => (
                <Link key={reel.id} href="/learn/reels">
                  <Card className="border-primary/10 overflow-hidden group hover:border-purple-500/50 hover:shadow-glow transition-all rounded-2xl cursor-pointer h-full">
                    <div className="relative aspect-[9/16] overflow-hidden bg-black">
                      <img
                        src={`https://img.youtube.com/vi/${reel.thumbnail}/mqdefault.jpg`}
                        alt={reel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                      
                      <Badge className="absolute top-2 left-2 bg-purple-600/90 text-white text-[10px] px-1.5 py-0 border-0">
                        {reel.topic}
                      </Badge>
                      <Badge className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0">
                        {reel.duration}
                      </Badge>

                      <div className="absolute bottom-3 left-3 right-3 space-y-1 text-white">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90">
                          <span>{reel.instructorAvatar}</span>
                          <span className="truncate">{reel.instructor}</span>
                        </div>
                        <p className="text-xs font-semibold line-clamp-2 leading-snug">{reel.title}</p>
                        <div className="flex items-center justify-between text-[10px] text-white/70 pt-1">
                          <span className="flex items-center gap-0.5">
                            <Heart className="h-3 w-3 fill-red-500 text-red-500" /> {reel.likes}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <MessageCircle className="h-3 w-3" /> {reel.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── FULL VIDEO COURSES SECTION ─── */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                  <Play className="h-6 w-6 text-blue-500" />
                  Structured Video Courses
                </h2>
                <p className="text-xs text-muted-foreground">Comprehensive video lectures with notes & code snippets</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl border-primary/30" asChild>
                <Link href="/learn/videos">
                  Browse All Videos <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <LearnContent />
    </Suspense>
  );
}

function VideoCard({ video }: { video: (typeof learningVideos)[0] }) {
  const [bookmarked, setBookmarked] = React.useState(false);
  const diffColors = {
    Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <Card className="border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg rounded-2xl cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
          alt={video.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-5 w-5 text-primary ml-0.5" />
          </div>
        </div>
        <Badge className="absolute bottom-2 right-2 bg-black/70 text-white text-xs">{video.duration}</Badge>
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
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${diffColors[video.difficulty]}`}>
            {video.difficulty}
          </span>
        </div>
        <h3 className="text-base font-semibold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <div className="text-xs text-muted-foreground">{video.instructor}</div>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
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
      </CardContent>
    </Card>
  );
}
