import { authMiddleware, withClerkMiddleware } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextFetchEvent } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import redisClient from "./utils/redis";

const publicPaths = ["/", "/sign-in*", "/sign-up*", "/api/blocked"];

const redis = new Redis({
      url: process.env.UPSTASH_URL!,
      token: process.env.UPSTASH_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, '10s')
});

const trpcLimiter = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(20, '10s')
});

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/|\\.)")))
  );
};

const isAPI = (path: string) => {
  return path.match(new RegExp(`^\/(api)\/`))
}

const isTRPC = (path: string) => {
  return path.match(new RegExp(`^\/(trpc)\/`))
}

export default withClerkMiddleware(async (request: NextRequest, event: NextFetchEvent) => {
  //Rate limit apis.
  if (isAPI(request.nextUrl.pathname)) {
    const userId = getAuth(request).userId;
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(`ratelimit_middleware_${userId}`);
    event.waitUntil(pending);

    const res = success ? NextResponse.next() : NextResponse.redirect(new URL("/api/blocked", request.url));

    res.headers.set("X-RateLimit-Limit", limit.toString());
    res.headers.set("X-RateLimit-Remaining", remaining.toString());
    res.headers.set("X-RateLimit-Reset", reset.toString());
    return res;
  }

  if(isTRPC(request.nextUrl.pathname)){
      const userId = getAuth(request).userId;
      const { success, pending, limit, reset, remaining } = await trpcLimiter.limit(`ratelimit_middleware_${userId}`);
      event.waitUntil(pending);
      
      const res = success ? NextResponse.next() : NextResponse.redirect(new URL("/api/blocked", request.url));
      
      res.headers.set("X-RateLimit-Limit", limit.toString());
      res.headers.set("X-RateLimit-Remaining", remaining.toString());
      res.headers.set("X-RateLimit-Reset", reset.toString());
      return res;
        }

  // do nothing
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request);

  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts

    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

 