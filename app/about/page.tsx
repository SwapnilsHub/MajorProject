import Link from 'next/link';
import { Target, Rocket, Award, Users, BookOpen, Sparkles, CheckCircle2, ArrowRight, PlayCircle, ShoppingBag, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/section-header';
import { AnimatedBg } from '@/components/animated-bg';
import { stats } from '@/lib/data';

const objectives = [
  'Interactive educational videos, courses, and bite-sized learning reels for modern students',
  'Subject-wise quizzes, MCQs, timed challenges, and competitive leaderboards',
  'Hands-on project recommendations and step-by-step skill roadmaps',
  'EduMart — an affordable second-hand marketplace for textbooks, calculators, and lab gear',
  'Progress tracking with study hours, completion certificates, and achievement streaks',
  'In-depth career exploration, salary insights, and top college finder',
  'Student community discussions, project showcases, and peer collaboration',
];

const ecosystemPillars = [
  { step: '1', title: 'Learn', desc: 'Watch structured video lessons and quick learning reels crafted for easy understanding.' },
  { step: '2', title: 'Practice', desc: 'Test your knowledge with subject quizzes, timed challenges, and instant feedback.' },
  { step: '3', title: 'Build', desc: 'Apply what you learn with recommended real-world projects and detailed roadmaps.' },
  { step: '4', title: 'Track', desc: 'Monitor your progress, earn certificates, and build a strong student profile.' },
  { step: '5', title: 'Exchange', desc: 'Buy and sell second-hand study materials at affordable prices on EduMart.' },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="About EduGram"
          title={
            <>
              Your Digital <span className="text-gradient">Education Community</span>
            </>
          }
          description="EduGram brings learning, career development, educational resources, projects, and affordable study materials together in one platform."
        />

        {/* Mission / Vision / Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To empower every student with accessible learning resources, interactive tools, and an affordable marketplace for educational materials.', color: 'from-blue-500 to-cyan-500' },
            { icon: Rocket, title: 'Our Vision', desc: 'To create India’s most vibrant digital student community where learning, building, and resource sharing thrive together seamlessly.', color: 'from-purple-500 to-indigo-500' },
            { icon: Award, title: 'Our Values', desc: 'Accessibility, affordability, student empowerment, and collaboration. We believe high-quality education and study gear should be accessible to all.', color: 'from-emerald-500 to-teal-500' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} className="border-primary/10 hover:shadow-glow transition-all">
                <CardContent className="pt-6 space-y-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-xl">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="py-12 bg-gradient-to-r from-primary/5 via-brand-purple/5 to-accent/5 rounded-3xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <SectionHeader
            eyebrow="What EduGram Delivers"
            title={
              <>
                A Complete <span className="text-gradient">Education Ecosystem</span>
              </>
            }
            description="From video lessons to second-hand textbook trading — everything designed for student success."
          />
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {objectives.map((obj, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl border bg-card hover:bg-primary/5 transition-colors"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EduGram Pillars */}
        <div className="mb-16">
          <SectionHeader
            eyebrow="EduGram Ecosystem"
            title={
              <>
                How <span className="text-gradient">EduGram</span> Works
              </>
            }
            description="Five interconnected pillars empowering your educational journey."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {ecosystemPillars.map((m, i) => (
              <Card key={i} className="border-primary/10 relative">
                <CardContent className="pt-6 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand text-white font-bold flex items-center justify-center">
                    {m.step}
                  </div>
                  <h3 className="font-display font-semibold">{m.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {m.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative rounded-3xl bg-gradient-brand p-12 text-center overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto text-white">
            <GraduationCap className="h-10 w-10 mx-auto opacity-90" />
            <h2 className="font-display text-3xl font-bold">
              Join the EduGram Community Today
            </h2>
            <p className="opacity-90">
              Learn, share, build projects, and exchange study materials with thousands of students across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button size="lg" variant="secondary" className="bg-white text-primary" asChild>
                <Link href="/register">
                  Join EduGram <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/learn">Start Learning</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
