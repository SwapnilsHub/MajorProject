'use client';

import * as React from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>(null);
  const [localUser, setLocalUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const syncLocalUser = React.useCallback(() => {
    try {
      const stored = localStorage.getItem('edugram_auth_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.email) {
          const userObj: User = {
            id: parsed.id || 'user-' + parsed.email,
            app_metadata: {},
            user_metadata: {
              full_name: parsed.name || parsed.fullName || '',
              college: parsed.college || '',
              city: parsed.city || '',
              education_level: parsed.educationLevel || 'Undergraduate (B.E / B.Tech)',
            },
            aud: 'authenticated',
            created_at: new Date().toISOString(),
            email: parsed.email,
            phone: '',
            role: 'authenticated',
            updated_at: new Date().toISOString(),
          };
          setLocalUser(userObj);
          return;
        }
      }
      setLocalUser(null);
    } catch (e) {
      setLocalUser(null);
    }
  }, []);

  React.useEffect(() => {
    let mounted = true;
    syncLocalUser();

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, newSession: Session | null) => {
      setSession(newSession);
      syncLocalUser();
      setLoading(false);
    });

    const handleProfileUpdate = () => {
      syncLocalUser();
    };
    window.addEventListener('edugram:profile_updated', handleProfileUpdate);

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
      window.removeEventListener('edugram:profile_updated', handleProfileUpdate);
    };
  }, [syncLocalUser]);

  const signOut = React.useCallback(async () => {
    try {
      localStorage.removeItem('edugram_auth_user');
      localStorage.removeItem('edugram_user_profile');
    } catch (e) {}
    setLocalUser(null);
    await supabase.auth.signOut().catch(() => {});
    setSession(null);
    if (typeof window !== 'undefined') {
      window.location.assign('/login');
    }
  }, []);

  const activeUser = session?.user ?? localUser;

  const value = React.useMemo(
    () => ({
      user: activeUser,
      session,
      loading,
      signOut,
    }),
    [activeUser, session, loading, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
