import axios, { AxiosInstance } from 'axios'

export class AxiosBackendInstance {
    constructor (
        sheme: string,
        endpoint: string,
        port?: string
    ) {
        const baseURL = `${sheme}://${endpoint}${port ? `:${parseInt(port).toString()}` : ''}`
        this.axiosInstance = axios.create({ baseURL })
        console.log(`${this.constructor.name} with backend base url: ${baseURL}`)
    }

    public axiosInstance: AxiosInstance;
}
