import { api } from '@/utils/api'
import React, { useState } from 'react'
import Test from './test'

type Props = {}

export default function Profile({ }: Props) {
    const [file, setFile] = useState<File>()
    const [convert, setConvert] = useState<string | File>()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>()

    const { refetch, data: endpointData } = api.convert.convert.useQuery({ base64: convert as string }, { enabled: false })


    const base64Convert = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file as File);
        reader.onload = async function () {
            console.log(reader.result)
            if (!reader.result) return

            // console.log(endpointData.ParsedResults[0].ParsedText)
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

        if (!convert) return
        await refetch()
    }

    return (
        <div>
            <h1>Profile</h1>
            <div>input writing samples</div>
            <div>
                <input type='file' onChange={async (e) => {
                    setFile(e.target.files?.[0] as File)
                }}></input>
                {!loading && <button onClick={base64Convert}>send</button>}
                {/* {endpointData && <div>{endpointData}</div>} */}
            </div>
            <Test />
        </div>
    )
}