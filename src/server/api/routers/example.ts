import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import ConvertAPI from 'convertapi';

const convertapi = new ConvertAPI('vWa4Gg1AWgDdVhep');


export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.instanceof(File) }))
    .query(async ({ input }) => {
      const converted = new Promise((res, rej) =>{
        convertapi.convert('pdf', {
          File: input.text,
        }, 'png').then(function(result) {
          // get converted file url
          result.file.save('test.png');
          res(result.file);
              })
      })
      return await converted;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.example.findMany();
  }),
});
