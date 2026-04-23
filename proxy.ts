import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "./lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const refreshToken =
    cookieStore.get("refreshToken")?.value;

  const cookieHeader =
    cookieStore
      .getAll()
      .map(
        (cookie) =>
          `${cookie.name}=${cookie.value}`
      )
      .join("; ");

  const isAuthRoute =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  const isPrivateRoute =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/notes");

  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    );
  }

  if (!accessToken && refreshToken) {
    try {
      const response =
        await checkSession(cookieHeader);

      const res = NextResponse.next();

      const setCookie =
        response.headers["set-cookie"];

      if (setCookie) {
        if (Array.isArray(setCookie)) {
          setCookie.forEach((cookie) => {
            res.headers.append(
              "set-cookie",
              cookie
            );
          });
        } else {
          res.headers.set(
            "set-cookie",
            setCookie
          );
        }
      }

      return res;
    } catch {
      return NextResponse.redirect(
        new URL("/sign-in", request.url)
      );
    }
  }

  if ((accessToken || refreshToken) && isAuthRoute) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/profile/:path*",
    "/notes/:path*",
  ],
};