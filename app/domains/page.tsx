'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, TrendingUp, Briefcase, ArrowRight, Compass, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SectionHeader } from '@/components/section-header';
import { AnimatedBg } from '@/components/animated-bg';
import { careers } from '@/lib/data';

const categories = [
  'All',
  'AI & Machine Learning',
  'Data & Analytics',
  'Software Development',
  'Cyber Security',
  'Cloud Computing',
  'Design',
  'Marketing',
  'Emerging Tech',
  'Government Jobs',
  'Medical',
  'Law',
  'Commerce',
  'Management',
  'Agriculture',
];

export default function DomainsPage() {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('All');

  const filtered = careers.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === 'All' || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Domains Explorer"
          title={
            <>
              Explore Popular <span className="text-gradient">Tech & Career Domains</span>
            </>
          }
          description="Discover detailed roadmaps, skills, salary trends, and top opportunities across engineering, design, management, medical, law, and emerging technology domains."
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search domains, skills, careers..."
              className="pl-10"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="sm:w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((career) => {
            const Icon = career.icon;
            return (
              <Link key={career.slug} href={`/domains/${career.slug}`}>
                <Card className="group h-full hover:shadow-glow transition-all hover:-translate-y-1 border-primary/10 cursor-pointer">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          career.demand === 'Very High'
                            ? 'bg-green-500/10 text-green-600 border-green-500/30'
                            : career.demand === 'High'
                            ? 'bg-blue-500/10 text-blue-600 border-blue-500/30'
                            : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30'
                        }
                      >
                        {career.demand}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg">
                        {career.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {career.category}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {career.overview}
                    </p>
                    <div className="flex items-center gap-4 text-sm pt-2 border-t">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        {career.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4 text-primary" />
                        {career.growth}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2">
                      {career.skills.slice(0, 4).map((s) => (
                        <Badge
                          key={s}
                          variant="secondary"
                          className="text-xs"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-primary font-medium pt-2 group-hover:gap-2 transition-all">
                      View Domain Roadmap <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No domains found. Try a different search or category filter.
          </div>
        )}
      </div>
    </div>
  );
}
