import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

// Service-role client, backend-only. Never send this key to mobile.
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
