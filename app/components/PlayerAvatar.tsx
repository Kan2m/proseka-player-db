type PlayerAvatarProps = {
  src?: string | null;
  name: string;
  className?: string;
};

// 選手アイコン。未設定の場合は人の上半身のシルエットを表示する
export default function PlayerAvatar({
  src,
  name,
  className = "h-12 w-12 rounded-2xl",
}: PlayerAvatarProps) {
  if (src) {
    return (
      // Supabase Storage の画像は縮小済みなので next/image の最適化は使わない
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`${name}のアイコン`}
        loading="lazy"
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
