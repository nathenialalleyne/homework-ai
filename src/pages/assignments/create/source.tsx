import React, { useContext, useEffect, useState } from 'react'
import { StageContext } from '../context'
import { api } from '@/utils/api'
type Props = {}

export default function InputSource({ }: Props) {
    const [loading, setLoading] = useState(false)
    const [convert, setConvert] = useState<File>()
    const [data, setData] = useState<any>()
    const [text, setText] = useState<string>()

    const {data: sources, refetch} = api.dbOperations.getSources.useQuery(undefined, {enabled: false})

    const setStage = useContext(StageContext)

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        (setStage as React.Dispatch<React.SetStateAction<string>>)('source')
        refetch()
    }, [])

    const formData = new FormData()
    formData.append('file', convert as File)
    formData.append('prompt', text as string)

    const sendToGoogleStorage = async () => {
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log(data)
        return data
    }



    return (
        <div>
            {loading ? <div>loading</div> :
                (<div>
                    <h1>Input Source</h1>
                    <input onChange={(e) => {
                        setText(e.target.value)
                    }} />

                    <input type="file" onChange={(e) => {
                        if (!e.target.files) return
                        setConvert(e.target.files[0])
                    }} />

                    <button onClick={async () => {
                        // setLoading(true)
                        // setData(await sendToGoogleStorage())
                        // setLoading(false)
                        const id = await fetch('/api/create-job', {
                            method: 'POST',
                            body: formData
                        })

                        const json = await id.json()
                        setData(json)
                        console.log(data)

                    }}>get text</button>
                    <button onClick={async () => {
                        const res = await fetch(`/api/job-status/${data.worker}`)
                        const datad = await res.json()
                        console.log(datad)
                    }}>check status</button>
                </div>)
            }
        </div>
    )
}