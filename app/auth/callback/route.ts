import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// X での認可後に Supabase から戻ってくる先
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  // オープンリダイレクト対策: サイト内パスのみ許可
  const redirectPath =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/mypage";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${redirectPath}`);
    }

    console.error("[auth/callback] exchangeCodeForSession failed:", error);
  } else {
    console.error(
      "[auth/callback] no code:",
      searchParams.get("error_description") ?? searchParams.get("error")
    );
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
