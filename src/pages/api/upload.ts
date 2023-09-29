import { NextApiRequest, NextApiResponse } from 'next'

async function ocrEndpoint(convert: File){
    if (!convert) return
  
    const formData = new FormData();
    formData.append("file", convert);
    formData.append("OCREngine", "2");

    const data = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: {
          apikey: 'K84034087688957',
        },
        body: formData
      })

    const dataJson = await data.json()
    return dataJson
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
    const converted = await ocrEndpoint(req.body.file)
    res.status(200).json(converted)
}
