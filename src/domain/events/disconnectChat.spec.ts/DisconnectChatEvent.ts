import { ApplicationEvent } from '../GameEvent'
import { EventType } from '../EventType'

export class DisconnectChatEvent extends ApplicationEvent {
    eventType: EventType = EventType.DISCONNECT_CHAT;
}
