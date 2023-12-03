import { defer,  } from '@defer/client'
import uploadAndGetTextFromSource from '@/server/jobs/process-file'
import { GoogleAuth } from 'google-auth-library'
import { Storage } from '@google-cloud/storage'

async function testGCP(){
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Hello ${name}!`);
      resolve("done");
    }, 5000);
  });
}

export default defer(testGCP)