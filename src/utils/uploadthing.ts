import { generateComponents } from "@uploadthing/react";
 
import type { TestFileRouter } from "@/server/uploadthing";
 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<TestFileRouter>();