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
  const [assignmentSelected, setAssignmentSelected] = useState<string | null | boolean>(null)
  const [sourceSelected, setSourceSelected] = useState<string | null>('new')
  const [file, setFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState<string | null>(null)
  const getAllAssignments = api.dbOperations.getAssignments.useQuery(undefined, { enabled: false })
  const getSources = api.dbOperations.getSources.useQuery({ cursor: 0 }, { enabled: false })

  useEffect(() => {
    getAllAssignments.refetch()
  }, [])

  useEffect(() => {
    if (sourceSelected == 'existing') {
      getSources.refetch()
    }
  }, [sourceSelected])

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setSourceSelected(e.target.value)
  }

  const bytesToSize = (bytes: number) => {
    var sizeInMB = (bytes / (1024 * 1024)).toFixed(2);
    return Number(sizeInMB);
  }

  const createAssignment = async () => {
    const formData = new FormData()
    formData.append('file', file as File)
    formData.append('prompt', prompt as string)

    await fetch('api/source/upload-source', {
      method: 'POST',
      body: formData
    })
  }

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
                <button onClick={() => {
                  setAssignmentSelected(true)
                }}>Create</button>
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
              <input placeholder='assignment name' value={typeof assignmentSelected == 'string' ? assignmentSelected : ''} className='text-black bg-slightlyDark' />
              <input
                type='radio'
                name='source'
                defaultValue='new'
                onChange={handleRadioChange}
                checked={sourceSelected === 'new'}
              />
              <input
                type='radio'
                name='source'
                defaultValue='existing'
                onChange={handleRadioChange}
                checked={sourceSelected === 'existing'}
              />
              {sourceSelected == 'new' ?
                <div className='flex flex-col gap-2'>
                  <input type='file' onChange={(e) => {
                    setFile(e.target.files?.[0] || null)
                  }} />
                </div> :
                getSources.isLoading ?
                  <Loader /> :
                  getSources.data?.length ? <div className='flex flex-col gap-2'>{getSources.data?.map((source, index) => {
                    return (
                      <div key={index}>
                        <label>{source.name}</label>
                        <input type='checkbox' />
                      </div>
                    )
                  })}</div> :
                    <div className='text-center text-stone-300 h-[70%] flex items-center justify-center'>
                      No sources found
                    </div>
              }
              <input onChange={(e) => {
                setPrompt(e.target.value)
              }}/>
              {
                file && bytesToSize(file.size) <= 4 && ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type) ?
                  <button onClick={createAssignment}>create</button> :
                  <div className='text-red-400'>invalide file or no file</div>
              }
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