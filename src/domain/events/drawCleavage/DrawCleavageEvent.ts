import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class DrawCleavageEvent extends ApplicationEvent {
    constructor () { super() }

    eventType: EventType = EventType.DRAW_CLEAVAGE;
}
