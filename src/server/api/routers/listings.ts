import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.listings.findMany({});
  }),
});
