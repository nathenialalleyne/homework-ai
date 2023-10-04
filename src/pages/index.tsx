import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useState } from "react";
import { set } from "zod";

import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const [convert, setConvert] = useState<File>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>()
  // const hello = api.example.hello.useQuery({ text: convert as File }, { enabled: false });

  const sendToGoogleStorage = async () => {
    const formData = new FormData()
    formData.append('file', convert as File)
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    return data
  }

  return (
    <>
      <UserButton />
      <input type="file" onChange={(e) => {
        if (!e.target.files) return
        setConvert(e.target.files[0])
      }}></input>
      {loading ? <div>loading</div>
        : <button onClick={async () => {
          const data = await sendToGoogleStorage()
          console.log(data)
          setData(data)
        }}>send</button>}
      {data ? <div>got data</div> : <div>no data</div>}
    </>
  );
}
