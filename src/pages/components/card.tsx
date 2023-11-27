import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'

type Props = {
    headingText: string
    paragraphText: string
    icon: string
    className?: string
}

export default function Card({ headingText, paragraphText, icon, className }: Props) {
    return (
        <div className={classNames('w-[400px] bg-gradient-to-br from-primary to-secondary rounded-lg p-[1px] relative overflow-hideen', className)}>
            <div className='w-full h-full space-y-4 bg-stone-900 rounded-lg p-6'>
                <div>
                    <Image src={`/assets/${icon}`} alt='' width={50} height={50} />
                </div>
                <div>
                    <h3 className='text-white text-2xl pb-2'>{headingText}</h3>
                    <p className='text-gray-300 font-extralight text-md'>{paragraphText}</p>
                </div>
            </div>
        </div>
    )
}