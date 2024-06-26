import React from 'react';
import FullLogo from '../images/logo';
import BrainIcon from '../images/brain-icon';
import Tooltip from './general/tooltip';
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';

type Props = {
    containerClassName?: string
    removeList?: boolean
    profile?: boolean
    earlyAccessButton?: boolean
    divRef?: any
    focusRef?: any
};

export default function Header({ containerClassName, removeList, profile, earlyAccessButton, divRef, focusRef }: Props) {
    const router = useRouter();
    const { openSignUp, redirectToSignUp } = useClerk()

    const scrollToElement = () => {
        const { current } = divRef
        console.log(current)
        if (current !== null) {
            current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const focus = () => {
        focusRef.current?.focus()
    }

    return (
        <header className={classNames('w-full h-fit flex justify-center items-center pt-6 z-0 pl-4 pr-4 z-30', containerClassName)}>

            <div className=' w-[75rem] flex flex-col md:flex-row justify-between items-center'>

                <div className='hover:cursor-pointer' onClick={() => {
                    router.push('/')
                }}>
                    <FullLogo className='max-w-[225px] h-fit xs:flex-shrink lg:flex-shrink-0 mb-4 md:mb-0' />
                </div>

                {!profile ? <ul className='flex justify-center items-center text-white gap-6'>
                    {!removeList ? <ul className='flex flex-col md:flex-row'>
                        <li className='hover:cursor-pointer transition-all hover:opacity-80 mb-2 md:mb-0' onClick={scrollToElement}>Pricing</li>
                    </ul> : null}
                    {!earlyAccessButton ? <li className='transition-all hover:opacity-80 bg-gradient-to-r from-primary to-secondary w-full md:w-24 h-fit hover:cursor-pointer rounded-3xl flex justify-center items-center p-[1px]'>
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
                    </li> :
                        <li className='transition-all hover:opacity-80 bg-gradient-to-r from-primary to-secondary w-full md:w-fit h-fit hover:cursor-pointer rounded-3xl flex justify-center items-center p-[1px]'>
                            <button className='py-2 px-4 whitespace-nowrap'
                                onClick={focus}>Register Early</button>
                        </li>}
                </ul> : <div onMouseOver={() => {
                    console.log('hover')
                }}>
                    <ul className='flex justify-center items-center text-white gap-6'>
                        <Tooltip text='Premium' spanClassName='w-[5rem] text-center'>
                            <BrainIcon className='w-12 h-12' />
                        </Tooltip>
                        <li className='transition-all hover:opacity-80 bg-gradient-to-r from-primary to-secondary w-full md:w-24 h-fit hover:cursor-pointer rounded-3xl flex justify-center items-center p-[1px]'>
                            <button className='pt-2 pb-2 pl-4 pr-4 whitespace-nowrap'
                                onClick={() => {
                                    redirectToSignUp()
                                }}>
                                Sign Out</button>
                        </li>
                    </ul>
                </div>}
            </div>

        </header>
    );
}
