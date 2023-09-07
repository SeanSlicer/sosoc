import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/src/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  secureAction: publicProcedure.mutation(({ctx}) =>{

    const {} = ctx

    return {data: 'sensitive information'}
  })
  
});
