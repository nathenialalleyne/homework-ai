import React from 'react';
import Image from 'next/image';
import HeroImage from '@/pages/images/hero-image';
import HeroBox from '@/pages/components/box';
import SectionHeading from '../components/section-heading';

type Props = {};

export default function LandingHero({ }: Props) {
    return (
        <div className='w-full h-fit flex flex-col font-bold text-center z-20 relative'>

            <div className='p-4 z-20'>
                <div className='text-left w-full shrink-0 flex items-center gap-10 flex-col'>
                    <div className='flex gap-10 flex-col'>
                        <div className='flex'>
                            <div className='space-y-4 w-full flex flex-col'>
                                <SectionHeading className='mt-32'>
                                    WELCOME TO GENIUSDRAFT
                                </SectionHeading>
                                <h1 className='font-semibold text-5xl max-w-[35rem] tracking-wide'>
                                    Your Personal Writing Assistant!
                                </h1>
                                <p className='text-xl max-w-[35rem] font-extralight tracking-wide'>
                                    Are you a college or high school student looking to elevate your writing game? Say goodbye to the struggle of endless assignments and welcome a revolutionary solution – GeniusDraft! Our cutting-edge app transforms the way you approach writing tasks, making academic life smoother and more efficient.
                                </p>
                                <div className='w-full'>
                                    <button className='bg-gradient-to-b from-primary to-secondary p-4 rounded-full text-black hover:cursor-pointer'>
                                        Sign up for Early Access
                                    </button>
                                </div>
                            </div>
                            <div className='w-full mt-32'>
                                <HeroImage className='h-auto max-w-full z-10 w-full' />
                            </div>
                        </div>
                        <div className='flex mt-12 w-full justify-between items-center'>
                            <HeroBox top='95%' bottom='User Satisfaction' />
                            <HeroBox top='40%' bottom='Time Boost' />
                            <HeroBox top='98%' bottom='Accurate Style Matching' />
                            <HeroBox top='100+' bottom='Successful Assignments' />
                        </div>
                    </div>
                </div>
            </div>

            <Image src='/assets/grid.png' alt='' width={1000} height={1000} className='absolute w-full h-full object-cover z-0' />
            <div className='absolute z-20 w-[80vw] h-[100vh] -rotate-45 bg-primary rounded-full blur-3xl right-[40vw] bottom-4 opacity-[1%]'></div>
            <div className='absolute z-20 w-[80vw] h-[100vh] -rotate-45 bg-secondary rounded-full blur-3xl left-[40vw] bottom-[4vh] opacity-[2%]'></div>
        </div>
    );
}
