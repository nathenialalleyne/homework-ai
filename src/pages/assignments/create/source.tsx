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
    const [jobStarted, setJobStarted] = useState(false)

    const { data: sources, refetch } = api.dbOperations.getSources.useQuery({ cursor: 0 }, { enabled: false, });
    const { data: openai, refetch: refetchPrompt } = api.sourceRouter.promptOpenAI.useQuery({ gcpName: gcpFileName!, prompt: text! }, { enabled: false })
    const { data: jobStatusData, refetch: refetchJobStatus } = api.statusRouter.soureStatus.useQuery({ jobID: data?.jobID, executionID: data?.executionID }, { enabled: false })
    const setStage = useContext(StageContext)

    useEffect(() => {
        if (gcpFileName && text) {
        }
    }, [gcpFileName, text])

    useEffect(() => {
        (setStage as React.Dispatch<React.SetStateAction<string>>)('source')
        refetch()
    }, [])

    const formData = new FormData()
    formData.append('file', convert as File)
    formData.append('prompt', text as string)
    return (
        <div>
            {/* {sources ? <div> {sources.map((source) => {
                return <div><button value={source.gcpFileName} onClick={() => {
                    const newGcpFileName = source.gcpFileName
            
                    setGcpFileName(newGcpFileName)
                    console.log(gcpFileName)
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
                        const id = await fetch('/api/source/upload-source', {
                            method: 'POST',
                            body: formData
                        })

                        const json: { message: string, jobID: string, executionID: string } = await id.json()
                        const interval = setInterval(async () => {
                            if (jobStatusData && jobStatusData.state != 'complete') {
                                refetchJobStatus()
                            }
                            if (jobStatusData?.state === 'complete') {
                                clearInterval(interval)
                                refetch()
                            }
                            if (jobStatusData?.state === 'failed') {
                                clearInterval(interval)
                            }
                        }, 3500)

                        setData(json)
                        setJobStarted(jobStatusData?.state !== 'complete' || !jobStatusData);

                    }}>get text</button>
                    <button onClick={async () => {
                        refetchPrompt()

                    }}>check status</button>
                </div>)
            } */}
        </div>
    )
}