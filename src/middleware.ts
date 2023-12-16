import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse, NextFetchEvent } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { AuthObject } from '@clerk/nextjs/dist/types/server'

const redis = new Redis({
  url: process.env.UPSTASH_URL!,
  token: process.env.UPSTASH_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, '10s'),
})

const publicPaths = [
  /^\/$/,
  /^\/api\/blocked$/,
  /^\/api\/stripe\/.*$/,
  /^\/api\/clerk\/.*$/,
]

const isPublic = (path: string) => {
  return publicPaths.some((regex) => regex.test(path))
}

const isAPI = (path: string) => {
  return path.match(new RegExp(`^\/(api)\/`))
}

export default authMiddleware({
  publicRoutes: publicPaths,
  // beforeAuth: async (request: NextRequest, event: NextFetchEvent) => {
  //   if (isAPI(request.nextUrl.pathname)) {
  //     const userId = getAuth(request).userId
  //     const { success, pending, limit, reset, remaining } =
  //       await ratelimit.limit(`ratelimit_middleware_${userId}`)
  //     event.waitUntil(pending)

  //     const res = success
  //       ? NextResponse.next()
  //       : NextResponse.redirect(new URL('/api/blocked', request.url))

  //     res.headers.set('X-RateLimit-Limit', limit.toString())
  //     res.headers.set('X-RateLimit-Remaining', remaining.toString())
  //     res.headers.set('X-RateLimit-Reset', reset.toString())
  //     return res
  //   }
  // },
  afterAuth: async (
    auth: AuthObject,
    request: NextRequest,
    event: NextFetchEvent,
  ) => {
    if (!isPublic(request.nextUrl.pathname)) {
      if (!auth.userId) {
        return redirectToSignIn({ returnBackUrl: request.url! })
      } else {
        return NextResponse.next()
      }
    }
    
    if (isAPI(request.nextUrl.pathname)) {
      const userId = auth.userId
      const { success, pending, limit, reset, remaining } =
        await ratelimit.limit(`ratelimit_middleware_${userId}`)
      event.waitUntil(pending)

      const res = success
        ? NextResponse.next()
        : NextResponse.redirect(new URL('/api/blocked', request.url))

      res.headers.set('X-RateLimit-Limit', limit.toString())
      res.headers.set('X-RateLimit-Remaining', remaining.toString())
      res.headers.set('X-RateLimit-Reset', reset.toString())
      return res
    }

  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
