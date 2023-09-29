import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { utapi } from "uploadthing/server";
 
const f = createUploadthing();

export const testFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: '4MB'
        },
        pdf: {
            maxFileSize: '4MB'
        }
    }).onUploadComplete(async ({file}) => {
 
        console.log("file url", file.url);
    })
} satisfies FileRouter;

export type TestFileRouter = typeof testFileRouter;