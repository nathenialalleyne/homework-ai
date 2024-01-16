import React from 'react'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string
    children?: React.ReactNode
}

export default function SectionHeading({ className, children }: Props) {
    return (
        <div className={twMerge('font-normal bg-gradient-to-br from-primary from-30% to-secondary bg-clip-text text-transparent text-2xl w-fit h-fit', className)}>
            {children}
        </div>
    )
}