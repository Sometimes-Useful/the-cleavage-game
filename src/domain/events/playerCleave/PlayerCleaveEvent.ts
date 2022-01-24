import { EventType } from '../EventType'
import { ApplicationEvent } from '../GameEvent'
import type { PlayerCleave } from '../../entities/PlayerCleave'
import type { Player } from '../../entities/Player'

export class PlayerCleaveEvent extends ApplicationEvent {
    constructor (public player:Player, public playerCleave: PlayerCleave) {
        super()
    }

    eventType: EventType = EventType.PLAYER_CLEAVE;
}
