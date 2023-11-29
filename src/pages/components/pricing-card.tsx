import React from 'react'
import SectionHeading from './section-heading'
import Image from 'next/image'

type Props = {
    plan: string
    price: string
    features: string[]
    buttonText: string
    description: string
    free?: boolean
}

export default function PricingCard({
    plan,
    price,
    features,
    buttonText,
    description,
    free
}: Props) {
    return (
        <div className='flex flex-col bg-gradient-to-br from-primary to-secondary w-1/3 p-[1px] h-[550px] rounded-lg'>
            <div className='bg-stone-900 w-full h-full p-4 flex flex-col justify-between rounded-lg'>
                <SectionHeading className=''>{plan}</SectionHeading>
                <h2 className='text-4xl'>{price}</h2>
                <p className='font-extralight text-gray-300'>{description}</p>
                <ul className='flex flex-col justify-between h-[200px]'>
                    {features.map((feature) => (
                        <li className='flex w-full items-center gap-2'>
                            <Image src={'/assets/check.png'} alt='check mark' width={5} height={5} className='w-fit h-fit' />
                            <p className='font-extralight'>{feature}</p>
                        </li>
                    ))}
                </ul>
                {!free ? <button className='hover:opacity-80 transition-all bg-gradient-to-b from-primary to-secondary p-4 rounded-full text-black hover:cursor-pointer z-40 w-full h-12 p-[1px]'>
                    <div className='w-full h-full bg-stone-900 rounded-full flex items-center justify-center text-white'>{buttonText}</div>
                </button> : <button className='hover:opacity-80 transition-all bg-gradient-to-b from-primary to-secondary p-4 rounded-full text-black hover:cursor-pointer z-40 w-full h-12'>
                    <div className='w-full h-full rounded-full flex items-center justify-center'>{buttonText}</div>
                </button>
                }
            </div>
        </div>
    )
}