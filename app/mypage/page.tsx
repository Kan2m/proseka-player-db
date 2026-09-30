import Link from "next/link";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import PlayerAvatar from "../components/PlayerAvatar";
import { getCurrentAccount } from "../lib/auth";
import { avatarPublicUrl } from "../lib/avatar";
import { statusLabels, type YoutubeRequest } from "../lib/profiles";
import { deleteYoutubeChannel, logout } from "./actions";
import AvatarForm from "./AvatarForm";
import BioForm from "./BioForm";
import YoutubeForm from "./YoutubeForm";

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 text-zinc-800">
      <header className="border-b border-white/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-600 transition hover:bg-violet-100"
          >
            ← PLAYER DATABASE
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-bold text-zinc-500 transition hover:bg-zinc-200"
            >
              ログアウト
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">{children}</div>
    </main>
  );
}

export default async function MyPage() {
  const account = await getCurrentAccount();

  if (!account) {
    redirect("/login");
  }

  const { player, xHandle, isAdmin } = account;

  // 運営に選手登録されていないXアカウントはマイページに入れない
  if (!player) {
    return (
      <PageShell>
        <section className="rounded-[2rem] border border-white bg-white p-8 shadow-xl shadow-violet-100/60">
          <p className="text-sm font-bold tracking-[0.2em] text-violet-500">
            MY PAGE
          </p>

          <h1 className="mt-3 text-2xl font-black">
            選手として登録されていません
          </h1>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            ログイン中のXアカウント
            <span className="mx-1 font-bold text-zinc-700">
              {xHandle ? `@${xHandle}` : "(取得できませんでした)"}
            </span>
            はデータベースに登録されていません。
            マイページは運営が登録した選手本人のみ利用できます。
          </p>

          {isAdmin && (
            <Link
              href="/admin"
              className="mt-6 inline-flex rounded-full bg-pink-50 px-5 py-2.5 text-sm font-bold text-pink-600 transition hover:bg-pink-100"
            >
              管理画面へ →
            </Link>
          )}
        </section>
      </PageShell>
    );
  }

  const supabase = createAdminClient();
  const [{ data: profile }, { data: requests }] = await Promise.all([
    supabase
      .from("player_profiles")
      .select("bio, avatar_path")
      .eq("player_id", player.id)
      .maybeSingle(),
    supabase
      .from("youtube_requests")
      .select("*")
      .eq("player_id", player.id)
      .order("created_at", { ascending: false }),
  ]);

  const youtubeRequests = (requests ?? []) as YoutubeRequest[];
  const avatarUrl = avatarPublicUrl(
    profile?.avatar_path as string | null | undefined
  );

  return (
    <PageShell>
      <section className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-8 shadow-xl shadow-violet-100/60">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-pink-200/40 blur-2xl" />

        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-5">
            <PlayerAvatar
              src={avatarUrl}
              name={player.name}
              className="h-20 w-20 rounded-3xl"
            />

            <div>
              <p className="text-sm font-bold tracking-[0.2em] text-violet-500">
                MY PAGE
              </p>

              <h1 className="mt-2 text-4xl font-black">{player.name}</h1>

              <p className="mt-1 font-medium text-zinc-500">{player.twitter}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/players/${player.id}`}
              className="rounded-full bg-violet-50 px-5 py-2.5 text-sm font-bold text-violet-600 transition hover:bg-violet-100"
            >
              選手ページを見る →
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="rounded-full bg-pink-50 px-5 py-2.5 text-sm font-bold text-pink-600 transition hover:bg-pink-100"
              >
                管理画面 →
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <p className="text-sm font-bold tracking-[0.15em] text-violet-500">
          ICON
        </p>

        <h2 className="mt-1 text-2xl font-black">アイコン</h2>

        <div className="mt-5 rounded-[1.5rem] border border-white bg-white p-6 shadow-sm">
          <AvatarForm name={player.name} avatarUrl={avatarUrl} />
        </div>
      </section>

      <section className="mt-10">
        <p className="text-sm font-bold tracking-[0.15em] text-violet-500">
          PROFILE
        </p>

        <h2 className="mt-1 text-2xl font-black">自己紹介</h2>

        <div className="mt-5 rounded-[1.5rem] border border-white bg-white p-6 shadow-sm">
          <BioForm initialBio={(profile?.bio as string | undefined) ?? ""} />
        </div>
      </section>

      <section className="mt-10">
        <p className="text-sm font-bold tracking-[0.15em] text-pink-500">
          YOUTUBE
        </p>

        <h2 className="mt-1 text-2xl font-black">YouTubeチャンネル</h2>

        <p className="mt-2 text-sm text-zinc-500">
          ご自身のチャンネルのみ登録できます。運営が確認・承認した後に選手ページへ表示されます。
        </p>

        <div className="mt-5 rounded-[1.5rem] border border-white bg-white p-6 shadow-sm">
          <YoutubeForm />

          {youtubeRequests.length > 0 && (
            <ul className="mt-6 space-y-3 border-t border-zinc-100 pt-6">
              {youtubeRequests.map((request) => {
                const status = statusLabels[request.status];

                return (
                  <li
                    key={request.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-zinc-50 px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${status.className}`}
                      >
                        {status.label}
                      </span>

                      <a
                        href={request.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-sm font-medium text-zinc-700 underline-offset-2 hover:underline"
                      >
                        {request.url}
                      </a>
                    </div>

                    <form action={deleteYoutubeChannel}>
                      <input type="hidden" name="id" value={request.id} />
                      <button
                        type="submit"
                        className="text-xs font-bold text-zinc-400 transition hover:text-red-500"
                      >
                        {request.status === "pending" ? "取り下げ" : "削除"}
                      </button>
                    </form>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </PageShell>
  );
}
