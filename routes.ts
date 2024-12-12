/**
 * All routes accessible to the public
 * These routes don't require authentication
 *@type {string[]}
 */
export const publicRoutes: string[] = ["/auth/new-verification"];

/**
 * All routes that are used authentication
 * These routes will redirect logged in users to /dashboard
 *@type {string[]}
 */
export const authRoutes: string[] = [
  "/login",
  "/register",
  "/error",
  "/reset",
  "/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/events";
