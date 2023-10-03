import React from 'react'
import Grid from '../landing/grid'
import LandingHeader from '../landing/header'
import PriceBox from './price-box'

export default function Pricing() {
    return (
        <div className='w-screen h-screen bg-stone-900 overflow-hidden caret-transparent cursor-default'>
            <LandingHeader />
            <div className='absolute z-30 w-screen h-screen flex justify-center items-center gap-6'>
                <PriceBox price='0' plan='Free' features={['Sample and mimic your writing style', '5 Assignments Monthly', '1 Source per Assignment', 'Limited Revisions']} />
                <PriceBox price='15' plan='Premium' features={['Sample and mimic your writing style', 'Unlimited Monthly Assignments', 'Unlimited Sources per Assignment', 'Unlimited Revisions', 'AI-Powered Note Taking']} />
            </div>
            <Grid />
        </div>
    )
}
