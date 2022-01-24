import type { Cleavage } from '../../entities/Cleavage'
import type { Player } from '../../entities/Player'
import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'

export class PlayerSuggestCleavageEvent extends ApplicationEvent {
    constructor (
        public player: Player,
        public cleavage: Cleavage
    ) { super() }

    eventType: EventType = EventType.PLAYER_SUGGEST_CLEAVAGE;
}
