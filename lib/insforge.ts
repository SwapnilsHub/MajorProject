/**
 * lib/insforge.ts
 *
 * Main export point for the InsForge backend client.
 * Import from here in any page or component.
 *
 * Usage:
 *   import { insforge } from '@/lib/insforge';
 *   import { supabase }  from '@/lib/insforge';   // works as alias
 *   import { getInsForgeClient } from '@/lib/insforge';
 */
export { default, insforge, supabase, getInsForgeClient, getSupabaseClient } from '@/lib/insforge/client';
