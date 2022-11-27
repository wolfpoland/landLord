import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import Layout from "./layout";
import { trpc } from "../utils/trpc";
import { Session } from "next-auth";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
