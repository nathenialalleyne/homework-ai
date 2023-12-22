import React, { useState } from 'react';
import Image from 'next/image';
import HeroImage from '@/pages/images/hero-image';
import HeroBox from '@/pages/components/box';
import SectionHeading from '../components/section-heading';
import { api } from '@/utils/api';
import Loader from '../images/loader';

type Props = {};

export default React.forwardRef(function LandingHero({ }: Props, ref: React.Ref<HTMLInputElement>) {
    const [email, setEmail] = useState('')
    const addToEarlyAccessList = api.earlyAccessRouter.addToEmailList.useMutation();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await addToEarlyAccessList.mutateAsync({ email })
    }
    return (
        <div className='w-full h-fit flex flex-col font-bold text-center z-20 relative'>

            <div className='p-4 z-20'>
                <div className='text-left w-full shrink-0 flex items-center gap-10 flex-col'>
                    <div className='flex gap-10 flex-col max-w-[75rem] w-full sm:justify-center xs:items-center md:p-4 lg:p-0'>
                        <div className='flex'>
                            <div className='space-y-4 w-full flex flex-col lg:text-left xs:text-center'>
                                <SectionHeading className='mt-32 xs:text-center xs:w-full lg:w-fit'>
                                    WELCOME TO GENIUSDRAFT
                                </SectionHeading>
                                <h1 className='font-semibold text-5xl max-w-[35rem] tracking-wide'>
                                    Your Personal Writing Assistant!
                                </h1>
                                <p className='text-xl max-w-[35rem] font-extralight tracking-wide'>
                                    Are you a college or high school student looking to elevate your writing game? Say goodbye to the struggle of endless assignments and welcome a revolutionary solution – GeniusDraft! Our cutting-edge app transforms the way you approach writing tasks, making academic life smoother and more efficient.
                                </p>
                                <div className='w-full'>
                                    {/* <SignedOut>
                                        <SignUpButton mode='redirect'>
                                            <button
                                                className='hover:opacity-80 transition-all bg-gradient-to-b from-primary to-secondary p-4 rounded-full text-black hover:cursor-pointer z-40'>
                                                Try GeniusDraft Today!
                                            </button>
                                        </SignUpButton>
                                    </SignedOut>

                                    <SignedIn>
                                        <Link href={'/profile'}>
                                            <button
                                                className='hover:opacity-80 transition-all bg-gradient-to-b from-primary to-secondary p-4 rounded-full text-black hover:cursor-pointer z-40'>
                                                Go to Dashboard
                                            </button>
                                        </Link>
                                    </SignedIn> */}
                                    <form className='w-full flex flex-col gap-2' action="submit" onSubmit={submit}>
                                        {!addToEarlyAccessList.isLoading ?
                                            <div className='w-full flex'>
                                                <input
                                                    onChange={(e) => {
                                                        setEmail(e.target.value)
                                                    }} type='email'
                                                    minLength={1}
                                                    placeholder='johndoe@email.com'
                                                    className='w-8/12 h-16 rounded-l-xl p-4 outline-none text-black font-normal  focus:ring focus:ring-primary focus:ring-opacity-50'
                                                    ref={ref}
                                                />

                                                <button
                                                    className='transition-all bg-gradient-to-b from-primary font-semibold to-secondary rounded-r-xl h-16 text-black hover:opacity-80 z-40 flex items-center justify-between px-2 md:w-3/12 xs:w-4/12'>
                                                    Register for Early Access
                                                </button>
                                            </div> :
                                            <Loader />
                                        }
                                        {addToEarlyAccessList.isError ?
                                            <div className='text-red-300'>Error! Please try again.</div> :
                                            addToEarlyAccessList.data && addToEarlyAccessList.data?.status == 'ok' ?
                                                <div className='bg-gradient-to-tl from-primary to-secondary text-transparent bg-clip-text'>Thank you for signing up!</div> :
                                                addToEarlyAccessList.data && addToEarlyAccessList.data?.status == 'registered' &&
                                                <div className='text-red-300'>You've already signed up for early access!</div>}
                                    </form>
                                </div>
                            </div>
                            <div className='w-full mt-32 xs:hidden lg:block'>
                                <HeroImage className='h-auto max-w-full z-10 w-full ' />
                            </div>
                        </div>
                        <div className='lg:flex mt-12 w-full justify-between items-center xs:grid grid-rows-2 grid-cols-2 place-content-center xs:w-fit xs:gap-4'>

                            <HeroBox top='95%' bottom='User Satisfaction' gradient />
                            <HeroBox top='40%' bottom='Time Boost' gradient />
                            <HeroBox top='98%' bottom='Accurate Style Matching' gradient />
                            <HeroBox top='100+' bottom='Successful Assignments' gradient />

                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full h-full relative flex items-center justify-center'>
                <Image src='/assets/grid.png' alt='' width={1600} height={1600} className='absolute w-[100rem] h-[50rem] object-cover z-0 bottom-6 ' />
            </div>
            <div className='absolute z-10 w-[80vw] h-[100vh] -rotate-45 bg-primary rounded-full blur-3xl right-[40vw] bottom-4 opacity-[1%]'></div>
            <div className='absolute z-10 w-[80vw] h-[100vh] -rotate-45 bg-secondary rounded-full blur-3xl left-[40vw] bottom-[4vh] opacity-[2%]'></div>
        </div>
    );
})
