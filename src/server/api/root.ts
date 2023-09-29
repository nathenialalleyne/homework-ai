import { convertRouter } from "@/server/api/routers/ConvertFile";
import { databaseRouter } from "./routers/DatabaseOperations";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  convert: convertRouter,
  dbOperations: databaseRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;
