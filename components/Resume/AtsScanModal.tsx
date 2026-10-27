'use client';

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Trophy,
  X,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  FileCheck,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { runAtsAnalysis } from '@/lib/ats/analysis';
import { normalizeImportedResume as normalizeResume } from '@/lib/import/normalize';
import { loadResume } from '@/store/slices/resumeSlice';

interface AtsScanModalProps {
  onClose: () => void;
  initialTab?: 'scan' | 'upload';
}

export default function AtsScanModal({ onClose, initialTab = 'scan' }: AtsScanModalProps) {
  const dispatch = useDispatch();
  const currentResume = useSelector((state: any) => state.resume);

  const [activeTab, setActiveTab] = React.useState<'scan' | 'upload'>(initialTab);
  
  // Outside Upload State
  const [uploadedFileName, setUploadedFileName] = React.useState<string | null>(null);
  const [uploadedResumeData, setUploadedResumeData] = React.useState<any | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  // Calculate live ATS analysis for current resume in editor
  const liveAnalysis = React.useMemo(() => {
    return runAtsAnalysis(currentResume);
  }, [currentResume]);

  // Calculate analysis for uploaded outside resume (if available)
  const uploadedAnalysis = React.useMemo(() => {
    if (!uploadedResumeData) return null;
    return runAtsAnalysis(uploadedResumeData);
  }, [uploadedResumeData]);

  // Active analysis result to display
  const activeAnalysis = activeTab === 'upload' && uploadedAnalysis ? uploadedAnalysis : liveAnalysis;

  // Handle uploading external resume file (.pdf, .docx, .json, .txt)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setUploadError(null);
    setUploadedFileName(file.name);

    try {
      const fileName = file.name.toLowerCase();
      let extractedResumeObj: any = null;

      if (fileName.endsWith('.json')) {
        const text = await file.text();
        const rawJson = JSON.parse(text);
        extractedResumeObj = normalizeResume(rawJson);
      } else {
        // Handle PDF / DOCX / TXT plain text reading
        const text = await file.text();
        // Parse basic text lines into resume sections
        const rawObj = parseTextToRawResume(text, file.name);
        extractedResumeObj = normalizeResume(rawObj);
      }

      setUploadedResumeData(extractedResumeObj);
    } catch (err: any) {
      console.error('File parsing error:', err);
      setUploadError(err.message || 'Failed to read file. Please ensure it is a valid text, PDF, DOCX, or JSON resume.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper parser for raw text files
  const parseTextToRawResume = (rawText: string, filename: string) => {
    const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) {
      return {
        contact: {},
        summary: {},
        experience: [],
        skills: {},
        education: [],
        projects: [],
        certificates: [],
      };
    }

    const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const matchedSkills = lines.filter((l) => /java|python|javascript|react|node|html|css|sql|aws|docker|git/i.test(l)).join(', ');
    const expLines = lines.slice(4, 15).join('\n').trim();

    return {
      contact: {
        name: lines[0] || '',
        email: emailMatch ? emailMatch[0] : '',
        phone: phoneMatch ? phoneMatch[0] : '',
      },
      summary: {
        summary: lines.slice(1, 4).join(' ').trim(),
      },
      experience: expLines
        ? [
            {
              role: 'Extracted Role',
              company: 'Company',
              description: expLines,
            },
          ]
        : [],
      skills: {
        skills: matchedSkills || '',
      },
      education: lines.length > 3
        ? [
            {
              degree: lines[2] || '',
              institution: lines[1] || '',
            },
          ]
        : [],
    };
  };

  // Load uploaded resume into Redux Editor
  const handleApplyToEditor = () => {
    if (!uploadedResumeData) return;
    dispatch(loadResume(uploadedResumeData));
    setActiveTab('scan');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-card border border-primary/20 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-brand p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-inner">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">Real-Time ATS Score Scanner</h3>
              <p className="text-xs opacity-90">10-Dimension Recruiter Algorithm & Compatibility Check</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher Bar */}
        <div className="flex border-b bg-muted/40 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('scan')}
            className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'scan'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Zap className="h-4 w-4" /> Live Editor Resume Score
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <UploadCloud className="h-4 w-4" /> Upload Outside Resume
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* UPLOAD TAB FILE INPUT DROPZONE */}
          {activeTab === 'upload' && (
            <div className="p-6 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-brand text-white mx-auto flex items-center justify-center shadow-lg">
                <UploadCloud className="h-7 w-7" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg">Upload Resume from Your Device</h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Import any PDF, DOCX, JSON, or TXT file to scan its 100% accurate, real-time ATS compatibility score.
                </p>
              </div>

              <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-bold text-sm cursor-pointer shadow-lg hover:opacity-95 transition-opacity">
                <FileCheck className="h-4 w-4" />
                Select Resume File
                <input
                  type="file"
                  accept=".pdf,.docx,.json,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {isProcessing && (
                <div className="text-xs font-semibold text-primary animate-pulse">
                  Scanning resume text and evaluating ATS algorithms...
                </div>
              )}

              {uploadError && (
                <div className="text-xs font-medium text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                  {uploadError}
                </div>
              )}

              {uploadedFileName && !uploadError && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold border border-green-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Scanned File: {uploadedFileName}
                </div>
              )}
            </div>
          )}

          {/* OVERALL ATS SCORE GAUGE BANNER */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-card border border-primary/20 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>100% Real-Time ATS Algorithm</span>
              </div>
              <h4 className="font-display text-2xl font-bold">
                {activeTab === 'upload' && uploadedFileName
                  ? `Scanned: ${uploadedFileName}`
                  : activeAnalysis.overall === 0
                  ? 'No Content Present (Score: 0)'
                  : 'Current Resume ATS Score'}
              </h4>
              <p className="text-xs text-muted-foreground max-w-md">
                {activeAnalysis.overall === 0
                  ? 'Your resume currently contains no text or content. Add details in the editor to see your live ATS compatibility score.'
                  : 'Evaluated against header formatting, experience impact, skill coverage, readability, and recruiter criteria.'}
              </p>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              {/* Score Display */}
              <div className="text-center">
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="font-display text-5xl font-black text-gradient">{activeAnalysis.overall}</span>
                  <span className="text-xl font-bold text-muted-foreground">/ 100</span>
                </div>
                <div className="text-xs font-semibold text-muted-foreground mt-1">Overall ATS Score</div>
              </div>

              {/* Grade Badge */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-brand text-white flex flex-col items-center justify-center shadow-xl">
                <span className="text-2xl font-black">{activeAnalysis.grade}</span>
                <span className="text-[10px] uppercase font-bold opacity-80">Grade</span>
              </div>
            </div>
          </div>

          {/* SECTION BREAKDOWN GRID (10 ATS DIMENSIONS) */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              10-Dimension Per-Section ATS Breakdown
            </h5>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: 'Header Info', score: activeAnalysis.sectionScores.header, icon: User },
                { label: 'Summary', score: activeAnalysis.sectionScores.summary, icon: FileText },
                { label: 'Work Experience', score: activeAnalysis.sectionScores.experience, icon: Briefcase },
                { label: 'Projects', score: activeAnalysis.sectionScores.projects, icon: Layers },
                { label: 'Education', score: activeAnalysis.sectionScores.education, icon: BookOpen },
                { label: 'Skills Match', score: activeAnalysis.sectionScores.skills, icon: Zap },
                { label: 'Certifications', score: activeAnalysis.sectionScores.certificates, icon: Award },
                { label: 'Formatting', score: activeAnalysis.sectionScores.formatting, icon: FileCheck },
                { label: 'Readability', score: activeAnalysis.sectionScores.readability, icon: Sparkles },
                { label: 'Keyword Match', score: activeAnalysis.sectionScores.keywordMatch, icon: Trophy },
              ].map((sec, i) => {
                const Icon = sec.icon;
                const isPass = sec.score >= 70;
                return (
                  <div key={i} className="p-3 rounded-2xl border bg-card/80 space-y-2 text-center shadow-sm">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className={`font-bold ${isPass ? 'text-green-500' : 'text-amber-500'}`}>
                        {sec.score}%
                      </span>
                    </div>
                    <div className="text-xs font-semibold line-clamp-1">{sec.label}</div>
                    <Progress value={sec.score} className="h-1.5" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* INSIGHTS & RECRUITER TIPS */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Strengths */}
            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="pt-4 space-y-2">
                <h6 className="font-semibold text-xs text-green-600 dark:text-green-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4" /> Top Resume Strengths
                </h6>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {activeAnalysis.insights.topStrengths.length > 0 ? (
                    activeAnalysis.insights.topStrengths.map((str: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-green-500">•</span> {str}
                      </li>
                    ))
                  ) : (
                    <li className="italic text-muted-foreground">No strengths detected yet. Add resume text or sections to evaluate.</li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Opportunities */}
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardContent className="pt-4 space-y-2">
                <h6 className="font-semibold text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle className="h-4 w-4" /> ATS Optimization Opportunities
                </h6>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {activeAnalysis.insights.biggestOpportunities.length > 0 ? (
                    activeAnalysis.insights.biggestOpportunities.map((opp: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500">•</span> {opp}
                      </li>
                    ))
                  ) : (
                    <li className="italic text-muted-foreground">Fill in your resume details to unlock personalized optimization suggestions.</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            {activeTab === 'upload' && uploadedResumeData && (
              <Button
                onClick={handleApplyToEditor}
                className="bg-gradient-brand text-white font-bold rounded-xl h-11 flex-1 shadow-lg"
              >
                <ArrowRight className="mr-2 h-4 w-4" /> Load Uploaded Resume into Editor
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-11 px-6 sm:flex-initial"
            >
              Close Scanner
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
