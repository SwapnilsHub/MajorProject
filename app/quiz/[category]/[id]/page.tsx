'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Clock, ChevronLeft, ChevronRight, Flag, SkipForward, CheckCircle2,
  AlertCircle, BookOpen, Brain, X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AnimatedBg } from '@/components/animated-bg';
import {
  getQuestionsByCategory,
  getCategoryById,
  type QuizQuestion,
  type Difficulty,
} from '@/lib/quiz-data';

type AnswerState = {
  selected: number | null;
  flagged: boolean;
  skipped: boolean;
};

export default function QuizPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.category as string;
  const difficulty = (params.id as string) as Difficulty;

  const category = getCategoryById(categoryId);
  const allQuestions = getQuestionsByCategory(categoryId, difficulty as Difficulty | undefined);

  // For daily/weekly, just use up to 10 questions
  const questions: QuizQuestion[] = allQuestions.slice(0, 10).length > 0
    ? allQuestions.slice(0, 10)
    : getQuestionsByCategory(categoryId).slice(0, 10);

  const TOTAL_TIME = questions.length * 30; // 30 sec per question

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<AnswerState[]>(
    questions.map(() => ({ selected: null, flagged: false, skipped: false }))
  );
  const [timeLeft, setTimeLeft] = React.useState(TOTAL_TIME);
  const [submitted, setSubmitted] = React.useState(false);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [showNavPanel, setShowNavPanel] = React.useState(false);

  // Timer
  React.useEffect(() => {
    if (!quizStarted || submitted) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quizStarted, submitted]);

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function selectAnswer(idx: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = { ...updated[currentIndex], selected: idx, skipped: false };
      return updated;
    });
  }

  function flagQuestion() {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = { ...updated[currentIndex], flagged: !updated[currentIndex].flagged };
      return updated;
    });
  }

  function skipQuestion() {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = { ...updated[currentIndex], skipped: true };
      return updated;
    });
    if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
  }

  function handleSubmit() {
    setSubmitted(true);
    const correct = answers.filter(
      (a, i) => a.selected !== null && a.selected === questions[i].correctAnswer
    ).length;
    const timeTaken = TOTAL_TIME - timeLeft;

    // Store result in sessionStorage for results page
    const result = {
      category: categoryId,
      difficulty,
      score: correct,
      total: questions.length,
      timeTaken,
      answers: answers.map((a, i) => ({
        selected: a.selected,
        correct: questions[i].correctAnswer,
        question: questions[i].question,
        explanation: questions[i].explanation,
        options: questions[i].options,
      })),
    };
    sessionStorage.setItem('quizResult', JSON.stringify(result));
    router.push('/quiz/results');
  }

  if (!quizStarted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center py-16">
        <AnimatedBg />
        <div className="relative z-10 max-w-lg w-full mx-auto px-4">
          <Card className="border-primary/20 shadow-2xl">
            <CardContent className="pt-8 pb-8 text-center space-y-6">
              <div className="text-6xl">{category?.icon || '🧠'}</div>
              <div>
                <h1 className="font-display text-2xl font-bold mb-2">
                  {category?.label || 'Quiz'} —{' '}
                  <span className="text-gradient">{difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1) || 'All Levels'}</span>
                </h1>
                <p className="text-muted-foreground text-sm">{category?.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="p-3 rounded-xl bg-muted/40">
                  <div className="font-bold text-lg">{questions.length}</div>
                  <div className="text-muted-foreground text-xs">Questions</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/40">
                  <div className="font-bold text-lg">{formatTime(TOTAL_TIME)}</div>
                  <div className="text-muted-foreground text-xs">Time Limit</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/40">
                  <div className="font-bold text-lg">70%</div>
                  <div className="text-muted-foreground text-xs">Pass Score</div>
                </div>
              </div>
              <div className="text-sm text-left space-y-1.5 bg-muted/30 rounded-xl p-4">
                <div className="font-medium mb-2">📋 Instructions</div>
                <div className="text-muted-foreground flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-green-500" /> You can navigate between questions freely</div>
                <div className="text-muted-foreground flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-green-500" /> Flag questions to review later</div>
                <div className="text-muted-foreground flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-green-500" /> Timer runs for the entire quiz</div>
                <div className="text-muted-foreground flex items-start gap-2"><AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-orange-500" /> Quiz auto-submits when time runs out</div>
              </div>
              <Button
                className="w-full bg-gradient-brand text-white h-12 text-base font-semibold"
                onClick={() => setQuizStarted(true)}
              >
                Start Quiz →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const answeredCount = answers.filter((a) => a.selected !== null).length;
  const flaggedCount = answers.filter((a) => a.flagged).length;

  return (
    <div className="relative min-h-screen pb-16 pt-6">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category?.icon}</span>
            <div>
              <div className="font-display font-bold">{category?.label}</div>
              <Badge variant="secondary" className="text-xs">{difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold border ${timeLeft < 60 ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20' : 'border-primary/30 bg-primary/5 text-primary'}`}>
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </div>
            <Button size="sm" variant="outline" className="border-primary/20" onClick={() => setShowNavPanel(!showNavPanel)}>
              <BookOpen className="h-4 w-4 mr-1" /> Q {currentIndex + 1}/{questions.length}
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Progress value={(answeredCount / questions.length) * 100} className="h-2 mb-6" />
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
          <span>{answeredCount} answered</span>
          <span>{flaggedCount} flagged</span>
          <span>{questions.length - answeredCount} remaining</span>
        </div>

        <div className="grid lg:grid-cols-[1fr,260px] gap-6">
          {/* Question card */}
          <div className="space-y-4">
            <Card className="border-primary/10 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                      {currentIndex + 1}
                    </span>
                    <Badge variant="outline" className="text-xs capitalize">{currentQ.type.replace('-', ' ')}</Badge>
                  </div>
                  <button
                    onClick={flagQuestion}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors ${currentAnswer.flagged ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' : 'hover:bg-muted text-muted-foreground'}`}
                  >
                    <Flag className="h-3.5 w-3.5" />
                    {currentAnswer.flagged ? 'Flagged' : 'Flag'}
                  </button>
                </div>
                <CardTitle className="font-display text-lg font-semibold leading-snug mt-3">
                  {currentQ.question.split('```').map((part, i) =>
                    i % 2 === 1 ? (
                      <pre key={i} className="text-sm bg-muted rounded-lg p-3 mt-2 font-mono overflow-x-auto whitespace-pre-wrap">
                        <code>{part}</code>
                      </pre>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentQ.options?.map((option, optIdx) => {
                  const isSelected = currentAnswer.selected === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => selectAnswer(optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 text-sm font-medium ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-muted/20'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs shrink-0 ${isSelected ? 'border-primary bg-primary text-white' : 'border-muted-foreground/50'}`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="border-primary/20"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => i - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-400/30 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10"
                  onClick={skipQuestion}
                >
                  <SkipForward className="h-4 w-4 mr-1" /> Skip
                </Button>
                {currentIndex < questions.length - 1 ? (
                  <Button
                    className="bg-gradient-brand text-white"
                    onClick={() => setCurrentIndex((i) => i + 1)}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    onClick={handleSubmit}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" /> Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation panel */}
          <div className="hidden lg:block">
            <Card className="border-primary/10 sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" /> Question Navigator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-1.5 mb-4">
                  {questions.map((_, i) => {
                    const ans = answers[i];
                    const isCurrent = i === currentIndex;
                    let bg = 'bg-muted text-muted-foreground';
                    if (isCurrent) bg = 'bg-primary text-white';
                    else if (ans.flagged) bg = 'bg-yellow-400/20 text-yellow-600 border border-yellow-400/40';
                    else if (ans.selected !== null) bg = 'bg-green-400/20 text-green-600 border border-green-400/40';
                    else if (ans.skipped) bg = 'bg-orange-400/20 text-orange-600';

                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-9 h-9 rounded-lg text-xs font-semibold transition-all ${bg} hover:scale-105`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Current</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-green-400/40 border border-green-400 inline-block" /> Answered</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-yellow-400/40 border border-yellow-400 inline-block" /> Flagged</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-muted inline-block" /> Not answered</div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm"
                  onClick={handleSubmit}
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Submit Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
