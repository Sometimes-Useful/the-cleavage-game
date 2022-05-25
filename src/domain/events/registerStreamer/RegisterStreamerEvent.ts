import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class RegisterStreamerEvent extends ApplicationEvent {
    constructor (
        public username:string
    ) { super() }

    eventType: EventType = EventType.REGISTER_STREAMER
}
