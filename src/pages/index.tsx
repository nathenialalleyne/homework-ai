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
    <div className="overflow-hidden text-white bg-dark pl-32 pr-32">
      <div className="w-screen h-screen">
        <Header />
        <LandingHero />
        <HowItWorks />
      </div>
    </div>
  );
}
