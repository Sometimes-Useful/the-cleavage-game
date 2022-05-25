import axios, { AxiosInstance } from 'axios'
type BaseUrlConfig ={
    sheme: string,
    endpoint: string,
    port?: string
}
export class AxiosBackendInstance {
    constructor (
        baseUrl?:BaseUrlConfig
    ) {
        const baseURL = baseUrl ? `${baseUrl.sheme}://${baseUrl.endpoint}${baseUrl.port ? `:${parseInt(baseUrl.port).toString()}` : ''}` : undefined
        this.axiosInstance = axios.create({ baseURL })
        console.log(`${this.constructor.name} with backend base url: ${baseURL}`)
    }

    public axiosInstance: AxiosInstance;
}
