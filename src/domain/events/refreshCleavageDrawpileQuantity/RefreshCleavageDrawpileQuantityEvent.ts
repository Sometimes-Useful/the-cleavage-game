import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class RefreshCleavageDrawpileQuantityEvent extends ApplicationEvent {
    eventType: EventType = EventType.REFRESH_CLEAVAGE_DRAWPILE_QUANTITY
}
