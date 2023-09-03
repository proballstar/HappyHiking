create: privateProcedure
            .input(z.object({
                name: z.string(),
                description: z.string(),
                route: z.string()
            }))
            .mutation(async ({ ctx, input }) => {
                const authorId = ctx.session.id;
                const email = ctx.session.emailAddresses[0]!.emailAddress;

                const pi = await ctx.prisma.person.findFirst({
                    where: {
                        email: email
                    }
                })

                const listing = await ctx.prisma.listings.create({
                    data: {
                        name: input.name,
                        desc: input.description,
                        route: input.route,
                        prof_url: authorId,
                        author: pi?.id,
                    }
                })
            }),


            export const publicProcedure = t.procedure;

const enforceUserAuth = t.middleware(async ({ ctx, next }) => {

  const personInfo = await ctx.prisma.person.findFirst({
    where: {
      email: ctx.currentUser?.emailAddresses[0]!.emailAddress
    }
  })

  if (!ctx.currentUser || !personInfo?.verified) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      session: ctx.currentUser,
    }
  });
})

export const privateProcedure = t.procedure.use(enforceUserAuth);