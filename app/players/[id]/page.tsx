import Link from "next/link";
import {
  getPlayerById,
  players,
  tournamentNames,
  tournamentOrder,
} from "../../data/players";
import { getPublicProfile } from "../../lib/profiles";
import {
  getPlayerTournamentResult,
  getResultStyle,
} from "../../lib/results";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

// マイページでの更新時は revalidatePath で即時反映。念のため定期的にも再生成する
export const revalidate = 600;

export function generateStaticParams() {
  return players.map((player) => ({
    id: player.id,
  }));
}

export default async function PlayerPage({ params }: PageProps) {
  const { id } = await params;
  const player = getPlayerById(id);

  if (!player) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 px-6 py-10 text-zinc-800">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-sm font-semibold text-violet-500 transition hover:text-violet-700"
          >
            ← 選手一覧に戻る
          </Link>

          <div className="mt-10 rounded-[2rem] border border-violet-100 bg-white p-8 shadow-lg shadow-violet-100/50">
            <h1 className="text-3xl font-bold">
              選手が見つかりません
            </h1>

            <p className="mt-3 text-zinc-500">
              指定された選手IDは存在しません。
            </p>
          </div>
        </div>
      </main>
    );
  }

  const profile = await getPublicProfile(player.id);

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 text-zinc-800">
      <header className="border-b border-white/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-600 transition hover:bg-violet-100"
          >
            ← PLAYER DATABASE
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* プロフィール */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-8 shadow-xl shadow-violet-100/60 md:p-10">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-pink-200/40 blur-2xl" />
          <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-violet-200/40 blur-2xl" />

          <div className="relative">
            <p className="text-sm font-bold tracking-[0.2em] text-violet-500">
              PLAYER PROFILE
            </p>

            <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">
              {player.name}
            </h1>

            <p className="mt-3 font-medium text-zinc-500">
              {player.twitter}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 md:max-w-xl">
              <div className="rounded-2xl bg-violet-50 p-5">
                <p className="text-sm font-bold text-violet-500">
                  出場
                </p>
                <p className="mt-1 text-3xl font-black text-violet-700">
                  {Object.keys(player.tournaments).length}
                  <span className="ml-1 text-base">回</span>
                </p>
              </div>

              <div className="rounded-2xl bg-pink-50 p-5">
                <p className="text-sm font-bold text-pink-500">
                  最高成績
                </p>
                <p className="mt-1 text-2xl font-black text-pink-700">
                  {player.result}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 自己紹介・YouTube(選手本人がマイページで設定) */}
        {(profile.bio || profile.youtubeUrls.length > 0) && (
          <section className="mt-10">
            <p className="text-sm font-bold tracking-[0.15em] text-violet-500">
              ABOUT
            </p>

            <h2 className="mt-1 text-3xl font-black">自己紹介</h2>

            <div className="mt-5 rounded-[1.5rem] border border-white bg-white p-6 shadow-sm">
              {profile.bio && (
                <p className="whitespace-pre-wrap break-words leading-7 text-zinc-600">
                  {profile.bio}
                </p>
              )}

              {profile.youtubeUrls.length > 0 && (
                <div
                  className={`flex flex-wrap gap-2 ${
                    profile.bio ? "mt-5 border-t border-zinc-100 pt-5" : ""
                  }`}
                >
                  {profile.youtubeUrls.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      ▶ YouTube
                      <span className="font-medium text-red-400">
                        {url.replace("https://www.youtube.com/", "")}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

       {/* 大会出場歴 */}
<section className="mt-10">
  <div className="mb-5 flex items-end justify-between">
    <div>
      <p className="text-sm font-bold tracking-[0.15em] text-violet-500">
        TOURNAMENTS
      </p>

      <h2 className="mt-1 text-3xl font-black">
        大会出場歴
      </h2>
    </div>

    <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-500 shadow-sm">
      {Object.keys(player.tournaments).length}大会
    </span>
  </div>

  <div className="space-y-3">
    {tournamentOrder
      .filter((key) => player.tournaments[key])
      .map((key, index) => {
        const { individualResult, doublesResult, rank } =
          getPlayerTournamentResult(player, key);
        const resultStyle = getResultStyle(rank);

        return (
          <Link
            key={key}
            href={`/tournaments/${key}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-pink-400 text-sm font-black text-white">
                {index + 1}
              </span>

              <p className="font-bold text-zinc-800">
                {tournamentNames[key]}
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {!individualResult && !doublesResult && (
                <span className="rounded-full bg-violet-100 px-4 py-1.5 text-xs font-black text-violet-600">
                  出場
                </span>
              )}

              {individualResult && (
                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-black ${resultStyle.className}`}
                >
                  {resultStyle.icon} {individualResult.rank}
                </span>
              )}

              {doublesResult && (
                <span className="rounded-full bg-pink-50 px-4 py-1.5 text-xs font-black text-pink-700">
                  🤝 ダブルス {doublesResult.rank}
                </span>
              )}
            </div>
          </Link>
        );
      })}
  </div>
</section>

        {/* 特記事項 */}
        {player.notes && (
          <section className="mt-10">
            <p className="text-sm font-bold tracking-[0.15em] text-pink-500">
              NOTES
            </p>

            <h2 className="mt-1 text-3xl font-black">
              特記事項
            </h2>

            <div className="mt-5 rounded-[1.5rem] border border-white bg-white p-6 leading-7 text-zinc-600 shadow-sm">
              {player.notes}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

