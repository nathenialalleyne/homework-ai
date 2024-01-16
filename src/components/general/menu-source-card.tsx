import classNames from 'classnames'
import React from 'react'

type Props = {
    name: string,
    containerIsButton?: boolean,
    createdAt?: string,
    hideButton?: boolean
    hideDate?: boolean
    outerClassName?: string
    buttonClassName?: string
    nameClassName?: string
    dateClassName?: string
}

export default function MenuSourceCard({ name, containerIsButton, createdAt, hideButton, hideDate, outerClassName, buttonClassName, nameClassName, dateClassName }: Props) {
    return (
        <div className={classNames('w-full h-[3rem] bg-stone-100 hover:bg-stone-300 flex justify-between items-center pr-4 my-2', outerClassName)}>
            {!hideButton && <button className={classNames('bg-green-300 p-2 w-20 h-full hover:bg-green-400 transition-all', buttonClassName)}>+</button>}
            <div className={classNames('truncate', nameClassName) }>{name}</div>
            {!hideDate && <div className='flex flex-col items-end'>
                <div className='text-sm text-stone-700'>
                    Created
                </div>
                <div className=' w-fit'>
                    {createdAt}
                </div>
            </div>}
        </div>
    )
}