This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ログイン・マイページのセットアップ

選手本人が X でログインし、自己紹介や YouTube チャンネル(運営承認制)を設定できます。
ログインは自前の X OAuth 2.0 (PKCE) で行い、Supabase はデータ保存のみに使います。

### 取得する情報(最小限)

- X に要求する権限は `tweet.read` と `users.read` のみ(`/2/users/me` の必須権限。投稿・メールアドレス・長期トークンは要求しない)
- 取得・保存するのは X の **内部ID とユーザー名** だけ
- X のアクセストークンは本人確認直後に無効化し、保存しない
- ログイン状態は署名付き httpOnly Cookie(内部ID・ユーザー名・有効期限のみ)
- X API は従量課金のため、ログイン1回につき約 $0.01 かかる

### 手順

1. **Supabase プロジェクトを作成**し、SQL Editor で `supabase/schema.sql` を実行
   (アイコン用の `avatars` バケットと `avatar_path` 列も作成される。既存の環境でも再実行して問題ない)
2. **X Developer Console でアプリを設定**
   - ユーザー認証設定: 権限「読む」、種類「ウェブアプリ」、メール取得 OFF
   - Callback URI: `https://<本番ドメイン>/auth/x/callback` と `http://localhost:3000/auth/x/callback`
   - Client ID / Client Secret を控える
3. **環境変数を設定**(`.env.example` を `.env.local` にコピー。Vercel では Project Settings > Environment Variables)
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_SECRET_KEY`
   - `X_CLIENT_ID` / `X_CLIENT_SECRET`
   - `SESSION_SECRET`: 32文字以上のランダム文字列
   - `ADMIN_X_IDS`(任意): 管理者を追加する場合のみ。基本の管理者は `app/lib/auth.ts` の `ADMIN_X_IDS` に記載

### 仕組み

- 初回ログイン時、X のユーザー名が `app/data/players.ts` の `twitter` と一致(大文字小文字も区別)すれば、
  その選手と X の内部IDを `player_accounts` に紐付ける。以降は内部IDで照合するため、
  選手が @名 を変更しても入れ、古い @名 を別人が取得しても入れない
- 紐付けをやり直す場合は Supabase の `player_accounts` から該当行を削除する
- `/admin`: `ADMIN_X_IDS` に含まれるアカウントだけが YouTube チャンネル申請を承認・却下できる
- 選手ページには自己紹介と承認済みチャンネルだけが表示される
- アイコンはマイページで設定でき、承認なしですぐに選手ページ・選手一覧に反映される。
  ブラウザで中央を正方形に切り抜き 256px に縮小してから Supabase Storage(`avatars` バケット)に保存する。
  未設定の場合は人のシルエットを表示する

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
