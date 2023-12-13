import { type AppType } from "next/app";
import { ClerkProvider } from '@clerk/nextjs'
import { Poppins } from "@next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: '--font-poppins'

})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${poppins.variable} font-sans`}>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7276895481826418"
        crossOrigin="anonymous">
      </script>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </main>
  )
};

export default api.withTRPC(MyApp);
