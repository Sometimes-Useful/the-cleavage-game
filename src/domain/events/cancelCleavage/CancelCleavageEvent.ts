import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class CancelCleavageEvent extends ApplicationEvent {
    eventType: EventType = EventType.CANCEL_CLEAVAGE
}
