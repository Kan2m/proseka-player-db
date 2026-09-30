import { createHash, randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import {
  OAUTH_COOKIE,
  OAUTH_MAX_AGE,
  cookieOptions,
  sign,
  type OAuthState,
} from "../../../lib/session";

// 本人確認(GET /2/users/me)に必要な最小限の権限だけを要求する。
// X には「自分の情報だけ」を読む権限がないため users.read が最小。
// トークンは自分の情報を1回取得したら即無効化するので、他アカウントの閲覧には使わない。
// (投稿・メールアドレス・長期トークン(offline.access)は要求しない)
const SCOPES = ["users.read"];

export async function GET(request: NextRequest) {
  const clientId = process.env.X_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(new URL("/login?error=config", request.url));
  }

  // CSRF 対策の state と PKCE 用の code_verifier
  const state = randomBytes(16).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");

  const authorizeUrl = new URL("https://x.com/i/oauth2/authorize");
  authorizeUrl.search = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: new URL("/auth/x/callback", request.url).toString(),
    scope: SCOPES.join(" "),
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  }).toString();

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(
    OAUTH_COOKIE,
    sign({
      state,
      verifier,
      exp: Math.floor(Date.now() / 1000) + OAUTH_MAX_AGE,
    } satisfies OAuthState),
    cookieOptions(OAUTH_MAX_AGE)
  );

  return response;
}
