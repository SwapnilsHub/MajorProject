'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Search,
  Building2,
  MapPin,
  ExternalLink,
  X,
  Bookmark,
  Share2,
  Clock,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  GraduationCap,
  Filter,
  Check,
  Target,
  Zap,
} from 'lucide-react';
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
import { AnimatedBg } from '@/components/animated-bg';
import { jobs, type Job } from '@/lib/data';
import {
  getSelectedDomain,
  setSelectedDomain,
  isJobMatchingDomain,
  DEFAULT_DOMAIN,
} from '@/lib/domain-selection';

export default function JobsPage() {
  const [search, setSearch] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('All');
  const [locationFilter, setLocationFilter] = React.useState('All');
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [bookmarkedJobs, setBookmarkedJobs] = React.useState<string[]>([]);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [selectedDomain, setLocalSelectedDomain] = React.useState(DEFAULT_DOMAIN);
  const [onlyRecommended, setOnlyRecommended] = React.useState(false);

  // Load saved bookmarks and read selected domain from URL query param or profile
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('edugram_saved_jobs');
      if (saved) setBookmarkedJobs(JSON.parse(saved));
    } catch (e) {}

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

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedJobs((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('edugram_saved_jobs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleCopyLink = (job: Job) => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Compute matched jobs for the chosen domain
  const domainMatchedJobs = React.useMemo(() => {
    return jobs.filter((job) => isJobMatchingDomain(job, selectedDomain));
  }, [selectedDomain]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === 'All' || job.type === typeFilter;
    const matchesLocation = locationFilter === 'All' || job.location === locationFilter;
    const matchesRecommended = !onlyRecommended || isJobMatchingDomain(job, selectedDomain);

    return matchesSearch && matchesType && matchesLocation && matchesRecommended;
  });

  const popularSkills = ['Python', 'React', 'DSA', 'Node.js', 'SQL', 'ML', 'C++'];

  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="h-4 w-4" /> Career Opportunities • EduGram
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Student Jobs & <span className="text-gradient">Internships</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Curated high-growth tech positions, summer internships, remote developer roles, and public sector exams specifically selected for university students and fresh graduates.
          </p>

          {/* Quick Stats Pill Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/80 text-xs text-muted-foreground shadow-sm">
              <Building2 className="w-4 h-4 text-primary" />
              <span>Top Hirers (Google, Microsoft, Amazon, Swiggy)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/80 text-xs text-muted-foreground shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>100% Verified Official Careers</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/80 text-xs text-muted-foreground shadow-sm">
              <GraduationCap className="w-4 h-4 text-cyan-500" />
              <span>Fresher & Student Friendly</span>
            </div>
          </div>
        </div>

        {/* AI RECOMMENDED JOBS & INTERNSHIPS BANNER FOR CHOSEN DOMAIN */}
        <div className="max-w-4xl mx-auto mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-indigo-500/10 border border-primary/25 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center text-white shrink-0 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display font-bold text-base sm:text-lg">
                    Recommended Roles for: {selectedDomain}
                  </h2>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/30 text-xs font-semibold"
                  >
                    ★ Active Professional Domain
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground max-w-xl">
                  We identified <strong>{domainMatchedJobs.length} opportunities</strong> matching your chosen professional domain in <strong>{selectedDomain}</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <Button
                size="sm"
                variant={onlyRecommended ? 'default' : 'outline'}
                onClick={() => setOnlyRecommended(!onlyRecommended)}
                className={`text-xs rounded-xl font-semibold flex-1 sm:flex-initial transition-all ${
                  onlyRecommended
                    ? 'bg-gradient-brand text-white shadow-md'
                    : 'border-primary/30 text-primary hover:bg-primary/10'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                {onlyRecommended ? 'Show All Positions' : `Filter ${selectedDomain} (${domainMatchedJobs.length})`}
              </Button>
              <Link href="/domains">
                <Button size="sm" variant="ghost" className="text-xs text-muted-foreground hover:text-foreground">
                  Change Domain →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search job title, company (Google, Amazon), skill (Python, React)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 rounded-xl border-border/80 bg-background/80"
              />
            </div>

            <Button
              variant={onlyRecommended ? 'default' : 'outline'}
              onClick={() => setOnlyRecommended(!onlyRecommended)}
              className={`h-12 rounded-xl text-xs sm:text-sm font-semibold shrink-0 gap-2 transition-all ${
                onlyRecommended
                  ? 'bg-gradient-brand text-white shadow-md'
                  : 'border-primary/30 text-primary hover:bg-primary/10'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {onlyRecommended
                ? `Filtered to ${selectedDomain}`
                : `⭐ Recommended for ${selectedDomain} (${domainMatchedJobs.length})`}
            </Button>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40 h-12 rounded-xl border-border/80 bg-background/80">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Government">Government</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-40 h-12 rounded-xl border-border/80 bg-background/80">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Locations</SelectItem>
                <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Gurugram">Gurugram</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Pan India">Pan India</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Skill Tags */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Popular Skills:
            </span>
            {popularSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => setSearch(skill === search ? '' : skill)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors shrink-0 ${
                  search.toLowerCase() === skill.toLowerCase()
                    ? 'bg-primary text-white border-primary'
                    : 'bg-background hover:bg-muted border-border/80 text-muted-foreground'
                }`}
              >
                {skill}
              </button>
            ))}
            {(search || typeFilter !== 'All' || locationFilter !== 'All' || onlyRecommended) && (
              <button
                onClick={() => {
                  setSearch('');
                  setTypeFilter('All');
                  setLocationFilter('All');
                  setOnlyRecommended(false);
                }}
                className="text-xs text-primary hover:underline ml-auto shrink-0 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>
              Showing <strong>{filteredJobs.length}</strong> {onlyRecommended ? `recommended (${selectedDomain})` : ''} opportunities
            </span>
            <span>{bookmarkedJobs.length} Saved</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 px-4 bg-muted/20 border border-border/60 rounded-3xl max-w-xl mx-auto space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg">No Matching Jobs Found</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                No roles match your current search and filters. Try searching for broader terms like "Engineer", "Intern", or clear your filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch('');
                  setTypeFilter('All');
                  setLocationFilter('All');
                  setOnlyRecommended(false);
                }}
                className="rounded-xl text-sm"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isMatched = isJobMatchingDomain(job, selectedDomain);
              return (
                <Card
                  key={job.id}
                  className={`transition-all rounded-2xl overflow-hidden group ${
                    isMatched
                      ? 'border-primary/40 shadow-[0_4px_24px_rgba(59,130,246,0.12)] hover:border-primary/60'
                      : 'border-primary/10 hover:border-primary/30 hover:shadow-glow'
                  }`}
                >
                  <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Company Initial Badge */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0 mt-0.5">
                        {job.company.charAt(0)}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className={
                              job.type === 'Internship'
                                ? 'border-cyan-500/30 text-cyan-500 bg-cyan-500/5'
                                : job.type === 'Remote'
                                ? 'border-purple-500/30 text-purple-500 bg-purple-500/5'
                                : job.type === 'Government'
                                ? 'border-amber-500/30 text-amber-500 bg-amber-500/5'
                                : 'border-primary/30 text-primary bg-primary/5'
                            }
                          >
                            {job.type}
                          </Badge>
                          {isMatched && (
                            <Badge
                              variant="outline"
                              className="border-primary/40 bg-primary/10 text-primary font-semibold text-[11px] gap-1.5 py-0.5 px-2.5 shadow-xs"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-primary fill-primary/20" />
                              Recommended for {selectedDomain}
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5 font-semibold text-foreground">
                            <Building2 className="h-3.5 w-3.5 text-primary" /> {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {job.location}
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {job.posted}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.skills.map((s) => (
                            <Badge key={s} variant="secondary" className="text-[11px] px-2 py-0.5 font-normal">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-border/50">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => toggleBookmark(job.id, e)}
                        className="rounded-xl h-10 w-10 text-muted-foreground hover:text-primary shrink-0"
                        title={bookmarkedJobs.includes(job.id) ? 'Saved' : 'Save Job'}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            bookmarkedJobs.includes(job.id) ? 'fill-primary text-primary' : ''
                          }`}
                        />
                      </Button>

                      <Button
                        onClick={() => setSelectedJob(job)}
                        className="bg-gradient-brand text-white rounded-xl text-sm font-semibold flex-1 md:flex-initial h-10 px-5 shadow-sm hover:shadow-md"
                      >
                        View Details & Apply <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Job Detail & Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
            <div className="bg-card border border-primary/20 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-5 shadow-2xl relative animate-scale-in max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-white font-bold text-2xl shadow-md shrink-0">
                  {selectedJob.company.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <Badge variant="outline">
                      {selectedJob.type}
                    </Badge>
                    {isJobMatchingDomain(selectedJob, selectedDomain) && (
                      <Badge
                        variant="outline"
                        className="border-primary/40 bg-primary/10 text-primary text-[11px] font-semibold gap-1.5 py-0.5 px-2"
                      >
                        <Sparkles className="w-3 h-3 text-primary fill-primary/20" /> Matches {selectedDomain}
                      </Badge>
                    )}
                  </div>
                  <h2 className="font-display font-bold text-2xl">{selectedJob.title}</h2>
                  <div className="text-sm font-semibold text-primary mt-0.5">
                    {selectedJob.company} • {selectedJob.location}
                  </div>
                </div>
              </div>

              {/* Highlights Box */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border/80 text-xs">
                <div>
                  <span className="text-muted-foreground">Compensation / CTC</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                    {selectedJob.salary}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Experience Required</span>
                  <p className="font-bold text-foreground text-sm mt-0.5">{selectedJob.experience}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Workplace</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedJob.location}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Posted Date</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedJob.posted}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-display font-semibold text-sm">Role Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedJob.description}</p>
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <h4 className="font-display font-semibold text-sm">Required Skills & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-3 border-t border-border/60">
                <Button
                  className="flex-1 bg-gradient-brand text-white rounded-xl h-11 font-semibold text-sm shadow-md"
                  asChild
                >
                  <a href={selectedJob.applyUrl} target="_blank" rel="noreferrer">
                    Apply on Official Site <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyLink(selectedJob)}
                  className="rounded-xl h-11 w-11 border-border/80 text-muted-foreground hover:text-foreground shrink-0"
                  title="Share / Copy Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                </Button>

                <Button
                  variant="outline"
                  className="rounded-xl border-border/80 h-11 px-5"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
