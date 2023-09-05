import  {prisma}  from './db';
import { type Prisma} from '@prisma/client'
import customConfig from '../config/default';
import { kv } from "@vercel/kv";
import { signJwt } from '../utils/jwt';

export const createUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  }));
};

export const findUser = async (
  where: Prisma.UserWhereInput,
  select?: Prisma.UserSelect
) => {
  return await prisma.user.findFirst({
    where,
    select,
  })!;
};

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect
) => {
  return await prisma.user.findUnique({
    where,
    select,
  })!;
};

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.update({ where, data, select }));
};

export const signTokens = async (user: Prisma.UserCreateInput) => {
  // 1. Create Session
  await kv.set(`${user.id}`, JSON.stringify(user), {
    ex: customConfig.redisCacheExpiresIn * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${customConfig.accessTokenExpiresIn}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${customConfig.refreshTokenExpiresIn}m`,
  });

  return { access_token, refresh_token };
};
