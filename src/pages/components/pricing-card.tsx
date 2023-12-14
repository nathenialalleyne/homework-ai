import React, { useState } from 'react'
import SectionHeading from './section-heading'
import Image from 'next/image'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'
import Loader from '@/pages/images/loader'
import { redirectToSignUp, useUser } from '@clerk/nextjs'
import { RedirectToSignUp, SignOutButton, SignUp, useSignIn, useSignUp } from '@clerk/clerk-react'


type Props = {
    plan: string
    price: string
    features: string[]
    buttonText: string
    description: string
    free?: boolean,
    clicked?: boolean,
    setClicked?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PricingCard({
    plan,
    price,
    features,
    buttonText,
    description,
    free,
    clicked,
    setClicked
}: Props) {

    const [url, setUrl] = useState<string>()
    const router = useRouter()
    const user = useUser()
    const { signUp } = useSignUp()

    const createCheckout = api.stripeRouter.createCheckoutSession.useMutation()
    const getSession = api.stripeRouter.getSession.useMutation()

    const handleCheckout = async () => {
        setClicked?.(!clicked)
        return new Promise<string | undefined>(async (resolve) => {
            await createCheckout.mutateAsync({ URL: window.location.href }, {
                onSuccess: async (data) => {
                    await getSession.mutateAsync({ sessionID: data.sessionID }, {
                        onSuccess: async (data) => {
                            const checkoutUrl = data.url!;
                            setUrl(checkoutUrl);
                            resolve(checkoutUrl);
                        }
                    })
                }
            })
        });
    }
    return (
        <div className='flex flex-col bg-gradient-to-br from-primary to-secondary w-1/3 p-[1px] h-[550px] rounded-lg'>
            <div className='bg-stone-900 w-full h-full p-4 flex flex-col justify-between rounded-lg'>
                <SectionHeading className=''>{plan}</SectionHeading>
                <h2 className='text-4xl'>{price}</h2>
                <p className='font-extralight text-gray-300'>{description}</p>
                <ul className='flex flex-col justify-between h-[200px]'>
                    {features?.map((feature) => (
                        <li className='flex w-full items-center gap-2'>
                            <Image src={'/assets/check.png'} alt='check mark' width={5} height={5} className='w-fit h-fit' />
                            <p className='font-extralight'>{feature}</p>
                        </li>
                    ))}
                </ul>
                {!free ?
                    !clicked ?
                        <button onClick={async () => {
                            if (user.isLoaded && !user.isSignedIn) {
                                router.push('https://pretty-jay-28.accounts.dev/sign-up*')
                                return
                            }

                            try {
                                const hold = await handleCheckout()
                                if (hold) {
                                    router.push(hold)
                                } else {
                                    setClicked?.(!clicked)
                                }
                            } catch (err) {
                                console.log(err)
                            } finally {
                                setClicked?.(!clicked)
                            }
                        }}
                            className='hover:opacity-80 transition-all bg-gradient-to-b from-primary to-secondary p-4 rounded-full text-black hover:cursor-pointer z-40 w-full h-12 p-[1px]'>
                            <div className='w-full h-full bg-stone-900 rounded-full flex items-center justify-center text-white'>{buttonText}</div>
                        </button> :
                        <Loader className='w-12 h-12' /> :
                    !clicked ? <button className='hover:opacity-80 transition-all bg-gradient-to-b from-primary to-secondary p-4 rounded-full text-black hover:cursor-pointer z-40 w-full h-12'>
                        <div className='w-full h-full rounded-full flex items-center justify-center'>{buttonText}</div>
                    </button> :
                        <Loader className='w-12 h-12' />
                }
            </div>
        </div>
    )
}