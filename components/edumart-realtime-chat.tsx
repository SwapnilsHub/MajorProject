'use client';

import * as React from 'react';
import { Send, MessageSquare, Loader2, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getSupabaseClient } from '@/lib/supabase/client';

export type ChatMessage = {
  id?: string;
  sender_id?: string;
  sender_name?: string;
  receiver_id?: string;
  product_id?: string;
  message: string;
  created_at?: string;
};

interface EduMartRealtimeChatProps {
  productId?: string;
  productTitle?: string;
  sellerName?: string;
  onClose?: () => void;
}

export function EduMartRealtimeChat({
  productId = 'default-product',
  productTitle = 'Casio Scientific Calculator',
  sellerName = 'Alex (Campus Seller)',
  onClose,
}: EduMartRealtimeChatProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: '1',
      sender_name: sellerName,
      message: `Hi there! Thanks for your interest in ${productTitle}. Is there any question I can help answer?`,
      created_at: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = React.useState('');
  const [sending, setSending] = React.useState(false);

  // Subscribe to InsForge Realtime WebSockets
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
              if (payload.new) {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: payload.new.id,
                    sender_name: payload.new.sender_name || 'Buyer',
                    message: payload.new.message,
                    created_at: new Date(payload.new.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  },
                ]);
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
  }, [productId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const messageText = inputText.trim();
    setInputText('');
    setSending(true);

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender_name: 'You (Buyer)',
      message: messageText,
      product_id: productId,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      const client = getSupabaseClient();
      const db = client.database ? client.database : client;

      if (db && typeof db.from === 'function') {
        await db.from('edumart_messages').insert([
          {
            product_id: productId.includes('-') ? null : productId,
            message: messageText,
            is_read: false,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error('Failed to persist realtime message to InsForge:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="w-full max-w-lg border-primary/20 shadow-2xl bg-background/95 backdrop-blur overflow-hidden flex flex-col h-[520px]">
      <CardHeader className="p-4 border-b border-border bg-muted/40 flex flex-row items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              {sellerName}
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="InsForge WebSocket Live" />
            </CardTitle>
            <p className="text-xs text-muted-foreground truncate max-w-[220px]">Item: {productTitle}</p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-4 flex-1 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => {
          const isMe = msg.sender_name?.includes('You');
          return (
            <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] text-muted-foreground mb-1 px-1">
                {msg.sender_name} • {msg.created_at}
              </span>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  isMe
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-muted/80 text-foreground border border-border rounded-bl-none'
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
      </CardContent>

      <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-background flex gap-2 shrink-0">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message to buyer/seller..."
          className="flex-1 text-sm"
        />
        <Button type="submit" disabled={sending || !inputText.trim()} size="icon" className="bg-gradient-brand text-white shrink-0">
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </Card>
  );
}
