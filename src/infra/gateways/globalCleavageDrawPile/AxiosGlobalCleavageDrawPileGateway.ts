
import axios, { AxiosInstance } from 'axios'
import { Cleavage, CleavageDTO } from '../../../domain/entities/Cleavage'
import type { GlobalCleavageDrawPileGateway } from '../../../domain/ports/secondary/gateways/GlobalCleavageDrawPileGateway'
import { BACKEND_API_URL } from '../../../api/Backend_API_URL'

export class AxiosGlobalCleavageDrawPileGateway implements GlobalCleavageDrawPileGateway {
    constructor (
        sheme:string,
        endpoint:string,
        port:number
    ) {
        this.backendApiInstance = axios.create({
            baseURL: `${sheme}://${endpoint}:${port}`
        })
    }

    drawGlobalCleavage (): Promise<Cleavage | undefined> {
        return this.backendApiInstance.get<CleavageDTO | ''>(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_DRAW)
            .then(response => {
                console.log(response.data)
                return Promise.resolve(response.data ? new Cleavage(response.data) : undefined)
            })
            .catch(error => Promise.reject(error))
    }

    save (cleavage: Cleavage): Promise<void> {
        return this.backendApiInstance.post<void>(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, cleavage)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error))
    }

    private backendApiInstance:AxiosInstance
}
