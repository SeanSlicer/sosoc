import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]),
    // Data
    DATABASE_URL: z.string().min(1),
    //Auth
    JWT_SECRET_KEY: z.string().min(1),
    ACCESS_TOKEN_PUBLIC_KEY: z.string().min(1),
    REFRESH_TOKEN_PRIVATE_KEY: z.string().min(1),
    REFRESH_TOKEN_PUBLIC_KEY: z.string().min(1),
    // AWS
    AWS_REGION: z.string().min(1),
    BUCKET_NAME: z.string().min(1),
    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // Data
    DATABASE_URL: process.env.DATABASE_URL,
    //Auth
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    ACCESS_TOKEN_PUBLIC_KEY: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    REFRESH_TOKEN_PUBLIC_KEY: process.env.REFRESH_TOKEN_PUBLIC_KEY,
    // AWS
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    BUCKET_NAME: process.env.BUCKET_NAME,
  },
})