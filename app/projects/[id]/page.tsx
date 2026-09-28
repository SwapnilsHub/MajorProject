'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Clock, Code2, Layers, CheckCircle2, Circle, ExternalLink,
  Github, Database, Server, Terminal, FileText, Download, Bookmark,
  Share2, ChevronRight, PlayCircle, ShieldCheck, Cpu, Lightbulb,
  Sparkles, CheckSquare, Square, Rocket, TestTube
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AnimatedBg } from '@/components/animated-bg';
import { getProjectById, type ProjectDifficulty } from '@/lib/project-data';

const difficultyColors: Record<ProjectDifficulty, string> = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const project = getProjectById(id);

  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [isSaved, setIsSaved] = React.useState(false);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <Layers className="h-16 w-16 text-muted-foreground/40 mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">The requested project recommendation could not be found.</p>
        <Button className="bg-gradient-brand text-white" asChild>
          <Link href="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects</Link>
        </Button>
      </div>
    );
  }

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const progressPct = Math.round((completedSteps.length / project.roadmap.length) * 100);

  return (
    <div className="relative min-h-screen pb-20 pt-6">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">

        {/* Back Link */}
        <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to All Projects
        </Link>

        {/* Project Header Hero */}
        <Card className="border-primary/20 overflow-hidden mb-8 bg-gradient-to-br from-primary/5 via-violet-500/5 to-card">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs uppercase tracking-wider">
                    {project.category.replace('-', ' ')}
                  </Badge>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${difficultyColors[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {project.estimatedTime}
                  </span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                  {project.title}
                </h1>

                <p className="text-muted-foreground text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Skills & Tech stack */}
                <div className="pt-2">
                  <div className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Required Technologies & Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons & completion score */}
              <div className="flex flex-col gap-3 min-w-[200px] shrink-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                <div className="p-4 rounded-xl bg-background/80 border text-center">
                  <div className="text-xs text-muted-foreground mb-1 font-medium">Roadmap Progress</div>
                  <div className="font-display text-3xl font-bold text-gradient">{progressPct}%</div>
                  <Progress value={progressPct} className="h-1.5 mt-2" />
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {completedSteps.length} of {project.roadmap.length} Steps Done
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-brand text-white shadow-md hover:opacity-95"
                  onClick={() => {
                    const nextStep = project.roadmap.find((s) => !completedSteps.includes(s.step));
                    if (nextStep) toggleStep(nextStep.step);
                  }}
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  {completedSteps.length === project.roadmap.length ? 'Project Completed!' : 'Mark Next Step Complete'}
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className={`flex-1 border-primary/20 ${isSaved ? 'text-primary bg-primary/10' : ''}`}
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <Bookmark className="mr-1.5 h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} />
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline" className="border-primary/20" onClick={() => window.print()}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tabs Navigation */}
        <Tabs defaultValue="roadmap" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto p-1 bg-muted/60 rounded-xl gap-1">
            <TabsTrigger value="roadmap" className="py-2.5 text-xs md:text-sm font-medium rounded-lg">
              <CheckSquare className="h-4 w-4 mr-1.5 hidden md:inline" /> Roadmap
            </TabsTrigger>
            <TabsTrigger value="architecture" className="py-2.5 text-xs md:text-sm font-medium rounded-lg">
              <Cpu className="h-4 w-4 mr-1.5 hidden md:inline" /> Architecture
            </TabsTrigger>
            <TabsTrigger value="resources" className="py-2.5 text-xs md:text-sm font-medium rounded-lg">
              <FileText className="h-4 w-4 mr-1.5 hidden md:inline" /> Resources
            </TabsTrigger>
            <TabsTrigger value="deployment" className="py-2.5 text-xs md:text-sm font-medium rounded-lg">
              <Rocket className="h-4 w-4 mr-1.5 hidden md:inline" /> Deployment
            </TabsTrigger>
            <TabsTrigger value="testing" className="py-2.5 text-xs md:text-sm font-medium rounded-lg">
              <TestTube className="h-4 w-4 mr-1.5 hidden md:inline" /> Testing
            </TabsTrigger>
          </TabsList>

          {/* ROADMAP TAB */}
          <TabsContent value="roadmap" className="space-y-4">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary" /> Step-by-Step Implementation Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.roadmap.map((step) => {
                  const isDone = completedSteps.includes(step.step);
                  return (
                    <div
                      key={step.step}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isDone
                          ? 'border-green-500/30 bg-green-500/5'
                          : 'border-border hover:border-primary/30 bg-card'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleStep(step.step)}
                          className="mt-0.5 text-muted-foreground hover:text-primary transition-colors shrink-0"
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-500/20" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground/60" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <h3 className={`font-display font-semibold text-base ${isDone ? 'line-through text-muted-foreground' : ''}`}>
                              Step {step.step}: {step.title}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              Est. {step.estimatedTime}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

                          {step.resources.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="font-medium text-muted-foreground">Resources:</span>
                              {step.resources.map((res, i) => (
                                <Badge key={i} variant="secondary" className="text-xs bg-muted">
                                  {res}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ARCHITECTURE TAB */}
          <TabsContent value="architecture" className="space-y-6">
            {/* System Architecture */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" /> System Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/40 border border-border font-mono text-sm text-primary font-semibold">
                  {project.architecture}
                </div>

                {project.dataset && (
                  <div className="p-4 rounded-xl border bg-card">
                    <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                      <Database className="h-4 w-4 text-primary" /> Recommended Dataset
                    </div>
                    <p className="text-sm text-muted-foreground">{project.dataset}</p>
                  </div>
                )}

                {project.apis && project.apis.length > 0 && (
                  <div className="p-4 rounded-xl border bg-card">
                    <div className="flex items-center gap-2 font-semibold text-sm mb-1.5">
                      <Code2 className="h-4 w-4 text-primary" /> Required APIs & External Services
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.apis.map((api, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {api}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Folder Structure */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" /> Recommended Directory & Folder Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                  <code>{project.folderStructure}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RESOURCES TAB */}
          <TabsContent value="resources" className="space-y-6">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" /> Reference Code & Starter Kits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-900 text-white">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">GitHub Repository Reference</div>
                      <div className="text-xs text-muted-foreground">{project.githubRef}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-primary/20" asChild>
                    <a href={project.githubRef} target="_blank" rel="noopener noreferrer">
                      View Code <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="font-semibold text-sm">Key Learning Outcomes</div>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {project.learningOutcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-muted/20 text-xs text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="font-semibold text-sm mb-2">Industry Relevance & Career Value</div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-muted-foreground">
                    💡 {project.industryRelevance}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DEPLOYMENT TAB */}
          <TabsContent value="deployment" className="space-y-6">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" /> Deployment & Hosting Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-muted/30 border text-sm text-foreground whitespace-pre-line leading-relaxed font-mono text-xs">
                  {project.deploymentGuide}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TESTING TAB */}
          <TabsContent value="testing" className="space-y-6">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <TestTube className="h-5 w-5 text-primary" /> Testing & Quality Assurance Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-muted/30 border text-sm text-foreground whitespace-pre-line leading-relaxed font-mono text-xs">
                  {project.testingGuide}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
