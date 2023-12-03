import { defer,  } from '@defer/client'
import uploadAndGetTextFromSource from '@/server/jobs/process-file'
import { GoogleAuth } from 'google-auth-library'
import { Storage } from '@google-cloud/storage'

async function testGCP(){
    
        const GoogleAuthOptions = () => {   
            return new GoogleAuth({
                keyFile: 'gcp-key.json',
                scopes: [
                    'https://www.googleapis.com/auth/cloud-platform', 
                    'https://www.googleapis.com/auth/cloud-vision',
                    'https://www.googleapis.com/auth/devstorage.full_control',],
            })
        }
    
        const client = await GoogleAuthOptions().getClient()
        const storage = new Storage({projectId: 'altrai', authClient: client})

        const bucket = storage.bucket('pdf-source-storage-bucket')
        const file = await bucket.file('test.txt').download()

        return console.log(file.toString())

}

export default defer(testGCP)