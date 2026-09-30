"use client";

import { useActionState } from "react";
import { requestYoutubeChannel } from "./actions";

export default function YoutubeForm() {
  const [state, formAction, pending] = useActionState(
    requestYoutubeChannel,
    null
  );

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="url"
          name="url"
          required
          placeholder="https://www.youtube.com/@xxxx"
          className="flex-1 rounded-2xl border-2 border-pink-100 bg-pink-50/50 px-4 py-3 text-sm font-medium text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-pink-300 focus:bg-white"
        />

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-black text-white transition hover:bg-zinc-700 disabled:opacity-60"
        >
          {pending ? "申請中..." : "承認を申請"}
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
