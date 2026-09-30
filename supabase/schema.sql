-- Supabase の SQL Editor で実行してください
-- ログインは自前の X OAuth で行い、Supabase はデータ保存のみに使う

-- 選手 ⇔ X アカウント(内部ID)の紐付け。初回ログイン時に作成される。
-- @名ではなく変更できない内部IDで本人を確定する(なりすまし対策)
create table if not exists public.player_accounts (
  player_id text primary key,
  x_user_id text not null unique,
  x_username text not null,
  linked_at timestamptz not null default now()
);

-- 選手の自己紹介(選手ID = app/data/players.ts の id)
create table if not exists public.player_profiles (
  player_id text primary key,
  bio text not null default '' check (char_length(bio) <= 1000),
  updated_at timestamptz not null default now(),
  updated_by text -- 更新した X の内部ID
);

-- 選手アイコン(Storage の avatars バケット内のパス)。既存のテーブルにも追加できるよう alter で書く
alter table public.player_profiles
  add column if not exists avatar_path text;

-- YouTube チャンネルの登録申請(運営が承認したものだけ公開)
create table if not exists public.youtube_requests (
  id uuid primary key default gen_random_uuid(),
  player_id text not null,
  url text not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  requested_by text, -- 申請した X の内部ID
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists youtube_requests_player_id_idx
  on public.youtube_requests (player_id);
create index if not exists youtube_requests_status_idx
  on public.youtube_requests (status);

-- RLS: 誰でも読めるのは「自己紹介」と「承認済みチャンネル」だけ。
-- 紐付けテーブルは非公開(ポリシーなし)。
-- 書き込みはサーバー(シークレットキー)経由のみなので、書き込みポリシーは作らない。
alter table public.player_accounts enable row level security;
alter table public.player_profiles enable row level security;
alter table public.youtube_requests enable row level security;

drop policy if exists "profiles are public" on public.player_profiles;
create policy "profiles are public"
  on public.player_profiles for select
  using (true);

drop policy if exists "approved channels are public" on public.youtube_requests;
create policy "approved channels are public"
  on public.youtube_requests for select
  using (status = 'approved');

-- 選手アイコン用の公開バケット。誰でも読めるが、書き込みはサーバー(シークレットキー)経由のみ
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  524288, -- 512KB(アップロード前にブラウザで 256px に縮小している)
  array['image/webp', 'image/png', 'image/jpeg']
)
on conflict (id) do nothing;
