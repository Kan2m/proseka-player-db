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
// X の仕様上 /2/users/me は tweet.read と users.read の両方が必須
// (users.read だけだと 403 になりログインに失敗する)。
// トークンは自分の情報を1回取得したら即無効化するので、投稿の閲覧等には使わない。
// (投稿・メールアドレス・長期トークン(offline.access)は要求しない)
const SCOPES = ["tweet.read", "users.read"];

export async function GET(request: NextRequest) {
  const clientId = process.env.X_CLIENT_ID;

  // SESSION_SECRET が無いと Cookie の署名で例外になり 500 になるため、ここで弾く
  if (
    !clientId ||
    !process.env.X_CLIENT_SECRET ||
    (process.env.SESSION_SECRET?.length ?? 0) < 32
  ) {
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
