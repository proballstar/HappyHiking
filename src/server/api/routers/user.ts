import { z } from "zod";
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
   }),
   createUser: publicProcedure
                 .input(z.object({
                    fname: z.string(),
                    lname: z.string(),
                    about: z.string(),
                    email: z.string(),
                    weekly_hours: z.number()
                 }))
                 .mutation(async ({ ctx, input }) => {
                    const personCreation = await ctx.prisma.person.create({
                      data: {
                        fname: input.fname,
                        lname: input.lname,
                        about: input.about,
                        email: input.email,
                        weekly_hours: input.weekly_hours,
                        verified: true
                      }
                    })
                    console.log("PERSON")
                    console.log(personCreation)
                 })
});
