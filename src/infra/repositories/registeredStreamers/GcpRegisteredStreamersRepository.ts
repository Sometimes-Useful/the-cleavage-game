import type { StreamerDto } from '../../../domain/entities/StreamerDto'
import type { RegisteredStreamersRepository } from '../../../domain/ports/secondary/repositories/RegisteredStreamersRepository'
import type { GcpDatastore, GcpQueryFilter } from '../../tech/GcpDatastore'

export class GcpGlobalRegisteredStreamersRepository implements RegisteredStreamersRepository {
    constructor (private gcpDatastore:GcpDatastore) {}
    retrieveAll (): Promise<StreamerDto[]> {
        return this.gcpDatastore.retreiveAll<StreamerDto>(this.kind)
    }

    delete (username: string): Promise<void> {
        return this.gcpDatastore.deleteRecordOnGoogleDatastore([this.kind, username])
            .then(result => result instanceof Error ? Promise.reject(result) : Promise.resolve(result))
            .catch(error => Promise.reject(error))
    }

    retrieveByUsername (username: string): Promise<StreamerDto> {
        return this.gcpDatastore.retreiveRecordOnGoogleDatastore<StreamerDto>([this.kind, username])
            .then(result => result instanceof Error ? Promise.reject(result) : Promise.resolve(result))
            .catch(error => Promise.reject(error))
    }

    isExistByUsername (username: string): Promise<boolean> {
        const filters:GcpQueryFilter[] = [
            { property: 'username', operator: '=', value: username }
        ]
        return this.gcpDatastore.queryRecordsOnGoogleDatastore<StreamerDto>(this.kind, filters)
            .then(result => {
                if (result instanceof Error) return Promise.reject(result)
                if (result.length === 1) return true
                if (result.length === 0) return false
                return Promise.reject(new Error(`Multiple ${this.kind} found with username '${username}'.`))
            })
            .catch(error => Promise.reject(error))
    }

    save (streamer: StreamerDto): Promise<void> {
        return this.gcpDatastore.saveRecordOnGoogleDatastore([this.kind, streamer.username], streamer)
            .then(result => result instanceof Error ? Promise.reject(result) : Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private readonly kind = 'registeredStreamers'
}
