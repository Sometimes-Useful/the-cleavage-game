import type { StreamerDto } from '../entities/StreamerDto'
import type { RegisteredStreamersRepository } from '../ports/secondary/repositories/RegisteredStreamersRepository'

export class GlobalStreamersApplicationService {
    constructor (private registeredStreamersRepository:RegisteredStreamersRepository) {}
    registeredStreamers (): Promise<StreamerDto[]> {
        return this.registeredStreamersRepository.retrieveAll()
    }

    registeredStreamerByUsername (username: string): Promise<StreamerDto | undefined> {
        return this.registeredStreamersRepository.isExistByUsername(username)
            .then(isStreamerExistByUsername => isStreamerExistByUsername
                ? this.registeredStreamersRepository.retrieveByUsername(username)
                : undefined
            )
    }

    registerStreamer (streamer:StreamerDto): Promise<void> {
        return this.registeredStreamersRepository.isExistByUsername(streamer.username)
            .then(isStreamerExistByUsername => isStreamerExistByUsername
                ? undefined
                : this.registeredStreamersRepository.save(streamer)
            )
    }
}
