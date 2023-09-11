import { TRPCError } from '@trpc/server';
import cookie from 'cookie';
import { SignJWT } from 'jose';
import { z } from 'zod';
import { env } from '@/src/env.mjs';
import { publicProcedure, router } from '../trpc';
import { getUserByUsernameOrEmailAndPassword } from '@/prisma/queries/auth/getUser';
import { createUser } from '@/prisma/queries/auth/signUp';
import { signUpSchema } from '@/src/validation/auth/auth';

export const userRouter = router({
  login: publicProcedure
    .input(z.object({ usernameOrEmail: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { res } = ctx;
      const { usernameOrEmail, password } = input;

      const user = await getUserByUsernameOrEmailAndPassword(usernameOrEmail, password);

      if (user) {
        // User is authenticated
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: 'HS256' })
          .setSubject(user.id)
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(new TextEncoder().encode(env.JWT_SECRET_KEY));

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('user-token', token, {
            httpOnly: true,
            path: '/',
            //secure: env.NODE_ENV === 'development',
          })
        );

        return { success: true };
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid username or password',
      });
    }),
    signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { res } = ctx;
      const { username, email, password } = input;

      const user = await createUser(username, email, password);

      if (user) {
        // User is authenticated
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: 'HS256' })
          .setSubject(user.id)
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(new TextEncoder().encode(env.JWT_SECRET_KEY));

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('user-token', token, {
            httpOnly: true,
            path: '/',
            //secure: env.NODE_ENV === 'development',
          })
        );

        return { success: true };
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not created',
      });
    }),
    signOut: publicProcedure
    .mutation(({ctx }) => {
      const { res } = ctx;
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('user-token', '', {
          httpOnly: true,
          path: '/',
          //secure: env.NODE_ENV === 'development',
        })
      );

      return { success: true };
      
    }),
  });
