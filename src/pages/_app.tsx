import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import app from "~/components/auth";
import { getAnalytics, initializeAnalytics, isSupported } from "firebase/analytics";
import React from "react";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {

  React.useEffect(() => {
    const a = getAnalytics(app)
    void isSupported()
      .then((s) => {
        if(s) {
          initializeAnalytics(app)
        } else {
          console.log("Not supported")
        }
      })
  }, [])

  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-5539865102402934" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
