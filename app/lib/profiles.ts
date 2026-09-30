import "server-only";

import {
  createPublicClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

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

// 選手ページに表示する公開情報(自己紹介・承認済みチャンネル)
export async function getPublicProfile(playerId: string) {
  if (!isSupabaseConfigured) {
    return { bio: "", youtubeUrls: [] as string[] };
  }

  const supabase = createPublicClient();

  const [profileResult, youtubeResult] = await Promise.all([
    supabase
      .from("player_profiles")
      .select("bio")
      .eq("player_id", playerId)
      .maybeSingle(),
    supabase
      .from("youtube_requests")
      .select("url")
      .eq("player_id", playerId)
      .eq("status", "approved")
      .order("reviewed_at", { ascending: true }),
  ]);

  return {
    bio: (profileResult.data?.bio as string | undefined) ?? "",
    youtubeUrls: (youtubeResult.data ?? []).map((row) => row.url as string),
  };
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
