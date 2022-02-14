import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class StopAutoplayEvent extends ApplicationEvent {
    eventType: EventType = EventType.STOP_AUTOPLAY;
}
