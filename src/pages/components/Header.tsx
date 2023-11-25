import React from 'react'
import FullLogo from '../images/logo'

type Props = {}

export default function Header({ }: Props) {
    return (
        <header className='w-full h-fit pt-6 z-10'>
            <div className='flex justify-between items-center'>
                <FullLogo className='w-[225px] h-fit' />
                <ul className='flex justify-center items-center text-white pr-64 gap-6'>
                    <ul className='flex'>
                        <li className='hover:cursor-pointer'>Features</li>
                        <li className='hover:cursor-pointer pl-6'>Premium</li>
                    </ul>
                    <li className='bg-gradient-to-r from-primary to-secondary w-24 h-fit hover:cursor-pointer rounded-3xl flex justify-center items-center p-[1px]'>
                        <button className='pt-2 pb-2 pl-4 pr-4'>Sign Up</button>
                    </li>
                </ul>
            </div>
        </header>
    )
}