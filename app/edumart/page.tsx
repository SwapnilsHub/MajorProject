'use client';

import * as React from 'react';
import {
  Search,
  ShoppingBag,
  Book,
  Calculator,
  Laptop,
  Layers,
  MapPin,
  Heart,
  PlusCircle,
  ExternalLink,
  X,
  Building2,
  CheckCircle2,
  Tag,
  MessageCircle,
  ShieldCheck,
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';
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
import { useAuth } from '@/components/auth-provider';

export interface EduMartProduct {
  id: string;
  title: string;
  category: 'Books' | 'Calculators' | 'Lab Equipment' | 'Electronics' | 'Instruments' | 'Laptops' | 'Study Materials';
  price: string;
  originalPrice: string;
  condition: 'Like New' | 'Good' | 'Fair';
  sellerName: string;
  college: string;
  city: string;
  verifiedSeller: boolean;
  image: string;
  description: string;
  postedDate: string;
}

const mockEduMartProducts: EduMartProduct[] = [
  {
    id: 'em-1',
    title: 'Casio fx-991EX ClassWiz Scientific Calculator',
    category: 'Calculators',
    price: '₹750',
    originalPrice: '₹1,495',
    condition: 'Like New',
    sellerName: 'Rohan Sharma',
    college: 'COEP Technological University',
    city: 'Pune',
    verifiedSeller: true,
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
    description: 'Perfect working condition scientific calculator. Used for 1 semester only. Original box and cover included.',
    postedDate: '2 days ago',
  },
  {
    id: 'em-2',
    title: 'Higher Engineering Mathematics by B.S. Grewal (44th Ed)',
    category: 'Books',
    price: '₹350',
    originalPrice: '₹895',
    condition: 'Good',
    sellerName: 'Priya Verma',
    college: 'IIT Bombay',
    city: 'Mumbai',
    verifiedSeller: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: 'Essential textbook for 1st & 2nd year engineering. No highlighted pages, clean pages with notes included.',
    postedDate: '1 day ago',
  },
  {
    id: 'em-3',
    title: 'Complete Electronics & IoT Lab Kit (Arduino + Sensors)',
    category: 'Lab Equipment',
    price: '₹1,100',
    originalPrice: '₹2,400',
    condition: 'Like New',
    sellerName: 'Aditya Patil',
    college: 'VIT Pune',
    city: 'Pune',
    verifiedSeller: true,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Includes Arduino Uno, breadboards, jumper wires, ultrasonic sensors, DHT11, servo motors, and LEDs.',
    postedDate: '3 days ago',
  },
  {
    id: 'em-4',
    title: 'Mini Engineering Drafter + A2 Drawing Board Set',
    category: 'Instruments',
    price: '₹450',
    originalPrice: '₹1,200',
    condition: 'Good',
    sellerName: 'Neha Kulkarni',
    college: 'PICT Pune',
    city: 'Pune',
    verifiedSeller: false,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    description: 'Complete engineering graphics set including mini drafter, clips, compass set, and A2 carrying bag.',
    postedDate: '4 days ago',
  },
  {
    id: 'em-5',
    title: 'Lenovo ThinkPad i5 8th Gen (8GB RAM / 256GB SSD)',
    category: 'Laptops',
    price: '₹14,500',
    originalPrice: '₹45,000',
    condition: 'Good',
    sellerName: 'Saurabh Joshi',
    college: 'VJTI Mumbai',
    city: 'Mumbai',
    verifiedSeller: true,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    description: 'Ideal coding laptop for students. Fast SSD, fresh Windows 11 installation, 4 hours battery backup.',
    postedDate: '5 days ago',
  },
  {
    id: 'em-6',
    title: 'Data Structures & Algorithms in C++ by Cormen (CLRS)',
    category: 'Books',
    price: '₹490',
    originalPrice: '₹1,190',
    condition: 'Like New',
    sellerName: 'Vikram Singh',
    college: 'NIT Trichy',
    city: 'Tiruchirappalli',
    verifiedSeller: true,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    description: 'Standard DSA reference book for GATE and coding interviews. Excellent condition.',
    postedDate: 'Just now',
  },
];

export default function EduMartPage() {
  const [activeTab, setActiveTab] = React.useState<'edumart' | 'jobs'>('edumart');
  const [search, setSearch] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('All');
  const [selectedProduct, setSelectedProduct] = React.useState<EduMartProduct | null>(null);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const { user } = useAuth();

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = mockEduMartProducts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.college.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Sub-brand Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <ShoppingBag className="h-4 w-4" /> EduGram → EduMart
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            EduMart <span className="text-gradient-cyan">Marketplace</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Affordable Education Marketplace — Buy and sell second-hand books, calculators, lab equipment, electronics, instruments and study materials at student-friendly prices.
          </p>

          {/* Navigation Toggle Tabs */}
          <div className="flex justify-center gap-3 pt-2">
            <Button
              variant={activeTab === 'edumart' ? 'default' : 'outline'}
              onClick={() => setActiveTab('edumart')}
              className={activeTab === 'edumart' ? 'bg-gradient-cyan-blue text-white rounded-xl shadow-md' : 'rounded-xl border-primary/30'}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> EduMart Marketplace
            </Button>
            <Button
              variant={activeTab === 'jobs' ? 'default' : 'outline'}
              onClick={() => setActiveTab('jobs')}
              className={activeTab === 'jobs' ? 'bg-gradient-brand text-white rounded-xl shadow-md' : 'rounded-xl border-primary/30'}
            >
              <Briefcase className="mr-2 h-4 w-4" /> Student Jobs & Internships
            </Button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  activeTab === 'edumart'
                    ? 'Search textbooks, calculators, lab kit, college...'
                    : 'Search job title, company, location...'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 rounded-xl border-border/80 bg-background/80"
              />
            </div>
            {activeTab === 'edumart' && (
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-56 h-12 rounded-xl border-border/80 bg-background/80">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Books">Textbooks</SelectItem>
                  <SelectItem value="Calculators">Calculators</SelectItem>
                  <SelectItem value="Lab Equipment">Lab Equipment</SelectItem>
                  <SelectItem value="Electronics">Electronics & IoT</SelectItem>
                  <SelectItem value="Instruments">Instruments & Drafters</SelectItem>
                  <SelectItem value="Laptops">Laptops</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* ─── EDUMART MARKETPLACE TAB ─── */}
        {activeTab === 'edumart' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="border-primary/10 overflow-hidden hover:shadow-glow transition-all rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white border-0 text-xs">
                        {product.condition}
                      </Badge>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-md hover:bg-background transition-colors"
                      >
                        <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                      </button>
                    </div>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs text-cyan-600 border-cyan-500/30 bg-cyan-500/5">
                          {product.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{product.postedDate}</span>
                      </div>
                      <h3 className="font-display font-semibold text-base line-clamp-2">{product.title}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display font-bold text-xl text-gradient-cyan">{product.price}</span>
                        <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1 pt-1 border-t">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground flex items-center gap-1">
                            {product.sellerName}
                            {product.verifiedSeller && <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" />}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {product.city}
                          </span>
                        </div>
                        <div className="truncate text-muted-foreground">{product.college}</div>
                      </div>
                    </CardContent>
                  </div>
                  <div className="p-4 pt-0">
                    <Button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full bg-gradient-cyan-blue text-white rounded-xl text-sm"
                    >
                      View Details & Contact
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ─── JOBS & INTERNSHIPS TAB ─── */}
        {activeTab === 'jobs' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="border-primary/10 hover:border-primary/30 transition-all rounded-2xl">
                <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-lg">{job.title}</h3>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium text-foreground">
                        <Building2 className="h-3.5 w-3.5 text-primary" /> {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </span>
                      <span className="text-emerald-600 font-semibold">{job.salary}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.skills.map((s) => (
                        <Badge key={s} variant="secondary" className="text-[11px] px-2 py-0.5">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedJob(job)}
                    className="bg-gradient-brand text-white rounded-xl shrink-0"
                  >
                    View Job <ExternalLink className="ml-1.5 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* EduMart Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-card border border-primary/20 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative animate-scale-in">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="h-56 w-full rounded-2xl overflow-hidden bg-muted">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2">
                <Badge variant="outline" className="text-xs text-cyan-600 border-cyan-500/30">
                  {selectedProduct.category} • {selectedProduct.condition}
                </Badge>
                <h2 className="font-display font-bold text-xl">{selectedProduct.title}</h2>
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-bold text-2xl text-gradient-cyan">{selectedProduct.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{selectedProduct.originalPrice}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="p-4 rounded-xl border bg-muted/30 space-y-2 text-sm">
                <div className="font-semibold flex items-center justify-between">
                  <span>Seller Info</span>
                  {selectedProduct.verifiedSeller && (
                    <Badge className="bg-cyan-500/10 text-cyan-600 border-cyan-500/30 text-xs">
                      Verified Student Seller
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">Name: {selectedProduct.sellerName}</div>
                <div className="text-xs text-muted-foreground">College: {selectedProduct.college}</div>
                <div className="text-xs text-muted-foreground">City: {selectedProduct.city}</div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button className="flex-1 bg-gradient-cyan-blue text-white rounded-xl">
                  <MessageCircle className="mr-2 h-4 w-4" /> Chat with Seller
                </Button>
                <Button variant="outline" className="rounded-xl border-primary/30" onClick={() => setSelectedProduct(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Job Detail Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-card border border-primary/20 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative animate-scale-in">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
              <div>
                <Badge variant="outline" className="mb-2">{selectedJob.type}</Badge>
                <h2 className="font-display font-bold text-2xl">{selectedJob.title}</h2>
                <div className="text-sm font-semibold text-primary mt-1">{selectedJob.company} • {selectedJob.location}</div>
                <div className="text-xs text-emerald-600 font-bold mt-1">{selectedJob.salary}</div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedJob.description}</p>
              <div className="flex gap-3 pt-2">
                <Button className="flex-1 bg-gradient-brand text-white rounded-xl" asChild>
                  <a href={selectedJob.applyUrl} target="_blank" rel="noreferrer">
                    Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="rounded-xl border-primary/30" onClick={() => setSelectedJob(null)}>
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
