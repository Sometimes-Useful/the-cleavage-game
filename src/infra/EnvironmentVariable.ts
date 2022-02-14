/* eslint-disable no-unused-vars */
export enum EnvironmentVariable {
    TWITCHTOKEN = 'TWITCHTOKEN',
    TWITCHUSERNAME = 'TWITCHUSERNAME',
    TWITCHCHANNEL = 'TWITCHCHANNEL',
    GCP_PROJECT_ID = 'GCP_PROJECT_ID',
    GCP_CLIENT_EMAIL = 'GCP_CLIENT_EMAIL',
    GCP_PRIVATE_KEY = 'GCP_PRIVATE_KEY',
    BACKEND_PORT = 'PORT',
    BACKEND_FQDN = 'BACKEND_FQDN',
    BACKEND_SHEME = 'BACKEND_SHEME'
}
export const onMissingEnvVariable = (envVar:string) => { throw new Error(`Missing env variable ${envVar}`) }
