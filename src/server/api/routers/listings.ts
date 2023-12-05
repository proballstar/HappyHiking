import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import type { User } from "@clerk/nextjs/dist/types/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";


function filterUser(user: User) {

    let u = user.username;

    const id = user.id.slice(user.id.length-3, user.id.length)

    if(!user.username) {
        u = `${user.firstName}${user.lastName}${id}`
    }
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses,
        username: u,
        profileImageUrl: user.imageUrl,
    };
}

export const listingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.listings.findMany({
        take: 100,
        orderBy: {
            start: {
                sort: "desc"
            }
        }
    });

    const users = (
        await clerkClient.users.getUserList({
            userId: posts.map((post) => post.prof_url!),
            limit: 100
        })
      ).map(filterUser);

    return posts.map((post) => {

        console.log(users)
        console.log(post.prof_url)
        const author = users.find((user) => user.id === post.prof_url)

        if(!author) throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Author for post not defined"
        })

        return {
            post,
            author
        }
    })
  }),
    post: publicProcedure
                .input(z.object({
                    email: z.string(),
                    name: z.string(),
                    desc: z.string(),
                    route: z.string(),
                    date: z.date(),
                    author_id: z.string(),
                }))
                .mutation(async ({ ctx, input }) => {
                    const authorInfo = await ctx.prisma.person.findFirst({
                        where: {
                            email: input.email
                        }
                    })
                    await ctx.prisma.listings.create({
                        data: {
                            author: authorInfo?.id,
                            prof_url: input.author_id,
                            route: input.route,
                            name: input.name,
                            desc: input.desc,
                            date: input.date,
                        }
                    })
                }),
    getPost: publicProcedure
                .input(z.object({
                    id: z.string()
                }))
                .query(async ({ ctx, input }) => {
                    const post = await ctx.prisma.listings.findFirst({
                        where: {
                            id: input.id
                        },
                        include: {
                            Attendees: {
                                include: {
                                    Person: true,

                                }
                            },
                            EventItem: true
                        }
                    });

                    if(!post) {
                        throw new TRPCError({
                            code: "NOT_FOUND",
                            message: "Post not found"
                        })
                    }
                
                    const clerkUser = await clerkClient.users.getUser(post.prof_url!)
                
                    return {
                        post,
                        author: clerkUser
                    }
                }),
    joinEvent: publicProcedure
                    .input(z.object({
                        email: z.string(),
                        event_id: z.string(),
                        comment: z.string()
                    }))
                    .mutation(async ({ ctx, input }) => {
                        const personInfo = await ctx.prisma.person.findFirst({
                            where: {
                                email: input.email
                            }
                        })
                        const attendees = await ctx.prisma.attendees.findMany({
                            where: {
                                person_id: personInfo?.id,
                                listing_id: input.event_id
                            }
                        })
                        if(attendees.length > 0) {
                            throw new TRPCError({
                                code: "BAD_REQUEST",
                                message: "Already joined event"
                            })
                        } else {
                            await ctx.prisma.attendees.create({
                                data: {
                                    person_id: personInfo?.id,
                                    listing_id: input.event_id,
                                    comment: input.comment
                                }
                            })
                        }
                    })
  });
