import type { StreamerDto } from '../entities/StreamerDto'
import type { StreamersGateway } from '../ports/secondary/gateways/StreamersGateway'

export class StreamersApplicationService {
    constructor (private streamersGateway: StreamersGateway) { }
    isStreamerRegistered (username:string): Promise<boolean> {
        return this.streamersGateway.hasStreamerRegistered(username)
    }

    retrieveAllStreamers (): Promise<StreamerDto[]> {
        return this.streamersGateway.retrieveAllStreamers()
    }

    registerStreamer (username: string): Promise<void> {
        return this.streamersGateway.hasStreamerRegistered(username)
            .then(hasStreamerRegistered => hasStreamerRegistered
                ? Promise.resolve()
                : this.streamersGateway.registerStreamer({ username })
            )
            .catch(error => Promise.reject(error))
    }
}
