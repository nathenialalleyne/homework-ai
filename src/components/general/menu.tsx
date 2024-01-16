import React, { useState, useEffect } from 'react'
import MenuSourceCard from './menu-source-card'
import { api } from '@/utils/api'

type Props = {}

export default function Menu({ }: Props) {
    const [sources, setSources] = useState([])
    const [skip, setSkip] = useState(0)
    const [search, setSearch] = useState('')
    const [searchSkip, setSearchSkip] = useState(0)
    const { data, refetch } = api.dbOperations.getSources.useQuery({cursor: skip}, { enabled: false })
    const { data: searchData, refetch: refetchSearch } = api.dbOperations.searchSources.useQuery({search: search, cursor:searchSkip}, { enabled: false })
    
    useEffect(() => {
        refetch()
        data?.forEach((source) => {
            // setSources((prev) => [...sources, source])
        })
    }, [])
    
    useEffect(()=>{
        search
    }, [search])
    const arr = new Array(10).fill(0)

    return (
        <div className='w-[25rem] h-[35rem] p-2 bg-dark-100/[80%] overflow-hidden '>
            <input onChange={(e)=>{
                setSearchSkip(0)
                setSearch(e.target.value)
                refetchSearch()
            }} placeholder='Search Source Name...' className='w-full h-[3rem] bg-dark-100/[0%] focus:outline-none text-stone-200'></input>
            <div className='w-full h-px bg-gradient-to-r from-stone-200/[40%] from-10% to-dark/[0%] to-70% mb-2' />

            <div className='overflow-y-scroll w-full h-full scrollbar-thumb-stone-600 scrollbar scrollbar-thin pr-2'>
                <button className='w-full h-[3rem] my-2'>
                    <MenuSourceCard name='Create New Source' createdAt='Date' outerClassName='' nameClassName='w-full flex justify-center items-center' hideButton hideDate />
                </button>
                {search == '' ? data?.map((source, i) => {
                    return <MenuSourceCard key={i} name={source.name} createdAt={(`${source.createdAt.getMonth() + 1}/${source.createdAt.getDate()}/${source.createdAt.getFullYear()}`)} />
                }) : searchData?.map((source, i) => {
                    return <MenuSourceCard key={i} name={source.name} createdAt={(`${source.createdAt.getMonth() + 1}/${source.createdAt.getDate()}/${source.createdAt.getFullYear()}`)} />
                })}

                {search == '' ? <button onClick={() => {
                    setSkip(skip + 10)
                    refetch()
                }} className='w-full h-[3rem] my-2'>
                    <MenuSourceCard name='Load More' createdAt='Date' outerClassName='' nameClassName='w-full flex justify-center items-center' hideButton hideDate />
                </button> : <button onClick={() => {
                    setSearchSkip(searchSkip + 10)
                    refetchSearch()
                }} className='w-full h-[3rem] my-2'>
                    <MenuSourceCard name='Load More' createdAt='Date' outerClassName='' nameClassName='w-full flex justify-center items-center' hideButton hideDate />
                </button>
                }
            </div>

        </div>
    )
}