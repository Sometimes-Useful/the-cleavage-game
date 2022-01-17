import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class ApplicationStartEvent extends ApplicationEvent {
    eventType: EventType = EventType.APPLICATION_START
}
