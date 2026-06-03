import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("EXPO_PUBLIC_SUPABASE_URL não foi definida no .env do mobile.");
}

if (!supabaseAnonKey) {
  throw new Error("EXPO_PUBLIC_SUPABASE_ANON_KEY não foi definida no .env do mobile.");
}

export const supabaseRealtimeClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storageKey: "tofocous-realtime-auth",
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);