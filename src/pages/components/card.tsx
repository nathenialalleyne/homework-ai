import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

type Props = {
    headingText: string
    paragraphText: string
    icon: string
    className?: string
}

export default function Card({ headingText, paragraphText, icon, className }: Props) {
    return (
        <div className={twMerge('lg:max-w-[33%] xs:h-[250px] lg:h-[300px] bg-gradient-to-br from-primary to-secondary rounded-lg p-[1px] relative', className)}>
            <div className='w-full h-full lg:space-y-2 xs:space-y-1 bg-stone-900 rounded-lg p-6 overflow-hidden scrollbar xs:flex xs:flex-col xs:justify-center'>
                <div>
                    <Image src={`/assets/${icon}`} alt='' width={50} height={50} />
                </div>
                <div>
                    <h3 className='text-white lg:text-2xl sm:text-xl pb-2'>{headingText}</h3>
                    <p className='text-gray-300 font-extralight xs:text-sm lg:text-base'>{paragraphText}</p>
                </div>
            </div>
        </div>
    )
}