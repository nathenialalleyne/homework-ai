import { NextApiRequest } from "next";

export interface NextApiRequestWithFormData extends NextApiRequest {
    files: {
        [key: string]: any
    }

}
