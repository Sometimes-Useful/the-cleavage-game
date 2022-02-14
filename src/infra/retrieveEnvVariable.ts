import type { EnvironmentVariable } from './EnvironmentVariable'

export function retrieveEnvVariable (envVariableName: EnvironmentVariable, defaultValue?:string) {
    const envVariableValue: string | undefined = process.env[envVariableName]
    if (envVariableValue)
        return envVariableValue
    if (defaultValue)
        return defaultValue
    throw new Error(`Missing env variable ${envVariableName}`)
}
