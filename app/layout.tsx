import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Chatbot } from '@/components/chatbot';
import { ReduxProvider } from '@/components/redux-provider';
import { ToastProvider } from '@/context/ToastContext';

import { AuthGuard } from '@/components/auth-guard';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'EduGram — Learn. Share. Grow.',
  description:
    'EduGram is a digital education platform for learning, quizzes, educational videos, projects, career exploration, and affordable second-hand educational resources.',
  keywords: [
    'education platform',
    'online learning',
    'educational videos',
    'quiz platform',
    'career exploration',
    'student community',
    'EduMart',
    'second-hand books',
    'domain video tutorials',
    'project recommendations',
  ],
  openGraph: {
    title: 'EduGram — Your Digital Education Community',
    description: 'EduGram brings learning, career development, educational resources, projects, and affordable study materials together in one platform.',
    type: 'website',
  },
};

import { LanguageProvider } from '@/components/language-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <ReduxProvider>
              <AuthProvider>
                <ToastProvider>
                  <div className="relative min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                      <AuthGuard>{children}</AuthGuard>
                    </main>
                    <Footer />
                    <Chatbot />
                  </div>
                </ToastProvider>
              </AuthProvider>
            </ReduxProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
