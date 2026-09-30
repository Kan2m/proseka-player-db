"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentAccount } from "../lib/auth";
import {
  AVATAR_BUCKET,
  AVATAR_MAX_BYTES,
  AVATAR_TYPES,
} from "../lib/avatar";
import { normalizeYoutubeChannelUrl } from "../lib/profiles";
import { clearSession } from "../lib/session";

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

  return { xUserId: account.xUserId, player: account.player };
}

export async function updateBio(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const { xUserId, player } = await requirePlayer();
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
      updated_by: xUserId,
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
  const { xUserId, player } = await requirePlayer();
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
    requested_by: xUserId,
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

// 拡張子や Content-Type は偽装できるので、ファイル先頭のバイト列で画像形式を判定する
function detectImageType(bytes: Uint8Array): keyof typeof AVATAR_TYPES | null {
  const ascii = (start: number, end: number) =>
    String.fromCharCode(...bytes.subarray(start, end));

  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") {
    return "image/webp";
  }

  if (bytes[0] === 0x89 && ascii(1, 4) === "PNG") {
    return "image/png";
  }

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }

  return null;
}

async function getAvatarPath(playerId: string) {
  const { data } = await createAdminClient()
    .from("player_profiles")
    .select("avatar_path")
    .eq("player_id", playerId)
    .maybeSingle();

  return (data?.avatar_path as string | null | undefined) ?? null;
}

function revalidateAvatar(playerId: string) {
  revalidatePath("/");
  revalidatePath(`/players/${playerId}`);
  revalidatePath("/mypage");
}

export async function updateAvatar(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const { xUserId, player } = await requirePlayer();
  const file = formData.get("avatar");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "画像を選択してください。" };
  }

  if (file.size > AVATAR_MAX_BYTES) {
    return { ok: false, message: "画像のサイズが大きすぎます。" };
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = detectImageType(bytes);

  if (!type) {
    return {
      ok: false,
      message: "PNG・JPEG・WebP 形式の画像を選択してください。",
    };
  }

  const supabase = createAdminClient();
  const oldPath = await getAvatarPath(player.id);

  // 毎回別のファイル名にして、CDN・ブラウザのキャッシュで古い画像が残らないようにする
  const path = `${player.id}/${Date.now()}.${AVATAR_TYPES[type]}`;

  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, bytes, { contentType: type, cacheControl: "31536000" });

  if (uploadError) {
    console.error("[mypage] avatar upload failed:", uploadError);
    return { ok: false, message: "アップロードに失敗しました。" };
  }

  const { error } = await supabase.from("player_profiles").upsert({
    player_id: player.id,
    avatar_path: path,
    updated_at: new Date().toISOString(),
    updated_by: xUserId,
  });

  if (error) {
    await supabase.storage.from(AVATAR_BUCKET).remove([path]);
    return { ok: false, message: "保存に失敗しました。" };
  }

  if (oldPath) {
    await supabase.storage.from(AVATAR_BUCKET).remove([oldPath]);
  }

  revalidateAvatar(player.id);

  return { ok: true, message: "アイコンを保存しました。" };
}

// アイコンを削除して未設定(シルエット)に戻す
export async function deleteAvatar() {
  const { xUserId, player } = await requirePlayer();
  const supabase = createAdminClient();
  const oldPath = await getAvatarPath(player.id);

  if (!oldPath) {
    return;
  }

  await supabase
    .from("player_profiles")
    .update({
      avatar_path: null,
      updated_at: new Date().toISOString(),
      updated_by: xUserId,
    })
    .eq("player_id", player.id);

  await supabase.storage.from(AVATAR_BUCKET).remove([oldPath]);

  revalidateAvatar(player.id);
}

export async function logout() {
  await clearSession();

  redirect("/");
}
