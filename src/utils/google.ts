import { GoogleAuth } from "google-auth-library";

const GoogleAuthOptions = () => {   
    return new GoogleAuth({
        keyFile: '/gcp-key.json',
        scopes: [
            'https://www.googleapis.com/auth/cloud-platform', 
            'https://www.googleapis.com/auth/cloud-vision',
            'https://www.googleapis.com/auth/devstorage.full_control',
        ],
    })
}
    
const client = GoogleAuthOptions().getClient()

export default client