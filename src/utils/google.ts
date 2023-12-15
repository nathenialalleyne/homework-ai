import { GoogleAuth } from "google-auth-library";
import { Storage } from "@google-cloud/storage";

const gcsKey = JSON.parse(
  Buffer.from(process.env.GCP_CRED_FILE!, 'base64').toString(),
)

const storage = new Storage({
  credentials: {
    client_email: gcsKey.client_email,
    private_key: gcsKey.private_key,
  },
  projectId: gcsKey.project_id,
})

export default storage