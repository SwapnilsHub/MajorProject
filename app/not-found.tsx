import Link from 'next/link';
import { Home, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedBg } from '@/components/animated-bg';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <AnimatedBg />
      <div className="text-center space-y-6 relative z-10 max-w-md mx-auto">
        <div className="relative inline-flex">
          <div className="absolute inset-0 bg-gradient-brand rounded-full blur-2xl animate-pulse-glow" />
          <div className="relative bg-gradient-brand p-6 rounded-2xl">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>
        </div>
        <div>
          <h1 className="font-display text-7xl md:text-8xl font-bold text-gradient">
            404
          </h1>
          <h2 className="font-display text-2xl font-bold mt-4">
            Oops! This page went off to study.
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Don&apos;t worry. Let&apos;s get you back to EduGram.
          </p>
        </div>
        <Button className="bg-gradient-brand text-white shadow-glow" size="lg" asChild>
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to EduGram
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
