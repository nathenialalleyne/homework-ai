import React from 'react'
import RobotSVG from '../images/robot'
import LandingHeader from '../components/landing-header'

type Props = {}

export default function CallToAction({ }: Props) {
    return (
        <div className='w-full flex justify-center items-center mt-16 mb-16 z-[100]'>
            <div className='bg-black w-[75rem] h-[32rem] rounded-xl flex justify-between items-center p-12'>
                <div className='w-1/2 h-full flex flex-col justify-center space-y-4'>
                    <h2 className='text-5xl font-semibold'>Ready to boost your academic success?</h2>
                    <p className='w-10/12 font-extralight text-lg'>Empower your academic journey with personalized, efficient writing. Seize the opportunity to excel in your assignments effortlessly.</p>
                    <button className='hover:opacity-80 transition-all font-bold bg-gradient-to-b from-primary to-secondary p-4 rounded-full text-black hover:cursor-pointer z-40 w-fit'>
                        Get Started Now
                    </button>
                </div>

                <RobotSVG />
            </div>
        </div>
    )
}