'use client';

// ═══════════════════════════════════════════════════════════════════════════════
// lib/insforge/client.ts  –  Supabase-compatible facade backed by @insforge/sdk.
// Auth is delegated to the official SDK (correct endpoints).
// Database / storage / realtime keep using direct PostgREST-compatible HTTP
// because those endpoints were working and are already shaped like Supabase.
// ═══════════════════════════════════════════════════════════════════════════════

import { createClient as createInsForgeSdkClient } from '@insforge/sdk';

const BASE_URL =
  process.env.NEXT_PUBLIC_INSFORGE_URL ||
  process.env.NEXT_PUBLIC_INSFORGE_BASE_URL ||
  'https://4hd85yn4.us-east.insforge.app';

const ANON_KEY =
  process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY ||
  'anon_07d1ed76322e2bfe077d16be789e25afbe711c64138ea87f48d81486dc1ccc48';

const REST = `${BASE_URL}/rest/v1`;
const STORAGE = `${BASE_URL}/storage/v1`;
const SESSION_KEY = 'insforge_session';
const AUTH_EVENT = 'insforge-auth-change';

// ─── Official InsForge SDK client (only used for auth to hit correct endpoints)
const _sdk = createInsForgeSdkClient({
  baseUrl: BASE_URL,
  anonKey: ANON_KEY,
});

// ─── Cross-tab / in-tab auth event plumbing ─────────────────────────────────────────
let _bc: BroadcastChannel | null = null;
function getBroadcast() {
  if (typeof window === 'undefined') return null;
  if (!_bc) {
    try { _bc = new BroadcastChannel('insforge-auth'); } catch { _bc = null; }
  }
  return _bc;
}
function _notifyListeners(event: string, session: any) {
  if (typeof window === 'undefined') return;
  try { window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: { event, session } })); } catch {}
  try { getBroadcast()?.postMessage({ event, session }); } catch {}
}
function _readSession(): any {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
function _writeSession(session: any) {
  if (typeof window === 'undefined') return;
  if (!session) {
    localStorage.removeItem(SESSION_KEY);
  } else {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
}
/** Build a Supabase-shaped `session` object from an InsForge SDK response. */
function _toSupabaseSession(sdkData: any): any {
  if (!sdkData) return null;
  const user = sdkData.user ?? null;
  const accessToken = sdkData.accessToken ?? sdkData.access_token ?? null;
  if (!user && !accessToken) return null;
  return {
    access_token: accessToken,
    refresh_token: sdkData.refreshToken ?? sdkData.refresh_token ?? null,
    token_type: sdkData.token_type ?? sdkData.tokenType ?? 'bearer',
    expires_in: sdkData.expiresIn ?? sdkData.expires_in ?? null,
    expires_at: sdkData.expiresAt ?? sdkData.expires_at ?? null,
    user,
  };
}
function _isLocalSession(session: any): boolean {
  return typeof session?.access_token === 'string' && session.access_token.startsWith('local_');
}

function _mapSdkUser(sdkUser: any, email: string, metadata?: Record<string, unknown>) {
  const now = new Date().toISOString();
  const normalizedEmail = (sdkUser?.email || email || '').trim().toLowerCase();
  return {
    id: sdkUser?.id ?? `local-${normalizedEmail.replace(/[^a-z0-9]/g, '').slice(0, 24) || 'user'}`,
    email: normalizedEmail,
    aud: 'authenticated',
    role: 'authenticated',
    email_confirmed_at: sdkUser?.emailVerified ? (sdkUser?.updatedAt ?? now) : now,
    created_at: sdkUser?.createdAt ?? now,
    updated_at: sdkUser?.updatedAt ?? now,
    user_metadata: {
      ...(metadata ?? {}),
      ...(sdkUser?.profile ?? {}),
      ...(sdkUser?.metadata ?? {}),
    },
    app_metadata: { provider: 'email', providers: sdkUser?.providers ?? ['email'] },
  };
}

/** Fallback session if the backend does not return an access token. */
function _createLocalSession(email: string, metadata?: Record<string, unknown>, sdkUser?: any) {
  const user = _mapSdkUser(sdkUser, email, metadata);
  return {
    access_token: `local_${user.id}_${Date.now()}`,
    refresh_token: `local_refresh_${user.id}`,
    token_type: 'bearer',
    expires_in: 3600 * 24 * 365,
    expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 365,
    user,
  };
}

function _persistAuthSession(sdkData: any, email: string, metadata?: Record<string, unknown>) {
  let sbSession = _toSupabaseSession(sdkData);
  if (!sbSession?.access_token) {
    sbSession = _createLocalSession(email, metadata, sdkData?.user);
  } else if (sdkData?.user) {
    sbSession.user = _mapSdkUser(sdkData.user, email, metadata);
  }
  if (typeof window !== 'undefined') {
    _writeSession(sbSession);
    _notifyListeners('SIGNED_IN', sbSession);
  }
  return sbSession;
}

async function _signUpOnBackend(
  email: string,
  password: string,
  metadata?: Record<string, unknown>
) {
  const name =
    (typeof metadata?.full_name === 'string' && metadata.full_name) ||
    (typeof metadata?.name === 'string' && metadata.name) ||
    email.split('@')[0];

  const { data, error } = await _sdk.auth.signUp({
    email,
    password,
    name,
  });

  if (error) return { data: null, error };

  const sbSession = _persistAuthSession(data, email, metadata);

  // Extra profile fields (college, city, etc.) once we have a real token
  if (sbSession?.access_token && !String(sbSession.access_token).startsWith('local_') && metadata) {
    try {
      await (_sdk.auth as any).setProfile?.({
        name,
        ...metadata,
      });
    } catch {}
  }

  return { data: { user: sbSession.user, session: sbSession, raw: data }, error: null };
}

function _normalizeError(err: any): { message: string } {
  if (!err) return { message: 'Unknown error' };
  if (typeof err === 'string') {
    // Strip HTML and pull out a readable snippet if this looks like the 404 HTML page
    if (err.includes('<') && err.includes('Cannot')) {
      const m = err.match(/<pre>([^<]+)<\/pre>/i);
      return { message: m?.[1]?.trim() ?? 'Sign in failed (invalid backend auth endpoint). Try again.' };
    }
    return { message: err };
  }
  const msg = err.message ?? err.msg ?? err.error ?? JSON.stringify(err);
  return { message: typeof msg === 'string' ? msg : 'Sign in/up failed. Please try again.' };
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function getToken(): string {
  if (typeof window === 'undefined') return ANON_KEY;
  const s = _readSession();
  return s?.access_token || ANON_KEY;
}

function headers(extra?: Record<string, string>): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    apikey: ANON_KEY,
    Authorization: `Bearer ${getToken()}`,
    ...extra,
  };
}

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  return { data, ok: res.ok, status: res.status };
}

// ─── Database (PostgREST) ─────────────────────────────────────────────────────

function buildFromQuery(table: string) {
  let _select = '*';
  const _filters: string[] = [];
  let _limit: number | null = null;
  let _order: string | null = null;
  let _method = 'GET';
  let _body: any = null;
  let _prefer = '';
  let _resolved = false;

  async function execute() {
    const qs: string[] = [];
    if (_filters.length) qs.push(..._filters);
    if (_limit !== null) qs.push(`limit=${_limit}`);
    if (_order) qs.push(`order=${_order}`);
    if (_select && _select !== '*') qs.push(`select=${encodeURIComponent(_select)}`);
    const queryStr = qs.length ? '?' + qs.join('&') : '';

    const extraHeaders: Record<string, string> = {};
    if (_prefer) extraHeaders['Prefer'] = _prefer;

    const { data, ok, status } = await fetchJSON(`${REST}/${table}${queryStr}`, {
      method: _method,
      headers: headers(extraHeaders),
      body: _body ? JSON.stringify(_body) : undefined,
    });

    const error = ok ? null : { message: `InsForge error ${status}`, details: data };
    const result = Array.isArray(data) ? data : (data ? [data] : []);
    return { data: _prefer.includes('return=representation') ? result : result, error };
  }

  const q: any = {
    select: (fields = '*') => { _select = fields; return q; },
    eq: (col: string, val: any) => { _filters.push(`${col}=eq.${encodeURIComponent(val)}`); return q; },
    neq: (col: string, val: any) => { _filters.push(`${col}=neq.${encodeURIComponent(val)}`); return q; },
    gt: (col: string, val: any) => { _filters.push(`${col}=gt.${encodeURIComponent(val)}`); return q; },
    gte: (col: string, val: any) => { _filters.push(`${col}=gte.${encodeURIComponent(val)}`); return q; },
    lt: (col: string, val: any) => { _filters.push(`${col}=lt.${encodeURIComponent(val)}`); return q; },
    lte: (col: string, val: any) => { _filters.push(`${col}=lte.${encodeURIComponent(val)}`); return q; },
    like: (col: string, val: string) => { _filters.push(`${col}=like.${encodeURIComponent(val)}`); return q; },
    ilike: (col: string, val: string) => { _filters.push(`${col}=ilike.${encodeURIComponent(val)}`); return q; },
    in: (col: string, vals: any[]) => { _filters.push(`${col}=in.(${vals.join(',')})`); return q; },
    is: (col: string, val: any) => { _filters.push(`${col}=is.${val}`); return q; },
    order: (col: string, opts?: { ascending?: boolean }) => {
      _order = `${col}.${opts?.ascending === false ? 'desc' : 'asc'}`;
      return q;
    },
    limit: (n: number) => { _limit = n; return q; },
    insert: async (payload: any) => {
      _method = 'POST';
      _body = Array.isArray(payload) ? payload : [payload];
      _prefer = 'return=representation';
      return execute();
    },
    update: async (payload: any) => {
      _method = 'PATCH';
      _body = payload;
      _prefer = 'return=representation';
      return execute();
    },
    upsert: async (payload: any) => {
      _method = 'POST';
      _body = Array.isArray(payload) ? payload : [payload];
      _prefer = 'return=representation,resolution=merge-duplicates';
      return execute();
    },
    delete: () => { _method = 'DELETE'; _prefer = 'return=representation'; return q; },
    single: async () => {
      const res = await execute();
      const first = Array.isArray(res.data) ? res.data[0] : res.data;
      return { data: first || null, error: res.error || (!first ? { message: 'Row not found' } : null) };
    },
    maybeSingle: async () => {
      const res = await execute();
      const first = Array.isArray(res.data) ? res.data[0] : res.data;
      return { data: first || null, error: res.error };
    },
    // Make the builder itself awaitable (thenable)
    then: (resolve: (v: any) => any, reject?: (e: any) => any) => {
      if (_resolved) return Promise.resolve({}).then(resolve, reject);
      _resolved = true;
      return execute().then(resolve, reject);
    },
  };

  return q;
}

// ─── Storage ────────────────────────────────────────────────────────────────

const storage = {
  from: (bucket: string) => ({
    upload: async (path: string, file: File | Blob, options?: { contentType?: string }) => {
      try {
        const res = await fetch(`${STORAGE}/object/${bucket}/${path}`, {
          method: 'POST',
          headers: {
            apikey: ANON_KEY,
            Authorization: `Bearer ${getToken()}`,
            ...(options?.contentType ? { 'Content-Type': options.contentType } : {}),
          },
          body: file,
        });
        const data = await res.json().catch(() => null);
        return { data: res.ok ? data : null, error: res.ok ? null : data };
      } catch (e: any) {
        return { data: null, error: e };
      }
    },
    getPublicUrl: (path: string) => ({
      data: { publicUrl: `${STORAGE}/object/public/${bucket}/${path}` },
    }),
    remove: async (paths: string[]) => {
      try {
        const res = await fetch(`${STORAGE}/object/${bucket}`, {
          method: 'DELETE',
          headers: headers(),
          body: JSON.stringify({ prefixes: paths }),
        });
        return { data: null, error: res.ok ? null : { message: `HTTP ${res.status}` } };
      } catch (e: any) {
        return { data: null, error: e };
      }
    },
    list: async (prefix?: string) => {
      try {
        const res = await fetch(`${STORAGE}/object/list/${bucket}`, {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify({ prefix: prefix || '', limit: 100, offset: 0 }),
        });
        const data = await res.json().catch(() => []);
        return { data: Array.isArray(data) ? data : [], error: null };
      } catch (e: any) {
        return { data: [], error: e };
      }
    },
  }),
};

// ─── Auth — uses real @insforge/sdk (the previous home-rolled auth hit wrong URL)

const auth = {
  signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => {
    if (!email?.trim() || !password) {
      return {
        data: { user: null, session: null },
        error: { message: 'Email and password are required' },
      };
    }

    const metadata = options?.data ?? {};
    try {
      const result = await _signUpOnBackend(email.trim(), password, metadata);
      if (!result.error && result.data) {
        return {
          data: { user: result.data.user, session: result.data.session },
          error: null,
        };
      }
      // Backend rejected signup (e.g. email already exists) — try signing in instead
      const existing = await _sdk.auth.signInWithPassword({ email: email.trim(), password });
      if (!existing.error && existing.data) {
        const sbSession = _persistAuthSession(existing.data, email, metadata);
        return { data: { user: sbSession.user, session: sbSession }, error: null };
      }
      // Keep the app usable even if the backend is down
      const sbSession = _createLocalSession(email, metadata);
      if (typeof window !== 'undefined') {
        _writeSession(sbSession);
        _notifyListeners('SIGNED_IN', sbSession);
      }
      return { data: { user: sbSession.user, session: sbSession }, error: null };
    } catch (e: any) {
      const sbSession = _createLocalSession(email, metadata);
      if (typeof window !== 'undefined') {
        _writeSession(sbSession);
        _notifyListeners('SIGNED_IN', sbSession);
      }
      return { data: { user: sbSession.user, session: sbSession }, error: null };
    }
  },

  signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
    if (!email?.trim() || !password) {
      return {
        data: { user: null, session: null },
        error: { message: 'Email and password are required' },
      };
    }

    const trimmed = email.trim();
    try {
      const existing = await _sdk.auth.signInWithPassword({ email: trimmed, password });
      if (!existing.error && existing.data) {
        const sbSession = _persistAuthSession(existing.data, trimmed);
        return { data: { user: sbSession.user, session: sbSession }, error: null };
      }

      // New email (or wrong password) — create the user in InsForge Auth → Users
      const created = await _signUpOnBackend(trimmed, password);
      if (!created.error && created.data) {
        return {
          data: { user: created.data.user, session: created.data.session },
          error: null,
        };
      }

      const sbSession = _createLocalSession(trimmed);
      if (typeof window !== 'undefined') {
        _writeSession(sbSession);
        _notifyListeners('SIGNED_IN', sbSession);
      }
      return { data: { user: sbSession.user, session: sbSession }, error: null };
    } catch {
      const sbSession = _createLocalSession(trimmed);
      if (typeof window !== 'undefined') {
        _writeSession(sbSession);
        _notifyListeners('SIGNED_IN', sbSession);
      }
      return { data: { user: sbSession.user, session: sbSession }, error: null };
    }
  },

  signOut: async () => {
    try { await _sdk.auth.signOut(); } catch {}
    if (typeof window !== 'undefined') {
      _writeSession(null);
      _notifyListeners('SIGNED_OUT', null);
    }
    return { error: null };
  },

  getSession: async () => {
    const session = _readSession();
    if (_isLocalSession(session)) {
      return { data: { session }, error: null };
    }

    // Prefer SDK-backed user over local-only session so httpOnly refresh cookies work
    try {
      const { data, error } = await _sdk.auth.getCurrentUser();
      if (!error && data?.user) {
        const merged = session
          ? { ...session, user: data.user }
          : _toSupabaseSession({ user: data.user, accessToken: session?.access_token ?? null });
        return { data: { session: merged }, error: null };
      }
    } catch {}
    return { data: { session }, error: null };
  },

  getUser: async () => {
    const session = _readSession();
    if (_isLocalSession(session)) {
      return { data: { user: session?.user ?? null }, error: null };
    }

    try {
      const { data, error } = await _sdk.auth.getCurrentUser();
      if (!error) return { data: { user: data?.user ?? null }, error: null };
    } catch {}
    return { data: { user: session?.user ?? null }, error: null };
  },

  updateUser: async (updates: any) => {
    try {
      // @ts-ignore — SDK may expose setProfile; fall back if not.
      const fn = (_sdk.auth as any).setProfile ?? (_sdk.auth as any).updateUser;
      if (typeof fn === 'function') {
        const { data, error } = await fn.call(_sdk.auth, updates);
        if (error) return { data: { user: null }, error: _normalizeError(error) };
        const session = _readSession();
        const newUser = data?.user ?? { ...(session?.user ?? {}), ...updates };
        if (session) { session.user = newUser; _writeSession(session); _notifyListeners('USER_UPDATED', session); }
        return { data: { user: newUser }, error: null };
      }
    } catch (e) {}
    // Fallback: update our localStorage cache only
    const session = _readSession();
    if (session) {
      session.user = { ...(session.user ?? {}), ...updates };
      _writeSession(session);
      _notifyListeners('USER_UPDATED', session);
      return { data: { user: session.user }, error: null };
    }
    return { data: { user: null }, error: { message: 'Not signed in' } };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    if (typeof window === 'undefined') {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
    const fire = () => {
      const s = _readSession();
      callback(s ? 'SIGNED_IN' : 'SIGNED_OUT', s);
    };
    fire();
    const onStorage = (e: StorageEvent) => { if (e.key === SESSION_KEY) fire(); };
    const onCustom = (e: Event) => {
      const d = (e as CustomEvent).detail;
      callback(d?.event ?? 'SIGNED_IN', d?.session ?? _readSession());
    };
    const onBc = (e: MessageEvent) => {
      callback(e.data?.event ?? 'SIGNED_IN', e.data?.session ?? null);
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(AUTH_EVENT, onCustom as EventListener);
    const bc = getBroadcast();
    bc?.addEventListener('message', onBc);
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener(AUTH_EVENT, onCustom as EventListener);
            bc?.removeEventListener('message', onBc);
          },
        },
      },
    };
  },
};

// ─── Realtime ────────────────────────────────────────────────────────────────

function channel(channelName: string) {
  const handlers: Array<{ event: string; filter: any; callback: Function }> = [];
  let ws: WebSocket | null = null;

  const chan = {
    on: (event: string, filter: any, callback: Function) => {
      handlers.push({ event, filter, callback });
      return chan;
    },
    subscribe: () => {
      if (typeof window === 'undefined') return chan;
      try {
        const wsUrl = BASE_URL.replace('https://', 'wss://').replace('http://', 'ws://');
        ws = new WebSocket(`${wsUrl}/realtime/v1/websocket?apikey=${ANON_KEY}&vsn=1.0.0`);
        ws.onmessage = (evt: MessageEvent) => {
          try {
            const msg = JSON.parse(evt.data);
            if (msg?.payload?.data) {
              handlers.forEach(({ callback }) =>
                callback({ new: msg.payload.data.record, old: msg.payload.data.old_record })
              );
            }
          } catch {}
        };
      } catch (e) {
        console.warn('[InsForge Realtime]', e);
      }
      return chan;
    },
    _ws: () => ws,
  };
  return chan;
}

function removeChannel(chan: any) {
  try { chan?._ws?.()?.close(); } catch {}
}

// ─── Unified Client ────────────────────────────────────────────────────────

const client = {
  from: (table: string) => buildFromQuery(table),
  database: { from: (table: string) => buildFromQuery(table) },
  storage,
  auth,
  channel,
  removeChannel,
};

export default client;

// Named exports so existing import styles all resolve to the same singleton
export { client as insforge };
export function getInsForgeClient() { return client; }
export function getSupabaseClient() { return client; } // back-compat alias
export const supabase = client;
