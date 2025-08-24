import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { PAGES } from "./lib/constants";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL(PAGES.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
