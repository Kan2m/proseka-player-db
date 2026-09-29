"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  players,
  tournamentNames,
  tournamentOrder,
} from "./data/players";
import { getTournamentById } from "./data/tournaments";

export default function Home() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("appearances");

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
        const rank = {
          優勝: 1,
          準優勝: 2,
          "3位": 3,
          "4位": 4,
          "5位": 5,
          準決勝: 6,
          準々決勝: 7,
          出場: 8,
        };

        return (
          (rank[a.result as keyof typeof rank] ?? 99) -
          (rank[b.result as keyof typeof rank] ?? 99)
        );
      }

      if (sort === "name") {
        return a.name.localeCompare(b.name, "ja");
      }

      return 0;
    });
  }, [search, sort]);

  // 大会IDを短い表示名にする
  const tournamentShortNames: Record<string, string> = {
    RAGE: "RAGE",
    cs21A: "CS2021",
    cs22S: "CS2022S",
    cs22A: "CS2022A",
    cs23S: "CS2023",
    wcs24: "WCS2024",
    cs24A: "CS2024A",
    cs25: "CS2025",
    cs26: "CS2026",
    white2025: "ほわいと杯25",
    white2026: "ほわいと杯26",
  };

  // 成績に応じた色・アイコン
  const getResultStyle = (rank: string) => {
    if (rank.includes("優勝")) {
      return {
        icon: "🏆",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    if (rank.includes("準優勝")) {
      return {
        icon: "🥈",
        className: "bg-zinc-200 text-zinc-700",
      };
    }

    if (rank === "3位" || rank.includes("3位")) {
      return {
        icon: "🥉",
        className: "bg-orange-100 text-orange-700",
      };
    }

    if (rank === "4位" || rank.includes("4位")) {
      return {
        icon: "4️⃣",
        className: "bg-red-100 text-red-600",
      };
    }

    if (rank === "5位" || rank.includes("5位")) {
      return {
        icon: "5️⃣",
        className: "bg-rose-100 text-rose-600",
      };
    }

    if (rank.includes("準決勝")) {
      return {
        icon: "🔵",
        className: "bg-blue-100 text-blue-700",
      };
    }

    if (rank.includes("準々決勝")) {
      return {
        icon: "🟣",
        className: "bg-violet-100 text-violet-700",
      };
    }

    return {
      icon: "•",
      className: "bg-zinc-100 text-zinc-500",
    };
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 text-zinc-800">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-white/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="group">
            <p className="text-xs font-black tracking-[0.25em] text-violet-500 transition group-hover:text-pink-500">
              PROJECT SEKAI
            </p>

            <p className="text-sm font-bold text-zinc-700">
              PLAYER DATABASE
            </p>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/info"
              className="rounded-full bg-pink-50 px-4 py-2 text-xs font-bold text-pink-500 transition hover:bg-pink-100 hover:text-pink-600"
            >
              SITE INFO
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-6 md:py-12">
        {/* メイン紹介カード */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-7 shadow-xl shadow-violet-100/60 md:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-200/40 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute right-1/4 top-1/2 h-40 w-40 rounded-full bg-sky-200/30 blur-3xl" />

          <div className="relative">
            <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-black tracking-[0.15em] text-violet-600">
              DATABASE
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
              プロジェクトセカイ
              <br />
              <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
                競技選手データベース
              </span>
            </h1>

            <p className="mt-5 max-w-2xl leading-7 text-zinc-500">
              プロジェクトセカイ Championship / RAGE / WCS /
              ほわいと杯の出場選手をまとめています。
            </p>

            {/* 統計 */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-violet-50 p-5">
                <p className="text-sm font-bold text-violet-500">
                  登録選手
                </p>

                <p className="mt-2 text-3xl font-black text-violet-700">
                  {players.length}
                  <span className="ml-1 text-base">人</span>
                </p>
              </div>

              <div className="rounded-3xl bg-pink-50 p-5">
                <p className="text-sm font-bold text-pink-500">
                  大会数
                </p>

                <p className="mt-2 text-3xl font-black text-pink-700">
                  11
                  <span className="ml-1 text-base">大会</span>
                </p>
              </div>

              <div className="rounded-3xl bg-sky-50 p-5">
                <p className="text-sm font-bold text-sky-500">
                  登録済み
                </p>

                <p className="mt-2 text-3xl font-black text-sky-700">
                  {players.length}
                  <span className="ml-1 text-base">人</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 選手一覧 */}
        <section className="mt-12">
          <div className="mb-6">
            <p className="text-xs font-black tracking-[0.2em] text-pink-500">
              PLAYERS
            </p>

            <h2 className="mt-1 text-3xl font-black text-zinc-900">
              選手一覧
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              選手名をクリックすると詳細ページへ移動します。
            </p>
          </div>

          {/* 検索・並び替え */}
          <div className="mb-6 rounded-3xl border border-white bg-white p-4 shadow-sm md:p-5">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-violet-400">
                  🔎
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="選手名・Xアカウントで検索"
                  className="w-full rounded-2xl border-2 border-violet-100 bg-violet-50/50 py-3 pl-11 pr-4 text-sm font-medium text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-violet-300 focus:bg-white"
                />
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-2xl border-2 border-pink-100 bg-pink-50 px-4 py-3 text-sm font-bold text-pink-700 outline-none transition focus:border-pink-300"
              >
                <option value="appearances">
                  出場回数が多い順
                </option>

                <option value="result">
                  最高成績順
                </option>

                <option value="name">
                  名前順
                </option>
              </select>
            </div>
          </div>

          {/* 選手カード */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlayers.map((player, index) => {
              const appearances = Object.keys(
                player.tournaments
              ).length;

              const accentClasses = [
                "from-violet-400 to-purple-400",
                "from-pink-400 to-rose-400",
                "from-sky-400 to-cyan-400",
                "from-yellow-400 to-orange-400",
              ];

              const accent =
                accentClasses[index % accentClasses.length];

              return (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  className="group relative overflow-visible rounded-[1.75rem] border border-white bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100"
                >
                  {/* 上部カラーライン */}
                  <div
                    className={`absolute left-0 top-0 h-1.5 w-full rounded-t-[1.75rem] bg-gradient-to-r ${accent}`}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-black text-zinc-900 transition group-hover:text-violet-600">
                        {player.name}
                      </h3>

                      <p className="mt-1 truncate text-sm font-medium text-zinc-400">
                        {player.twitter}
                      </p>
                    </div>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-lg font-bold text-violet-500 transition group-hover:bg-violet-100">
                      →
                    </span>
                  </div>

                  {/* 基本情報 */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black text-violet-600">
                      {appearances}大会出場
                    </span>

                    <span className="rounded-full bg-pink-50 px-3 py-1.5 text-xs font-black text-pink-600">
                      最高 {player.result}
                    </span>
                  </div>

                  {/* 実績バッジ */}
                  {player.achievements &&
                    player.achievements.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {player.achievements.map((achievement) => {
                          const isWin =
                            achievement === "個人優勝" ||
                            achievement === "ダブルス優勝" ||
                            achievement === "チーム優勝";

                          const isThird =
                            achievement === "個人3位";

                          const isRunnerUp =
                            achievement === "個人準優勝" ||
                            achievement === "ダブルス準優勝" ||
                            achievement === "チーム準優勝";

                          const isFourth =
                            achievement === "個人4位";

                          const isFifth =
                            achievement === "個人5位";

                          const isSemifinal =
                            achievement === "準決勝進出";

                          const isQuarterfinal =
                            achievement === "準々決勝進出";

                          return (
                            <span
                              key={achievement}
                              className={`rounded-full px-3 py-1.5 text-xs font-black ${
                                isWin
                                  ? "bg-yellow-100 text-yellow-700"
                                  : isThird
                                    ? "bg-orange-100 text-orange-700"
                                    : isRunnerUp
                                      ? "bg-zinc-200 text-zinc-700"
                                      : isFourth
                                        ? "bg-red-100 text-red-600"
                                        : isFifth
                                          ? "bg-rose-100 text-rose-600"
                                          : isSemifinal
                                            ? "bg-blue-100 text-blue-700"
                                            : isQuarterfinal
                                              ? "bg-violet-100 text-violet-700"
                                              : "bg-zinc-100 text-zinc-500"
                              }`}
                            >
                              {isWin
                                ? "🏆"
                                : isThird
                                  ? "🥉"
                                  : isRunnerUp
                                    ? "🥈"
                                    : isFourth
                                      ? "4️⃣"
                                      : isFifth
                                        ? "5️⃣"
                                        : isSemifinal
                                          ? "🔵"
                                          : isQuarterfinal
                                            ? "🟣"
                                            : "•"}{" "}
                              {achievement}
                            </span>
                          );
                        })}
                      </div>
                    )}

                  {/* 大会バッジ */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tournamentOrder
                      .filter(
                        (key) => player.tournaments[key]
                      )
                      .map((key) => {
                        const tournament =
                          getTournamentById(key);

                        if (!tournament) {
                          return null;
                        }

                        const playerNames = [
                          player.name,
                          ...(player.aliases ?? []),
                        ];

                        // 個人戦・通常結果
                        const individualResult =
                          tournament.results?.find(
                            (result) =>
                              result.players.some((name) =>
                                playerNames.includes(name)
                              )
                          );

                        // ダブルス結果
                        const doublesResult =
                          tournament.doublesResults?.find(
                            (result) =>
                              result.team.some((name) =>
                                playerNames.includes(name)
                              )
                          );

                        const resultStyle =
                          individualResult
                            ? getResultStyle(
                                individualResult.rank
                              )
                            : doublesResult
                              ? getResultStyle(
                                  doublesResult.rank
                                )
                              : {
                                  icon: "•",
                                  className:
                                    "bg-zinc-100 text-zinc-500",
                                };

                        return (
                          <div
                            key={key}
                            className="group/tournament relative"
                          >
                            {/* 大会バッジ */}
                            <span
                              className={`inline-flex cursor-help items-center rounded-full px-3 py-1.5 text-xs font-black transition hover:scale-105 ${resultStyle.className}`}
                            >
                              {resultStyle.icon}{" "}
                              {tournamentShortNames[key] ??
                                tournamentNames[key] ??
                                key}
                            </span>

                            {/* ポップアップ */}
                            <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-80 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-150 group-hover/tournament:translate-y-0 group-hover/tournament:opacity-100">
                              <div className="rounded-2xl border border-violet-100 bg-white p-4 text-left shadow-2xl shadow-violet-200/60">
                                {/* 大会名 */}
                                <div>
                                  <p className="text-sm font-black leading-5 text-zinc-900">
                                    {tournament.name}
                                  </p>

                                  <div className="mt-2 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-600">
                                      {tournament.date}
                                    </span>

                                    <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-600">
                                      {tournament.category}
                                    </span>
                                  </div>
                                </div>

                                {/* 個人成績 */}
                                {individualResult && (
                                  <div className="mt-4 rounded-xl bg-zinc-50 p-3">
                                    <p className="text-[10px] font-black tracking-wider text-zinc-400">
                                      RESULT
                                    </p>

                                    <p className="mt-1 text-sm font-black text-zinc-800">
                                      {getResultStyle(
                                        individualResult.rank
                                      ).icon}{" "}
                                      {individualResult.rank}
                                    </p>
                                  </div>
                                )}

                                {/* ダブルス成績 */}
                                {doublesResult && (
                                  <div className="mt-3 rounded-xl bg-pink-50 p-3">
                                    <p className="text-[10px] font-black tracking-wider text-pink-400">
                                      DOUBLES
                                    </p>

                                    <p className="mt-1 text-sm font-black text-pink-700">
                                      {
                                        getResultStyle(
                                          doublesResult.rank
                                        ).icon
                                      }{" "}
                                      {doublesResult.rank}
                                    </p>

                                    <p className="mt-1 text-xs font-medium text-zinc-500">
                                      {doublesResult.team.join(
                                        " / "
                                      )}
                                    </p>
                                  </div>
                                )}

                                {/* 大会説明 */}
                                <p className="mt-4 text-xs leading-5 text-zinc-500">
                                  {tournament.description}
                                </p>

                                {/* 大会ページへの誘導 */}
                                <p className="mt-3 text-[10px] font-bold text-violet-400">
                                  クリックすると大会ページへ
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="rounded-3xl border border-white bg-white p-10 text-center shadow-sm">
              <div className="text-4xl">🔎</div>

              <p className="mt-3 font-bold text-zinc-700">
                該当する選手が見つかりません。
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                選手名やXアカウントを確認してください。
              </p>
            </div>
          )}
        </section>
      </div>

      <footer className="px-6 py-10 text-center">
        <p className="text-xs font-bold tracking-widest text-zinc-400">
          PROJECT SEKAI PLAYER DATABASE
        </p>
      </footer>
    </main>
  );
}