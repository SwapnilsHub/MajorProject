'use client';

import * as React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  ChevronDown,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeader } from '@/components/section-header';
import { AnimatedBg } from '@/components/animated-bg';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth-provider';

const faqs = [
  { q: 'Is EduGram free to use for students?', a: 'Yes! Learning videos, reels, quizzes, project roadmaps, and browsing EduMart are completely free for all students.' },
  { q: 'What is EduMart and how does it work?', a: 'EduMart is EduGram’s second-hand educational marketplace where students can buy and sell textbooks, calculators, lab gear, and electronics at student-friendly prices.' },
  { q: 'How do I list an item for sale on EduMart?', a: 'Sign in to your EduGram account, head over to EduMart, click "Post a Product", upload photos, set a student-friendly price, and publish!' },
  { q: 'Can I track my study progress and quizzes?', a: 'Yes! The EduGram Progress Tracker logs your study hours, quiz accuracy, daily streaks, and completion certificates.' },
  { q: 'Are there project recommendations for students?', a: 'Yes, EduGram provides step-by-step project roadmaps across web development, AI, data science, electronics, and design.' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.from('contact_submissions').insert({
      name,
      email,
      subject,
      message,
    });

    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative min-h-screen pt-8 pb-20">
      <AnimatedBg />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Contact Us"
          title={
            <>
              Get in <span className="text-gradient">Touch</span>
            </>
          }
          description="Have questions about EduGram, learning resources, EduMart, or anything else? We are here to help you on your learning journey."
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Mail, label: 'Email', value: 'hello@edugram.in', color: 'from-blue-500 to-cyan-500' },
            { icon: Phone, label: 'Phone', value: '+91 98765 43210', color: 'from-purple-500 to-pink-500' },
            { icon: MapPin, label: 'Address', value: 'Pune, Maharashtra, India', color: 'from-green-500 to-emerald-500' },
            { icon: Clock, label: 'Hours', value: 'Mon-Sat, 9AM-6PM IST', color: 'from-orange-500 to-red-500' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} className="border-primary/10 hover:shadow-glow transition-all">
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-semibold">{item.value}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="border-primary/10">
            <CardContent className="pt-6">
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Send us a message
              </h3>
              {submitted ? (
                <div className="p-8 text-center space-y-3 bg-green-500/10 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg">Message Sent!</h4>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reaching out. We will get back to you within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}
                  {!user && (
                    <p className="text-xs text-muted-foreground">
                      Tip: <a href="/login" className="text-primary hover:underline">sign in</a> first so we can link this message to your account.
                    </p>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us more..." />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-brand text-white">
                    {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="border-primary/10 overflow-hidden">
            <div className="relative h-full min-h-[400px] bg-gradient-to-br from-primary/10 via-brand-purple/10 to-accent/10 flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto shadow-glow">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold">
                  EduGram HQ
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Pune, Maharashtra, India — 411001
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-4">
                  <div className="p-3 rounded-lg bg-background/60 border">
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="font-semibold text-sm">+91 98765 43210</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background/60 border">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-semibold text-sm">hello@edugram.in</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="FAQ"
            title={
              <>
                Frequently Asked{' '}
                <span className="text-gradient">Questions</span>
              </>
            }
          />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <Card key={i} className="border-primary/10 overflow-hidden">
                <AccordionItem value={`item-${i}`} className="border-0">
                  <AccordionTrigger className="px-6 hover:no-underline hover:bg-primary/5">
                    <span className="font-medium text-left">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
