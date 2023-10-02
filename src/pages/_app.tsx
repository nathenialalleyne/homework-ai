import { type AppType } from "next/app";
import { ClerkProvider } from '@clerk/nextjs'

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { Lato } from 'next/font/google'

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
      <ClerkProvider  {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
