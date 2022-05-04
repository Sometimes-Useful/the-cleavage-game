import type { StreamerDto } from '../../../domain/entities/StreamerDto'
import type { StreamersGateway } from '../../../domain/ports/secondary/gateways/StreamersGateway'

export class FakeStreamersGateway implements StreamersGateway {
    retrieveAllStreamers (): Promise<StreamerDto[]> {
        return Promise.resolve(this.registeredStreamers)
    }

    hasStreamerRegistered (username: string): Promise<boolean> {
        return Promise.resolve(this.registeredStreamers.some(registeredStreamer => registeredStreamer.username === username))
    }

    registerStreamer (username: StreamerDto): Promise<void> {
        this.registeredStreamers.push(username)
        return Promise.resolve()
    }

    registeredStreamers: StreamerDto[] = []
}
