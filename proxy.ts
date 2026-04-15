import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  const isPrivateRoute =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  // ❌ немає токенів → редірект на login
  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 🔁 якщо accessToken немає, але refreshToken є → пробуємо refresh
  if (!accessToken && refreshToken) {
    try {
      await checkSession();
    } catch {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // ❌ якщо авторизований і заходить на auth сторінки
  if ((accessToken || refreshToken) && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 🔥 ВАЖЛИВО: Next.js має побачити matcher
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/profile/:path*",
    "/notes/:path*",
  ],
};