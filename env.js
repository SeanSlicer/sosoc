import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]),
    // Data
    DATABASE_URL: z.string().min(1),
    //Auth
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET:z.string().min(1),
    // AWS
    AWS_REGION: z.string().min(1),
    BUCKET_NAME: z.string().min(1),
    AWS_ACCESS_KEY: z.string().min(1),
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
    GOOGLE_CLIENT_ID:  process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    // AWS
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    BUCKET_NAME: process.env.BUCKET_NAME,
  },
})