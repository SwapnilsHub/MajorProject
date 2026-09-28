'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AssessmentRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/learn');
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold font-display text-gradient">Redirecting to EduGram Learn...</h2>
        <p className="text-sm text-muted-foreground">The assessment system has been upgraded into EduGram Learning & Quizzes.</p>
      </div>
    </div>
  );
}
