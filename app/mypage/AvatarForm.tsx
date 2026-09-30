"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import PlayerAvatar from "../components/PlayerAvatar";
import { AVATAR_SIZE } from "../lib/avatar";
import { deleteAvatar, updateAvatar, type FormState } from "./actions";

// 縮小前の元画像の上限(スマホの写真でも収まる大きさ)
const SOURCE_MAX_BYTES = 15 * 1024 * 1024;

// 画像の中央を正方形に切り抜き、AVATAR_SIZE に縮小する
async function toSquareAvatar(file: File) {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);

  const canvas = document.createElement("canvas");
  canvas.width = AVATAR_SIZE;
  canvas.height = AVATAR_SIZE;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("canvas not supported");
  }

  context.imageSmoothingQuality = "high";
  context.drawImage(
    bitmap,
    (bitmap.width - side) / 2,
    (bitmap.height - side) / 2,
    side,
    side,
    0,
    0,
    AVATAR_SIZE,
    AVATAR_SIZE
  );
  bitmap.close();

  // WebP を書き出せないブラウザ(古い Safari 等)では自動的に PNG になる
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.9)
  );

  if (!blob) {
    throw new Error("encode failed");
  }

  return blob;
}

type AvatarFormProps = {
  name: string;
  avatarUrl: string | null;
};

export default function AvatarForm({ name, avatarUrl }: AvatarFormProps) {
  const [state, setState] = useState<FormState>(null);
  const [saving, startSave] = useTransition();
  const [deleting, startDelete] = useTransition();
  const [blob, setBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // プレビュー用の一時 URL を解放する
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const reset = () => {
    setBlob(null);
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFile = async (file: File | undefined) => {
    setError(null);
    setState(null);

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください。");
      return;
    }

    if (file.size > SOURCE_MAX_BYTES) {
      setError("15MB以下の画像を選択してください。");
      return;
    }

    try {
      const avatar = await toSquareAvatar(file);
      setBlob(avatar);
      setPreview(URL.createObjectURL(avatar));
    } catch {
      setError("この画像は読み込めませんでした。別の画像をお試しください。");
    }
  };

  const save = () => {
    if (!blob) {
      return;
    }

    const extension = blob.type === "image/png" ? "png" : "webp";
    const formData = new FormData();
    formData.append("avatar", blob, `avatar.${extension}`);

    startSave(async () => {
      const result = await updateAvatar(null, formData);
      setState(result);

      // 保存に成功したら選択中の画像をクリアする(以降はサーバーの画像を表示)
      if (result?.ok) {
        reset();
      }
    });
  };

  const busy = saving || deleting;
  const message = error
    ? { ok: false, message: error }
    : blob
      ? null
      : state;

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <PlayerAvatar
        src={preview ?? avatarUrl}
        name={name}
        className="h-28 w-28 rounded-[1.75rem] ring-4 ring-white shadow-lg shadow-violet-100"
      />

      <div className="flex-1">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/*"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="sr-only"
          id="avatar-input"
          disabled={busy}
        />

        <div className="flex flex-wrap gap-2">
          {blob ? (
            <>
              <button
                type="button"
                onClick={save}
                disabled={busy}
                className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-2.5 text-sm font-black text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "保存中..." : "このアイコンで保存"}
              </button>

              <button
                type="button"
                onClick={reset}
                disabled={busy}
                className="rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-bold text-zinc-600 transition hover:bg-zinc-200 disabled:opacity-60"
              >
                キャンセル
              </button>
            </>
          ) : (
            <>
              <label
                htmlFor="avatar-input"
                className={`cursor-pointer rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-black text-white transition hover:bg-zinc-700 ${
                  busy ? "pointer-events-none opacity-60" : ""
                }`}
              >
                {avatarUrl ? "画像を変更" : "画像を選択"}
              </label>

              {avatarUrl && (
                <button
                  type="button"
                  onClick={() =>
                    startDelete(async () => {
                      setState(null);
                      await deleteAvatar();
                    })
                  }
                  disabled={busy}
                  className="rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-bold text-zinc-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                >
                  {deleting ? "削除中..." : "アイコンを削除"}
                </button>
              )}
            </>
          )}
        </div>

        <p className="mt-3 text-xs leading-6 text-zinc-400">
          PNG・JPEG・WebP に対応。画像の中央が正方形に切り抜かれます。
          保存するとすぐに選手ページと選手一覧に表示されます。
        </p>

        {message && (
          <p
            className={`mt-2 text-sm font-bold ${
              message.ok ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {message.message}
          </p>
        )}
      </div>
    </div>
  );
}
