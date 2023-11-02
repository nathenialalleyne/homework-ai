import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Home() {
  const { user } = useUser()
  const router = useRouter()
  useEffect(() => {
    user ? router.push('/profile') : null
  }, [user])

  return (
    <>
      <SignInButton />
    </>
  );
}
