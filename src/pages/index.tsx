import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "@/pages/components/Header";
import LandingHero from "@/pages/landing/hero";
import HowItWorks from "@/pages/landing/howitworks";


export default function Home() {
  const { user } = useUser()
  const router = useRouter()
  // useEffect(() => {
  //   user ? router.push('/profile') : null
  // }, [user])

  return (
    <div className="overflow-hidden relative text-white bg-dark">
      <Header />
      <div className="w-screen h-screen">
          <LandingHero />
          <HowItWorks />
      </div>
      <div className='absolute z-20 w-[80rem] h-[100rem] -rotate-45 bg-primary rounded-full blur-3xl right-[48rem] bottom-4 opacity-[1%]'></div>
      <div className='absolute z-20 w-[80rem] h-[100rem] rotate-45 bg-secondary rounded-full blur-3xl left-[48rem] top-4 opacity-[1%]'></div>
    </div>
  );
}
