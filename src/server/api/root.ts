import { createTRPCRouter } from "~/server/api/trpc";
import { listingsRouter } from "./routers/listings";
import { usersRouter } from "./routers/user";
import { blogsRouter } from "./routers/blogs";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  listings: listingsRouter,
  user: usersRouter,
  blog: blogsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
