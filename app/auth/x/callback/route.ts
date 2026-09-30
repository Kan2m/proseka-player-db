import { NextResponse, type NextRequest } from "next/server";
import { linkPlayerAccount } from "../../../lib/auth";
import {
  OAUTH_COOKIE,
  SESSION_COOKIE,
  createSessionToken,
  verify,
  type OAuthState,
} from "../../../lib/session";

const basicAuth = () =>
  `Basic ${Buffer.from(
    `${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`
  ).toString("base64")}`;

// 取得したトークンは使い終わったらすぐ無効化する(保存しない)
async function revokeToken(token: string) {
  try {
    await fetch("https://api.x.com/2/oauth2/revoke", {
      method: "POST",
      headers: {
        Authorization: basicAuth(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token,
        token_type_hint: "access_token",
      }),
    });
  } catch (error) {
    console.error("[auth/x/callback] revoke failed:", error);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const fail = (reason: string, detail?: unknown) => {
    console.error(`[auth/x/callback] ${reason}`, detail ?? "");
    const response = NextResponse.redirect(
      new URL("/login?error=auth", request.url)
    );
    response.cookies.delete(OAUTH_COOKIE);
    return response;
  };

  const saved = verify<OAuthState>(request.cookies.get(OAUTH_COOKIE)?.value);
  const code = searchParams.get("code");

  if (!saved || !code || searchParams.get("state") !== saved.state) {
    return fail("invalid state", searchParams.get("error"));
  }

  // 認可コード → アクセストークン
  const tokenRes = await fetch("https://api.x.com/2/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: basicAuth(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: new URL("/auth/x/callback", request.url).toString(),
      code_verifier: saved.verifier,
      client_id: process.env.X_CLIENT_ID ?? "",
    }),
  });

  if (!tokenRes.ok) {
    return fail("token exchange failed", await tokenRes.text());
  }

  const { access_token: accessToken } = (await tokenRes.json()) as {
    access_token: string;
  };

  // 取得するのは既定項目(id / name / username)のみ。保存するのは id と username だけ
  const meRes = await fetch("https://api.x.com/2/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  await revokeToken(accessToken);

  if (!meRes.ok) {
    return fail("users/me failed", await meRes.text());
  }

  const { data } = (await meRes.json()) as {
    data?: { id: string; username: string };
  };

  if (!data?.id || !data.username) {
    return fail("users/me returned no user");
  }

  await linkPlayerAccount(data.id, data.username);

  const session = createSessionToken(data.id, data.username);
  const response = NextResponse.redirect(new URL("/mypage", request.url));
  response.cookies.set(SESSION_COOKIE, session.value, session.options);
  response.cookies.delete(OAUTH_COOKIE);

  return response;
}
