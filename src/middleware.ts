import authConfig from "@/auth.config";
// import { auth as middleware } from "@/auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/routes";
import NextAuth from "next-auth";

const { auth: middleware } = NextAuth(authConfig);

export const runtime = "nodejs";

export default middleware((req) => {
  // console.log("⏳⏳⏳⏳⏳⏳⏳⏳⏳ Middleware ⏳⏳⏳⏳⏳⏳⏳⏳⏳");
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
