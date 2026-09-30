// 選手アイコン(Supabase Storage の公開バケット)

export const AVATAR_BUCKET = "avatars";

// ブラウザ側で正方形に切り抜いてこのサイズに縮小してからアップロードする
export const AVATAR_SIZE = 256;

// 縮小済みの画像なので通常は数十KB。これを超えるものは受け付けない
export const AVATAR_MAX_BYTES = 512 * 1024;

export const AVATAR_TYPES = {
  "image/webp": "webp",
  "image/png": "png",
  "image/jpeg": "jpg",
} as const;

export function avatarPublicUrl(path: string | null | undefined) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!path || !supabaseUrl) {
    return null;
  }

  return `${supabaseUrl}/storage/v1/object/public/${AVATAR_BUCKET}/${path}`;
}
