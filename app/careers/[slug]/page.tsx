'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Building2,
  Award,
  CheckCircle2,
  Rocket,
  Brain,
  Trophy,
  X,
  Sparkles,
  RotateCcw,
  Check,
  XCircle,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { careers } from '@/lib/data';
import { getRandomDomainQuestions, QuizQuestion } from '@/lib/quiz-data';

export default function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const career = careers.find((c) => c.slug === slug);

  // Quiz Modal States
  const [isQuizOpen, setIsQuizOpen] = React.useState(false);
  const [quizQuestions, setQuizQuestions] = React.useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  if (!career) {
    return (
      <div className="pt-20 pb-20 text-center">
        <h1 className="font-display text-2xl font-bold">Domain not found</h1>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/domains">Back to Domains</Link>
        </Button>
      </div>
    );
  }

  const Icon = career.icon;

  const demandScore =
    career.demand === 'Very High'
      ? 95
      : career.demand === 'High'
      ? 80
      : career.demand === 'Growing'
      ? 65
      : 50;

  // Start or Retake Quiz (Generates 5 fresh randomized domain-specific questions)
  const handleStartQuiz = () => {
    const random5 = getRandomDomainQuestions(career.slug, 5);
    setQuizQuestions(random5);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setIsQuizOpen(true);
  };

  // Select an option for current question
  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  // Calculate score and percentage
  const score = quizQuestions.reduce((acc, q, idx) => {
    return userAnswers[idx] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  const percentage = quizQuestions.length > 0 ? Math.round((score / quizQuestions.length) * 100) : 0;

  return (
    <div className="pt-8 pb-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/domains">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Domains
          </Link>
        </Button>

        {/* Hero */}
        <Card className="border-primary/10 overflow-hidden mb-8 shadow-xl">
          <div className="bg-gradient-brand p-8 text-white">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <Badge className="bg-white/20 text-white border-transparent mb-2">
                  {career.category}
                </Badge>
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  {career.title}
                </h1>
                <p className="mt-2 opacity-90 max-w-3xl leading-relaxed">{career.overview}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/10">
            <CardContent className="pt-5 text-center">
              <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="font-display font-bold">{career.salary}</div>
              <div className="text-xs text-muted-foreground">Salary Range</div>
            </CardContent>
          </Card>
          <Card className="border-primary/10">
            <CardContent className="pt-5 text-center">
              <Briefcase className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="font-display font-bold">{career.demand}</div>
              <div className="text-xs text-muted-foreground">Demand</div>
            </CardContent>
          </Card>
          <Card className="border-primary/10">
            <CardContent className="pt-5 text-center">
              <Rocket className="h-6 w-6 text-brand-purple mx-auto mb-2" />
              <div className="font-display font-bold">{career.growth}</div>
              <div className="text-xs text-muted-foreground">Growth Rate</div>
            </CardContent>
          </Card>
          <Card className="border-primary/10">
            <CardContent className="pt-5 text-center">
              <GraduationCap className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="font-display font-bold text-sm">{career.eligibility}</div>
              <div className="text-xs text-muted-foreground">Eligibility</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Future Scope */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Future Scope
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {career.futureScope}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Market Demand</span>
                    <span className="font-medium">{demandScore}%</span>
                  </div>
                  <Progress value={demandScore} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Roadmap */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  Career Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {career.roadmap.map((phase, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-gradient-brand text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </div>
                      {i < career.roadmap.length - 1 && (
                        <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-border" />
                      )}
                      <h4 className="font-semibold mb-2">{phase.phase}</h4>
                      <ul className="space-y-1">
                        {phase.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Companies */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Top Companies Hiring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {career.topCompanies.map((company) => (
                    <Badge
                      key={company}
                      variant="outline"
                      className="text-sm py-1.5 px-3"
                    >
                      {company}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Skills */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  Required Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill) => (
                    <Badge key={skill} className="bg-primary/10 text-primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {career.certifications.map((cert, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Award className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Courses */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Recommended Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {career.courses.map((course, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {course}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons: Start Learning & Take Quiz (Placed directly below Start Learning) */}
            <div className="space-y-3">
              <Button
                className="w-full h-12 rounded-xl text-base font-bold text-white shadow-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 hover:shadow-glow transition-all"
                size="lg"
                asChild
              >
                <Link href="/learn" className="flex items-center justify-center gap-2">
                  Start Learning
                </Link>
              </Button>

              <Button
                onClick={handleStartQuiz}
                className="w-full h-12 rounded-xl text-base font-bold text-white shadow-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 hover:shadow-glow transition-all flex items-center justify-center gap-2"
                size="lg"
              >
                <Trophy className="h-5 w-5" />
                Take Quiz Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* INTERACTIVE 5-QUESTION DOMAIN QUIZ POP-UP MODAL */}
      {/* ────────────────────────────────────────────────────────── */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-card border border-primary/20 rounded-3xl shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-gradient-brand p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{career.title} Quiz</h3>
                  <p className="text-xs opacity-90">5 Domain-Specific Questions</p>
                </div>
              </div>
              <button
                onClick={() => setIsQuizOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                title="Close Quiz"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            {!isSubmitted ? (
              <div className="p-6 space-y-6">
                {/* Quiz Progress & Question Header */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-primary font-bold">
                      Question {currentIndex + 1} of {quizQuestions.length}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {quizQuestions[currentIndex]?.difficulty || 'Intermediate'}
                    </Badge>
                  </div>
                  <Progress value={((currentIndex + 1) / quizQuestions.length) * 100} className="h-2" />
                </div>

                {/* Question Prompt */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <h4 className="font-display font-semibold text-lg text-foreground leading-relaxed">
                    {quizQuestions[currentIndex]?.question}
                  </h4>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {quizQuestions[currentIndex]?.options?.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentIndex] === optIdx;
                    const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 rounded-xl border text-left flex items-center justify-between text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-primary text-primary-foreground border-primary shadow-md scale-[1.01]'
                            : 'bg-card hover:bg-muted/50 border-border text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-white text-primary' : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {letter}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>
                        {isSelected && <Check className="h-5 w-5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Modal Bottom Navigation Controls */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                    className="rounded-xl"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                  </Button>

                  {currentIndex < quizQuestions.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="bg-gradient-brand text-white rounded-xl"
                    >
                      Next <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => setIsSubmitted(true)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl px-6"
                    >
                      Submit Quiz <Check className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* RESULTS & PERFORMANCE ANALYSIS VIEW */
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Score Summary Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-card border border-primary/20 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-brand text-white flex items-center justify-center shadow-lg">
                    <Trophy className="h-8 w-8 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold">Quiz Completed!</h4>
                    <p className="text-sm text-muted-foreground">
                      Here is your performance score for <strong>{career.title}</strong>
                    </p>
                  </div>

                  <div className="flex justify-center items-baseline gap-2 pt-2">
                    <span className="font-display text-5xl font-black text-gradient">{score}</span>
                    <span className="text-2xl text-muted-foreground font-bold">/ 5</span>
                    <span className="text-xl font-bold text-primary ml-2">({percentage}%)</span>
                  </div>

                  <Badge className="py-1 px-4 text-xs font-semibold rounded-full bg-primary/20 text-primary border-transparent">
                    {percentage >= 80
                      ? '🌟 Master Level Knowledge'
                      : percentage >= 60
                      ? '👍 Proficient Knowledge'
                      : '💡 Developing Knowledge'}
                  </Badge>
                </div>

                {/* Question-by-Question Detailed Review */}
                <div className="space-y-4">
                  <h5 className="font-display font-bold text-base flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    Detailed Answer Analysis
                  </h5>

                  {quizQuestions.map((q, qIdx) => {
                    const selected = userAnswers[qIdx];
                    const isCorrect = selected === q.correctAnswer;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border space-y-2 text-xs sm:text-sm ${
                          isCorrect ? 'bg-green-500/5 border-green-500/30' : 'bg-red-500/5 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-foreground">
                            {qIdx + 1}. {q.question}
                          </p>
                          {isCorrect ? (
                            <Badge className="bg-green-500 text-white shrink-0">Correct</Badge>
                          ) : (
                            <Badge variant="destructive" className="shrink-0">Incorrect</Badge>
                          )}
                        </div>

                        <div className="space-y-1 text-muted-foreground pt-1">
                          <p>
                            <strong>Your Answer:</strong>{' '}
                            {selected !== undefined && q.options
                              ? q.options[selected]
                              : 'Not Answered'}
                          </p>
                          {!isCorrect && q.options && (
                            <p className="text-green-600 dark:text-green-400 font-medium">
                              <strong>Correct Answer:</strong> {q.options[q.correctAnswer as number]}
                            </p>
                          )}
                        </div>

                        <div className="p-3 rounded-lg bg-card border text-muted-foreground leading-relaxed mt-2 text-xs">
                          💡 <strong>Explanation:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Retake and Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button
                    onClick={handleStartQuiz}
                    className="flex-1 bg-gradient-brand text-white font-bold rounded-xl h-11"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz (5 New Questions)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsQuizOpen(false)}
                    className="rounded-xl h-11"
                  >
                    Close Quiz
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
