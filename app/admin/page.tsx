'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import ProfilePage from '@/app/profile/page';

export default function AdminRedirectPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace('/profile');
  }, [router]);

  return <ProfilePage />;
}
