import React from 'react';
import SectionHeading from '../components/section-heading';
import BoyImage from '../images/boy-image';
import LandingHeading from '@/pages/components/landing-header';
import Image from 'next/image';
import DotMatrix from '../images/dot-matrix';

type Props = {};

export default function HowItWorks({ }: Props) {
    return (
        <div className='w-full h-fit flex mb-8 tracking-wide'>
            <div className='w-full flex flex-col'>
                <div className='w-full flex justify-center'>
                    <LandingHeading sectionName='HOW IT WORKS' sectionHeadingClassName='mt-8' headingText='Unleash Your Writing Potential with GeniusDraft' paragraphText="Unlocking your personalized writing experience with GeniusDraft is as simple as 1-2-3. Here's a brief overview of our seamless process:" />
                </div>
                <div className='flex flex-col gap-20 ml-32 md:flex-row mt-4'>

                    <div className='w-[35rem] relative z-10'>
                        <BoyImage className='z-[100]' />
                        <DotMatrix className='absolute top-8 -right-8 -z-[100]' />
                    </div>

                    <div className='flex flex-col grow-0 items-start h-full justify-end'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <div className='flex p-[1px] w-12 h-12 bg-gradient-to-br from-primary from-30% to-secondary rounded-full'>
                                    <div className='w-full h-full rounded-full bg-dark flex justify-center items-center'>
                                        <div className='bg-gradient-to-br from-primary from-30% to-secondary bg-clip-text text-transparent text-2xl font-bold after:content-["*"]after:w-20 after:h-24 after:bg-white'>
                                            1
                                        </div>
                                    </div>
                                </div>
                                <h3 className='text-2xl font-light'>Submit Your Writing Sample</h3>
                            </div>
                            <div className='flex gap-2'>
                                <div className='w-12 h-24 flex justify-center items-center'>
                                    <div className='w-px h-24 bg-gradient-to-br from-primary from-30% to-secondary flex' />
                                </div>
                                <div className=''>
                                    <p className='w-[25rem] text-sm font-extralight text-gray-300'>Begin by providing a brief sample of your writing. This acts as the foundation for GeniusDraft to understand your unique writing style, tone, and preferences.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center gap-2'>
                                <div className='flex p-[1px] w-12 h-12 bg-gradient-to-br from-primary from-30% to-secondary rounded-full'>
                                    <div className='w-full h-full rounded-full bg-dark flex justify-center items-center'>
                                        <div className='bg-gradient-to-br from-primary from-30% to-secondary bg-clip-text text-transparent text-2xl font-bold after:content-["*"]after:w-20 after:h-24 after:bg-white'>
                                            2
                                        </div>
                                    </div>
                                </div>
                                <h3 className='text-2xl font-light'>Select Your Preferred Sources</h3>
                            </div>
                            <div className='flex gap-2'>
                                <div className='w-12 h-32 flex justify-center items-center'>
                                    <div className='w-px h-32 bg-gradient-to-br from-primary from-30% to-secondary flex' />
                                </div>
                                <div className=''>
                                    <p className='w-[25rem] text-sm font-extralight text-gray-300'>
                                        Tailor your writing experience by choosing the specific sources you want GeniusDraft to incorporate into your assignments. Whether it's academic journals, books, or online articles, you have the freedom to curate your references.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center gap-2'>
                                <div className='flex p-[1px] w-12 h-12 bg-gradient-to-br from-primary from-30% to-secondary rounded-full'>
                                    <div className='w-full h-full rounded-full bg-dark flex justify-center items-center'>
                                        <div className='bg-gradient-to-br from-primary from-30% to-secondary bg-clip-text text-transparent text-2xl font-bold after:content-["*"]after:w-20 after:h-24 after:bg-white'>
                                            3
                                        </div>
                                    </div>
                                </div>
                                <h3 className='text-2xl font-light'>Let GeniusDraft Work It's Magic!</h3>
                            </div>
                            <div className='ml-14'>
                                <p className='w-[25rem] text-sm font-extralight text-gray-300'>
                                    Sit back and watch as GeniusDraft's powerful AI algorithms go to work. Our system analyzes your writing sample, integrates your selected sources, and generates a customized, well-researched assignment that mirrors your distinctive style.                                    </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
