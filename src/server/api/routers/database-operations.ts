import z from 'zod'
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import donwloadFile from '@/server/gcp/get-file'
import downloadFile from '@/server/gcp/get-file';
import deleteFile from '@/server/gcp/delete-gcps-files';
import createFileInGCPStorage from '@/server/gcp/create-file';

export const databaseRouter = createTRPCRouter({
  
  addSample: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input,ctx }) => {
        await ctx.db.writingSamples.create({
          data:{
            user: ctx.auth.userId as string,
            fileName: input.text
          }
        })
    }),

  getSample: publicProcedure
    .query(async ({ ctx }) => {
      const samples = await ctx.db.writingSamples.findMany({
        where:{
          user: ctx.auth.userId as string
        }
      })
      return samples
    }),

  updateSample: publicProcedure
    .input(z.object({ id: z.string(), newFileName: z.string() }))
    .query(async ({ input,ctx }) => {
      
      await ctx.db.writingSamples.update({
        where:{
          id: input.id
        },
        data:{
          fileName: input.newFileName
        }
      })
    }),

  getSampleTextFromStorage: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .query(async ({ ctx, input }) => {
      const source = await ctx.db.source.findFirst({
        where:{
          id: input.id,
          name: input.name
        }
      })
      const text = await downloadFile(input.name, 'user-sample-storage')
      return text
  }),

  createSource: publicProcedure
  .input(z.object({ name: z.string(), vectorPrefix: z.string(), gcpName: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const source = await ctx.db.source.create({
      data:{
        name: input.name,
        vectorPrefix: input.vectorPrefix,
        userID: ctx.auth.userId!,
        gcpFileName: input.gcpName
      }
    })
    return source
  }),

  getSources: publicProcedure
  .query(async ({ ctx }) => {
    const sources = await ctx.db.source.findMany()
    return sources
  }),

  deleteSource: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.db.source.delete({
      where:{
        id: input.id
      }
    })
  }),

  getAssignments: publicProcedure
  .query(async ({ ctx }) => {
    const assignments = await ctx.db.assignment.findMany()
    return assignments
  }),

  createAssignment: publicProcedure
  .input(z.object({ name: z.string(), source: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const assignment = await ctx.db.assignment.create({
      data:{
        user: ctx.auth.userId as string,
        sourceId: input.source
      }
    })
    return assignment
  }),

  getAssignment: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const assignment = await ctx.db.assignment.findFirst({
      where:{
        id: input.id
      }
    })
    return assignment
  }),

  deleteAssignment: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.db.assignment.delete({
      where:{
        id: input.id
      }
    })
  }),

  createUser: publicProcedure
  .input(z.object({ id: z.string(), createdAt: z.date() }))
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.create({
      data:{
        id: input.id,
        signUpDate: input.createdAt, 
        actionsRemaining: 3,
        accountType: 'free'
      }
    })
    return user
  }),
  
  getRemainingUserActions: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findFirst({
      where:{
        id: input.id
      }
    })
    return user?.actionsRemaining
  }),

  updateUser: publicProcedure
  .input(z.object({ id: z.string(), actionsRemaining: z.number() }))
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.update({
      where:{
        id: input.id
      },
      data:{
        actionsRemaining: input.actionsRemaining
      }
    })
    return user
  }),
});