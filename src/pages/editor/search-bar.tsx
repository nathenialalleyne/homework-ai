import React from 'react'
import AssignmentCard from '../../components/general/assignment-card'
import SearchIcon from '@/images/search-icon'

type Props = {}

export default function SearchBar({ }: Props) {
    return (
        <div className='w-96 h-full bg-lighterDark p-2 shrink-0'>

            <div className='flex items-center w-full gap-4 p-2'>
                    <SearchIcon className='hover:stroke-stone-300 transition-all fill-slate-400 w-8' />
                <div className='flex justify-start w-full h-8 rounded-lg  gap-2 border-px border-lighter'>
                    <input className='w-full h-full bg-transparent outline-none placeholder:text-slate-400 text-white' placeholder='Search Assignments' />
                </div>
            </div>

            <div className='w-full h-px bg-lighter mb-2' />

        </div>
    )
}