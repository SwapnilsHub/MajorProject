import Link from 'next/link';
import {
  GraduationCap,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const platformLinks = [
  { href: '/domains', label: 'Domain Quizzes' },
  { href: '/projects', label: 'Projects' },
  { href: '/courses', label: 'Courses' },
];

const exploreLinks = [
  { href: '/domains', label: 'Domains' },
  { href: '/courses', label: 'Courses' },
  { href: '/colleges', label: 'Colleges' },
  { href: '/jobs', label: 'Jobs & Internships' },
  { href: '/edumart', label: 'EduMart' },
];

const communityLinks = [
  { href: '/dashboard', label: 'Student Profile' },
  { href: '/projects', label: 'Projects' },
  { href: '/domains', label: 'Domain Skill Check' },
];

const supportLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t bg-gradient-to-b from-transparent to-primary/5">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="bg-gradient-brand p-2 rounded-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-gradient">
                EduGram
              </span>
            </Link>
            <p className="text-sm font-medium text-muted-foreground">
              Learn. Share. Grow.
            </p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your digital education community — bringing learning, career development, 
              educational videos, quizzes, projects, and affordable study materials together.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get learning tips and EduGram updates in your inbox.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="h-9" />
              <Button
                size="sm"
                className="bg-gradient-brand text-white shrink-0"
              >
                Subscribe
              </Button>
            </div>
            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> hello@edugram.in
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> Pune, Maharashtra, India
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EduGram. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Learn • Practice • Build • Explore • Exchange
          </p>
        </div>
      </div>
    </footer>
  );
}
