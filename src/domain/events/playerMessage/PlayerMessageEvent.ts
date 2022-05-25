import { ApplicationEvent } from '../GameEvent'
import { EventType } from '../EventType'

export class PlayerMessageEvent extends ApplicationEvent {
    eventType: EventType = EventType.PLAYER_MESSAGE;
    constructor (
        public username: string,
        public message: string
    ) { super() }
}
