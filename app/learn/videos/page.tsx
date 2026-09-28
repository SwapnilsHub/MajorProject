'use client';

import * as React from 'react';
import {
  Search, Filter, Star, Eye, Bookmark, ThumbsUp, Share2, Play, Clock, SlidersHorizontal,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedBg } from '@/components/animated-bg';
import { learningVideos, videoCategories, type LearningVideo } from '@/lib/video-data';

const sortOptions = ['Latest', 'Most Popular', 'Top Rated', 'Shortest'];
const difficultyOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function VideosPage() {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const [difficulty, setDifficulty] = React.useState('All');
  const [sort, setSort] = React.useState('Latest');
  const [bookmarks, setBookmarks] = React.useState<Set<string>>(new Set());
  const [likes, setLikes] = React.useState<Set<string>>(new Set());
  const [activeVideo, setActiveVideo] = React.useState<LearningVideo | null>(null);
  const [showFilters, setShowFilters] = React.useState(false);

  const filtered = React.useMemo(() => {
    let result = [...learningVideos];
    if (search.trim()) result = result.filter((v) => v.title.toLowerCase().includes(search.toLowerCase()) || v.instructor.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'All') result = result.filter((v) => v.category === category);
    if (difficulty !== 'All') result = result.filter((v) => v.difficulty === difficulty);
    if (sort === 'Most Popular') result = result.sort((a, b) => parseInt(b.views) - parseInt(a.views));
    if (sort === 'Top Rated') result = result.sort((a, b) => b.rating - a.rating);
    if (sort === 'Shortest') result = result.sort((a, b) => a.durationSeconds - b.durationSeconds);
    return result;
  }, [search, category, difficulty, sort]);

  const toggleBookmark = (id: string) => setBookmarks((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleLike = (id: string) => setLikes((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="relative min-h-screen pb-20 pt-8">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">
            Learning <span className="text-gradient">Videos</span>
          </h1>
          <p className="text-muted-foreground">Expert-curated video tutorials across all tech domains</p>
        </div>

        {/* Search & filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search videos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Button
            variant="outline"
            className="border-primary/20 gap-2"
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
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${category === c ? 'bg-primary text-white' : 'bg-muted hover:bg-primary/10 text-muted-foreground'}`}
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
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${difficulty === d ? 'bg-primary text-white' : 'bg-muted hover:bg-primary/10 text-muted-foreground'}`}
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
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${sort === s ? 'bg-primary text-white' : 'bg-muted hover:bg-primary/10 text-muted-foreground'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {videoCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${category === c ? 'bg-primary text-white' : 'bg-muted hover:bg-primary/10 text-muted-foreground border border-border'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Video player modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
            <div className="bg-card rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg mb-1">{activeVideo.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{activeVideo.instructor}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />{activeVideo.rating}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{activeVideo.views}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{activeVideo.description}</p>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className={`border-primary/20 gap-2 ${bookmarks.has(activeVideo.id) ? 'text-primary' : ''}`}
                    onClick={() => toggleBookmark(activeVideo.id)}
                  >
                    <Bookmark className="h-3.5 w-3.5" fill={bookmarks.has(activeVideo.id) ? 'currentColor' : 'none'} />
                    {bookmarks.has(activeVideo.id) ? 'Saved' : 'Watch Later'}
                  </Button>
                  <Button size="sm" variant="outline" className="border-primary/20 gap-2">
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </Button>
                  <Button size="sm" variant="outline" className="border-destructive/20 ml-auto" onClick={() => setActiveVideo(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">{filtered.length} videos found</span>
        </div>

        {/* Video grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((video) => (
              <Card key={video.id} className="border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative overflow-hidden cursor-pointer" onClick={() => setActiveVideo(video)}>
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100">
                      <Play className="h-5 w-5 text-primary ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 flex gap-1.5">
                    <span className="bg-black/70 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> {video.duration}
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(video.id); }}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${bookmarks.has(video.id) ? 'bg-primary text-white' : 'bg-black/50 text-white hover:bg-black/70'} opacity-0 group-hover:opacity-100`}
                  >
                    <Bookmark className="h-3.5 w-3.5" fill={bookmarks.has(video.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Badge variant="secondary" className="text-xs py-0 px-1.5">{video.category}</Badge>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${difficultyColors[video.difficulty]}`}>
                      {video.difficulty}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold line-clamp-2 mb-1.5 group-hover:text-primary transition-colors cursor-pointer" onClick={() => setActiveVideo(video)}>
                    {video.title}
                  </h3>
                  <div className="text-xs text-muted-foreground mb-2">{video.instructor}</div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      {video.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </div>
                    <button
                      onClick={() => toggleLike(video.id)}
                      className={`flex items-center gap-1 transition-colors ${likes.has(video.id) ? 'text-primary' : 'hover:text-primary'}`}
                    >
                      <ThumbsUp className="h-3 w-3" fill={likes.has(video.id) ? 'currentColor' : 'none'} />
                      {(video.likes + (likes.has(video.id) ? 1 : 0)).toLocaleString()}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No videos found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
