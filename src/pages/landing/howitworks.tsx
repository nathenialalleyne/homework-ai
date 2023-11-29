import React from 'react';
import SectionHeading from '../components/section-heading';
import BoyImage from '../images/boy-image';
import LandingHeading from '@/pages/components/landing-header';
import Image from 'next/image';
import DotMatrix from '../images/dot-matrix';
import HowItWorksSection from '../components/how-it-works-section';
import HeroBox from '../components/box';

type Props = {};

export default function HowItWorks({ }: Props) {
    return (
        <div className='w-full h-fit flex mb-8 justify-center tracking-wide'>
            <div className='max-w-[1200px] w-full flex flex-col'>
                <div className='w-full flex justify-center'>
                    <LandingHeading sectionName='HOW IT WORKS' sectionHeadingClassName='mt-8' headingText='Unleash Your Writing Potential with GeniusDraft' paragraphText="Unlocking your personalized writing experience with GeniusDraft is as simple as 1-2-3. Here's a brief overview of our seamless process:" />
                </div>
                
                <div className='flex justify-between gap-20 md:flex-row mt-4'>

                    <div className='w-[35rem] relative z-10'>
                        <BoyImage className='z-[100]' />
                        <DotMatrix className='absolute top-8 -right-8 -z-[100]' />
                        <HeroBox top='10x Faster' bottom='Assignments Completion' className='absolute -bottom-3 -left-8' gradient opauge/>
                    </div>

                    <div className='flex flex-col grow-0 items-start h-full justify-end'>
                        <HowItWorksSection number={1} text='Submit Your Writing Sample' subText='Begin by providing a brief sample of your writing. This acts as the foundation for GeniusDraft to understand your unique writing style, tone, and preferences.' line lineContainerClassName='w-12 h-24 flex justify-center items-center' lineClassName='w-px h-24 bg-gradient-to-br from-primary from-30% to-secondary flex' />
                        <HowItWorksSection number={2} text='Select Your Preferred Sources' subText='Tailor your writing experience by choosing the specific sources you want GeniusDraft to incorporate into your assignments. Whether it’s academic journals, books, or online articles, you have the freedom to curate your references.' line lineContainerClassName='w-12 h-32 flex justify-center items-center' lineClassName='w-px h-32 bg-gradient-to-br from-primary from-30% to-secondary flex' />
                        <HowItWorksSection number={3} text='Let GeniusDraft Work Its Magic!' subText="Sit back and watch as GeniusDraft's powerful AI algorithms go to work. Our system analyzes your writing sample, integrates your selected sources, and generates a customized, well-researched assignment that mirrors your distinctive style." />

                    </div>
                </div>
            </div>
        </div>
    );
}
