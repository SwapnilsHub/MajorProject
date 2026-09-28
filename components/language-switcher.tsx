'use client';

import * as React from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { languages, LanguageCode } from '@/lib/translations';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { language, setLanguage, currentLangOption } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-2.5 rounded-full border border-primary/20 hover:bg-primary/10 flex items-center gap-1.5 text-xs font-semibold text-foreground/80 hover:text-primary transition-all"
        title="Select Language / ಭಾಷೆ / भाषा / భాష / தமிழ்"
      >
        <Globe className="h-4 w-4 text-primary shrink-0" />
        <span className="hidden sm:inline-block">{currentLangOption.nativeName}</span>
        <span className="sm:hidden uppercase font-bold">{currentLangOption.code}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform opacity-60", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-50 w-52 rounded-2xl border border-primary/20 bg-card/95 backdrop-blur-xl shadow-2xl p-1.5 animate-scale-in space-y-0.5">
          <div className="px-3 py-2 border-b text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
            <span>Select Language</span>
            <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded font-mono">6 Languages</span>
          </div>

          <div className="py-1 space-y-0.5 max-h-64 overflow-y-auto">
            {languages.map((lang) => {
              const isActive = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left',
                    isActive
                      ? 'bg-primary/15 text-primary font-bold shadow-sm'
                      : 'hover:bg-primary/10 text-foreground/80'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="flex flex-col leading-tight">
                      <span className="font-semibold">{lang.nativeName}</span>
                      <span className="text-[10px] text-muted-foreground opacity-80">{lang.name}</span>
                    </div>
                  </div>
                  {isActive && <Check className="h-4 w-4 text-primary shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
