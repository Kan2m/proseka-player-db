"use client";

import { useState } from "react";
import type { TournamentArchive } from "../../data/tournaments";

// 配信アーカイブは数時間あるので、最初はサムネイルだけ表示し、
// クリックされてから YouTube のプレイヤーを読み込む(ページを重くしない)
export default function ArchivePlayer({
  archive,
  tournamentName,
}: {
  archive: TournamentArchive;
  tournamentName: string;
}) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${archive.videoId}`;
  const label = `${tournamentName} ${archive.title}`;

  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-zinc-900/5">
      <div className="relative aspect-video bg-zinc-900">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${archive.videoId}?autoplay=1&rel=0`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${label}を再生`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${archive.videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-2xl text-white shadow-xl transition group-hover:scale-110">
              ▶
            </span>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <p className="truncate font-black text-zinc-900">{archive.title}</p>
          <p className="mt-0.5 truncate text-xs font-medium text-zinc-400">
            {archive.channel}
            {archive.note && (
              <span className="ml-2 font-bold text-pink-500">
                {archive.note}
              </span>
            )}
          </p>
        </div>

        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
        >
          YouTubeで見る ↗
        </a>
      </div>
    </div>
  );
}
