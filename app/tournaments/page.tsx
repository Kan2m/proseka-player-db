import Link from "next/link";
import { players, tournamentOrder } from "../data/players";
import { getTournamentById } from "../data/tournaments";

export default function TournamentsPage() {
  const tournamentList = tournamentOrder
    .map((key) => getTournamentById(key))
    .filter((tournament) => tournament !== undefined);

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
        <p className="text-xs font-black tracking-[0.2em] text-pink-500">
          TOURNAMENTS
        </p>

        <h1 className="mt-1 text-3xl font-black text-zinc-900">大会一覧</h1>

        <p className="mt-2 text-sm text-zinc-500">
          大会名をクリックすると大会の詳細と出場選手を確認できます。
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {tournamentList.map((tournament, index) => {
            const participantCount = players.filter(
              (player) => player.tournaments[tournament.id]
            ).length;

            const winners =
              tournament.results?.find((result) => result.rank === "優勝")
                ?.players ?? [];

            return (
              <Link
                key={tournament.id}
                href={`/tournaments/${tournament.id}`}
                className="group flex items-start gap-4 rounded-[1.75rem] border border-white bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-pink-400 text-sm font-black text-white">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <h2 className="font-black text-zinc-900 transition [overflow-wrap:anywhere] group-hover:text-violet-600">
                    {tournament.name}
                  </h2>

                  <p className="mt-1 text-xs font-medium text-zinc-400">
                    {tournament.date} ・ {tournament.category} ・ 登録選手{" "}
                    {participantCount}人
                  </p>

                  {winners.length > 0 && (
                    <p className="mt-3 text-sm font-bold text-zinc-600">
                      🏆 優勝
                      <span className="ml-2 font-black text-yellow-700">
                        {winners.join(" / ")}
                      </span>
                    </p>
                  )}
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-lg font-bold text-violet-500 transition group-hover:bg-violet-100">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
