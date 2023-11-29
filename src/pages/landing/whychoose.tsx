import React from 'react'

import LandingHeader from '../components/landing-header'
import Card from '../components/card'

type Props = {}

export default function WhyChoose({ }: Props) {
    return (
        <div className='w-full mb-16'>
            <div className='w-full flex justify-center'>
                <div className='max-w-[1200px] w-full flex flex-col items-center'>
                    <div className='p-4 mt-8'>
                        <LandingHeader sectionName='WHY CHOOSE GENIUSDRAFT' headingText='Unlock Your Potential With GeniusDraft' paragraphText='Discovert the compelling reasons why GeniusDraft is the key to unlocking your writing potential' />
                    </div>
                    <div className='flex gap-4 '>
                        <Card icon='wcicon3.png' headingText='Tailored Writing Experience' paragraphText='GeniusDraft goes beyond generic solutions. Experience the power of tailored writing as our AI learns and adapts to your unique style, ensuring every assignment reflects your individual voice.'/>
                        <Card icon='wcicon2.png' headingText='Source Integration' paragraphText='Take control of your research and broaden your perspectives. With GeniusDraft, seamlessly integrate the sources that matter to you, enhancing the depth and credibility of your assignments.' />
                        <Card icon='wcicon1.png' headingText='Efficiency Redefined' paragraphText='Bid farewell to the time-consuming assignment struggle. GeniusDraft streamlines writing, letting you reclaim precious time for what truly matters in your academic journey.' />
                    </div>

                </div>
            </div>
        </div>
    )
}