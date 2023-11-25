import React from 'react'

type Props = {
    top: string,
    bottom: string,
}

export default function HeroBox({ top, bottom }: Props) {
    return (
        <div className='w-[18rem] h-32'>
            <div className='w-full h-full bg-gradient-to-br from-primary to-secondary rounded-lg p-[1px]'>
                <div className='w-[calc(100%-1px)] h-[calc(100%-1px)] flex items-center justify-center flex-col bg-dark rounded-lg'>
                    <h2 className='font-bold text-2xl bg-gradient-to-br from-primary from-30% to-secondary bg-clip-text text-transparent'>{top}</h2>
                    <p className='font-light text-md text-gray-400'>{bottom}</p>
                </div>
            </div>
        </div>
    )
}