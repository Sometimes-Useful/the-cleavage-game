import type { StreamerDto } from '../../../entities/StreamerDto'

export interface RegisteredStreamersRepository {
    retrieveAll(): Promise<StreamerDto[]>;
    retrieveByUsername(username: string): Promise<StreamerDto>;
    isExistByUsername(username: string): Promise<boolean>;
    save(streamer: StreamerDto): Promise<void>;
}
