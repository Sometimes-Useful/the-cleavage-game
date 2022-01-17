import type { Cleavage } from '../../entities/Cleavage'
import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class PlayerSuggestCleavageEvent extends ApplicationEvent {
    constructor (public player: string, public cleavage: Cleavage) { super() }

    eventType: EventType = EventType.PLAYER_SUGGEST_CLEAVAGE;
}
