import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { api } from '@/utils/api'

type Props = {}

export default function Sample({ }: Props) {
    const [data, setData] = useState<any>()
    const [convert, setConvert] = useState<File>()
    const [loading, setLoading] = useState<boolean>(false)
    const [valid, setValid] = useState<boolean>(false)
    const router = useRouter()
    const { data: store, refetch } = api.dbOperations.getSample.useQuery(undefined, { enabled: false })

    useEffect(() => {
        refetch()
    }, [])

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
                setValid(false)
                if (e.target.files[0]?.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ) {
                    setValid(true)
                    setConvert(e.target.files[0])
                }
            }} />
            {valid ? <button onClick={async () => {
                setLoading(true)
                if (store && store.length > 0) {
                    // formData.append('id', store?.[store.length - 1]?.id.toString() as string)
                    // formData.append('actionType', 'update')
                    const get = await fetch('/api/source/upload-source', {
                        method: 'POST',
                        body: formData

                    })

                    setData(await get.json())
                    setLoading(false)
                    // router.push('/profile')
                    return
                }
                const get = await fetch('/api/upload-sample', {
                    method: 'POST',
                    body: formData
                })

                setData(await get.json())
                setLoading(false)
                router.push('/profile')
            }}>send</button> : null}
        </div>
    )
}