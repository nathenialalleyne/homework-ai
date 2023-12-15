import React from 'react'
import Header from '../components/Header'
import Tiptap from '../components/Tiptap'

type Props = {}

export default function Editor({ }: Props) {
  return (
    <div className='bg-dark w-screen h-screen text-white overflow-hidden'>
      <Header profile key={1} />

      <div className='flex w-full h-full mt-8 p-4 bg-slightlyDark'>

        <div className='w-[35rem]'>
          <div className='flex flex-col mr-4'>

            <div className='flex w-full justify-between items-center'>
              <h2 className='text-2xl font-semibold'>Assignments</h2>
              <button>Create</button>
            </div>

            {/* searchbar */}
            <div className='bg-lighterDark flex mt-4 p-2 rounded-lg'>
              {/* placeholder image */}
              <div>phi</div>
              <input className='focus:outline-none text-black bg-lighterDark' placeholder='search' />
            </div>
          </div>
          <button className='w-full flex justify-end pr-4 mt-2'>filter</button>

          {/* assignment list */}
          <div className='mr-4 mt-2'>
            <div className='w-full h-44 bg-lighterDark rounded-lg p-4'>
              <h3 className='text-lg'>Assignment Name</h3>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <input placeholder='assignment name' className='text-black bg-slightlyDark' />
          <Tiptap />
        </div>

      </div>

    </div>
  )
}