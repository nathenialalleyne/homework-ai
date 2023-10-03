import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    text?: string
    onClick?: () => void
    style?: string
}

export default function Button({ text, onClick, style }: Props) {
    return (
        <button onClick={onClick ? onClick : () => { }}
            className={twMerge('w-fit h-fit p-4 text-white bg-rose-400 rounded-2xl', style)}>
            {text ? text : "Button"}
        </button>
    )
}