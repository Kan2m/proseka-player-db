"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Achievement } from "./data/players";

// レアリティの高い順。この順で表示し、1行に収まらない分は「+N」にまとめる
// (「準決勝進出」「準々決勝進出」は最高成績と重複するので一覧では出さない)
const rarityOrder: Achievement[] = [
  "個人優勝",
  "チーム優勝",
  "ダブルス優勝",
  "個人準優勝",
  "チーム準優勝",
  "ダブルス準優勝",
  "個人3位",
  "チーム3位",
  "個人4位",
  "個人5位",
];

const GAP = 6; // gap-1.5

const achievementIcon = (achievement: Achievement) => {
  if (achievement.includes("準優勝")) return "🥈";
  if (achievement.includes("優勝")) return "🏆";
  if (achievement.includes("3位")) return "🥉";
  return null;
};

const tagClassName =
  "shrink-0 whitespace-nowrap rounded-full bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-600 ring-1 ring-inset ring-zinc-200";

function Tag({ achievement }: { achievement: Achievement }) {
  const icon = achievementIcon(achievement);

  return (
    <span className={tagClassName}>
      {icon && <span className="mr-1">{icon}</span>}
      {achievement}
    </span>
  );
}

// 実績タグを1行に収まるだけ表示する。幅はカードごとに違うので実測して決める
export default function AchievementTags({
  achievements = [],
}: {
  achievements?: Achievement[];
}) {
  const sorted = rarityOrder.filter((achievement) =>
    achievements.includes(achievement)
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(sorted.length);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure) {
      return;
    }

    // 初回の observe でも呼ばれるので、測定はこのコールバックだけで行う
    const observer = new ResizeObserver(() => {
      const available = container.clientWidth;
      const elements = [...measure.children] as HTMLElement[];
      const tagWidths = elements.slice(0, -1).map((el) => el.offsetWidth);
      const plusWidth = elements.at(-1)?.offsetWidth ?? 0;

      const total = tagWidths.reduce(
        (sum, width, i) => sum + width + (i > 0 ? GAP : 0),
        0
      );

      if (total <= available) {
        setVisibleCount(tagWidths.length);
        return;
      }

      // 「+N」の分の幅を空けたうえで、先頭から入るだけ入れる
      let used = plusWidth;
      let count = 0;

      for (const width of tagWidths) {
        if (used + GAP + width > available) {
          break;
        }

        used += GAP + width;
        count += 1;
      }

      setVisibleCount(count);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [sorted.length]);

  if (sorted.length === 0) {
    return null;
  }

  const hidden = sorted.slice(visibleCount);

  return (
    // 測定用の非表示レイヤーがカードからはみ出さないよう overflow-hidden
    <div ref={containerRef} className="relative min-w-0 flex-1 overflow-hidden">
      <div className="flex gap-1.5">
        {sorted.slice(0, visibleCount).map((achievement) => (
          <Tag key={achievement} achievement={achievement} />
        ))}

        {hidden.length > 0 && (
          <span
            title={hidden.join(" / ")}
            className={`${tagClassName} font-bold text-zinc-500`}
          >
            +{hidden.length}
          </span>
        )}
      </div>

      {/* 幅の測定用(非表示)。全タグと「+N」を並べておく */}
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 flex gap-1.5"
      >
        {sorted.map((achievement) => (
          <Tag key={achievement} achievement={achievement} />
        ))}
        <span className={`${tagClassName} font-bold`}>+{sorted.length}</span>
      </div>
    </div>
  );
}
