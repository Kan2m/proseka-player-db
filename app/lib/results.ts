import type { Player, TournamentKey } from "../data/players";
import { getTournamentById } from "../data/tournaments";

export const getResultStyle = (rank: string) => {
  // 準優勝を先に判定するのがポイント
  if (rank === "準優勝" || rank === "U-12 準優勝") {
    return {
      className: "bg-zinc-200 text-zinc-700",
      dot: "bg-zinc-400",
      icon: "🥈",
    };
  }

  if (rank === "優勝" || rank === "U-12 優勝") {
    return {
      className: "bg-yellow-100 text-yellow-700",
      dot: "bg-amber-400",
      icon: "🏆",
    };
  }

  if (rank === "3位" || rank === "U-12 3位") {
    return {
      className: "bg-orange-100 text-orange-700",
      dot: "bg-orange-400",
      icon: "🥉",
    };
  }

  if (rank === "4位" || rank === "U-12 4位") {
    return {
      className: "bg-red-100 text-red-600",
      dot: "bg-red-400",
      icon: "4️⃣",
    };
  }

  if (rank === "5位") {
    return {
      className: "bg-rose-100 text-rose-600",
      dot: "bg-rose-400",
      icon: "5️⃣",
    };
  }

  if (rank.includes("準決勝")) {
    return {
      className: "bg-blue-100 text-blue-700",
      dot: "bg-sky-500",
      icon: "🔵",
    };
  }

  if (rank.includes("準々決勝")) {
    return {
      className: "bg-violet-100 text-violet-700",
      dot: "bg-violet-500",
      icon: "🟣",
    };
  }

  return {
    className: "bg-zinc-100 text-zinc-500",
      dot: "bg-zinc-300",
    icon: "•",
  };
};

const isSamePlayer = (player: Player, playerName: string) =>
  player.name === playerName || player.aliases?.includes(playerName);

// 大会データから選手の個人・ダブルス成績を探す
export function getPlayerTournamentResult(
  player: Player,
  key: TournamentKey
) {
  const tournament = getTournamentById(key);

  const individualResult = tournament?.results?.find((result) =>
    result.players.some((playerName) => isSamePlayer(player, playerName))
  );

  const doublesResult = tournament?.doublesResults?.find((result) =>
    result.team.some((playerName) => isSamePlayer(player, playerName))
  );

  const rank = individualResult?.rank ?? doublesResult?.rank ?? "出場";

  return { tournament, individualResult, doublesResult, rank };
}
