import type { StreamerDto } from '../../../domain/entities/StreamerDto'
import type { RegisteredStreamersRepository } from '../../../domain/ports/secondary/repositories/RegisteredStreamersRepository'

export class InMemoryGlobalRegisteredStreamersRepository implements RegisteredStreamersRepository {
    retrieveAll (): Promise<StreamerDto[]> {
        return Promise.resolve(this.registeredStreamers)
    }

    retrieveByUsername (username: string): Promise<StreamerDto> {
        const registeredStreamer = this.registeredStreamers.find(registeredStreamer => registeredStreamer.username === username)
        return registeredStreamer
            ? Promise.resolve(registeredStreamer)
            : Promise.reject(new Error(`Streamer with username '${username}' is not registered on registered streamer repository.`))
    }

    isExistByUsername (username: string): Promise<boolean> {
        return Promise.resolve(this.registeredStreamers.some(registeredStreamer => registeredStreamer.username === username))
    }

    save (streamer: StreamerDto): Promise<void> {
        this.registeredStreamers.push(streamer)
        return Promise.resolve()
    }

    registeredStreamers:StreamerDto[] = []
}
