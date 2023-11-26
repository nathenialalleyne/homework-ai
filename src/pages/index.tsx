import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "@/pages/components/Header";
import LandingHero from "@/pages/landing/hero";
import HowItWorks from "@/pages/landing/howitworks";
import WhyChoose from '@/pages/landing/whychoose';
import Image from "next/image";


export default function Home() {
  const { user } = useUser()
  const router = useRouter()
  // useEffect(() => {
  //   user ? router.push('/profile') : null
  // }, [user])

  return (
    <div className="overflow-hidden relative text-white bg-dark">
      <Header />
      <div className="w-screen ">
        <LandingHero />
        <HowItWorks />
        {/* <WhyChoose /> */}
      </div>
    </div>
  );
}
