'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trophy, CheckCircle2, XCircle, Clock, Target, ArrowRight,
  Download, Share2, RefreshCw, ChevronDown, ChevronUp, Brain,
  Star, Award, Lightbulb,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AnimatedBg } from '@/components/animated-bg';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface QuizResult {
  category: string;
  difficulty: string;
  score: number;
  total: number;
  timeTaken: number;
  answers: {
    selected: number | null;
    correct: number | string;
    question: string;
    explanation: string;
    options?: string[];
  }[];
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

const categoryImprovements: Record<string, string[]> = {
  programming: ['Practice coding problems on LeetCode or HackerRank daily', 'Study Big-O notation and complexity analysis', 'Review data structures: arrays, linked lists, trees, graphs'],
  'ai-ml': ['Watch ML crash course on YouTube', 'Practice with scikit-learn on Kaggle datasets', 'Read: Hands-on Machine Learning by Aurélien Géron'],
  'data-science': ['Practice pandas and NumPy operations daily', 'Take a statistics refresher course', 'Build 2–3 Kaggle projects with EDA'],
  'web-development': ['Build small React projects daily', 'Study HTTP methods, REST principles', 'Practice CSS flexbox and grid layouts'],
  aptitude: ['Solve 10 aptitude problems daily', 'Use shortcuts for percentage and ratio problems', 'Time yourself strictly while practicing'],
  'logical-reasoning': ['Practice series and pattern questions daily', 'Study coding-decoding techniques', 'Solve verbal reasoning sets'],
  default: ['Review weak areas identified in this quiz', 'Practice with more questions in this category', 'Watch video tutorials on topics you missed'],
};

export default function QuizResultsPage() {
  const router = useRouter();
  const [result, setResult] = React.useState<QuizResult | null>(null);
  const [expandedQ, setExpandedQ] = React.useState<number | null>(null);
  const [showCert, setShowCert] = React.useState(false);

  React.useEffect(() => {
    const stored = sessionStorage.getItem('quizResult');
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      router.replace('/quiz');
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const accuracy = Math.round((result.score / result.total) * 100);
  const passed = accuracy >= 70;
  const wrong = result.total - result.score;
  const skipped = result.answers.filter((a) => a.selected === null).length;

  const pieData = [
    { name: 'Correct', value: result.score, color: 'hsl(142 76% 36%)' },
    { name: 'Wrong', value: wrong - skipped, color: 'hsl(0 84% 60%)' },
    { name: 'Skipped', value: skipped, color: 'hsl(215 16% 47%)' },
  ];

  const improvements = categoryImprovements[result.category] || categoryImprovements.default;

  const handlePrint = () => window.print();

  return (
    <div className="relative min-h-screen pb-20 pt-8">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-4xl">

        {/* Score Hero */}
        <Card className={`border-2 mb-6 overflow-hidden ${passed ? 'border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5' : 'border-red-400/30 bg-gradient-to-br from-red-500/5 to-orange-500/5'}`}>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="text-6xl mb-4">{passed ? '🎉' : '💪'}</div>
            <h1 className="font-display text-4xl font-bold mb-2">
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {passed
                ? 'You passed the quiz! Great work on demonstrating your knowledge.'
                : 'You didn\'t pass this time, but every attempt helps you improve.'}
            </p>

            {/* Score circle */}
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-4 mb-6 ${passed ? 'border-green-500 bg-green-500/10' : 'border-orange-400 bg-orange-400/10'}`}>
              <div>
                <div className={`font-display text-4xl font-bold ${passed ? 'text-green-600 dark:text-green-400' : 'text-orange-500'}`}>
                  {accuracy}%
                </div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
              {[
                { label: 'Score', value: `${result.score}/${result.total}`, icon: Target, color: 'text-blue-500' },
                { label: 'Correct', value: result.score, icon: CheckCircle2, color: 'text-green-500' },
                { label: 'Wrong', value: wrong, icon: XCircle, color: 'text-red-500' },
                { label: 'Time', value: formatTime(result.timeTaken), icon: Clock, color: 'text-purple-500' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="p-3 rounded-xl bg-background/60 border text-center">
                    <Icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                    <div className="font-bold text-lg">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Pie chart */}
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> Answer Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="border-primary/10 bg-gradient-to-br from-primary/5 to-violet-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" /> AI Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {improvements.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{tip}</span>
                </div>
              ))}
              <div className="pt-2">
                <div className="text-xs font-semibold text-primary mb-1.5">📚 Recommended Next Topics</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Data Structures', 'System Design', 'Problem Solving', 'Complexity Analysis'].slice(0, 3).map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificate section */}
        {passed && (
          <Card className="border-yellow-400/30 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-yellow-900/10 dark:to-amber-900/10 mb-6">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold">Certificate Unlocked!</div>
                    <div className="text-sm text-muted-foreground">
                      {result.category.charAt(0).toUpperCase() + result.category.slice(1)} — {result.difficulty} Level
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handlePrint}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Q&A Review */}
        <Card className="border-primary/10 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Question-by-Question Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.answers.map((a, i) => {
              const isCorrect = a.selected !== null && a.selected === a.correct;
              const isSkipped = a.selected === null;
              const isOpen = expandedQ === i;

              return (
                <div key={i} className={`rounded-xl border-2 overflow-hidden ${isCorrect ? 'border-green-500/30' : isSkipped ? 'border-gray-300/30' : 'border-red-400/30'}`}>
                  <button
                    className="w-full text-left p-4 flex items-start gap-3 hover:bg-muted/20 transition-colors"
                    onClick={() => setExpandedQ(isOpen ? null : i)}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : isSkipped ? (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium line-clamp-2">{a.question.replace(/```[\s\S]*?```/g, '[code]')}</span>
                    </div>
                    <div className="shrink-0">
                      {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 space-y-3 border-t bg-muted/10">
                      {a.options && a.options.map((opt, optIdx) => {
                        const isUserChoice = a.selected === optIdx;
                        const isCorrectAnswer = a.correct === optIdx;
                        return (
                          <div
                            key={optIdx}
                            className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${isCorrectAnswer ? 'bg-green-100 dark:bg-green-900/20 border border-green-400/40' : isUserChoice && !isCorrectAnswer ? 'bg-red-100 dark:bg-red-900/20 border border-red-400/40' : 'bg-muted/30'}`}
                          >
                            <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${isCorrectAnswer ? 'bg-green-500 text-white' : isUserChoice ? 'bg-red-500 text-white' : 'bg-muted-foreground/30 text-muted-foreground'}`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            {opt}
                            {isCorrectAnswer && <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />}
                            {isUserChoice && !isCorrectAnswer && <XCircle className="h-4 w-4 text-red-500 ml-auto" />}
                          </div>
                        );
                      })}
                      <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-400/20">
                        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">💡 Explanation</div>
                        <p className="text-sm text-muted-foreground">{a.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" className="border-primary/30" asChild>
            <Link href="/quiz">
              <RefreshCw className="mr-2 h-4 w-4" /> Take Another Quiz
            </Link>
          </Button>
          <Button variant="outline" className="border-primary/30" onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
          <Button variant="outline" className="border-primary/30">
            <Share2 className="mr-2 h-4 w-4" /> Share Score
          </Button>
          <Button className="bg-gradient-brand text-white" asChild>
            <Link href="/learn">
              <ArrowRight className="mr-2 h-4 w-4" /> Study Weak Topics
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
