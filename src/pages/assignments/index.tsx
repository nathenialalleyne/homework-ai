import React, { useState, useEffect } from 'react'
import { api } from '@/utils/api'

type Props = {}

export default function Assignment({ }: Props) {
    const [convert, setConvert] = useState<File>()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>()
    const [text, setText] = useState<string>()
    const [sample, setSample] = useState<string>()
    // const hello = api.example.hello.useQuery({ text: convert as File }, { enabled: false });
    const createSample = api.dbOperations.addSample.useMutation({})

    useEffect(() => {
        console.log(data)
    }, [data])

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

    const seperateArray = (array: any[]) => {
        const newArray = []
        for (let p in array) {
            newArray.push(JSON.parse(array[p]))
        }
        return newArray
    }
    return (
        <>
            <input onChange={(e) => {
                setText(e.target.value)
            }} />

            <input type="file" onChange={(e) => {
                if (!e.target.files) return
                setConvert(e.target.files[0])
            }} />

            <input onChange={(e) => {
                setSample(e.target.value)
            }} />
            <button onClick={(e) => {
            }}>Add Sample</button>

            {loading ? <div>loading</div>
                : <button onClick={async () => {
                    const data = await sendToGoogleStorage()
                    let parsedArray = seperateArray(data.success)
                    let fullText = parsedArray.map((item) => {
                        return item.responses[0].fullTextAnnotation.text
                    })
                    setData(fullText)
                }}>send</button>}
            {data ? <div>got data {data}</div> : <div>no data</div>}
            {sample ? <div>sample {sample}</div> : <div>no sample</div>}
        </>
    );
}