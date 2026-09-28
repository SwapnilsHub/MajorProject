'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FileText,
  Sparkles,
  LayoutTemplate,
  Target,
  Download,
  ShieldCheck,
  UploadCloud,
  ChevronDown,
  BarChart3,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/section-header';
import { AnimatedBg } from '@/components/animated-bg';

import WorkspaceLayout from '@/components/Editor/WorkspaceLayout';
import SectionSidebar from '@/components/Editor/SectionSidebar';
import SectionCanvas from '@/components/Editor/SectionCanvas';
import MobileBottomNav from '@/components/Editor/MobileBottomNav';
import Preview from '@/components/Resume/PreviewClient';
import TemplateCarousel from '@/components/Resume/TemplateCarousel';
import ResumeFields from '@/config/ResumeFields';
import AIAssistantPanel from '@/components/AIAssistant/AIAssistantPanel';
import AtsScanModal from '@/components/Resume/AtsScanModal';

const DEFAULT_TAB = 'contact';

export default function ResumePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [aiOpen, setAiOpen] = React.useState(false);
  const [previewMode, setPreviewMode] = React.useState(false);
  
  // ATS Scanner Modal States
  const [atsModalOpen, setAtsModalOpen] = React.useState(false);
  const [atsModalTab, setAtsModalTab] = React.useState<'scan' | 'upload'>('scan');

  const requestedTab = searchParams?.get('tab');
  const tab = requestedTab && (ResumeFields as Record<string, any>)[requestedTab] ? requestedTab : DEFAULT_TAB;

  const resume = useSelector((state: any) => state.resume);

  const openAtsScanner = (tab: 'scan' | 'upload') => {
    setAtsModalTab(tab);
    setAtsModalOpen(true);
  };

  const formPane = (
    <div className="flex flex-col gap-5 pb-24 md:pb-4">
      {/* Template Carousel Banner */}
      <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-md p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <LayoutTemplate className="w-3.5 h-3.5 text-primary" /> Select Template
          </h2>
          <Badge variant="outline" className="border-primary/30 text-primary text-xs font-medium">
            {resume.selectedTemplate || 'ATS'} Template
          </Badge>
        </div>
        <TemplateCarousel />
      </div>

      {/* Editor Main Content: Sidebar + Section Form */}
      <div className="flex flex-1 flex-col gap-5 md:flex-row">
        <div className="shrink-0 rounded-2xl border border-border bg-card/80 backdrop-blur-md p-2 shadow-sm md:w-52 md:p-3">
          <SectionSidebar activeTab={tab} />
        </div>

        <div className="flex-1 rounded-2xl border border-border bg-card/80 backdrop-blur-md p-4 shadow-sm md:p-6">
          <SectionCanvas tab={tab} />
        </div>
      </div>

      {/* AI Assistant Expandable Drawer */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-accent/5 to-purple-500/5 backdrop-blur-md shadow-sm">
        <button
          type="button"
          onClick={() => setAiOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-3.5 text-left focus:outline-none focus:ring-2 focus:ring-primary md:px-6"
        >
          <span className="flex items-center gap-2 text-sm font-bold text-foreground md:text-base">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-gradient">EduGram AI Resume Assistant</span>
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              aiOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence initial={false}>
          {aiOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 md:px-6 border-t border-border/50 pt-4">
                <AIAssistantPanel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const previewPane = (
    <div className="sticky top-6 flex flex-col gap-2.5">
      <div className="flex items-center justify-between bg-card/90 backdrop-blur-md border border-border rounded-xl px-4 py-2.5 shadow-sm">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">Live PDF Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => openAtsScanner('scan')}
            className="h-8 gap-1.5 text-xs bg-gradient-brand text-white hover:opacity-90 shadow-sm rounded-lg"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Scan ATS Score
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openAtsScanner('upload')}
            className="h-8 gap-1.5 text-xs border-primary/30 rounded-lg"
          >
            <UploadCloud className="w-3.5 h-3.5 text-primary" /> Upload Resume
          </Button>
        </div>
      </div>
      <Preview />
    </div>
  );

  return (
    <div className="relative min-h-screen pt-6 pb-20">
      <AnimatedBg />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* EduGram Header */}
        <SectionHeader
          eyebrow="Resume Builder & ATS Optimizer"
          title={
            <>
              Build & <span className="text-gradient">Scan ATS Score</span> for Your Resume
            </>
          }
          description="Craft recruiter-ready ATS resumes with instant PDF preview, AI bullet generator, real-time 10-dimension ATS score scanning, and outside resume file upload."
        />

        {/* Top Control Bar - Compact / Fit Content */}
        <div className="inline-flex items-center gap-3 mb-4 bg-card/80 backdrop-blur-md border border-border rounded-2xl px-4 py-2.5 shadow-sm">
          {/* Main Title Badge */}
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="font-display font-bold text-sm text-foreground">Editor & Preview</span>
            <Badge variant="outline" className="border-primary/30 text-primary text-[11px] ml-1">
              ATS Optimized
            </Badge>
          </div>
        </div>

        {/* Workspace View */}
        <div className="mx-auto w-full">
          <WorkspaceLayout left={formPane} right={previewPane} previewMode={previewMode} />
        </div>

        {/* Mobile Navigation bar */}
        <MobileBottomNav activeTab={tab} />
      </div>

      {/* Real-time ATS Scanner & Upload Modal */}
      {atsModalOpen && (
        <AtsScanModal
          onClose={() => setAtsModalOpen(false)}
          initialTab={atsModalTab}
        />
      )}
    </div>
  );
}
