'use client';

import * as React from 'react';
import { ThreeCanvas } from '@/components/three-canvas';

export function AnimatedBg() {
  return (
    <>
      {/* Interactive 3D WebGL background */}
      <ThreeCanvas />
      {/* Soft ambient blobs layered on top */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>
    </>
  );
}
