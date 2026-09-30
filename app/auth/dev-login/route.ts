import { NextResponse, type NextRequest } from "next/server";
import { findPlayerByXHandle, linkPlayerAccount } from "../../lib/auth";
import { SESSION_COOKIE, createSessionToken } from "../../lib/session";

// ローカル検証専用: X を通さずに任意の選手としてログインする。
//   http://localhost:3000/auth/dev-login?handle=_Kan2M
// 本番で動かないよう「next dev」「DEV_LOGIN=1」「localhost からのアクセス」の3つがそろった時だけ有効
function isEnabled(request: NextRequest) {
  const host = request.nextUrl.hostname;

  return (
    process.env.NODE_ENV === "development" &&
    process.env.DEV_LOGIN === "1" &&
    (host === "localhost" || host === "127.0.0.1")
  );
}

// 本物の X の内部IDと同じく数字だけの文字列にする(型の不一致などを本番と同じ条件で検証するため)
const fakeXUserId = (handle: string) =>
  `9${[...handle].map((c) => c.charCodeAt(0)).join("")}`.slice(0, 19);

export async function GET(request: NextRequest) {
  if (!isEnabled(request)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const handle = (request.nextUrl.searchParams.get("handle") ?? "").replace(
    /^@/,
    ""
  );

  if (!handle || !findPlayerByXHandle(handle)) {
    return new NextResponse(
      "handle に players.ts の twitter(例: _Kan2M)を指定してください",
      { status: 400 }
    );
  }

  const xUserId = fakeXUserId(handle);

  await linkPlayerAccount(xUserId, handle);

  const session = createSessionToken(xUserId, handle);
  const response = NextResponse.redirect(new URL("/mypage", request.url));
  response.cookies.set(SESSION_COOKIE, session.value, session.options);

  return response;
}
