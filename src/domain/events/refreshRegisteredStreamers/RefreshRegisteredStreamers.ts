import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class RefreshRegisteredStreamersEvent extends ApplicationEvent {
    eventType: EventType = EventType.REFRESH_REGISTERED_STREAMERS;
}
