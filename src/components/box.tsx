import classNames from 'classnames'
import React from 'react'

type Props = {
    top: string,
    bottom: string,
    className?: string
    gradient?: boolean
    opauge?: boolean
}

export default function HeroBox({ top, bottom, className, gradient, opauge }: Props) {
    return (
        <div className={classNames('xl:w-[18rem] lg:w-[15rem] md:w-[18rem] xs:max-w-[18rem] h-32 z-40 text-center', className)}>
            <div className={!opauge ? 'w-full h-full bg-gradient-to-br from-primary to-secondary rounded-lg p-[1px]' : 'w-full h-full bg-stone-900/[.98] border border-stone-700 rounded-lg p-[1px] relative'}>
                {opauge ? <div className='absolute bg-white w-36 h-36 bottom-10 rounded-full blur-3xl opacity-[20%] right-1 z-20'></div> : null}
                <div className={!opauge ? 'w-full h-full flex items-center justify-center flex-col bg-dark-100 rounded-lg z-20 px-2' : 'w-full h-full flex items-center justify-center flex-col rounded-lg'}>
                    <h2 className='font-bold text-2xl bg-gradient-to-br from-primary from-30% to-secondary bg-clip-text text-transparent'>{top}</h2>
                    <p className='font-light text-md text-gray-400'>{bottom}</p>
                </div>
            </div>
        </div>
    )
}