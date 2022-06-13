import { BACKEND_API_URL } from '../../../api/Backend_API_URL'
import type { StreamerDto } from '../../../domain/entities/StreamerDto'
import type { StreamersGateway } from '../../../domain/ports/secondary/gateways/StreamersGateway'
import type { AxiosBackendInstance } from '../../tech/AxiosBackendInstance'

export class AxiosStreamersGateway implements StreamersGateway {
    constructor (private axiosBackendInstance:AxiosBackendInstance) {}
    retrieveAllStreamers (): Promise<StreamerDto[]> {
        return this.axiosBackendInstance.axiosInstance.get<StreamerDto[]>(`${BACKEND_API_URL.STREAMERS}`)
            .then(response => {
                console.log('retrieveAllStreamers', response.data)
                return response.data
            })
            .catch(error => Promise.reject(error))
    }

    hasStreamerRegistered (username: string): Promise<boolean> {
        return this.axiosBackendInstance.axiosInstance.get<StreamerDto|undefined>(`${BACKEND_API_URL.STREAMERS}/${username}`)
            .then(response => {
                console.log('hasStreamerRegistered', !!response.data, response.data)
                return !!response.data
            })
            .catch(error => Promise.reject(error))
    }

    registerStreamer (streamer: StreamerDto): Promise<void> {
        return this.axiosBackendInstance.axiosInstance.post<void>(BACKEND_API_URL.STREAMERS, streamer)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error))
    }
}
