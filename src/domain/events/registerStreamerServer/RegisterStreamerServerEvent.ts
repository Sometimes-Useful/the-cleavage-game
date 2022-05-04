import type { StreamerDto } from '../../entities/StreamerDto'
import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class RegisterStreamerServerEvent extends ApplicationEvent {
    constructor (
        public streamer:StreamerDto
    ) { super() }

    eventType:EventType = EventType.REGISTER_STREAMER_BACKEND;
}
