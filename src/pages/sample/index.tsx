import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Sample({ }: Props) {
    const [data, setData] = useState<any>()
    const [convert, setConvert] = useState<File>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

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
                setLoading(true)
                const get = await fetch('/api/upload-sample', {
                    method: 'POST',
                    body: formData
                })

                setData(await get.json())
                setLoading(false)
                router.push('/profile')
            }}>send</button>
        </div>
    )
}