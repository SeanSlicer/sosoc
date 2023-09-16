import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { verifyAuth } from '../../../lib/client/auth'

import { type Context } from './context'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  const { req } = ctx
  const token = req.cookies['user-token']

  if (!token) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Missing user token' })
  }
  const verifiedToken = await verifyAuth(token)

  if (!verifiedToken) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid user token' })
  }

  return next()
})

export const router = t.router

export const publicProcedure = t.procedure
export const userProcedure = t.procedure.use(isAuthenticated)