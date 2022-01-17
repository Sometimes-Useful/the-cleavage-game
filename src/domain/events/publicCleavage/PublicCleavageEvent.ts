import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class PublicCleavageEvent extends ApplicationEvent {
    constructor () { super() }

    eventType: EventType = EventType.PUBLIC_CLEAVAGE;
}
