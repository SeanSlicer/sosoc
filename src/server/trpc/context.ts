import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { prisma } from '@/lib/client/db'

export const createContext = (opts: CreateNextContextOptions) => {
  const { req, res } = opts
  return {
    req,
    res,
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>