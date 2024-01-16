import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
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

  const divRef = useRef(null)
  const focusRef = useRef(null)

  return (
    <div className="overflow-y-scroll overflow-x-hidden relative text-white bg-dark-100 flex flex-col items-center w-screen h-screen scrollbar scrolbar-thin scrollbar-thumb-lighter scrollbar-track-lighterDark">
      <Header divRef={divRef} focusRef={focusRef} />
      <div className="w-full mx-auto">
        <LandingHero ref={focusRef} />
        <HowItWorks />
        <WhyChoose />
        <Testimonials />
        <PricingPlans ref={divRef} />
        <CallToAction focusRef={focusRef} />
        <Footer />
      </div>
    </div>
  );
}
