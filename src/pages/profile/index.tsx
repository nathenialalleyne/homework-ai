import { api } from '@/utils/api'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import Tiptap from '@/pages/components/Tiptap'

type Props = {}

export default function Profile({ }: Props) {
    const router = useRouter()
    const id = uuidv4()
    const { data, refetch } = api.dbOperations.getSample.useQuery(undefined, { enabled: false })
    const getText = api.dbOperations.getSampleTextFromStorage.useQuery({ id: data?.[data.length - 1]?.id.toString() as string, name: data?.[data.length - 1]?.fileName as string }, { enabled: false })
    const [gotText, setGotText] = useState<boolean>()
    useEffect(() => {
        refetch()
    }, [])
    return (
        <>
            <button onClick={() => {
                router.push(`/assignments/${id}`)
            }}>Create New Assignment</button>

            <button onClick={() => {
                data ? router.push({ pathname: 'sample', query: { update: true } }) : router.push('/sample')
            }}>{data ? <p>Update Source</p> : <p>Upload Source</p>}</button>

            <button onClick={() => {
                getText.refetch()
                setGotText(true)
            }}>
                Get Text
            </button>
            <div>
                {data?.map((item, index) => {
                    return (
                        <div key={index}>
                            <Link href={`/assignments/${item.id}`}>
                                <div>{item.fileName}</div>
                            </Link>

                        </div>
                    )
                })}

            </div>
            {getText.data ?
                <div className='border border-black border-2 ml-2 mr-2 mt-2'>
                    <Tiptap defaultValue={getText.data} />
                </div> : null}
        </>
    );
}