"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  players,
  tournamentNames,
  tournamentOrder,
} from "./data/players";
import { tournaments } from "./data/tournaments";
import AchievementTags from "./AchievementTags";
import PlayerAvatar from "./components/PlayerAvatar";
import {
  getPlayerTournamentResult,
  getResultStyle,
} from "./lib/results";

const tournamentShortNames: Record<string, string> = {
  RAGE: "RAGE",
  cs21A: "CS2021",
  cs22S: "CS2022春",
  cs22A: "CS2022秋",
  cs23S: "CS2023",
  wcs24: "WCS2024",
  cs24A: "CS2024秋",
  cs25: "CS2025",
  cs26: "CS2026",
  white2025: "ほわいと杯25",
  white2026: "ほわいと杯26",
};

const sortOptions = [
  { value: "appearances", label: "出場回数" },
  { value: "result", label: "最高成績" },
  { value: "name", label: "名前" },
] as const;

type SortKey = (typeof sortOptions)[number]["value"];

// 最高成績の並び順(「準決勝進出」なども同じ扱い)
const resultRank = (result: string) => {
  const order = [
    "優勝",
    "準優勝",
    "3位",
    "4位",
    "5位",
    "準決勝",
    "準々決勝",
  ];
  const index = order.findIndex(
    (rank) => result === rank || result === `${rank}進出`
  );

  return index === -1 ? 99 : index;
};

// 最高成績ごとの配色(アイコンの枠・最高成績の文字色)
const getTier = (result: string) => {
  if (result.startsWith("準優勝")) {
    return {
      ring: "ring-zinc-300",
      text: "text-zinc-500",
    };
  }

  if (result.startsWith("優勝")) {
    return {
      ring: "ring-amber-400",
      text: "text-amber-600",
    };
  }

  if (/^[345]位/.test(result)) {
    return {
      ring: "ring-orange-400",
      text: "text-orange-600",
    };
  }

  if (result.startsWith("準決勝")) {
    return {
      ring: "ring-sky-400",
      text: "text-sky-600",
    };
  }

  if (result.startsWith("準々決勝")) {
    return {
      ring: "ring-violet-400",
      text: "text-violet-600",
    };
  }

  return {
    ring: "ring-zinc-200",
    text: "text-zinc-500",
  };
};

const championCount = players.filter((player) =>
  player.result.startsWith("優勝")
).length;

type PlayerDirectoryProps = {
  // アイコンを設定している選手の { 選手ID: 画像URL }
  avatarUrls: Record<string, string>;
};

export default function PlayerDirectory({ avatarUrls }: PlayerDirectoryProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("appearances");

  const filteredPlayers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    const filtered = keyword
      ? players.filter(
          (player) =>
            player.name.toLowerCase().includes(keyword) ||
            player.twitter.toLowerCase().includes(keyword)
        )
      : players;

    return [...filtered].sort((a, b) => {
      if (sort === "appearances") {
        return (
          Object.keys(b.tournaments).length -
          Object.keys(a.tournaments).length
        );
      }

      if (sort === "result") {
        return resultRank(a.result) - resultRank(b.result);
      }

      return a.name.localeCompare(b.name, "ja");
    });
  }, [search, sort]);

  return (
    // 非表示のツールチップが画面右端からはみ出して横スクロールが出るのを防ぐ
    // (clip は sticky を壊さない)
    <main className="min-h-screen overflow-x-clip text-zinc-800">
      <header className="sticky top-0 z-30 border-b border-zinc-900/5 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 shadow-[0_0_12px] shadow-pink-400/60" />
            <span className="font-display text-sm font-bold tracking-tight text-zinc-900">
              PJSK
              <span className="ml-1.5 font-medium text-zinc-400">
                Player Database
              </span>
            </span>
          </Link>

          <nav className="flex items-center gap-1 text-xs font-semibold">
            <Link
              href="/tournaments"
              className="hidden rounded-full px-3.5 py-2 text-zinc-500 transition hover:bg-zinc-900/5 hover:text-zinc-900 sm:block"
            >
              大会
            </Link>
            <Link
              href="/info"
              className="rounded-full px-3.5 py-2 text-zinc-500 transition hover:bg-zinc-900/5 hover:text-zinc-900"
            >
              サイト情報
            </Link>
            <Link
              href="/mypage"
              className="ml-1 rounded-full bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-700"
            >
              マイページ
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        {/* ヒーロー */}
        <section className="relative overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-10 text-white md:px-12 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-violet-600/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 right-1/3 h-80 w-80 rounded-full bg-pink-500/25 blur-3xl" />

          <div className="relative">
            <p className="font-display text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">
              Project SEKAI · Competitive
            </p>

            <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Player
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-pink-300 to-sky-300 bg-clip-text text-transparent">
                Database
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">
              プロジェクトセカイ Championship / RAGE / WCS /
              ほわいと杯の出場選手と成績をまとめた競技選手データベース。
            </p>

            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <dl className="flex divide-x divide-white/10">
                {[
                  { label: "選手", value: players.length },
                  { label: "大会", value: tournaments.length },
                  { label: "優勝経験者", value: championCount },
                ].map((stat) => (
                  <div key={stat.label} className="px-5 first:pl-0">
                    <dt className="text-xs font-medium text-zinc-500">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 font-display text-3xl font-bold tabular-nums md:text-4xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex gap-3">
                <a
                  href="#players"
                  className="rounded-full bg-white px-5 py-3 text-sm font-bold text-zinc-900 transition hover:bg-zinc-200"
                >
                  選手を探す ↓
                </a>
                <Link
                  href="/tournaments"
                  className="rounded-full px-5 py-3 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/10"
                >
                  大会から見る →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 選手一覧 */}
        <section id="players" className="mt-14 scroll-mt-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-xs font-medium uppercase tracking-[0.3em] text-pink-500">
                Players
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-900 md:text-3xl">
                選手一覧
              </h2>
            </div>

            <p className="font-display text-sm text-zinc-400 tabular-nums">
              <span className="font-bold text-zinc-900">
                {filteredPlayers.length}
              </span>{" "}
              / {players.length}
            </p>
          </div>

          {/* 検索・並び替え(スクロールしても上部に残る) */}
          <div className="sticky top-16 z-20 -mx-4 mt-5 bg-[#f7f7fb]/85 px-4 py-3 backdrop-blur-xl md:-mx-6 md:px-6">
            <div className="flex flex-col gap-2.5 md:flex-row md:items-center">
              <label className="relative flex-1">
                <span className="sr-only">選手を検索</span>
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                >
                  <circle cx="9" cy="9" r="6" />
                  <path d="m14 14 4 4" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="選手名・Xアカウントで検索"
                  className="w-full rounded-full bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 shadow-sm outline-none ring-1 ring-zinc-900/5 transition placeholder:text-zinc-400 focus:ring-2 focus:ring-violet-400"
                />
              </label>

              <div
                role="radiogroup"
                aria-label="並び替え"
                className="flex rounded-full bg-white p-1 shadow-sm ring-1 ring-zinc-900/5"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={sort === option.value}
                    onClick={() => setSort(option.value)}
                    className={`flex-1 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition md:flex-none ${
                      sort === option.value
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlayers.map((player) => {
              const appearances = Object.keys(player.tournaments).length;
              const tier = getTier(player.result);

              return (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  className="group relative flex flex-col rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(24,24,27,0.04)] ring-1 ring-zinc-900/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-200/40 hover:ring-violet-300/70"
                >
                  <div className="flex items-center gap-3.5">
                    <PlayerAvatar
                      src={avatarUrls[player.id]}
                      name={player.name}
                      className={`h-12 w-12 rounded-2xl ring-2 ring-offset-2 ${tier.ring}`}
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-black leading-tight text-zinc-900 transition group-hover:text-violet-600">
                        {player.name}
                      </h3>
                      <p className="mt-0.5 truncate font-display text-xs text-zinc-400">
                        {player.twitter || "—"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-display text-3xl font-bold leading-none tabular-nums text-zinc-900">
                        {String(appearances).padStart(2, "0")}
                      </p>
                      <p className="mt-1 text-[10px] font-bold tracking-wider text-zinc-400">
                        出場
                      </p>
                    </div>
                  </div>

                  {/* 最高成績の右に実績タグを1行で並べる(収まらない分は「+N」) */}
                  <div className="mt-4 flex items-center gap-3">
                    <p className="flex shrink-0 items-baseline gap-2">
                      <span className="text-xs font-bold text-zinc-400">
                        最高成績
                      </span>
                      <span className={`text-base font-black ${tier.text}`}>
                        {player.result}
                      </span>
                    </p>

                    <AchievementTags achievements={player.achievements} />
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="flex flex-wrap gap-1.5 border-t border-dashed border-zinc-200 pt-4">
                      {tournamentOrder
                        .filter((key) => player.tournaments[key])
                        .map((key) => {
                          const {
                            tournament,
                            individualResult,
                            doublesResult,
                            rank,
                          } = getPlayerTournamentResult(player, key);

                          if (!tournament) {
                            return null;
                          }

                          const resultStyle = getResultStyle(rank);

                          return (
                            <div
                              key={key}
                              className="group/tournament relative"
                            >
                              <span className="inline-flex cursor-help items-center gap-1.5 rounded-lg bg-zinc-50 px-2 py-1 text-[11px] font-bold text-zinc-600 ring-1 ring-inset ring-zinc-200/80 transition hover:bg-white hover:text-zinc-900 hover:ring-zinc-300">
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${resultStyle.dot}`}
                                />
                                {tournamentShortNames[key] ??
                                  tournamentNames[key] ??
                                  key}
                              </span>

                              <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-72 max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-1 rounded-2xl bg-zinc-950 p-4 text-left text-white opacity-0 shadow-2xl ring-1 ring-white/10 transition-all duration-150 group-hover/tournament:translate-y-0 group-hover/tournament:opacity-100">
                                <p className="text-sm font-bold">
                                  {tournament.name}
                                </p>
                                <p className="mt-1 font-display text-[11px] text-zinc-400">
                                  {tournament.date} · {tournament.category}
                                </p>

                                <div className="mt-3 space-y-1.5 text-xs">
                                  {individualResult && (
                                    <p className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                                      <span className="text-zinc-400">
                                        個人
                                      </span>
                                      <span className="font-bold">
                                        {resultStyle.icon}{" "}
                                        {individualResult.rank}
                                      </span>
                                    </p>
                                  )}

                                  {doublesResult && (
                                    <div className="rounded-lg bg-white/5 px-3 py-2">
                                      <p className="flex items-center justify-between">
                                        <span className="text-zinc-400">
                                          ダブルス
                                        </span>
                                        <span className="font-bold">
                                          {doublesResult.rank}
                                        </span>
                                      </p>
                                      <p className="mt-1 text-zinc-400">
                                        {doublesResult.team.join(" / ")}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {tournament.description && (
                                  <p className="mt-3 border-t border-white/10 pt-3 text-[11px] leading-5 text-zinc-400">
                                    {tournament.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                </Link>
              );
            })}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="mt-3 rounded-3xl bg-white p-12 text-center ring-1 ring-zinc-900/5">
              <p className="font-bold text-zinc-800">
                該当する選手が見つかりません
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                選手名やXアカウントを確認してください。
              </p>
            </div>
          )}
        </section>
      </div>

      <footer className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between border-t border-zinc-900/5 pt-6 font-display text-xs text-zinc-400">
          <span>Project SEKAI Player Database</span>
          <Link href="/info" className="transition hover:text-zinc-900">
            Site info →
          </Link>
        </div>
      </footer>
    </main>
  );
}
