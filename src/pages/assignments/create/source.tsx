import React, { useContext, useEffect, useState } from 'react'
import { StageContext } from '../context'
import { api } from '@/utils/api'
import { randomUUID } from 'crypto'
type Props = {}

export default function InputSource({ }: Props) {
    const [loading, setLoading] = useState(false)
    const [convert, setConvert] = useState<File>()
    const [data, setData] = useState<any>()
    const [text, setText] = useState<string>()
    const [gcpFileName, setGcpFileName] = useState<string>()
    const { data: sources, refetch } = api.dbOperations.getSources.useQuery(undefined, { enabled: false });
    const { data: test, refetch: refetchTest } = api.sourceRouter.useExistingSource.useQuery({ gcpName: gcpFileName!, prompt: text! }, { enabled: false })

    const { data: openai, refetch: refetchPrompt } = api.sourceRouter.promptOpenAI.useQuery({ gcpName: sources?.[0]?.gcpFileName!, prompt: text! }, { enabled: false })
    const setStage = useContext(StageContext)

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    useEffect(() => {
        (setStage as React.Dispatch<React.SetStateAction<string>>)('source')
        refetch()
    }, [])

    useEffect(() => {
        console.log(openai)
    }, [openai])

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

                        const json: { message: string, jobID: string, executionID: string } = await id.json()
                        const merge = json.jobID + "," + json.executionID

                        const interval = setInterval(async () => {
                            console.log('checking')
                            const res = await fetch(`/api/job-status/${merge}`)
                            const datad = await res.json()
                            if (datad.state === 'complete') {
                                clearInterval(interval)
                                setData(datad)
                                refetch()
                            }
                            if (datad.state === 'failed') {
                                clearInterval(interval)
                                setData(datad)
                            }
                        }, 3500)

                        setData(json)

                    }}>get text</button>
                    <button onClick={async () => {
                        refetchPrompt()
                    }}>check status</button>
                </div>)
            }
        </div>
    )
}