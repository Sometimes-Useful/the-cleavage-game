
import { Cleavage, CleavageDTO } from '../../../domain/entities/Cleavage'
import type { GlobalCleavageDrawPileGateway } from '../../../domain/ports/secondary/gateways/GlobalCleavageDrawPileGateway'
import { BACKEND_API_URL } from '../../../api/Backend_API_URL'
import type { AxiosBackendInstance } from '../../tech/AxiosBackendInstance'

export class AxiosGlobalCleavageDrawPileGateway implements GlobalCleavageDrawPileGateway {
    constructor (private axiosBackendInstance:AxiosBackendInstance) {}
    retrieveCleavageDrawpileQuantity (): Promise<number> {
        return this.axiosBackendInstance.axiosInstance.get<string>(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_QUANTITY)
            .then(response => Promise.resolve(parseInt(response.data)))
            .catch(error => Promise.reject(error))
    }

    drawGlobalCleavage (): Promise<Cleavage | undefined> {
        return this.axiosBackendInstance.axiosInstance.get<CleavageDTO | ''>(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_DRAW)
            .then(response => Promise.resolve(response.data ? new Cleavage(response.data) : undefined))
            .catch(error => Promise.reject(error))
    }

    save (cleavage: Cleavage): Promise<void> {
        return this.axiosBackendInstance.axiosInstance.post<void>(BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, cleavage)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error))
    }
}
