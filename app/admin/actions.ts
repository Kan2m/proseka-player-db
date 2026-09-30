"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentAccount } from "../lib/auth";

async function reviewYoutubeRequest(
  formData: FormData,
  status: "approved" | "rejected"
) {
  const account = await getCurrentAccount();

  if (!account?.isAdmin) {
    throw new Error("unauthorized");
  }

  const id = String(formData.get("id") ?? "");

  const { data } = await createAdminClient()
    .from("youtube_requests")
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq("id", id)
    .select("player_id")
    .maybeSingle();

  if (data) {
    revalidatePath(`/players/${data.player_id}`);
  }

  revalidatePath("/admin");
}

export async function approveYoutubeRequest(formData: FormData) {
  await reviewYoutubeRequest(formData, "approved");
}

export async function rejectYoutubeRequest(formData: FormData) {
  await reviewYoutubeRequest(formData, "rejected");
}
