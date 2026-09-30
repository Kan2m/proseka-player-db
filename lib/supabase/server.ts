import "server-only";

import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// ログイン中ユーザーのセッション(Cookie)を扱うクライアント
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component から呼ばれた場合は set できない。
          // セッション更新は proxy.ts が担当するので無視してよい。
        }
      },
    },
  });
}

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
