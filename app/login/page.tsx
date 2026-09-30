import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAccount } from "../lib/auth";
import LoginButton from "./LoginButton";

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
              ログインに失敗しました。もう一度お試しください。
            </p>
          )}

          <div className="mt-8">
            <LoginButton />
          </div>
        </section>
      </div>
    </main>
  );
}
