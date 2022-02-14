import { config } from 'dotenv'
import { EnvironmentVariable } from '../infra/EnvironmentVariable'
import { retrieveEnvVariable } from '../infra/retrieveEnvVariable'

config()
const defaultBackendPort = '8000'
const defaultBackendFqdn = 'localhost'
export const backendPort = parseInt(retrieveEnvVariable(EnvironmentVariable.BACKEND_PORT, defaultBackendPort))
export const backendFqdn = retrieveEnvVariable(EnvironmentVariable.BACKEND_FQDN, defaultBackendFqdn)
