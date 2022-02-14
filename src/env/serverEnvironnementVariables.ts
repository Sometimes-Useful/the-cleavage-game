import { config } from 'dotenv'
import { onMissingEnvVariable } from '../infra/EnvironmentVariable'

config()
export const gcpProjectId = JSON.parse(process.env.GCP_PROJECT_ID ? process.env.GCP_PROJECT_ID : onMissingEnvVariable('process.env.GCP_PROJECT_ID')).gcpProjectId
export const gcpClientEmail = JSON.parse(process.env.GCP_CLIENT_EMAIL ? process.env.GCP_CLIENT_EMAIL : onMissingEnvVariable('process.env.GCP_CLIENT_EMAIL')).gcpClientEmail
export const gcpPrivateKey = JSON.parse(process.env.GCP_PRIVATE_KEY ? process.env.GCP_PRIVATE_KEY : onMissingEnvVariable('process.env.GCP_PRIVATE_KEY')).gcpPrivateKey
export const backendSheme = process.env.BACKEND_SHEME ? process.env.BACKEND_SHEME : onMissingEnvVariable('process.env.BACKEND_SHEME')
export const backendFqdn = process.env.BACKEND_FQDN ? process.env.BACKEND_FQDN : onMissingEnvVariable('process.env.BACKEND_FQDN')
export const backendPort = process.env.PORT
