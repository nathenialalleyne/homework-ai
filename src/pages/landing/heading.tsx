import React from 'react'
import Button from '@/components/button'

export default function LandingHeading() {
    return (
        <div className='z-40 absolute w-screen h-screen flex flex-col justify-center items-center text-center font-sans hover:cursor-default caret-transparent'>
            <div className='mb-4 flex flex-col justify-center items-center gap-4'>
                <h1 className='text-white text-6xl font-bold'>
                    Academic Excellence, <span className='text-yellow-200'>Automated.</span>
                </h1>
                <h2 className='text-white text-2xl w-6/12 font-extralight'>
                    Say goodbye to late nights and writer's block. Altrai is your ultimate homework companion, powered by AI, designed for your success.
                </h2>
            </div>

            <div className='flex gap-8 items-center justify-center'>
                <Button text='Sign up for early access' style='bg-gradient-to-r from-yellow-200 via-yellow-400 to-rose-400 p-2 pl-4 pr-4 text-black w-fit font-semibold transition-all ease-in-out hover:scale-110' />
            </div>
        </div>
    )
}
