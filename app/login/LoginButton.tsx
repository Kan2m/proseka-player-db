"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "x",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch {
      setLoading(false);
      alert("ログインに失敗しました。時間をおいて再度お試しください。");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-black text-white transition hover:bg-zinc-700 disabled:opacity-60"
    >
      <span className="text-base">𝕏</span>
      {loading ? "Xへ移動中..." : "Xでログイン"}
    </button>
  );
}
