import uploadFile from "@/server/upload-file"
import { NextApiRequest, NextApiResponse } from "next"
import formidable from 'formidable'

interface NextApiRequestWithFormData extends NextApiRequest {
    files: {
        [key: string]: any
    }

}

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function upload(req: NextApiRequestWithFormData, res: NextApiResponse) {
    const { method } = req
    
    switch (method) {
        case "POST":
        try {
            const form = formidable({})

            const data = await new Promise((res, rej) =>{
                form.parse(req, (err, fields, files) => {
                    if (err) return rej(err)
                    if (!files.file) return rej("No file provided")
                    const file = files.file[0] as formidable.File
                    const upload = uploadFile(file)
                    res(upload)
                })
            })
            // const test = await uploadFile(data.files.file[0])

            res.status(200).json({ success: data })
        } catch (error) {
            res.status(500).json({ success: error })
        }
        break
        default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}