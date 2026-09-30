-- Supabase の SQL Editor で実行してください

-- 選手の自己紹介(選手ID = app/data/players.ts の id)
create table if not exists public.player_profiles (
  player_id text primary key,
  bio text not null default '' check (char_length(bio) <= 1000),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

-- YouTube チャンネルの登録申請(運営が承認したものだけ公開)
create table if not exists public.youtube_requests (
  id uuid primary key default gen_random_uuid(),
  player_id text not null,
  url text not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  requested_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists youtube_requests_player_id_idx
  on public.youtube_requests (player_id);
create index if not exists youtube_requests_status_idx
  on public.youtube_requests (status);

-- RLS: 誰でも読めるのは「自己紹介」と「承認済みチャンネル」だけ。
-- 書き込みはサーバー(シークレットキー)経由のみなので、書き込みポリシーは作らない。
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
