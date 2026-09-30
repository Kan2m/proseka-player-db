"use client";

import { useActionState, useState } from "react";
import { updateBio } from "./actions";

export default function BioForm({ initialBio }: { initialBio: string }) {
  const [state, formAction, pending] = useActionState(updateBio, null);
  const [bio, setBio] = useState(initialBio);

  return (
    <form action={formAction}>
      <textarea
        name="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        maxLength={1000}
        rows={7}
        placeholder="好きな曲、使用デバイス、意気込みなどを自由に書いてください"
        className="w-full rounded-2xl border-2 border-violet-100 bg-violet-50/50 p-4 text-sm leading-7 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-violet-300 focus:bg-white"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold text-zinc-400">{bio.length} / 1000</p>

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-2.5 text-sm font-black text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "保存中..." : "保存する"}
        </button>
      </div>

      {state && (
        <p
          className={`mt-3 text-sm font-bold ${
            state.ok ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
