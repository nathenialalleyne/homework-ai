import Image from 'next/image'
import React from 'react'

type Props = {
    testimonalText: string
    testimonalAuthor: string
    testimonalImageSource: string
}

export default function TestimonalCard({
    testimonalText,
    testimonalAuthor,
    testimonalImageSource
}: Props) {
    return (
        <div className='max-w-[35rem] shrink-0 h-fit bg-gradient-to-l from-primary to-secondary p-[1px] rounded-lg flex items-center justify-center relative'>
            <div className='flex w-full h-fit bg-stone-900 rounded-lg'>
                <div className='w-4 bg-gradient-to-l from-primary to-secondary rounded-l-lg'></div>
                <div className='p-6 flex flex-col h-full space-y-6'>
                    <p className='text-lg font-extralight'>{testimonalText}</p>

                    <div className='flex items-center justify-between pr-4'>
                        <div className='flex gap-4 items-center'>
                            <Image src={testimonalImageSource} alt='User' width={40} height={40} className='w-10 h-10 rounded-full bg-white'></Image>
                            <p className='font-extralight'>{testimonalAuthor}</p>
                        </div>
                        <div className='flex gap-1'>
                            <Image src={'/assets/star.png'} alt='Rating Star' width={20} height={20} />
                            <Image src={'/assets/star.png'} alt='Rating Star' width={20} height={20} />
                            <Image src={'/assets/star.png'} alt='Rating Star' width={20} height={20} />
                            <Image src={'/assets/star.png'} alt='Rating Star' width={20} height={20} />
                            <Image src={'/assets/star.png'} alt='Rating Star' width={20} height={20} />

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}