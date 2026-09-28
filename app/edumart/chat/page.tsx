'use client';

import * as React from 'react';
import { MessageSquare, Sparkles, User, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedBg } from '@/components/animated-bg';
import { EduMartRealtimeChat } from '@/components/edumart-realtime-chat';
import Link from 'next/link';

export default function EduMartChatPage() {
  const [selectedProduct, setSelectedProduct] = React.useState({
    id: 'prod-1',
    title: 'Casio fx-991ES Scientific Calculator',
    sellerName: 'Rahul (EE Engineering Student)',
  });

  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/edumart">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to EduMart
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-primary" />
            EduMart Live Buyer-Seller Chat
          </h1>
          <p className="text-muted-foreground">Instant real-time WebSocket messaging powered by InsForge Realtime & PostgreSQL persistence.</p>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          {/* Active Conversations List */}
          <Card className="border-primary/10">
            <CardHeader className="p-4 border-b border-border">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Active Chats</CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-1">
              {[
                {
                  id: 'prod-1',
                  title: 'Casio fx-991ES Scientific Calculator',
                  sellerName: 'Rahul (EE Student)',
                  lastMsg: 'Hi there! Is it still available?',
                  time: '10:42 AM',
                },
                {
                  id: 'prod-2',
                  title: 'Higher Engineering Mathematics - BS Grewal',
                  sellerName: 'Priya (Mech Dept)',
                  lastMsg: 'I can drop it off at Hostel Block B',
                  time: 'Yesterday',
                },
                {
                  id: 'prod-3',
                  title: 'Arduino UNO Starter Kit + Sensors',
                  sellerName: 'Aman (CS Dept)',
                  lastMsg: 'Offered ₹800 for the complete kit',
                  time: 'Aug 20',
                },
              ].map((chat) => (
                <button
                  key={chat.id}
                  onClick={() =>
                    setSelectedProduct({
                      id: chat.id,
                      title: chat.title,
                      sellerName: chat.sellerName,
                    })
                  }
                  className={`w-full text-left p-3 rounded-xl transition-colors flex items-start gap-3 ${
                    selectedProduct.id === chat.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs truncate">{chat.sellerName}</span>
                      <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-xs text-foreground font-medium truncate">{chat.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{chat.lastMsg}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Live WebSocket Chat Window */}
          <div className="flex justify-center">
            <EduMartRealtimeChat
              productId={selectedProduct.id}
              productTitle={selectedProduct.title}
              sellerName={selectedProduct.sellerName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
