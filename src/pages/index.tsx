import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useState } from "react";
import { set } from "zod";

export default function Home() {
  const [convert, setConvert] = useState<File>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>()
  // const hello = api.example.hello.useQuery({ text: convert as File }, { enabled: false });

  const ocrEndpoint = async () => {
    if (!convert) return

    setLoading(true)
    const formData = new FormData();
    formData.append("file", convert);
    formData.append("filetype", "PDF");

    const data = await fetch('https://api.ocr.space/parse/image',
      {
        method: 'POST',
        headers: {
          apikey: 'K84034087688957',
        },
        body: formData
      })

    const dataJson = await data.json()
    setLoading(false)
    return dataJson
  }


  return (
    <>
      <input type="file" onChange={(e) => {
        if (!e.target.files) return
        setConvert(e.target.files[0])
      }}></input>
      {loading ? <div>loading</div>
        : <button onClick={async () => {
          const data = await ocrEndpoint()
          setData(data)
        }}>send</button>}
      {data && <div>{data.ParsedResults[0].ParsedText}</div>}
    </>
  );
}
