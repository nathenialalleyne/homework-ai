import React, { useEffect, useState } from 'react'

type Props = {}

export default function Sample({ }: Props) {
    const [data, setData] = useState<any>()
    const [convert, setConvert] = useState<File>()

    useEffect(() => {
        console.log(data)
    }, [data])

    const formData = new FormData()
    formData.append('file', convert as File)

    return (
        <div>
            <div>Sample</div>
            <input type="file" onChange={(e) => {
                if (!e.target.files) return
                setConvert(e.target.files[0])
            }} />
            <button onClick={async () => {
                const get = await fetch('/api/upload-sample', {
                    method: 'POST',
                    body: formData
                })

                setData(await get.json())
            }}>send</button>
        </div>
    )
}