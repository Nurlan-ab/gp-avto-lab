import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/routing";

export default createMiddleware(routing);

export const config = {
  // Run middleware on all paths EXCEPT admin, api, _next, static files
  matcher: ["/((?!api|_next|admin|favicon.ico).*)"],
};