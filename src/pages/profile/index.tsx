import { api } from '@/utils/api'
import React, { useState } from 'react'
import Test from './test'

type Props = {}

export default function Profile({ }: Props) {
    const [file, setFile] = useState<File>()
    const [convert, setConvert] = useState<string | File>()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>()


    return (
        <div>
            <h1>Profile</h1>
            <div>input writing samples</div>
            <div>
                <input type='file' onChange={async (e) => {
                    setFile(e.target.files?.[0] as File)
                }}></input>
                {!loading && <button>send</button>}
                {/* {endpointData && <div>{endpointData}</div>} */}
            </div>
            <Test />
        </div>
    )
}