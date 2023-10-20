import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "@/src/env.mjs";
import { createContext } from "@/src/server/context";
import { appRouter } from "@/src/server/routers";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}:`, error);
        }
      : undefined,
});