"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import { getCurrentAccount } from "../lib/auth";
import { normalizeYoutubeChannelUrl } from "../lib/profiles";

export type FormState = {
  ok: boolean;
  message: string;
} | null;

const BIO_MAX_LENGTH = 1000;
const YOUTUBE_MAX_CHANNELS = 3;

// 本人確認: ログイン中かつ登録選手のXアカウントであること
async function requirePlayer() {
  const account = await getCurrentAccount();

  if (!account?.player) {
    throw new Error("unauthorized");
  }

  return { user: account.user, player: account.player };
}

export async function updateBio(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const { user, player } = await requirePlayer();
  const bio = String(formData.get("bio") ?? "").trim();

  if (bio.length > BIO_MAX_LENGTH) {
    return {
      ok: false,
      message: `自己紹介は${BIO_MAX_LENGTH}文字以内で入力してください。`,
    };
  }

  const { error } = await createAdminClient()
    .from("player_profiles")
    .upsert({
      player_id: player.id,
      bio,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    });

  if (error) {
    return { ok: false, message: "保存に失敗しました。" };
  }

  revalidatePath(`/players/${player.id}`);
  revalidatePath("/mypage");

  return { ok: true, message: "自己紹介を保存しました。" };
}

export async function requestYoutubeChannel(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const { user, player } = await requirePlayer();
  const url = normalizeYoutubeChannelUrl(String(formData.get("url") ?? ""));

  if (!url) {
    return {
      ok: false,
      message:
        "YouTubeチャンネルのURLを入力してください。(例: https://www.youtube.com/@xxxx)",
    };
  }

  const supabase = createAdminClient();
  const { data: existing, error: selectError } = await supabase
    .from("youtube_requests")
    .select("url, status")
    .eq("player_id", player.id)
    .in("status", ["pending", "approved"]);

  if (selectError) {
    return { ok: false, message: "申請に失敗しました。" };
  }

  if (existing.some((row) => row.url === url)) {
    return { ok: false, message: "このチャンネルは申請済み、または登録済みです。" };
  }

  if (existing.length >= YOUTUBE_MAX_CHANNELS) {
    return {
      ok: false,
      message: `登録・申請できるチャンネルは${YOUTUBE_MAX_CHANNELS}件までです。`,
    };
  }

  const { error } = await supabase.from("youtube_requests").insert({
    player_id: player.id,
    url,
    requested_by: user.id,
  });

  if (error) {
    return { ok: false, message: "申請に失敗しました。" };
  }

  revalidatePath("/mypage");

  return {
    ok: true,
    message: "申請しました。運営の承認後に選手ページへ表示されます。",
  };
}

// 申請の取り下げ・登録済みチャンネルの削除
export async function deleteYoutubeChannel(formData: FormData) {
  const { player } = await requirePlayer();
  const id = String(formData.get("id") ?? "");

  await createAdminClient()
    .from("youtube_requests")
    .delete()
    .eq("id", id)
    .eq("player_id", player.id);

  revalidatePath(`/players/${player.id}`);
  revalidatePath("/mypage");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/");
}
