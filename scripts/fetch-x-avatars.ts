// X の公式 API で選手のアイコン画像 URL を取得し、app/data/xAvatars.ts に書き出す。
//
//   npm run fetch-x-avatars
//
// .env.local に X_BEARER_TOKEN(X Developer Console > アプリ > Bearer Token)が必要。
// X API は従量課金なので、アイコンを更新したい時だけ実行する(取得は最大100人ずつまとめて行う)。

import { writeFileSync } from "node:fs";
import { players } from "../app/data/players.ts";

const OUTPUT = new URL("../app/data/xAvatars.ts", import.meta.url);
const BATCH_SIZE = 100; // GET /2/users/by の上限

type XUser = { username: string; profile_image_url?: string };
type XResponse = {
  data?: XUser[];
  errors?: { value?: string; detail?: string }[];
};

const token = process.env.X_BEARER_TOKEN;

if (!token) {
  console.error("X_BEARER_TOKEN が .env.local に設定されていません");
  process.exit(1);
}

const handleOf = (twitter: string) => twitter.trim().replace(/^@/, "");

// 選手ID ⇔ X のユーザー名(X 側は大文字小文字を区別しないので小文字で照合する)
const targets = players
  .filter((player) => player.twitter)
  .map((player) => ({ id: player.id, handle: handleOf(player.twitter) }));

const urls: Record<string, string> = {};
const missing: string[] = [];

for (let i = 0; i < targets.length; i += BATCH_SIZE) {
  const batch = targets.slice(i, i + BATCH_SIZE);
  const url = new URL("https://api.x.com/2/users/by");
  url.searchParams.set("usernames", batch.map((t) => t.handle).join(","));
  url.searchParams.set("user.fields", "profile_image_url");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error(`X API エラー (${res.status}):`, await res.text());
    process.exit(1);
  }

  const json = (await res.json()) as XResponse;
  const byHandle = new Map(
    (json.data ?? []).map((user) => [user.username.toLowerCase(), user])
  );

  for (const target of batch) {
    const image = byHandle.get(target.handle.toLowerCase())?.profile_image_url;

    if (image) {
      // 既定の _normal は 48px なので 400px 版に差し替える
      urls[target.id] = image.replace(/_normal(\.\w+)$/, "_400x400$1");
    } else {
      missing.push(`@${target.handle}`);
    }
  }
}

const entries = Object.entries(urls)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([id, url]) => `  ${JSON.stringify(id)}: ${JSON.stringify(url)},`)
  .join("\n");

writeFileSync(
  OUTPUT,
  `// このファイルは scripts/fetch-x-avatars.ts が生成する(手で編集しない)
// 選手ID → X のアイコン画像 URL。マイページでアイコン未設定の選手の初期アイコンに使う
// 取得日: ${new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" })}

export const xAvatarUrls: Record<string, string> = {
${entries}
};
`
);

console.log(`取得: ${Object.keys(urls).length} / ${targets.length} 人`);

if (missing.length > 0) {
  console.log(`取得できなかったアカウント(削除・凍結・ID変更など): ${missing.join(" ")}`);
}
