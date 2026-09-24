import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hasSession =
  request.cookies.has("better-auth.session_token");

if (!hasSession) {
  return NextResponse.redirect(new URL("/login", request.url));
}

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/account/:path*"],
}