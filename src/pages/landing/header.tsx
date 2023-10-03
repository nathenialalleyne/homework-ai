import React from 'react'
import Button from '../components/button'
import Image from 'next/image'

export default function LandingHeader() {
    return (
        <div className='absolute z-50 rounded-b-xl w-8/12 h-fit flex justify-between items-center m-auto left-0 right-0 p-3 hover'>
            <Button text='ALTRAI' link="/" style='text-white text-xl font-bold caret-transparent bg-transparent p-0' />
            <div className='pr-4 flex gap-4'>
                <Button text='About' link='/about' style='bg-transparent p-2  text-white w-fit font-semibold transition-all ease-in-out hover:scale-110 hover:text-slate-200' />
                <Button text='Pricing' link='/pricing' style='bg-transparent p-2  text-white w-fit font-semibold transition-all ease-in-out hover:scale-110 hover:text-slate-200' />
                <Button text='Sign in' style='bg-transparent p-2 text-white w-fit font-semibold transition-all ease-in-out hover:scale-110 hover:text-slate-200' />
                <Button text='Sign up' style='bg-gradient-to-r from-yellow-200 via-yellow-400 to-rose-400 p-2 pl-4 pr-4 text-black w-fit font-semibold transition-all ease-in-out hover:scale-110' />
            </div>
        </div>
    )
}
