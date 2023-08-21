import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import type { User } from "@clerk/nextjs/dist/types/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";


function filterUser(user: User) {

    let u = user.username;

    let id = user.id.slice(user.id.length-3, user.id.length)

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
});
