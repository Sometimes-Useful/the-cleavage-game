import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class CheckRegisteredStreamerEvent extends ApplicationEvent {
    constructor (public username:string) { super() }
    eventType: EventType = EventType.CHECK_REGISTERED_STREAMER
}
