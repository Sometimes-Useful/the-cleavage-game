import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class CreateBarEvent extends ApplicationEvent {
    eventType: EventType = EventType.CREATE_BAR
}
