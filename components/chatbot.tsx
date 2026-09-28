'use client';

import * as React from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';

type Message = { role: 'user' | 'bot'; text: string };

export function Chatbot() {
  const { language, currentLangOption, t, getBotResponse } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Initialize or update initial greeting when language changes
  React.useEffect(() => {
    setMessages([
      { role: 'bot', text: t.chatbot.greeting },
    ]);
  }, [language, t.chatbot.greeting]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, open]);

  const send = (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: 'user', text: textToSend };
    setMessages((m) => [...m, userMsg]);
    if (!overrideText) setInput('');

    setTimeout(() => {
      const reply = getBotResponse(textToSend);
      setMessages((m) => [...m, { role: 'bot', text: reply }]);
    }, 400);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-brand text-white shadow-glow hover:scale-105 transition-transform p-0"
        aria-label="Open multilingual chatbot"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 glass rounded-2xl shadow-2xl border border-primary/20 animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-brand p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base leading-tight">{t.chatbot.title}</h3>
                  <p className="text-[11px] opacity-90">{t.chatbot.subtitle}</p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-transparent text-[11px] font-semibold flex items-center gap-1">
                <span>{currentLangOption.flag}</span>
                <span>{currentLangOption.nativeName}</span>
              </Badge>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto p-4 space-y-3 bg-background/50"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  'flex gap-2 max-w-[88%]',
                  msg.role === 'user' && 'ml-auto flex-row-reverse'
                )}
              >
                <div
                  className={cn(
                    'h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                    msg.role === 'bot'
                      ? 'bg-gradient-brand text-white shadow-sm'
                      : 'bg-muted text-foreground'
                  )}
                >
                  {msg.role === 'bot' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    'rounded-2xl px-3.5 py-2 text-xs sm:text-sm leading-relaxed shadow-sm',
                    msg.role === 'bot'
                      ? 'bg-card border border-primary/10 rounded-tl-xs text-foreground'
                      : 'bg-gradient-brand text-white rounded-tr-xs font-medium'
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts Chips */}
          {t.chatbot.quickPrompts && (
            <div className="px-3 py-1.5 bg-muted/30 border-t border-border/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <Sparkles className="h-3 w-3 text-primary shrink-0 ml-1" />
              {t.chatbot.quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => send(prompt)}
                  className="px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-semibold whitespace-nowrap transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t flex gap-2 bg-background">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={t.chatbot.placeholder}
              className="h-9 text-xs sm:text-sm"
            />
            <Button
              onClick={() => send()}
              size="icon"
              className="bg-gradient-brand text-white h-9 w-9 shrink-0 shadow-md"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
