import React from 'react'
import MenuDotIcon from '../../images/menu-dots'

type Props = {
    assignmentName: string,
    assignmentDescription: string,
    date: string,
    setSelectAssignment: React.Dispatch<React.SetStateAction<string | null>>
}

export default function AssignmentCard({
    assignmentName,
    assignmentDescription,
    date,
    setSelectAssignment: setSelectedAssignment
}: Props) {
    return (
        <div className='w-[25rem] h-38 bg-lighterDark rounded-lg p-4 overflow-hidden flex'>
            <button className='text-left w-[90%] h-full flex flex-col justify-between hover:text-stone-400'
                onClick={() => {
                    setSelectedAssignment(assignmentName)
                }}>
                <h3 className='text-lg'>{assignmentName}</h3>
                <p className='font-extralight text-stone-300 h-1/2 line-clamp-3'>{assignmentDescription}</p>
            </button>

            <div className='flex flex-col justify-between items-end'>
                <button>
                    <MenuDotIcon className='w-4 h-4 fill-stone-300 hover:fill-stone-400 transition-all flex items-center justify-center' />
                </button>

                <div className='w-full whitespace-nowrap text-sm font-extralight cursor-default'>{date}</div>
            </div>
        </div>
    )
}