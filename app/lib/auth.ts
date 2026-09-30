import "server-only";

import type { User } from "@supabase/supabase-js";
import { connection } from "next/server";
import { players } from "../data/players";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

// 大文字小文字は区別する(@の有無のみ無視)
const normalizeHandle = (handle: string) => handle.trim().replace(/^@/, "");

// X のユーザー名(@なし)を取得する。
// user_metadata はユーザー自身が書き換えられるため、X から返された identity_data を使う
function getXHandle(user: User) {
  const identity = user.identities?.find(
    (identity) => identity.provider === "x" || identity.provider === "twitter"
  );
  const data = identity?.identity_data;
  const handle = data?.user_name ?? data?.preferred_username;

  return typeof handle === "string" && handle ? normalizeHandle(handle) : null;
}

export function findPlayerByXHandle(handle: string) {
  const target = normalizeHandle(handle);

  return players.find(
    (player) => player.twitter && normalizeHandle(player.twitter) === target
  );
}

// 管理画面(/admin)に入れる運営アカウント(@なし)
const ADMIN_X_IDS = ["_Kan2M", "Whitestar_ch"];

// 環境変数 ADMIN_X_IDS(カンマ区切り)でも追加できる
const adminHandles = [
  ...ADMIN_X_IDS,
  ...(process.env.ADMIN_X_IDS ?? "").split(","),
]
  .map(normalizeHandle)
  .filter(Boolean);

export async function getCurrentAccount() {
  // ログイン状態はリクエストごとに異なるので、呼び出し元ページを必ず動的にする
  await connection();

  if (!isSupabaseConfigured) {
    return null;
  }

  const supabase = await createClient();
  // getSession ではなく getUser で Supabase 側に検証させる
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const xHandle = getXHandle(user);

  return {
    user,
    xHandle,
    player: xHandle ? findPlayerByXHandle(xHandle) : undefined,
    isAdmin: xHandle ? adminHandles.includes(xHandle) : false,
  };
}
