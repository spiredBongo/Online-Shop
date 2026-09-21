import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const hasCookie = request.cookies.has("__Secure-better-auth.session_token");
    if (!hasCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/account/:path*"],
}