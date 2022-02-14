import type { Cleavage } from '../../entities/Cleavage'
import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class SaveCleavageOnGlobalCleavageDrawPileEvent extends ApplicationEvent {
    constructor (
        public cleavage: Cleavage
    ) { super() }

    eventType: EventType = EventType.SAVE_CLEAVAGE_ON_GLOBAL_CLEAVAGE_DRAWPILE
}
