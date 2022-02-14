import type { EnvironmentVariable } from '../infra/EnvironmentVariable'
import { retrieveEnvVariable } from '../infra/retrieveEnvVariable'

const defaultBackendPort = '8000'
const defaultBackendFqdn = 'localhost'
const defaultBackendSheme = 'http'
export const backendPort = (envVariableValue: string | undefined, envVariableName: EnvironmentVariable) => parseInt(retrieveEnvVariable(envVariableValue, envVariableName, defaultBackendPort))
export const backendFqdn = (envVariableValue: string | undefined, envVariableName: EnvironmentVariable) => retrieveEnvVariable(envVariableValue, envVariableName, defaultBackendFqdn)
export const backendSheme = (envVariableValue: string | undefined, envVariableName: EnvironmentVariable) => retrieveEnvVariable(envVariableValue, envVariableName, defaultBackendSheme)
