'use client';

import * as React from 'react';
import { Search, Building2, MapPin, GraduationCap, Calendar, ExternalLink, Users } from 'lucide-react';
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
import { colleges } from '@/lib/data';

const states = ['All', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Telangana', 'Gujarat'];
const types = ['All', 'Government', 'Private'];

export default function CollegesPage() {
  const [search, setSearch] = React.useState('');
  const [state, setState] = React.useState('All');
  const [type, setType] = React.useState('All');

  const filtered = colleges.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.courses.some((co) => co.toLowerCase().includes(search.toLowerCase()));
    const matchState = state === 'All' || c.state === state;
    const matchType = type === 'All' || c.type === type;
    return matchSearch && matchState && matchType;
  });

  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="College Finder"
          title={
            <>
              Find the <span className="text-gradient">Right College</span> for
              You
            </>
          }
          description="Browse 1,200+ government and private colleges across India. Filter by state, type, course, fees, and ranking."
        />

        {/* Admission Guidance Banner */}
        <Card className="border-primary/10 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-brand-purple/10 to-accent/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">Admission Guidance 2026</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with current admissions, important dates, eligibility,
              cutoffs, scholarships, and government schemes.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'JEE Main 2026', date: 'Jan 2026', status: 'Application Open' },
                { label: 'NEET 2026', date: 'May 2026', status: 'Notification Out' },
                { label: 'CAT 2026', date: 'Nov 2026', status: 'Registration Soon' },
                { label: 'CLAT 2026', date: 'Dec 2026', status: 'Application Open' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-background/60 border">
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.date}</div>
                  <Badge className="mt-1 bg-green-500/10 text-green-600 border-green-500/30">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search colleges, cities, courses..."
              className="pl-10"
            />
          </div>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((college) => (
            <Card
              key={college.id}
              className="hover:shadow-glow transition-all hover:-translate-y-1 border-primary/10"
            >
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      college.type === 'Government'
                        ? 'bg-green-500/10 text-green-600 border-green-500/30'
                        : 'bg-blue-500/10 text-blue-600 border-blue-500/30'
                    }
                  >
                    {college.type}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">
                    {college.name}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {college.city}, {college.state}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {college.courses.map((course) => (
                    <Badge key={course} variant="secondary" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t">
                  <div>
                    <div className="text-xs text-muted-foreground">Fees</div>
                    <div className="font-medium">{college.fees}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Ranking</div>
                    <div className="font-medium">#{college.ranking}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Placements</div>
                    <div className="font-medium">{college.placements}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Seats</div>
                    <div className="font-medium flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {college.seats}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {college.admissionDate}
                  </span>
                  <Button size="sm" variant="outline" className="h-8 border-primary/30" asChild>
                    <a href={`https://${college.website}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Website
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No colleges found. Try different filters.
          </div>
        )}
      </div>
    </div>
  );
}
