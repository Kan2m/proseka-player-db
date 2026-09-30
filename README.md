This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ログイン・マイページのセットアップ

選手本人が X でログインし、自己紹介や YouTube チャンネル(運営承認制)を設定できます。
ログインとデータ保存には Supabase(無料プラン)を使います。

1. **Supabase プロジェクトを作成** (https://supabase.com)
   - SQL Editor で `supabase/schema.sql` を実行
2. **X のアプリを作成** (https://developer.x.com の Free プラン)
   - User authentication settings で OAuth 2.0 を有効化、種類は「Web App」
   - Callback URI: `https://<project-ref>.supabase.co/auth/v1/callback`
   - Website URL: 本番サイトの URL
   - Client ID / Client Secret を控える
3. **Supabase で X ログインを有効化**
   - Authentication > Sign In / Providers > **X / Twitter (OAuth 2.0)** に Client ID / Secret を入力
   - Authentication > URL Configuration の Site URL に本番 URL、Redirect URLs に
     `https://<本番ドメイン>/auth/callback` と `http://localhost:3000/auth/callback` を追加
4. **環境変数を設定** (`.env.example` を `.env.local` にコピー。Vercel では Project Settings > Environment Variables)
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_SECRET_KEY`
   - `ADMIN_X_IDS`(任意): 管理者を追加する場合のみ。基本の管理者は `app/lib/auth.ts` の `ADMIN_X_IDS` に記載

### 仕組み

- `/mypage`: ログインした X の ID と `app/data/players.ts` の `twitter` が一致する選手だけが編集可能
- `/admin`: `app/lib/auth.ts` の `ADMIN_X_IDS`(と同名の環境変数)に含まれるアカウントだけが YouTube チャンネル申請を承認・却下できる
- 選手ページには自己紹介と承認済みチャンネルだけが表示される
- X の ID を変更した選手は `players.ts` の `twitter` も更新が必要

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
