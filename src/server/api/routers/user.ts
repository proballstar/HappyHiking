import { z } from "zod";
import type { User } from "@clerk/nextjs/dist/types/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  userInfo: publicProcedure.input(z.object({
    email: z.string()
  })).query(async ({ ctx, input }) => {
    const user = await ctx.prisma.person.findFirst({
        where: {
            email: input.email
        }
    })

    return {
        v: user?.verified,
    }
   })
});
