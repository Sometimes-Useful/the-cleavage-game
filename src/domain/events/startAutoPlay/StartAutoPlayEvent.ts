import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class StartAutoPlayEvent extends ApplicationEvent {
    constructor (
        public autoplayMinutes: number
    ) { super() }

    eventType: EventType = EventType.START_AUTOPLAY
}
