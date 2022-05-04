import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class EraseEvent extends ApplicationEvent {
    constructor (
        public entityIdToErase: string|string[]
    ) { super() }

    eventType: EventType = EventType.ERASE
}
