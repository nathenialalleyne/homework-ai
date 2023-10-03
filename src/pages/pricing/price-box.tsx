import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/button'

type Props = {
    plan: string
    price: string
    features: string[]
}

export default function PriceBox({ plan, price, features }: Props) {
    return (
        <div className='w-2/12 h-1/2 bg-stone-900/50 flex flex-col items-center text-white p-2 rounded-2xl'>
            <div className='flex justify-center items-center flex-col font-semibold gap-4'>
                <div className='text-5xl'>{plan}</div>
                <div className='flex flex-col justify-center items-center'>
                    <div>Starts at</div>
                    <div className='text-3xl'>{'$' + price + '/month'}</div>
                    {plan === 'Free' ? <div className='text-xs mt-2'>No credit card required</div> : <div className='text-xs mt-2'>5-day free trial</div>}
                </div>
            </div>
            <div className='w-full bg-stone-500 h-px mt-4 mb-2'></div>
            <div className='w-full h-full flex flex-col justify-evenly'>
                {features.map((feature) => (
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='w-6 h-6 bg-white rounded-full p-1 flex justify-center items-center'>
                            <FontAwesomeIcon icon={faCheck} className='text-black' />
                        </div>
                        {feature}
                    </div>
                ))}
            </div>

            <div className='flex items-center justify-center'>
                <Button text={plan === 'Free' ? 'Try it today!' : 'Get Started'} style='mt-4 p-2 bg-0 flex justify-center items-center gap-2 hover:text-stone-300'>
                    <FontAwesomeIcon icon={faArrowRight} className='text-white' />
                </Button>
            </div>
        </div>
    )
}