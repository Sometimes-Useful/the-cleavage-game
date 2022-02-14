import { onMissingEnvVariable } from '../infra/EnvironmentVariable'

export const clientBackendSheme = process.env.BACKEND_SHEME ? process.env.BACKEND_SHEME : onMissingEnvVariable('process.env.BACKEND_SHEME')
export const clientBackendFqdn = process.env.BACKEND_FQDN ? process.env.BACKEND_FQDN : onMissingEnvVariable('process.env.BACKEND_FQDN')
export const clientBackendPort = process.env.PORT
