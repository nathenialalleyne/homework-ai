import React from 'react'
import Grid from '../landing/grid'
import LandingHeader from '../landing/header'
import PriceBox from './price-box'
import AboutParagraph from './about'

export default function Pricing() {
    return (
        <div className='w-screen h-screen bg-stone-900 overflow-hidden caret-transparent cursor-default'>
            <LandingHeader />
                <div className='absolute z-30 w-screen h-screen flex flex-col justify-center items-center gap-6'>
                <AboutParagraph />
                <h2 className='text-white text-5xl font-bold'>Plans and Pricing</h2>
                <div className='w-screen flex justify-center items-center gap-4'>
                        <PriceBox price='0' plan='Free' features={['Sample and mimic your writing style', '5 Assignments Monthly', '1 Source per Assignment', 'Limited Revisions']} />
                        <PriceBox price='15' plan='Premium' features={['Sample and mimic your writing style', 'Unlimited Monthly Assignments', 'Unlimited Sources per Assignment', 'Unlimited Revisions', 'AI-Powered Note Taking']} />
                    </div>
            </div>
            <Grid />
        </div>
    )
}
