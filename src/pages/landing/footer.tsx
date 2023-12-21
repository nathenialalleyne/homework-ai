import React from 'react'
import Logo from '../images/logo'
import TwitterLogo from '../images/twitter'
import InstagramLogo from '../images/instagram'
import Link from 'next/link'
import Image from 'next/image'

type Props = {}

export default function Footer({ }: Props) {
    return (
        <footer className='w-full flex justify-center items-center flex-col relative'>
            <div className='w-[75rem] h-px bg-gradient-to-l from-dark/20 via-stone-500 to-dark/20 z-20'></div>
            <div className='w-[75rem] h-[15rem] flex lg:justify-between xs:gap-8 items-center xs:flex-col xs:mt-4 lg:flex-row lg:mt-0'>
                <Logo />
                <div className='flex gap-2 z-30'>
                    <Link href={'https://x.com/geniusdraftapp'} target='_blank' >
                        <button className='hover:cursor-pointer'>
                            <Image src={'/twitter.png'} alt='twitter' width={30} height={30}/>
                        </button>
                    </Link>

                    <Link href={'https://instagram.com/geniusdraftapp'} target='_blank'>
                        <button className='hover:cursor-pointer'>
                            <Image src={'/instagram.png'} alt='instagram' width={30} height={30} />
                        </button>
                    </Link>
                </div>
            </div>
            <div className='absolute w-[40vw] h-[70vh] -rotate-45 bg-secondary rounded-full blur-3xl right-[60vw] bottom-4 opacity-[2%]'></div>
            <div className='absolute w-[40vw] h-[70vh] -rotate-45 bg-white rounded-full blur-3xl left-[70vw] bottom-[4vh] opacity-[2%]'></div>
        </footer>
    )
}