import { EnvironmentVariable } from '../infra/EnvironmentVariable'
import { retrieveEnvVariable } from '../infra/retrieveEnvVariable'

const defaultBackendPort = '8000'
const defaultBackendFqdn = 'localhost'
export const backendPort = parseInt(retrieveEnvVariable(process.env.PORT, EnvironmentVariable.BACKEND_PORT, defaultBackendPort))
export const backendFqdn = retrieveEnvVariable(process.env.BACKEND_FQDN, EnvironmentVariable.BACKEND_FQDN, defaultBackendFqdn)
