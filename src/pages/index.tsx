import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/pages/components/Header";
import LandingHero from "@/pages/landing/hero";
import HowItWorks from "@/pages/landing/howitworks";
import WhyChoose from '@/pages/landing/whychoose';
import Testimonials from "./landing/testimonals";
import PricingPlans from "./landing/pricing";
import CallToAction from "./landing/call-to-action";
import Footer from "./landing/footer";
import { api } from "@/utils/api";


export default function Home() {
  const { user } = useUser()
  const router = useRouter()
  const [userDetails, setUserDetails] = useState<any>(null)
  const getUser = api.dbOperations.getUser.useQuery({ id: user?.id! }, { enabled: false })
  // useEffect(() => {
  //   user ? router.push('/profile') : null
  // }, [user])
  useEffect(() => {
    if (user) {
      new Promise((resolve, reject) => {
        if (userDetails) {
          resolve(userDetails)
        } else {
          getUser.refetch()
            .then((user) => {
              setUserDetails(user)
              resolve(user)
            })
            .catch(reject)
        }
      })
    }
    console.log(userDetails)
  }, [user])
  return (
    <div className="overflow-hidden relative text-white bg-dark flex flex-col items-center">
      <Header />
      <div className="w-screen mx-auto">
        <LandingHero />
        <HowItWorks />
        <WhyChoose />
        <Testimonials />
        <PricingPlans />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}
