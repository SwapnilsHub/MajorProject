'use client';

import * as React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, ArrowRight, Brain, Trophy, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedBg } from '@/components/animated-bg';

export default function QuizPage() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-16">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-3xl text-center">
        <Card className="border-primary/20 bg-card/90 backdrop-blur-xl shadow-2xl overflow-hidden p-8 sm:p-12">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-primary/25 mb-6">
            <Compass className="h-8 w-8 text-white" />
          </div>

          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Domain Quizzes Integrated</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Quizzes Are Now Inside <span className="text-gradient">Each Domain</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            To make your learning experience completely focused, quizzes are now integrated directly inside each career domain (AI Engineering, Data Science, Full Stack, Cyber Security, etc.).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
            <div className="p-4 rounded-xl border border-primary/10 bg-primary/5 space-y-1">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Brain className="h-4 w-4 text-primary" />
                Domain Specific
              </div>
              <p className="text-xs text-muted-foreground">100% relevant questions matching your chosen career.</p>
            </div>
            <div className="p-4 rounded-xl border border-primary/10 bg-primary/5 space-y-1">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Random 5 Questions
              </div>
              <p className="text-xs text-muted-foreground">Dynamic randomized question set on every quiz attempt.</p>
            </div>
            <div className="p-4 rounded-xl border border-primary/10 bg-primary/5 space-y-1">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Trophy className="h-4 w-4 text-amber-500" />
                Instant Score & Review
              </div>
              <p className="text-xs text-muted-foreground">Performance score percentage & answer explanations.</p>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-brand text-white font-bold shadow-xl hover:opacity-95 text-base"
            asChild
          >
            <Link href="/domains" className="flex items-center justify-center gap-2">
              Explore Domains & Take Quiz
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
