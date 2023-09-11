import { jwtVerify, SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import type { NextResponse } from 'next/server'
import { env } from '../../src/env.mjs'

interface UserJwtPayload {
  jti: string
  iat: number
}


export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET_KEY))
    return verified.payload as UserJwtPayload
  } catch (err) {
    throw new Error('Your token has expired.')
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie(res: NextResponse, setExpirationHours : string) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(setExpirationHours + 'h')
    .sign(new TextEncoder().encode(env.JWT_SECRET_KEY))

  res.cookies.set('user-token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 2, // 2 hours in seconds
  })

  return res
}