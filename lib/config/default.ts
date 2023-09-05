import {env} from '@/src/env.mjs'

const customConfig: {
    port: number;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
    origin: string;
    dbUri: string;
    accessTokenPrivateKey: string;
    refreshTokenPrivateKey: string;
    accessTokenPublicKey: string;
    refreshTokenPublicKey: string;
    redisCacheExpiresIn: number;
  } = {
    port: 8000,
    accessTokenExpiresIn: 15,
    refreshTokenExpiresIn: 60,
    origin: env.NEXT_PUBLIC_APP_URL,
    redisCacheExpiresIn: 60,
  
    dbUri: env.DATABASE_URL ,
    accessTokenPrivateKey: env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: env.REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: env.REFRESH_TOKEN_PUBLIC_KEY,
  };
  
  export default customConfig;
  