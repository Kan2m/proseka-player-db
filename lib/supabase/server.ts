import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// 公開データの読み取り用(Cookie を使わないので選手ページを静的に保てる)
export function createPublicClient() {
  return createSupabaseClient(supabaseUrl!, supabaseKey!, {
    auth: { persistSession: false },
  });
}

// 書き込み用。RLS をバイパスするので、必ずサーバー側で権限確認をしてから使うこと
export function createAdminClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    throw new Error("SUPABASE_SECRET_KEY が設定されていません");
  }

  return createSupabaseClient(supabaseUrl, secretKey, {
    auth: { persistSession: false },
  });
}
