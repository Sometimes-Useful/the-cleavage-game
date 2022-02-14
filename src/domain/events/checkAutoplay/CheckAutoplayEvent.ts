import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class CheckAutoplayEvent extends ApplicationEvent {
    eventType: EventType = EventType.CHECK_AUTOPLAY;
}
