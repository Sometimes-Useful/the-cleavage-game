import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class TableStoolAvailableEvent extends ApplicationEvent {
    eventType: EventType = EventType.TABLE_STOOL_AVAILABLE;
}
