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
                            Person: true,
                            Comments: {
                                include: {
                                    Person: true
                                }
                            }
                        }
                    })
                    return blogs
                }),
    findOne: publicProcedure
                 .input(z.object({
                     id: z.number()
                 }))
                 .query(async ({ ctx, input }) => {
                    const individualPost = ctx.prisma.blog.findFirst({
                        where: {
                            blog_id: input.id
                        },
                        include: {
                            Person: true,
                            Comments: {
                                include: {
                                    Person: true
                                }
                            }
                        }
                    })

                    return individualPost
                 }),

    comment: publicProcedure
                .input(z.object({
                    message: z.string(),
                    email: z.string(),
                    blog_id: z.number()
                }))
                .mutation(async ({ ctx, input }) => {
                    const authorInfo = await ctx.prisma.person.findFirst({
                        where: {
                            email: input.email
                        }
                    })
                    await ctx.prisma.comments.create({
                        data: {
                            message: input.message,
                            author_id: authorInfo?.id,
                            blog_id: input.blog_id
                        }
                    })
                })
});
