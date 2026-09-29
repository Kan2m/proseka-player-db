"use client";

import Link from "next/link";

export default function InfoPage() {
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

          <Link
            href="/"
            className="rounded-full bg-violet-50 px-4 py-2 text-xs font-bold text-violet-500 transition hover:bg-violet-100 hover:text-violet-600"
          >
            ← DATABASE
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        {/* メインタイトル */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-7 shadow-xl shadow-violet-100/60 md:p-10">
          {/* 装飾 */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-200/40 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute right-1/4 top-1/2 h-40 w-40 rounded-full bg-sky-200/30 blur-3xl" />

          <div className="relative">
            <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-black tracking-[0.15em] text-violet-600">
              INFORMATION
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
              サイトについて
            </h1>

            <p className="mt-5 max-w-2xl leading-7 text-zinc-500">
              プロジェクトセカイ競技選手データベースに関する情報、
              お問い合わせ先、注意事項などを掲載しています。
            </p>
          </div>
        </section>

        {/* サイトについて */}
        <section className="mt-8 rounded-[2rem] border border-white bg-white p-7 shadow-sm md:p-9">
          <div className="mb-6">
            <p className="text-xs font-black tracking-[0.2em] text-violet-500">
              ABOUT
            </p>

            <h2 className="mt-1 text-2xl font-black text-zinc-900 md:text-3xl">
              このサイトについて
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-7 text-zinc-600">
            <p>
              本サイトは、プロジェクトセカイの競技シーンに関する情報を
              まとめた非公式のデータベースサイトです。
            </p>

            <p>
              プロジェクトセカイ Championship、RAGE、WCS、
              ほわいと杯などの大会に出場した選手の情報や大会結果を
              掲載しています。
            </p>

            <p>
              本サイトは
              <span className="font-bold text-violet-600">
                「プロジェクトセカイ カラフルステージ！ feat. 初音ミク」
              </span>
              の公式サイト・公式運営とは関係ありません。

              
            </p>
          </div>
        </section>

        {/* 連絡先 */}
        <section className="mt-6 rounded-[2rem] border border-white bg-white p-7 shadow-sm md:p-9">
          <div className="mb-6">
            <p className="text-xs font-black tracking-[0.2em] text-pink-500">
              CONTACT
            </p>

            <h2 className="mt-1 text-2xl font-black text-zinc-900 md:text-3xl">
              連絡先
            </h2>
          </div>

          <div className="rounded-3xl bg-pink-50 p-6">
            <p className="text-sm font-bold text-pink-600">
              お問い合わせについて
            </p>

            <p className="mt-3 text-sm leading-7 text-zinc-600">
              掲載情報の誤り、情報の追加・修正、削除依頼、
              その他本サイトに関するお問い合わせは、以下の連絡先まで
              お願いいたします。
            </p>

            <div className="mt-5 space-y-3">
              {/* ここを自分の連絡先に変更 */}
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs font-bold tracking-wider text-zinc-400">
                  X / TWITTER
                </p>

                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-bold text-violet-600 transition hover:text-pink-500"
                >
                  @_Kan2M
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 注意事項 */}
        <section className="mt-6 rounded-[2rem] border border-white bg-white p-7 shadow-sm md:p-9">
          <div className="mb-6">
            <p className="text-xs font-black tracking-[0.2em] text-sky-500">
              NOTICE
            </p>

            <h2 className="mt-1 text-2xl font-black text-zinc-900 md:text-3xl">
              注意事項
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-sky-50 p-5">
              <h3 className="font-black text-sky-700">
                掲載情報について
              </h3>

              <p className="mt-2 text-sm leading-7 text-zinc-600">
                本サイトに掲載されている情報は、公開されている情報をもとに作成しています。(かん調べになります)
              </p>
            </div>

            <div className="rounded-3xl bg-violet-50 p-5">
              <h3 className="font-black text-violet-700">
                情報の更新について
              </h3>

              <p className="mt-2 text-sm leading-7 text-zinc-600">
                大会結果や選手情報などについて、最新の情報が反映されるまで時間がかかる場合があります。
              </p>
            </div>

            <div className="rounded-3xl bg-pink-50 p-5">
              <h3 className="font-black text-pink-700">
                選手情報について
              </h3>

              <p className="mt-2 text-sm leading-7 text-zinc-600">
                本サイトは選手本人・大会運営等が運営する公式データベースではありません。掲載内容について問題がある場合は、連絡先からご連絡ください。
              </p>
            </div>
          </div>
        </section>

        {/* 免責事項 */}
        <section className="mt-6 rounded-[2rem] border border-white bg-white p-7 shadow-sm md:p-9">
          <div className="mb-6">
            <p className="text-xs font-black tracking-[0.2em] text-orange-500">
              DISCLAIMER
            </p>

            <h2 className="mt-1 text-2xl font-black text-zinc-900 md:text-3xl">
              修正や削除要請について
            </h2>
          </div>

          <div className="rounded-3xl bg-orange-50 p-6">
            <p className="mt-4 text-sm leading-7 text-zinc-600">
              掲載内容に誤りがある場合や、掲載を希望されない情報が
              ある場合は、お手数ですが連絡先よりご連絡ください。
              早急に修正・削除等の対応を行います。
            </p>
          </div>
        </section>

        {/* 権利について */}
        <section className="mt-6 rounded-[2rem] border border-white bg-white p-7 shadow-sm md:p-9">
          <div className="mb-6">
            <p className="text-xs font-black tracking-[0.2em] text-violet-500">
              COPYRIGHT
            </p>

            <h2 className="mt-1 text-2xl font-black text-zinc-900 md:text-3xl">
              権利・著作権について
            </h2>
          </div>

          <p className="text-sm leading-7 text-zinc-600">
            「プロジェクトセカイ カラフルステージ！ feat. 初音ミク」
            に関連する名称・画像・その他のコンテンツの権利は、
            各権利者に帰属します。
          </p>

          <p className="mt-4 text-sm leading-7 text-zinc-600">
            本サイトはファンによって制作された非公式サイトであり、
            株式会社セガ、Colorful Palette、クリプトン・フューチャー・
            メディア株式会社その他の関係各社とは一切関係ありません。
          </p>
        </section>

        {/* 戻るボタン */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-violet-500 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-xl"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            PLAYER DATABASE に戻る
          </Link>
        </div>
      </div>

      {/* フッター */}
      <footer className="px-6 py-10 text-center">
        <p className="text-xs font-bold tracking-widest text-zinc-400">
          PROJECT SEKAI PLAYER DATABASE
        </p>

        <p className="mt-2 text-xs text-zinc-400">
          UNOFFICIAL FAN DATABASE
        </p>
      </footer>
    </main>
  );
}