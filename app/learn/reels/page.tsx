'use client';

import * as React from 'react';
import {
  Heart, Bookmark, Share2, MessageCircle, UserPlus, ChevronUp, ChevronDown, X,
  Volume2, VolumeX,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { learningReels, reelTopics, type LearningReel } from '@/lib/video-data';

export default function ReelsPage() {
  const [activeTopic, setActiveTopic] = React.useState('All');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [liked, setLiked] = React.useState<Set<string>>(new Set());
  const [saved, setSaved] = React.useState<Set<string>>(new Set());
  const [following, setFollowing] = React.useState<Set<string>>(new Set());
  const [muted, setMuted] = React.useState(true);

  const filteredReels = activeTopic === 'All'
    ? learningReels
    : learningReels.filter((r) => r.topic === activeTopic);

  const currentReel = filteredReels[currentIndex] || filteredReels[0];

  const goNext = () => {
    if (currentIndex < filteredReels.length - 1) setCurrentIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  // Keyboard nav
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIndex, filteredReels.length]);

  // Touch/swipe
  const touchStartY = React.useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
    touchStartY.current = null;
  };

  const toggleLike = (id: string) => setLiked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSave = (id: string) => setSaved((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleFollow = (name: string) => setFollowing((prev) => { const n = new Set(prev); n.has(name) ? n.delete(name) : n.add(name); return n; });

  if (!currentReel) return null;

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-black overflow-hidden">
      {/* Topic sidebar (desktop) */}
      <div className="hidden lg:flex flex-col gap-1 p-3 bg-black/60 border-r border-white/10 w-48 shrink-0 overflow-y-auto scrollbar-hide">
        <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 px-2">Topics</div>
        {reelTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => { setActiveTopic(topic); setCurrentIndex(0); }}
            className={`text-left text-xs px-3 py-2 rounded-lg transition-colors font-medium ${activeTopic === topic ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Reel viewer */}
      <div
        className="flex-1 relative select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background / thumbnail */}
        <div className="absolute inset-0">
          <img
            src={`https://img.youtube.com/vi/${currentReel.thumbnail}/maxresdefault.jpg`}
            alt={currentReel.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
        </div>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
          {/* Topic chips (mobile) */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide lg:hidden">
            {reelTopics.slice(0, 5).map((t) => (
              <button
                key={t}
                onClick={() => { setActiveTopic(t); setCurrentIndex(0); }}
                className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${activeTopic === t ? 'bg-white text-black' : 'bg-white/20 text-white border border-white/30'}`}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Mute */}
          <button
            onClick={() => setMuted(!muted)}
            className="ml-auto w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white"
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

        {/* Progress indicators */}
        <div className="absolute top-16 left-4 right-16 flex gap-1 z-10">
          {filteredReels.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 rounded-full transition-all ${i < currentIndex ? 'bg-white' : i === currentIndex ? 'bg-white/80' : 'bg-white/30'}`}
            />
          ))}
        </div>

        {/* Main reel content */}
        <div className="absolute bottom-0 left-0 right-14 p-5 z-10">
          {/* Instructor */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-xl border-2 border-white/30">
              {currentReel.instructorAvatar}
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{currentReel.instructor}</div>
              <div className="text-white/60 text-xs">{currentReel.topic}</div>
            </div>
            <button
              onClick={() => toggleFollow(currentReel.instructor)}
              className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold transition-all border ${following.has(currentReel.instructor) ? 'border-white/40 text-white/60' : 'border-white text-white hover:bg-white hover:text-black'}`}
            >
              {following.has(currentReel.instructor) ? 'Following' : '+ Follow'}
            </button>
          </div>

          {/* Title & description */}
          <h2 className="text-white font-display font-bold text-lg mb-2 leading-snug">{currentReel.title}</h2>
          <p className="text-white/80 text-sm line-clamp-3 mb-3">{currentReel.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {currentReel.tags.map((tag) => (
              <span key={tag} className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">#{tag}</span>
            ))}
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-white/70 text-xs">
            <span>{currentIndex + 1} of {filteredReels.length}</span>
            <span>•</span>
            <span>{currentReel.duration}</span>
            <span>•</span>
            <span>Use ↑↓ to navigate</span>
          </div>
        </div>

        {/* Action sidebar (right) */}
        <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 z-10">
          {/* Like */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => toggleLike(currentReel.id)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${liked.has(currentReel.id) ? 'bg-red-500 text-white scale-110' : 'bg-black/40 text-white hover:bg-black/60'}`}
            >
              <Heart className="h-5 w-5" fill={liked.has(currentReel.id) ? 'currentColor' : 'none'} />
            </button>
            <span className="text-white text-xs font-semibold">
              {(currentReel.likes + (liked.has(currentReel.id) ? 1 : 0)).toLocaleString()}
            </span>
          </div>

          {/* Comment */}
          <div className="flex flex-col items-center gap-1">
            <button className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-all">
              <MessageCircle className="h-5 w-5" />
            </button>
            <span className="text-white text-xs font-semibold">{currentReel.comments}</span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center gap-1">
            <button className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-all">
              <Share2 className="h-5 w-5" />
            </button>
            <span className="text-white text-xs font-semibold">{currentReel.shares.toLocaleString()}</span>
          </div>

          {/* Save */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => toggleSave(currentReel.id)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${saved.has(currentReel.id) ? 'bg-yellow-400 text-black scale-110' : 'bg-black/40 text-white hover:bg-black/60'}`}
            >
              <Bookmark className="h-5 w-5" fill={saved.has(currentReel.id) ? 'currentColor' : 'none'} />
            </button>
            <span className="text-white text-xs font-semibold">{saved.has(currentReel.id) ? 'Saved' : 'Save'}</span>
          </div>
        </div>

        {/* Navigation arrows (desktop) */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 disabled:opacity-30 transition-all"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === filteredReels.length - 1}
            className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 disabled:opacity-30 transition-all"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
