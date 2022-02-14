import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class DrawGlobalCleavageDrawPileEvent extends ApplicationEvent {
    eventType: EventType = EventType.DRAW_GLOBAL_CLEAVAGE_DRAWPILE
}
