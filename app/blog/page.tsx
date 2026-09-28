import Link from 'next/link';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/section-header';
import { AnimatedBg } from '@/components/animated-bg';
import { blogPosts } from '@/lib/data';

export default function BlogPage() {
  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Blog & Resources"
          title={
            <>
              Career Tips, Tech Trends &{' '}
              <span className="text-gradient">Success Stories</span>
            </>
          }
          description="Stay informed with the latest career tips, interview strategies, emerging technologies, government exam updates, and inspiring success stories."
        />

        {/* Featured post */}
        <Link href={`/blog/${blogPosts[0].slug}`} className="block mb-8">
          <Card className="border-primary/10 overflow-hidden hover:shadow-glow transition-all group">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80" />
                <Badge className="absolute top-4 left-4 bg-gradient-brand text-white">
                  Featured
                </Badge>
              </div>
              <div className="p-8 flex flex-col justify-center space-y-4">
                <Badge variant="outline" className="w-fit text-primary border-primary/30">
                  {blogPosts[0].category}
                </Badge>
                <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {blogPosts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {blogPosts[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {blogPosts[0].readTime}
                  </span>
                </div>
                <div className="flex items-center text-primary font-medium">
                  Read More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-glow transition-all hover:-translate-y-1 border-primary/10 overflow-hidden group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-gradient-brand text-white">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="pt-4 space-y-3">
                  <h3 className="font-display font-semibold text-lg leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
