import type { StreamerDto } from '../../../entities/StreamerDto'

export interface StreamersGateway {
    retrieveAllStreamers(): Promise<StreamerDto[]>;
    hasStreamerRegistered(username: string):Promise<boolean>;
    registerStreamer(username: StreamerDto): Promise<void>;
}
