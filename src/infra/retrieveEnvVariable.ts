import type { EnvironmentVariable } from './EnvironmentVariable'

export function retrieveEnvVariable (envVariableValue: string | undefined, envVariableName:EnvironmentVariable, defaultValue?:string) {
    if (envVariableValue)
        return envVariableValue
    if (defaultValue)
        return defaultValue
    throw new Error(`Missing env variable ${envVariableName}`)
}
