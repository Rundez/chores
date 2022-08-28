import { createProtectedRouter } from "./protected-router";
import { z } from "zod"

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("getSecretMessage", {
    resolve({ ctx }) {
      return "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.";
    },
  })
    .query("getUsers", {
      async resolve({ ctx }) {
        return await ctx.prisma.user.findMany();
      },
    })
    .query("getGroups", {
      async resolve({ ctx, input }) {
        return await ctx.prisma.group.findMany({include: {users: true}});
      }
    })
    .mutation("createGroup", {
      input: z.object({
        name: z.string().max(5),
        description: z.string()
      }),
      async resolve({ ctx, input }) {
        await ctx.prisma.group.create({
          data: {
            name: input.name,
            description: input.description
          }
        })
        return {
          success: true
        };
      }
      
    })
  