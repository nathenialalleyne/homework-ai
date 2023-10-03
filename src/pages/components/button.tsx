import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    text?: string
    onClick?: () => void
    style?: string
    link?: string
    children?: React.ReactNode
}

export default function Button({ text, onClick, style, link, children }: Props) {
    return (

        <div>
            {link ?
             <Link href={link}>
                <button onClick={onClick ? onClick : () => { }}
                    className={twMerge('w-fit h-fit p-4 text-white bg-rose-400 rounded-2xl', style)}>
                    {text ? text : "Button"}
                    {children}
                </button>
            </Link> :
                <button onClick={onClick ? onClick : () => { }}
                    className={twMerge('w-fit h-fit p-4 text-white bg-rose-400 rounded-2xl', style)}>
                    {text ? text : "Button"}
                    {children}
                </button>}
        </div>
    )
}