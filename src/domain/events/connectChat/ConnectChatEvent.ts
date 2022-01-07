import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class ConnectChatEvent extends ApplicationEvent {
    eventType: EventType = EventType.CONNECT_CHAT;
}
