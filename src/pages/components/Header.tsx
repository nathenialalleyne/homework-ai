import React from 'react';
import FullLogo from '../images/logo';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';

type Props = {};

export default function Header({ }: Props) {
    return (
        <header className='w-full h-fit flex justify-center items-center pt-6 z-0 pl-4 pr-4 md:pl-64 md:pr-64 z-30'>

            <div className='w-full max-w-[75rem] flex flex-col md:flex-row justify-between items-center'>
                <FullLogo className='max-w-[225px] h-fit xs:flex-shrink lg:flex-shrink-0 mb-4 md:mb-0' />

                <ul className='flex justify-center items-center text-white gap-6'>
                    <ul className='flex flex-col md:flex-row'>
                        <li className='hover:cursor-pointer transition-all hover:opacity-80 mb-2 md:mb-0 md:mr-6'>Features</li>
                        <li className='hover:cursor-pointer transition-all hover:opacity-80 mb-2 md:mb-0'>Premium</li>
                    </ul>       
                    <li className='transition-all hover:opacity-80 bg-gradient-to-r from-primary to-secondary w-full md:w-24 h-fit hover:cursor-pointer rounded-3xl flex justify-center items-center p-[1px]'>
                        <SignedOut>
                            <SignUpButton mode='redirect'>
                                <button className='pt-2 pb-2 pl-4 pr-4'>Sign Up</button>
                            </SignUpButton>
                        </SignedOut>

                        <SignedIn>
                            <Link href={'/profile'}>
                                <button className='pt-2 pb-2 pl-4 pr-4 whitespace-nowrap'>Home</button>
                            </Link>
                        </SignedIn>
                    </li>
                </ul>
            </div>

        </header>
    );
}
