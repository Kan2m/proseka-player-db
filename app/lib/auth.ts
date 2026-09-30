import "server-only";

import { connection } from "next/server";
import { getPlayerById, players } from "../data/players";
import { createAdminClient } from "@/lib/supabase/server";
import { getSession } from "./session";

// 大文字小文字は区別する(@の有無のみ無視)
const normalizeHandle = (handle: string) => handle.trim().replace(/^@/, "");

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

// ログイン時に「選手 ⇔ X の内部ID」を紐付ける。
// 一度紐付いた選手は、その内部IDのアカウントでしか入れない
// (@名の変更・使い回しによるなりすまし対策)
export async function linkPlayerAccount(xUserId: string, xUsername: string) {
  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("player_accounts")
    .select("player_id")
    .eq("x_user_id", xUserId)
    .maybeSingle();

  if (existing) {
    // 紐付け済み: @名が変わっていれば記録だけ更新
    await supabase
      .from("player_accounts")
      .update({ x_username: xUsername })
      .eq("x_user_id", xUserId);
    return;
  }

  const player = findPlayerByXHandle(xUsername);

  if (!player) {
    return;
  }

  // 選手がすでに別の内部IDと紐付いている場合は主キー重複で失敗する(=入れない)
  const { error } = await supabase.from("player_accounts").insert({
    player_id: player.id,
    x_user_id: xUserId,
    x_username: xUsername,
  });

  if (error) {
    console.error(
      `[auth] player ${player.id} is already linked to another X account`
    );
  }
}

export async function getCurrentAccount() {
  // ログイン状態はリクエストごとに異なるので、呼び出し元ページを必ず動的にする
  await connection();

  const session = await getSession();

  if (!session) {
    return null;
  }

  const { data: link } = await createAdminClient()
    .from("player_accounts")
    .select("player_id")
    .eq("x_user_id", session.xUserId)
    .maybeSingle();

  return {
    xUserId: session.xUserId,
    xHandle: session.xUsername,
    player: link ? getPlayerById(link.player_id as string) : undefined,
    isAdmin: adminHandles.includes(session.xUsername),
  };
}
