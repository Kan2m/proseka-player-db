import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { getPlayerById } from "../data/players";
import { getCurrentAccount } from "../lib/auth";
import { statusLabels, type YoutubeRequest } from "../lib/profiles";
import { approveYoutubeRequest, rejectYoutubeRequest } from "./actions";

export default async function AdminPage() {
  const account = await getCurrentAccount();

  if (!account) {
    redirect("/login");
  }

  // 運営以外には存在自体を見せない
  if (!account.isAdmin) {
    notFound();
  }

  const supabase = createAdminClient();
  const [{ data: pending }, { data: reviewed }] = await Promise.all([
    supabase
      .from("youtube_requests")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true }),
    supabase
      .from("youtube_requests")
      .select("*")
      .neq("status", "pending")
      .order("reviewed_at", { ascending: false })
      .limit(30),
  ]);

  const pendingRequests = (pending ?? []) as YoutubeRequest[];
  const reviewedRequests = (reviewed ?? []) as YoutubeRequest[];

  const renderPlayer = (playerId: string) => {
    const player = getPlayerById(playerId);

    return player ? (
      <Link
        href={`/players/${player.id}`}
        className="font-black text-zinc-900 hover:text-violet-600"
      >
        {player.name}
        <span className="ml-2 text-xs font-medium text-zinc-400">
          {player.twitter}
        </span>
      </Link>
    ) : (
      <span className="font-black text-zinc-400">{playerId}</span>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 text-zinc-800">
      <header className="border-b border-white/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-600 transition hover:bg-violet-100"
          >
            ← PLAYER DATABASE
          </Link>

          <Link
            href="/mypage"
            className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-bold text-zinc-500 transition hover:bg-zinc-200"
          >
            マイページ
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm font-bold tracking-[0.2em] text-pink-500">
          ADMIN
        </p>

        <h1 className="mt-2 text-3xl font-black">YouTubeチャンネル承認</h1>

        <p className="mt-2 text-sm text-zinc-500">
          リンク先が選手本人のチャンネルであることを確認してから承認してください。
        </p>

        <section className="mt-8">
          <h2 className="text-xl font-black">
            承認待ち
            <span className="ml-2 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
              {pendingRequests.length}
            </span>
          </h2>

          {pendingRequests.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-white bg-white p-6 text-center text-sm font-bold text-zinc-400 shadow-sm">
              承認待ちの申請はありません。
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {pendingRequests.map((request) => (
                <li
                  key={request.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white bg-white px-5 py-4 shadow-sm"
                >
                  <div className="min-w-0">
                    {renderPlayer(request.player_id)}

                    <a
                      href={request.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block truncate text-sm font-medium text-pink-600 underline-offset-2 hover:underline"
                    >
                      {request.url}
                    </a>

                    <p className="mt-1 text-xs text-zinc-400">
                      申請日時:{" "}
                      {new Date(request.created_at).toLocaleString("ja-JP", {
                        timeZone: "Asia/Tokyo",
                      })}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <form action={approveYoutubeRequest}>
                      <input type="hidden" name="id" value={request.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-black text-white transition hover:bg-emerald-600"
                      >
                        承認
                      </button>
                    </form>

                    <form action={rejectYoutubeRequest}>
                      <input type="hidden" name="id" value={request.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-zinc-200 px-5 py-2 text-sm font-black text-zinc-600 transition hover:bg-zinc-300"
                      >
                        却下
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {reviewedRequests.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-black">処理済み(最新30件)</h2>

            <ul className="mt-4 space-y-2">
              {reviewedRequests.map((request) => {
                const status = statusLabels[request.status];

                return (
                  <li
                    key={request.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/70 px-5 py-3"
                  >
                    <div className="min-w-0">
                      {renderPlayer(request.player_id)}

                      <a
                        href={request.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-xs text-zinc-500 hover:underline"
                      >
                        {request.url}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${status.className}`}
                      >
                        {status.label}
                      </span>

                      {/* 判断を変更したい場合用 */}
                      <form
                        action={
                          request.status === "approved"
                            ? rejectYoutubeRequest
                            : approveYoutubeRequest
                        }
                      >
                        <input type="hidden" name="id" value={request.id} />
                        <button
                          type="submit"
                          className="text-xs font-bold text-zinc-400 transition hover:text-zinc-700"
                        >
                          {request.status === "approved"
                            ? "却下に変更"
                            : "承認に変更"}
                        </button>
                      </form>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
