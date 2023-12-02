import { defer } from '@defer/client'
import uploadAndGetTextFromSource from '@/server/jobs/process-file'

export default defer(uploadAndGetTextFromSource)