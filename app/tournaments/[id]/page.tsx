import Link from "next/link";
import {
  getTournamentById,
  tournaments,
} from "../../data/tournaments";
import { findPlayerByName } from "../../data/players";
import ArchivePlayer from "./ArchivePlayer";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return tournaments.map((tournament) => ({
    id: tournament.id,
  }));
}

export default async function TournamentPage({ params }: PageProps) {
  const { id } = await params;
  const tournament = getTournamentById(id);

  if (!tournament) {
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
              大会が見つかりません
            </h1>

            <p className="mt-3 text-zinc-500">
              指定された大会IDは存在しません。
            </p>
          </div>
        </div>
      </main>
    );
  }

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
        {/* 大会タイトル */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-8 shadow-xl shadow-violet-100/60 md:p-10">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-pink-200/40 blur-2xl" />
          <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-violet-200/40 blur-2xl" />

          <div className="relative">
            <p className="text-sm font-bold tracking-[0.2em] text-violet-500">
              TOURNAMENT
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
              {tournament.name}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-black text-violet-600">
                {tournament.date}
              </span>

              <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-black text-pink-600">
                {tournament.category}
              </span>
            </div>
          </div>
        </section>

        {/* 大会概要 */}
        <section className="mt-8 rounded-[2rem] border border-white bg-white p-7 shadow-sm md:p-9">
          <p className="text-sm font-bold tracking-[0.15em] text-pink-500">
            ABOUT
          </p>

          <h2 className="mt-1 text-3xl font-black">
            大会概要
          </h2>

          <p className="mt-5 leading-8 text-zinc-600">
            {tournament.description}
          </p>
        </section>

        {/* 配信アーカイブ */}
        {tournament.archives && tournament.archives.length > 0 && (
          <section className="mt-8">
            <div className="mb-5">
              <p className="text-sm font-bold tracking-[0.15em] text-red-500">
                ARCHIVE
              </p>

              <h2 className="mt-1 text-3xl font-black">配信アーカイブ</h2>
            </div>

            <div
              className={`grid gap-4 ${
                tournament.archives.length > 1
                  ? "md:grid-cols-2"
                  : "max-w-3xl"
              }`}
            >
              {tournament.archives.map((archive) => (
                <ArchivePlayer
                  key={archive.videoId}
                  archive={archive}
                  tournamentName={tournament.name}
                />
              ))}
            </div>
          </section>
        )}

        {/* 個人戦・通常結果 */}
        {tournament.results && tournament.results.length > 0 && (
          <section className="mt-8">
            <div className="mb-5">
              <p className="text-sm font-bold tracking-[0.15em] text-violet-500">
                RESULTS
              </p>

              <h2 className="mt-1 text-3xl font-black">
                大会結果
              </h2>
            </div>

            <div className="space-y-4">
              {tournament.results.map((result, index) => (
                <div
                  key={`${result.rank}-${index}`}
                  className="rounded-[2rem] border border-white bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-black text-violet-600">
                      {result.rank}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {result.players.map((playerName) => {
                      const player = findPlayerByName(
                        playerName,
                        tournament.id
                      );

                      if (player) {
                        return (
                          <Link
                            key={playerName}
                            href={`/players/${player.id}`}
                            className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-700 transition hover:bg-violet-100 hover:text-violet-700"
                          >
                            {playerName}
                          </Link>
                        );
                      }

                      return (
                        <span
                          key={playerName}
                          className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-500"
                        >
                          {playerName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ダブルス結果 */}
        {tournament.doublesResults &&
          tournament.doublesResults.length > 0 && (
            <section className="mt-8">
              <div className="mb-5">
                <p className="text-sm font-bold tracking-[0.15em] text-pink-500">
                  DOUBLES
                </p>

                <h2 className="mt-1 text-3xl font-black">
                  ダブルス結果
                </h2>
              </div>

              <div className="space-y-4">
                {tournament.doublesResults.map((result, index) => (
                  <div
                    key={`${result.rank}-${index}`}
                    className="rounded-[2rem] border border-white bg-white p-6 shadow-sm"
                  >
                    <div className="mb-4">
                      <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-black text-pink-600">
                        {result.rank}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {result.team.map((playerName) => {
                        const player = findPlayerByName(
                          playerName,
                          tournament.id
                        );

                        if (player) {
                          return (
                            <Link
                              key={playerName}
                              href={`/players/${player.id}`}
                              className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-700 transition hover:bg-violet-100 hover:text-violet-700"
                            >
                              {playerName}
                            </Link>
                          );
                        }

                        return (
                          <span
                            key={playerName}
                            className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-500"
                          >
                            {playerName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* 戻る */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-violet-500 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-600"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            PLAYER DATABASE に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}