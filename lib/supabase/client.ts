/**
 * lib/supabase/client.ts
 *
 * DEPRECATED SHIM — all traffic is now routed through InsForge.
 * This file exists only for backwards-compatibility so existing imports
 * like `import { supabase } from '@/lib/supabase/client'` keep working.
 */
export { default, supabase, getSupabaseClient, getInsForgeClient, insforge } from '@/lib/insforge/client';
