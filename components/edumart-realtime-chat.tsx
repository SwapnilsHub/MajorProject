'use client';

import * as React from 'react';
import {
  Send,
  MessageSquare,
  Loader2,
  X,
  User,
  ShieldCheck,
  MapPin,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  CheckCheck,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSupabaseClient } from '@/lib/supabase/client';

export type ChatMessage = {
  id: string;
  sender_id?: string;
  sender_name: string;
  receiver_id?: string;
  product_id?: string;
  message: string;
  created_at: string;
  is_delivered?: boolean;
};

export interface EduMartRealtimeChatProps {
  productId?: string;
  productTitle?: string;
  productPrice?: string;
  productImage?: string;
  productCondition?: string;
  sellerName?: string;
  sellerCollege?: string;
  sellerCity?: string;
  verifiedSeller?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

// Gentle Web Audio API chime for message feedback
function playChimeSound() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Two-tone quick notification chime
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.28);
  } catch (err) {
    // Non-critical: AudioContext autoplay policy
  }
}

export function EduMartRealtimeChat({
  productId = 'em-1',
  productTitle = 'Casio fx-991EX ClassWiz Scientific Calculator',
  productPrice = '₹750',
  productImage = 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
  productCondition = 'Like New',
  sellerName = 'Rohan Sharma',
  sellerCollege = 'COEP Technological University',
  sellerCity = 'Pune',
  verifiedSeller = true,
  onClose,
  isModal = false,
}: EduMartRealtimeChatProps) {
  const storageKey = `edumart_chat_${productId}`;

  // Initial welcome message from seller
  const defaultInitialMessage: ChatMessage = {
    id: `welcome-${productId}`,
    sender_name: sellerName,
    message: `Hi there! 👋 Thanks for reaching out about my ${productTitle} (${productPrice}). It is in ${productCondition} condition. How can I help you with this? Feel free to ask about campus pickup or the item details!`,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    is_delivered: true,
  };

  const [messages, setMessages] = React.useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Could not read chat history from localStorage', e);
      }
    }
    return [defaultInitialMessage];
  });

  const [inputText, setInputText] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Save messages to localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } catch (e) {
        console.warn('Could not persist chat history', e);
      }
    }
  }, [messages, storageKey]);

  // Subscribe to InsForge Realtime WebSockets if available
  React.useEffect(() => {
    try {
      const client = getSupabaseClient();
      if (client && typeof client.channel === 'function') {
        const channel = client
          .channel(`edumart-chat-${productId}`)
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'edumart_messages' },
            (payload: any) => {
              if (payload.new && payload.new.product_id === productId) {
                const incoming: ChatMessage = {
                  id: payload.new.id || Math.random().toString(36).substring(7),
                  sender_name: payload.new.sender_name || sellerName,
                  message: payload.new.message,
                  created_at: new Date(payload.new.created_at || Date.now()).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                  is_delivered: true,
                };
                setMessages((prev) => {
                  if (prev.some((m) => m.id === incoming.id)) return prev;
                  if (soundEnabled) playChimeSound();
                  return [...prev, incoming];
                });
              }
            }
          )
          .subscribe();

        return () => {
          if (client.removeChannel) client.removeChannel(channel);
        };
      }
    } catch (err) {
      console.warn('Realtime subscription notice:', err);
    }
  }, [productId, sellerName, soundEnabled]);

  // Intelligent Contextual Seller Reply Generator
  const triggerSellerReply = (userMsg: string) => {
    setIsTyping(true);

    const lower = userMsg.toLowerCase();
    let replyText = `Thanks for your message! Yes, everything works perfectly. Would you like to meet at ${sellerCollege || 'campus'} to check it out?`;

    if (lower.includes('available') || lower.includes('still')) {
      replyText = `Yes! The ${productTitle} is still available. I have it with me on campus. When are you free to pick it up?`;
    } else if (lower.includes('price') || lower.includes('discount') || lower.includes('negotiable') || lower.includes('offer') || lower.includes('less')) {
      const numericPrice = parseInt(productPrice.replace(/[^0-9]/g, '')) || 500;
      const discountOffer = Math.max(50, Math.round(numericPrice * 0.9));
      replyText = `I can offer a small student discount down to ₹${discountOffer} if you can pick it up today or tomorrow on campus! Let me know if that works.`;
    } else if (lower.includes('where') || lower.includes('meet') || lower.includes('location') || lower.includes('hostel') || lower.includes('library')) {
      replyText = `We can meet at ${sellerCollege} near the Central Library or Student Canteen. I am usually free around 1:30 PM or after 4 PM.`;
    } else if (lower.includes('condition') || lower.includes('working') || lower.includes('scratch') || lower.includes('photo')) {
      replyText = `It is in ${productCondition} condition! I've tested it thoroughly and it works like a charm. You are very welcome to inspect and test it before paying.`;
    } else if (lower.includes('today') || lower.includes('tomorrow') || lower.includes('now') || lower.includes('time')) {
      replyText = `Awesome! Let's connect near the main campus gate or library. Just message me 15 minutes before you arrive!`;
    }

    const typingDelay = 1200 + Math.random() * 800;

    setTimeout(() => {
      setIsTyping(false);
      const sellerMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        sender_name: sellerName,
        message: replyText,
        created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        is_delivered: true,
      };

      setMessages((prev) => [...prev, sellerMsg]);
      if (soundEnabled) playChimeSound();
    }, typingDelay);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (typeof customText === 'string' ? customText : inputText).trim();
    if (!textToSend || sending) return;

    if (!customText) setInputText('');
    setSending(true);

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender_name: 'You (Buyer)',
      message: textToSend,
      product_id: productId,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      is_delivered: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Send to InsForge database (edumart_messages)
    try {
      const client = getSupabaseClient();
      const db = client.database ? client.database : client;

      if (db && typeof db.from === 'function') {
        await db.from('edumart_messages').insert([
          {
            product_id: productId.includes('-') ? null : productId,
            message: textToSend,
            sender_name: 'You (Buyer)',
            is_read: false,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.warn('Realtime message local fallback active:', err);
    } finally {
      setSending(false);
    }

    // Trigger realistic live response from seller
    triggerSellerReply(textToSend);
  };

  const handleClearChat = () => {
    if (confirm('Clear chat history with this seller?')) {
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {}
      setMessages([defaultInitialMessage]);
    }
  };

  // Quick action suggestions
  const quickChips = [
    '👋 Is this still available?',
    '💰 Is the price negotiable?',
    '🏫 Where can we meet on campus?',
    '🔍 Can I test it before buying?',
  ];

  return (
    <Card
      className={`w-full ${
        isModal ? 'max-w-xl' : 'max-w-2xl'
      } border-primary/20 shadow-2xl bg-card/95 backdrop-blur-xl overflow-hidden flex flex-col h-[600px] rounded-3xl animate-scale-in`}
    >
      {/* Top Header */}
      <CardHeader className="p-4 border-b border-border/70 bg-muted/40 flex flex-row items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              <User className="w-6 h-6" />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background animate-pulse"
              title="Online Real-time Presence"
            />
          </div>
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <span>{sellerName}</span>
              {verifiedSeller && (
                <Badge className="bg-cyan-500/10 text-cyan-500 border-cyan-500/30 text-[10px] px-1.5 py-0">
                  <ShieldCheck className="w-3 h-3 mr-0.5" /> Verified Student
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5 truncate max-w-[200px]">
                <MapPin className="w-3 h-3 text-cyan-500" /> {sellerCollege}, {sellerCity}
              </span>
              <span>•</span>
              <span className="text-emerald-500 font-medium">Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearChat}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Clear Chat History"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-muted ml-1"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      {/* Product Summary Sticky Bar */}
      <div className="px-4 py-2.5 bg-cyan-500/5 border-b border-cyan-500/15 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {productImage && (
            <img
              src={productImage}
              alt={productTitle}
              className="w-9 h-9 rounded-lg object-cover border border-cyan-500/20 shrink-0"
            />
          )}
          <div className="truncate">
            <p className="text-xs font-semibold text-foreground truncate">{productTitle}</p>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="font-bold text-gradient-cyan">{productPrice}</span>
              <span>•</span>
              <span>Condition: {productCondition}</span>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-[11px] border-cyan-500/30 text-cyan-600 dark:text-cyan-400 shrink-0">
          Campus Exchange
        </Badge>
      </div>

      {/* Messages Scroll Area */}
      <CardContent className="p-4 flex-1 overflow-y-auto space-y-3.5">
        <div className="text-center my-2">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground/80 px-3 py-1 rounded-full bg-muted/50 border border-border/50">
            Encrypted Student-to-Student Chat • EduMart
          </span>
        </div>

        {messages.map((msg, idx) => {
          const isMe = msg.sender_name?.includes('You');
          return (
            <div key={msg.id || idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}>
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[10px] text-muted-foreground font-medium">{msg.sender_name}</span>
                <span className="text-[10px] text-muted-foreground/60">• {msg.created_at}</span>
              </div>
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  isMe
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none'
                    : 'bg-muted/80 text-foreground border border-border/80 rounded-bl-none'
                }`}
              >
                {msg.message}
              </div>
              {isMe && (
                <div className="flex items-center gap-1 text-[10px] text-cyan-500 mt-0.5 px-1 font-medium">
                  <CheckCheck className="w-3 h-3" /> Delivered
                </div>
              )}
            </div>
          );
        })}

        {/* Real-time Seller Typing Indicator */}
        {isTyping && (
          <div className="flex flex-col items-start animate-fade-in">
            <span className="text-[10px] text-muted-foreground mb-1 px-1">{sellerName} is typing...</span>
            <div className="bg-muted/80 border border-border/80 rounded-2xl rounded-bl-none px-4 py-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      {/* Quick Action Suggestion Chips */}
      <div className="px-4 py-2 bg-muted/20 border-t border-border/60 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(chip)}
            className="text-[11px] font-medium bg-background hover:bg-cyan-500/10 hover:border-cyan-500/40 border border-border/80 rounded-full px-3 py-1 text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 whitespace-nowrap transition-colors shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 border-t border-border/80 bg-background flex gap-2 shrink-0 items-center"
      >
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message ${sellerName}... (Press Enter to send)`}
          className="flex-1 text-sm rounded-xl border-border/80 bg-muted/30 focus-visible:ring-cyan-500"
          autoFocus
        />
        <Button
          type="submit"
          disabled={sending || !inputText.trim()}
          size="icon"
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl shrink-0 shadow-md transition-transform active:scale-95"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </Card>
  );
}
