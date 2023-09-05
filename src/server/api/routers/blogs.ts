import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const blogsRouter = createTRPCRouter({
  add: publicProcedure
           .input(z.object({
                title: z.string(),
                content: z.string(),
                desc: z.string(),
                tag: z.string(),
                email: z.string()
           }))
           .mutation(async ({ ctx, input }) => {
                const authorInfo = await ctx.prisma.person.findFirst({
                    where: {
                        email: input.email
                    }
                })
                await ctx.prisma.blog.create({
                    data: {
                        title: input.title,
                        content: input.content,
                        desc: input.desc,
                        main_topic: input.tag,
                        likes: 0,
                        writer: authorInfo?.id
                    }
                })
           }),
    retrieve: publicProcedure
                .query(async ({ ctx }) => {
                    const blogs = await ctx.prisma.blog.findMany({
                        include: {
                            Person: true
                        }
                    })
                    return blogs
                })
});
