import { databaseRouter } from "./routers/database-operations";
import { sourceRouter } from "./routers/source-router";
import { statusRouter } from "./routers/status-router"
import { createTRPCRouter } from "@/server/api/trpc";
import { stripeRouter } from "./routers/stripe-router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  dbOperations: databaseRouter,
  sourceRouter: sourceRouter,
  statusRouter: statusRouter,
  stripeRouter: stripeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
