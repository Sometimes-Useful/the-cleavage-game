import { config } from 'dotenv'
import { onMissingEnvVariable } from '../infra/EnvironmentVariable'

config()
export const gcpProjectId:string = process.env.GCP_PROJECT_ID ? process.env.GCP_PROJECT_ID : onMissingEnvVariable('process.env.GCP_PROJECT_ID')
export const gcpClientEmail:string = process.env.GCP_CLIENT_EMAIL ? process.env.GCP_CLIENT_EMAIL : onMissingEnvVariable('process.env.GCP_CLIENT_EMAIL')
export const gcpPrivateKey:string = process.env.GCP_PRIVATE_KEY ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n') : onMissingEnvVariable('process.env.GCP_PRIVATE_KEY')
export const backendSheme:string = process.env.BACKEND_SHEME ? process.env.BACKEND_SHEME : onMissingEnvVariable('process.env.BACKEND_SHEME')
export const backendFqdn:string = process.env.BACKEND_FQDN ? process.env.BACKEND_FQDN : onMissingEnvVariable('process.env.BACKEND_FQDN')
export const backendPort = process.env.PORT
