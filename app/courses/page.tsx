'use client';

import * as React from 'react';
import { Search, Star, Clock, Award, ExternalLink } from 'lucide-react';
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
import { courses } from '@/lib/data';

const platforms = ['All', 'Coursera', 'Udemy', 'NPTEL', 'SWAYAM', 'edX', 'Google', 'Microsoft', 'AWS', 'Cisco', 'IBM', 'Meta'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const prices = ['All', 'Free', 'Paid'];

export default function CoursesPage() {
  const [search, setSearch] = React.useState('');
  const [platform, setPlatform] = React.useState('All');
  const [level, setLevel] = React.useState('All');
  const [price, setPrice] = React.useState('All');

  const filtered = courses.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.provider.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchPlatform = platform === 'All' || c.platform === platform;
    const matchLevel = level === 'All' || c.level === level;
    const matchPrice = price === 'All' || c.price === price;
    return matchSearch && matchPlatform && matchLevel && matchPrice;
  });

  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Courses"
          title={
            <>
              Learn from the <span className="text-gradient">Best Platforms</span>
            </>
          }
          description="Discover free and paid courses from Coursera, Udemy, NPTEL, SWAYAM, edX, Google, Microsoft, AWS, Cisco, IBM, and Meta."
        />

        {/* Platform badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {platforms.slice(1).map((p) => (
            <Badge
              key={p}
              variant="outline"
              className="px-4 py-1.5 cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors"
              onClick={() => setPlatform(p)}
            >
              {p}
            </Badge>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, providers, skills..."
              className="pl-10"
            />
          </div>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="sm:w-44">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={price} onValueChange={setPrice}>
            <SelectTrigger className="sm:w-36">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              {prices.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <Card
              key={course.id}
              className="hover:shadow-glow transition-all hover:-translate-y-1 border-primary/10 flex flex-col"
            >
              <CardContent className="pt-6 space-y-3 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <Badge className="bg-gradient-brand text-white">
                    {course.platform}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-lg leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    by {course.provider}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {course.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Badge
                    variant="outline"
                    className={
                      course.price === 'Free'
                        ? 'bg-green-500/10 text-green-600 border-green-500/30'
                        : 'bg-orange-500/10 text-orange-600 border-orange-500/30'
                    }
                  >
                    {course.price}
                  </Badge>
                  <Button size="sm" variant="outline" className="h-8 border-primary/30" asChild>
                    <a href={course.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Enroll
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No courses found. Try different filters.
          </div>
        )}
      </div>
    </div>
  );
}
