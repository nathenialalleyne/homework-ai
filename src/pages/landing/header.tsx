import React from 'react'
import Button from '../components/button'
import { SignUpButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function LandingHeader() {
    return (
        <div className='absolute z-50 rounded-b-xl w-8/12 h-fit flex justify-between items-center m-auto left-0 right-0 p-3 hover'>
            <Button text='ALTRAI' link="/" style='text-white text-xl font-bold caret-transparent bg-transparent p-0 hover:text-gray-200' />
            <div className='pr-4 flex gap-4'>
                <Button text='About' link='/pricing' style='bg-transparent p-2  text-white w-fit font-semibold transition-all ease-in-out hover:scale-110 hover:text-slate-200' />
                <Button text='Pricing' link='/pricing' style='bg-transparent p-2  text-white w-fit font-semibold transition-all ease-in-out hover:scale-110 hover:text-slate-200' />


                <SignedOut>
                    <SignInButton>
                        <Button text='Sign in' style='bg-transparent p-2 text-white w-fit font-semibold transition-all ease-in-out hover:scale-110 hover:text-slate-200' />
                    </SignInButton>

                    <SignUpButton>
                        <Button text='Sign up' style='bg-gradient-to-r from-yellow-200 via-yellow-400 to-rose-400 p-2 pl-4 pr-4 text-black w-fit font-semibold transition-all ease-in-out hover:scale-110' />
                    </SignUpButton>
                </SignedOut>

                <SignedIn>
                    <Button text='Profile' link='/dashboard' style='bg-white p-2 pl-4 pr-4 text-black w-fit font-semibold transition-all ease-in-out hover:scale-110' />
                </SignedIn>
            </div>
        </div>
    )
}
