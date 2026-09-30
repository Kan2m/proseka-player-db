"use client";

import { useState } from "react";

type PlayerAvatarProps = {
  src?: string | null;
  name: string;
  className?: string;
};

// 選手アイコン。未設定、または画像を読み込めない場合(X のアイコンが変更された等)は
// 人の上半身のシルエットを表示する
export default function PlayerAvatar({
  src,
  name,
  className = "h-12 w-12 rounded-2xl",
}: PlayerAvatarProps) {
  // 読み込みに失敗した URL を覚えておく(src が変われば再び表示を試みる)
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (src && src !== failedSrc) {
    return (
      // Supabase Storage / X の画像は小さいので next/image の最適化は使わない
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`${name}のアイコン`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailedSrc(src)}
        // サーバー描画の画像は React の準備前に読み込み失敗していると onError が届かないので、
        // マウント時にも失敗済みか確認する
        ref={(img) => {
          if (img?.complete && img.naturalWidth === 0) {
            setFailedSrc(src);
          }
        }}
        className={`shrink-0 bg-zinc-100 object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${name}のアイコン(未設定)`}
      className={`shrink-0 overflow-hidden bg-zinc-200 ${className}`}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
        <circle cx="32" cy="25" r="11" className="fill-zinc-400" />
        <path
          d="M10 64c0-13 9.8-22 22-22s22 9 22 22z"
          className="fill-zinc-400"
        />
      </svg>
    </div>
  );
}
