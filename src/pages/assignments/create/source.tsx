import React, { useContext, useEffect, useState } from 'react'
import { StageContext } from '../context'
import { api } from '@/utils/api'
type Props = {}

export default function InputSource({ }: Props) {
    const [loading, setLoading] = useState(false)
    const [convert, setConvert] = useState<File>()
    const [data, setData] = useState<any>()
    const [text, setText] = useState<string>()
    const [gcpFileName, setGcpFileName] = useState<string>()
    const { data: sources, refetch } = api.dbOperations.getSources.useQuery(undefined, { enabled: false });
    const { data: test, refetch: refetchTest } = api.sourceRouter.useExistingSource.useQuery({ gcpName: gcpFileName!, prompt: text! }, { enabled: false })

    const setStage = useContext(StageContext)

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

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
            {sources ? <div> {sources.map((source) => {
                return <div><button onClick={() => {
                    const newGcpFileName = source.gcpFileName
                    setGcpFileName(newGcpFileName)
                    refetchTest()
                }}>{source.name}</button> {source.gcpFileName} {source.vectorPrefix} {source.vectorList}</div>
            })}</div> : <div>loading</div>}
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
                        console.log(convert)

                        // setLoading(true)
                        // setData(await sendToGoogleStorage())
                        // setLoading(false)
                        const id = await fetch('/api/source/upload-source', {
                            method: 'POST',
                            body: formData
                        })

                        const json: { message: string, jobID: string } = await id.json()

                        console.log(json)
                        const interval = setInterval(async () => {
                            console.log('checking')
                            const res = await fetch(`/api/job-status/${json.jobID}`)
                            const datad = await res.json()
                            if (datad.status === 'complete') {
                                setData(datad)
                                refetch()
                            }
                            if (datad.status != 'processing') {
                                clearInterval(interval)
                            }
                        }, 3500)



                        setData(json)

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