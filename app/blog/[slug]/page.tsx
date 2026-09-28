'use client';

import * as React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return (
      <div className="pt-20 pb-20 text-center">
        <h1 className="font-display text-2xl font-bold">Article not found</h1>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="pt-8 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article className="max-w-3xl mx-auto">
          <Badge className="bg-gradient-brand text-white mb-4">{post.category}</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime} read
            </span>
          </div>

          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
            <p className="text-lg leading-relaxed">{post.excerpt}</p>
            <p>
              In today&apos;s rapidly evolving job market, making the right career
              choice is more important than ever. With new technologies
              emerging every year and traditional roles being transformed by
              automation, students need guidance that goes beyond conventional
              career counseling.
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground pt-4">
              Understanding the Landscape
            </h2>
            <p>
              The first step in any successful career journey is understanding
              the current landscape. Industries are converging, new roles are
              being created, and the skills required are constantly evolving.
              This is where AI-powered platforms like EduGram come
              in — analyzing market trends, salary data, and future demand to
              provide personalized career roadmaps and learning recommendations.
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground pt-4">
              Key Takeaways
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Assess your interests and strengths honestly</li>
              <li>Research emerging fields and their growth potential</li>
              <li>Build a diverse skill set through continuous learning</li>
              <li>Seek mentorship and industry connections</li>
              <li>Stay adaptable and open to new opportunities</li>
            </ul>
            <p>
              Remember, your career is a journey, not a destination. The most
              successful professionals are those who remain curious, keep
              learning, and are willing to pivot when new opportunities arise.
              With the right guidance and a proactive approach, you can build a
              fulfilling and rewarding career.
            </p>
          </div>

          <div className="flex items-center justify-between pt-8 border-t mt-8">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </Button>
            <Button className="bg-gradient-brand text-white" size="sm" asChild>
              <Link href="/learn">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>

        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`}>
                <Card className="h-full hover:shadow-glow transition-all hover:-translate-y-1 border-primary/10 overflow-hidden group cursor-pointer">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="pt-4 space-y-2">
                    <Badge variant="outline" className="text-xs">{r.category}</Badge>
                    <h3 className="font-display font-semibold leading-snug group-hover:text-primary transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{r.readTime} read</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
