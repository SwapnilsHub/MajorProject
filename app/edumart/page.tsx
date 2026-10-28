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
  UploadCloud,
  Sparkles,
  Loader2,
  Trash2,
  Check,
  PackagePlus,
  SlidersHorizontal,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { EduMartRealtimeChat } from '@/components/edumart-realtime-chat';
import { getSupabaseClient } from '@/lib/supabase/client';

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
  isCustom?: boolean;
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

// Preset sample photos for quick listing
const presetSampleImages = [
  { label: 'Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Textbook', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },
  { label: 'IoT / Electronics', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { label: 'Engineering Drafter', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { label: 'Laptop', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80' },
  { label: 'Study Notes', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80' },
];

export default function EduMartPage() {
  const [activeTab, setActiveTab] = React.useState<'edumart' | 'jobs'>('edumart');
  const [search, setSearch] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('All');
  const [itemsViewFilter, setItemsViewFilter] = React.useState<'all' | 'my-listings'>('all');

  const [products, setProducts] = React.useState<EduMartProduct[]>(mockEduMartProducts);
  const [selectedProduct, setSelectedProduct] = React.useState<EduMartProduct | null>(null);
  const [activeChatProduct, setActiveChatProduct] = React.useState<EduMartProduct | null>(null);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const { user } = useAuth();

  // Sell Item Modal State
  const [showSellModal, setShowSellModal] = React.useState(false);
  const [sellSuccessAlert, setSellSuccessAlert] = React.useState<string | null>(null);
  const [aiGeneratingDesc, setAiGeneratingDesc] = React.useState(false);
  const [isSubmittingSell, setIsSubmittingSell] = React.useState(false);

  const [sellForm, setSellForm] = React.useState({
    title: '',
    category: 'Books' as EduMartProduct['category'],
    condition: 'Like New' as EduMartProduct['condition'],
    sellingPrice: '',
    originalPrice: '',
    college: 'COEP Technological University',
    city: 'Pune',
    sellerName: 'You (Student Seller)',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
    description: '',
  });

  // Load user's customized & saved products from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('edumart_custom_products');
      if (stored) {
        const parsed: EduMartProduct[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts([...parsed, ...mockEduMartProducts]);
        }
      }
    } catch (e) {
      console.warn('Could not read custom EduMart products', e);
    }
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Image Upload handler for Sell Modal (converts to DataURL for immediate high-res preview)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSellForm((prev) => ({ ...prev, image: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  // AI Description Generator
  const handleGenerateAiDescription = () => {
    if (!sellForm.title) {
      alert('Please enter a Material Title first to generate an AI description.');
      return;
    }
    setAiGeneratingDesc(true);

    setTimeout(() => {
      const conditionNote =
        sellForm.condition === 'Like New'
          ? 'Barely used for 1 semester, completely flawless and clean.'
          : sellForm.condition === 'Good'
          ? 'Well-maintained with minor cosmetic signs, all essential functions/pages 100% intact.'
          : 'Functional condition with normal student wear, fully usable for coursework and exams.';

      const generated = `Genuine ${sellForm.title} in ${sellForm.condition} condition. ${conditionNote} Perfect for engineering and college students. Ready for instant campus hand-off at ${sellForm.college || 'campus'}. Selling because semester is completed!`;

      setSellForm((prev) => ({ ...prev, description: generated }));
      setAiGeneratingDesc(false);
    }, 500);
  };

  // Handle Form Submit for Selling Material
  const handlePublishListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellForm.title.trim() || !sellForm.sellingPrice.trim()) {
      alert('Please provide at least a Title and Selling Price.');
      return;
    }

    setIsSubmittingSell(true);

    const numericSelling = parseFloat(sellForm.sellingPrice.replace(/[^0-9.]/g, '')) || 0;
    const numericOriginal = parseFloat(sellForm.originalPrice.replace(/[^0-9.]/g, '')) || numericSelling * 1.5;

    const newProduct: EduMartProduct = {
      id: `em-custom-${Date.now()}`,
      title: sellForm.title.trim(),
      category: sellForm.category,
      price: `₹${numericSelling.toLocaleString('en-IN')}`,
      originalPrice: `₹${numericOriginal.toLocaleString('en-IN')}`,
      condition: sellForm.condition,
      sellerName: sellForm.sellerName || 'You (Student Seller)',
      college: sellForm.college || 'COEP Technological University',
      city: sellForm.city || 'Pune',
      verifiedSeller: true,
      image: sellForm.image || presetSampleImages[0].url,
      description:
        sellForm.description.trim() ||
        `High quality ${sellForm.title} in ${sellForm.condition} condition. Available for direct campus pickup.`,
      postedDate: 'Just now',
      isCustom: true,
    };

    // Update in-memory state (prepend at the very top of the list)
    setProducts((prev) => [newProduct, ...prev]);

    // Save to localStorage
    try {
      const existing: EduMartProduct[] = JSON.parse(
        localStorage.getItem('edumart_custom_products') || '[]'
      );
      localStorage.setItem('edumart_custom_products', JSON.stringify([newProduct, ...existing]));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // Try saving to InsForge PostgreSQL database
    try {
      const client = getSupabaseClient();
      const db = client.database ? client.database : client;
      if (db && typeof db.from === 'function') {
        await db.from('edumart_products').insert([
          {
            title: newProduct.title,
            category_slug: newProduct.category.toLowerCase().replace(/ /g, '-'),
            condition: newProduct.condition,
            description: newProduct.description,
            original_price: numericOriginal,
            selling_price: numericSelling,
            location: `${newProduct.college}, ${newProduct.city}`,
            images: [newProduct.image],
            status: 'active',
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (dbErr) {
      console.warn('InsForge database insert notice:', dbErr);
    }

    setIsSubmittingSell(false);
    setShowSellModal(false);
    // Automatically switch to "My Listed Items" tab so the user can see their newly published material
    setItemsViewFilter('my-listings');
    setSellSuccessAlert(`🎉 Your material "${newProduct.title}" has been published and added to "My Listed Items"!`);

    // Reset form
    setSellForm({
      title: '',
      category: 'Calculators',
      condition: 'Like New',
      sellingPrice: '',
      originalPrice: '',
      college: 'COEP Technological University',
      city: 'Pune',
      sellerName: 'You (Student Seller)',
      image: presetSampleImages[0].url,
      description: '',
    });

    // Auto dismiss alert after 5 seconds
    setTimeout(() => {
      setSellSuccessAlert(null);
    }, 5000);
  };

  // Delete custom listed product
  const handleDeleteCustomProduct = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove your listing?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      try {
        const stored = JSON.parse(localStorage.getItem('edumart_custom_products') || '[]');
        const filtered = stored.filter((p: EduMartProduct) => p.id !== productId);
        localStorage.setItem('edumart_custom_products', JSON.stringify(filtered));
      } catch (e) {}
      if (selectedProduct?.id === productId) setSelectedProduct(null);
    }
  };

  const allCatalogProductsCount = products.filter((p) => !p.isCustom).length;
  const myCustomListingsCount = products.filter((p) => p.isCustom).length;

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.college.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.sellerName.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;

    // "All Items" tab displays only materials from other sellers to buy (excludes your own published materials)
    // "My Listed Items" tab displays exclusively your published materials
    const matchesTab = itemsViewFilter === 'all' ? !p.isCustom : p.isCustom;

    return matchesSearch && matchesCat && matchesTab;
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
            Affordable Student Marketplace — Buy and sell second-hand textbooks, scientific calculators, lab kits, electronics, and study materials with real-time peer chat.
          </p>

          {/* Action Row: Navigation Tabs & Sell Button */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            <Button
              variant={activeTab === 'edumart' ? 'default' : 'outline'}
              onClick={() => setActiveTab('edumart')}
              className={
                activeTab === 'edumart'
                  ? 'bg-gradient-cyan-blue text-white rounded-xl shadow-md'
                  : 'rounded-xl border-primary/30'
              }
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> EduMart Marketplace
            </Button>

            <Button
              variant={activeTab === 'jobs' ? 'default' : 'outline'}
              onClick={() => setActiveTab('jobs')}
              className={
                activeTab === 'jobs'
                  ? 'bg-gradient-brand text-white rounded-xl shadow-md'
                  : 'rounded-xl border-primary/30'
              }
            >
              <Briefcase className="mr-2 h-4 w-4" /> Student Jobs & Internships
            </Button>

            {/* High-visibility "Sell Your Material" CTA */}
            <Button
              onClick={() => setShowSellModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 px-5 transition-transform hover:scale-105 active:scale-95"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Sell Your Material
            </Button>
          </div>
        </div>

        {/* Success Alert when product is published */}
        {sellSuccessAlert && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-between gap-3 animate-slide-down">
            <div className="flex items-center gap-2.5 font-medium text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{sellSuccessAlert}</span>
            </div>
            <button onClick={() => setSellSuccessAlert(null)} className="p-1 hover:bg-emerald-500/20 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search, Filter & View Controls */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  activeTab === 'edumart'
                    ? 'Search textbooks, calculators, lab kit, college, seller...'
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
                  <SelectItem value="Books">Textbooks & Books</SelectItem>
                  <SelectItem value="Calculators">Calculators</SelectItem>
                  <SelectItem value="Lab Equipment">Lab Equipment</SelectItem>
                  <SelectItem value="Electronics">Electronics & IoT</SelectItem>
                  <SelectItem value="Instruments">Instruments & Drafters</SelectItem>
                  <SelectItem value="Laptops">Laptops</SelectItem>
                  <SelectItem value="Study Materials">Study Materials</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Quick Filter Pill Bar for Marketplace */}
          {activeTab === 'edumart' && (
            <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
              <div className="flex items-center gap-2">
                <Button
                  variant={itemsViewFilter === 'all' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setItemsViewFilter('all')}
                  className={`rounded-lg text-xs h-8 px-3 ${
                    itemsViewFilter === 'all' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold border border-cyan-500/30' : ''
                  }`}
                >
                  All Items ({allCatalogProductsCount})
                </Button>
                <Button
                  variant={itemsViewFilter === 'my-listings' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setItemsViewFilter('my-listings')}
                  className={`rounded-lg text-xs h-8 px-3 ${
                    itemsViewFilter === 'my-listings' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30' : ''
                  }`}
                >
                  My Listed Items ({myCustomListingsCount})
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Link
                  href="/edumart/chat"
                  className="hover:text-cyan-500 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/60 hover:border-cyan-500/40 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Open Chat Inbox</span>
                </Link>
                <button
                  onClick={() => setShowSellModal(true)}
                  className="hover:text-emerald-500 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-medium transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Sell Item</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ─── EDUMART MARKETPLACE TAB ─── */}
        {activeTab === 'edumart' && (
          <div className="space-y-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 px-4 bg-muted/20 border border-border/60 rounded-3xl max-w-xl mx-auto space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-lg">No Materials Found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {itemsViewFilter === 'my-listings'
                    ? "You haven't listed any materials for sale yet. Click 'Sell Your Material' to put your textbooks or tools up for sale!"
                    : 'No materials match your current search or category filter. Try clearing your filters or list the item yourself.'}
                </p>
                <Button
                  onClick={() => setShowSellModal(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Sell Your Material Now
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="border-primary/10 overflow-hidden hover:shadow-glow transition-all rounded-2xl flex flex-col justify-between group relative"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                          <Badge className="bg-black/60 backdrop-blur-md text-white border-0 text-xs">
                            {product.condition}
                          </Badge>
                          {product.isCustom && (
                            <Badge className="bg-emerald-500/90 text-white border-0 text-[11px] font-bold shadow-sm">
                              Your Listing
                            </Badge>
                          )}
                        </div>

                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          {product.isCustom && (
                            <button
                              onClick={(e) => handleDeleteCustomProduct(product.id, e)}
                              title="Delete this listing"
                              className="p-2 rounded-full bg-red-500/80 hover:bg-red-600 text-white backdrop-blur-md transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="p-2 rounded-full bg-background/80 backdrop-blur-md hover:bg-background transition-colors"
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                              }`}
                            />
                          </button>
                        </div>
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

                    <div className="p-4 pt-0 space-y-2">
                      <Button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full bg-gradient-cyan-blue text-white rounded-xl text-sm"
                      >
                        View Details & Contact
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setActiveChatProduct(product)}
                        className="w-full rounded-xl text-xs border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat with Seller</span>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
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

        {/* ─── EDU-MART PRODUCT DETAILS MODAL ─── */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-card border border-primary/20 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative animate-scale-in max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="h-56 w-full rounded-2xl overflow-hidden bg-muted relative">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
                {selectedProduct.isCustom && (
                  <Badge className="absolute top-3 left-3 bg-emerald-500 text-white border-0 text-xs shadow-md">
                    Your Listed Material
                  </Badge>
                )}
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

              <p className="text-sm text-muted-foreground leading-relaxed">{selectedProduct.description}</p>

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

              {/* Chat with Seller Action Button */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => {
                    const toChat = selectedProduct;
                    setSelectedProduct(null);
                    setActiveChatProduct(toChat);
                  }}
                  className="flex-1 bg-gradient-cyan-blue text-white rounded-xl shadow-md hover:shadow-cyan-500/25 transition-all text-sm font-semibold h-11"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Chat with Seller
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-primary/30 h-11 px-5"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ─── REALTIME CHAT MODAL OVERLAY ─── */}
        {activeChatProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
            <EduMartRealtimeChat
              productId={activeChatProduct.id}
              productTitle={activeChatProduct.title}
              productPrice={activeChatProduct.price}
              productImage={activeChatProduct.image}
              productCondition={activeChatProduct.condition}
              sellerName={activeChatProduct.sellerName}
              sellerCollege={activeChatProduct.college}
              sellerCity={activeChatProduct.city}
              verifiedSeller={activeChatProduct.verifiedSeller}
              onClose={() => setActiveChatProduct(null)}
              isModal
            />
          </div>
        )}

        {/* ─── SELL YOUR MATERIAL MODAL ─── */}
        {showSellModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
            <div className="bg-card border border-primary/20 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative animate-scale-in max-h-[92vh] overflow-y-auto">
              <button
                onClick={() => setShowSellModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase mb-2">
                  <PackagePlus className="w-3.5 h-3.5" /> List Material For Sale
                </div>
                <h2 className="font-display font-bold text-2xl md:text-3xl">Sell on EduMart</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  List your used textbooks, scientific calculators, or lab gear. Connect with student peers directly on campus!
                </p>
              </div>

              <form onSubmit={handlePublishListing} className="space-y-6">
                {/* 1. Material Photo */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold flex items-center justify-between">
                    <span>1. Material Photo <span className="text-red-500">*</span></span>
                    <span className="text-xs text-muted-foreground font-normal">Upload photo or pick a sample</span>
                  </Label>

                  <div className="grid md:grid-cols-[140px_1fr] gap-4 items-center">
                    {/* Thumbnail Preview */}
                    <div className="w-full h-32 rounded-2xl overflow-hidden border-2 border-border/80 bg-muted/40 relative flex items-center justify-center shrink-0">
                      {sellForm.image ? (
                        <img src={sellForm.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <UploadCloud className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="relative border-2 border-dashed border-primary/25 rounded-xl p-3 text-center hover:bg-primary/5 transition-colors cursor-pointer bg-muted/20">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center justify-center gap-2 text-xs font-medium text-foreground">
                          <UploadCloud className="w-4 h-4 text-cyan-500" />
                          <span>Click to Upload Your Material Photo</span>
                        </div>
                      </div>

                      {/* Preset Sample Photo Selectors */}
                      <div className="space-y-1">
                        <span className="text-[11px] text-muted-foreground">Or pick a quick category template:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {presetSampleImages.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSellForm((prev) => ({ ...prev, image: preset.url }))}
                              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                                sellForm.image === preset.url
                                  ? 'bg-cyan-500/15 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                                  : 'border-border/70 hover:bg-muted text-muted-foreground'
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Material Details */}
                <div className="space-y-4 pt-2 border-t border-border/70">
                  <h3 className="text-sm font-semibold">2. Material Details</h3>

                  <div className="space-y-2">
                    <Label htmlFor="sell-title" className="text-xs">
                      Material Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="sell-title"
                      placeholder="e.g. Casio fx-991EX ClassWiz Scientific Calculator"
                      value={sellForm.title}
                      onChange={(e) => setSellForm({ ...sellForm, title: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sell-category" className="text-xs">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={sellForm.category}
                        onValueChange={(val: any) => setSellForm({ ...sellForm, category: val })}
                      >
                        <SelectTrigger id="sell-category" className="rounded-xl">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Calculators">Calculators</SelectItem>
                          <SelectItem value="Books">Textbooks & Books</SelectItem>
                          <SelectItem value="Lab Equipment">Lab Equipment</SelectItem>
                          <SelectItem value="Electronics">Electronics & IoT</SelectItem>
                          <SelectItem value="Instruments">Instruments & Drafters</SelectItem>
                          <SelectItem value="Laptops">Laptops</SelectItem>
                          <SelectItem value="Study Materials">Study Materials</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sell-condition" className="text-xs">
                        Condition <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={sellForm.condition}
                        onValueChange={(val: any) => setSellForm({ ...sellForm, condition: val })}
                      >
                        <SelectTrigger id="sell-condition" className="rounded-xl">
                          <SelectValue placeholder="Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Like New">Like New (Mint / Barely Used)</SelectItem>
                          <SelectItem value="Good">Good (Minor wear, 100% works)</SelectItem>
                          <SelectItem value="Fair">Fair (Noticeable wear, fully usable)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sell-desc" className="text-xs">
                        Description & Notes
                      </Label>
                      <button
                        type="button"
                        onClick={handleGenerateAiDescription}
                        disabled={aiGeneratingDesc}
                        className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        {aiGeneratingDesc ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        <span>AI Auto-Generate Description</span>
                      </button>
                    </div>
                    <Textarea
                      id="sell-desc"
                      placeholder="Mention how long you used it, if accessories/boxes are included, and when you can meet on campus..."
                      value={sellForm.description}
                      onChange={(e) => setSellForm({ ...sellForm, description: e.target.value })}
                      rows={3}
                      className="rounded-xl text-sm"
                    />
                  </div>
                </div>

                {/* 3. Pricing & Campus Location */}
                <div className="space-y-4 pt-2 border-t border-border/70">
                  <h3 className="text-sm font-semibold">3. Pricing & Campus Info</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sell-price" className="text-xs">
                        Selling Price (₹) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="sell-price"
                        type="number"
                        placeholder="e.g. 750"
                        value={sellForm.sellingPrice}
                        onChange={(e) => setSellForm({ ...sellForm, sellingPrice: e.target.value })}
                        className="rounded-xl font-bold text-foreground"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sell-original" className="text-xs">
                        Original MRP / Bought Price (₹)
                      </Label>
                      <Input
                        id="sell-original"
                        type="number"
                        placeholder="e.g. 1495"
                        value={sellForm.originalPrice}
                        onChange={(e) => setSellForm({ ...sellForm, originalPrice: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sell-college" className="text-xs">
                        College / Campus
                      </Label>
                      <Input
                        id="sell-college"
                        placeholder="e.g. COEP Technological University"
                        value={sellForm.college}
                        onChange={(e) => setSellForm({ ...sellForm, college: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sell-city" className="text-xs">
                        City
                      </Label>
                      <Input
                        id="sell-city"
                        placeholder="e.g. Pune"
                        value={sellForm.city}
                        onChange={(e) => setSellForm({ ...sellForm, city: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex gap-3 pt-3">
                  <Button
                    type="submit"
                    disabled={isSubmittingSell}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl h-11 text-sm shadow-md shadow-emerald-500/20"
                  >
                    {isSubmittingSell ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" /> Publish Material to EduMart
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowSellModal(false)}
                    className="rounded-xl border-border/80 h-11 px-5"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
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
                <Badge variant="outline" className="mb-2">
                  {selectedJob.type}
                </Badge>
                <h2 className="font-display font-bold text-2xl">{selectedJob.title}</h2>
                <div className="text-sm font-semibold text-primary mt-1">
                  {selectedJob.company} • {selectedJob.location}
                </div>
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
