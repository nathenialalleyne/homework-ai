import React, { useContext, useEffect, useState } from 'react'
import { StageContext } from '../context'
type Props = {}

export default function InputSource({ }: Props) {
    const [loading, setLoading] = useState(false)
    const [convert, setConvert] = useState<File>()
    const [data, setData] = useState<any>()
    const [text, setText] = useState<string>()

    const setStage = useContext(StageContext)

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        (setStage as React.Dispatch<React.SetStateAction<string>>)('source')
    }, [])

    const sendToGoogleStorage = async () => {
        const formData = new FormData()
        formData.append('file', convert as File)
        formData.append('prompt', text as string)
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
                        setLoading(true)
                        setData(await sendToGoogleStorage())
                        setLoading(false)

                    }}>get text</button>
                </div>)
            }
        </div>
    )
}