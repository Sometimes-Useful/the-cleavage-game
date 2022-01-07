import { ApplicationEvent } from '../GameEvent'
import { EventType } from '../EventType'

export class NewCleavageEvent extends ApplicationEvent {
    eventType: EventType = EventType.NEW_CLEAVAGE;
}
