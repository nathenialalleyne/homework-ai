import { createNextPageApiHandler } from "uploadthing/next-legacy";
 
import { testFileRouter } from "@/server/uploadthing";
 
const handler = createNextPageApiHandler({
  router: testFileRouter,
});
 
export default handler;