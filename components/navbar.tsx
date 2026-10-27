'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Menu,
  Compass,
  GraduationCap,
  Home,
  ClipboardCheck,
  Layers,
  ShoppingBag,
  LogOut,
  FileText,
  Bell,
  Check,
  X,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/components/auth-provider';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';

interface NotificationItem {
  id: string;
  text: string;
  time: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  { id: '1', text: 'New video lesson: Sorting Algorithms Explained', time: '1h ago', read: false },
  { id: '2', text: 'Your quiz score: 92% in Data Structures MCQ', time: '3h ago', read: false },
  { id: '3', text: 'New EduMart item listed near your college: Arduino Uno Kit', time: '1d ago', read: false },
  { id: '4', text: 'Certificate earned: Full-Stack Foundations', time: '2d ago', read: false },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(initialNotifications);

  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const notifRef = React.useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/', label: t.nav.home, icon: Home },
    { href: '/domains', label: t.nav.domains, icon: Compass },
    { href: '/projects', label: t.nav.projects, icon: Layers },
    { href: '/courses', label: t.nav.courses, icon: BookOpen },
    { href: '/resume', label: t.nav.resume, icon: FileText },
    { href: '/edumart', label: t.nav.edumart, icon: ShoppingBag },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Close notifications popover on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'glass shadow-lg border-b'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-brand rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-brand p-2 rounded-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
          </div>
          <span className="font-display font-bold text-lg text-gradient">
            EduGram
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const targetHref =
              user || link.href === '/'
                ? link.href
                : `/login?redirect=${encodeURIComponent(link.href)}`;
            return (
              <Link
                key={link.href}
                href={targetHref}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-primary/10 hover:text-primary',
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/70'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Notifications Bell Icon Button (PopUp Menu) */}
          <div className="relative" ref={notifRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground/80 hover:text-primary"
              onClick={() => setNotifOpen(!notifOpen)}
              title="EduGram Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Popover Card */}
            {notifOpen && (
              <div className="absolute right-0 top-12 w-[390px] sm:w-[430px] max-w-[calc(100vw-1.5rem)] rounded-2xl border border-primary/20 bg-card/95 backdrop-blur-xl shadow-2xl p-4 z-50 animate-scale-in space-y-3">
                <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Bell className="h-4.5 w-4.5 text-primary shrink-0" />
                    <h3 className="font-display font-bold text-sm sm:text-base whitespace-nowrap">
                      EduGram Notifications
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {unreadCount > 0 && (
                      <span className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap inline-flex items-center">
                        {unreadCount} new
                      </span>
                    )}
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-primary hover:bg-primary/10 px-2.5 py-1 rounded-lg transition-colors font-medium flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Check className="h-3.5 w-3.5" /> Mark all read
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          'flex items-start justify-between gap-3 p-3 rounded-xl border text-xs transition-colors',
                          n.read ? 'bg-muted/20 border-border/40 text-muted-foreground' : 'bg-primary/5 border-primary/20 font-medium text-foreground'
                        )}
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className={cn('h-2 w-2 rounded-full shrink-0 mt-1.5', n.read ? 'bg-muted-foreground/40' : 'bg-blue-500')} />
                          <div className="space-y-0.5 min-w-0">
                            <p className="line-clamp-2 leading-relaxed">{n.text}</p>
                            <span className="text-[10px] text-muted-foreground">{n.time}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => clearNotification(n.id)}
                          className="text-muted-foreground hover:text-red-400 shrink-0 p-0.5"
                          title="Dismiss"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-muted-foreground">
                      No notifications right now.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <ThemeToggle />

          {/* Desktop Right Auth Actions */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard" className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-primary" />
                  {t.nav.profile}
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">{t.nav.login}</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-brand text-white hover:opacity-90"
                  asChild
                >
                  <Link href="/register">{t.nav.join}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation Sheet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="mt-4 mb-6 flex items-center gap-2">
                <div className="bg-gradient-brand p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="font-display font-bold text-lg text-gradient">EduGram</span>
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const targetHref =
                    user || link.href === '/'
                      ? link.href
                      : `/login?redirect=${encodeURIComponent(link.href)}`;
                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={targetHref}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors hover:bg-primary/10 hover:text-primary',
                          pathname === link.href
                            ? 'text-primary bg-primary/10'
                            : 'text-foreground/70'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <div className="mt-4 flex flex-col gap-2 px-1">
                  {user ? (
                    <SheetClose asChild>
                      <Button variant="outline" asChild>
                        <Link href="/dashboard" className="flex items-center justify-center gap-2">
                          <User className="h-4 w-4 text-primary" /> Student Profile
                        </Link>
                      </Button>
                    </SheetClose>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Button variant="outline" asChild>
                          <Link href="/login">Login</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button className="bg-gradient-brand text-white" asChild>
                          <Link href="/register">Join EduGram</Link>
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
