import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// ログイン状態は「X の内部ID とユーザー名」だけを署名付き Cookie に保存する。
// X のアクセストークン等は保存しない。

export const SESSION_COOKIE = "psdb_session";
export const OAUTH_COOKIE = "psdb_x_oauth";

const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30日
export const OAUTH_MAX_AGE = 60 * 10; // 認可フローは10分以内

export type Session = {
  xUserId: string;
  xUsername: string;
  exp: number;
};

export type OAuthState = {
  state: string;
  verifier: string;
  exp: number;
};

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET(32文字以上)が設定されていません");
  }

  return secret;
}

function hmac(data: string) {
  return createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function sign(payload: object) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${hmac(data)}`;
}

export function verify<T extends { exp: number }>(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [data, signature] = token.split(".");

  if (!data || !signature) {
    return null;
  }

  const expected = Buffer.from(hmac(data));
  const actual = Buffer.from(signature);

  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString()
    ) as T;

    return payload.exp > Date.now() / 1000 ? payload : null;
  } catch {
    return null;
  }
}

export const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

export function createSessionToken(xUserId: string, xUsername: string) {
  return {
    value: sign({
      xUserId,
      xUsername,
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
    } satisfies Session),
    options: cookieOptions(SESSION_MAX_AGE),
  };
}

export async function getSession() {
  const cookieStore = await cookies();
  return verify<Session>(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
