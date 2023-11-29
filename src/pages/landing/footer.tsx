import React from 'react'
import Logo from '../images/logo'
import TwitterLogo from '../images/twitter'
import InstagramLogo from '../images/instagram'

type Props = {}

export default function Footer({ }: Props) {
    return (
        <footer className='w-full flex justify-center items-center flex-col relative'>
            <div className='w-[75rem] h-px bg-gradient-to-l from-dark/20 via-stone-500 to-dark/20 z-20'></div>
            <div className='w-[75rem] h-[15rem] flex justify-between items-center'>
                <Logo />
                <p>&copy;2023 Genius Draft. All rights reserved</p>
                <div className='flex gap-2'>
                    <TwitterLogo className='w-8 h-8 p-2 bg-white rounded-full' fill='black' />
                    <InstagramLogo className='w-8 h-8 p-2 bg-white rounded-full' fill='black' />
                </div>
            </div>
            <div className='absolute w-[40vw] h-[70vh] -rotate-45 bg-secondary rounded-full blur-3xl right-[60vw] bottom-4 opacity-[2%]'></div>
            <div className='absolute w-[40vw] h-[70vh] -rotate-45 bg-white rounded-full blur-3xl left-[70vw] bottom-[4vh] opacity-[2%]'></div>
        </footer>
    )
}