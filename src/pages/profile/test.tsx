import { UploadButton } from "@/utils/uploadthing";
// You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
import "@uploadthing/react/styles.css";
import { useState } from "react";
import { api } from "@/utils/api";

export default function Test() {
    const [fileKey, setFileKey] = useState<string>();
    const { refetch, data: endpointData } = api.convert.convert.useQuery({ fileKey: fileKey as string }, { enabled: false })
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (!res) return
                    res[0]?.key && setFileKey(res[0]?.key)
                    refetch()
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Endpoint Response</h1>
                <pre className="text-sm">
                    {JSON.stringify(endpointData, null, 2)}
                </pre>
            </div>
        </main>
    );
}