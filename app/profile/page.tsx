'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import DashboardPage from '@/app/dashboard/page';

export default function ProfileRedirectPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return <DashboardPage />;
}
