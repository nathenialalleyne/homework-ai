import { databaseRouter } from "./routers/database-operations";
import { sourceRouter } from "./routers/source-router";
import { statusRouter } from "./routers/status-router"
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  dbOperations: databaseRouter,
  sourceRouter: sourceRouter,
  statusRouter: statusRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
