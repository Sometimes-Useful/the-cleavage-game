
import axios from 'axios'
import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { GlobalCleavageDrawPileGateway } from '../../../domain/ports/secondary/gateways/GlobalCleavageDrawPileGateway'
import { BACKEND_API_URL } from '../../../webServer/Backend_API_URL'

export class AxiosGlobalCleavageDrawPileGateway implements GlobalCleavageDrawPileGateway {
    constructor (
        private endpoint:string,
        private port:number
    ) {}

    drawGlobalCleavage (): Promise<Cleavage | undefined> {
        return this.backendApiInstance.get<Cleavage | undefined>(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_DRAW)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error))
    }

    save (cleavage: Cleavage): Promise<void> {
        return this.backendApiInstance.post<void>(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, cleavage)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error))
    }

    private backendApiInstance = axios.create({
        baseURL: `http://${this.endpoint}:${this.port}`
    })
}
