import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class ConnectChatEvent extends ApplicationEvent {
    constructor (
        public username: string,
        public token: string,
        public channel: string
    ) {
        super()
    }

    eventType: EventType = EventType.CONNECT_CHAT;
}
