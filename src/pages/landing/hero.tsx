import React from 'react'
import Grid from '@/pages/components/grid'
import Image from 'next/image'
import HeroImage from '@/pages/images/hero-image'
import HeroBox from '@/pages/components/box'

type Props = {}

export default function LandingHero({ }: Props) {
    return (
        <div className='w-screen h-screen flex flex-col font-bold text-center z-20 relative overflow-hidden'>

            <div className='text-left w-full shrink grow-0 flex pl-24 pr-24'>

                <div className='space-y-4 w-fit flex flex-col '>
                    <h2 className='font-normal bg-gradient-to-br from-primary from-30% to-secondary bg-clip-text text-transparent text-2xl mt-32 w-fit h-fit'>
                        WELCOME TO GENIUSDRAFT
                    </h2>
                    <h1 className='font-semibold text-5xl w-9/12 tracking-wide'>
                        Your Personal Writing Assistant!
                    </h1>
                    <p className='w-9/12 text-xl font-extralight tracking-wide'>
                        Are you a college or high school student looking to elevate your writing game? Say goodbye to the struggle of endless assignments and welcome a revolutionary solution – GeniusDraft! Our cutting-edge app transforms the way you approach writing tasks, making academic life smoother and more efficient.
                    </p>
                    <div>
                        <button className='bg-gradient-to-b from-primary to-secondary p-4 rounded-3xl text-black hover:cursor-pointer'>
                            Sign up for Early Access
                        </button>
                    </div>
                </div>

                {/* <Image src='/assets/heroimage.png' alt='' width={1000} height={1000} className='w-fit h-fit z-20'/> */}
                <div className='w-full flex justify-start items-center mt-32 mr-32'>
                    <HeroImage className='w- h-fit z-10 ' />
                </div>
            </div>
            <div className='flex pl-24 pr-64 justify-center item-center gap-4 mt-12'>
                <HeroBox top='95%' bottom='User Satisfaction' />
                <HeroBox top='40%' bottom='Time Boost' />
                <HeroBox top='98%' bottom='Accurate Style Matching' />
                <HeroBox top='100+' bottom='Successful Assignments' />


            </div>
            <Image src='/assets/grid.png' alt='' width={1000} height={1000} className='absolute w-full h-full object-cover -z-10' />
        </div>
    )
}