import "server-only";

import {
  createPublicClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { xAvatarUrls } from "../data/xAvatars";
import { avatarPublicUrl, xAvatarUrl } from "./avatar";

export type YoutubeRequest = {
  id: string;
  player_id: string;
  url: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  reviewed_at: string | null;
};

export const statusLabels: Record<
  YoutubeRequest["status"],
  { label: string; className: string }
> = {
  pending: { label: "承認待ち", className: "bg-yellow-100 text-yellow-700" },
  approved: { label: "公開中", className: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "却下", className: "bg-zinc-200 text-zinc-600" },
};

// 選手ページに表示する公開情報(自己紹介・アイコン・承認済みチャンネル)
export async function getPublicProfile(playerId: string) {
  if (!isSupabaseConfigured) {
    return {
      bio: "",
      avatarUrl: xAvatarUrl(playerId),
      youtubeUrls: [] as string[],
    };
  }

  const supabase = createPublicClient();

  const [profileResult, youtubeResult] = await Promise.all([
    supabase
      .from("player_profiles")
      .select("bio, avatar_path")
      .eq("player_id", playerId)
      .maybeSingle(),
    supabase
      .from("youtube_requests")
      .select("url")
      .eq("player_id", playerId)
      .eq("status", "approved")
      .order("reviewed_at", { ascending: true }),
  ]);

  if (profileResult.error || youtubeResult.error) {
    console.error(
      "[profiles] public profile load failed:",
      profileResult.error ?? youtubeResult.error
    );
  }

  return {
    bio: (profileResult.data?.bio as string | undefined) ?? "",
    // マイページで設定したアイコン → X のアイコン の順に使う
    avatarUrl:
      avatarPublicUrl(
        profileResult.data?.avatar_path as string | null | undefined
      ) ?? xAvatarUrl(playerId),
    youtubeUrls: (youtubeResult.data ?? []).map((row) => row.url as string),
  };
}

// 選手一覧用: { 選手ID: 画像URL }。マイページで設定したアイコンを X のアイコンより優先する
export async function getAvatarUrls(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured) {
    return { ...xAvatarUrls };
  }

  const { data, error } = await createPublicClient()
    .from("player_profiles")
    .select("player_id, avatar_path")
    .not("avatar_path", "is", null);

  if (error) {
    console.error("[profiles] avatar list load failed:", error);
  }

  const uploaded = Object.fromEntries(
    (data ?? []).flatMap((row) => {
      const url = avatarPublicUrl(row.avatar_path as string);
      return url ? [[row.player_id as string, url]] : [];
    })
  );

  return { ...xAvatarUrls, ...uploaded };
}

// 受け付ける URL 例:
//   https://www.youtube.com/@handle
//   https://www.youtube.com/channel/UCxxxx
//   https://youtube.com/c/name  /  https://youtube.com/user/name
export function normalizeYoutubeChannelUrl(input: string) {
  let url: URL;

  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();

  if (
    url.protocol !== "https:" ||
    !["youtube.com", "www.youtube.com", "m.youtube.com"].includes(host)
  ) {
    return null;
  }

  const match = url.pathname.match(
    /^\/(@[\w.\-%]+|channel\/[\w-]+|c\/[\w.\-%]+|user\/[\w.\-%]+)\/?/
  );

  return match ? `https://www.youtube.com/${match[1]}` : null;
}
