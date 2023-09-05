import { type AppType } from "next/app";

import { api } from "@/lib/client/trpc";

import "@/src/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
