import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAccount } from "../lib/auth";

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { error } = await searchParams;
  const account = await getCurrentAccount();

  if (account) {
    redirect("/mypage");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 px-6 py-10 text-zinc-800">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-600 transition hover:bg-violet-100"
        >
          ← PLAYER DATABASE
        </Link>

        <section className="mt-10 rounded-[2rem] border border-white bg-white p-8 shadow-xl shadow-violet-100/60">
          <p className="text-sm font-bold tracking-[0.2em] text-violet-500">
            LOGIN
          </p>

          <h1 className="mt-3 text-3xl font-black">選手ログイン</h1>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            データベースに登録されているXアカウントでログインすると、マイページで自己紹介やYouTubeチャンネルを設定できます。
          </p>

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error === "config"
                ? "ログイン機能の設定が完了していません。運営にお問い合わせください。"
                : "ログインに失敗しました。もう一度お試しください。"}
            </p>
          )}

          <div className="mt-8">
            {/* 自前の X OAuth へ遷移(JS不要) */}
            <a
              href="/auth/x/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-black text-white transition hover:bg-zinc-700"
            >
              <span className="text-base">𝕏</span>
              Xでログイン
            </a>
          </div>

          <p className="mt-4 text-xs leading-6 text-zinc-400">
            取得するのはXの内部IDとユーザー名のみです。投稿・メールアドレス等へのアクセスは行わず、Xのトークンはログイン確認後すぐに無効化しています。
          </p>

          {/* X アプリが認可画面を横取りする X 側の既知の問題への案内 */}
          <div className="mt-6 rounded-2xl bg-violet-50 px-4 py-3 text-xs leading-6 text-violet-700">
            <p className="font-black">スマホでXアプリが開いてログインできない場合</p>
            <ul className="mt-1 list-disc pl-4">
              <li>PCのブラウザからログインしてください(おすすめ)</li>
              <li>
                Android: 設定 → アプリ → X → 「デフォルトで開く」の対応リンクをオフにすると、ブラウザでログインできます
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
