import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Tiptap from '../components/Tiptap'
import SearchIcon from '../images/search-icon'
import MenuDotIcon from '../images/menu-dots'
import AssignmentCard from '../components/general/assignment-card'
import { api } from '@/utils/api'
import Loader from '../images/loader'


type Props = {}

export default function Editor({ }: Props) {
  const [assignmentSelected, setAssignmentSelected] = useState<string | null>(null)
  const getAllAssignments = api.dbOperations.getAssignments.useQuery(undefined, { enabled: false })

  useEffect(() => {
    getAllAssignments.refetch()
  }, [])

  // sidebar where you can switch from assignments to sources to writing samples, put the assignment creation at the top of the text editor then have a button to prompt and save the assignment
  return (
    <div className='bg-dark w-screen h-screen text-white overflow-hidden'>
      <Header profile key={1} />

      <div className='flex w-full h-full mt-8 p-4 bg-slightlyDark'>

        {getAllAssignments.isLoading ? <div className='w-[30rem] h-full flex'>
          <Loader />
        </div>
          : <div className='w-[30rem] h-full'>
            <div className='flex flex-col mr-4'>

              <div className='flex w-full justify-between items-center'>
                <h2 className='text-2xl font-semibold'>Assignments</h2>
                <button>Create</button>
              </div>

              {/* searchbar */}
              <div className='bg-lighterDark flex mt-4 p-2 rounded-lg'>
                {/* placeholder image */}
                <SearchIcon className='fill-stone-400 w-6 h-6 mr-2' />
                <input className='focus:outline-none text-white bg-lighterDark placeholder-stone-400' placeholder='Search Assignments' />
              </div>
            </div>
            <button className='w-full flex justify-end pr-4 mt-2'>filter</button>

            {/* assignment list */}
            <div className='mr-4 mt-2 h-full flex flex-col gap-2'>
              {getAllAssignments.data?.length ? getAllAssignments.data.map((assignment, index) => {
                return (
                  <AssignmentCard
                    key={index}
                    assignmentName={assignment.name}
                    assignmentDescription='test'
                    date='123'
                    setSelectAssignment={setAssignmentSelected}
                  />
                )
              }) : <div className='text-center text-stone-300 h-[70%] flex items-center justify-center'>No assignments found</div>
              }
            </div>
          </div>}

        <div className='w-full bg-lighterDark ml-4'>
          {assignmentSelected ?
            <div>
              <input placeholder='assignment name' className='text-black bg-slightlyDark' />
              <Tiptap />
            </div>
            :
            <div className='flex flex-col justify-center items-center h-full'>
              <h2 className='text-2xl font-semibold'>Select an Assignment</h2>
              <p className='text-sm font-extralight text-stone-300'>or create a new one</p>
            </div>}
        </div>
      </div>

    </div>
  )
}